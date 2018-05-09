---
ID: 225
post_title: Unix系统服务监控 Monit
author: mylxsw
post_excerpt: ""
layout: post
permalink: >
  https://aicode.cc/unix-xi-tong-fu-wu-jian-kong-monit.html
published: true
post_date: 2016-05-23 06:53:16
---
<ul>
<li>
<a href="#toc_0">常用操作</a>
<ul>
<li>
<a href="#toc_1">支持命令行的选项</a>
</li>
<li>
<a href="#toc_2">命令行参数</a>
</li>
</ul>
</li>
<li>
<a href="#toc_3">配置文件</a>
</li>
<li>
<a href="#toc_4">日志</a>
</li>
<li>
<a href="#toc_5">守护进程模式</a>
</li>
<li>
<a href="#toc_6">Init 支持</a>
</li>
<li>
<a href="#toc_7">包含文件</a>
</li>
</ul>


<p><strong>Monit</strong> 是Unix系统中用于管理和监控进程、程序、文件、目录和文件系统的工具。使用 Monit 可以检测进程是否正常运行，如果异常可以自动重启服务以及报警，当然，也可以使用 Monit 检查文件和目录是否发生修改，例如时间戳、校验和以及文件大小的改变。</p>

<h2 id="toc_0">常用操作</h2>

<p><strong>Monit</strong> 默认的配置文件是<code>~/.monitrc</code>，如果没有该文件，则使用<code>/etc/monitrc</code>文件。在启动 Monit 的时候，可以指定使用的配置文件:</p>

<pre><code>$ monit -c /var/monit/monitrc
</code></pre>

<p>在第一次启动 <strong>monit</strong> 的使用，可以使用如下命令测试配置文件（控制文件）是否正确</p>

<pre><code>$ monit -t
$ Control file syntax OK
</code></pre>

<p>如果配置文件没有问题的话，就可以使用<code>monit</code>命令启动 <strong>monit</strong> 了。</p>

<!--more-->

<pre><code>$ monit
</code></pre>

<blockquote>
<p>当启动 <strong>monit</strong> 的时候，可以使用命令行选项控制它的行为，命令行提供的选项优先于配置文件中的配置。</p>
</blockquote>

<h3 id="toc_1">支持命令行的选项</h3>

<p>下列是 <strong>monit</strong> 支持的选项</p>

<ul>
<li><strong>-c</strong> 指定要使用的配置文件</li>
<li><strong>-d n</strong> 每隔 n 秒以守护进程的方式运行 monit 一次，在配置文件中使用 [<code>set daemon</code>]进行配置</li>
<li><strong>-g name</strong> 设置用于<code>start</code>, <code>stop</code>, <code>restart</code>, <code>monitor</code>, <code>unmonitor</code>动作的组名</li>
<li><strong>-l logfile</strong> 指定日志文件，[<code>set logfile</code>]</li>
<li><strong>-p pidfile</strong> 在守护进程模式使用锁文件，配置文件中使用[<code>set pidfile</code>]指令</li>
<li><strong>-s statefile</strong> 将状态信息写入到该文件，[<code>set statefile</code>]</li>
<li><strong>-I</strong> 不要以后台模式运行（需要从 init 运行）</li>
<li><strong>-i</strong> 打印 monit 的唯一 ID</li>
<li><strong>-r</strong> 重置 monit 的唯一 ID</li>
<li><strong>-t</strong> 检查配置文件语法是否正确</li>
<li><strong>-v</strong> 详细模式，会输出针对信息</li>
<li><strong>-vv</strong> 非常详细的模式，会打印出现错误的堆栈信息</li>
<li><strong>-H [filename]</strong> 打印文件的 MD5 和 SHA1哈希值Print MD5 and SHA1，如果没有提供文件名，则为标准输入</li>
<li><strong>-V</strong> 打印版本号</li>
<li><strong>-h</strong> 打印帮助信息</li>
</ul>

<h3 id="toc_2">命令行参数</h3>

<p>当 <strong>Monit</strong> 以守护进程运行的时候，可以使用下列的参数连接它的守护进程（默认是 TCP 的127.0.0.1:2812）使其执行请求的操作。</p>

