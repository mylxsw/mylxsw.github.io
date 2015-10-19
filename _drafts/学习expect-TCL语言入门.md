---
published: false
---

## 学习expect - TCL语言入门

Tcl（Tool Command Language）是一种简单易学的脚本语言，由 *John Ousterhout* 创建，它的功能非常强大，经常用于快速原型开发，脚本编程以及GUI和测试。

作为一门非常小众的语言，为什么我们要去学习它呢？一切都是因为在项目开发中，使用到了`expect`命令，该命令使用Tcl作为脚本语言。

在安装Tcl之后，通过执行`tclsh`命令执行Tcl脚本，例如，如果你有一个名为 **hello.tcl** 的脚本文件，你可以通过执行`tclsh hello.tcl`命令去执行这个脚本。

> 根据安装的操作系统不同，tcl的可执行文件名称可能不同，比如在windows下，可能名称为`tclsh8.6`或者是`tclsh86.exe`。

在Tcl中，任何东西都是一条命令，包括它的语法结构，在交互控制台下，使用`info commands`命令可以列出所有支持的命令。

    ➜  ~  tclsh
    % info commands
    tell socket subst open eof pwd glob list pid exec auto_load_index time unknown eval lassign lrange fblocked lsearch auto_import gets case lappend proc break variable llength auto_execok return linsert error catch clock info split array if fconfigure concat join lreplace source fcopy global switch auto_qualify update close cd for auto_load file append lreverse format unload read package set binary namespace scan apply trace seek while chan flush after vwait dict continue uplevel foreach lset rename fileevent regexp lrepeat upvar encoding expr unset load regsub history interp exit puts incr lindex lsort tclLog string



---

- [百度百科: Tcl语言](http://baike.baidu.com/link?url=nUfYKa06zNZyT1eKhZyP9qHSFV66RsZqgYhbZZj0re7lE3j9vN0REEnhQpq9-c9TE4nKzcowAf5d3bCrsagUiq)
- [Tcl官方文档](http://www.tcl.tk/man/tcl8.5/tutorial/tcltutorial.html)
