---
categories: [Docker]
tags: [Docker, boot2docker, Mac]
thumb: http://source.aicode.cc/markdown/docker.jpg
---

在Mac上使用Docker，需要使用`boot2docker`建立docker运行的虚拟机宿主环境。安装`boot2docker`可以简单的通过`brew`进行安装。

	brew install boot2docker

###启动boot2docker

成功安装之后，使用以下方式启动docker

	boot2docker init

以上命令只需要执行一次即可，它创建了Docker运行所需要的虚拟机环境。以后运行的时候，需要先开启docker虚拟机

	boot2docker start

这样就启动了Docker的虚拟机环境，使用命令`boot2docker shellinit`查看Docker客户端的环境变量

	$ boot2docker shellinit
    Writing /Users/mylxsw/.boot2docker/certs/boot2docker-vm/ca.pem
    Writing /Users/mylxsw/.boot2docker/certs/boot2docker-vm/cert.pem
    Writing /Users/mylxsw/.boot2docker/certs/boot2docker-vm/key.pem
        export DOCKER_HOST=tcp://192.168.59.103:2376
        export DOCKER_CERT_PATH=/Users/mylxsw/.boot2docker/certs/boot2docker-vm
        export DOCKER_TLS_VERIFY=1

你可以手动的执行输出的后面三条export命令设置环境变量，也可以使用下面的方法自动设置

	$ eval "$(boot2docker shellinit)"

到此为止，boot2docker已经运行，并且docker的客户端环境已经建立，要验证是否成功，运行下面的命令

	$ boot2docker status
    running
    $ docker version
    Client version: 1.3.2
    Client API version: 1.15
    Go version (client): go1.3.3
    Git commit (client): 39fa2fa
    OS/Arch (client): darwin/amd64
    Server version: 1.6.2
    Server API version: 1.18
    Go version (server): go1.4.2
    Git commit (server): 7c8fca2

使用命令`boot2docker ssh`:

![boot2docker-ssh][]

> 如果在执行docker命令的时候出现类似如下错误
> *dial unix /var/run/docker.sock: no such file or directory*
> 是因为没有设置正确的环境变量导致的，执行命令 `eval "$(boot2docker shellinit)"` 重新设置环境变量即可。

###基本操作

在`DOCKER_HOST`上启动一个Nginx容器

	$ docker run -d -P --name web nginx

上述命令中，`docker run`命令启动一个容器运行，然后退出，`-d`选项指定该容器`docker run`命令执行完成后在后台运行。`-P`选项将容器开放的端口暴露给宿主机，这样我们就可以访问它们了。

要查看当前运行了哪些容器，使用`docker ps`命令

![docker-ps][]

查看容器开放了哪些端口，使用命令`docker port`

	$ docker port web
    443/tcp -> 0.0.0.0:32769
    80/tcp -> 0.0.0.0:32768

接下来访问`127.0.0.1:32768`，应该就能看到Nginx的欢迎页面了。

> 在Mac下，使用boot2docker的时候，访问`127.0.0.1`是不行的，因为docker的宿主机是boot2docker的虚拟机，因此需要使用虚拟机的ip访问`boot2docker ip`获取ip后访问。
>
> ![boot2docker-ip][]
> 访问`192.168.59.103:32768`即可

要停止或者删除正在运行的容器，使用下列命令

	$ docker stop web
    $ docker rm web

要关闭`boot2docker`使用命令`boot2docker stop`。

###在Container中挂载卷

当启动`boot2docker`的时候，它会在虚拟机上自动共享Mac上的`/Users`目录，在Docker容器中，可以将该目录中的内容挂载到Docker容器中。

	docker@boot2docker:~$ ll /Users/
    total 0
    drwxr-xr-x    1 docker   staff          374 Dec  4 08:42 Guest/
    drwxrwxrwx    1 docker   staff          306 Apr 10 16:19 Shared/
    drwxr-xr-x    1 docker   staff         2890 May 19 09:32 mylxsw/

在Mac的Downloads目录中建立`site/index.hml`文件，如下

    $ pwd
    /Users/mylxsw/Downloads
    $ tree
    .
    └── site
        └── index.html

    1 directory, 1 file
    $ cat site/index.html
	my new site: aicode.cc

启动docker容器

	$ docker run -d -P -v $HOME/Downloads/site:/usr/share/nginx/html --name mysite nginx
    3ec8c748b423b9ff30efaab6e4c88857c45831cca8a46e97950808635c2dd98d
    $ docker port mysite
    443/tcp -> 0.0.0.0:32770
    80/tcp -> 0.0.0.0:32771
    $ boot2docker ip
    The VM's Host only interface IP address is: 192.168.59.103

这里`docker run`的`-v`参数指定了要挂载的卷，也可以使用`--volume`，格式为`-v /host:/container`。

访问`http://192.168.59.103:32771/`可以看到输出index.html的内容

	$ curl  http://192.168.59.103:32771/
	my new site: aicode.cc


-----

参考：

- [Docker官方文档](http://docs.docker.com/installation/mac/)

[boot2docker-ssh]:http://aicode.qiniudn.com/markdown/boot2docker-ssh.jpg
[docker-ps]:http://aicode.qiniudn.com/markdown/docker-ps.jpg
[boot2docker-ip]:http://aicode.qiniudn.com/markdown/boot2docker-ip.jpg
