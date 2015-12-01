---
caegories: [PHP]
tags: [php, xdebug, lnmp]
---

【本文位翻译的官方文档部分】

Xdebug提供了客户端与PHP脚本进行交互的接口，这一章将会介绍如何让PHP和Xdebug开启这个特性，并且介绍一些常用的客户端。

###概述

Xdebug(远程)调试器允许测试数据结构，步进并且调试你的代码。Xdebug提供了两种协议用于与其进行交互：在Xdebug1.3和2中旧的```GDB协议```和Xdebug2中实现的```DBGp协议```。

###客户端

Xdebug2 为DBGp协议提供了一个简单的基于命令行的客户端，当然，也有一些其它的客户端实现（免费的和商业的）。我不是这些客户端的作者，所以请到作者的网站寻找使用帮助。

- [Dev-PHP](http://devphp.sf.net/) (IDE: Windows)
- Eclipse plugin, which has been submitted as an enhancement for the PDT (IDE).
- Emacs plugin (Editor Plugin).
- ActiveState's Komodo (IDE: Windows, Linux, Mac; Commercial).
- [MacGDBP](https://www.bluestatic.org/software/macgdbp/index.php) - Standalone Mac client.
- NetBeans (IDE: Windows, Linux, Mac OS X and Solaris.
- Notepad++ plugin (Editor: Windows).
- WaterProof's PHPEdit (IDE, from version 2.10: Windows; Commercial).
- Anchor System's Peggy (IDE: Windows, Japanese; Commercial).
- MP Software's phpDesigner (IDE: Windows, Commercial).
- PHPEclipse (Editor Plugin).
- JetBrain'sPhpStorm (IDE; Commercial).
- Protoeditor (Editor: Linux).
- tsWebeditor (Editor: Windows).
- Xored's TrueStudio IDE (IDE; Commercial).
- VIM [plugin](http://www.vim.org/scripts/script.php?script_id=1929) ([Tutorial](http://tech.blog.box.net/2007/06/20/how-to-debug-php-with-vim-and-xdebug-on-linux/)) (Editor Plugin).
- jcx software's VS.Php (MS Visual Studio Plugin; Commercial).
- XDebugClient - Standalone Windows client.

Xdebug1.3也带有一个基于GDB协议的简单的命令行客户端。

###启动调试器

为了启用Xdebug的调试器，你需要在```php.ini```文件中做一些配置。这些配置包含```xdebug.remote_enable```用来允许调试器，```xdebug.remote_host```和```xdebug.remote_port```指定调试器应该连接到的IP地址和端口号。如果你希望调试器能够在发生错误（php错误或者异常）的时候初始化一个session的话，你需要修改```xdebug.remote_mode```配置，该配置项允许的值有```req```（默认）让调试器在所有脚本开始执行的时候初始化session或者是```jit```让发生错误的时候才初始化一个session。

当完成以上配置之后，你会发现在脚本运行的时候，Xdebug并没有自动的开启一个调试会话。你还需要按照下面的方法激活Xdebug的调试器。

1. 当从命令行运行脚本的时候，你需要设置一个环境变量，如下面所述

	<pre>export XDEBUG_CONFIG="idekey=session_name"
php myscript.php</pre>

	你也可以配置```xdebug.remote_host```, ```xdebug.remote_port```, ```xdebug.remote_mode```和```xdebug.remote_handler``` 这些选项：

	<pre>export XDEBUG_CONFIG="idekey=session_name remote_host=localhost profiler_enable=1"</pre>

	这里你设置的这些所有的配置项也可以在php.ini文件中进行设置。

2. 如果你希望通过调试一个通过浏览器访问的脚本，只需要在访问的参数中添加```XDEBUG_SESSION_START=session_name```作为参数传递即可，再下一章节中你将看到一个调试会话如何从浏览器窗口中工作。

3. 另一种方法激活xdebug是在浏览器运行时通过安装以下三个浏览器扩展之一。下面的每一个扩展都允许你通过单击个按钮就可以开启调试器。	这些扩展如下：

	- **最简单的Xdebug**	   
	这个扩展是Firefox上用于使得与IDE一起调试起来更加容易。你可以在[https://addons.mozilla.org/en-US/firefox/addon/the-easiest-xdebug/](https://addons.mozilla.org/en-US/firefox/addon/the-easiest-xdebug/)上找到这个扩展.
	- **Xdebug Helper for Chrome**   
	这个扩展是运行在Chrome浏览器上的，它将会帮助你通过点击一下按钮就可以允许/禁止调试和性能分析T。你可以在[https://chrome.google.com/extensions/detail/eadndfjplgieldjbigjakmdgkmoaaaoc](https://chrome.google.com/extensions/detail/eadndfjplgieldjbigjakmdgkmoaaaoc)找到这个扩展.
	- **Xdebug Toggler for Safari**    
	这个扩展是运行在Safari上的，允许你在Safari中自动的开始Xdebug调试过程，你可以在Github上找到这个扩展[https://github.com/benmatselby/xdebug-toggler](https://github.com/benmatselby/xdebug-toggler).
	- **Xdebug launcher for Opera**   
	这个扩展是运行在Opera上的，它允许你在Xdebug上开启一个Xdebug会话。

在开始执行脚本之前，首先需要告诉客户端可以接收调试连接，请查看您使用的客户端的文档以获取如何这样去做。要使用绑定的客户端，首先需要 [安装](http://xdebug.org/docs/install#debugclient) 它，安装完成后你可以通过运行命令"```debugclient```"命令。如果你希望使用GDB命令集去调试你的脚本，你需要确定你使用的是Xdebug1.3绑定的客户端。

当debugclient开始运行之后，它将会显示以下信息，并且等待来自等待直到debug服务器连接到来以便进行初始化：
<pre>
Xdebug Simple DBGp client (0.10.0)
Copyright 2002-2007 by Derick Rethans.
- libedit support: enabled

Waiting for debug server to connect.
</pre>
在连接完成后，debug服务器将会显示下面的输出：
<pre>
Connect
&lt;?xml version="1.0" encoding="iso-8859-1"?>
&lt;init xmlns="urn:debugger_protocol_v1"
      xmlns:xdebug="http://xdebug.org/dbgp/xdebug"
      fileuri="file:///home/httpd/www.xdebug.org/html/docs/index.php"
      language="PHP"
      protocol_version="1.0"
      appid="13202"
      idekey="derick">
  &lt;engine version="2.0.0RC4-dev">&lt;![CDATA[Xdebug]]>&lt;/engine>
  &lt;author>&lt;![CDATA[Derick Rethans]]>&lt;/author>
  &lt;url>&lt;![CDATA[http://xdebug.org]]>&lt;/url>
  <&lt;opyright>&lt;![CDATA[Copyright (c) 2002-2007 by Derick Rethans]]>&lt;/copyright>
&lt;/init>
(cmd)
</pre>

接下来你就可以使用 [DBGp](http://xdebug.org/docs-dbgp.php) 文档中描述的命令集进行操作了。
当脚本执行结束的时候，调试服务器将会断开与客户端的连接，并且还原到等待新的连接请求的状态。

###连接建立

####对于有静态IP、单个开发者

使用Xdebug的远程调试，Xdebug作为一个嵌入到PHP的程序，扮演着客户端的角色，而IDE则作为服务器。下面的动态图展示了连接建立的过程。

![连接建立过程](http://xdebug.org/images/docs/dbgp-setup.gif)

- 服务端的IP为10.0.1.2， 使用HTTP协议，端口为80
- IDE在IP地址为10.0.1.42的机器上，```xdebug.remote_host```被设置为10.0.1.42
- IDE监听9000端口，因此，```xdebug.remote_port```设置为9000
- HTTP请求从运行这IDE的服务器上发起
- Xdebug连接到10.0.1.42:9000
- 调试开始运行，返回HTTP响应

####使用非固定IP，多个开发者

如果使用了```xdebug.remote_connect_back```指令的话，连接的建立过程是不同的：

![连接建立过程](http://xdebug.org/images/docs/dbgp-setup2.gif)

- 服务端的IP是10.0.1.2, 端口为80
- IDE运行在一个动态IP的计算机上，因此设置```xdebug.remote_connect_back```为1
- IDE监听端口 9000， 因此，配置```xdebug.remote_port``` 为9000
- 发送HTTP请求，Xdebug检测HTTP header中的IP地址
- 调试开始运行，产生HTTP响应

###HTTP调试会话

当使用浏览器进行Debug的时候，Xdebug支持吃用cookie跟踪会话的功能。

- 当参数```XDEBUG_SESSION_START=name```被附加到URL地址上，Xdebug将会设置一个名为```XDEBUG_SESSION```，值为参数```XDEBUG_SESSION_START```指定的名称的Cookie。这个Cookie的过期时间是一个小时。```DBGp```协议也会在初始化包中传递一个同样的值，这样就可以连接到设置了```idekey```属性的客户端了。
- 当设置了一个名为```XDEBUG_SESSION_START```的GET（POST）变量或者```XDEBUG_SESSION```的Cookie的话，Xdebug将会尝试去连接debugcliet
- 要停止xdebug会话的话，只需要传递一个```XDEBUG_SESSION_STOP```的参数，然后Xdebug将不会再去尝试连接debugclient。

###多用户调试
Xdebug只允许你使用指定的IP地址（```xdebug.remote_host```）进行远程调试连接.他不会自动的连接回浏览器运行访问的机器IP，除非你是用```xdebug.remote_connect_back```指令。

如果你的开发者们在同一个服务器上的不同的项目上面进行开发，你可以使用Apache的每个目录中的```.htaccess```功能指定```xdebug.remote_host```指令，配置```php_value xdebug.remote_host=10.0.0.5```。 但是，如果是多个开发者在同样的代码上进行开发的话，```.htaccess```将无法完成该项功能。

针对这个问题，这里有两个解决方案。第一个是你可以使用DGBp代理，对于如何使用这个代理，请查看[多用户调试](http://derickrethans.nl/debugging-with-multiple-users.html)这篇文章。你可以在 [ActiveState的站点](http://derickrethans.nl/debugging-with-multiple-users.html) 下载这个代理。这里有更多的文档在[Komodo FAQ](http://community.activestate.com/faq/komodo-ide-debugger-proxy-pydbgpproxy).

第二个方案是可以使用```xdebug.remote_connect_back```配置项（Xdebug 2.1之后引入）。

###相关配置

- **xdebug.extended_info**   
	Type: integer, Default value: 1

	控制Xdebug是否应该强制PHP解释器使用'extended_info'模式；这使得Xdebug可以使用远程调试器对文件或者行设置断点。当对脚本进行堆栈跟踪或者是性能调试的时候通常希望关闭这个选项，因为为PHP增加的一些调试属性将会减慢脚本的执行，影响最终结果。这个属性只能在```php.ini```文件中设置，不能够在脚本中通过```ini_set()```函数进行设置。

- **xdebug.idekey**   
Type: string, Default value: *complex*

	控制Xdebug应该传递给```DBGp```调试处理器那一个IDE key。默认情况下是基于环境配置的。首先，环境变量中的```DBGP_IDEKEY```会被使用，然后是USER和USERNAME。默认会使用在环境变量中第一次发现的配置值，如果找不到配置，则使用默认的''。如果设置了这个选项，它将会覆盖环境变量的配置。

- **xdebug.remote_autostart**   
Type: boolean, Default value: 0

	通常情况下，你需要使用指定的HTTP GET/POST变量去激活Xdebug的远程调试功能。当这个设置为1的情况下，Xdebug将在脚本执行时总是尝试去连接调试客户端，即使没有设置GET/POST/COOKIE变量。＝

- **xdebug.remote_connect_back**   
Type: boolean, Default value: 0, Introduced in Xdebug > 2.1

	如果允许的话，```xdebug.remote_host```设置将会被失效，Xdebug将会尝试连接发送HTTP请求的计算机的调试客户端。他将会检查```$_SERVER['REMOTE_ADDR']```变量，查找所使用的IP地址。请注意，这里没有可用的过滤器，任何连接到webserver的人都可以开始一个调试会话，即使他们的IP地址与```xdebug.remote_host```并不相同。

- **xdebug.remote_cookie_expire_time**   
Type: integer, Default value: 3600, Introduced in Xdebug > 2.1

	这个选项用于控制调试会话可用的时间。

- **xdebug.remote_enable**   
Type: boolean, Default value: 0

	这个选项控制是否允许远程调试，如果无法建立连接的话脚本将会继续执行，就像这个配置的值为0一样。

- **xdebug.remote_handler**   
Type: string, Default value: dbgp

	这个值可以是```php3```，用于使用旧式的PHP 3样式的调试输出，```gdb```用于允许使用GDB的调试器接口或者```dbgp```协议。```DBGp```协议是唯一支持的协议。

> 注意: Xdebug 2.1 和之后的版本只支持```dbgp```协议。

- **xdebug.remote_host**   
Type: string, Default value: localhost

	选择调试客户端运行在那个主机上，这个选项可以使用主机名或者是IP地址。如果```xdebug.remote_connect_back```选项指定了的花该选项将会被忽略。

- **xdebug.remote_log**   
Type: string, Default value:

	如果设置了这个值，将会使用它作为文件名，所有的远程调试连接都会被记录到该日志文件中。这个文件总是以追加模式打开，因此，默认情况下不要覆写它。这里没有进行并发保护。日志文件的格式类似于下面：
	<pre>
	Log opened at 2007-05-27 14:28:15
	-> &lt;init xmlns="urn:debugger_protocol_v1" xmlns:xdebug="http://xdebug.org/dbgp/x ... ight>&lt;/init>

	&lt;- step_into -i 1
-> &lt;response xmlns="urn:debugger_protocol_v1" xmlns:xdebug="http://xdebug.org/db ... >&lt;/response></pre>

- **xdebug.remote_mode**   
Type: string, Default value: req

选择调试连接什么时候建立。这个选项有两个不同的值:

```req```   
Xdebug将会当脚本执行开始的时候立即连接到调试客户端。

```jit```   
Xdebug 只会在脚本发生错误的情况下尝试去连接调试客户端。

- **xdebug.remote_port**   
Type: integer, Default value: 9000

Xdebug用于连接客户端的端口号。默认端口为9000.

####相关函数

bool xdebug_break()   

给调试客户端发送一个断点，这个函数让调试器在指定的行上设置一个断点。
