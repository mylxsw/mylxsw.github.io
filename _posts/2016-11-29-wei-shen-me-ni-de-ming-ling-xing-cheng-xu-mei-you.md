---
ID: 132
post_title: >
  为什么你的命令行程序没有输出
author: mylxsw
post_excerpt: ""
layout: post
permalink: >
  https://aicode.cc/wei-shen-me-ni-de-ming-ling-xing-cheng-xu-mei-you.html
published: true
post_date: 2016-11-29 06:00:38
---

<ul>
<li>
<a href="#toc_0">问题描述</a>
</li>
<li>
<a href="#toc_1">原因</a>
</li>
<li>
<a href="#toc_2">解决方案</a>
<ul>
<li>
<a href="#toc_3">排除不需要的命令</a>
</li>
<li>
<a href="#toc_4">在C程序中禁用缓冲区</a>
</li>
<li>
<a href="#toc_5">unbuffer</a>
</li>
<li>
<a href="#toc_6">stdbuf</a>
</li>
</ul>
</li>
<li>
<a href="#toc_7">参考</a>
</li>
</ul>


<h2 id="toc_0">问题描述</h2>

<p>为什么你的程序没有输出？请看下面的命令</p>

<pre><code>tail -f logfile | grep &#39;foo bar&#39; | awk...
</code></pre>

<p>执行上述命令，你会发现你的程序没有产生任何输出，只有当logfile的内容足够多的时候才会产生输出，这是怎么回事呢？</p>

<h2 id="toc_1">原因</h2>

<p>在非交互模式下，大多数的UNIX命令行程序都会缓冲它们的输出，这就意味着程序会缓冲一定数量（通常是4kilobytes）的字符再进行输出，而不是直接输出它的每个字符。在上面这种情况下，<code>grep</code>命令会缓冲它的输出，因此后面的<code>awk</code>命令只会收到一大块的输入。</p>

<p>缓冲区的使用极大地提高了I/O操作的效率，通常情况下其缓冲操作对用户是不可见的，不会影响到用户。在交互式的控制台会话中执行<code>tail -f</code>命令是实时的，但是当命令行程序通过管道连接其它程序的时候，命令行程序可能就无法识别最终的输出是否需要（接近）实时了。幸运的是，在UNIX下有一些技术可以用于控制I/O的缓冲行为。</p>

<p>理解缓冲原理，最重要的是要明确的知道，是写入方（<em>writer</em>）使用的缓冲区，而不是读取方（<em>reader</em>）。</p>

<blockquote>
<p>什么是交互模式、非交互模式？</p>

<p>交互式模式就是在终端上执行，shell等待你的输入，并且立即执行你提交的命令。这种模式被称作交互式是因为shell与用户进行交互。这种模式也是大多数用户非常熟悉的：登录、执行一些命令、退出。当你退出后，shell也终止了。</p>

<p>shell也可以运行在另外一种模式：非交互式模式，以shell script(非交互)方式执行。在这种模式 下，shell不与你进行交互，而是读取存放在文件中的命令,并且执行它们。当它读到文件的结尾EOF，shell也就终止了。</p>

<p>参考<a href="http://blog.csdn.net/trochiluses/article/details/13767669">bash 深入理解：交互式shell和非交互式shell、登录shell和非登录shell的区别</a></p>
</blockquote>

<h2 id="toc_2">解决方案</h2>

<h3 id="toc_3">排除不需要的命令</h3>

<p>回到上面的问题，我们有一个命令行管道程序<code>tail -f logfile | grep &#39;foo bar&#39; | awk ...</code>。因为<code>tail -f</code>永远都不会缓冲它的输出，因此如果只是运行<code>tail -f logfile</code>的话我们的程序是没有问题的。当标准输出是控制台的时候，<code>grep</code>命令不会使用输出缓冲区，因此在交互模式下，我们运行<code>tail -f logfile | grep &#39;foo bar&#39;</code>也是没有问题的。现在的问题是如果<code>grep</code>命令的输出是通过管道连接到其它程序（例如上例中的awk命令）的话，它会启用输出缓冲区以提高效率。</p>

