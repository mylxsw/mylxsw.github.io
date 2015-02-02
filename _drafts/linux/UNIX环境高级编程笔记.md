##UNIX环境高级编程笔记

[TOC]

下图是ISO-C标准提供的头文件

![ISO-C-HEADER][]

下图是POSIX提供的头文件

![POSIX-C-HEADER][]


###File I/O

这里所要讲述的文件IO是非缓冲的文件IO，与标准I/O不同的是，它的每次`read`或者`write`都会执行内核的系统调用。

> 非缓冲的文件IO是POSIX.1标准的一部分，不属于ISO C标准。

对内核来说，每个打开的文件都会分配一个文件描述符，内核使用文件描述符操作文件，在UNIX系统中，通常`0`，`1`，`2`三个描述符作为`标准输入stdin`，`标准输出stdout`，`标准错误输出stderr`的文件描述符。在POSIX兼容的应用中，使用符号`STDIN_FILENO`，`STDOUT_FILENO`，`STDERR_FILENO`以提高程序的可读性(这些常量在<unistd.h>头文件中)。文件描述符的范围从0到`OPEN_MAX - 1`之间。

####文件打开/创建/寻址/关闭

    #include <fcntl.h>
    int open(const char *path, int oflag, ... /* mode_t mode */ );
    int openat(int fd, const char *path, int oflag, ... /* mode_t mode */ );

函数`openat`的存在，主要解决两个问题，一是在让线程可以使用其它的工作目录，同一个进程中的线程所使用的工作目录是相同的，因此，多个线程很难实现同时使用不同的工作目录，二是它可以避免出现time-of-check-to-time-of-use(TOCTTOU)问题。

> TOCTTOU问题是指的在UNIX系统中，当两个基于文件的函数之间第二个函数的执行依赖于第一个函数的结果，因为这些系统调用是非原子的，如果中间文件发生了修改，会导致出现程序错误。

    #include <fcntl.h>
    int creat(const char *path, mode_t mode);

该函数用于创建一个新的文件，该函数等价于`open(path, O_WRONLY | O_CREAT | O_TRUNC, mode)`。需要注意的是，使用该函数时，只支持写入文件，而不能对文件进行读取，因此，最好是使用`open(path, O_RDWR | O_CREAT | O_TRUNC, mode)`代替。

    #include <unistd.h> 
    int close(int fd);

文件使用完成后，使用`close`函数关闭文件，关闭文件后，对文件加的锁也会自动释放。

    #include <unistd.h>
    off_t lseek(int fd, off_t offset, int whence);

该函数用于在文件中移动偏移量，如果`whence`为`SEEK_SET`，则偏移量从文件的开始处计算，如果设置为`SEEK_CUR`，则从当前位置开始计算，如果为`SEEK_END`，则从文件的尾部计算，也就是文件大小+1。

由于函数`lseek`调用成功后会返回当前的文件偏移值，因此，通常可以将偏移量设置为0，这样就可以获取当前所在文件的位置。

    off_t currpos;
    currpos = lseek(fd, 0, SEEK_CUR);

这种方式也用来判断文件是否是可以seek，如果文件描述符指向的是pipe，FIFO或者是socket，`lseek`将会设置`errno`为`ESPIPE`并且返回-1。

####文件读写

    #include <unistd.h>
    ssize_t read(int fd, void *buf, size_t nbytes);

从打开的文件中读取内容，如果读取成功，返回读取到的字节数，如果遇到文件结尾，则返回0。

    #include <unistd.h>
    ssize_t write(int fd, const void *buf, size_t nbytes);

向打开的文件写入内容，在写入成功时，返回值与第三个参数nbytes相同，失败时返回-1。

####原子操作

    #include <unistd.h>
    ssize_t pread(int fd, void *buf, size_t nbytes, off_t offset);
    ssize_t pwrite(int fd, const void *buf, size_t nbytes, off_t offset);

pread/pwrite函数用于执行原子的I/O读写，这两个函数的执行都是原子的，首先会执行seek到指定偏移量，然后读写文件，这中间是不可中断的，另外这些操作并不会更新当前文件的偏移。

> 原子操作指的是一个由多个操作组合而成的一个操作，这个操作是不可中断的。

