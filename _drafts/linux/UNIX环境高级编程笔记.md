###UNIX环境高级编程笔记


下图是ISO-C标准提供的头文件

![ISO-C-HEADER][]

下图是POSIX提供的头文件

![POSIX-C-HEADER][]


####File I/O

这里所要讲述的文件IO是非缓冲的文件IO，与标准I/O不同的是，它的每次`read`或者`write`都会执行内核的系统调用。

> 非缓冲的文件IO是POSIX.1标准的一部分，不属于ISO C标准。

对内核来说，每个打开的文件都会分配一个文件描述符，内核使用文件描述符操作文件，在UNIX系统中，通常`0`，`1`，`2`三个描述符作为`标准输入stdin`，`标准输出stdout`，`标准错误输出stderr`的文件描述符。在POSIX兼容的应用中，使用符号`STDIN_FILENO`，`STDOUT_FILENO`，`STDERR_FILENO`以提高程序的可读性。文件描述符的范围从0到`OPEN_MAX - 1`之间。

#####文件打开/创建函数

    #include <fcntl.h>
    int open(const char *path, int oflag, ... /* mode_t mode */ );
    int openat(int fd, const char *path, int oflag, ... /* mode_t mode */ );



[ISO-C-HEADER]: ./resources/iso-c-headers.png
[POSIX-C-HEADER]:./resources/POSIX-C-HEADER.png
