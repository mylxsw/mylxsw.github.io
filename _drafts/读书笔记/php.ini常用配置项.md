本文记录了php.ini中比较常用的配置项及其含义，以便参阅以修改php的行为。 文中各个配置项的说明来自对php官方文档的翻译，水平有限，敬请谅解。   

- **short_open_tag**   
是否支持短标记，在php5.4之前，该选项是off的，在php5.4之后，默认是on
- **asp_tags**   
是否允许使用ASP样式的语法，如&lt;% %&gt;
- **precision**   
浮点型数字显示的位数（精度）
- **serialize_precision**   
浮点型数字在序列化是保存的位数（精度）
- **expose_php**   
是否对外界曝露服务器上安装的是php，包含在HTTP的header中加入php的版本号（例如：X-Powered-By: PHP/5.3.7）。在php5.5.0之前，php的logo也总是曝露的，因此，如果在你的url后面加上guid将会显示一个logo（例如：[http://www.php.net/?=PHPE9568F34-D428-11d2-A769-00AA001ACF42](http://www.php.net/?=PHPE9568F34-D428-11d2-A769-00AA001ACF42)），同样，这也影响了 ```phpinfo()``` 的输出，如果禁止的话，php的logo和附加信息将不会被显示。   
> 从php5.5.0开始，这个输出logo的标示和 ```php_logo_guid()```函数已经从php中移除，因此如果在url后面加上guid的话，将不会再显示php的logo。如果将expose_php设置为off是不会影响 ```phpinfo()``` 函数中php的logo显示的。   

- **disable_functions**   
这个指令允许你因为安全考虑而禁止部分php函数，它接受一个以英文逗号分割的函数名列表，该指令不受安全模式影响。   
只有内部函数可以通过这个指令禁止，用户自定义的函数是不受影响的。   
这个指令必须在php.ini中设置，例如，你不能在 httpd.conf中进行设置。
- **disable_class**   
这个指令允许你因为安全考虑而禁用部分php类，它接受一个以英文逗号分隔的类名列表，该指令也不受安全模式影响，必须在php.ini中进行配置
- **zend.multibyte**   
允许解析源码中的多字节编码字符
- **detect_unicode**   
检查BOM(字节顺序标记)并且查看是否文件包含可用的多字节字符。这个检测过程在处理 ```__halt_compiler()``` 之前执行，只有在Zend Multibyte 模式下可用
- **exit_on_timeout**   
这个指令是Apache1的mod_php专用的，用于强制Apache子进程在php脚本执行超时的时候退出。这个超时在Apache1内部造成了一个 ```loggjmp()``` 调用，可能会造成一些扩展的状态不一致。通过终止进程，使得任何为解决的锁或者是内存都会被清理掉。
- **memory_limit**    
默认值是128M，在PHP5.2.0之前是8M， 在5.2.0中是16M。   
这个配置项设置了允许给php脚本执行分配的最大内存，这有助于防止脚本耗尽服务器全部内存。注意的是，如果需要设置为不限制内存，将该值设置为 ```-1``` .   
在PHP5.2.1之前，如果要使用该指令的话，必须在编译php的时候，在configure中指定 ```--enable-memeory-limit``` ， 这个编译时的标记也是函数 ```memory_get_usage()``` 和 ```memory_get_peak_usage()``` 所依赖的（在php5.2.1之前）。   
如果使用整数值的话，这个值将会以byte为单位。 
－ **register_global**   
是否将EGPCS（Env，GET，POST，Cookie，Server）注册为全局变量。   
在PHP4.2.0之后，该选项默认时off。   
需要注意的时，该项不能在运行时设置（ini_set），但是你可以通过 ```.htaccess``` 进行设置，例如 ```php_flag register_globals off```.   
> 注意： 这个特性在PHP5.3.0已经不推荐使用，并且在PHP5.4.0之后移除了。

- **enable_post_data_reading**   
禁止这个选项将会使 ```$_POST``` 和 ```$_FILES``` 不会被填充，唯一能够访问post数据的方法是通过 ```php://input``` 流包装器。这在代理请求或者是在内存中更高效处理post数据的时候是非常有用的。
- **post_max_size**   
设置最大允许的post数据大小。这个设置也影响这文件上传。要上传一个大的文件的话，这个值必须大于 ```upload_max_filesize``` 指令。如果你的脚本允许内存限制了， ```memory_limit``` 指令也会影响文件上传。简单来说，```memory_limit``` 应该大于 ```post_max_size```. 当使用整数的时候，单位是byte。如果post的数据比 ```post_max_size``` 要大的话，$_POST和$_FILES将会是空的。可以通过多种方法跟踪这个问题，例如，通过处理数据的脚本传递一个$_GET变量，```<form action="edit.php?processed=1" >``` ,然后检查$_GET['processed']是否被设置了。
- **auto_prefend_file**   
指定了在主文件执行之前自动解析的文件，这个就像通过require函数包含一样，因此，会使用include_path。如果指定为none则禁止自动前缀追加文件。
- **auto_append_file**   
指定了在主文件执行之后自动解析的文件，与 ```auto_prefend_file``` 类似。如果指定为none则禁止该功能。   
> 注意： 如果脚本中使用exit()终止了，则auto-append将不会发生。

- **always_populate_raw_post_data**   
总是填充$HTTP_RAW_POST_DATA以包含POST数据，否则，这个变量将会仅仅被填充无法识别的MIIME数据类型。然而，访问原始POST数据的最佳方法是通过 ```php://input```,$HTTP_RAW_POST_DATA在 ```enctype="multipart/form-data"``` 的情况下是不可用的。
- **include_path**   
指定了 ```require``` , ```include``` , ```fopen()``` , ```file()``` , ```readfile()``` 和 ```file_get_contents()``` 查询文件的路径。格式与操作系统的PATH环境变量是一致的。   
你可以在运行时使用 ```set_include_path()``` 修改include路径。   
例如＃1 UNIX系统下
<pre>include_path=".:/php/includes"</pre>
＃2 Windows下
<pre>include_path=".;c:\php\includes"</pre>
- **open_basedir**   
限制php只能够访问指定目录树下的文件，包含文件本身，这个命令不受安全模式影响。   
当一个脚本试图访问文件系统的时候，例如使用 ```include``` 或者 ```fopen()``` ，会检查文件的位置是否被允许，当被访问的文件在指定的目录之外的时候，php将会拒绝对该文件的访问。所有的符号链接也会被解析，因此，通过符号链接也是无法绕过该限制的。如果文件不存在的话，符号链接将无法被解析，同时将会用文件名与open_basedir进行比较。   
```open_basedir``` 不仅可以影响文件系统函数，例如，如果mysql配置使用mysqlnd驱动的话，LOAD DATA INFILE将会受到open_basedir的影响。   
特殊的值```.``` 代表了脚本所在的目录就是base－directroy，但是需要注意的是，脚本的工作目录可以通过 ```chdir()``` 进行修改，这是非常危险的。   
指令 ```open_basedir``` 对目录的限制是从php5.2.16和php5.3.4开始的，在之前的版本中，他会使用前缀进行匹配，也就是说，如果```open_basedir=/dir/incl```， 这将会允许对 ```/dir/include``` 和```/dir/incls``` 的访问。当你希望限制在某个目录下的时候，在后面加一个```/```。例如: ```open_basedir=/dir/incl/```.   
默认情况下是允许对所有目录进行访问的。   
> 注意： 从php5.3.0开始，该指令是可以在运行时指定的，这意味这，如果在php.ini中设置该指令为/www/的话，脚本执行过程中可以使用```ini_set()```修改配置为```/www/tmp/```.当列出多个目录的时候，你可以使用PATH_SEPARATOR常量作为分隔符。

- **extension_dir**  
php动态载入扩展的目录。
- **extension**   
当php启动的时候自动载入哪些扩展。 
- **file_uploads**   
是否允许HTTP文件上传，相关指令有```upload_max_size```, ```upload_tmp_dir```, ```post_max_size```.
- **upload_tmp_dir**   
用于存储使用文件上传功能上传的文件的临时目录，这个目录必须对运行php的用户是可写的，如果没有指定的话，php将会使用系统默认的。   
如果这里指定的目录对php不可写，php将会使用系统的默认临时目录，如果```open_basedir```指令开启，系统默认的临时文件目录必须是被允许的才能上传成功。
- **upload_max_filesize**  
上传文件最大的尺寸，当使用整数值的时候，单位是byte。
- **max_file_uploads**   
同时允许上传的总文件上数量，从php5.3.4开始，在执行提交的时候如果上传文件字段为空的话不会记录到该限制的数量中。

   ［持续整理...］ 