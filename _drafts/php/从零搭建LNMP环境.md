

###从零搭建LNMP环境(一) - 编译源码安装PHP

我们使用[vagrant](https://www.vagrantup.com/)建立虚拟环境，这里使用"chef/centos-6.5"这个box，这个box是一个比较纯净的CentOS-6.5系统。


    $ vagrant init chef/centos-6.5
    $ vagrant up

执行上述命令之后，就已经建立了一个centos-6.5的虚拟机并且启动了，这时我们使用命令`ssh`连接到虚拟机。

    $ vagrant ssh

提示符变成了`[vagrant@localhost ~]$ ` ，说明成功连接到了虚拟机。接下来，我们就可以开始PHP开发环境的安装配置了。

> 如果不使用vagrant，可以自己安装一个CentOS系统或者是虚拟机，以下步骤与vagrant没有直接关系。

####编译源码安装PHP

首先，下载PHP安装文件，我们使用源码编译安装 **PHP 5.4.35**，到[PHP官网](http://php.net/downloads.php)下载PHP安装文件。

    $ wget http://jp1.php.net/distributions/php-5.4.35.tar.gz
    $ tar -zxvf php-5.4.35.tar.gz
    $ cd php-5.4.35

接下来对PHP源码进行编译安装，进入到源码目录之后，执行下列命令安装：

> 注意，如果需要mysql的话，最好是在变异的时候就提供参数并且指定为使用mysqlnd库，否则单独编译
> 扩展的形式安装只能使用MySQL Client Library。


    $ ./configure --prefix=/usr/local/php --with-config-file-path=/usr/local/php/etc --with-iconv-dir --with-freetype-dir --with-jpeg-dir --with-png-dir --with-zlib --with-libxml-dir=/usr --enable-xml --disable-rpath --enable-bcmath --enable-shmop --enable-sysvsem --enable-inline-optimization --with-curl --with-curlwrappers --enable-mbregex --enable-fpm --enable-mbstring --with-mcrypt --enable-ftp --with-gd --enable-gd-native-ttf --with-openssl --with-mhash --enable-pcntl --enable-sockets --with-xmlrpc --enable-zip --enable-soap --with-gettext --with-mysql=mysqlnd --with-mysqli=mysqlnd --with-pdo-mysql=mysqlnd


执行上述命令之后，提示如下错误:

	configure: error: no acceptable C compiler found in $PATH


这是因为没有安装gcc编译器，我们需要先安装gcc。

	$ sudo yum install gcc

安装之后，重新编译，这次出现了新的错误：

	configure: error: xml2-config not found. Please check your libxml2 installation.

提示找不到`libxml2`，没问题，安装一下就行了。

	$ sudo yum install libxml2-devel

继续重新编译，编译安装的过程就是不断解决问题的过程，每次遇到问题，我们去解决问题，没有什么是能难道我们的！

	configure: error: Cannot find OpenSSL\'s <evp.h>

因为我们启用了`--with-openssl`，因此，我们需要安装`openssl-devel`。

    $ sudo yum install openssl-devel


再次编译，提示

	configure: error: Please reinstall the libcurl distribution - easy.h should be in <curl-dir>/include/curl/


错误已经说明了，安装一下`libcurl`

	$ sudo yum install libcurl-devel

继续编译，我们还会遇到如下错误

	configure: error: jpeglib.h not found.

因为我们的编译参数中提供了对GD库的支持，因此需要安装以下几个库。

    $ sudo yum install libjpeg libjpeg-devel
    $ sudo yum install libpng libpng-devel
    $ sudo yum install freetype freetype-devel

安装了这么多lib，总该成功了吧，再次编译，悲剧的是，又报错了：

	configure: error: mcrypt.h not found. Please reinstall libmcrypt.

我们还需要安装`libmcrypt`，这个lib在yum中是没有的，因此需要下载下来，手动编译。

    $ wget ftp://mcrypt.hellug.gr/pub/crypto/mcrypt/libmcrypt/libmcrypt-2.5.7.tar.gz
    $ tar -zxvf libmcrypt-2.5.7.tar.gz
    $ cd libmcrypt-2.5.7
    $ ./configure
    $ make
    $ sudo make install

好了，我们再编译一次，这次一定要成功了，再不成功就不玩了。。。幸运的是，这次`configure`成功，
一鼓作气，编译安装：

	$ make
	$ sudo make install

一切都顺利的话，我们已经成功编译并且安装了PHP，安装目录在`/usr/local/php`。

最后，我们需要提供php的配置文件`php.ini`。

    $ sudo cp php.ini-development  /usr/local/php/etc/php.ini
    $ sudo mv /usr/local/php/etc/php-fpm.conf.default /usr/local/php/etc/php-fpm.conf


> PHP的安装目录由`configure`的`--prefix=目录`参数指定。另外，这里我们搭建的是用于开发的环境，
> 如果需要作为生产环境，则需要注意一些安全性问题，同时，建议不要拷贝`php.ini-development`文件了，
> 而是拷贝`php.ini-production`文件。

查看一下PHP的版本：

    $ /usr/local/php/bin/php --version
    PHP 5.4.35 (cli) (built: Nov 25 2014 08:23:11)
    Copyright (c) 1997-2014 The PHP Group
    Zend Engine v2.4.0, Copyright (c) 1998-2014 Zend Technologies

为了操作方便，可以将php的`bin`目录添加到环境变量。编辑`~/.bash_profile`，
在`export PATH`上面添加下面一行内容：

	PATH=$PATH:/usr/local/php/bin


然后执行如下命令

	$ source ~/.bash_profile


这样，我们就可以直接使用命令，而不需要添加目录了。

> 小技巧：如何查看PHP使用的是哪个配置文件?

    $ strace -e open php 2>&1 |grep php.ini
    open("/usr/local/php/bin/php.ini", O_RDONLY) = -1 ENOENT (No such file or directory)
    open("/usr/local/php/etc/php.ini", O_RDONLY) = 3

> 如果没有安装`strace`命令，使用`yum install strace` 安装即可。

####安装扩展
安装完成基本的PHP了，接下来我们需要安装一些符合业务需要的扩展。

#####安装yaf开发框架扩展
执行以下命令，使用pecl进行安装：

	$ sudo /usr/local/php/bin/pecl install yaf


不出意外的话，上述命令足以完成yaf的安装，接下来，需要在`php.ini`文件中启用yaf扩展。
编辑`/usr/local/php/etc/php.ini`，加入以下内容

	extension=yaf.so


在执行上述命令的时候，可能会出现下列错误：

	Cannot find autoconf. Please check your autoconf installation and the
	$PHP_AUTOCONF environment variable. Then, rerun this script.

	ERROR: `phpize` failed


这是因为没有安装`autoconf`导致的，安装以后就可以了

    $ sudo yum install m4
    $ sudo yum install autoconf



#####安装mysql和mysqli扩展

安装mysql相关扩展，推荐使用mysqlnd库，但是找了半天，实在是没有找到好的办法单独编译mysql扩展使用
mysqlnd库，最后在文档中看到下面这段内容：

    The MySQL database extensions must be configured to use the MySQL Client Library. In order to use the MySQL Native Driver, PHP needs to be built specifying that the MySQL database extensions are compiled with MySQL Native Driver support. This is done through configuration options prior to building the PHP source code.


这里说的是如果安装mysql扩展的话，只能使用MySQL Client Library（百度/谷歌有好多安装教程）。如果希望使用mysqlnd库的话，
只能在编译PHP的时候指定。因此，好像是只能重新编译PHP了。如果你有好的办法，可以交流交流。

#####安装eAccelerator扩展


    $ wget https://github.com/eaccelerator/eaccelerator/archive/master.zip -O eaccelerator.zip
    $ sudo yum install unzip
    $ unzip eaccelerator.zip
    $ cd eaccelerator-master/
    $ phpize
    $ ./configure --enable-shared
    $ make
    $ sudo make install

在php.ini中增加eAccelerator的配置信息:

    zend_extension="/usr/local/php/lib/php/extensions/no-debug-non-zts-20100525/eaccelerator.so"
    eaccelerator.shm_size="16"
    eaccelerator.cache_dir="/tmp/eaccelerator"
    eaccelerator.enable="1"
    eaccelerator.optimizer="1"
    eaccelerator.check_mtime="1"
    eaccelerator.debug="0"
    eaccelerator.filter=""
    eaccelerator.shm_ttl="0"
    eaccelerator.shm_prune_period="0"
    eaccelerator.shm_only="0"


执行`php -v`可以看到

    $ php -v
    PHP 5.4.35 (cli) (built: Nov 25 2014 10:40:18)
    Copyright (c) 1997-2014 The PHP Group
    Zend Engine v2.4.0, Copyright (c) 1998-2014 Zend Technologies
        with eAccelerator v1.0-dev, Copyright (c) 2004-2012 eAccelerator, by eAccelerator


#####安装Xdebug扩展


    $ wget http://github.com/xdebug/xdebug/archive/master.zip -O xdebug.zip
    $ unzip xdebug.zip
    $ cd xdebug-master
    $ /usr/local/php/bin/phpize
    $ ./configure --enable-xdebug
    $ make
    $ sudo make install


接下来配置php.ini，加入该扩展

    zend_extension="/usr/local/php/lib/php/extensions/no-debug-non-zts-20100525/xdebug.so"
    xdebug.remote_enable=1
    xdebug.remote_host=localhost
    xdebug.remote_port=9000
    xdebug.remote_connect_back=1
    ;xdebug.remote_autostart=1

#####安装OpCache扩展
因为eAccelerator已经没人维护好长时间了，所以，可以考虑使用OpCache。


    $ wget http://pecl.php.net/get/zendopcache-7.0.3.tgz
    $ tar -zxvf zendopcache-7.0.3.tgz
    $ cd zendopcache-7.0.3
    $ phpize
    $ make
    $ sudo make install


接下来需要配置php.ini，启用该扩展。

> 注意：如果与XDebug一起使用的话，需要确保OpCache在Xdebug之前加载。


    zend_extension="/usr/local/php/lib/php/extensions/no-debug-non-zts-20100525/opcache.so"
    opcache.memory_consumption=128
    opcache.interned_strings_buffer=8
    opcache.max_accelerated_files=4000
    opcache.revalidate_freq=60
    opcache.fast_shutdown=1
    opcache.enable_cli=1


查看是否安装成功

    $ php -v
    PHP 5.4.35 (cli) (built: Nov 25 2014 10:40:18)
    Copyright (c) 1997-2014 The PHP Group
    Zend Engine v2.4.0, Copyright (c) 1998-2014 Zend Technologies
        with Zend OPcache v7.0.3, Copyright (c) 1999-2014, by Zend Technologies
        with Xdebug v2.3.0dev, Copyright (c) 2002-2014, by Derick Rethans


#####安装Xhprof扩展

    $ wget http://pecl.php.net/get/xhprof-0.9.4.tgz
    $ tar -zxvf xhprof-0.9.4.tgz 
    $ cd xhprof-0.9.4
    $ cd extension/
    $ phpize
    $ ./configure
    $ make
    $ sudo make install


修改`php.ini`。


    [xhprof]
    extension=xhprof.so
    xhprof.output_dir=/tmp/xhprof


使用图形展示遇到的错误：

	failed to execute cmd: " dot -Tpng". stderr: `sh: dot: command not found '


解决办法:

    $ sudo yum install graphviz


###从零搭建LNMP环境(二) - 集成Nginx与PHP

安装Nginx的方式有很多种，这里我们还是编译源码进行安装，使用下列命令：

    $ wget http://nginx.org/download/nginx-1.6.2.tar.gz
    $ tar -zxvf nginx-1.6.2.tar.gz
    $ cd nginx-1.6.2
    $ ./configure --prefix=/usr/local/nginx
    $ make
    $ sudo make install


如果安装过程中出现如下错误

    ./configure: error: the HTTP rewrite module requires the PCRE library.
    You can either disable the module by using --without-http_rewrite_module
    option, or install the PCRE library into the system, or build the PCRE library
    statically from the source with nginx by using --with-pcre=<path> option.


则需要先安装pcre

	$ sudo yum install pcre-devel


安装完成之后，我们的Nginx安装目录在`/usr/local/nginx`。
接下来修改nginx的配置文件(/usr/local/nginx/conf/nginx.conf)，使其能够处理php脚本。


    worker_processes  1;

    events {
      worker_connections  1024;
    }
    http {
      include       mime.types;
      default_type  application/octet-stream;
      sendfile        on;
      keepalive_timeout  65;
      server {
        listen       80;
        server_name  _;
        root /vagrant;

        location / {
          index  index.html index.htm index.php;
        }

        location /demo {
          index index.php;
          if (!-e $request_filename) {
              rewrite ^/demo/(.*)$ /demo/index.php?$1 last;
              break;
          }
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
          root   html;
        }

        location ~ \.php$ {
          fastcgi_pass   127.0.0.1:9000;
          fastcgi_index  index.php;
          fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
          include        fastcgi_params;
        }
      }
    }



最后，启动Nginx时，需要先启动PHP-FPM。

    $ sudo /usr/local/php/sbin/php-fpm
    $ sudo /usr/local/nginx/sbin/nginx


对于Nginx的重启以及关闭操作，可以使用以下命令

	$ sudo /usr/local/nginx/sbin/nginx -s [reload|restart|stop]


而PHP-FPM，则麻烦一点，需要先使用`ps -ef|grep php-fpm`获取**master process**的进程ID，
再使用`kill -USR2`:

    $ ps -ef|grep php-fpm

    root      6221     1  0 02:17 ?        00:00:00 php-fpm: master process (/usr/local/php/etc/php-fpm.conf)
    nobody    6222  6221  0 02:17 ?        00:00:00 php-fpm: pool www
    nobody    6223  6221  0 02:17 ?        00:00:00 php-fpm: pool www
    vagrant   6233  1623  0 02:18 pts/0    00:00:00 grep php-fpm

    $ sudo kill -USR2 6221


> 注意: `-USR2`参数为重启，`-INT`参数为关闭。

###从零搭建LNMP环境(三) - 安装MySQL数据库服务器

废话不多说，虽然可以通过yum直接安装MySQL，但是为了能够对安装过程有一个比较清晰的认识，
我们这里还是使用源码编译安装。

    $ wget http://dev.mysql.com/get/Downloads/MySQL-5.6/mysql-5.6.21.tar.gz
    $ tar -zxvf mysql-5.6.21.tar.gz
    $ cd mysql-5.6.21


文件已经下载并且解压好了，在安装之前，我们需要为mysql建立名为`mysql`的用户名和用户组。

    $ sudo groupadd mysql
    $ sudo useradd -r -g mysql mysql


建立好用户名和组之后，就可以进行编译安装了

    $ cmake .
    $ make
    $ sudo make install


> 编译过程比较漫长，耐心一点

如果没有安装cmake，则需要先安装

    $ sudo yum install cmake
    $ sudo yum install gcc-c++


如果提示

	Warning: Bison executable not found in PATH

则需要安装bison

	$ sudo yum install bison


如果出现以下错误

    -- Could NOT find Curses (missing:  CURSES_LIBRARY CURSES_INCLUDE_PATH)
    CMake Error at cmake/readline.cmake:85 (MESSAGE):
      Curses library not found.  Please install appropriate package,

      remove CMakeCache.txt and rerun cmake.On Debian/Ubuntu, package name is libncurses5-dev, on Redhat and derivates it is ncurses-devel.

则需要安装

	$ sudo yum install ncurses-devel


经过漫长的编译过程，我们的mysql终于安装到了`/usr/local/mysql`目录，接下来，我们需要对mysql
进行相应的配置，使得mysql变得可用。

    $ cd /usr/local/mysql/
    $ sudo chown -R mysql .
    $ sudo chgrp -R mysql .
    $ sudo scripts/mysql_install_db --user=mysql


这里的`mysql_install_db`脚本只有在手动编译安装mysql的时候需要，该脚本为mysql建立了授权表。

> 大多数的mysql安装是属于root用户的，但是必须保证data目录是数据mysql用户。

    $ sudo chown -R root .
    $ sudo chown -R mysql data


最后，我们需要创建mysql的配置文件

    $ sudo cp support-files/my-default.cnf /etc/my.cnf


####配置MySQL开机启动
如果希望在系统启动的时候mysql也能够自动的启动，可以执行下面的命令

    $ sudo cp support-files/mysql.server /etc/init.d/mysql.server
    $ sudo chmod u+x /etc/init.d/mysql.server
    $ sudo chkconfig --add mysql.server


执行`chkconfig |grep mysql`看到如下，特别是运行级别3为启用，则说明设置成功。

	$ chkconfig |grep mysql
	mysql.server   	0:关闭	1:关闭	2:启用	3:启用	4:启用	5:启用	6:关闭


可以通过`mysql.server`脚本启动和关闭mysql。

	$ sudo /etc/init.d/mysql.server [start|stop]


如果要手动操作的话，启动mysql的话使用命令:

	$ sudo /usr/local/mysql/bin/mysqld_safe --user=mysql &


关闭mysql:

	$ ./mysqladmin -u root shutdown


####修改root账号密码

新安装的mysql数据库的root账号是没有设置密码的，因此，所有人都可以进行访问，为了安全起见，
我们需要为root账号设置一个密码。


    $ /usr/local/mysql/bin/mysql -uroot
    mysql> SELECT User, Host, Password FROM mysql.user;
    +------+-----------------------+----------+
    | User | Host                  | Password |
    +------+-----------------------+----------+
    | root | localhost             |          |
    | root | localhost.localdomain |          |
    | root | 127.0.0.1             |          |
    | root | ::1                   |          |
    |      | localhost             |          |
    |      | localhost.localdomain |          |
    +------+-----------------------+----------+
    6 rows in set (0.00 sec)


> 这里User一列为空的是匿名用户信息，使用`mysql`直接登陆的时候，没有提供账号的话，
> 就会以该用户的身份登陆数据库，如果不需要该用户的话，可以删除掉该用户信息。

    mysql> DROP USER ''@'localhost';
    mysql> DROP USER ''@'localhost.localdomain';


通常我们有三种方式为mysql用户设置密码：

第一种方式是使用`SET PASSWORD`，使用该指令，我们需要登陆到mysql。

    mysql> SET PASSWORD FOR 'root'@'localhost' = PASSWORD('root');
    Query OK, 0 rows affected (0.00 sec)

    mysql> SET PASSWORD FOR 'root'@'127.0.0.1' = PASSWORD('root');
    Query OK, 0 rows affected (0.00 sec)

    mysql> SET PASSWORD FOR 'root'@'::1' = PASSWORD('root');
    Query OK, 0 rows affected (0.00 sec)


第二种方式更加直接，使用`UPDATA`直接修改数据表。

    mysql> UPDATE mysql.user SET Password = PASSWORD('root') WHERE User = 'root';
    Query OK, 1 row affected (0.00 sec)
    Rows matched: 4  Changed: 1  Warnings: 0

    mysql> FLUSH PRIVILEGES;
    Query OK, 0 rows affected (0.00 sec)


这里的`FLUSH`语句让数据库重新加载授权表，否则需要等下次重启才能生效。

第三种方式是使用`mysqladmin`命令，不过这种方式不能为`'root'@'127.0.0.1'`和`'root'@'::1'`
修改密码。

    shell> mysqladmin -u root password "newpwd"
    shell> mysqladmin -u root -h host_name password "newpwd"

