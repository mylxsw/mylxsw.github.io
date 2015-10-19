---
categories: [运维,PHP]
tags: [linux, php, lnmp]
thumb: /assets/images/thumb/rsyslog_message_flow.jpg
---

在 Linux 系统中，日志文件记录了系统中包括内核、服务和其它应用程序等在内的运行信息。
在我们解决问题的时候，日志是非常有用的，它可以帮助我们快速的定位遇到的问题。

在 Cent OS 6中，日志是使用`rsyslogd`守护进程进行管理的，该进程是之前版本的系统中`syslogd`的升级版，对原有的日志系统进行了功能的扩展，提供了诸如过滤器，日志加密保护，各种配置选项，输入输出模块，支持通过 TCP 或者 UDP 协议进行传输等。

`rsyslog`的配置文件为 **/etc/rsyslog.conf** , 大多数日志文件都位于 **/var/log/** 目录中。

###定位日志文件

大多数日志文件都位于 **/var/log/** 目录中。在该目录中，你可能注意到很多日志文件末尾包含一串数字（如 *maillog-20150301* ），这说明这些日志文件经过了日志转储，这样可以避免日志文件过大。

> 在软件包`logrotate`中包含了一个定时任务，根据`/etc/logrotate.conf`文件和`/etc/logrotate.d/`目录中的的配置定期的转储日志文件。

###Rsyslog基本配置

Rsyslog 的主要配置文件为 **/etc/rsyslog.conf** 文件，在配置文件中，我们通过配置 filter 以及 action 对日志进行管理。

在`rsyslog`配置文件中，使用如下格式定义规则

	filter		action

`rsyslog`发现符合 filter 规则的日志后，会将日志发送到 action 指定的动作进行处理。

####Filter

在`rsyslog`中，提供了三种方式的过滤器方法：

##### 基于设施/优先级的过滤器 *(Facility/Priority-based filters)*

基于设施/优先级的过滤器是最常用的方法，语法如下：

	FACILITY.PRIORITY

`FACILITY`指定了产生日志消息的子系统，可选值为 **auth** , **authpriv** , **cron** , **daemon** , **kern** , **lpr** , **mail** , **news** , **syslog** , **user** , **ftp** , **uucp** , **local0** ~ **local7** 。

`PRIORITY`指定了日志消息的优先级，可用的优先级包含 **debug (7)** , **info (6)** , **notice (5)** , **warning (4)** , **err (3)** , **crit (2)** , **alert (1)** , **emerg (0)** 。

> 前置符号`=`表明只有该优先级的消息会被捕获，`!`表明除了该优先级的消息之外的优先级会被捕获。除了前置符号外，可以使用符号`*`
表示所有的设施或者优先级，对优先级部分使用`none`关键字会捕获所有没有指定优先级的消息。

定义多个设施或者优先级使用`,`分隔，如果是多个 filter 的话，则使用`;`进行分隔。

使用范例

	kern.*					# 选择所有优先级的内核日志
    mail.crit				 # 选择所有mail 的优先级高于crit的日志
	cron.!info,!debug		 # 选择除了 info 和 debug 优先级的 cron 日志


##### 基于属性的过滤器

基于属性的过滤器语法

	:PROPERTY, [!]COMPARE_OPERATION, "STRING"

`:PROPERTY`是要比较的日志属性，`COMPARE_OPERATION` 为要执行的比较操作，这个的`!`表示取反的意思，`"STRING"`为比较的值。

可以使用的比较操作：

| 比较操作        | 描述
|----------------|-------------------------------------
| contains       | 匹配提供的字符串值是否是属性的一部分，如果不区分大小写，使用`contains_i`
| isequal        | 比较属性和值是否相等
| startswith     | 属性是否以指定字符串开始(`startswith_i`)
| regex          | 正则表达式(POSIX BRE 基本正则)匹配
| ereregex       | 正则表达式(POSIX ERE 扩展正则)匹配
| isempty        | 判断属性是否为空，不需要 value

