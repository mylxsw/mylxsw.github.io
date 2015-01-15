
###运行C++ Broker

构建broker和客户端类库之后，可以从命令行启动broker

    [qpidc-0.4]$ src/qpidd

使用`--daemon`选项可以让broker作为守护进程运行

    [qpidc-0.4]$ src/qpidd --daemon

可以使用`--quit`选项退出守护进程模式的程序

    [qpidc-0.4]$ src/qpidd --quit

使用`--help`可以查看所有选项的帮助信息

    [qpidc-0.4]$ src/qpidd --help

###运行过程中遇到的常见问题

####启动broker的时候遇到错误**"no data directory"**

C++ Broker需要设置`data`目录或者指定选项`--no-data-dir`。`data`目录用来记录日志信息，所以它对消息的可靠性是非常重要的，需要确保进程对该目录有写权限。

默认位置是

    /lib/var/qpidd

可以使用选项`--data-dir`指定其它位置。

####启动broker的时候遇到错误**"that process is locked"**

注意的是，在broker启动的时候，会在data目录创建一个锁文件，执行下列命令清理掉这个锁文件

    ./qpidd -q

> 同一个主机上可以运行多个broker，需要注意的是要为每个broker设置不同的data目录

####使用配置文件

每一个在命令行选项中可以指定的参数在配置文件中都可以配置，要将命令行选项转为配置项，只需要去掉`--`即可，例如

    daemon=yes
    log-to-syslog=yes

###认证管理

最简单的认证是通过用户名+密码的方式，它们保存在`sasldb_path`文件中，可以使用下列命令添加用户名密码

    saslpasswd2 -f /var/lib/qpidd/qpidd.sasldb -u <REALM> <USER>

其中`REALM`是非常重要的，它的值应该与传递给broker的`--auth-realm`相同，只有这样，broker才能从sasldb文件中找到用户信息。

可以使用下列命令列出已经存在的用户账户

	sasldblistusers2 -f /var/lib/qpidd/qpidd.sasldb

> 注意： `sasldb`文件必须对运行中的qpidd进程的用户是可读的，并且仅对该用户可读。


###配置信息

    ./qpidd --help

    Usage: qpidd OPTIONS
    Options:
      -h [ --help ]                    显示帮助信息
      -v [ --version ]                 显示版本信息
      --config FILE (/etc/qpidd.conf)  从指定文件读取配置

    模块选项:
      --module-dir DIR (/usr/lib/qpidd)  载入该目录下所有的.so模块文件
      --load-module FILE                 指定额外需要加载的模块
      --no-module-dir                    指定不从模块目录加载模块文件

    Broker 选项:
      --data-dir DIR (/var/lib/qpidd)   包含broker生成的持久化数据的目录
      --no-data-dir                     不使用数据目录，持久化的配置信息将不会被加载或者存储
      -p [ --port ] PORT (5672)         监听端口号
      --worker-threads N (3)            设置broker的线程池大小
      --max-connections N (500)         设置最大允许的连接数
      --connection-backlog N (10)       为服务器socket设置连接backlog限制
      --staging-threshold N (5000000)   积压的消息超过N bytes 将会写入到磁盘
      -m [ --mgmt-enable ] yes|no (1)   允许管理
      --mgmt-pub-interval SECONDS (10)  管理发布时间
      --ack N (0)                       Send session.ack/solicit-ack at least every
                                        N frames. 0 disables voluntary ack/solitict
                                       -ack

    守护进程选项:
      -d [ --daemon ]             以守护进程方式运行
      -w [ --wait ] SECONDS (10)  设置初始化守护进程最大的等待时间，如果守护进程初始化失败则返回1，并打印错误信息
      -c [ --check ]              输出守护进程的进程ID到标准输出，如果进程正在运行返回0，否则返回1
      -q [ --quit ]               关闭守护进程
    日志选项:
      -t [ --trace ]              允许所有的日志
      --log-enable RULE (notice+) Enables logging for selected levels and components. 
                                  RULE is in the form 'LEVEL[+-][:PATTERN]'
                                  LEVEL is one of: 
                                     trace debug info notice warning error critical
                                  PATTERN is a logging category name, or a namespace-qualified 
                                  function name or name fragment. 
                                     Logging category names are: 
                                     Security Broker Management Protocol System HA Messaging Store 
                                     Network Test Client Model Unspecified

                                  For example:
                                      '--log-enable warning+'
                                      logs all warning, error and critical messages.

                                      '--log-enable trace+:Broker'
                                      logs all category 'Broker' messages.

                                      '--log-enable debug:framing'
                                      logs debug messages from all functions with 'framing' in 
                                      the namespace or function name.

                                  This option can be used multiple times

      --log-disable RULE          Disables logging for selected levels and components. 
                                  RULE is in the form 'LEVEL[+-][:PATTERN]'
                                  LEVEL is one of: 
                                     trace debug info notice warning error critical
                                  PATTERN is a logging category name, or a namespace-qualified 
                                  function name or name fragment. 
                                     Logging category names are: 
                                     Security Broker Management Protocol System HA Messaging Store 
                                     Network Test Client Model Unspecified

                                  For example:
                                      '--log-disable warning-'
                                      disables logging all warning, notice, info, debug, and 
                                      trace messages.

                                      '--log-disable trace:Broker'
                                      disables all category 'Broker' trace messages.

                                      '--log-disable debug-:qmf::'
                                      disables logging debug and trace messages from all functions 
                                      with 'qmf::' in the namespace.

                                  This option can be used multiple times

      --log-time yes|no (1)                 是否在日志消息中包含时间
      --log-level yes|no (1)                在日志消息中包含严重程度
      --log-source yes|no (0)               在日志消息中包含file:line
      --log-thread yes|no (0)               包含日志消息的线程ID
      --log-function yes|no (0)             包含日志消息的函数签名
      --log-hires-timestamp yes|no (0)      在日志中包含高精度的时间戳
      --log-category yes|no (1)             在日志中包含日志分类
      --log-prefix STRING                   为所有的日志增加前缀

    Logging sink options:
      --log-to-stderr yes|no (1)            发送日志到标准错误输出
      --log-to-stdout yes|no (0)            发送日志到标准输出
      --log-to-file FILE                    发送日志输出到文件
      --log-to-syslog yes|no (0)            发送日志到syslog，使用--syslog-name和--syslog-facility定制
      --syslog-name NAME (qpidd)            syslog日志的名称
      --syslog-facility LOG_XXX (LOG_DAEMON) 
                                            Facility to use in syslog messages

