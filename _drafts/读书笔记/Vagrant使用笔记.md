##Vagrant使用笔记 快速入门

Vagrant是一个基于Ruby的工具，用于创建和部署虚拟化开发环境。它 使用Oracle的开源VirtualBox虚拟化系统，使用 Chef创建自动化虚拟环境。

#### 1.1 项目初始化

Vagrant使用`Vagrant`文件作为配置文件，该文件中定义了项目的根目录，Vagrant的很多配置都是基于这个配置的根目录进行的，同时，该文件也描述了项目运行所需要的机器类型以及其它资源（比如安装哪些软件等）。

要初始化一个Vagrant项目，使用命令`vagrant init`命令，使用该命令后，会在当前目录创建一个名为`Vagrantfile`的配置文件，修改该文件改变Vagrant项目的行为。

```shell
$ mkdir vagrant_getting_started
$ cd vagrant_getting_started
$ vagrant init
```

Vagrant使用盒子（box）创建开发环境，所谓的盒子就是一个已经配置好的基础的虚拟机镜像，Vagrant避免了每次创建项目都去重新创建虚拟机，而是按照`Vagrantfile`文件的配置从基础镜像创建这个Box。

> 可以在已经存在的项目上使用`vagrant init`命令，该命令只会创建配置文件，并不会对原有项目造成影响。如果需要，可以将该配置文件`Vagrantfile`加入到项目的版本控制中，这样团队中的其它开发者就可以快速的建立起开发环境已进行运行调试了。

在创建Vagrant项目的时候，首先需要做的是添加一个Box，通过使用命令`vagrant box add`添加一个盒子,Vagrant网站上提供了很多其它开发者共享的Box，我们可以直接复用，在[Vagrant Cloud](https://vagrantcloud.com/)上可以查找你需要的Box并且添加到本地。

```shell
$ vagrant box add chef/centos-6.5
```

添加的盒子是可以被多个项目同时使用的，项目在初始化Box的时候并不会修改添加的基础Box，而是克隆一份Box的副本，在副本上进行配置。

添加盒子之后，我们需要配置项目使用这个盒子作为基础，修改`Vagrantfile`文件：

```ruby
Vagrant.configure("2") do |config|
  config.vm.box = "chef/centos-6.5"
end
```
> 注意: 如果这里指定的box没有添加过，则Vagrant会自动去下载该Box。

####1.2 启动并运行项目
在配置完成后，就可以启动该虚拟环境了，使用命令`vagrant up`启动开发环境。

```shell
$ vagrant up
```

启动之后，我们可以使用ssh连接到该虚拟机上：

```shell
$ vagrant ssh
```

现在你已经连接到该虚拟机上了，你可以像操作普通Linux系统一样做你希望做的事情。

> 注意的是，在该虚拟机上进行`rm -fr /`操作的时候请谨慎一些，因为在该虚拟机中，挂载了`/vagrant`目录，该目录是与你主机的项目共享的，删除的话会将项目删除掉。

在该虚拟机使用完成后，如果不再需要了，可以使用`vagrant destroy`命令移除该虚拟机。

> 提示： 默认配置下，虚拟机中的`/vagrant`目录与主机上的项目目录是同一个目录，该目录中的所有操作都会自动同步。

####1.3 创建项目初始化脚本
每次初始化系统的时候都需要重新安装软件是一件非常麻烦的事，因此，Vagrant提供了一种简单的方式来帮我们完成这个过程，在建立虚拟机的时候可以指定自动执行脚本。

在项目目录下创建一个bootstrap.sh的脚本文件：
```shell
#!/usr/bin/env bash

apt-get update
apt-get install -y apache2
rm -rf /var/www
ln -fs /vagrant /var/www
```

该脚本是在Ubuntu环境下使用的，如果你是用的Box是CentOS，则不能使用`apt-get`命令了，而应该使用`yum`命令完成程序的安装。

接下来，我们需要配置`Vagrantfile`文件，让其在建立环境的时候自动执行该脚本。
```shell
Vagrant.configure("2") do |config|
  config.vm.box = "hashicorp/precise32"
  config.vm.provision :shell, path: "bootstrap.sh"
end
```

这样配置之后，使用命令`vagrant up`启动虚拟机的时候，该脚本就会自动执行，完成虚拟机的初始化了。

> 如果你的虚拟机已经处于运行状态了，可以通过使用命令`vagrant reload --provision`快速的重新启动虚拟机，命令中的`--provision`告诉Vagrant在重启的时候运行provisioners的配置，通常情况下，provisioners的配置只在执行`vagrant up`命令的时候才会执行。

####1.4 网络配置
Vagrant提供了端口转发功能，通过将虚拟机中的端口映射到主机的不同端口，我们可以在主机中使用映射后的端口访问虚拟机中的服务。

例如：
```ruby
Vagrant.configure("2") do |config|
  config.vm.box = "hashicorp/precise32"
  config.vm.provision :shell, path: "bootstrap.sh"
  config.vm.network :forwarded_port, host: 4567, guest: 80
end
```
使用如上配置启动虚拟机之后，就可以在主机上使用`http://127.0.0.1:4567`访问虚拟机上的Apache提供的Web服务了。


####1.5 Teardown(虚拟机卸载)
当你希望切换到其它项目上开发或者是当你要出去吃午饭，你下班了的情况下，你需要清理一下你的开发环境，这个时候，Vagrant提供了三种方式，它们各有各自的优缺点，因此，你需要自己去权衡你希望采用哪种方式。

- Suspending （挂起）
	执行命令`vagrant suspend`将会保存当前虚拟机的运行状态并且停止它，跟主机挂起是一样的，当你需要再次启动的时候，使用`vagrant up`命令将会恢复之前的运行状态。这种方式的优点是，启动很迅速，可以很快进入开发环境中，缺点是会占用比较多的磁盘空间，因为虚拟机将内存中的数据都存储到了磁盘上。

- Halting（停止）
	这种方式是正常的停止虚拟机，使用虚拟机的关闭命令完成，当需要重新使用的时候使用命令`vagrant up`重新启动虚拟机，该方法与计算机冷启动一样，缺点是启动的时候耗时比较多，依然占用部分磁盘空间。

- Destroying（销毁）
	该方式将会销毁虚拟机，不会再占用磁盘空间，下次启动的时候将会重新建立开发环境，包括下载软件等等。

