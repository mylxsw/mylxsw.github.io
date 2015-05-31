---
categories: [Docker]
tags: [Docker, PHP, Nginx]
thumb: http://source.aicode.cc/markdown/docker.jpg
---

Docker提供了多个容器直接访问的方法，最简单的方式是直接使用端口映射`-p`参数指定映射的端口或者`-P`映射所有端口，多个容器直接通过网络端口进行访问。

但网络端口映射方式并不是Docker中连接多个容器的唯一方式，还可以使用Docker的连接系统(`--link`)连接多个容器，当容器连接到一起时，接受者容器就可以看到源容器的信息。

##建立容器之间的连接 - 以Nginx+PHP为例

在容器直接建立连接要使用`--link`选项

	--link <name or id>:alias

这里我们通过建立一个 [nginx/php-fpm][] 的服务，示例一下如何在两个或者多个容器之间建立连接。

要建立容器连接的话，就要依赖容器的名字了，使用`--name`指定源容器的名字为`phpfpm`

	docker run --name phpfpm -d -v /Users/mylxsw/codes/php:/app php:5.6-fpm

接下来创建nginx容器，并且连接到phpfpm容器上去

	docker run --name nginx_server -d -p 80:80 --link phpfpm:phpfpm -v /Users/mylxsw/Dockers/php/nginx.conf:/etc/nginx/nginx.conf --volumes-from phpfpm  nginx

这里通过`--link`选项指定了要连接的容器是phpfpm，并且使用`--volumes-from phpfpm`将phpfpm容器挂载的卷也挂载到了nginx容器上，另外，这里使用自定义的nginx配置文件（nginx.conf）覆盖了原先的配置，新的 [nginx.conf][] 内容如下：

	...
    root   /app; # 这里设置了项目挂载的容器的根目录

    location ~ \.php$ {
        fastcgi_pass   phpfpm:9000;# phpfpm访问地址
	...

需要注意的是，在该配置文件中设置了服务器的根目录(root)为`/app`目录，也就是我们挂载的目录，另外是phpfpm的配置，我们将`fastcgi_pass`的值从`127.0.0.1:9000`改为了`phpfpm:9000`，这里的`phpfpm`是域名，在nginx容器的`/etc/hosts`文件中自动配置为phpfpm容器的访问IP。

##容器互通信息

建立两个容器之间的连接之后，在接收容器（Recipient）中必然会需要访问源容器（Source）的资源，我们在为容器建立连接时，源容器在创建时并没有使用`-p/-P`指定要暴露出来的端口，因此如何访问源容器的信息呢？

为了可以让接收容器能够访问源容器的信息，Docker提供了两种方式：

- 环境变量
- /etc/hosts文件

###环境变量

Docker在连接容器的时候，会根据`--link`提供的参数自动的在接收者容器中创建一些环境变量，包括源容器的`Dockerfile`中使用`ENV`命令设置的环境变量和源容器启动时(`docker run`)，使用`-e`或者`--env`， `--env-file`参数指定的环境变量。

主要包含以下环境变量，这里假设alias=**webdb**。

    <alias>_NAME
    <name>_PORT_<port>_<protocol>
    <prefix>_ADDR
    <prefix>_PORT
    <prefix>_PROTO

例如:

    $ docker run  -i -t --rm --link phpfpm:php php:5.6-fpm env
    PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
    HOSTNAME=e5973c0d639f
    TERM=xterm
    PHP_PORT=tcp://172.17.0.74:9000
    PHP_PORT_9000_TCP=tcp://172.17.0.74:9000
    PHP_PORT_9000_TCP_ADDR=172.17.0.74
    PHP_PORT_9000_TCP_PORT=9000
    PHP_PORT_9000_TCP_PROTO=tcp
    PHP_NAME=/tender_banach/php
    PHP_ENV_PHP_INI_DIR=/usr/local/etc/php
    PHP_ENV_GPG_KEYS=6E4F6AB321FDC07F2C332E3AC2BF0BC433CFC8B3 0BD78B5F97500D450838F95DFE857D9A90D90EC1
    PHP_ENV_PHP_VERSION=5.6.9
    PHP_INI_DIR=/usr/local/etc/php
    PHP_EXTRA_CONFIGURE_ARGS=--enable-fpm --with-fpm-user=www-data --with-fpm-group=www-data
    GPG_KEYS=6E4F6AB321FDC07F2C332E3AC2BF0BC433CFC8B3 0BD78B5F97500D450838F95DFE857D9A90D90EC1
    PHP_VERSION=5.6.9
    HOME=/root

上述例子中，指定了容器的别名为`php`，因此所有环境变量都是以`PHP_`开头。

> 注意的是，如果源容器重启，接收容器中的环境变量信息并不会自动更新，因此，如果要使用源容器的IP地址，请使用/etc/hosts中配置的主机信息。

###/etc/hosts文件

除了环境变量之外，Docker也在接收容器的`/etc/hosts`文件中更新了hosts信息。

    $ docker run  -i -t --rm --link phpfpm:php php:5.6-fpm /bin/bash
    root@4678acd72dca:/var/www/html#
    root@4678acd72dca:/var/www/html# cat /etc/hosts
    172.17.0.77	4678acd72dca
    ...
    172.17.0.74	php f81b2615a6a8 phpfpm

从上可以看出，在接收容器的hosts文件中增加了两条额外的信息，本机IP和别名以及源容器的IP和别名(php)。

与环境变量不同的是，如果源容器重启了，接收容器中`/etc/hosts`中的信息会自动更新。

----

参考:

[Linking Containers Together](https://docs.docker.com/userguide/dockerlinks/)
[How can I use environment variables in Nginx.conf](http://serverfault.com/questions/577370/how-can-i-use-environment-variables-in-nginx-conf)



[nginx.conf]:https://github.com/mylxsw/DockerDemo/blob/master/nginx-php/nginx.conf
[nginx/php-fpm]:https://github.com/mylxsw/DockerDemo/tree/master/nginx-php