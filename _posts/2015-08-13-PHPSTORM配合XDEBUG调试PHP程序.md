---
categories: [运维,PHP]
tags: [Linux, PHP, LNMP]
thumb: /assets/images/thumb/lnmp.gif
---

##环境安装配置

安装配置好PHP运行环境之后，需要安装XDEBUG扩展。

    sudo pecl install xdebug

安装完成之后，需要配置`php.ini`启用Xdebug扩展并且支持远程回调。

    echo '
    zend_extension=/usr/local/php/lib/php/extensions/no-debug-non-zts-20131226/xdebug.so
    xdebug.remote_enable=1
    xdebug.remote_connect_back=1
    xdebug.remote_port=9000
    ' >> /etc/php.ini

> 注意这里必须使用`zend_extension`，不能使用`extension`，请根据自己环境指定路径信息。

安装配置完成后，重启`php-fpm`进程。


##使用方式

服务端配置好了之后，在使用`phpstorm`开发过程中，我们需要打开我们的项目，然后在phpstorm中选择菜单`Run->Start Listening for PHP Debug Connections`。

> 如果希望项目访问的时候，在第一行代码处自动加断点，可以选中`Run->Break at first line in php scripts`。

使用浏览器访问服务端上的web项目，在Get参数中增加`XDEBUG_SESSION_START=phpstorm`请求参数。

这样，PHPSTORM应该就能侦听到来自服务端PHP发送回来的调试指令了，接下来就可以Happy Debug了 ~
