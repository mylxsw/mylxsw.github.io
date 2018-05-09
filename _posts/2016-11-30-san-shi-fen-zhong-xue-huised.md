---
ID: 127
post_title: 三十分钟学会SED
author: mylxsw
post_excerpt: ""
layout: post
permalink: >
  https://aicode.cc/san-shi-fen-zhong-xue-huised.html
published: true
post_date: 2016-11-30 23:05:43
---

<p>本文承接之前写的<a href="https://aicode.cc/san-shi-fen-zhong-xue-huiawk.html">三十分钟学会AWK</a>一文，在学习完AWK之后，趁热打铁又学习了一下SED，不得不说这两个工具真的堪称文本处理神器，谁用谁知道！本文大部分内容依旧是翻译自Tutorialspoint上的入门教程，这次是 <a href="http://www.tutorialspoint.com/sed/index.htm">Sed Tutorial</a> 一文，内容做了一些删减和补充，增加了一些原文中没有提及到的语法和命令的讲解，并且对原文所有的示例都一一进行了验证，希望本文对大家学习和了解Sed有所帮助。</p>

<!--more-->

<blockquote>
<p>文中用到的测试文件可以在 <a href="https://github.com/mylxsw/sed-demo">https://github.com/mylxsw/sed-demo</a>找到。</p>
</blockquote>

<p>本文将会持续修正和更新，最新内容请参考我的 <a href="https://github.com/mylxsw">GITHUB</a> 上的 <a href="https://github.com/mylxsw/growing-up">程序猿成长计划</a> 项目，欢迎 Star。</p>

<ul>
<li>
<a href="#toc_0">概述</a>
<ul>
<li>
<a href="#toc_1">SED的典型用途</a>
</li>
</ul>
</li>
<li>
<a href="#toc_2">工作流</a>
<ul>
<li>
<a href="#toc_3">需要注意的几点</a>
</li>
<li>
<a href="#toc_4">示例</a>
</li>
</ul>
</li>
<li>
<a href="#toc_5">基础语法</a>
<ul>
<li>
<a href="#toc_6">标准选项</a>
</li>
<li>
<a href="#toc_7">GNU选项</a>
</li>
</ul>
</li>
<li>
<a href="#toc_8">循环</a>
</li>
<li>
<a href="#toc_9">分支</a>
</li>
<li>
<a href="#toc_10">模式空间和保持空间</a>
<ul>
<li>
<a href="#toc_11">模式空间</a>
</li>
<li>
<a href="#toc_12">行寻址</a>
<ul>
<li>
<a href="#toc_13">数字方式的行寻址</a>
</li>
<li>
<a href="#toc_14">使用文本模式过滤器</a>
</li>
</ul>
</li>
<li>
<a href="#toc_15">保持空间</a>
</li>
</ul>
</li>
<li>
<a href="#toc_16">基本命令</a>
<ul>
<li>
<a href="#toc_17">删除命令  <strong>d</strong></a>
</li>
<li>
<a href="#toc_18">文件写入命令 <strong>w</strong></a>
</li>
<li>
<a href="#toc_19">追加命令 <strong>a</strong></a>
</li>
<li>
<a href="#toc_20">行替换命令 <strong>c</strong></a>
</li>
<li>
<a href="#toc_21">插入命令 <strong>i</strong></a>
</li>
<li>
<a href="#toc_22">转换命令 <strong>y</strong></a>
</li>
<li>
<a href="#toc_23">输出隐藏字符命令 <strong>l</strong></a>
</li>
<li>
<a href="#toc_24">退出命令 <strong>q</strong></a>
</li>
<li>
<a href="#toc_25">文件读取命令 <strong>r</strong></a>
</li>
<li>
<a href="#toc_26">执行外部命令 <strong>e</strong></a>
</li>
<li>
<a href="#toc_27">排除命令 <strong>!</strong></a>
</li>
<li>
<a href="#toc_28">多行命令</a>
<ul>
<li>
<a href="#toc_29">N - 加载下一行</a>
</li>
<li>
<a href="#toc_30">D - 删除多行中的一行</a>
</li>
<li>
<a href="#toc_31">P - 输出多行中的一行</a>
</li>
</ul>
</li>
<li>
<a href="#toc_32">其它命令</a>
<ul>
<li>
<a href="#toc_33">n - 单行next</a>
</li>
<li>
<a href="#toc_34">v - SED版本检查</a>
</li>
</ul>
</li>
</ul>
</li>
<li>
<a href="#toc_35">特殊字符</a>
<ul>
<li>
<a href="#toc_36"><code>=</code>命令</a>
</li>
<li>
<a href="#toc_37"><code>&amp;</code>命令</a>
</li>
</ul>
</li>
<li>
<a href="#toc_38">字符串</a>
<ul>
<li>
<a href="#toc_39">替换命令 <strong>s</strong></a>
</li>
<li>
<a href="#toc_40">匹配子字符串</a>
</li>
</ul>
</li>
<li>
<a href="#toc_41">管理模式</a>
</li>
<li>
<a href="#toc_42">正则表达式</a>
<ul>
<li>
<a href="#toc_43">标准正则表达式</a>
<ul>
<li>
<a href="#toc_44"><strong>^</strong></a>
</li>
<li>
<a href="#toc_45"><strong>$</strong></a>
</li>
<li>
<a href="#toc_46"><strong>.</strong></a>
</li>
<li>
<a href="#toc_47"><strong>[]</strong></a>
</li>
<li>
<a href="#toc_48"><strong>[^]</strong></a>
</li>
<li>
<a href="#toc_49"><strong>[-]</strong></a>
</li>
<li>
<a href="#toc_50"><strong>?</strong> ，<strong>+</strong> ，*</a>
</li>
<li>
<a href="#toc_51"><strong>{n}</strong> ，<strong>{n,}</strong> ，<strong>{m, n}</strong></a>
</li>
<li>
<a href="#toc_52"><strong>|</strong></a>
</li>
</ul>
</li>
<li>
<a href="#toc_53">POSIX兼容的正则</a>
</li>
<li>
<a href="#toc_54">元字符</a>
<ul>
<li>
<a href="#toc_55"><strong>s</strong></a>
</li>
<li>
<a href="#toc_56"><strong>S</strong></a>
</li>
<li>
<a href="#toc_57"><strong>w</strong> ， <strong>W</strong></a>
</li>
</ul>
</li>
</ul>
</li>
<li>
<a href="#toc_58">常用代码段</a>
<ul>
<li>
<a href="#toc_59">Cat命令</a>
</li>
<li>
<a href="#toc_60">移除空行</a>
</li>
<li>
<a href="#toc_61">删除连续空行</a>
</li>
<li>
<a href="#toc_62">删除开头的空行</a>
</li>
<li>
<a href="#toc_63">删除结尾的空行</a>
</li>
<li>
<a href="#toc_64">过滤所有的html标签</a>
</li>
<li>
<a href="#toc_65">从C++程序中移除注释</a>
</li>
<li>
<a href="#toc_66">为某些行添加注释</a>
</li>
<li>
<a href="#toc_67">实现<strong>Wc -l</strong>命令</a>
</li>
<li>
<a href="#toc_68">模拟实现<code>head</code>命令</a>
</li>
<li>
<a href="#toc_69">模拟<code>tail -1</code>命令</a>
</li>
<li>
<a href="#toc_70">模拟<code>Dos2unix</code>命令</a>
</li>
<li>
<a href="#toc_71">模拟<code>Unix2dos</code>命令</a>
</li>
<li>
<a href="#toc_72">模拟<code>cat -E</code>命令</a>
</li>
<li>
<a href="#toc_73">模拟<code>cat -ET</code>命令</a>
</li>
<li>
<a href="#toc_74">模拟<code>nl</code>命令</a>
</li>
<li>
<a href="#toc_75">模拟<code>cp</code>命令</a>
</li>
<li>
<a href="#toc_76">模拟<code>expand</code>命令</a>
</li>
<li>
<a href="#toc_77">模拟<code>tee</code>命令</a>
</li>
<li>
<a href="#toc_78">模拟<code>cat -s</code>命令</a>
</li>
<li>
<a href="#toc_79">模拟<code>grep</code>命令</a>
</li>
<li>
<a href="#toc_80">模拟<code>grep -v</code>命令</a>
</li>
<li>
<a href="#toc_81">模拟<code>tr</code>命令</a>
</li>
</ul>
</li>
<li>
<a href="#toc_82">写在最后</a>
</li>
<li>
<a href="#toc_83">参考</a>
</li>
</ul>


<h2 id="toc_0">概述</h2>

<p>SED的英文全称是 <strong>Stream EDitor</strong>，它是一个简单而强大的文本解析转换工具，在1973-1974年期间由贝尔实验室的<em>Lee E. McMahon</em>开发，今天，它已经运行在所有的主流操作系统上了。</p>

<p><em>McMahon</em>创建了一个通用的行编辑器，最终变成为了SED。SED的很多语法和特性都借鉴了<strong>ed</strong>编辑器。设计之初，它就已经支持正则表达式，SED可以从文件中接受类似于管道的输入，也可以接受来自标准输入流的输入。</p>

<p>SED由自由软件基金组织（FSF）开发和维护并且随着GNU/Linux进行分发，因此，通常它也称作 <strong>GNU SED</strong>。对于新手来说，SED的语法看起来可能有些神秘，但是，一旦掌握了它的语法，你就可以只用几行代码去解决非常复杂的任务，这就是SED的魅力所在。</p>

<h3 id="toc_1">SED的典型用途</h3>

<p>SED的用途非常广泛，例如：</p>

<ul>
<li>文本替换</li>
<li>选择性的输出文本文件</li>
<li>从文本文件的某处开始编辑</li>
<li>无交互式的对文本文件进行编辑等</li>
</ul>

<h2 id="toc_2">工作流</h2>

<p>在本章中，我们将会探索SED是如何工作的，要想成为一个SED专家，你需要知道它的内部实现。SED遵循简单的工作流：<strong>读取</strong>，<strong>执行</strong>和<strong>显示</strong>，下图描述了该工作流：</p>

<p><img src="https://oayrssjpa.qnssl.com/2016-10-31-14614770425007.jpg" alt=""/></p>

<ul>
<li><strong>读取</strong>： SED从输入流（文件，管道或者标准输入）中读取一行并且存储到它叫做 模式空间（<strong>pattern buffer</strong>） 的内部缓冲区</li>
<li><strong>执行</strong>： 默认情况下，所有的SED命令都在<strong>模式空间</strong>中顺序的执行，除非指定了行的地址，否则SED命令将会在所有的行上依次执行</li>
<li><strong>显示</strong>： 发送修改后的内容到输出流。在发送数据之后，<strong>模式空间</strong>将会被清空。</li>
<li>在文件所有的内容都被处理完成之前，上述过程将会重复执行</li>
</ul>

