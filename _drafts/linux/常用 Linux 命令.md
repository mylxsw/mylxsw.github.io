##常用 Linux 命令

[TOC]

###网络监控相关

####查看并发连接数

    netstat -an | grep ESTABLISHED | wc -l

可以使用 watch 命令监控连接数变化，`watch`命令会周期性的调用 netstat 命令显示当前连接数。
比如我们需要每隔1s 自动更新

    watch --interval=1 "netstat -an | grep ESTABLISHED | wc -l"

如果要查看某个端口的连接数，使用下列命令

	sudo netstat -pnt |grep :80 |wc -l