<ul>
<li><p><code>start all</code></p>

<p>启动配置文件中列出的所有的服务并且监控它们，如果使用<code>-g</code>选项提供了组选项，则只对该组有效。</p></li>
<li><p><code>start name</code></p>

<p>启动指定名称的服务并对其监控，服务名为配置文件中配置的服务条目名称。</p></li>
<li><p><code>stop all</code></p>

<p>与<code>start all</code>相对。</p></li>
<li><p><code>stop name</code></p>

<p>与<code>start name</code>相对。</p></li>
<li><p><code>restart all</code></p>

<p>重启所有的 service</p></li>
<li><p><code>restart name</code></p>

<p>重启指定 service</p></li>
<li><p><code>monitor all</code></p>

<p>允许对配置文件中所有的服务进行监控</p></li>
<li><p><code>monitor name</code></p>

<p>允许对指定的 service 监控</p></li>
<li><p><code>unmonitor all</code></p>

<p>与<code>monitor all</code> 相对</p></li>
<li><p><code>unmonitor name</code></p>

<p>与<code>monitor name</code>相对</p></li>
<li><p><code>status</code></p>

<p>打印每个服务的状态信息</p></li>
<li><p><code>reload</code></p>

<p>重新初始化Monitor守护进程，守护进程将会重载配置文件以及日志文件</p></li>
<li><p><code>quit</code></p>

<p>关闭所有<code>monitor</code>进程</p></li>
<li><p><code>validate</code></p>

<p>检查所有配置文件中的服务，当 Monitor 以守护进程运行的时候，这是默认的动作</p></li>
<li><p><code>procmatch regex</code></p>

<p>对符合指定模式的进程进行简单测试，该命令接受正则表达式作为参数，并且显示出符合该模式的所有进程。</p></li>
</ul>

<h2 id="toc_3">配置文件</h2>

<p><strong>Monit</strong> 的配置文件叫做<code>monitrc</code>文件。默认为<code>~/.monitrc</code>文件，如果该文件不存在，则尝试<code>/etc/monitrc</code>文件，然后是<code>@sysconfdir@/monitrc</code>，最后是<code>./monitrc</code>文件。</p>

<blockquote>
<p>这里所说的配置文件实际上就是控制文件（control file）</p>
</blockquote>

<p><strong>Monit</strong> 使用它自己的领域语言(DSL)进行配置，配置文件包含一系列的服务条目和全局配置项。</p>

<p>在语意上，配置文件包含以下三部分：</p>

<ul>
<li><p>全局 set 指令</p>

<p>该指令以<code>set</code>开始，后面跟着配置项</p></li>
<li><p>全局 include 指令</p>

<p>该指令以<code>include</code>开头，后面是glob字符串，指定了要包含的配置文件位置</p></li>
<li><p>一个或多个服务条目指令</p>

<p>每一个服务条目包含关键字<code>check</code>，后面跟着服务类型。每一条后面都需要跟着一个唯一的服务标识名称。monit 使用这个名称来引用服务以及与用户进行交互。</p></li>
</ul>

<p>当前支持九种类型的<code>check</code>语句：</p>

<ol>
<li><p><code>CHECK PROCESS &lt;unique name&gt; &lt;PIDFILE &lt;path&gt; | MATCHING &lt;regex&gt;&gt;</code></p>

<p>这里的<code>PIDFILE</code>是进程的 PID 文件的绝对路径，如果 PID 文件不存在，如果定义了进程的 start 方法的话，会调用该方法。</p>

<p><code>MATCHING</code>是可选的指定进程的方式，使用名称规则指定进程。</p></li>
<li><p><code>CHECK FILE &lt;unique name&gt; PATH &lt;path&gt;</code></p>