<h3 id="toc_3">需要注意的几点</h3>

<ul>
<li>模式空间 （<strong>pattern buffer</strong>） 是一块活跃的缓冲区，在sed编辑器执行命令时它会保存待检查的文本</li>
<li>默认情况下，所有的SED命令都是在模式空间中执行，因此输入文件并不会发生改变</li>
<li>还有另外一个缓冲区叫做 保持空间 （<strong>hold buffer</strong>），在处理模式空间中的某些行时，可以用保持空间来临时保存一些行。在每一个循环结束的时候，SED将会移除模式空间中的内容，但是该缓冲区中的内容在所有的循环过程中是持久存储的。SED命令无法直接在该缓冲区中执行，因此SED允许数据在 <strong>保持空间</strong> 和 <strong>模式空间</strong>之间切换</li>
<li>初始情况下，<strong>保持空间</strong> 和 <strong>模式空间</strong> 这两个缓冲区都是空的</li>
<li>如果没有提供输入文件的话，SED将会从标准输入接收请求</li>
<li>如果没有提供地址范围的话，默认情况下SED将会对所有的行进行操作</li>
</ul>

<h3 id="toc_4">示例</h3>

<p>让我们创建一个名为 <strong>quote.txt</strong> 的文本文件，文件内容为著名作家<em>Paulo Coelho</em>的一段名言</p>

<pre><code>$ vi quote.txt 
There is only one thing that makes a dream impossible to achieve: the fear of failure. 
 - Paulo Coelho, The Alchemist
</code></pre>

<p>为了理解SED的工作流，我们首先使用SED显示出quote.txt文件的内容，该示例与<code>cat</code>命令类似</p>

<pre><code>$ sed &#39;&#39; quote.txt
There is only one thing that makes a dream impossible to achieve: the fear of failure.
- Paulo Coelho, The Alchemist
</code></pre>

<p>在上面的例子中，quote.txt是输入的文件名称，两个单引号是要执行的SED命令。</p>

<p>首先，SED将会读取quote.txt文件中的一行内容存储到它的模式空间中，然后会在该缓冲区中执行SED命令。在这里，没有提供SED命令，因此对该缓冲区没有要执行的操作，最后它会删除模式空间中的内容并且打印该内容到标准输出，很简单的过程，对吧?</p>

<p>在下面的例子中，SED会从标准输入流接受输入</p>

<pre><code>$ sed &#39;&#39; 
</code></pre>

<p>当上述命令被执行的时候，将会产生下列结果</p>

<pre><code>There is only one thing that makes a dream impossible to achieve: the fear of failure. 
There is only one thing that makes a dream impossible to achieve: the fear of failure.
</code></pre>

<p>在这里，第一行内容是通过键盘输入的内容，第二行是SED输出的内容。</p>

<blockquote>
<p>从SED会话中退出，使用组合键<code>ctrl-D (^D)</code></p>
</blockquote>

<h2 id="toc_5">基础语法</h2>

<p>本章中将会介绍SED中的基本命令和它的命令行使用方法。SED可以用下列两种方式调用：</p>

<pre><code>sed [-n] [-e] &#39;command(s)&#39; files 
sed [-n] -f scriptfile files
</code></pre>

<p>第一种方式在命令行中使用单引号指定要执行的命令，第二种方式则指定了包含SED命令的脚本文件。当然，这两种方法也可以同时使用，SED提供了很多参数用于控制这种行为。</p>

<p>让我们看看如何指定多个SED命令。SED提供了<code>delete</code>命令用于删除某些行，这里让我们删除第一行，第二行和第五行：</p>

<p>首先，使用<code>cat</code>命令显示文件内容</p>

<pre><code>$ cat books.txt 
1) A Storm of Swords, George R. R. Martin, 1216 
2) The Two Towers, J. R. R. Tolkien, 352 
3) The Alchemist, Paulo Coelho, 197 
4) The Fellowship of the Ring, J. R. R. Tolkien, 432 
5) The Pilgrimage, Paulo Coelho, 288 
6) A Game of Thrones, George R. R. Martin, 864
</code></pre>

<p>现在，使用SED移除指定的行，为了删除三行，我们使用<code>-e</code>选项指定三个独立的命令</p>

<pre><code>$ sed -e &#39;1d&#39; -e &#39;2d&#39; -e &#39;5d&#39; books.txt
3) The Alchemist, Paulo Coelho, 197
4) The Fellowship of the Ring, J. R. R. Tolkien, 432
6) A Game of Thrones, George R. R. Martin, 864
</code></pre>

<p>我们还可以将多个SED命令写在一个文本文件中，然后将该文件作为SED命令的参数，SED可以对模式空间中的内容执行文件中的每一个命令，下面的例子描述了SED的第二种用法</p>

<p>首先，创建一个包含SED命令的文本文件，为了便于理解，我们使用与之前相同的SED命令</p>

<pre><code>$ echo -e &quot;1d\n2d\n5d&quot; &gt; commands.txt 
$ cat commands.txt
1d 
2d 
5d 
</code></pre>

<p>接下来构造一个SED命令去执行该操作</p>

<pre><code>$ sed -f commands.txt books.txt
3) The Alchemist, Paulo Coelho, 197
4) The Fellowship of the Ring, J. R. R. Tolkien, 432
6) A Game of Thrones, George R. R. Martin, 864 
</code></pre>

<h3 id="toc_6">标准选项</h3>

<p>SED支持下列标准选项：</p>

<ul>
<li><p><strong>-n</strong> 默认情况下，模式空间中的内容在处理完成后将会打印到标准输出，该选项用于阻止该行为</p>

<pre><code>$ sed -n &#39;&#39; quote.txt 
</code></pre></li>
<li><p><strong>-e</strong> 指定要执行的命令，使用该参数，我们可以指定多个命令，让我们打印每一行两次：</p>

<pre><code>$ sed -e &#39;&#39; -e &#39;p&#39; quote.txt
There is only one thing that makes a dream impossible to achieve: the fear of failure.
There is only one thing that makes a dream impossible to achieve: the fear of failure.
 - Paulo Coelho, The Alchemist
 - Paulo Coelho, The Alchemist
</code></pre></li>
<li><p><strong>-f</strong> 指定包含要执行的命令的脚本文件</p>

<pre><code>$ echo &quot;p&quot; &gt; commands
$
$ sed -n -f commands quote.txt
There is only one thing that makes a dream impossible to achieve: the fear of failure.
 - Paulo Coelho, The Alchemist
</code></pre></li>
</ul>

<h3 id="toc_7">GNU选项</h3>

<p>这些选项是GNU规范定义的，可能对于某些版本的SED并不支持。</p>

<ul>
<li><strong>-n</strong>， <strong>--quiet</strong>, <strong>--slient</strong>：与标准的-n选项相同</li>
<li><strong>-e script</strong>，<strong>--expression=script</strong>：与标准的-e选项相同</li>
<li><strong>-f script-file</strong>， <strong>--file=script-file</strong>：与标准的-f选项相同</li>
<li><strong>--follow-symlinks</strong>：如果提供该选项的话，在编辑的文件是符号链接时，SED将会跟随链接</li>
<li><strong>-i[SUFFIX]</strong>，<strong>--in-place[=SUFFIX]</strong>：该选项用于对当前文件进行编辑，如果提供了SUFFIX的话，将会备份原始文件，否则将会覆盖原始文件</li>
<li><strong>-l N</strong>， <strong>--line-lenght=N</strong>：该选项用于设置行的长度为N个字符</li>
<li><strong>--posix</strong>：该选项禁用所有的GNU扩展</li>
<li><strong>-r</strong>，<strong>--regexp-extended</strong>：该选项将启用扩展的正则表达式</li>
<li><strong>-u</strong>， <strong>--unbuffered</strong>：指定该选项的时候，SED将会从输入文件中加载最少的数据，并且更加频繁的刷出到输出缓冲区。在编辑<code>tail -f</code>命令的输出，你不希望等待输出的时候该选项是非常有用的。</li>
<li><strong>-z</strong>，<strong>--null-data</strong>：默认情况下，SED对每一行使用换行符分割，如果提供了该选项的话，它将使用NULL字符分割行</li>
</ul>

<h2 id="toc_8">循环</h2>

<p>与其它编程语言类似，SED提供了用于控制执行流的循环和分支语句。</p>

<p>SED中的循环有点类似于<strong>goto</strong>语句，SED可以根据标签（label）跳转到某一行继续执行，在SED中，我们可以定义如下的标签：</p>

<pre><code>:label 
:start 
:end 
:up
</code></pre>

<p>在上面的示例中，我们创建了四个标签。</p>

<p>要跳转到指定的标签，使用 <strong>b</strong> 命令后面跟着标签名，如果忽略标签名的话，SED将会跳转到SED文件的结尾。</p>

<blockquote>
<p><strong>b</strong>标签用于无条件的跳转到指定的label。</p>
</blockquote>

<p>为了更好地理解SED中的循环和分支，让我们创建一个名为books2.txt的文本文件，其中包含一些图书的标题和作者信息，下面的示例中会合并图书的标题和作者，使用逗号分隔。之后搜索所有匹配“Paulo”的行，如果匹配的话就在这一行的开头添加<code>-</code>，否则跳转到<code>Print</code>标签，打印出该行内容。</p>

<pre><code>$ cat books2.txt
A Storm of Swords
George R. R. Martin
The Two Towers
J. R. R. Tolkien
The Alchemist
Paulo Coelho
The Fellowship of the Ring
J. R. R. Tolkien
The Pilgrimage
Paulo Coelho
A Game of Thrones
George R. R. Martin

$ sed -n &#39;
h;n;H;x
s/\n/, /
/Paulo/!b Print
s/^/- /
:Print
p&#39; books2.txt
A Storm of Swords , George R. R. Martin
The Two Towers , J. R. R. Tolkien
- The Alchemist , Paulo Coelho
The Fellowship of the Ring , J. R. R. Tolkien
- The Pilgrimage , Paulo Coelho
A Game of Thrones , George R. R. Martin
</code></pre>

<p>乍看来上述的代码非常神秘，让我们逐步拆解一下</p>

