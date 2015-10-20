---
categories: [其它]
tags: [mac, iphone, network]
---

在网络开发的时候，经常会遇到需要对手机中的APP的网络访问进行抓包的需要，手机不同于电脑，可以安装各种抓包工具，对网络数据进行监控或者修改，因此本文讲述了使用Mac系统对iPhone手机进行抓包的一种方式，当然，这种方式并不仅仅局限于对iPhone进行抓包，任何Android手机同样也是支持的。

<!--more-->
####需要的软件：

- Burp([下载地址](http://cloud.letv.com/s/zKQCtu7Xe)) , Windows下可以使用fiddler2，会更加方便。
​

####具体操作：

首先，在Mac系统中，`系统偏好设置 - 共享 - 互联网共享` 开启网络共享功能。

> 注： 如果手机和电脑在同一个wifi网络下，可以不用执行第一步。

打开Burp，进入到`Proxy`选项卡下，找到`Option`子选项卡，在第一栏中，修改`Proxy Listeners`部分，将监听接口绑定修改为`All interfaces`， 也就是interface栏应该显示`*:8080`。

> 注： 最好进入到`Intercept`选项卡下，将`Intercept is on`按钮按下，使其显示为`intercept is off`，这样就可以避免Brup将请求拦截后停止，不需要手动继续了。

接下来配置手机部分，进入iPhone的`设置-无线局域网`，选择刚才创建的Wifi，然后连接上去，点击网络名称右侧的感叹号，修改网路信息，将下面的`HTTP 代理`修改为手动，填写Mac的IP地址和端口号（`8080`）。

![iPhone网络配置](http://agiledev-arsenals.stor.sinaapp.com/photos/4c9b8ea151f9d6718e85c66d3221c5a1.jpeg)

> Mac的IP地址可以通过命令`ifconfig`查看到，没有配置网络共享的也是执行一样的操作，当然，要保证Mac和iPhone在同一个局域网中。


最后，回到Mac，打开Burp的`HTTP history`子选项卡，在手机上运行要监控的APP，然后就可以在这里看到所有的HTTP访问请求了。

![网络监控](http://agiledev-arsenals.stor.sinaapp.com/photos/3ad80c48c33f24b8bd6904c8c41d3375.png)
