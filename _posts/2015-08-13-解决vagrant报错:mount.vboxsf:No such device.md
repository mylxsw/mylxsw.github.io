---
categories: [运维]
tags: [Linux]
thumb: /assets/images/thumb/cmd.jpg
---


在使用`vagrant`的时候，不知怎么搞的启动(`vagrant up`)后出现下列错误：

    Failed to mount folders in Linux guest. This is usually because
    the "vboxsf" file system is not available. Please verify that
    the guest additions are properly installed in the guest and
    can work properly. The command attempted was:

    mount -t vboxsf -o uid=`id -u vagrant`,gid=`getent group vagrant | cut -d: -f3` app /app
    mount -t vboxsf -o uid=`id -u vagrant`,gid=`id -g vagrant` app /app

    The error output from the last command was:

    /sbin/mount.vboxsf: mounting failed with the error: No such device

最后通过Google在[Github][github]上找到解决办法:

    yum update -y
    yum install kernel-devel-$(uname -r) kernel-headers-$(uname -r) dkms -y
    /etc/init.d/vboxadd setup

最后重启就可以了。


[github]:https://github.com/mitchellh/vagrant/issues/1657
