##Docker基础
[TOC]



###Docker安装和运行

####安装Docker

#####在CentOS 7上安装

Docker默认已经包含在CentOS-Extra仓库中，使用以下命令安装

	sudo yum install docker

#####在CentOS 6.5上安装

对于CentOS 6.5，Docker是 [EPEL][] 仓库的一部分，因此需要确保已经加入EPEL的YUM源。在CentOS 6上，Docker的包名可能与桌面的docker应用冲突，因此，它的包名改为了`docker-io`。

	sudo yum -y remove docker
    sudo yum install docker-io

####启动Docker

安装Docker之后，需要启动Docker守护进程

	sudo service docker start

> 为了让docker能够开机运行，需要使用chkconfig: `sudo chkconfig docker on`

获取Docker镜像，启动Docker容器

	sudo docker pull centos
    sudo docker images centos
    sudo docker run -i -t centos /bin/bash


###基本命令




-----

[EPEL]:https://fedoraproject.org/wiki/EPEL
