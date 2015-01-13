##Zend 线程安全

在PHP诞生的初期，它总是以单线程的CGI方式运行的，因此，根本不需要考虑多线程问题，因为进程的处理不会超过单个请求。
我们可以在内部的全局空间声明一个全局变量，并且可以随时访问或者修改该变量的值，而不用担心该变量是否是还没有定义。
在每个请求的CGI处理结束的时候，所有的资源都会被自动的释放。

后来，PHP嵌入到了多进程的web服务器，比如Apache之中运行，这时，因为请求到来时，
每个进程每次都会有一个独立的进程空间，如果在请求开始的时候进行了合适的初始化了，
在请求结束的时候进行了对应的清理工作，给定的内部变量或者全局变量依然可以被安全的访问。当然，在这时候，
需要添加对每个请求的内存管理，以防止资源泄漏导致服务器失控。

随着单进程多线程的web服务器的出现，我们急需要一种能够处理全局数据的方式，最终产生了TSRM（线程安全资源管理）。

###线程安全和非线程安全声明

在非多线程的应用中，你可以在源文件的最顶部声明全局变量，编译器将会为应用中的数据分配内存空间块。
在多线程环境中，每个应用都需要他们自己的数据元素，对每个线程，都需要分配相隔离的内存块，
在需要访问数据的时候，给定的线程将会访问正确的内存块。

###线程安全数据池

在扩展的 `MINIT`阶段，TSRM层将会通知扩展哪些数据需要使用一个或者多个`ts_allocate_id()`函数进行存储。
TSRM adds that byte count to its running total of data space requirements,
and returns a new, unique identifier for that segment's portion of the thread's data pool.

```c
typedef struct {
    int sampleint;
    char *samplestring;
} php_sample_globals;
int sample_globals_id;
PHP_MINIT_FUNCTION(sample)
{
    ts_allocate_id(&sample_globals_id,
        sizeof(php_sample_globals),
        (ts_allocate_ctor) php_sample_globals_ctor,
        (ts_allocate_dtor) php_sample_globals_dtor);
    return SUCCESS;
}
```
当一个需要访问这些数据段的请求到来的时候，扩展会从TSRM层请求一个当前线程资源池中
根据`ts_allocate_id()`函数返回的资源ID做一定偏移量的指针。

换句话说，在之前的模块相关的`MINIT`代码段中，你可能看到类似于`SAMPLE_G(sampleint) = 5;`这样的代码。
在线程安全方式的构建中，该短代码进行宏展开之后是如下代码：

```c
(((php_sample_globals*)(*((void ***)tsrm_ls))[sample_globals_id-1])->sampleint = 5;
```
> 如果看不懂上面这段代码的话，请无视它，因为该部分已经整合到PHPAPI中，因此，大部分开发者可以不用知道它是如何工作的。

###当在非多线程环境中
因为多线程的构建环境下，对于全局变量的访问，增加了很多从线程数据池中检索数据的步骤，与非多线程环境相比，
执行效率会产生一定的影响。

再次思考之前的程序，这次在单线程环境中构建：

```c
typedef struct {
    int sampleint;
    char *samplestring;
} php_sample_globals;
php_sample_globals sample_globals;
PHP_MINIT_FUNCTION(sample)
{
    php_sample_globals_ctor(&sample_globals TSRMLS_CC);
    return SUCCESS;
}
```
可以看到，与之前需要先创建线程资源的ID，然后使用`SAMPLE_G(sampleint) = 5;`对数据进行访问不同，
这里可以直接使用`sample_globals.sampleint = 5;`，相比而言，代码更加简单，快速，高效。

单线程的构建中，因为进程是相互隔离的，如果一个进程进入了非预期的死循环，这样就不会导致整个web服务器挂掉。
Apache的`MaxRequestsPerChild`指令也是按照这种思路，经常故意的结束子进程然后重新创建以避免进程出现异常的。

###封装全局访问

在创建扩展的时候，你不需要知道环境是否是线程安全的。幸运的是，你将会使用的大部分包含的文件中，
都会使用`ZTS`预处理指令。当PHP构建在线程安全的环境中时，或者是SAPI需要，或者是启用了`maintainer-zts`
选项，将会自动定义`ZTS`宏，程序中使用`#ifdef ZTS`指令检测是否定义了`ZTS`。