使用范例：

	:msg, contains, "error"
    :hostname, isequal, "host1"
	:msg, !regex, "fatal .* error"


##### 基于表达式的过滤器

基于表达式的过滤器使用了`rsyslog`自定义的脚本语言[RainerScript][RainerScript]构建复杂的filter，这里暂时不对这种方法进行讲述。

####Action

Action定义了当匹配指定的 filter 的时候，执行什么操作。

> 如果要指定多个 ACTION， 使用 `&`连接多个 ACTION。
> 例如：
>
>		kern.=crit user1
>    	& ^test-program;temp
>    	& @192.168.0.1
>
> 这里的`;temp`指定了传递日志给 test-program 程序时（ **^** 开头表明日志发送给该可执行文件），使用它 temp 模板格式化日志。

在 ACTION 后面追加`;模板名称`可以为指定的 action 使用该模板格式化日志。

#####保存日志到日志文件

语法：

	FILTER PATH

这里的 **PATH** 指定了日志要保存到的文件。例如 `cron.* /var/log/cron.log` 指定了所有的定时任务日志都写入到`/var/log/cron.log`文件。

> 默认情况下，每次生成 syslog 的时候，日志信息会同步到日志文件。可以在文件路径前使用 **-** 指定忽略同步（如果系统崩溃，会丢失日志，但是这样可以提高日志性能）。

除了上述方法记录日志（静态），也可以动态的生成日志文件。

	FILTER     ?DynamicFile

这里的`DynamicFile`是预定义的输出路径模板。

#####通过网络发送syslog

`rsyslog`可以使用网络将日志消息发送或者接受日志，使用这个特性，可以实现使用单一的日志服务器统一管理多台服务器日志。

	@[(zNUMBER)]HOST:[PORT]

这里的`@`告诉`syslog`使用 *UDP* 协议发送日志，要使用 *TCP* 的话，使用 `@@`。可选值`zNUMBER`设置了是否允许使用`zlib`对日志压缩（压缩级别1-9）。

使用范例

	*.* @192.168.0.1		# 使用 UDP 发送，默认端口514
    *.* @@example.com:18	# 使用 TCP 发送到端口18， 默认10514
	*.* @(z9)[2001:db8::1]  # UDP, ipv6，使用zlib级别9压缩

#####丢弃日志

要丢弃日志消息，使用`~`动作。

	FILTER    ~

例如：

    cron.* ~

####模板

任何`rsyslog`生成的日志都可以根据需要使用模板进行格式化，要创建模板，使用如下指令

	$template TEMPLATE_NAME,"text %PROPERTY% more text", [OPTION]

这里的`$template`指令表明了接下来的内容定义了一个模板，`TEMPLATE_NAME`是模板的名称，接下来双引号之间的内容为模板的内容。

> 这里还有一个 OPTION ， 它指定了模板的功能，支持选项为`sql`和`stdsql`，在使用数据库存储的时候会用到。

#####生成动态文件名

模板可以用来生成动态文件名，就如之前所述，在使用动态文件名的时候，需要在 ACTION 中的模板名称前增加`?`表明该文件名是动态生成的。

例如:

	$template DynamicFile,"/var/log/test_logs/%timegenerated%-test.log"
	*.* ?DynamicFile

> `timegenerated`属性从日志信息中提取出消息的时间戳，这样可以为每个日志生成唯一文件名称。

#####属性

在模板中使用的属性是在`%`之间的内容，使用属性可以访问日志消息中的内容。

	%PROPERTY_NAME[:FROM_CHAR:TO_CHAR:OPTION]%

可用的属性列表见`man rsyslog.conf`。

####全局指令

全局指令是`rsyslogd`守护进程的配置指令。所有的全局指令必须以`$`开始，每行只能有一个指令，例如：

	$MainMsgQueueSize 50000