####文件描述符复制

    #include <unistd.h>
    int dup(int fd);
    int dup2(int fd, int fd2);

上述两个函数可以用于复制一个已经存在的文件描述符。使用dup函数，能够保证返回的新的文件描述符是当前空闲的最小文件描述符，而使用dup2函数则通过第二个参数fd2指定新的文件描述符，如果新的文件描述符已经打开，则会先关闭它。

> 对于`dup2`函数，文件描述符fd2的`FD_CLOEXEC`标记被清除，所以，如果进程调用了exec函数该描述符可以保持打开状态。

####同步缓冲区

    #include <unistd.h> 
    int fsync(int fd); 
    int fdatasync(int fd);
    void sync(void);

函数`sync`会将块缓冲区中的数据加入到写磁盘队列中并返回，不会等待真正的磁盘写入操作完成，通常系统守护进程会30s调用一次sync，以确保及时刷新内核的块缓冲区到磁盘上。命令`sync`就是调用了`sync`函数。

函数`fsync`只针对单个文件进行操作，它会等待磁盘写入完成才返回，确保数据正常写入。函数`fdatasync`与`fsync`类似，区别是它只会影响文件的数据部分，而`fsync`则会同步的更新文件的属性信息。

####fcntl

    #include <fcntl.h>
    int fcntl(int fd, int cmd, ... /* int arg */ );

函数`fcntl`可以用于改变已经打开文件的属性。一般用于以下用途：

- 复制一个已经存在的文件描述符，类似于dup函数（cmd=F_DUPFD 或者 cmd=F_DUPFD_CLOEXEC）
- 获取或者设置文件描述符标记（cmd=F_GETFD或者cmd=F_SETFD）
- 获取或者设置文件状态标记(cmd=F_GETFL或者cmd=F_SETFL)
- 获取或者设置异步I/O属主(cmd=F_GETOWN或者F_SETLK或者F_SETLKW)
- 获取/设置记录锁(cmd=F_GETTLK或者F_SETLK，F_SETLKW)

所有的fcntl命令在出现错误的时候返回-1，其它返回值依赖于具体命令。

###文件和目录

####stat获取文件信息

下列的函数用于获取文件的信息

    #include <sys/stat.h>
    int stat(const char *restrict pathname, struct stat *restrict buf );
    int fstat(int fd, struct stat *buf);
    int lstat(const char *restrict pathname, struct stat *restrict buf );
    int fstatat(int fd, const char *restrict pathname, struct stat *restrict buf, int flag);

函数`stat`用于获取指定路径下的文件的信息，`fstat`用于获取已经打开的文件描述符的文件信息，`lstat`则用于返回符号链接本身的信息，而不是它引用的文件。`fstatat`函数提供了以指定的文件描述符fd为工作目录，相对路径pathname对应的文件的信息，根据参数flag的不同，可以表现为是否跟踪符号链接。

参数buf是一个stat的结构体，用于返回文件的信息

    struct stat {
         mode_t          st_mode; /* 文件类型 & 模式（权限） */
         ino_t           st_ino;  /* i-node号码（序列号） */
         dev_t           st_dev;  /* 设备号（文件系统） */
         dev_t           st_rdev; /* 特定文件的设备号 */
         nlink_t         st_nlink;/* 链接数量 */
         uid_t           st_uid;  /* 属主的UID */
         gid_t           st_gid;  /* 属主的GID */
         off_t           st_size; /* 普通文件的大小，单位byte */
         struct timespec st_atim; /* 最后访问时间 */
         struct timespec st_mtim; /* 最后修改时间 */
         struct timespec st_ctim; /* 文件状态最后改变时间 */
         blksize_t       st_blksize; /* 最佳I/O块大小 */
         blkcnt_t        st_blocks;  /* 分配的磁盘块数量 */
    };

在Unix系统中，文件类型包含普通文件，目录，块文件，字符文件，FIFO，Socket，符号链接。这些类型信息都经过编码存储在stat结构体的st_mode成员中，可以使用<sys/stat.h>头文件提供的宏获取文件的类型。


| Macro     | Type of file
|-----------|------------
| S_ISREG() | regular fille
| S_ISDIR() | directory file
| S_ISCHR() | character special file
| S_ISBLK() | block special file
| S_ISFIFO()| pipe or FIFO
| S_ISLNK() | symbolic link
| S_ISSOCK()| socket