<ul>
<li>第一行是<code>h;n;H;x</code>这几个命令，记得上面我们提到的 <strong>保持空间</strong> 吗？第一个<code>h</code>是指将当前模式空间中的内容覆盖到 <strong>保持空间</strong>中，<code>n</code>用于提前读取下一行，并且覆盖当前模式空间中的这一行，<code>H</code>将当前模式空间中的内容追加到 <strong>保持空间</strong> 中，最后的<code>x</code>用于交换模式空间和<strong>保持空间</strong>中的内容。因此这里就是指每次读取两行放到模式空间中交给下面的命令进行处理</li>
<li>接下来是 <strong>s/\n/, /</strong> 用于将上面的两行内容中的换行符替换为逗号</li>
<li>第三个命令在不匹配的时候跳转到<strong>Print</strong>标签，否则继续执行第四个命令</li>
<li><strong>:Print</strong>仅仅是一个标签名，而<code>p</code>则是print命令</li>
</ul>

<p>为了提高可读性，每一个命令都占了一行，当然，你也可以把所有命令放在一行</p>

<pre><code>$ sed -n &#39;h;n;H;x;s/\n/, /;/Paulo/!b Print; s/^/- /; :Print;p&#39; books2.txt 
</code></pre>

<blockquote>
<p>关于<code>h</code>，<code>H</code>，<code>x</code>命令参考官方手册 <a href="https://www.gnu.org/software/sed/manual/sed.html#index-Copy-hold-space-into-pattern-space-168">sed, a stream editor</a> <em>3.6 Less Frequently-Used Commands</em>节</p>
</blockquote>

<h2 id="toc_9">分支</h2>

<p>使用 <strong>t</strong> 命令创建分支。只有当前置条件成功的时候，<strong>t</strong> 命令才会跳转到该标签。</p>

<blockquote>
<p><strong>t</strong>命令只有在前一个替换（s）命令执行成功的时候才会执行。</p>
</blockquote>

<p>让我们看一些前面章节中的例子，与之前不同的是，这次我们将打印四个连字符&quot;-&quot;，而之前是一个。</p>

<pre><code>$ sed -n &#39;
h;n;H;x
s/\n/, /
:Loop
/Paulo/s/^/-/
/----/!t Loop
p&#39; books2.txt
A Storm of Swords , George R. R. Martin
The Two Towers , J. R. R. Tolkien
----The Alchemist , Paulo Coelho
The Fellowship of the Ring , J. R. R. Tolkien
----The Pilgrimage , Paulo Coelho
A Game of Thrones , George R. R. Martin
</code></pre>

<p>在上面的例子中，前面两行与上一节中讲的作用一致，第三行定义了一个<em>Loop</em>标签，接下来匹配存在“Paulo”的行，如果存在则在最前面添加一个<em>-</em>，接下来是我们这里的重点：</p>

<p><code>/----/!t Loop</code>这一行首先检查上面添加<code>-</code>之后是否满足四个<code>-</code>，如果不满足则跳转到Loop继续执行第三行，这样不停的追加<code>-</code>，最后如果改行满足前面有四个<code>-</code>才继续往下执行。 </p>

<p>为了提高可读性，我们将每一个SED命令独立一行，我们也可以在同一行中使用：</p>

<pre><code> sed -n &#39;h;n;H;x; s/\n/, /; :Loop;/Paulo/s/^/-/; /----/!t Loop; p&#39; books.txt 
</code></pre>

<h2 id="toc_10">模式空间和保持空间</h2>

<h3 id="toc_11">模式空间</h3>

<p>对任何文件的来说，最基本的操作就是输出它的内容，为了实现该目的，在SED中可以使用<strong>print</strong>命令打印出模式空间中的内容。</p>

<p>首先创建一个包含行号，书名，作者和页码数的文件，在本文中我们将会使用该文件，你也可以创建任何其它的文件，但是这里我们就创建一个包含以下内容的文件</p>

<pre><code>$ vi books.txt 
1) A Storm of Swords, George R. R. Martin, 1216 
2) The Two Towers, J. R. R. Tolkien, 352 
3) The Alchemist, Paulo Coelho, 197 
4) The Fellowship of the Ring, J. R. R. Tolkien, 432 
5) The Pilgrimage, Paulo Coelho,288 
6) A Game of Thrones, George R. R. Martin, 864
</code></pre>

<p>执行<code>p</code>命令</p>

<pre><code>$ sed &#39;p&#39; books.txt
1) A Storm of Swords, George R. R. Martin, 1216 
1) A Storm of Swords, George R. R. Martin, 1216 
2) The Two Towers, J. R. R. Tolkien, 352 
2) The Two Towers, J. R. R. Tolkien, 352 
3) The Alchemist, Paulo Coelho, 197 
3) The Alchemist, Paulo Coelho, 197 
4) The Fellowship of the Ring, J. R. R. Tolkien, 432 
4) The Fellowship of the Ring, J. R. R. Tolkien, 432 
5) The Pilgrimage, Paulo Coelho, 288 
5) The Pilgrimage, Paulo Coelho, 288 
6) A Game of Thrones, George R. R. Martin, 864 
6) A Game of Thrones, George R. R. Martin, 864
</code></pre>

<p>你可能会疑惑，为什么每一行被显示了两次？</p>

<p>你还记得SED的工作流吗？默认情况下，SED将会输出模式空间中的内容，另外，我们的命令中包含了输出命令<code>p</code>，因此每一行被打印两次。但是不要担心，SED提供了<strong>-n</strong>参数用于禁止自动输出模式空间的每一行的行为</p>

<pre><code>$ sed -n &#39;p&#39; books.txt 
1) A Storm of Swords, George R. R. Martin, 1216 
2) The Two Towers, J. R. R. Tolkien, 352 
3) The Alchemist, Paulo Coelho, 197 
4) The Fellowship of the Ring, J. R. R. Tolkien, 432 
5) The Pilgrimage, Paulo Coelho, 288 
6) A Game of Thrones, George R. R. Martin, 864 
</code></pre>

<h3 id="toc_12">行寻址</h3>

<p>默认情况下，在SED中使用的命令会作用于文本数据的所有行。如果只想将命令作用于特定的行或者某些行，则需要使用 <strong>行寻址</strong> 功能。</p>

<p>在SED中包含两种形式的行寻址：</p>

<ul>
<li>以数字形式表示的行区间</li>
<li>以文本模式来过滤行</li>
</ul>

<p>两种形式都使用相同的语法格式</p>

<pre><code>[address]command
</code></pre>

<h4 id="toc_13">数字方式的行寻址</h4>

<p>在下面的示例中SED只会对第3行进行操作</p>

<pre><code>$ sed -n &#39;3p&#39; books.txt 
3) The Alchemist, Paulo Coelho, 197 
</code></pre>

<p>当然，我们还可以让SED输出某些行。在SED中使用逗号<strong>,</strong>分隔输出行号的范围，例如下面的代码会输出出2-5行的内容</p>

<pre><code>$ sed -n &#39;2,5 p&#39; books.txt 
2) The Two Towers, J. R. R. Tolkien, 352 
3) The Alchemist, Paulo Coelho, 197 
4) The Fellowship of the Ring, J. R. R. Tolkien, 432 
5) The Pilgrimage, Paulo Coelho, 288
</code></pre>

<p>特殊字符 <strong>$</strong> 代表了文件的最后一行，输出文件的最后一行</p>

<pre><code>$ sed -n &#39;$ p&#39; books.txt 
6) A Game of Thrones, George R. R. Martin, 864 
</code></pre>

<p>也可以使用 <strong>$</strong> 指定输出的地址范围，下列命令输出第三行到最后一行</p>

<pre><code>$ sed -n &#39;3,$ p&#39; books.txt
3) The Alchemist, Paulo Coelho, 197
4) The Fellowship of the Ring, J. R. R. Tolkien, 432
5) The Pilgrimage, Paulo Coelho,288
6) A Game of Thrones, George R. R. Martin, 864
</code></pre>

<p>SED还提供了另外两种操作符用于指定地址范围，第一个是加号（<strong>+</strong>）操作符，它可以与逗号（<strong>,</strong>）操作符一起使用，例如 <code>M, +n</code> 将会打印出从第<code>M</code>行开始的下<code>n</code>行。下面的示例将会输出第二行开始的下面四行</p>

<pre><code>$ sed -n &#39;2,+4 p&#39; books.txt 
2) The Two Towers, J. R. R. Tolkien, 352 
3) The Alchemist, Paulo Coelho, 197 
4) The Fellowship of the Ring, J. R. R. Tolkien, 432 
5) The Pilgrimage, Paulo Coelho, 288 
6) A Game of Thrones, George R. R. Martin, 864 
</code></pre>

<p>我们还可以使用波浪线操作符（<strong>~</strong>）指定地址范围，它使用<code>M~N</code>的形式，它告诉SED应该处理<code>M</code>行开始的每<code>N</code>行。例如，<code>50~5</code>匹配行号50，55，60，65等，让我们只输出文件中的奇数行</p>

<pre><code>$ sed -n &#39;1~2 p&#39; books.txt 
1) A Storm of Swords, George R. R. Martin, 1216 
3) The Alchemist, Paulo Coelho, 197 
5) The Pilgrimage, Paulo Coelho, 288
</code></pre>

<p>下面的代码则是只输出文件中的偶数行</p>

<pre><code>$ sed -n &#39;2~2 p&#39; books.txt 
2) The Two Towers, J. R. R. Tolkien, 352 
4) The Fellowship of the Ring, J. R. R. Tolkien, 432 
6) A Game of Thrones, George R. R. Martin, 864 
</code></pre>

<blockquote>
<p>注意，如果使用的是Mac系统自带的sed命令，可能不支持<strong>~</strong>和<strong>+</strong>操作符。可以使用<code>brew install gnu-sed --with-default-names</code>重新安装GNU-SED。</p>
</blockquote>

<h4 id="toc_14">使用文本模式过滤器</h4>

<p>SED编辑器允许指定文本模式来过滤出命令要作用的行。格式如下：</p>

<pre><code>/pattern/command
</code></pre>

<p>必须用正斜线将要指定的pattern封起来。sed编辑器会将该命令作用到包含指定文本模式的行上。</p>

<p>下面的示例中，将会输出所有作者为Paulo Coelho的书籍。</p>

<pre><code>$ sed -n &#39;/Paulo/ p&#39; books.txt
3) The Alchemist, Paulo Coelho, 197 
5) The Pilgrimage, Paulo Coelho, 288
</code></pre>

<p>模式匹配也可以与数字形式的寻址同时使用，在下面的示例会从第一次匹配到<code>Alchemist</code>开始输出，直到第5行为止。</p>

<pre><code>$ sed -n &#39;/Alchemist/, 5 p&#39; books.txt
3) The Alchemist, Paulo Coelho, 197 
4) The Fellowship of the Ring, J. R. R. Tolkien, 432 
5) The Pilgrimage, Paulo Coelho, 288
</code></pre>

