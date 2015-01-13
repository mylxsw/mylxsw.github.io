##Nginx学习笔记

[TOC]


###Nginx启动和关闭

要启动Nginx，只需要执行Nginx的可执行文件即可。在Nginx启动之后，可以通过为该可执行文件提供`-s`参数控制Nginx。

```bash
nginx -s signal
```

signal可以是下面这些

- **stop** 快速关闭
- **quit** 正常退出（会等待所有正在提供服务的Nginx子进程结束后退出）
- **reload** 重新加载配置文件
- **reopen** 重新打开日志文件