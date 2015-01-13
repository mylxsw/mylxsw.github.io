##构建第一个PHP扩展


首先需要确定系统中安装了gcc编译器，合适版本的bison等，下面是从源码编译安装PHP需要执行的基本命令：


    # cd php-src
    # ./buildconf
    # ./configure --enable-debug --enable-maintainer-zts --enable-cli
    # make
    # make install


####构建一个基本的扩展骨架

在PHP扩展开发时，使用`ext_skel`完成扩展的结构骨架创建。


    $ ./ext_skel
    ./ext_skel --extname=module [--proto=file] [--stubs=file] [--xml[=file]]
               [--skel=dir] [--full-xml] [--no-help]

      --extname=module   这里的module是要创建的扩展名称
      --proto=file       这里的file文件包含了要创建的函数的原型
      --stubs=file       generate only function stubs in file
      --xml              generate xml documentation to be added to phpdoc-cvs
      --skel=dir         创建扩展骨架的目录
      --full-xml         generate xml documentation for a self-contained extension (not yet implemented)
      --no-help          don't try to be nice and create comments in the code and helper functions to test if the module compiled


> 注意： `ext_skel`命令文件在源文件的**ext**目录下。

这里的`--extname`参数是要创建的扩展名称，扩展名称为 *小写字母 + 下划线* 组成，并且，
在`ext`目录中必须是唯一的。

例如，这里要创建一个名为`ext_demo_1`的PHP扩展:


    /vagrant/ext$ ./ext_skel --extname=ext_demo_1
    Creating directory ext_demo_1
    Creating basic files: config.m4 config.w32 .svnignore ext_demo_1.c php_ext_demo_1.h CREDITS EXPERIMENTAL tests/001.phpt ext_demo_1.php [done].

    To use your new extension, you will have to execute the following steps:

    1.  $ cd ..
    2.  $ vi ext/ext_demo_1/config.m4
    3.  $ ./buildconf
    4.  $ ./configure --[with|enable]-ext_demo_1
    5.  $ make
    6.  $ ./php -f ext/ext_demo_1/ext_demo_1.php
    7.  $ vi ext/ext_demo_1/ext_demo_1.c
    8.  $ make

    Repeat steps 3-6 until you are satisfied with ext/ext_demo_1/config.m4 and
    step 6 confirms that your module is compiled into PHP. Then, start writing
    code and repeat the last two steps as often as necessary.


现在，在ext目录下出现了一个新建的扩展目录`ext_demo_1`：

    /vagrant/ext/ext_demo_1$ ls
    config.m4   CREDITS       ext_demo_1.c    php_ext_demo_1.h
    config.w32  EXPERIMENTAL  ext_demo_1.php  tests


这时，该扩展是无法编译通过的，需要先编辑`config.m4`文件才行。

####配置文件`config.m4`

配置文件`config.m4`告诉UNIX构建系统扩展支持的`configure`选项以及扩展需要的额外的库，
包含哪些源文件等，该文件使用的是GNU的`autoconf`语法，以`dnl`开头的行为注释，使用中括号（[和]）包含的为字符串。

> autoconf语法参见 [AUTOCONF文档](http://www.gnu.org/software/autoconf/manual/)


    PHP_ARG_ENABLE(ext_demo_1, whether to enable ext_demo_1 support,
    [  --enable-ext_demo_1           Enable ext_demo_1 support])

    if test "$PHP_EXT_DEMO_1" != "no"; then
      PHP_SUBST(EXT_DEMO_1_SHARED_LIBADD)
      PHP_NEW_EXTENSION(ext_demo_1, ext_demo_1.c, $ext_shared)
    fi


上述为`autoconf`的配置文件，第一个宏`PHP_ARG_ENABLE`，含有三个参数：

- ext_demo_1 这是第一个参数，为`./configure`建立了名为`enable-ext_demo_1`的选项
- 第二个参数将会在`./configure`命令处理到该扩展的配置文件时，显示该参数的内容
- 第三个参数是`./configure`命令的帮助，在使用`./configure --help`的时候显示

第二个宏为`PHP_NEW_EXTENSION`，该宏声明了扩展的模块和必须要编译作为扩展一部分的源码文件。
如果需要多个源文件，则使用空格分隔，第三个参数$ext_shared与调用
`PHP_SUBST(EXT_DEMO_1_SHARED_LIBADD)`有关。


	PHP_NEW_EXTENSION(ext_demo_1, ext_demo_1.c, $ext_shared)


####编译扩展

修改完`config.m4`文件之后，接下来编译PHP和扩展。


    /vagrant$ ./configure --disable-libxml --enable-ext_demo_1 --disable-dom --disable-simplexml --disable-xml --disable-xmlreader --disable-xmlwriter --without-pear --prefix=/usr/local/php
    /vagrant$ make
    /vagrant$ sudo make install
    Installing PHP SAPI module:       cgi
    Installing PHP CGI binary: /usr/local/php/bin/
    Installing PHP CLI binary:        /usr/local/php/bin/
    Installing PHP CLI man page:      /usr/local/php/man/man1/
    Installing build environment:     /usr/local/php/lib/php/build/
    Installing header files:          /usr/local/php/include/php/
    Installing helper programs:       /usr/local/php/bin/
      program: phpize
      program: php-config
    Installing man pages:             /usr/local/php/man/man1/
      page: phpize.1
      page: php-config.1
    /vagrant/build/shtool install -c ext/phar/phar.phar /usr/local/php/bin
    ln -s -f /usr/local/php/bin/phar.phar /usr/local/php/bin/phar
    Installing PDO headers:          /usr/local/php/include/php/ext/pdo/


此时，PHP安装在了`/usr/local/php`目录下，进入该目录，可以看到如下文件:


    /usr/local/php$ ls
    bin  include  lib  man

进入`/usr/local/php/bin`目录，执行以下命令：


    /usr/local/php/bin$ ./php --info|grep demo
    Configure Command =>  './configure'  '--disable-libxml' '--enable-ext_demo_1' '--disable-dom' '--disable-simplexml' '--disable-xml' '--disable-xmlreader' '--disable-xmlwriter' '--without-pear' '--prefix=/usr/local/php'
    ext_demo_1
    ext_demo_1 support => enabled


可以看到，`phpinfo()`中扩展支持已经启用了，按照上述步骤安装的扩展中包含了一个测试扩展是否能够正常工作的函数，
该函数名为`confirm_ext_demo_1_compiled(arg)`，执行结果如下：

    /usr/local/php/bin$ ./php -r "echo confirm_ext_demo_1_compiled('mylxsw');"
    Congratulations! You have successfully modified ext/ext_demo_1/config.m4. Module mylxsw is now compiled into PHP.

可以看到，`ext_demo_1`扩展安装成功了。