<p>使用逗号（<strong>,</strong>）操作符指定匹配多个匹配的模式。下列的示例将会输出Two和Pilgrimage之间的所有行</p>

<pre><code>$ sed -n &#39;/Two/, /Pilgrimage/ p&#39; books.txt 
2) The Two Towers, J. R. R. Tolkien, 352 
3) The Alchemist, Paulo Coelho, 197 
4) The Fellowship of the Ring, J. R. R. Tolkien, 432 
5) The Pilgrimage, Paulo Coelho, 288
</code></pre>

<p>在使用文本模式过滤器的时候，与数字方式的行寻址类似，可以使用加号操作符 <strong>+</strong>，它会输出从当前匹配位置开始的某几行，下面的示例会从第一次Two出现的位置开始输出接下来的4行</p>

<pre><code>$ sed -n &#39;/Two/, +4 p&#39; books.txt
2) The Two Towers, J. R. R. Tolkien, 352 
3) The Alchemist, Paulo Coelho, 197 
4) The Fellowship of the Ring, J. R. R. Tolkien, 432 
5) The Pilgrimage, Paulo Coelho, 288 
6) A Game of Thrones, George R. R. Martin, 864 
</code></pre>

<h3 id="toc_15">保持空间</h3>

<p>在处理模式空间中的某些行时，可以用保持空间来临时保存一些行。有5条命令可用来操作保持空间</p>

<table>
<thead>
<tr>
<th>命令</th>
<th>描述</th>
</tr>
</thead>

<tbody>
<tr>
<td>h</td>
<td>将模式空间复制到保持空间</td>
</tr>
<tr>
<td>H</td>
<td>将模式空间附加到保持空间</td>
</tr>
<tr>
<td>g</td>
<td>将保持空间复制到模式空间</td>
</tr>
<tr>
<td>G</td>
<td>将保持空间附加到模式空间</td>
</tr>
<tr>
<td>x</td>
<td>交换模式空间和保持空间的内容</td>
</tr>
</tbody>
</table>

<p>关于保持空间这里就不在举例了，前面再<strong>循环</strong>部分讲解下面这个命令的时候我们已经对它的使用做了说明。</p>

<pre><code> $ sed -n &#39;h;n;H;x;s/\n/, /;/Paulo/!b Print; s/^/- /; :Print;p&#39; books2.txt 
</code></pre>

<h2 id="toc_16">基本命令</h2>

<p>本章将会讲解一些常用的SED命令，主要包括<code>DELETE</code>，<code>WRITE</code>，<code>APPEND</code>，<code>CHANGE</code>，<code>INSERT</code>，<code>TRANSLATE</code>，<code>QUIT</code>，<code>READ</code>，<code>EXECUTE</code>等命令。</p>

<h3 id="toc_17">删除命令  <strong>d</strong></h3>

<p>删除命令格式如下</p>

<pre><code>[address1[,address2]]d 
</code></pre>

<p><code>address1</code>和<code>address2</code>是开始和截止地址，它们可以是行号或者字符串匹配模式，这两种地址都是可选的。</p>

<p>由命令的名称可以知道，<strong>delete</strong> 命令是用来执行删除操作的，并且因为SED是基于行的编辑器，因此我们说该命令是用来删除行的。注意的是，该命令只会移除模式空间中的行，这样该行就不会被发送到输出流，但原始内容不会改变。</p>

<pre><code>$ sed &#39;d&#39; books.txt 
</code></pre>

<p>为什么没有输出任何内容？默认情况下，SED将会对每一行执行删除操作，这就是该命令为什么没有在标准输出中输出任何内容的原因。</p>

<p>下列命令只移除第四行</p>

<pre><code>[jerry]$ sed &#39;4d&#39; books.txt 
1) A Storm of Swords, George R. R. Martin, 1216 
2) The Two Towers, J. R. R. Tolkien, 352 
3) The Alchemist, Paulo Coelho, 197 
5) The Pilgrimage, Paulo Coelho, 288 
6) A Game of Thrones, George R. R. Martin, 864
</code></pre>

<p>SED也接受使用逗号(,)分隔的地址范围。我们可以构造地址范围去移除N1到N2行，例如，下列命令将删除2-4行</p>

<pre><code>$ sed &#39;2, 4 d&#39; books.txt     
1) A Storm of Swords, George R. R. Martin, 1216 
5) The Pilgrimage, Paulo Coelho, 288 
6) A Game of Thrones, George R. R. Martin, 864
</code></pre>

<p>SED的地址范围并不仅仅限于数字，我们也可以指定模式匹配作为地址，下面的示例会移除所有作者为Paulo Coelho的书籍</p>

<pre><code>$ sed &#39;/Paulo Coelho/d&#39; books.txt 
1) A Storm of Swords, George R. R. Martin, 1216 
2) The Two Towers, J. R. R. Tolkien, 352 
4) The Fellowship of the Ring, J. R. R. Tolkien, 432 
6) A Game of Thrones, George R. R. Martin, 864 
</code></pre>

<p>我移除所有以<code>Storm</code>和<code>Fellowship</code>开头的行</p>

<pre><code>$ sed &#39;/Storm/,/Fellowship/d&#39; books.txt  
5) The Pilgrimage, Paulo Coelho, 288 
6) A Game of Thrones, George R. R. Martin, 864 
</code></pre>

<h3 id="toc_18">文件写入命令 <strong>w</strong></h3>

<p>SED提供了 <strong>write</strong> 命令用于将模式空间中的内容写入到文件，与 <strong>delete</strong> 命令类似，下面是 <strong>write</strong> 命令的语法</p>

<pre><code>[address1[,address2]]w file 
</code></pre>

<p><strong>w</strong> 指定是写命令， <strong>file</strong> 指的是存储文件内容的文件名。使用 <strong>file</strong> 操作符的时候要小心，当提供了文件名但是文件不存在的时候它会自动创建，如果已经存在的话则会<strong>覆盖</strong>原文件的内容。</p>

<p>下面的SED命令会创建文件books.txt的副本，在 <strong>w</strong> 和 <strong>file</strong> 之间只能有一个空格</p>

<pre><code>$ sed -n &#39;w books.bak&#39; books.txt 
</code></pre>

<p>上述命令创建了一个名为 <strong>books.bak</strong> 的文件，验证一下两个文件的内容是否相同</p>

<pre><code>$ diff books.txt books.bak  
$ echo $?
</code></pre>

<p>一旦执行上述的代码，你将会得到下列输出</p>

<pre><code>0
</code></pre>

<p>聪明的你可能已经想到了，这不就是 <strong>cp</strong> 命令做的事情吗！确实如此，<strong>cp</strong> 命令也做了同一件事情，但是SED是一个成熟的工具，使用它你可以只复制文件中的某些行到新的文件中，如下代码会存储文件中的奇数行到另一个文件</p>

<pre><code>$ sed -n &#39;2~2 w junk.txt&#39; books.txt  
$ cat junk.txt 
2) The Two Towers, J. R. R. Tolkien, 352 
4) The Fellowship of the Ring, J. R. R. Tolkien, 432 
6) A Game of Thrones, George R. R. Martin, 864 
</code></pre>

<p>假设你希望存储所有独立作者的书到单独的文件。如果人工去做的话，肯定是非常无聊而且没有技术含量的，但是使用SED，你就有了更加聪明的方法去实现</p>

<pre><code>$ sed -n -e &#39;/Martin/ w Martin.txt&#39; -e &#39;/Paulo/ w Paulo.txt&#39; -e &#39;/Tolkien/ w Tolkien.txt&#39; books.txt    

$ cat Martin.txt
1) A Storm of Swords, George R. R. Martin, 1216 
6) A Game of Thrones, George R. R. Martin, 864

$ cat Paulo.txt
3) The Alchemist, Paulo Coelho, 197 
5) The Pilgrimage, Paulo Coelho, 288

$ cat Tolkien.txt
2) The Two Towers, J. R. R. Tolkien, 352 
4) The Fellowship of the Ring, J. R. R. Tolkien, 432
</code></pre>

<h3 id="toc_19">追加命令 <strong>a</strong></h3>

<p>文本追加命令语法：</p>

<pre><code>[address]a\ 
Append text 
</code></pre>

<p>在第四行之后追加一本新书：</p>

<pre><code>$ sed &#39;4 a 7) Adultry, Paulo Coelho, 234&#39; books.txt 
1) A Storm of Swords, George R. R. Martin, 1216 
2) The Two Towers, J. R. R. Tolkien, 352 
3) The Alchemist, Paulo Coelho, 197 
4) The Fellowship of the Ring, J. R. R. Tolkien, 432 
7) Adultry, Paulo Coelho, 234 
5) The Pilgrimage, Paulo Coelho, 288 
6) A Game of Thrones, George R. R. Martin, 864
</code></pre>

<p>在命令部分，4指的是行号，<code>a</code> 是append命令，剩余部分为要追加的文本。</p>

<p>在文件的结尾插入一行文本，使用 <strong>$</strong> 作为地址</p>

<pre><code>$ sed &#39;$ a 7) Adultry, Paulo Coelho, 234&#39; books.txt
1) A Storm of Swords, George R. R. Martin, 1216 
2) The Two Towers, J. R. R. Tolkien, 352 
3) The Alchemist, Paulo Coelho, 197 
4) The Fellowship of the Ring, J. R. R. Tolkien, 432 
5) The Pilgrimage, Paulo Coelho, 288 
6) A Game of Thrones, George R. R. Martin, 864 
7) Adultry, Paulo Coelho, 234 
</code></pre>

<p>除了行号，我们也可以使用文本模式指定地址，例如，在匹配 <code>The Alchemist</code> 的行之后追加文本</p>

<pre><code>$ sed &#39;/The Alchemist/ a 7) Adultry, Paulo Coelho, 234&#39; books.txt  
1) A Storm of Swords, George R. R. Martin, 1216 
2) The Two Towers, J. R. R. Tolkien, 352 
3) The Alchemist, Paulo Coelho, 197 
7) Adultry, Paulo Coelho, 234 
4) The Fellowship of the Ring, J. R. R. Tolkien, 432 
5) The Pilgrimage, Paulo Coelho, 288 
6) A Game of Thrones, George R. R. Martin, 864 
</code></pre>

<h3 id="toc_20">行替换命令 <strong>c</strong></h3>

<p>SED通过 <strong>c</strong> 提供了 <strong>change</strong> 和 <strong>replace</strong> 命令，该命令帮助我们使用新文本替换已经存在的行，当提供行的地址范围时，所有的行都被作为一组被替换为单行文本，下面是该命令的语法</p>

