本文将讲述如何使用 [Vagrant][] 快速搭建一套LNMP开发环境，由于平时都是使用Mac，因此，
本文中的例子都是在Mac上运行的，如果是其它系统，虽然会有微小的差别，但是基本操作过程都是一致的，具体请参考 [官方文档][]。

# Vagrant 基础

## 安装Vagrant

Vagrant的安装过程是非常简单的，首先需要安装 [Virtual Box][Virtualbox] 虚拟机（也可以是其它虚拟机）,接下来到Vagrant [下载页面][Vagrant-download] 下载你所在平台的安装包，根据安装提示一步一步安装即可。

安装完Vagrant之后，安装程序会自动的将Vagrant的命令行文件加入到系统的PATH路径中，
打开终端，可以执行`vagrant -v`（查看版本号）验证是否成功安装。

    $ vagrant -v
    Vagrant 1.6.5

## Vagrantfile

在安装完Vagrant之后，我们可以开始探索vagrant所提供的功能了，在开始之前，首先需要知道的是`Vagrantfile`文件，所有的Vagrant项目都是使用`Vagrantfile`进行配置。

首先，我们创建一个名为lnmp的文件夹作为我们的项目根目录，在该目录中执行`vagrant init`命令初始化该目录为一个vagrant项目目录。

    $ mkdir lnmp
    $ cd lnmp
    $ vagrant init

这样，我们的`lnmp`目录下会自动创建名为`Vagrantfile`的配置文件。

![vagrant-init][]

`Vagrantfile`中配置了该项目如何启动，初看这个文件，可能觉得格式比较奇怪，其实该文件是个Ruby文件，当然，我们不需要去学习Ruby，只需要根据文档中提供的说明进行配置就可以了。

![vagrant-vagrantfile][]

在配置文件中，我们可以看到第13行配置了项目使用的box为`base`，该配置文件中提供了大部分配置的说明，不过基本上除了`config.vm.box`之外全部都注释起来了，我们可以根据项目的需要对该box进行配置。

常用的配置项主要包括这些：

- config.vm.box 配置使用哪个box
- config.vm.network 配置网络连接，端口映射
- config.vm.synced_folder 配置虚拟机与宿主机之间共享的目录
- config.vm.provision  配置虚拟机的配置方式

后面我们将会对这些选项进行详细讲解。

## 常用命令

###初始化项目

要初始化一个vagrant虚拟机环境，执行命令`vagrant init`。

    vagrant init [box-name] [box-url]

如果不提供`box-name`参数，将会使用默认的盒子`box`，第二个参数`box-url`可以指定去哪里下载该box。

###管理box

在vagrant中，使用`vagrant box`的子命令对box进行管理， 它包含了6个子命令: `add`, `list`, `outdated`, `remove`, `repackage`, `update`。







----

参考：

- [Vagrant 官方文档][官方文档]

[Vagrant]:https://www.vagrantup.com/
[官方文档]:https://docs.vagrantup.com/v2/installation/index.html
[Vagrant-download]:http://www.vagrantup.com/downloads
[Virtualbox]:https://www.virtualbox.org/wiki/Downloads
[vagrant-init]: http://source.aicode.cc/markdown/vagrant-init.jpg
[vagrant-vagrantfile]:http://source.aicode.cc/markdown/vagrant-vagrantfile.jpg
