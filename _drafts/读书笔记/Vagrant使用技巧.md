##Vagrant使用技巧

###1.1 如何调试
在使用Vagrant过程中，难免会出现一些不稳定的因素而造成一些使用上的bug，因此，Vagrant提供了Debug日志的方式用于调试，可以方便的查找错误的原因，以便快速解决问题。

要允许启用日志功能，需要在主机上设置环境变量`VAGRANT_LOG`为需要的日志级别，包含`debug`, `info`, `warn`, `error`。当你需要查找错误产生的原因的时候，通常使用日志级别`info`，这种情况下你可以得到包含重要信息的比较干净的日志。

在Linux和Mac系统上，你可以通过下面的方式设置：

```shell
$ VAGRANT_LOG=info vagrant up
```

在Windows下，你需分开写:

```shell
$ set VAGRANT_LOG=info
$ vagrant up
```

当然，你也可以不用这种方式，只需要在启动的时候增加参数`--debug`即可。

```shell
$ vagrant up --debug
```

###1.2 如何使用插件
Vagrant中提供了很多可以直接使用的插件，使用这些插件，可以极大的减少配置开发环境的工作量，Vagrant的大部分核心功能都是基于插件实现的。

Vagrant使用命令`vagrant plugin install`安装插件。
```shell
$ vagrant plugin install vagrant-example-plugin
```

插件安装完成后，将会在Vagrant启动的时候自动加载，如果插件加载过程中出现错误，不会影响Vagrant的启动，而是会输出插件加载失败的错误信息。

插件安装完成后，你应该查看插件开发文档获取如何使用该插件，一般可以通过vagrant命令使用插件的命令，如果插件提供了provision的话，可以通过`config.vm.provision`进行配置。

插件的更新比较简单，使用命令`vagrant plugin update`即可更新全部插件，使用`vagrant plugin update NAME`可以更新指定插件。

插件卸载使用命令`vagrant plugin uninstall`。
```shell
$ vagrant plugin uninstall vagrant-example-plugin
```
查看安装了哪些插件：
```shell
vagrant plugin list
```

###1.3 如何配置网络

在Vagrant中，所有的网络配置都在`Vagrantfile`中的`config.vm.network`方法中。

```ruby
Vagrant.configure("2") do |config|
  # other config here

  config.vm.network "forwarded_port", guest: 80, host: 8080
end
```
每一种网络类型都有一个标识符如`:forwarded_port`，它后面跟着一串配置选项。在端口跳转的例子中，提供了两个参数，虚拟机中的端口号和主机中映射的端口号。

> 如果需要多个网络配置，使用多个`config.vm.network`即可。

#### 如何进行端口跳转
端口跳转功能允许你通过TCP或者是UDP直接访问主机上的指定端口，该端口的请求会被转发到虚拟机上的指定端口。

```ruby
Vagrant.configure("2") do |config|
  config.vm.network "forwarded_port", guest: 80, host: 8080
end
```
上面的配置将会主机上对8080端口的访问转发到虚拟机上的80端口。

下面是该配置(`forwarded_port`)支持的参数:

- **guest (int)** 希望暴漏给主机的虚拟机端口
- **guest_ip(string)** 希望绑定的IP，该IP与guest指定的端口暴漏给主机，默认为空，所有网卡接口。
- **host(int)** 希望使用来访问虚拟机的guest端口的主机端口号
- **host_ip(string)** 主机的IP地址，用于绑定到跳转的端口，如果不指定，则使用所有IP。
- **protocol(string)** 可选tcp或者udp,默认为tcp.


```ruby
Vagrant.configure("2") do |config|
  config.vm.network "forwarded_port", guest: 2003, host: 12003, protocol: 'tcp'
  config.vm.network "forwarded_port", guest: 2003, host: 12003, protocol: 'udp'
end
```

###1.4 如何配置同步目录
使用`config.vm.synced_folder`方法配置同步目录。
```ruby
Vagrant.configure("2") do |config|
  # other config here

  config.vm.synced_folder "src/", "/srv/website"
end
```
以上配置中，`synced_folder`方法的第一个参数为主机上要跟虚拟机同步的目录，第二个参数为要挂载到虚拟机上的路径。

> 可以配置参数`disabled: true`禁止目录同步。
```ruby
Vagrant.configure("2") do |config|
  config.vm.synced_folder "src/", "/srv/website", disabled: true
end
```

默认情况下，Vagrant设置同步文件夹的属主/组为SSH用户，如果需要修改的话，使用下面配置:
```ruby
config.vm.synced_folder "src/", "/srv/website",
  owner: "root", group: "root"
```

