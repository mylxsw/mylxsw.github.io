###UNIX环境高级编程笔记


下图是ISO-C标准提供的头文件

![ISO-C-HEADER][]

下图是POSIX提供的头文件

![POSIX-C-HEADER][]


####File I/O

这里所要讲述的文件IO是非缓冲的文件IO，与标准I/O不同的是，它的每次`read`或者`write`都会执行内核的系统调用。

> 非缓冲的文件IO是POSIX.1标准的一部分，不属于ISO C标准。

对内核来说，每个打开的文件都会分配一个文件描述符，内核使用文件描述符操作文件，在UNIX系统中，通常`0`，`1`，`2`三个描述符作为`标准输入stdin`，`标准输出stdout`，`标准错误输出stderr`的文件描述符。在POSIX兼容的应用中，使用符号`STDIN_FILENO`，`STDOUT_FILENO`，`STDERR_FILENO`以提高程序的可读性(这些常量在<unistd.h>头文件中)。文件描述符的范围从0到`OPEN_MAX - 1`之间。


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

    #include <unistd.h>
    ssize_t read(int fd, void *buf, size_t nbytes);

从打开的文件中读取内容，如果读取成功，返回读取到的字节数，如果遇到文件结尾，则返回0。

    #include <unistd.h>
    ssize_t write(int fd, const void *buf, size_t nbytes);

向打开的文件写入内容，在写入成功时，返回值与第三个参数nbytes相同，失败时返回-1。

    #include <unistd.h>
    ssize_t pread(int fd, void *buf, size_t nbytes, off_t offset);
    ssize_t pwrite(int fd, const void *buf, size_t nbytes, off_t offset);

pread/pwrite函数用于执行原子的I/O读写，这两个函数的执行都是原子的，首先会执行seek到指定偏移量，然后读写文件，这中间是不可中断的，另外这些操作并不会更新当前文件的偏移。

> 原子操作指的是一个由多个操作组合而成的一个操作，这个操作是不可中断的。

    #include <unistd.h>
    int dup(int fd);
    int dup2(int fd, int fd2);

上述两个函数可以用于复制一个已经存在的文件描述符。使用dup函数，能够保证返回的新的文件描述符是当前空闲的最小文件描述符，而使用dup2函数则通过第二个参数fd2指定新的文件描述符，如果新的文件描述符已经打开，则会先关闭它。

> 对于`dup2`函数，文件描述符fd2的`FD_CLOEXEC`标记被清除，所以，如果进程调用了exec函数该描述符可以保持打开状态。

    #include <unistd.h> 
    int fsync(int fd); 
    int fdatasync(int fd);
    void sync(void);

函数`sync`会将块缓冲区中的数据加入到写磁盘队列中并返回，不会等待真正的磁盘写入操作完成，通常系统守护进程会30s调用一次sync，以确保及时刷新内核的块缓冲区到磁盘上。命令`sync`就是调用了`sync`函数。

函数`fsync`只针对单个文件进行操作，它会等待磁盘写入完成才返回，确保数据正常写入。函数`fdatasync`与`fsync`类似，区别是它只会影响文件的数据部分，而`fsync`则会同步的更新文件的属性信息。



[ISO-C-HEADER]: ./resources/iso-c-headers.png
[POSIX-C-HEADER]:./resources/POSIX-C-HEADER.png
