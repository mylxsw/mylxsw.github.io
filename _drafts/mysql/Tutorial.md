## Tutorial

[TOC]

###MySQL连接和断开

使用`mysql`命令连接到mysql服务器，在服务器与客户端不在同一台机器上时，需要提供`-h`参数指定服务器地址。
```bash
$ mysql -h localhost -u root -p
```

> 在使用mysql客户端连接的时候，如果出现下列错误，则说明服务器还没有启动，需要先启动MySQL服务器。
```bash
ERROR 2002 (HY000): Can't connect to local MySQL server through socket '/tmp/mysql.sock' (2)
```

在使用`mysql`命令的时候，如果不提供任何参数，在服务端支持的情况下，将会以anonymous用户连接到mysql。

在连接成功后，执行`QUIT`命令可以退出MySQL，在Unix系统上，使用`Ctrl+D`也可断开连接。
```bash
mysql> QUIT
Bye
```

###执行简单查询

连接到MySQL之后，可以通过下列命令查询当前MySQL的版本和当前的日期:
```bash
mysql> SELECT VERSION(), CURRENT_DATE, NOW();
+-----------+--------------+---------------------+
| VERSION() | CURRENT_DATE | NOW()               |
+-----------+--------------+---------------------+
| 5.6.21    | 2014-12-12   | 2014-12-12 09:03:07 |
+-----------+--------------+---------------------+
1 row in set (0.01 sec)
```

可以使用MySQL执行算术计算:
```bash
mysql> SELECT SIN(PI()/4), (4+1)*10;
+--------------------+----------+
| SIN(PI()/4)        | (4+1)*10 |
+--------------------+----------+
| 0.7071067811865475 |       50 |
+--------------------+----------+
1 row in set (0.01 sec)
```

查询当前登录的用户:
```bash
mysql> SELECT USER();
+----------------+
| USER()         |
+----------------+
| root@localhost |
+----------------+
1 row in set (0.01 sec)
```

###数据库基本操作

####查看当前存在哪些数据库:
```bash
mysql> SHOW DATABASES;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| test               |
+--------------------+
4 rows in set (0.02 sec)
```

####选择要操作的数据库，使用`USE`命令:
```bash
mysql> USE test;
Database changed
```

####为某个用户授权对某个数据库的访问权限:
```bash
mysql> GRANT ALL ON menagerie.* TO 'your_mysql_name'@'your_client_host';
```

####创建并选择刚创建的数据库:
```bash
mysql> CREATE DATABASE menagerie;
Query OK, 1 row affected (0.01 sec)

mysql> USE MENAGERIE;
ERROR 1049 (42000): Unknown database 'MENAGERIE'
mysql> USE menagerie;
Database changed
```

> 注意，在Unix系统下，数据库名称（表名）是大小写敏感的，而Windows下是不敏感的，推荐使用一致的数据库名称。

如果在创建数据库的过程中，出现如下错误，说明当前用户没有创建数据库的权限。
```bash
ERROR 1044 (42000): Access denied for user 'monty'@'localhost' to database 'menagerie'
```

在选定数据库之后，可以通过`SELECT DATABASE()`命令查看当前选定了哪个数据库。
```bash
mysql> SELECT DATABASE();
+------------+
| DATABASE() |
+------------+
| menagerie  |
+------------+
1 row in set (0.00 sec)
```

####创建表

创建数据库之后，该数据库是空的，接下来为数据库添加一个表pet。
```bash
mysql> CREATE TABLE pet(
    -> name VARCHAR(20),
    -> owner VARCHAR(20),
    -> species VARCHAR(20),
    -> sex CHAR(1),
    -> birth DATE,
    -> death DATE);
Query OK, 0 rows affected (0.06 sec)

mysql> SHOW TABLES;
+---------------------+
| Tables_in_menagerie |
+---------------------+
| pet                 |
+---------------------+
1 row in set (0.00 sec)
```