<pre><code>[address1[,address2]]c\ 
Replace text
</code></pre>

<p>比如，替换文本中的第三行为新的内容</p>

<pre><code>$ sed &#39;3 c 3) Adultry, Paulo Coelho, 324&#39; books.txt
1) A Storm of Swords, George R. R. Martin, 1216 
2) The Two Towers, J. R. R. Tolkien, 352 
3) Adultry, Paulo Coelho, 324 
4) The Fellowship of the Ring, J. R. R. Tolkien, 432 
5) The Pilgrimage, Paulo Coelho, 288 
6) A Game of Thrones, George R. R. Martin, 864
</code></pre>

<p>SED也接受模式作为地址</p>

<pre><code>$ sed &#39;/The Alchemist/ c 3) Adultry, Paulo Coelho, 324&#39; books.txt
1) A Storm of Swords, George R. R. Martin, 1216 
2) The Two Towers, J. R. R. Tolkien, 352 
3) Adultry, Paulo Coelho, 324 
4) The Fellowship of the Ring, J. R. R. Tolkien, 432 
5) The Pilgrimage, Paulo Coelho, 288 
6) A Game of Thrones, George R. R. Martin, 864 
</code></pre>

<p>多行替换也是支持的，下面的命令实现了将第4-6行内容替换为单行</p>

<pre><code>$ sed &#39;4, 6 c 4) Adultry, Paulo Coelho, 324&#39; books.txt  
1) A Storm of Swords, George R. R. Martin, 1216 
2) The Two Towers, J. R. R. Tolkien, 352 
3) The Alchemist, Paulo Coelho, 197 
4) Adultry, Paulo Coelho, 324
</code></pre>

<h3 id="toc_21">插入命令 <strong>i</strong></h3>

<p>插入命令与追加命令类似，唯一的区别是插入命令是在匹配的位置前插入新的一行。</p>

<pre><code>[address]i\ 
Insert text 
</code></pre>

<p>下面的命令会在第四行前插入新的一行</p>

<pre><code>$ sed &#39;4 i 7) Adultry, Paulo Coelho, 324&#39; books.txt 
1) A Storm of Swords, George R. R. Martin, 1216 
2) The Two Towers, J. R. R. Tolkien, 352 
3) The Alchemist, Paulo Coelho, 197 
7) Adultry, Paulo Coelho, 324 
4) The Fellowship of the Ring, J. R. R. Tolkien, 432 
5) The Pilgrimage, Paulo Coelho, 288 
6) A Game of Thrones, George R. R. Martin, 864
</code></pre>

<h3 id="toc_22">转换命令 <strong>y</strong></h3>

<p>转换（Translate）命令 <strong>y</strong> 是唯一可以处理单个字符的sed编辑器命令。转换命令格式 如下</p>

<pre><code>[address]y/inchars/outchars/
</code></pre>

<p>转换命令会对inchars和outchars值进行一对一的映射。inchars中的第一个字符会被转换为outchars中的第一个字符，第二个字符会被转换成outchars中的第二个字符。这个映射过程会一直持续到处理完指定字符。如果inchars和outchars的长度不同，则sed编辑器会产生一 条错误消息。</p>

<pre><code>$ echo &quot;1 5 15 20&quot; | sed &#39;y/151520/IVXVXX/&#39;
I V IV XX
</code></pre>

<h3 id="toc_23">输出隐藏字符命令 <strong>l</strong></h3>

<p>你能通过直接观察区分出单词是通过空格还是tab进行分隔的吗？显然是不能的，但是SED可以为你做到这点。使用<code>l</code>命令（英文字母L的小写）可以显示文本中的隐藏字符（例如<code>\t</code>或者<code>$</code>字符）。</p>

<pre><code>[address1[,address2]]l 
[address1[,address2]]l [len] 
</code></pre>

<p>为了测试该命令，我们首先将books.txt中的空格替换为tab。</p>

<pre><code>$ sed &#39;s/ /\t/g&#39; books.txt &gt; junk.txt 
</code></pre>

<p>接下来执行<code>l</code>命令</p>

<pre><code>$ sed -n &#39;l&#39; junk.txt
1)\tStorm\tof\tSwords,\tGeorge\tR.\tR.\tMartin,\t1216\t$
2)\tThe\tTwo\tTowers,\tJ.\tR.\tR.\tTolkien,\t352\t$
3)\tThe\tAlchemist,\tPaulo\tCoelho,\t197\t$
4)\tThe\tFellowship\tof\tthe\tRing,\tJ.\tR.\tR.\tTolkien,\t432\t$
5)\tThe\tPilgrimage,\tPaulo\tCoelho,\t288\t$
6)\tA\tGame\tof\tThrones,\tGeorge\tR.\tR.\tMartin,\t864$
</code></pre>

<p>使用<code>l</code>命令的时候，一个很有趣的特性是我们可以使用它来实现文本按照指定的宽度换行。</p>

<pre><code>$ sed -n &#39;l 25&#39; books.txt
1) Storm of Swords, Geor\
ge R. R. Martin, 1216 $
2) The Two Towers, J. R.\
 R. Tolkien, 352 $
3) The Alchemist, Paulo \
Coelho, 197 $
4) The Fellowship of the\
 Ring, J. R. R. Tolkien,\
 432 $
5) The Pilgrimage, Paulo\
 Coelho, 288 $
6) A Game of Thrones, Ge\
orge R. R. Martin, 864$
</code></pre>

<p>上面的示例中在<code>l</code>命令后跟了一个数字25，它告诉SED按照每行25个字符进行换行，如果指定这个数字为0的话，则只有在存在换行符的情况下才进行换行。</p>

<blockquote>
<p><code>l</code>命令是GNU-SED的一部分，其它的一些变体中可能无法使用该命令。</p>
</blockquote>

<h3 id="toc_24">退出命令 <strong>q</strong></h3>

<p>在SED中，可以使用<code>Quit</code>命令退出当前的执行流</p>

<pre><code>[address]q 
[address]q [value]
</code></pre>

<p>需要注意的是，<code>q</code>命令不支持地址范围，只支持单个地址匹配。默认情况下SED会按照读取、执行、重复的工作流执行，但当它遇到<code>q</code>命令的时候，它会退出当前的执行流。</p>

<pre><code>$ sed &#39;3 q&#39; books.txt
1) A Storm of Swords, George R. R. Martin, 1216 
2) The Two Towers, J. R. R. Tolkien, 352 
3) The Alchemist, Paulo Coelho, 197

$ sed &#39;/The Alchemist/ q&#39; books.txt 
1) A Storm of Swords, George R. R. Martin, 1216 
2) The Two Towers, J. R. R. Tolkien, 352 
3) The Alchemist, Paulo Coelho, 197
</code></pre>

<p><code>q</code>命令也支持提供一个value，这个value将作为程序的返回代码返回</p>

<pre><code>$ sed &#39;/The Alchemist/ q 100&#39; books.txt
1) A Storm of Swords, George R. R. Martin, 1216
2) The Two Towers, J. R. R. Tolkien, 352 
3) The Alchemist, Paulo Coelho, 197

$ echo $? 
100
</code></pre>

<h3 id="toc_25">文件读取命令 <strong>r</strong></h3>

<p>在SED中，我们可以让SED使用Read命令从外部文件中读取内容并且在满足条件的时候显示出来。</p>

<pre><code>[address]r file
</code></pre>

<p>需要注意的是，<code>r</code>命令和文件名之间必须只有一个空格。</p>

<p>下面的示例会打开<em>junk.txt</em>文件，将其内容插入到<em>books.txt</em>文件的第三行之后</p>

<pre><code>$ echo &quot;This is junk text.&quot; &gt; junk.txt 
$ sed &#39;3 r junk.txt&#39; books.txt 
1) A Storm of Swords, George R. R. Martin, 1216 
2) The Two Towers, J. R. R. Tolkien, 352 
3) The Alchemist, Paulo Coelho, 197 
This is junk text. 
4) The Fellowship of the Ring, J. R. R. Tolkien, 432 
5) The Pilgrimage, Paulo Coelho, 288 
6) A Game of Thrones, George R. R. Martin, 864
</code></pre>

<blockquote>
<p><code>r</code>命令也支持地址范围，例如<em>3, 5 r junk.txt</em>会在第三行，第四行，第五行后面分别插入<em>junk.txt</em>的内容</p>
</blockquote>

<h3 id="toc_26">执行外部命令 <strong>e</strong></h3>

<p>如果你看过<a href="https://aicode.cc/san-shi-fen-zhong-xue-huiawk.html">三十分钟学会AWK</a>一文，你可能已经知道了在AWK中可以执行外部的命令，那么在SED中我们是否也可以这样做？</p>

<p>答案是肯定的，在SED中，我们可以使用<code>e</code>命令执行外部命令</p>

<pre><code>[address1[,address2]]e [command]
</code></pre>

<p>下面的命令会在第三行之前执行<em>date</em>命令</p>

<pre><code>$ sed &#39;3 e date&#39; books.txt
1) Storm of Swords, George R. R. Martin, 1216
2) The Two Towers, J. R. R. Tolkien, 352
2016年11月29日 星期二 22时46分14秒 CST
3) The Alchemist, Paulo Coelho, 197
4) The Fellowship of the Ring, J. R. R. Tolkien, 432
5) The Pilgrimage, Paulo Coelho, 288
6) A Game of Thrones, George R. R. Martin, 864
</code></pre>

<p>另一个示例</p>

<pre><code>$ sed &#39;3,5 e who&#39; books.txt
1) Storm of Swords, George R. R. Martin, 1216
2) The Two Towers, J. R. R. Tolkien, 352
mylxsw   console  Nov 29 19:30
mylxsw   ttys000  Nov 29 22:45
3) The Alchemist, Paulo Coelho, 197
mylxsw   console  Nov 29 19:30
mylxsw   ttys000  Nov 29 22:45
4) The Fellowship of the Ring, J. R. R. Tolkien, 432
mylxsw   console  Nov 29 19:30
mylxsw   ttys000  Nov 29 22:45
5) The Pilgrimage, Paulo Coelho, 288
6) A Game of Thrones, George R. R. Martin, 864
</code></pre>

<p>如果你仔细观察<code>e</code>命令的语法，你会发现其实它的<em>command</em>参数是可选的。在没有提供外部命令的时候，SED会将模式空间中的内容作为要执行的命令。</p>

<pre><code>$ echo -e &quot;date\ncal\nuname&quot; &gt; commands.txt
$ cat commands.txt
date
cal
uname
$ sed &#39;e&#39; commands.txt
2016年11月29日 星期二 22时50分30秒 CST
    十一月 2016
