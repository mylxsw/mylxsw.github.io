---
categories: [运维]
tags: [LNMP, MySQL, LNMP]
thumb: /assets/images/thumb/lnmp.gif
---

废话不多说，虽然可以通过yum直接安装MySQL，但是为了能够对安装过程有一个比较清晰的认识，
我们这里还是使用源码编译安装。

    $ wget http://dev.mysql.com/get/Downloads/MySQL-5.6/mysql-5.6.21.tar.gz
    $ tar -zxvf mysql-5.6.21.tar.gz
    $ cd mysql-5.6.21


文件已经下载并且解压好了，在安装之前，我们需要为mysql建立名为`mysql`的用户名和用户组。

    $ sudo groupadd mysql
    $ sudo useradd -r -g mysql mysql


建立好用户名和组之后，就可以进行编译安装了

    $ cmake .
    $ make
    $ sudo make install


> 编译过程比较漫长，耐心一点

如果没有安装cmake，则需要先安装

    $ sudo yum install cmake
    $ sudo yum install gcc-c++


如果提示

	Warning: Bison executable not found in PATH

则需要安装bison

	$ sudo yum install bison


如果出现以下错误

    -- Could NOT find Curses (missing:  CURSES_LIBRARY CURSES_INCLUDE_PATH)
    CMake Error at cmake/readline.cmake:85 (MESSAGE):
      Curses library not found.  Please install appropriate package,

      remove CMakeCache.txt and rerun cmake.On Debian/Ubuntu, package name is libncurses5-dev, on Redhat and derivates it is ncurses-devel.

则需要安装

	$ sudo yum install ncurses-devel


经过漫长的编译过程，我们的mysql终于安装到了`/usr/local/mysql`目录，接下来，我们需要对mysql
进行相应的配置，使得mysql变得可用。

    $ cd /usr/local/mysql/
    $ sudo chown -R mysql .
    $ sudo chgrp -R mysql .
    $ sudo scripts/mysql_install_db --user=mysql


这里的`mysql_install_db`脚本只有在手动编译安装mysql的时候需要，该脚本为mysql建立了授权表。

> 大多数的mysql安装是属于root用户的，但是必须保证data目录是数据mysql用户。

    $ sudo chown -R root .
    $ sudo chown -R mysql data


最后，我们需要创建mysql的配置文件

    $ sudo cp support-files/my-default.cnf /etc/my.cnf


####配置MySQL开机启动
如果希望在系统启动的时候mysql也能够自动的启动，可以执行下面的命令

    $ sudo cp support-files/mysql.server /etc/init.d/mysql.server
    $ sudo chmod u+x /etc/init.d/mysql.server
    $ sudo chkconfig --add mysql.server


执行`chkconfig |grep mysql`看到如下，特别是运行级别3为启用，则说明设置成功。

	$ chkconfig |grep mysql
	mysql.server   	0:关闭	1:关闭	2:启用	3:启用	4:启用	5:启用	6:关闭


可以通过`mysql.server`脚本启动和关闭mysql。

	$ sudo /etc/init.d/mysql.server [start|stop]


如果要手动操作的话，启动mysql的话使用命令:

	$ sudo /usr/local/mysql/bin/mysqld_safe --user=mysql &


关闭mysql:

	$ ./mysqladmin -u root shutdown


####修改root账号密码

新安装的mysql数据库的root账号是没有设置密码的，因此，所有人都可以进行访问，为了安全起见，
我们需要为root账号设置一个密码。


    $ /usr/local/mysql/bin/mysql -uroot
    mysql> SELECT User, Host, Password FROM mysql.user;
    +------+-----------------------+----------+
    | User | Host                  | Password |
    +------+-----------------------+----------+
    | root | localhost             |          |
    | root | localhost.localdomain |          |
    | root | 127.0.0.1             |          |
    | root | ::1                   |          |
    |      | localhost             |          |
    |      | localhost.localdomain |          |
    +------+-----------------------+----------+
    6 rows in set (0.00 sec)


> 这里User一列为空的是匿名用户信息，使用`mysql`直接登陆的时候，没有提供账号的话，
> 就会以该用户的身份登陆数据库，如果不需要该用户的话，可以删除掉该用户信息。

    mysql> DROP USER ''@'localhost';
    mysql> DROP USER ''@'localhost.localdomain';


通常我们有三种方式为mysql用户设置密码：

第一种方式是使用`SET PASSWORD`，使用该指令，我们需要登陆到mysql。

    mysql> SET PASSWORD FOR 'root'@'localhost' = PASSWORD('root');
    Query OK, 0 rows affected (0.00 sec)

    mysql> SET PASSWORD FOR 'root'@'127.0.0.1' = PASSWORD('root');
    Query OK, 0 rows affected (0.00 sec)

    mysql> SET PASSWORD FOR 'root'@'::1' = PASSWORD('root');
    Query OK, 0 rows affected (0.00 sec)


第二种方式更加直接，使用`UPDATA`直接修改数据表。

    mysql> UPDATE mysql.user SET Password = PASSWORD('root') WHERE User = 'root';
    Query OK, 1 row affected (0.00 sec)
    Rows matched: 4  Changed: 1  Warnings: 0

    mysql> FLUSH PRIVILEGES;
    Query OK, 0 rows affected (0.00 sec)


这里的`FLUSH`语句让数据库重新加载授权表，否则需要等下次重启才能生效。

第三种方式是使用`mysqladmin`命令，不过这种方式不能为`'root'@'127.0.0.1'`和`'root'@'::1'`
修改密码。

    shell> mysqladmin -u root password "newpwd"
    shell> mysqladmin -u root -h host_name password "newpwd"
