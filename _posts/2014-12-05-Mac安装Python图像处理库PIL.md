---
categories: [python]
tags: [python]
---

开发平台是Mac，需要用到Python的图像处理库PIL，下面记录了安装过程以及出现的问题。

基本安装过程是这样的，使用命令`pip`进行安装


	$ pip install PIL
	Downloading/unpacking PIL
	  Could not find any downloads that satisfy the requirement PIL
	  Some externally hosted files were ignored (use --allow-external PIL to allow).
	Cleaning up...
	No distributions at all found for PIL
	Storing debug log for failure in /Users/mylxsw/.pip/pip.log

<!--more-->

提示需要添加`--allow-external`参数

	$ pip2.7 install PIL --allow-external PIL
	Downloading/unpacking PIL
	  Could not find any downloads that satisfy the requirement PIL
	  Some insecure and unverifiable files were ignored (use --allow-unverified PIL to allow).
	Cleaning up...
	No distributions at all found for PIL
	Storing debug log for failure in /Users/mylxsw/.pip/pip.log


又报错了，提示需要添加`--allow-unverified`参数

	$ pip2.7 install PIL --allow-external PIL --allow-unverified PIL
	...
	_imagingft.c:73:10: fatal error: 'freetype/fterrors.h' file not found

	#include <freetype/fterrors.h>

	         ^

	1 error generated.
	...


提示缺少`freetype/fterrors.h`头文件，可是系统已经安装了，于是从stackoverflow上找到方案：


	$ ln -s /usr/local/include/freetype2 /usr/local/include/freetype


再次安装

	$ pip2.7 install PIL --allow-external PIL --allow-unverified PIL
	Downloading/unpacking PIL
	...
	Successfully installed PIL
	Cleaning up...


OK!
