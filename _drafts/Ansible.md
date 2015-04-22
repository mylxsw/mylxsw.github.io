##Ansible

[TOC]


###Ad-Hoc 命令

初始化`ansible`环境

	$ cd <PATH_TO_ANSIBLE>
    $ ./hacking/env-setup


创建`<PATH_TO_ANSIBLE>/ansible_hosts` 文件：

    [vagrant]
    10.100.100.10    ansible_connection=ssh ansible_ssh_user=vagrant
    10.100.100.11    ansible_connection=ssh ansible_ssh_user=vagrant

创建该文件后

	export ANSIBLE_HOSTS=<PATH_TO_ANSIBLE>/ansible_hosts


####目录复制

    $ ansible vagrant -m copy -a "src=/Users/mylxsw/codes/php/aicode/OAuth2.0 dest=/home/vagrant/www" --ask-pass
    SSH password:
    10.100.100.10 | success >> {
        "changed": true,
        "dest": "/home/vagrant/www/",
        "src": "/Users/mylxsw/codes/php/aicode/OAuth2.0"
    }

    10.100.100.11 | success >> {
        "changed": true,
        "dest": "/home/vagrant/www/",
        "src": "/Users/mylxsw/codes/php/aicode/OAuth2.0"
    }


####包管理

    $ ansible vagrant -m yum -a "name=git" --ask-pass --become --become-user root --ask-become-pass
    SSH password:
    SUDO password[defaults to SSH password]:

####执行shell命令

    $ ansible vagrant -m shell -a "sudo yum install tree -y" --become-user root --ask-become-pass --ask-pass
    SSH password:
    SUDO password[defaults to SSH password]:


####添加用户

先安装Python的`passlib`库

	sudo pip install passlib

创建用户密码，这里的使用密码`guanyy`:

	python -c "from passlib.hash import sha512_crypt; import getpass; print sha512_crypt.encrypt(getpass.getpass())"

执行上述命令后，会提示输入密码。

使用`user`模块创建用户账户

	$ ansible vagrant -m user -a 'name=guanyy password=$6$rounds=100000$oPe4IWi77dLcd1O.$Os0fTsptEK8WHmnLUIyR/Nm2UlLtwFch6tQrYdiwKXC3XndUuJxSv9rPbkUAtI2Y5pQqW93A638JZIHZ6AnMv/' --ask-pass --become-user root --ask-become-pass --become
	SSH password:
	SUDO password[defaults to SSH password]:

####服务监控

    $ ansible vagrant -m service -a "name=monit state=started" --ask-pass --become --become-user root --ask-become-pass
    SSH password:
    SUDO password[defaults to SSH password]:
    10.100.100.11 | success >> {
        "changed": true,
        "name": "monit",
        "state": "started"
    }

    10.100.100.10 | success >> {
        "changed": true,
        "name": "monit",
        "state": "started"
    }


####自动部署GIT

    $ ansible vagrant -m git -a "repo=https://git.coding.net/mylxsw/Arsenals.git dest=/home/vagrant/www/arsenals version=HEAD" --ask-pass
    SSH password:
    10.100.100.10 | success >> {
        "after": "2d97221133d0e52564a14f9d79fcaf1e49046796",
        "before": null,
        "changed": true
    }

    10.100.100.11 | success >> {
        "after": "2d97221133d0e52564a14f9d79fcaf1e49046796",
        "before": null,
        "changed": true
    }


####自动部署SVN

	$ ansible vagrant -m subversion -a 'repo=<YOUR SVN REPO> dest=/home/vagrant/www export=true username=<YOUR USERNAME> password=<YOUR PASSWORD> force=yes' --ask-pass

如果server没有安装svn，需要先安装

	$ ansible vagrant -m yum -a 'name=svn' --ask-pass --become --become-user root --ask-become-pass