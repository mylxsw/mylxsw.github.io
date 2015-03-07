##Linux学习笔记
###1. 磁盘管理
#####1.1 查看磁盘分区信息(修改分区)
方法1: 查看 ```/proc/partitions``` 文件   
<pre>
[root@localhost TestLabs]# cat /proc/partitions 
major minor  #blocks  name

   8        0   67108864 sda
   8        1     512000 sda1
   8        2   66595840 sda2
 253        0   31985664 dm-0
 253        1    2064384 dm-1
 253        2   32542720 dm-2
</pre>
方法2: 执行命令 ```fdisk -l```
<pre>
[root@localhost TestLabs]# fdisk -l

Disk /dev/sda: 68.7 GB, 68719476736 bytes
255 heads, 63 sectors/track, 8354 cylinders
Units = cylinders of 16065 * 512 = 8225280 bytes
Sector size (logical/physical): 512 bytes / 4096 bytes
I/O size (minimum/optimal): 4096 bytes / 4096 bytes
Disk identifier: 0x00043e44

   Device Boot      Start         End      Blocks   Id  System
/dev/sda1   *           1          64      512000   83  Linux
Partition 1 does not end on cylinder boundary.
/dev/sda2              64        8355    66595840   8e  Linux LVM
</pre>
> 修改分区可以使用 ```fdisk [分区名称]``` 进入交互界面进行磁盘分区管理。如下图所示： 

<pre>
[root@localhost TestLabs]# fdisk /dev/sda

The device presents a logical sector size that is smaller than
the physical sector size. Aligning to a physical sector (or optimal
I/O) size boundary is recommended, or performance may be impacted.

WARNING: DOS-compatible mode is deprecated. It's strongly recommended to
         switch off the mode (command 'c') and change display units to
         sectors (command 'u').

Command (m for help): m
Command action
   a   toggle a bootable flag
   b   edit bsd disklabel
   c   toggle the dos compatibility flag
   d   delete a partition
   l   list known partition types
   m   print this menu
   n   add a new partition
   o   create a new empty DOS partition table
   p   print the partition table
   q   quit without saving changes
   s   create a new empty Sun disklabel
   t   change a partition's system id
   u   change display/entry units
   v   verify the partition table
   w   write table to disk and exit
   x   extra functionality (experts only)

Command (m for help): 
</pre>

#####1.2 创建文件系统
使用命令 ```mke2fs -t [要创建的文件系统类型] [磁盘]```   
<pre>
[root@localhost TestLabs]# mke2fs -t ext4 /dev/sda3
</pre>

常用参数

- -b blocksize 指定文件系统块大小    
- -c 	创建的时候检查坏块   
- -L	指定卷标   
- -j 	建立文件系统日志

####1.3 磁盘挂载
挂载磁盘，使用```mount [要挂载的分区] [挂在点]```命令。    
直接使用mount命令将会列出已经挂载的分区。    
常用参数：   

- **-t** 指定文件系统的类型
- **-o** 指定挂载选项（ro[只读],rw[读写],sync[无缓存，直写],async[缓存，默认],noatime[每次访问不更新文件访问时间],atime[每次访问更新文件访问时间],remount[重新挂载]）

<pre>
#mount -o remount,sync,noatime /dev/sdb1 /mnt/
</pre>

使用命令 ```umount [文件系统／挂载点]``` 卸载已经挂载的文件系统。


> 使用命令 ```lsof``` 查看打开了那些文件，一般可以在无法卸载磁盘的时候用于查看已经打开的文件，后面跟上磁盘，可以列出该磁盘上哪些文件打开了。   
> 或者 如果无法卸载，提示文件正在被使用，可以使用```fuser -m /mnt``` 查看文件系统的进程。

如果要实现自动挂载，可以修改 ```/etc/fstab```文件实现。该文件中新增一条记录就可以了，文件行结构如下所示：
<table>
<tr>
	<td>/dev/sda3</td>
	<td>/mnt</td>
	<td>ext4</td>
	<td>defaults</td>
	<td>0 0</td>
</tr>
<tr>
	<td>需要挂载的设备</td>
	<td>挂载点</td>
	<td>文件系统</td>
	<td>挂载选项</td>
	<td>dump，fsck相关选项</td>
</tr>
</table>

> 使用```mount -a``` 会挂载fstab文件中的所有自动挂载项

### 2. 用户及权限基础

####2.1 用户基础
用户分为三类：   

- root用户，id为0的用户
- 系统用户，没有shell（/sbin/nologin or /bin/false），id范围为1-499
- 普通用户，id为500+

> 使用```id```可以查看当前用户的信息

用户配置文件为```/etc/passwd```,该文件保存了所有用户的基本信息，该文件所有用户均可以访问，因此，密码并不在该文件中存放，用户的密码存放在```/etc/shadow```文件中，该文件只有root用户可以访问。   
另一个配置文件 ```/etc/group``` 为用户组的配置文件，包含了组的信息。   

> 查看当前用户```whoami```,  ```who```, ```w``` , 命令越长，显示的内容越少。

<pre>
localhost:bash mylxsw$ whoami
mylxsw
localhost:bash mylxsw$ who
mylxsw   console  May 27 20:50 
mylxsw   ttys000  May 28 21:39 
localhost:bash mylxsw$ w
22:20  up 1 day,  1:31, 2 users, load averages: 2.22 1.82 1.68
USER     TTY      FROM              LOGIN@  IDLE WHAT
mylxsw   console  -                二20   25:29 -
mylxsw   s000     -                21:39       - w
</pre>

##### 2.1.1 添加新用户
添加新用户使用命令```useradd```，如下
<pre>
[root@localhost mylxsw]# useradd aicode
[root@localhost mylxsw]# cat /etc/passwd
root:x:0:0:管宜尧:/root:/bin/bash
...
mylxsw:x:500:500::/home/mylxsw:/bin/bash
aicode:x:501:501::/home/aicode:/bin/bash
</pre>

以上命令执行后会添加一个新用户，用户名为aicode，可以看到，该命令在/etc/passwd中添加了一条用户信息记录。

> 该命令会为用户创建一个home目录，在/home/用户名，还会为用户建立一个用户组，改组名与用户名称相同，同时，会把```/etc/skel```目录下的文件复制到用户目录中。（/etc/skel目录为用户初始化目录，如果需在新建用户时初始化一些用户信息，可以在该目录中修改，类似于模板）


常用参数:   

- **-d**指定用户home目录
- **-s**用户登陆shell
- **-u**指定用户id
- **-g**指定用户的主组
- **-G**指定用户的附属组（最多31个，用“,”分隔）

##### 2.1.2 修改用户信息
通过命令```usermod [参数] [用户名]``` 修改用户信息。

常用参数：

- **-l**新的用户id
- **-d**指定用户home目录
- **-s**用户登陆shell
- **-u**指定用户id
- **-g**指定用户的主组
- **-G**指定用户的附属组（最多31个，用“,”分隔）
- **-L**锁定用户，使其不能登陆
- **-U**解除对用户的锁定

##### 2.1.3 删除用户
使用命令```userdel [用户名]```删除用户。
> 删除用户操作不会删除用户的home目录，如果要删除home目录，需要增加```-r```参数。

##### 2.1.4 组的创建、修改、删除

创建组 ```groupadd [组名]```   
修改组名 ```groupmod -n [新组名] [旧组名]```   
修改组id ```groupmod -g [新组id] [旧组id]```   
删除组 ```groupdel [组名]```   