####文件访问权限

下列是检查文件访问权限的函数：

    #include <unistd.h>
    int access(const char *pathname, int mode);
    int faccessat(int fd, const char *pathname, int mode, int flag);

函数`access`用于检查文件是否具有mode指定的权限。如果OK则返回0，错误返回-1。这两个函数的区别是，access用于检查指定路径下的文件访问权限，而faccessat则根据fd文件描述符相对的路径名进行检查，mode取值包含`R_OK`，`W_OK`，`X_OK`分别对应读、写、执行权限。

`faccessat` 函数的第四个参数flag，当设置为`AT_EACCESS`时，会检查effective 用户和组ID的用户是否有权限。

    #include <sys/stat.h>
    mode_t umask(mode_t cmask);

函数`mask`用于为进程设置创建文件的掩码值，函数返回之前的掩码值，该函数是为数不多的不会返回错误的函数。

> 掩码实际上是从创建文件的权限中去掉掩码中包含的权限（掩饰掉，去掉）。

	#include <sys/stat.h>
    int chmod(const char *pathname, mode_t mode);
    int fchmod(int fd, mode_t mode);
    int fchmodat(int fd, const char *pathname, mode_t mode, int flag);

上述这些`chmod`系列函数用于修改文件的权限，成功返回0，失败返回-1。这里的mode参数类型为mode_t，与`umask`函数一样，取值如下

| mode             | 描述
|------------------|--------------
| S_ISUID          | set-user-ID on execution
| S_ISGID          | set-group-ID on execution
| S_ISVTX          | saved-text (粘着位)
| S_IRWXU          | read, write, and execute by user (owner)
|    S_IRUSR       | read by user (owner)
|    S_IWUSR       | write by user (owner)
|    S_IXUSR       | execute by user (owner)
| S_IXUSR          | read, write, and execute by group
|    S_IRGRP       | read by group
|    S_IWGRP       | write by group
|    S_IXGRP       | execute by group
| S_IRWXO          | read, write, and execute by other (world)
|    S_IROTH       | read by other (world)
|    S_IWOTH       | write by other (world)
|    S_IXOTH       | execute by other (world)


下面的几个函数可以用来改变文件属主/组

    #include <unistd.h>
    int chown(const char *pathname, uid_t owner, gid_t group);
    int fchown(int fd, uid_t owner, gid_t group);
    int fchownat(int fd, const char *pathname, uid_t owner, gid_t group, int flag);
    int lchown(const char *pathname, uid_t owner, gid_t group);

如果要不需要设置组/属主，则可以将owner或者group设置为-1，这样就不会改变原来的值。成功返回0，失败-1。

####文件操作函数：截断/链接/删除/重命名

文件信息的`stat`结构体的`st_size`成员为文件的大小（byte）。对于符号链接，文件大小等于链接指向的文件名的大小。

    #include <unistd.h>
    int truncate(const char *pathname, off_t length);
    int ftruncate(int fd, off_t length);

函数`truncate`用于截断文件。如果原始文件长度大于length，则文件会被截断，如果小于length，则会在中间会形成空洞，文件被增大。

> 使用`open`函数的`O_TRUNC`标记也可以截断文件，这是截断的特殊情况，从开头截断。

对文件来说，每个文件都可以有多个目录实体指向它的i-node节点（文件可以包含多个链接）。可以使用`link`函数为文件创建链接文件。

    #include <unistd.h>
    int link(const char *existingpath, const char *newpath);
    int linkat(int efd, const char *existingpath, int nfd, const char *newpath, int flag);

如果新的路径newpath已经存在，则会返回错误，成功返回0， 失败-1。

	#include <unistd.h>
    int unlink(const char *pathname);
    int unlinkat(int fd, const char *pathname, int flag);

`unlink`函数用于移除已经存在的目录实体并减少引用文件的链接计数，如果引用计数不为0，则不会删除实际的文件数据，如果为0，则删除数据（没有文件链接引用文件了）。