要查看数据表的结构，可以通过命令`DESCRIBE`或者`DESC`。
```bash
mysql> DESC pet;
+---------+-------------+------+-----+---------+-------+
| Field   | Type        | Null | Key | Default | Extra |
+---------+-------------+------+-----+---------+-------+
| name    | varchar(20) | YES  |     | NULL    |       |
| owner   | varchar(20) | YES  |     | NULL    |       |
| species | varchar(20) | YES  |     | NULL    |       |
| sex     | char(1)     | YES  |     | NULL    |       |
| birth   | date        | YES  |     | NULL    |       |
| death   | date        | YES  |     | NULL    |       |
+---------+-------------+------+-----+---------+-------+
6 rows in set (0.02 sec)
```

####从文件导入数据

表也已经创建了，接下来需要向刚创建的表中插入数据，通常，我们使用SQL命令`INSERT`执行插入操作，但这里我们使用`LOAD DATA`命令从文件中直接插入数据。

首先创建一个文本文件`pet.txt`，在该文本文件中，按照数据表的结构录入需要插入到数据表的数据，每一行为一条记录，每个字段之间使用TAB隔开，如果字段为空，则使用`\N`。
```
Fluffy  Harold  cat     f       1993-02-04      \N
Claws   Gwen    cat     m       1994-03-17      \N
Buffy   Harold  dog     f       1989-5-13       \N
Fang    Benny   dog     m       1990-08-27      \N
Bowser  Diane   dog     m       1979-08031      1995-07-29
Chirpy  Gwen    bird    f       1998-09-11      \N
Whistler        Gwen    bird    \N      1997-12-09      \N
Slim    Benny   snake   m       1996-04-29      \N
```

接下来，在MySQL中，执行如下命令:
```bash
mysql> LOAD DATA LOCAL INFILE '~/pet.txt' INTO TABLE pet;
Query OK, 8 rows affected, 1 warning (0.04 sec)
Records: 8  Deleted: 0  Skipped: 0  Warnings: 1

mysql> SELECT * FROM pet;
+----------+--------+---------+------+------------+------------+
| name     | owner  | species | sex  | birth      | death      |
+----------+--------+---------+------+------------+------------+
| Fluffy   | Harold | cat     | f    | 1993-02-04 | NULL       |
| Claws    | Gwen   | cat     | m    | 1994-03-17 | NULL       |
| Buffy    | Harold | dog     | f    | 1989-05-13 | NULL       |
| Fang     | Benny  | dog     | m    | 1990-08-27 | NULL       |
| Bowser   | Diane  | dog     | m    | 0000-00-00 | 1995-07-29 |
| Chirpy   | Gwen   | bird    | f    | 1998-09-11 | NULL       |
| Whistler | Gwen   | bird    | NULL | 1997-12-09 | NULL       |
| Slim     | Benny  | snake   | m    | 1996-04-29 | NULL       |
+----------+--------+---------+------+------------+------------+
8 rows in set (0.01 sec)
```

> 文件在Mac和Windows下创建时，执行`LOAD DATA`命令分别需要提供`LINES TERMINATED BY '\r'`或者`LINES TERMINATED BY '\r\n'`。
```bash
mysql> LOAD DATA LOCAL INFILE '/path/pet.txt' INTO TABLE pet
    -> LINES TERMINATED BY '\r\n';
```

####执行文件中的SQL

```bash
mysql> source filename;
mysql> \. filename
```

假设当前目录下有文件`test.sql`：
```bash
SHOW DATABASES;
SHOW TABLES;
```
使用`source`执行文件中的sql：
```bash
mysql> source test.sql
+--------------------+
| Database           |
+--------------------+
| information_schema |
| ledisk             |
| menagerie          |
| mysql              |
| performance_schema |
| test               |
+--------------------+
6 rows in set (0.00 sec)

+---------------------+
| Tables_in_menagerie |
+---------------------+
| pet                 |
+---------------------+
1 row in set (0.00 sec)
```


