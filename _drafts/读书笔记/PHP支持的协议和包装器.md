##PHP支持的协议和包装器
在PHP中内建了很多类似于URL样式的协议，这些协议可以用在文件系统函数中，例如`fopen()`，`copy()`，`file_exists()`，`filesize()`。当然，PHP也支持使用`stream_wrapper_register()`函数注册自定义的包装器。

> 这里所说的URL样式的包装器是符合`scheme://...`格式的语法，`scheme:/`和`scheme:`语法是不支持的。

###1 内置协议

####1.1 file:// - 访问本地文件系统
用法：

- /path/to/file.ext
- relative/path/to/file.ext
- fileInCwd.ext
- C:/path/to/winfile.ext
- C:\path\to\winfile.ext
- \\smbserver\share\path\to\winfile.ext
- file:///path/to/file.ext

####1.2 http://, https://, ftp:// 访问http/https/ftp
```php
<?php
$url = 'http://www.example.com/redirecting_page.php';

$fp = fopen($url, 'r');
```

####1.3 php:// - 访问各种I/O流
PHP提供了各种I/O流用于访问PHP自身的输入输出流，标准输入、输出、错误文件描述符，基于内存或者磁盘的临时文件流，可以用于维护其它文件资源的过滤器等。

#####1.3.1 php://stdin, php://stdout, php://stderr
`php://stdin`, `php://stdout`, `php://stderr`允许程序直接访问对应的输入输出流，这个stream是对文件描述符的一个副本，因此，如果你打开了`php://stdin`，随后又关闭它，这样只会关闭当前你使用的文件描述符的副本，而不会影响它引用的实际的`STDIN`。

`php://stdin`是只读的, `php://stdout`和`php://stderr`是只写的。

> 注意的是，在`PHP 5.2.1`之前， 这种实现存在一些BUG，推荐直接使用常量`STDIN`, `STDOUT`和`STDERR`代替直接使用包装器打开流。

#####1.3.2 php://input
`php://input`是只读的流，用于从请求体中读取原生的数据。在POST请求中，一般更倾向与使用`php://input`取代`$HTTP_RAW_POST_DATA`，因为前者不会依赖于`php.ini`指令的配置。此外，在`always_populate_raw_post_data`指令没有激活的情况下，使用`php://input`比为了使用`$HTTP_RAW_POST_DATA`而激活该指令填充这个变量占用更少的内存。当然，如果表单数据为的`enctype="multipart/form-data"`时，`php://input`是不可用的。

> 在PHP 5.6之前，使用`php://input`打开的流只能够读取一次，它不支持seek操作，如果需要重新读取的话，需要重新打开另一个`php://input`流并重新读取。

#####1.3.3 php://output
`php://output`是一个只写的流，它允许你使用`print`和`echo`的方式写数据到输出缓冲区。

#####1.3.4 php://fd
它允许直接访问给定的文件描述符。例如:`php://fd/3`引用了文件描述符3。

#####1.3.5 php://memory 和php://temp
这两个包装器是可读写的流，它们可以将临时数据写入到类似文件的包装器中。这两个的不同之处在于`php://memory`总是将数据写入到内存当中，而`php://temp`则当数据量超过预定义的大小（默认是2M）时，将会使用临日文件存储。临时文件的位置与函数`sys_get_temp_dir()`相同。

`php://temp`使用的内存限制通过追加的`/maxmemory:NN`指定，NN为数据的最大量，单位是byte.

```php
<?php
// Set the limit to 5 MB.
$fiveMBs = 5 * 1024 * 1024;
$fp = fopen("php://temp/maxmemory:$fiveMBs", 'r+');

fputs($fp, "hello\n");

// Read what we have written.
rewind($fp);
echo stream_get_contents($fp);
?>
```

#####1.3.6 php://filter
`php://filter`是一种元包装器，用于打开数据流时对数据流添加过滤，常用于对`readfile()`, `file()`, `file_get_contents()`进行过滤。

可选参数resource/read/write/过滤器列表。
> 详见[PHP官方文档](http://cn2.php.net/manual/en/wrappers.php.php)

简单的使用：
```php
<?php
/* This is equivalent to simply:
  readfile("http://www.example.com");
  since no filters are actually specified */

readfile("php://filter/resource=http://www.example.com");
?>
```
稍微复杂一些：
```php
<?php
/* This will output the contents of
  www.example.com entirely in uppercase */
readfile("php://filter/read=string.toupper/resource=http://www.example.com");

/* This will do the same as above
  but will also ROT13 encode it */
readfile("php://filter/read=string.toupper|string.rot13/resource=http://www.example.com");

/* This will filter the string "Hello World"
  through the rot13 filter, then write to
  example.txt in the current directory */
file_put_contents("php://filter/write=string.rot13/resource=example.txt","Hello World");
```

####1.4 zlib:// bzip2:// zip:// - 压缩流
用法：
- compress.zlib://file.gz
- compress.bzip2://file.bz2
- zip://archive.zip#dir/file.txt

```php
<?php
$fp = fopen('compress.zip://./foo.zip#bar.txt', 'r');
if( $fp ){
    while( !feof($fp) ){
        echo fread($fp, 8192);
    }
    fclose($fp);
}
```

####1.5 data://
用法：

- data://text/plain;base64,