<p>检查文件是否存在，如果指定的文件不存在，则调用 start 方法。</p></li>
<li><p><code>CHECK FIFO &lt;unique name&gt; PATH &lt;path&gt;</code></p></li>
<li><p><code>CHECK FILESYSTEM &lt;unique name&gt; PATH &lt;path&gt;</code></p></li>
<li><p><code>CHECK DIRECTORY &lt;unique name&gt; PATH &lt;path&gt;</code></p></li>
<li><p><code>CHECK HOST &lt;unique name&gt; ADDRESS &lt;host address&gt;</code></p></li>
<li><p><code>CHECK SYSTEM &lt;unique name&gt;</code></p></li>
<li><p><code>CHECK PROGRAM &lt;unique name&gt; PATH &lt;executable file&gt; [TIMEOUT &lt;number&gt; SECONDS]</code></p></li>
<li><p><code>CHECK NETWORK &lt;unique name&gt; &lt;ADDRESS &lt;ipaddress&gt; | INTERFACE &lt;name&gt;&gt;</code></p></li>
</ol>

<h2 id="toc_4">日志</h2>

<p><strong>Monit</strong> 将会使用日志文件记录运行状态以及错误消息，在配置文件中使用<code>set logfile</code>指令指定日志配置。</p>

<p>如果希望使用自己的日志文件，使用下列指令:</p>

<pre><code>set logfile /var/log/monit.log
</code></pre>

<p>如果要使用系统的 syslog 记录日志，使用下列指令：</p>

<pre><code>set logfile syslog
</code></pre>

<p>如果不想开启日志功能，只需要注释掉该指令即可。</p>

<p>日志文件的格式为：</p>

<pre><code>[date] priority : message
</code></pre>

<p>例如:</p>

<pre><code>[CET Jan  5 18:49:29] info : &#39;mymachine&#39; Monit started
</code></pre>

<h2 id="toc_5">守护进程模式</h2>

<pre><code>set daemon n (n的单位是秒)
</code></pre>

<p>指定Monit在后台轮询检查进程运行状态的时间。你可以使用命令行参数<code>-d</code>选项指定这个时间，当然，建议在配置文件中进行设置。</p>

<p>Monit应该总是以后台的守护进程模式运行，如果你不指定该选项或者是命令行的<code>-d</code>选项，则只会在运行Monit的时候对它监控的文件或者进程检查一次然后退出。</p>

<h2 id="toc_6">Init 支持</h2>

<p>配置<code>set init</code>可以防止monit将自身转化为守护进程模式，它可以让前台进程运行。这需要从init运行monit，另一种方式是使用crontab定时任务运行，当然这样的话你需要在运行前使用<code>monit -t</code>检查一下控制文件是否存在语法错误。</p>

<p>要配置monit从init运行，可以在monit的配置文件中使用<code>set init</code>指令或者命令行中使用<code>-I</code>选项，以下是需要在<code>/etc/inittab</code>文件中增加的配置。</p>

<pre><code># Run Monit in standard run-levels
mo:2345:respawn:/usr/local/bin/monit -Ic /etc/monitrc
</code></pre>

<blockquote>
<p>inittab文件格式: <code>id:runlevels:action:process</code><br/>
该行配置是为Monit指定了id为mo，运行级别2-5有效，<code>respawn</code>指明了无论进程是否已经运行，都对进程restart</p>
</blockquote>

<p>在修改完init配置文件后，可以使用如下命令测试<code>/etc/inittab</code>文件并运行Monit:</p>

<pre><code>telinit q
</code></pre>

<blockquote>
<p><code>telinit q</code> 用于重载守护进程的配置，等价于<code>systemctl daemon-reload</code></p>
</blockquote>

<p>对于没有<code>telinit</code>的系统，执行如下命令:</p>

<pre><code>kill -1 1
</code></pre>

<p>如果Monit已经系统启动的时候运行对服务进行监控，在某些情况下，可能会出现竞争。也就是说如果一个服务启动的比较慢，Monit会假设该服务没有运行并且可能会尝试启动该服务和报警，但是事实上该服务正在启动中或者已经在启动队列里了。</p>

<h2 id="toc_7">包含文件</h2>

<pre><code>include globstring
</code></pre>

<p>例如<code>include /etc/monit.d/*.cfg</code>会将<code>/etc/monit.d/</code>目录下所有的<code>.cfg</code>文件包含到配置文件中。</p>

<hr/>

<p>原文: <a href="https://mmonit.com/monit/documentation/">monit官方文档 Version 5.12.2</a></p>