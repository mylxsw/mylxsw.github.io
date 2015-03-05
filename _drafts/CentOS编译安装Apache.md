##Cent OS 编译安装 Apache 服务器

本文讲述了在 CentOS 服务器下编译安装 Apache 服务器的步骤以及遇到的问题解决办法。

首先到官网下载 apache httpd 服务器的源码，解压后执行`./configure`进行配置。

    cd ~
    wget http://mirror.bit.edu.cn/apache//httpd/httpd-2.4.12.tar.bz2
    tar jxvf httpd-2.4.12.tar.bz2
    cd httpd-2.4.12
    ./configure --prefix=/usr/local/apache

提示缺少 APR ，需要提供 Apr才能继续，下载 Apr 加入到源码目录的srclib 目录。

    cd ~
    wget http://apache.fayea.com/apr/apr-1.5.1.tar.gz
    tar -zxvf apr-1.5.1.tar.gz
    mv apr-1.5.1 httpd-2.4.12/srclib/apr
    wget http://apache.fayea.com//apr/apr-util-1.5.4.tar.gz
    tar -zxvf apr-util-1.5.4.tar.gz
    mv apr-util-1.5.4 httpd-2.4.12/srclib/apr-util

接下来重新编译

    cd ~/httpd-2.4.12
    ./configure --prefix=/usr/local/apache --with-included-apr
    make
    sudo make install

> 注意，这里需要新增`--with-included-apr`选项。我们提供了`--prefix`选项指定了安装位置为`/usr/local/apache`。


最后，apache 已经安装在 `/usr/local/apache`目录了。在`/usr/local/apche/bin`目录中可以找到`ab` 命令。
