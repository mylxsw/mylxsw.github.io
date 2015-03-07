###Mac OS 安装Python模块PIL报错解决

在使用pip安装Python的PIL模块的时候，出现以下错误：

<pre>
In file included from tkStubLib.c:15:
/usr/include/tk.h:78:11: fatal error: 'X11/Xlib.h' file not found
#include &lt;X11/Xlib.h>
</pre>

解决办法如下：   

1. 安装 [XQuartz](http://xquartz.macosforge.org/landing/)
2. 安装完成后，创建如下链接<pre>ln -s /opt/X11/include/X11 /usr/local/include/X11</pre>
3. 安装PIL <pre>pip install PIL</pre>