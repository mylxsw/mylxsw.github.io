---
categories: [php]
tags: [php]
---

在一个PHP项目中，需要用到这样一种功能，将XML与WBXML之间进行转换，以便进行数据的传输与解析，自己实现一个这样的转换函数的话，显然难度比较大，终于找到一个PHP的Pecl扩展，提供了直接进行转换的函数，但是安装过程比较曲折，因此记录一下。

首先想到的自然是使用`Pecl`进行安装，于是，便有了下面的安装过程：

    # pecl install wbxml
    downloading wbxml-1.0.3.tgz ...
    Starting to download wbxml-1.0.3.tgz (5,260 bytes)
    .....done: 5,260 bytes
    3 source files, building
    running: phpize
    Cannot find config.m4.
    Make sure that you run '/usr/bin/phpize' in the top level source directory of the module
    ERROR: `phpize' failed

<!--more-->

安装失败了，提示`phpize`执行失败，没事，手动下载下来编译不就行了。

    # pecl download wbxml
    # tar -zxvf wbxml-1.0.3.tgz
    # cd wbxml-1.0.3
    # phpize
    # ./configure
    这里出错了，提示没有找到libwbxml类库，具体错误信息找不到了


接下来，需要安装`libwbxml`类库，尝试使用`yum`进行安装，发现根本无法找到这个类库，无奈，只能下载下来自己编译了。   
于是，从git上下载下来源码进行编译安装。


    # wget https://codeload.github.com/libwbxml/libwbxml/zip/master
    # unzip master
    # cd libwbxml-master/
    # mkdir build
    # cmake . -B./build
    # cd build/
    # make
    # make install


终于安装完成`libwbxml`了，接下来再次尝试使用pecl安装wbxml，得到的结果依旧是之前的错误，于是再次源码编译安装，这次提示找不到一些头文件，如`wbxml.h`等。

于是想了个比较暴力的手段，系统查找到这些头文件，直接复制到wbxml扩展的安装目录下。


    # find / -name "wbxml.h"
    # cp /usr/local/include/libwbxml-1.0/wbxml/wbxml.h ./


头文件也有了，这下总该可以安装了吧。


    # make
    # make install


安装成功，终于安装完成这个扩展了`/usr/lib64/php/modules/wbxml.so`，接下来就是配置一下PHP使用这个扩展了，就不多说了。
