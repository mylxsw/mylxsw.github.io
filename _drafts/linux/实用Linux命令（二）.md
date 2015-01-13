##实用Linux命令（二）

[TOC]

####查看Linux的版本（Red Hat/Cent OS）
在RedHat和Cent OS下，使用如下命令查看当前系统的版本。
```bash
$ cat /etc/centos-release 
CentOS release 6.3 (Final)
```


-----
####time命令： 统计程序执行时间



-----
####tee命令
`tee`命令用于将标准输入拷贝到标准输出。

```bash
$ echo "hello,world"|tee -a test.txt
```

上述命令将hello,world字符串输出到test.txt文件中,**-a** 默认情况下，`tee`命令会使用`>`覆盖输出到文件，使用-a属性，会使用`>>`追加方式

-----
####netstat命令

查看端口占用情况
```bash
# netstat -apn
```

- **-a**（--all） 显示所有的socket信息（包括监听和未监听）
- **-p**（--program） 显示每个socket所属于的进程名称和PID
- **-n**（--numeric） 显示数字形式的地址而不是符号化的主机名、端口或者用户名