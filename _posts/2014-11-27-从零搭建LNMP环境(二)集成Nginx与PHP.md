---
categories: [运维]
tags: [lnmp, nginx, php]
thumb: /assets/images/thumb/lnmp.gif
---

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

<!--more-->

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