<p>下面的命令中去掉了<code>grep</code>命令，使用AWK去实现了筛选操作</p>

<pre><code>tail -f logfile | awk &#39;/foo bar/ ...&#39;
</code></pre>

<p>但是这样做依然是不够的，比如我们无法实现对结果进行排序。这种情况下怎么办呢，我们应该总是去寻找最简单的方法，或许你的命令行程序已经支持非缓冲的输出了呢！</p>

<table>
<thead>
<tr>
<th>grep (e.g. GNU version 2.5.1)</th>
<th>--line-buffered</th>
</tr>
</thead>

<tbody>
<tr>
<td>sed (e.g. GNU version 4.0.6)</td>
<td>-u,--unbuffered</td>
</tr>
<tr>
<td>awk (GNU awk, nawk)</td>
<td>use the fflush() function</td>
</tr>
<tr>
<td>awk (mawk)</td>
<td>-W interactive</td>
</tr>
<tr>
<td>tcpdump, tethereal</td>
<td>-l</td>
</tr>
</tbody>
</table>

<p>为了让我们的整个管道命令可以（近乎）实时的执行，我们需要告诉管道程序中的每个命令禁用输出缓冲区。管道的最后一个命令可以不需要禁用输出缓冲，因为它的输出是控制台。</p>

<h3 id="toc_4">在C程序中禁用缓冲区</h3>

<p>如果带缓冲的程序是使用C语言开发的，或者你拥有他的源码可以修改它，可以使用下面这个函数禁用缓冲</p>

<pre><code>setvbuf(stdout, 0, _IONBF, 0);
</code></pre>

<p>通常情况下只需要在main函数的顶部添加该函数即可。不过如果你的程序关闭并且重新打开了标准输出或者是调用了<code>setvbuf()</code>函数，你可能需要更加仔细一点。</p>

<h3 id="toc_5">unbuffer</h3>

<p>在 <a href="http://expect.sourceforge.net/">expect</a> 的程序包中包含了一个名为 <a href="http://expect.sourceforge.net/example/unbuffer.man.html">unbuffer</a> 的程序，它可以有效的欺骗其它程序，让它们以为自己总是在交互模式下执行（交互模式下会禁用缓冲）。</p>

<pre><code>tail -f logfile | unbuffer grep &#39;foo bar&#39; | awk ...
</code></pre>

<blockquote>
<p><code>unbuffer</code>和<code>unbuffer</code>不是标准的POSIX工具，不过不要担心，你的系统中可能已经安装过它们了。</p>
</blockquote>

<h3 id="toc_6">stdbuf</h3>

<p>新版的 <a href="http://www.gnu.org/software/coreutils/">GNU coreutils</a> （从7.5开始）新增了一个名为 <a href="http://www.gnu.org/software/coreutils/manual/coreutils.html#stdbuf-invocation">stdbuf</a> 的程序，使用它也可以用来取消程序的输出缓冲。</p>

<pre><code>tail -f logfile | stdbuf -oL grep &#39;foo bar&#39; | awk ...
</code></pre>

<p>上面的代码中，“<strong>-oL</strong>” 选项告诉程序使用行缓冲模式，也可以使用“<strong>-o0</strong>”完全禁止缓冲。</p>

<blockquote>
<p><code>stdbuf</code>也不是标准的POSIX工具，但是你的系统中可能也已经安装了。另外，在Mac系统下可能是没有这个命令的，你需要手动去安装 <code>brew install coreutils</code>，安装之后的该工具的名字叫做<code>gstdbuf</code>。</p>
</blockquote>

<h2 id="toc_7">参考</h2>

<p>本文大部分内容翻译自<a href="http://mywiki.wooledge.org/BashFAQ/009">What is buffering? Or, why does my command line produce no output: tail -f logfile | grep &#39;foo bar&#39; | awk ...</a>，内容有删减。</p>