日 一 二 三 四 五 六
       1  2  3  4  5
 6  7  8  9 10 11 12
13 14 15 16 17 18 19
20 21 22 23 24 25 26
27 28 29 30

Darwin
</code></pre>

<h3 id="toc_27">排除命令 <strong>!</strong></h3>

<p>感叹号命令（<strong>!</strong>）用来排除命令，也就是让原本会起作用的命令不起作用。</p>

<pre><code>$ sed -n &#39;/Paulo/p&#39; books.txt
3) The Alchemist, Paulo Coelho, 197
5) The Pilgrimage, Paulo Coelho, 288
$ sed -n &#39;/Paulo/!p&#39; books.txt
1) Storm of Swords, George R. R. Martin, 1216
2) The Two Towers, J. R. R. Tolkien, 352
4) The Fellowship of the Ring, J. R. R. Tolkien, 432
6) A Game of Thrones, George R. R. Martin, 864
</code></pre>

<p>如上例所示，<code>p</code>命令原先是只输出匹配<em>Paulo</em>的行，添加<code>!</code>之后，变成了只输出不匹配<em>Paulo</em>的行。</p>

<pre><code>$ sed -n &#39;1!G; h; $p&#39; books.txt
6) A Game of Thrones, George R. R. Martin, 864
5) The Pilgrimage, Paulo Coelho, 288
4) The Fellowship of the Ring, J. R. R. Tolkien, 432
3) The Alchemist, Paulo Coelho, 197
2) The Two Towers, J. R. R. Tolkien, 352
1) Storm of Swords, George R. R. Martin, 1216
</code></pre>

<p>上面的命令实现了类似<code>tac</code>命令类似的输出，将文本内容倒序输出。看起来有些晦涩难懂，分解一下却十分简单：</p>

<ol>
<li><em>1!G</em> 这句的意思是出了第一行之外，处理每一行的时候都将保持空间中的内容追加到模式空间（正序-&gt;倒序）</li>
<li><em>h</em> 将模式空间中的内容复制到保持空间以备下一行匹配的时候追加到下一行的后面</li>
<li><em>$p</em> 如果匹配到最后一行的话则输出模式空间中的内容</li>
<li>上述步骤不断重复直到文本结束刚好将文件内容翻转了一次</li>
</ol>

<h3 id="toc_28">多行命令</h3>

<p>在使用sed编辑器的基础命令时，你可能注意到了一个局限。所有的sed编辑器命令都是针对<strong>单行</strong>数据执行操作的。在sed编辑器读取数据流时，它会基于<strong>换行符</strong>的位置将数据分成行。sed编辑器根据定义好的脚本命令一次处理一行数据，然后移到下一行重复这个过程。</p>

<p>幸运的是，sed编辑器的设计人员已经考虑到了这种情况，并设计了对应的解决方案。sed编辑器包含了三个可用来处理多行文本的特殊命令。</p>

<ul>
<li><strong>N</strong>：将数据流中的下一行加进来创建一个多行组来处理</li>
<li><strong>D</strong>：删除多行组中的一行</li>
<li><strong>P</strong>：打印多行组中的一行</li>
</ul>

<h4 id="toc_29">N - 加载下一行</h4>

<p>默认情况下，SED是基于单行进行操作的，有些情况下我们可能需要使用多行进行编辑，启用多行编辑使用<code>N</code>命令，与<code>n</code>不同的是，<code>N</code>并不会清除、输出模式空间的内容，而是采用了追加模式。</p>

<pre><code>[address1[,address2]]N
</code></pre>

<p>下面的示例将会把<em>books2.txt</em>中的标题和作者放到同一行展示，并且使用逗号进行分隔</p>

<pre><code>$ sed &#39;N; s/\n/,/g&#39; books2.txt
A Storm of Swords ,George R. R. Martin
The Two Towers ,J. R. R. Tolkien
The Alchemist ,Paulo Coelho
The Fellowship of the Ring ,J. R. R. Tolkien
The Pilgrimage ,Paulo Coelho
A Game of Thrones ,George R. R. Martin
</code></pre>

<h4 id="toc_30">D - 删除多行中的一行</h4>

<p>sed编辑器提供了多行删除命令<strong>D</strong>，它只删除模式空间中的第一行。该命令会删除到换行符（含 换行符）为止的所有字符。</p>

<pre><code>$ echo &#39;\nThis is the header line.\nThis is a data line.\n\nThis is the last line.&#39; | sed &#39;/^$/{N; /header/D}&#39;
This is the header line.
This is a data line.

This is the last line.
</code></pre>

<h4 id="toc_31">P - 输出多行中的一行</h4>

<p><code>P</code>命令用于输出<code>N</code>命令创建的多行文本的模式空间中的第一行。</p>

<pre><code>[address1[,address2]]P 
</code></pre>

<p>例如下面的命令只输出了图书的标题</p>

<pre><code>$ sed -n &#39;N;P&#39; books2.txt
A Storm of Swords
The Two Towers
The Alchemist
The Fellowship of the Ring
The Pilgrimage
A Game of Thrones
</code></pre>

<h3 id="toc_32">其它命令</h3>

<h4 id="toc_33">n - 单行next</h4>

<p>小写的n命令会告诉sed编辑器移动到数据流中的下一文本行，并且覆盖当前模式空间中的行。</p>

<pre><code>$ cat data1.txt 
This is the header line.

This is a data line.

This is the last line.
$ sed &#39;/header/{n ; d}&#39; data1.txt 
This is the header line.
This is a data line.

This is the last line.
</code></pre>

<p>上面的命令中，首先会匹配包含<em>header</em>的行，之后将移动到数据流的下一行，这里是一个空行，然后执行<code>d</code>命令对改行进行删除，所有就看到了这样的结果：第一个空行被删除掉了。</p>

<h4 id="toc_34">v - SED版本检查</h4>

<p><code>v</code>命令用于检查SED的版本，如果版本大于参数中的版本则正常执行，否则失败</p>

<pre><code>[address1[,address2]]v [version]
</code></pre>

<p>例如</p>

<pre><code>$ sed --version
sed (GNU sed) 4.2.2

$ sed &#39;v 4.2.3&#39; books.txt
sed: -e expression #1, char 7: expected newer version of sed

$ sed &#39;v 4.2.2&#39; books.txt
1) Storm of Swords, George R. R. Martin, 1216
2) The Two Towers, J. R. R. Tolkien, 352
3) The Alchemist, Paulo Coelho, 197
4) The Fellowship of the Ring, J. R. R. Tolkien, 432
5) The Pilgrimage, Paulo Coelho, 288
6) A Game of Thrones, George R. R. Martin, 864
</code></pre>

<h2 id="toc_35">特殊字符</h2>

<p>在SED中提供了两个可以用作命令的特殊字符：<strong>=</strong> 和 <strong>&amp;</strong> 。</p>

<h3 id="toc_36"><code>=</code>命令</h3>

<p><code>=</code>命令用于输出行号，语法格式为</p>

<pre><code>[/pattern/]= 
[address1[,address2]]=
</code></pre>

<p>例如为每一行输出行号</p>

<pre><code>$ sed &#39;=&#39; books2.txt
1
A Storm of Swords
2
George R. R. Martin
...
</code></pre>

<p>只为1-4行输出行号</p>

<pre><code>$ sed &#39;1, 4=&#39; books2.txt
1
A Storm of Swords
2
George R. R. Martin
3
The Two Towers
4
J. R. R. Tolkien
The Alchemist
Paulo Coelho
The Fellowship of the Ring
J. R. R. Tolkien
The Pilgrimage
Paulo Coelho
A Game of Thrones
George R. R. Martin
</code></pre>

<p>匹配Paulo的行输出行号</p>

<pre><code>$ sed &#39;/Paulo/ =&#39; books2.txt
A Storm of Swords
George R. R. Martin
The Two Towers
J. R. R. Tolkien
The Alchemist
6
Paulo Coelho
The Fellowship of the Ring
J. R. R. Tolkien
The Pilgrimage
10
Paulo Coelho
A Game of Thrones
George R. R. Martin
</code></pre>

<p>最后一行输出行号，这个命令比较有意思了，可以用于输出文件总共有多少行</p>

<pre><code>$ sed -n &#39;$ =&#39; books2.txt
12
</code></pre>

<h3 id="toc_37"><code>&amp;</code>命令</h3>

<p>特殊字符<code>&amp;</code>用于存储匹配模式的内容，通常与替换命令<code>s</code>一起使用。</p>

<pre><code>$ sed &#39;s/[[:digit:]]/Book number &amp;/&#39; books.txt
Book number 1) Storm of Swords, George R. R. Martin, 1216
Book number 2) The Two Towers, J. R. R. Tolkien, 352
Book number 3) The Alchemist, Paulo Coelho, 197
Book number 4) The Fellowship of the Ring, J. R. R. Tolkien, 432
Book number 5) The Pilgrimage, Paulo Coelho, 288
Book number 6) A Game of Thrones, George R. R. Martin, 864
</code></pre>

<p>上述命令用于匹配每一行第一个数字，在其前面添加 <em>Book number</em> 。而下面这个命令则匹配最后一个数字，并修改为<code>Pages =</code>。其中<code>[[:digit:]]* *$</code>可能比较费解，这一部分其实是：<em>匹配0个或多个数字+0个或多个空格+行尾</em>。</p>

<pre><code>sed &#39;s/[[:digit:]]* *$/Pages = &amp;/&#39; books.txt
1) Storm of Swords, George R. R. Martin, Pages = 1216
2) The Two Towers, J. R. R. Tolkien, Pages = 352
3) The Alchemist, Paulo Coelho, Pages = 197
4) The Fellowship of the Ring, J. R. R. Tolkien, Pages = 432
5) The Pilgrimage, Paulo Coelho, Pages = 288
6) A Game of Thrones, George R. R. Martin, Pages = 864
</code></pre>

<h2 id="toc_38">字符串</h2>

<h3 id="toc_39">替换命令 <strong>s</strong></h3>

<p>文本替换命令非常常见，其格式如下</p>

<pre><code>[address1[,address2]]s/pattern/replacement/[flags]
</code></pre>

<p>在前面我们使用的<em>books.txt</em>文件中，我们使用逗号“<em>,</em>”分隔每一列，下面的示例中，我们会使用替换命令将其替换为管道符“<em>|</em>”：</p>

<pre><code>$ sed &#39;s/,/ |/&#39; books.txt
1) Storm of Swords | George R. R. Martin, 1216
2) The Two Towers | J. R. R. Tolkien, 352
3) The Alchemist | Paulo Coelho, 197
4) The Fellowship of the Ring | J. R. R. Tolkien, 432
5) The Pilgrimage | Paulo Coelho, 288
6) A Game of Thrones | George R. R. Martin, 864
</code></pre>