> 在新的配置格式中(rsyslog v6)，已经不在使用这种方式的指令，但是它们仍然是可用的。

###队列

在 rsyslog 中，队列用来传输数据，当 rsyslog 接收到一个消息的时候，首先传递消息预处理器，然后加入到主消息队列，接下来消息会从队列中取出传递给规则处理器。

![Message Flow in Rsyslog][rsyslog_message_flow]

规则处理器是一个解析过滤引擎，它会基于配置文件中定义的规则，执行相应的动作(action)，每一个动作都有自己的动作队列，消息通过这个队列发送到对应的动作处理器，然后输出。

> 对于同一个消息来说，可以同时传递这个消息给多个动作队列。

####定义队列

在配置文件`/etc/rsyslog.conf`文件中

	$objectQueueType queue_type

这里的队列类型可选值为 **direct** , **linkedlist** , **fixedarray** (内存队列), 或者 **disk** 。

默认情况下，对于主队列，使用的是FixedArray队列（10000个消息长度），动作队列采用的是direct 队列。


###PHP 使用 syslog 输出日志

在PHP 中，调用系统日志系统的函数有三个

	bool openlog ( string $ident , int $option , int $facility )
	bool syslog ( int $priority , string $message )
	bool closelog ( void )

函数`openlog`用于打开到系统日志系统的连接，第一个参数`$ident`是一个字符串，syslog 会将该字符串自动加到使用`syslog`函数输出的所有日志消息的前面。第二个参数是日志选项，第三个参数是记录日志的设施。

> 函数`openlog()`和`closelog()`是可选的。

例如，我们在`/etc/rsyslog.conf`配置文件中增加如下配置

	local5.*     /tmp/php_test.log

增加后需要重启 rsyslog 进程(`sudo /etc/init.d/rsyslog restart`)

在 PHP 脚本中，执行如下操作

    <?php
    openlog("LogHeader", LOG_PID, LOG_LOCAL5);
    syslog(LOG_DEBUG, "Hello, Logger");

执行上述脚本，我们可以在`/tmp`目录中看到出现名为`php_test.log`的文件

	Mar 10 14:47:04 vm-hp LogHeader[8261]: Hello, Logger

第一部分`Mar 10 14:47:04`为日志时间，第二部分`vm-hp`为主机的 HOSTNAME , 我们在 调用`openlog`函数的时候，指定了 `indent`为`LogHeader`， 同时在日志中加入进程的 PID（LOG_PID）。

上述日志消息，如果要使用模板的话，是下面这样的

	$template LOG_TMP,"%timegenerated% %HOSTNAME% %msg%"
    local5.*     /tmp/php_test.log;LOG_TMP

我们将所有支持的模板属性变量输出如下

    msg:  Hello, Logger,
    rawmsg: <175>Mar 10 15:52:49 LogHeader[13845]: Hello, Logger,
    HOSTNAME: vm-28-234-pro01-hp,
    FROMHOST: vm-28-234-pro01-hp,
    syslogtag: LogHeader[13845]:,
    programname: LogHeader,
    PRI: 175,
    PRI-text: local5.debug,
    IUT: 1,
    syslogfacility: 21,
    syslogfacility-text: local5,
    syslogseverity: 7,
    syslogseverity-text: debug,
    timereported: Mar 10 15:52:49,
    TIMESTAMP: Mar 10 15:52:49,
    timegenerated: Mar 10 15:52:49,
    PROTOCOL-VERSION: 0,
    STRUCTURED-DATA: -,
    APP-NAME: LogHeader,
    PROCID: 13845,
    MSGID: -


---

参考: [Red Hat Enterprise linux 6 Deployment Guide: Chapter 23. Viewing and Managing Log Files](https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Deployment_Guide/ch-Viewing_and_Managing_Log_Files.html)



[RainerScript]:http://www.rsyslog.com/doc/rainerscript.html
[rsyslog_message_flow]:/assets/images/rsyslog_message_flow.png