> 如果一个文件的引用计数在删除之后为0了，但是该文件被其它进程打开中，这个文件不会被删除，而是会在进程结束（关闭文件）之后，由内核检查文件的引用计数，如果为0，则删除。

    #include <stdio.h>
    int remove(const char *pathname);

函数remove也用于删除文件，不过该函数不仅可以用于删除普通文件，还可以删除目录，当删除普通文件时，它与`unlink`函数一样，当路径是目录时，与`rmdir`函数一样。

    #include <stdio.h>
    int rename(const char *oldname, const char *newname);
    int renameat(int oldfd, const char *oldname, int newfd, const char *newname);

文件和目录可以使用`rename`函数重命名。

#### 符号链接

符号链接与硬链接（直接指向文件的i-node节点），它只包含它指向文件的路径，使用符号链接可以跨文件系统，并且不需要超级管理员权限，支持目录。

    #include <unistd.h>
    int symlink(const char *actualpath, const char *sympath);
    int symlinkat(const char *actualpath, int fd, const char *sympath);

使用`symlink`函数为文件创建一个符号链接,由于使用`open`函数打开符号链接将会自动的链接到原始文件，因此，我们需要一种方式能够直接打开符号链接本身。

    #include <unistd.h>
    ssize_t readlink(const char* restrict pathname, char *restrict buf,
    size_t bufsize);
    ssize_t readlinkat(int fd, const char* restrict pathname,
    char *restrict buf, size_t bufsize);

如果成功，返回读取到的字节数，失败返回-1。函数`readlink`合并了`open`，`read`，`close`函数的动作。

#### 文件时间

在stat结构体中，有三个字段表示文件的有关时间

| 字段     | 描述               | 例子           | ls 选项
|---------|--------------------|---------------|-------
| st_atim | 文件数据最后访问时间   | read          | -u
| st_mtim | 文件数据最后修改时间   | write         | 默认
| st_ctim | i-node状态最后修改时间| chmod, chown  | -c

    #include <sys/stat.h>
    int futimens(int fd, const struct timespec times[2]);
    int utimensat(int fd, const char *path, const struct timespec times[2], int flag);

函数`futimens`和`utimensat`用于改变文件最后的访问时间和修改时间，它们为时间戳提供了纳秒的精度，使用了`timespec`结构体。这两个函数中的times变量是两个元素的数组，第一个元素为最后的访问时间，第二个为修改时间。如果事件为空指针的话，则设置为当前时间戳。

    #include <sys/time.h>
    int utimes(const char *pathname, const struct timeval times[2]);

函数`futimens`和`utimensat`都是POSIX.1的一部分，而`utimes`为单一Unix规范的一部分。`utimes`操作的是路径名，并且，time使用的是struct timval结构体，用秒和微秒表示。

    struct timeval {
        time_t tv_sec;/* 秒 */
        long   tv_usec;/* 微秒 */
    }

> 注意，没有办法手动改变st_ctim(changed-status时间)，在调用`utimes`函数的时候，该值自动更新。

####目录操作

目录使用`mkdir`、`mkdirat`函数创建，使用`rmdir`函数删除。

    #include <sys/stat.h>
    int mkdir(const char *pathname, mode_t mode);
    int mkdirat(int fd, const char *pathname, mode_t mode);

对于目录的创建，通常会误以为与文件指定相同的读写权限，但是对于目录来说，我们一般还需要指定执行权限（目录访问）。

    #include <unistd.h>
    int rmdir(const char *pathname);

使用`rmdir`函数可以删除一个空目录。

    #include <dirent.h>
    DIR *opendir(const char *pathname); 
    DIR *fdopendir(int fd);
    struct dirent *readdir(DIR *dp); 
    void rewinddir(DIR *dp);
    int closedir(DIR *dp);
    long telldir(DIR *dp);
    void seekdir(DIR *dp, long loc);

上述函数是对目录进行操作的函数。

    #include <unistd.h>
    int chdir(const char *pathname); 
	int fchdir(int fd);

函数`chdir`用于改变当前工作目录。

	#include <unistd.h>
	char *getcwd(char *buf, size_t size);

函数`getcwd`用于获取当前工作目录。

[ISO-C-HEADER]: ./resources/iso-c-headers.png
[POSIX-C-HEADER]:./resources/POSIX-C-HEADER.png
