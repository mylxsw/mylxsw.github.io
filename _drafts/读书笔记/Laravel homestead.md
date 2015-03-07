# Laravel Homestead

- [简介](#introduction)
- [包含的软件](#included-software)
- [安装 & 启动](#installation-and-setup)
- [每日技巧](#daily-usage)
- [端口列表](#ports)

<a name="introduction"></a>
## 简介

Laravel极力去使得PHP开发体验变得更加令人愉快，包括开发环境的搭建过程。[Vagrant](http://vagrantup.com) 提供了一个简单的，快捷的方法来管理开发环境虚拟机。   

Laravel Homestead是一个离线的，预先打好包的Vagrant "box"，它提供了一个很棒的开发环境，你不需要在你自己的计算机上安装PHP，web服务器和任何的其它服务器软件，不用再担心误操作弄坏你的系统！Vagrant的box是完全可以重新创建的，一旦出现了什么错误，你可以销毁它并重新创建一个。   


Homestead可以在Windows， Mac和Linux上运行，它包含了PHP5.5, Nginx服务器，MySQL,Postgres, Redis, Memcached和其它所有在开发Laravel应用需要的软件。   

Homestead目前版本的是在Vagrant 1.6上构建和测试的。

<a name="included-software"></a>
## 包含的软件

- Ubuntu 14.04
- PHP 5.5
- Nginx
- MySQL
- Postgres
- Node (With Bower, Grunt, and Gulp)
- Redis
- Memcached
- Beanstalkd
- [Laravel Envoy](/docs/ssh#envoy-task-runner)
- Fabric + HipChat Extension

<a name="installation-and-setup"></a>
## 安装 & 启动

### 安装VirtualBox 和Vagrant

在启动Homestead环境之前，你必须安装[VirtualBox](https://www.virtualbox.org/wiki/Downloads) 和[Vagrant](http://www.vagrantup.com/downloads.html)。这两个软件都对流行操作系统提供了非常简单的图形化安装器。

### 添加Vagrant盒子

一旦安装玩VirtualBox和Vagrant，你应该接下来使用下列命令添加`laravel/homestead` 盒子到你的Vagrant上。这将会根据你的网络速度花费几分钟下载这个box。

	vagrant box add laravel/homestead

### 克隆Homestead仓库

当将盒子添加到Vagrant上之后，你应该接下来克隆或者下载这个仓库。考虑克隆这个仓库到你存放你所有的Laravel工程的`Homestead`目录中，Homestead盒子将会为所有的这些Larabel（和PHP）工程提供服务。
	
	git clone https://github.com/laravel/homestead.git Homestead

### 设置你的SSH密钥

接下来，你应该编辑在仓库中的`Homestead.yaml`文件。在这个文件中，你可以配置你的公钥的路径，同时也可以配置你希望你的机器与Homestead虚拟机共享的目录。

你没有SSH密钥？ 在Mac和Linux系统上，你可以通过使用下列命令创建你的SSH密钥：

	ssh-keygen -t rsa -C "your@email.com"

在Windows上，你可以安装[Git](http://git-scm.com/)，并且使用 `Git Bash` shell 命令创建。当然，你也可以使用[PuTTY](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html) 和 [PuTTYgen](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html).

当你创建好你的SSH密钥之后，在`Homestead.yaml`文件中的`authorize`属性指定密钥的路径。

### 配置你的共享文件夹

在`Homestead.yaml`文件中的`folders`属性中列出了所有你希望与你的主机环境共享的文件夹。如果在这个文件夹中的文件被修改了，它将会在你的计算机和Homestead虚拟机中自动的进行同步。你可以通过配置设置多个你希望共享的文件夹！

### 配置你的Nginx站点

对Nginx不熟悉？没问题！ `sites`属性允许你可以非常轻松的映射一个域名到你在Homestead环境中的文件夹。一个简单的站点的配置包含在了`Homestead.yaml`文件中。另外，你可以在你的Homestead环境中根据你的需要添加多个站点。Homestead可以方便的作为你每一个Laravel项目的虚拟环境。

### Bash别名

要给你的Homestead盒子添加Bash别名的话，只需要简单的添加到在Homestead目录下的`aliases`文件就可以了。

### 启动Vagrant盒子

当你按照你的喜好编辑`Homestead.yaml文件之后，在控制台中从Homestead目录运行`vagrant up`命令，Vagrant将会启动虚拟机，并且自动的配置你的共享目录和Nginx站点。

不要忘记将Nginx站点的域名假如到你的机器的`hosts`文件中！在Mac和Linux上，这个文件位于`/etc/hosts`,在Windows下，位于`C:\Windows\System32\drivers\etc/hosts`。在这个文件中加入你的host配置，如下面所示：
	
	127.0.0.1  homestead.app
	
当你添加域名到`hosts`文件中后，你可以在浏览器中使用该域名访问服务器了！

	http://homestead.app:8000
	
学习如何连接到数据库，请继续阅读！

<a name="daily-usage"></a>
## 每日技巧
### 使用SSH连接

要通过SSH连接到你的Homestead环境，你应该使用在`Homestead.yaml`文件中指定的SSH密钥连接`127.0.0.1`的2222端口。你也可以在`Homestead`目录中简单的执行`vagrant ssh`命令。

如果你希望更加方便的话，可以添加如下命令别名到`~/.bash_aliases`或者是`~/.bash_profile`文件中。

	alias vm='ssh vagrant@127.0.0.1 -p 2222'

### 连接到你的数据库

在`homestead`中，已经配置了MySQL和Postgres数据库可以直接使用。为了更加方便的访问，Laravel的`local`数据库配置用于配置默认使用哪个数据库。

如果希望在你的计算机上通过Navicat或者Sequel Pro连接你的MySQL或者Postgres数据库的话，你应该连接`127.0.0.1`和端口33060（MYSQL）或者54320（Postgres）。两个数据库的用户名和密码都是`homestead`/`secret`。

> **注意:** 你应该总是使用这些非标准端口从你的主机上连接数据库，而在你的Laravel项目的数据库配置中，使用默认的3306和5432端口，因为Laravel将会运行在虚拟机之中。

### 添加其它站点

一旦你的Homestead环境已经配置好了并且可以运行了，你可能希望添加额外的Nginx站点。你可以运行多个Laravel项目在单个Homestead环境中。有两种方式可以完成这个需求： 首先，你可以简单的添加站点到`Homestead.yaml`文件中，并且运行`vagrant provision`命令。

另外，你可以使用`serve`脚本。要使用`serve`脚本，SSH登陆到你的Homestead环境中，并且运行下面的命令：

	serve domain.app /home/vagrant/Code/path/to/public/directory

> **注意:** 在运行`serve`命令之后，不要忘记添加站点到你的`hosts`文件中！

<a name="ports"></a>
## 端口列表

下列的端口为到你的Homestead环境的映射关系：

- **SSH:** 2222 -> Forwards To 22
- **HTTP:** 8000 -> Forwards To 80
- **MySQL:** 33060 -> Forwards To 3306
- **Postgres:** 54320 -> Forwards To 5432
