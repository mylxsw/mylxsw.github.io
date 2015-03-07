## Xdebug进行脚本性能分析

使用Xdebug内建的分析器，可以帮助你找到代码性能的瓶颈，并且可以使用额外的工具如```kCacheGrind```或者```WinCacheGrind```进行形象化的展示出来。

### 简介

Xdebug的分析器是用来分析PHP代码和找出代码的瓶颈的强大的工具。在Xdebug2中分析器会将分析到的内容输出到一个```cachegrind```兼容的文件。这使得我们可以通过使用 [KCacheGrind](http://kcachegrind.sourceforge.net/html/Home.html) 等工具来分析数据。如果你使用的是Linux系统，你可以使用喜欢的包管理器安装```KCacheGrind```， 如果你使用的是Windows的话，你可以找到预先编译好的```KCacheGrind``` 二进制文件。

Windows下的用户也可以使用 [WinCacheGrind](http://sourceforge.net/projects/wincachegrind), 它的功能与KCacheGrind是不同的，所以本文中使用KCacheGrind的方法并不适用于WinCacheGrind工具。当然，还有一个工具集是[xdebugtoolkit](http://code.google.com/p/xdebugtoolkit/) ， 它是一个基于叫做Webgrind的web前端工具和基于Java的[XCallGraph](http://sourceforge.net/projects/xcallgraph/)工具。

###启动分析器

通过配置```xdebug.profiler_enable```设置允许分析器。这个指令告诉xdebug将分析数据文件写入到一个由```xdebug.profiler_output_dir```指令配置的目录中，生成的文件名总是以"cachegrind.out"开头，以php（或者Apache）的进程PID或者包含被调试脚本的目录的crc32哈希值。需要注意到是，要确保```xdebug.profiler_output_dir```指定的目录要有足够大的空间，因为这些文件可能会占用大量的空间，例如，[eZ Publish](http://ez.no/)这种复杂的应用程序可能会产生500M大的文件。

你可以将```xdebug.profiler_enable_trigger```指令设置为1， 如果设置为1， 你可以使用GET/POST/COOKIE变量名称```XDEBUG_PROFILE```激活分析器。为了让触发工作能够顺利进行，我们需要设置```xdebug.profiler_enable```指令为0。

###分析profiles

当profile文件生成后，你可以使用```KCacheGrind```查看这个文件：   

![选择文件](http://xdebug.org/images/docs/kc-open.png)