<p>是不是觉得哪里不对？相信你已经发现，每一行的第二个逗号都没有被替换，只有第一个被替换了，确实如此，在SED中，使用替换命令的时候默认只会对第一个匹配的位置进行替换。使用<code>g</code>选项告诉SED对所有内容进行替换：</p>

<pre><code>$ sed &#39;s/,/ | /g&#39; books.txt
1) Storm of Swords |  George R. R. Martin |  1216
2) The Two Towers |  J. R. R. Tolkien |  352
3) The Alchemist |  Paulo Coelho |  197
4) The Fellowship of the Ring |  J. R. R. Tolkien |  432
5) The Pilgrimage |  Paulo Coelho |  288
6) A Game of Thrones |  George R. R. Martin |  864
</code></pre>

<blockquote>
<p>如果对匹配模式（或地址范围）的行进行替换，则只需要在<code>s</code>命令前添加地址即可。比如只替换匹配<em>The Pilgrimage</em>的行：<code>sed &#39;/The Pilgrimage/ s/,/ | /g&#39; books.txt</code></p>
</blockquote>

<p>还有一些其它的选项，这里就简单的描述一下，不在展开讲解</p>

<ul>
<li><strong>数字n</strong>: 只替换第n次匹配，比如<code>sed &#39;s/,/ | /2&#39; books.txt</code>，只替换每行中第二个逗号</li>
<li><strong>p</strong>：只输出改变的行，比如<code>sed -n &#39;s/Paulo Coelho/PAULO COELHO/p&#39; books.txt</code></li>
<li><strong>w</strong>：存储改变的行到文件，比如<code>sed -n &#39;s/Paulo Coelho/PAULO COELHO/w junk.txt&#39; books.txt</code></li>
<li><strong>i</strong>：匹配时忽略大小写，比如<code>sed  -n &#39;s/pAuLo CoElHo/PAULO COELHO/pi&#39; books.txt</code></li>
</ul>

<p>在执行替换操作的时候，如果要替换的内容中包含<code>/</code>，这个时候怎么办？很简单，添加转义操作符。</p>

<pre><code>$ echo &quot;/bin/sed&quot; | sed &#39;s/\/bin\/sed/\/home\/mylxsw\/src\/sed\/sed-4.2.2\/sed/&#39;
/home/mylxsw/src/sed/sed-4.2.2/sed
</code></pre>

<p>上面的命令中，我们使用<code>\</code>对<code>/</code>进行了转义，不过表达式已经看起来非常难看了，在SED中还可以使用<code>|</code>，<code>@</code>，<code>^</code>，<code>!</code>作为命令的分隔符，所以，下面的几个命令和上面的是等价的</p>

<pre><code>echo &quot;/bin/sed&quot; | sed &#39;s|/bin/sed|/mylxsw/mylxsw/src/sed/sed-4.2.2/sed|&#39;
echo &quot;/bin/sed&quot; | sed &#39;s@/bin/sed@/home/mylxsw/src/sed/sed-4.2.2/sed@&#39;
echo &quot;/bin/sed&quot; | sed &#39;s^/bin/sed^/home/mylxsw/src/sed/sed-4.2.2/sed^&#39;
echo &quot;/bin/sed&quot; | sed &#39;s!/bin/sed!/home/mylxsw/src/sed/sed-4.2.2/sed!&#39;
</code></pre>

<h3 id="toc_40">匹配子字符串</h3>

<p>前面我们学习了替换命令的用法，现在让我们看看如何获取匹配文本中的某个子串。</p>

<p>在SED中，使用<code>\(</code>和<code>\)</code>对匹配的内容进行分组，使用<code>\N</code>的方式进行引用。请看下面示例</p>

<pre><code>$ echo &quot;Three One Two&quot; | sed &#39;s|\(\w\+\) \(\w\+\) \(\w\+\)|\2 \3 \1|&#39;
One Two Three
</code></pre>

<p>我们输出了<em>Three</em>，<em>One</em>，<em>Two</em>三个单词，在SED的替换规则中，使用空格分隔了三小段正则表达式<code>\(\w\+\)</code>来匹配每一个单词，后面使用<code>\1</code>，，<code>\2</code>，<code>\3</code>分别引用它们的值。</p>

<h2 id="toc_41">管理模式</h2>

<p>前面已经讲解过模式空间和<strong>保持空间</strong>的用法，在本节中我们将会继续探索它们的用法。</p>

<blockquote>
<p>本部分内容暂未更新，请关注<a href="https://github.com/mylxsw/growing-up">程序猿成长计划</a> 项目，我将最先在Github的这个仓库中更新最新内容。</p>
</blockquote>

<h2 id="toc_42">正则表达式</h2>

<p>这一部分就是标准正则表达式的一些特殊字符以元字符，比较熟悉的请略过。</p>

<h3 id="toc_43">标准正则表达式</h3>

<h4 id="toc_44"><strong>^</strong></h4>

<p>匹配行的开始。</p>

<pre><code>$ sed -n &#39;/^The/ p&#39; books2.txt
The Two Towers, J. R. R. Tolkien 
The Alchemist, Paulo Coelho 
The Fellowship of the Ring, J. R. R. Tolkien 
The Pilgrimage, Paulo Coelho
</code></pre>

<h4 id="toc_45"><strong>$</strong></h4>

<p>匹配行的结尾</p>

<pre><code>$ sed -n &#39;/Coelho$/ p&#39; books2.txt 
The Alchemist, Paulo Coelho 
The Pilgrimage, Paulo Coelho
</code></pre>

<h4 id="toc_46"><strong>.</strong></h4>

<p>匹配单个字符（除行尾）</p>

<pre><code>$ echo -e &quot;cat\nbat\nrat\nmat\nbatting\nrats\nmats&quot; | sed -n &#39;/^..t$/p&#39;
cat
bat
rat
mat
</code></pre>

<h4 id="toc_47"><strong>[]</strong></h4>

<p>匹配字符集</p>

<pre><code>$ echo -e &quot;Call\nTall\nBall&quot; | sed -n &#39;/[CT]all/ p&#39;
Call
Tall
</code></pre>

<h4 id="toc_48"><strong>[^]</strong></h4>

<p>排除字符集</p>

<pre><code>$ echo -e &quot;Call\nTall\nBall&quot; | sed -n &#39;/[^CT]all/ p&#39;
Ball
</code></pre>

<h4 id="toc_49"><strong>[-]</strong></h4>

<p>字符范围。</p>

<pre><code>$ echo -e &quot;Call\nTall\nBall&quot; | sed -n &#39;/[C-Z]all/ p&#39; 
Call 
Tall
</code></pre>

<h4 id="toc_50"><strong>\?</strong> ，<strong>\+</strong> ，*</h4>

<p>分别对应0次到1次，一次到多次，0次到多次匹配。</p>

<h4 id="toc_51"><strong>{n}</strong> ，<strong>{n,}</strong> ，<strong>{m, n}</strong></h4>

<p>精确匹配N次，至少匹配N次，匹配M-N次</p>

<h4 id="toc_52"><strong>|</strong></h4>

<p>或操作。</p>

<pre><code>$ echo -e &quot;str1\nstr2\nstr3\nstr4&quot; | sed -n &#39;/str\(1\|3\)/ p&#39; 
str1
str3
</code></pre>

<h3 id="toc_53">POSIX兼容的正则</h3>

<p>主要包含<code>[:alnum:]</code>，<code>[:alpha:]</code>，<code>[:blank:]</code>，<code>[:digit:]</code>，<code>[:lower:]</code>，<code>[:upper:]</code>，<code>[:punct:]</code>，<code>[:space:]</code>，这些基本都见名之意，不在赘述。</p>

<h3 id="toc_54">元字符</h3>

<h4 id="toc_55"><strong>\s</strong></h4>

<p>匹配单个空白内容</p>

<pre><code>$ echo -e &quot;Line\t1\nLine2&quot; | sed -n &#39;/Line\s/ p&#39;
Line 1 
</code></pre>

<h4 id="toc_56"><strong>\S</strong></h4>

<p>匹配单个非空白内容。</p>

<h4 id="toc_57"><strong>\w</strong> ， <strong>\W</strong></h4>

<p>单个单词、非单词。</p>

<h2 id="toc_58">常用代码段</h2>

<h3 id="toc_59">Cat命令</h3>

<p>模拟<code>cat</code>命令比较简单，有下面两种方式</p>

<pre><code>$ sed &#39;&#39; books.txt
1) Storm of Swords, George R. R. Martin, 1216
2) The Two Towers, J. R. R. Tolkien, 352
3) The Alchemist, Paulo Coelho, 197
4) The Fellowship of the Ring, J. R. R. Tolkien, 432
5) The Pilgrimage, Paulo Coelho, 288
6) A Game of Thrones, George R. R. Martin, 864

$ sed -n &#39;p&#39; books.txt
1) Storm of Swords, George R. R. Martin, 1216
2) The Two Towers, J. R. R. Tolkien, 352
3) The Alchemist, Paulo Coelho, 197
4) The Fellowship of the Ring, J. R. R. Tolkien, 432
5) The Pilgrimage, Paulo Coelho, 288
6) A Game of Thrones, George R. R. Martin, 864
</code></pre>

<h3 id="toc_60">移除空行</h3>

<pre><code>$ echo -e &quot;Line #1\n\n\nLine #2&quot; | sed &#39;/^$/d&#39;
Line #1
Line #2
</code></pre>

<h3 id="toc_61">删除连续空行</h3>

<pre><code>$ echo -e &quot;Line #1\n\n\nLine #2&quot; | sed &#39;/./,/^$/!d&#39;
Line #1

Line #2
</code></pre>

<h3 id="toc_62">删除开头的空行</h3>

<pre><code>$ echo -e &quot;\nLine #1\n\nLine #2&quot; | sed &#39;/./,$!d&#39;
Line #1

Line #2
</code></pre>

<h3 id="toc_63">删除结尾的空行</h3>

<pre><code>$ echo -e &quot;\nLine #1\nLine #2\n\n&quot; | sed &#39;:start /^\n*$/{$d; N; b start }&#39;

Line #1

Line #2
</code></pre>

<h3 id="toc_64">过滤所有的html标签</h3>

<pre><code>$ cat html.txt
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;This is the page title&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;p&gt; This is the &lt;b&gt;first&lt;/b&gt; line in the Web page.
    This should provide some &lt;i&gt;useful&lt;/i&gt; information to use in our sed script.
&lt;/body&gt;
&lt;/html&gt;                                                                                  
$ sed &#39;s/&lt;[^&gt;]*&gt;//g ; /^$/d&#39; html.txt
    This is the page title
     This is the first line in the Web page.
    This should provide some useful information to use in our sed script.
</code></pre>

<h3 id="toc_65">从C++程序中移除注释</h3>

<p>有下面这样一个cpp文件</p>

<pre><code>$ cat hello.cpp
#include &lt;iostream&gt; 
using namespace std; 
int main(void) 
{ 
   // Displays message on stdout. 
   cout &gt;&gt; &quot;Hello, World !!!&quot; &gt;&gt; endl;  
   return 0; // Return success. 
}
</code></pre>

<p>执行下面的命令可以移除注释</p>

<pre><code>$ sed &#39;s|//.*||g&#39; hello.cpp
#include &lt;iostream&gt;
using namespace std;
int main(void)
{

   cout &gt;&gt; &quot;Hello, World !!!&quot; &gt;&gt; endl;
   return 0;
 }
</code></pre>

<h3 id="toc_66">为某些行添加注释</h3>

<pre><code>$ sed &#39;3,5 s/^/#/&#39; hello.sh 
#!/bin/bash 
#pwd 
#hostname 
#uname -a 
who 
who -r 
lsb_release -a
</code></pre>

<h3 id="toc_67">实现<strong>Wc -l</strong>命令</h3>

<p><code>wc -l</code>命令用于统计文件中的行数，使用SED也可以模拟该命令</p>

<pre><code>$ wc -l hello.cpp
       9 hello.cpp
$ sed -n &#39;$ =&#39; hello.cpp
9
</code></pre>

<h3 id="toc_68">模拟实现<code>head</code>命令</h3>

<p><code>head</code>命令用于输出文件中的前10行内容。</p>

<pre><code>$ head books2.txt
A Storm of Swords
George R. R. Martin
The Two Towers
J. R. R. Tolkien
The Alchemist
Paulo Coelho
The Fellowship of the Ring
J. R. R. Tolkien
The Pilgrimage
Paulo Coelho
</code></pre>

<p>使用SED中的<code>sed &#39;10 q&#39;</code>可以模拟它的实现</p>

<pre><code>$ sed &#39;10 q&#39; books.txt 
A Storm of Swords 
George R. R. Martin 
The Two Towers 
J. R. R. Tolkien 
The Alchemist 
Paulo Coelho 
The Fellowship of the Ring 
J. R. R. Tolkien 
The Pilgrimage
Paulo Coelho
</code></pre>

<h3 id="toc_69">模拟<code>tail -1</code>命令</h3>

<p><code>tail -1</code>输出文件的最后一行。</p>

<pre><code>$ cat test.txt
Line #1 
Line #2 

$ tail -1 test.txt
Line #2
$ sed $ sed -n &#39;$p&#39; test.txt
Line #2
</code></pre>

<h3 id="toc_70">模拟<code>Dos2unix</code>命令</h3>

<p>在DOS环境中，换行符是使用<strong>CR/LF</strong>两个字符一起表示的，下面命令模拟了<code>dos2unix</code>命令转换这些换行符为UNIX换行符。</p>

<blockquote>
<p>在GNU/Linux环境中，<strong>CR/LF</strong>通常使用&quot;^M&quot;（不是简单的两个符号组合，请使用快捷键Ctrl+v,Ctrl+m输入）进行表示。</p>
</blockquote>

<pre><code>$ echo -e &quot;Line #1\r\nLine #2\r&quot; &gt; test.txt
$ file test.txt
test.txt: ASCII text, with CRLF line terminators
$ sed &#39;s/^M$//&#39; test.txt &gt; new.txt
$ file new.txt
new.txt: ASCII text
$ cat -vte new.txt
Line #1$
Line #2$
</code></pre>

<h3 id="toc_71">模拟<code>Unix2dos</code>命令</h3>

<pre><code>$ file new.txt
new.txt: ASCII text
$ sed &#39;s/$/\r/&#39; new.txt &gt; new2.txt
$ file new2.txt
new2.txt: ASCII text, with CRLF line terminators

$ cat -vte new2.txt
Line #1^M$
Line #2^M$
</code></pre>

<h3 id="toc_72">模拟<code>cat -E</code>命令</h3>

<p><code>cat -E</code>命令会在每一行的行尾输出一个<em>$</em>符号。</p>

<pre><code>$ echo -e &quot;Line #1\nLine #2&quot; | cat -E
Line #1$
Line #2$
$ echo -e &quot;Line #1\nLine #2&quot; | sed &#39;s|$|&amp;$|&#39;
Line #1$
Line #2$
</code></pre>

<blockquote>
<p>注意，在Mac下不支持<code>cat -E</code>，可以直接使用sed代替</p>
</blockquote>

<h3 id="toc_73">模拟<code>cat -ET</code>命令</h3>

<p><code>cat -ET</code>命令不仅对每一行的行尾添加<em>$</em>，还会将每一行中的TAB显示为<em><sup>I</sup></em>。</p>

<pre><code>$ echo -e &quot;Line #1\tLine #2&quot; | cat -ET
Line #1^ILine #2$
$ echo -e &quot;Line #1\tLine #2&quot; | sed -n &#39;l&#39; | sed &#39;y/\\t/^I/&#39;
Line #1^ILine #2$
</code></pre>

<h3 id="toc_74">模拟<code>nl</code>命令</h3>

<p>命令<code>nl</code>可以为输入内容的每一行添加行号，记得之前介绍的<code>=</code>操作符吧，在SED中我们可以用它来实现与<code>nl</code>命令类似的功能。</p>

<pre><code>$ echo -e &quot;Line #1\nLine #2&quot; |nl
     1  Line #1
     2  Line #2
$ echo -e &quot;Line #1\nLine #2&quot; | sed = |  sed &#39;N;s/\n/\t/&#39;
1   Line #1
2   Line #2
</code></pre>

<p>上面的SED命令使用了两次，第一次使用<code>=</code>操作符为每一行输出行号，注意这个行号是独占一行的，因此使用管道符连接了第二个SED命令，每次读取两行，将换行符替换为Tab，这样就模拟出了<code>nl</code>命令的效果。</p>

<h3 id="toc_75">模拟<code>cp</code>命令</h3>

<pre><code>$ sed -n &#39;w dup.txt&#39; data.txt
$ diff data.txt dup.txt
$ echo $?
0
</code></pre>

<h3 id="toc_76">模拟<code>expand</code>命令</h3>

<p><code>expand</code>命令会转换输入中的TAB为空格，在SED中也可以模拟它</p>

<pre><code>$ echo -e &quot;One\tTwo\tThree&quot; &gt; test.txt
$ expand test.txt &gt; expand.txt
$ sed &#39;s/\t/     /g&#39; test.txt &gt; new.txt
$ diff new.txt expand.txt
$ echo $?
0
</code></pre>

<h3 id="toc_77">模拟<code>tee</code>命令</h3>

<p><code>tee</code>命令会将数据输出到标准输出的同时写入文件。</p>

<pre><code>$ echo -e &quot;Line #1\nLine #2&quot; | tee test.txt  
Line #1 
Line #2 
</code></pre>

<p>在SED中，实现该命令非常简单</p>

<pre><code>$ sed -n &#39;p; w new.txt&#39; test.txt
One Two Three
</code></pre>

<h3 id="toc_78">模拟<code>cat -s</code>命令</h3>

<p><code>cat -s</code>命令会将输入文件中的多行空格合并为一行。</p>

<pre><code>$ echo -e &quot;Line #1\n\n\n\nLine #2\n\n\nLine #3&quot; | cat -s
Line #1

Line #2

Line #3
</code></pre>

<p>在SED中实现</p>

<pre><code>$ echo -e &quot;Line #1\n\n\n\nLine #2\n\n\nLine #3&quot; | sed &#39;1s/^$//p;/./,/^$/!d&#39;
Line #1

Line #2

Line #3
</code></pre>

<p>这里需要注意的是<code>/./,/^$/!d</code>这个命令，它的意思是匹配区间<code>/./</code>到<code>/^$</code>，区间的开始会匹配至少包含一个字符的行，结束会匹配一个空行，在这个区间中的行不会被删除。</p>

<h3 id="toc_79">模拟<code>grep</code>命令</h3>

<pre><code>$ echo -e &quot;Line #1\nLine #2\nLine #3&quot; | grep &#39;Line #1&#39;
Line #1
$ echo -e &quot;Line #1\nLine #2\nLine #3&quot; | sed -n &#39;/Line #1/p&#39;
Line #1
</code></pre>

<h3 id="toc_80">模拟<code>grep -v</code>命令</h3>

<pre><code>$ echo -e &quot;Line #1\nLine #2\nLine #3&quot; | grep -v &#39;Line #1&#39;
Line #2
Line #3
$ echo -e &quot;Line #1\nLine #2\nLine #3&quot; | sed -n &#39;/Line #1/!p&#39;
Line #2
Line #3
</code></pre>

<h3 id="toc_81">模拟<code>tr</code>命令</h3>

<p><code>tr</code>命令用于字符转换</p>

<pre><code>$ echo &quot;ABC&quot; | tr &quot;ABC&quot; &quot;abc&quot;
abc
$ echo &quot;ABC&quot; | sed &#39;y/ABC/abc/&#39;
abc
</code></pre>

<h2 id="toc_82">写在最后</h2>

<p>看到这里，你肯定要吐槽了，不是说了三十分钟学会吗？你确定你能三十分钟学会？上次的<a href="https://aicode.cc/san-shi-fen-zhong-xue-huiawk.html">三十分钟学会AWK</a>说三十分钟学会不靠谱，这次又不靠谱了。不好意思，这里的三十分钟其实只是为了吸引你的注意而已，只有在你已经用过SED并对它的一些特性有所了解的情况下三十分钟看完才是有可能的，毕竟那么多特殊字符，那么多命令需要记住。不过话说回来，看完之后你有收获吗？有的话，那本文的目的就达到了，之后用到SED的时候再回来参考一下就可以了。</p>

<p>本文将会持续修正和更新，最新内容请参考我的 <a href="https://github.com/mylxsw">GITHUB</a> 上的 <a href="https://github.com/mylxsw/growing-up">程序猿成长计划</a> 项目，欢迎 Star。</p>

<h2 id="toc_83">参考</h2>

<ul>
<li><a href="http://www.tutorialspoint.com/sed/index.htm">Sed Tutorial</a></li>
<li><a href="http://www.ituring.com.cn/book/1698">Linux命令行与shell脚本编程大全（第3版）</a></li>
</ul>