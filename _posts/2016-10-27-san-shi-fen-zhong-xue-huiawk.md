---
ID: 10
post_title: 三十分钟学会AWK
author: mylxsw
post_excerpt: ""
layout: post
permalink: >
  https://aicode.cc/san-shi-fen-zhong-xue-huiawk.html
published: true
post_date: 2016-10-27 22:18:10
---

<ul>
<li>
<a href="#toc_0">概述</a>
<ul>
<li>
<a href="#toc_1">AWK的类型</a>
</li>
<li>
<a href="#toc_2">AWK的典型用途</a>
</li>
</ul>
</li>
<li>
<a href="#toc_3">工作流</a>
<ul>
<li>
<a href="#toc_4">程序结构</a>
<ul>
<li>
<a href="#toc_5">BEGIN 语句块</a>
</li>
<li>
<a href="#toc_6">BODY 语句块</a>
</li>
<li>
<a href="#toc_7">END 语句块</a>
</li>
</ul>
</li>
</ul>
</li>
<li>
<a href="#toc_8">基础语法</a>
<ul>
<li>
<a href="#toc_9">AWK命令行</a>
</li>
<li>
<a href="#toc_10">AWK程序文件</a>
</li>
<li>
<a href="#toc_11">AWK标准选项</a>
<ul>
<li>
<a href="#toc_12"><code>-v</code> 变量赋值选项</a>
</li>
<li>
<a href="#toc_13"><code>--dump-variables[=file]</code> 选项</a>
</li>
<li>
<a href="#toc_14"><code>--help</code> 选项</a>
</li>
<li>
<a href="#toc_15"><code>--lint[=fatal]</code> 选项</a>
</li>
<li>
<a href="#toc_16"><code>--posix</code> 选项</a>
</li>
<li>
<a href="#toc_17"><code>--profile[=file]</code>选项</a>
</li>
<li>
<a href="#toc_18"><code>--traditional</code> 选项</a>
</li>
<li>
<a href="#toc_19"><code>--version</code> 选项</a>
</li>
</ul>
</li>
</ul>
</li>
<li>
<a href="#toc_20">基本使用示例</a>
<ul>
<li>
<a href="#toc_21">打印某列或者字段</a>
</li>
<li>
<a href="#toc_22">打印所有的行</a>
</li>
<li>
<a href="#toc_23">打印匹配模式的列</a>
</li>
<li>
<a href="#toc_24">任意顺序打印列</a>
</li>
<li>
<a href="#toc_25">统计匹配模式的行数</a>
</li>
<li>
<a href="#toc_26">打印超过18个字符的行</a>
</li>
</ul>
</li>
<li>
<a href="#toc_27">内建变量</a>
<ul>
<li>
<a href="#toc_28">标准AWK变量</a>
<ul>
<li>
<a href="#toc_29">ARGC 命令行参数个数</a>
</li>
<li>
<a href="#toc_30">ARGV 命令行参数数组</a>
</li>
<li>
<a href="#toc_31">CONVFMT 数字的约定格式</a>
</li>
<li>
<a href="#toc_32">ENVIRON 环境变量</a>
</li>
<li>
<a href="#toc_33">FILENAME 当前文件名</a>
</li>
<li>
<a href="#toc_34">FS 输入字段的分隔符</a>
</li>
<li>
<a href="#toc_35">NF 字段数目</a>
</li>
<li>
<a href="#toc_36">NR 行号</a>
</li>
<li>
<a href="#toc_37">FNR 行号（相对当前文件）</a>
</li>
<li>
<a href="#toc_38">OFMT 输出格式数字</a>
</li>
<li>
<a href="#toc_39">OFS 输出字段分隔符</a>
</li>
<li>
<a href="#toc_40">ORS 输出行分隔符</a>
</li>
<li>
<a href="#toc_41">RLENGTH</a>
</li>
<li>
<a href="#toc_42">RS 输入记录分隔符</a>
</li>
<li>
<a href="#toc_43">RSTART</a>
</li>
<li>
<a href="#toc_44">SUBSEP 数组子脚本的分隔符</a>
</li>
<li>
<a href="#toc_45"><strong>$ 0</strong> 代表了当前行</a>
</li>
<li>
<a href="#toc_46">$n</a>
</li>
</ul>
</li>
<li>
<a href="#toc_47">GNU AWK的变量</a>
<ul>
<li>
<a href="#toc_48">ARGIND</a>
</li>
<li>
<a href="#toc_49">BINMODE</a>
</li>
<li>
<a href="#toc_50">ERRORNO</a>
</li>
<li>
<a href="#toc_51">FIELDWIDTHS</a>
</li>
<li>
<a href="#toc_52">IGNORECASE</a>
</li>
<li>
<a href="#toc_53">LINT</a>
</li>
<li>
<a href="#toc_54">PROCINFO</a>
</li>
<li>
<a href="#toc_55">TEXTDOMAIN</a>
</li>
</ul>
</li>
</ul>
</li>
<li>
<a href="#toc_56">操作符</a>
<ul>
<li>
<a href="#toc_57">算数操作符</a>
</li>
<li>
<a href="#toc_58">增减运算符</a>
</li>
<li>
<a href="#toc_59">赋值操作符</a>
</li>
<li>
<a href="#toc_60">关系操作符</a>
</li>
<li>
<a href="#toc_61">逻辑操作符</a>
</li>
<li>
<a href="#toc_62">三元操作符</a>
</li>
<li>
<a href="#toc_63">一元操作符</a>
</li>
<li>
<a href="#toc_64">指数操作符</a>
</li>
<li>
<a href="#toc_65">字符串连接操作符</a>
</li>
<li>
<a href="#toc_66">数组成员操作符</a>
</li>
<li>
<a href="#toc_67">正则表达式操作符</a>
</li>
</ul>
</li>
<li>
<a href="#toc_68">正则表达式</a>
</li>
<li>
<a href="#toc_69">数组</a>
</li>
<li>
<a href="#toc_70">流程控制</a>
</li>
<li>
<a href="#toc_71">循环</a>
</li>
<li>
<a href="#toc_72">函数</a>
<ul>
<li>
<a href="#toc_73">内建函数</a>
<ul>
<li>
<a href="#toc_74">数学函数</a>
</li>
<li>
<a href="#toc_75">字符串函数</a>
</li>
<li>
<a href="#toc_76">时间函数</a>
</li>
<li>
<a href="#toc_77">字节操作函数</a>
</li>
<li>
<a href="#toc_78">其它</a>
</li>
</ul>
</li>
<li>
<a href="#toc_79">用户自定义函数</a>
</li>
</ul>
</li>
<li>
<a href="#toc_80">输出重定向</a>
<ul>
<li>
<a href="#toc_81">重定向操作符</a>
</li>
<li>
<a href="#toc_82">管道</a>
</li>
</ul>
</li>
<li>
<a href="#toc_83">美化输出</a>
</li>
<li>
<a href="#toc_84">执行shell命令</a>
<ul>
<li>
<a href="#toc_85">使用system函数</a>
</li>
<li>
<a href="#toc_86">使用管道</a>
</li>
</ul>
</li>
<li>
<a href="#toc_87">参考</a>
</li>
</ul>


<p>本文大部分内容翻译自我开始学习AWK时看到的一篇英文文章 <a href="https://www.tutorialspoint.com/awk/index.htm">AWK Tutorial</a> ，觉得对AWK入门非常有帮助，所以对其进行了粗略的翻译，并对其中部分内容进行了删减或者补充，希望能为对AWK感兴趣的小伙伴提供一份快速入门的教程，帮助小伙伴们快速掌握AWK的基本使用方式，当然，我也是刚开始学习AWK，本文在翻译或者补充的过程中肯定会有很多疏漏或者错误，希望大家能够帮忙指正。</p>

<p>本文将会持续修正和更新，最新内容请参考我的 <a href="https://github.com/mylxsw">GITHUB</a> 上的 <a href="https://github.com/mylxsw/growing-up">程序猿成长计划</a> 项目，欢迎 Star。</p>

<h2 id="toc_0">概述</h2>

<p>AWK是一门解释型的编程语言。在文本处理领域它是非常强大的，它的名字来源于它的三位作者的姓氏：<strong>Alfred Aho</strong>， <strong>Peter Weinberger</strong> 和 <strong>Brian Kernighan</strong>。</p>

<p>GNU/Linux发布的AWK目前由自由软件基金会（FSF）进行开发和维护，通常也称它为 <strong>GNU AWK</strong>。</p>

<h3 id="toc_1">AWK的类型</h3>

<p>下面是几个AWK的变体：</p>

<ul>
<li><strong>AWK</strong> - 原先来源于 AT &amp; T 实验室的的AWK</li>
<li><strong>NAWK</strong> - AT &amp; T 实验室的AWK的升级版</li>
<li><strong>GAWK</strong> - 这就是GNU AWK。所有的GNU/Linux发布版都自带GAWK，它与AWK和NAWK完全兼容</li>
</ul>

<h3 id="toc_2">AWK的典型用途</h3>

<p>使用AWK可以做很多任务，下面是其中一些</p>

<ul>
<li>文本处理</li>
<li>输出格式化的文本报表</li>
<li>执行算数运算</li>
<li>执行字符串操作等等</li>
</ul>

<h2 id="toc_3">工作流</h2>

<p>要成为AWK编程专家，你需要先知道它的内部实现机制，AWK遵循了非常简单的工作流 - <strong>读取</strong>，<strong>执行</strong>和<strong>重复</strong>，下图描述了AWK的工作流。</p>

<p><img src="https://oayrssjpa.qnssl.com/2016-10-31-14774633531266.jpg" alt=""/></p>

<p><strong>Read</strong></p>

<p>AWK从输入流（文件，管道或者标准输入）中读取一行，然后存储到内存中。</p>

<p><strong>Execute</strong></p>

<p>所有的AWK命令都依次在输入上执行。默认情况下，AWK会对每一行执行命令，我们可以通过提供模式限制这种行为。</p>

<p><strong>Repeat</strong></p>

<p>处理过程不断重复，直到到达文件结尾。</p>

<h3 id="toc_4">程序结构</h3>

<p>现在，让我们先学习一下AWK的程序结构。</p>

<h4 id="toc_5">BEGIN 语句块</h4>

<p>BEGIN语句块的语法</p>

<pre><code>BEGIN {awk-commands}
</code></pre>

<p>BEGIN语句块在程序开始的使用执行，它只执行一次，在这里可以初始化变量。BEGIN是AWK的关键字，因此它必须为大写，注意，这个语句块是可选的。</p>

<h4 id="toc_6">BODY 语句块</h4>

<p>BODY语句块的语法</p>

<pre><code>/pattern/ {awk-commands}
</code></pre>

<p>BODY语句块中的命令会对输入的每一行执行，我们也可以通过提供模式来控制这种行为。注意，BODY语句块没有关键字。</p>

<h4 id="toc_7">END 语句块</h4>

<p>END语句块的语法</p>

<pre><code>END {awk-commands}
</code></pre>

<p>END语句块在程序的最后执行，END是AWK的关键字，因此必须为大写，它也是可选的。</p>

<p>让我们创建一个包含序号，学生姓名，科目名称和得分的文件 <em>marks.txt</em>。</p>

<pre><code>1)  Amit    Physics  80
2)  Rahul   Maths    90
3)  Shyam   Biology  87
4)  Kedar   English  85
5)  Hari    History  89
</code></pre>

<p>下面的例子中我们将会显示文件内容，并且添加每一列的标题</p>

<pre><code>$ awk &#39;BEGIN{printf &quot;Sr No\tName\tSub\tMarks\n&quot;} {print}&#39; marks.txt
</code></pre>

<p>上述代码执行后，输出以下内容</p>

<pre><code>Sr No     Name     Sub          Marks
 1)       Amit     Physics      80
 2)       Rahul    Maths        90
 3)       Shyam    Biology      87
 4)       Kedar    English      85
 5)       Hari     History      89
</code></pre>

<p>在程序的开始，AWK在BEGIN语句中打印出标题。然后再BODY语句中，它会读取文件的每一行然后执行AWK的print命令将每一行的内容打印到标准输出。这个过程会一直重复直到文件的结尾。</p>

<h2 id="toc_8">基础语法</h2>

<p>AWK的使用非常简单，我们可以直接在命令行中执行AWK的命令，也可以从包含AWK命令的文本文件中执行。</p>

<h3 id="toc_9">AWK命令行</h3>

<p>我们可以使用单引号在命令行中指定AWK命令</p>

<pre><code>awk [options] file ...
</code></pre>

<p>比如我们有一个包含下面内容的文本文件 <em>marks.txt</em>:</p>

<pre><code>1) Amit     Physics    80
2) Rahul    Maths      90
3) Shyam    Biology    87
4) Kedar    English    85
5) Hari     History    89
</code></pre>

<p>我们可以使用下面的命令显示该文件的完整内容</p>

<pre><code>$ awk &#39;{print}&#39; marks.txt 
</code></pre>

<h3 id="toc_10">AWK程序文件</h3>

<p>我们可以使用脚本文件提供AWK命令</p>

<pre><code>awk [options] -f file ....
</code></pre>

<p>首先，创建一个包含下面内容的文本文件 <em>command.awk</em></p>

<pre><code>{print} 
</code></pre>

<p>现在，我们可以让AWK执行该文件中的命令，这里我们实现了和上例同样的结果</p>

<pre><code>$ awk -f command.awk marks.txt
</code></pre>

<h3 id="toc_11">AWK标准选项</h3>

<p>AWK支持下列命令行标准选项</p>

<h4 id="toc_12"><code>-v</code> 变量赋值选项</h4>

<p>该选项将一个值赋予一个变量，它会在程序开始之前进行赋值，下面的例子描述了该选项的使用</p>

<pre><code>$ awk -v name=Jerry &#39;BEGIN{printf &quot;Name = %s\n&quot;, name}&#39;
Name = Jerry
</code></pre>

<h4 id="toc_13"><code>--dump-variables[=file]</code> 选项</h4>

<p>该选项会输出排好序的全局变量列表和它们最终的值到文件中，默认的文件是 <strong>awkvars.out</strong>。</p>

<pre><code>$ awk --dump-variables &#39;&#39;
$ cat awkvars.out 
ARGC: 1
ARGIND: 0
ARGV: array, 1 elements
BINMODE: 0
CONVFMT: &quot;%.6g&quot;
ERRNO: &quot;&quot;
FIELDWIDTHS: &quot;&quot;
FILENAME: &quot;&quot;
FNR: 0
FPAT: &quot;[^[:space:]]+&quot;
FS: &quot; &quot;
IGNORECASE: 0
LINT: 0
NF: 0
NR: 0
OFMT: &quot;%.6g&quot;
OFS: &quot; &quot;
ORS: &quot;\n&quot;
RLENGTH: 0
RS: &quot;\n&quot;
RSTART: 0
RT: &quot;&quot;
SUBSEP: &quot;\034&quot;
TEXTDOMAIN: &quot;messages&quot;
</code></pre>

<h4 id="toc_14"><code>--help</code> 选项</h4>

<p>打印帮助信息。</p>

<pre><code>$ awk --help
Usage: awk [POSIX or GNU style options] -f progfile [--] file ...
Usage: awk [POSIX or GNU style options] [--] &#39;program&#39; file ...
POSIX options : GNU long options: (standard)
   -f progfile                --file=progfile
   -F fs                      --field-separator=fs
   -v var=val                 --assign=var=val
Short options : GNU long options: (extensions)
   -b                         --characters-as-bytes
   -c                         --traditional
   -C                         --copyright
   -d[file]                   --dump-variables[=file]
   -e &#39;program-text&#39;          --source=&#39;program-text&#39;
   -E file                    --exec=file
   -g                         --gen-pot
   -h                         --help
   -L [fatal]                 --lint[=fatal]
   -n                         --non-decimal-data
   -N                         --use-lc-numeric
   -O                         --optimize
   -p[file]                   --profile[=file]
   -P                         --posix
   -r                         --re-interval
   -S                         --sandbox
   -t                         --lint-old
   -V                         --version
</code></pre>

<h4 id="toc_15"><code>--lint[=fatal]</code> 选项</h4>

<p>该选项允许检查程序的不兼容性或者模棱两可的代码，当提供参数 <strong>fatal</strong>的时候，它会对待Warning消息作为Error。</p>

<pre><code>$ awk --lint &#39;&#39; /bin/ls
awk: cmd. line:1: warning: empty program text on command line
awk: cmd. line:1: warning: source file does not end in newline
awk: warning: no program text at all!
</code></pre>

<h4 id="toc_16"><code>--posix</code> 选项</h4>

<p>该选项开启严格的POSIX兼容。</p>

<h4 id="toc_17"><code>--profile[=file]</code>选项</h4>

<p>该选项会输出一份格式化之后的程序到文件中，默认文件是 <em>awkprof.out</em>。</p>

<pre><code>$ awk --profile &#39;BEGIN{printf&quot;---|Header|--\n&quot;} {print} 
END{printf&quot;---|Footer|---\n&quot;}&#39; marks.txt &gt; /dev/null 
$ cat awkprof.out
    # gawk 配置, 创建 Wed Oct 26 15:05:49 2016

    # BEGIN 块

    BEGIN {
        printf &quot;---|Header|--\n&quot;
    }

    # 规则

    {
        print $0
    }

    # END 块

    END {
        printf &quot;---|Footer|---\n&quot;
    }
</code></pre>

<h4 id="toc_18"><code>--traditional</code> 选项</h4>

<p>该选项会禁止所有的gawk规范的扩展。</p>

<h4 id="toc_19"><code>--version</code> 选项</h4>

<p>输出版本号</p>

<pre><code>$ awk --version
GNU Awk 3.1.7
版权所有 © 1989, 1991-2009 自由软件基金会(FSF)。

该程序为自由软件，你可以在自由软件基金会发布的 GNU 通用公共许可证(GPL)第
3版或以后版本下修改或重新发布。

该程序之所以被发布是因为希望他能对你有所用处，但我们不作任何担保。这包含
但不限于任何商业适售性以及针对特定目的的适用性的担保。详情参见 GNU 通用公
共许可证(GPL)。

你应该收到程序附带的一份 GNU 通用公共许可证(GPL)。如果没有收到，请参看 http://www.gnu.org/licenses/ 。
You have new mail in /var/spool/mail/root
</code></pre>

<h2 id="toc_20">基本使用示例</h2>

<p>本部分会讲述一些有用的AWK命令和它们的使用示例，所有的例子都是以下面的文本文件 <em>marks.txt</em> 为基础的</p>

<pre><code>1) Amit Physics     80
2) Rahul    Maths       90
3) Shyam    Biology     87
4) Kedar    English     85
5) Hari History     89
</code></pre>

<h3 id="toc_21">打印某列或者字段</h3>

<p>AWK可以只打印输入字段中的某些列。</p>

<pre><code>$ awk &#39;{print $3 &quot;\t&quot; $4}&#39; marks.txt
Physics 80
Maths   90
Biology 87
English 85
History 89
</code></pre>

<p>在文件<em>marks.txt</em>中，第三列包含了科目名，第四列则是得分，上面的例子中，我们只打印出了这两列，<strong>$3</strong> 和 <strong>$4</strong> 代表了输入记录中的第三和第四个字段。</p>

<h3 id="toc_22">打印所有的行</h3>

<p>默认情况下，AWK会打印出所有匹配模式的行</p>

<pre><code>$ awk &#39;/a/ {print $0}&#39; marks.txt
2)  Rahul   Maths    90
3)  Shyam   Biology  87
4)  Kedar   English  85
5)  Hari    History  89
</code></pre>

<p>上述命令会判断每一行中是否包含<code>a</code>，如果包含则打印该行，如果BODY部分缺失则默认会执行打印，因此，上述命令和下面这个是等价的</p>

<pre><code>$ awk &#39;/a/&#39; marks.txt
</code></pre>

<h3 id="toc_23">打印匹配模式的列</h3>

<p>当模式匹配成功时，默认情况下AWK会打印该行，但是也可以让它只打印指定的字段。例如，下面的例子中，只会打印出匹配模式的第三和第四个字段。</p>

<pre><code>$ awk &#39;/a/ {print $3 &quot;\t&quot; $4}&#39; marks.txt
Maths   90
Biology 87
English 85
History 89
</code></pre>

<h3 id="toc_24">任意顺序打印列</h3>

<pre><code>$ awk &#39;/a/ {print $4 &quot;\t&quot; $3}&#39; marks.txt
90  Maths
87  Biology
85  English
89  History
</code></pre>

<h3 id="toc_25">统计匹配模式的行数</h3>

<pre><code>$ awk &#39;/a/{++cnt} END {print &quot;Count = &quot;, cnt}&#39; marks.txt
Count =  4
</code></pre>

<h3 id="toc_26">打印超过18个字符的行</h3>

<pre><code>$ awk &#39;length($0) &gt; 18&#39; marks.txt
3) Shyam   Biology   87
4) Kedar   English   85
</code></pre>

<h2 id="toc_27">内建变量</h2>

<p>AWK提供了很多内置的变量，它们在开发AWK脚本的过程中起着非常重要的角色。</p>

<h3 id="toc_28">标准AWK变量</h3>

<h4 id="toc_29">ARGC 命令行参数个数</h4>

<p>命令行中提供的参数个数</p>

<pre><code>$ awk &#39;BEGIN {print &quot;Arguments =&quot;, ARGC}&#39; One Two Three Four
Arguments = 5
</code></pre>

<h4 id="toc_30">ARGV 命令行参数数组</h4>

<p>存储命令行参数的数组，索引范围从<strong>0</strong> - <strong>ARGC - 1</strong>。</p>

<pre><code>$ awk &#39;BEGIN { 
   for (i = 0; i &lt; ARGC - 1; ++i) { 
      printf &quot;ARGV[%d] = %s\n&quot;, i, ARGV[i] 
   } 
}&#39; one two three four
ARGV[0] = awk
ARGV[1] = one
ARGV[2] = two
ARGV[3] = three
</code></pre>

<h4 id="toc_31">CONVFMT 数字的约定格式</h4>

<p>代表了数字的约定格式，默认值是<strong>%.6g</strong></p>

<pre><code>$ awk &#39;BEGIN { print &quot;Conversion Format =&quot;, CONVFMT }&#39;
Conversion Format = %.6g
</code></pre>

<h4 id="toc_32">ENVIRON 环境变量</h4>

<p>环境变量的关联数组</p>

<pre><code>$ awk &#39;BEGIN { print ENVIRON[&quot;USER&quot;] }&#39;
mylxsw
</code></pre>

<h4 id="toc_33">FILENAME 当前文件名</h4>

<pre><code>$ awk &#39;END {print FILENAME}&#39; marks.txt
marks.txt
</code></pre>

<h4 id="toc_34">FS 输入字段的分隔符</h4>

<p>代表了输入字段的分隔符，默认值为<strong>空格</strong>，可以通过<code>-F</code>选项在命令行选项中修改它。</p>

<pre><code>$ awk &#39;BEGIN {print &quot;FS = &quot; FS}&#39; | cat -vte
FS =  $
$ awk -F , &#39;BEGIN {print &quot;FS = &quot; FS}&#39; | cat -vte
FS = ,$
</code></pre>

<h4 id="toc_35">NF 字段数目</h4>

<p>代表了当前行中的字段数目，例如下面例子打印出了包含大于两个字段的行</p>

<pre><code>$ echo -e &quot;One Two\nOne Two Three\nOne Two Three Four&quot; | awk &#39;NF &gt; 2&#39;
One Two Three
One Two Three Four
</code></pre>

<h4 id="toc_36">NR 行号</h4>

<pre><code>$ echo -e &quot;One Two\nOne Two Three\nOne Two Three Four&quot; | awk &#39;NR &lt; 3&#39;
One Two
One Two Three
</code></pre>

<h4 id="toc_37">FNR 行号（相对当前文件）</h4>

<p>与NR相似，不过在处理多文件时更有用，获取的行号相对于当前文件。</p>

<h4 id="toc_38">OFMT 输出格式数字</h4>

<p>默认值为<strong>%.6g</strong></p>

<pre><code>$ awk &#39;BEGIN {print &quot;OFMT = &quot; OFMT}&#39;
OFMT = %.6g
</code></pre>

<h4 id="toc_39">OFS 输出字段分隔符</h4>

<p>输出字段分隔符，默认为空格</p>

<pre><code>$ awk &#39;BEGIN {print &quot;OFS = &quot; OFS}&#39; | cat -vte
OFS =  $
</code></pre>

<h4 id="toc_40">ORS 输出行分隔符</h4>

<p>默认值为换行符</p>

<pre><code>$ awk &#39;BEGIN {print &quot;ORS = &quot; ORS}&#39; | cat -vte
ORS = $
$
</code></pre>

<h4 id="toc_41">RLENGTH</h4>

<p>代表了 <strong>match</strong> 函数匹配的字符串长度。</p>

<pre><code>$ awk &#39;BEGIN { if (match(&quot;One Two Three&quot;, &quot;re&quot;)) { print RLENGTH } }&#39;
2
</code></pre>

<h4 id="toc_42">RS 输入记录分隔符</h4>

<pre><code>$ awk &#39;BEGIN {print &quot;RS = &quot; RS}&#39; | cat -vte
RS = $
$
</code></pre>

<h4 id="toc_43">RSTART</h4>

<p><strong>match</strong>函数匹配的第一次出现位置</p>

<pre><code>$ awk &#39;BEGIN { if (match(&quot;One Two Three&quot;, &quot;Thre&quot;)) { print RSTART } }
9
</code></pre>

<h4 id="toc_44">SUBSEP 数组子脚本的分隔符</h4>

<p>数组子脚本的分隔符，默认为<strong>\034</strong></p>

<pre><code>$ awk &#39;BEGIN { print &quot;SUBSEP = &quot; SUBSEP }&#39; | cat -vte
SUBSEP = ^\$
</code></pre>

<h4 id="toc_45"><strong>$ 0</strong> 代表了当前行</h4>

<p>代表了当前行</p>

<pre><code>$ awk &#39;{print $0}&#39; marks.txt
1) Amit     Physics   80
2) Rahul    Maths     90
3) Shyam    Biology   87
4) Kedar    English   85
5) Hari     History   89
</code></pre>

<h4 id="toc_46">$n</h4>

<p>当前行中的第n个字段</p>

<pre><code>$ awk &#39;{print $3 &quot;\t&quot; $4}&#39; marks.txt
Physics   80
Maths     90
Biology   87
English   85
History   89
</code></pre>

<h3 id="toc_47">GNU AWK的变量</h3>

<h4 id="toc_48">ARGIND</h4>

<p>当前被处理的ARGV的索引</p>

<pre><code>$ awk &#39;{ 
   print &quot;ARGIND   = &quot;, ARGIND; print &quot;Filename = &quot;, ARGV[ARGIND] 
}&#39; junk1 junk2 junk3
ARGIND   =  1
Filename =  junk1
ARGIND   =  2
Filename =  junk2
ARGIND   =  3
Filename =  junk3
</code></pre>

<h4 id="toc_49">BINMODE</h4>

<p>在非POSIX系统上指定对所有的文件I/O采用二进制模式。</p>

<h4 id="toc_50">ERRORNO</h4>

<p>一个代表了<strong>getline</strong>跳转失败或者是<strong>close</strong>调用失败的错误的字符串。</p>

<pre><code>$ awk &#39;BEGIN { ret = getline &lt; &quot;junk.txt&quot;; if (ret == -1) print &quot;Error:&quot;, ERRNO }&#39;
Error: No such file or directory
</code></pre>

<h4 id="toc_51">FIELDWIDTHS</h4>

<p>设置了空格分隔的字段宽度变量列表的话，GAWK会将输入解析为固定宽度的字段，而不是使用<strong>FS</strong>进行分隔。</p>

<h4 id="toc_52">IGNORECASE</h4>

<p>设置了这个变量的话，AWK会忽略大小写。</p>

<pre><code>$ awk &#39;BEGIN{IGNORECASE = 1} /amit/&#39; marks.txt
1) Amit  Physics   80
</code></pre>

<h4 id="toc_53">LINT</h4>

<p>提供了对<strong>--lint</strong>选项的动态控制。</p>

<pre><code>$ awk &#39;BEGIN {LINT = 1; a}&#39;
awk: cmd. line:1: warning: reference to uninitialized variable `a&#39;
awk: cmd. line:1: warning: statement has no effect
</code></pre>

<h4 id="toc_54">PROCINFO</h4>

<p>包含进程信息的关联数组，例如UID，进程ID等</p>

<pre><code>$ awk &#39;BEGIN { print PROCINFO[&quot;pid&quot;] }&#39;
4316
</code></pre>

<h4 id="toc_55">TEXTDOMAIN</h4>

<p>代表了AWK的文本域，用于查找字符串的本地化翻译。</p>

<pre><code>$ awk &#39;BEGIN { print TEXTDOMAIN }&#39;
messages
</code></pre>

<h2 id="toc_56">操作符</h2>

<p>与其它编程语言一样，AWK也提供了大量的操作符。</p>

<h3 id="toc_57">算数操作符</h3>

<p>算数操作符不多说，直接看例子，无非就是<strong>+-*/%</strong></p>

<pre><code>$ awk &#39;BEGIN { a = 50; b = 20; print &quot;(a + b) = &quot;, (a + b) }&#39;
(a + b) =  70

$ awk &#39;BEGIN { a = 50; b = 20; print &quot;(a - b) = &quot;, (a - b) }&#39;
(a - b) =  30

$ awk &#39;BEGIN { a = 50; b = 20; print &quot;(a * b) = &quot;, (a * b) }&#39;
(a * b) =  1000

$ awk &#39;BEGIN { a = 50; b = 20; print &quot;(a / b) = &quot;, (a / b) }&#39;
(a / b) =  2.5

$ awk &#39;BEGIN { a = 50; b = 20; print &quot;(a % b) = &quot;, (a % b) }&#39;
(a % b) =  10
</code></pre>

<h3 id="toc_58">增减运算符</h3>

<p>自增自减与C语言一致。</p>

<pre><code>$ awk &#39;BEGIN { a = 10; b = ++a; printf &quot;a = %d, b = %d\n&quot;, a, b }&#39;
a = 11, b = 11

$ awk &#39;BEGIN { a = 10; b = --a; printf &quot;a = %d, b = %d\n&quot;, a, b }&#39;
a = 9, b = 9

$ awk &#39;BEGIN { a = 10; b = a++; printf &quot;a = %d, b = %d\n&quot;, a, b }&#39;
a = 11, b = 10

$ awk &#39;BEGIN { a = 10; b = a--; printf &quot;a = %d, b = %d\n&quot;, a, b }&#39;
a = 9, b = 10
</code></pre>

<h3 id="toc_59">赋值操作符</h3>

<pre><code>$ awk &#39;BEGIN { name = &quot;Jerry&quot;; print &quot;My name is&quot;, name }&#39;
My name is Jerry
$ awk &#39;BEGIN { cnt = 10; cnt += 10; print &quot;Counter =&quot;, cnt }&#39;
Counter = 20
$ awk &#39;BEGIN { cnt = 100; cnt -= 10; print &quot;Counter =&quot;, cnt }&#39;
Counter = 90
$ awk &#39;BEGIN { cnt = 10; cnt *= 10; print &quot;Counter =&quot;, cnt }&#39;
Counter = 100
$ awk &#39;BEGIN { cnt = 100; cnt /= 5; print &quot;Counter =&quot;, cnt }&#39;
Counter = 20
$ awk &#39;BEGIN { cnt = 100; cnt %= 8; print &quot;Counter =&quot;, cnt }&#39;
Counter = 4
$ awk &#39;BEGIN { cnt = 2; cnt ^= 4; print &quot;Counter =&quot;, cnt }&#39;
Counter = 16
$ awk &#39;BEGIN { cnt = 2; cnt **= 4; print &quot;Counter =&quot;, cnt }&#39;
Counter = 16
</code></pre>

<h3 id="toc_60">关系操作符</h3>

<pre><code>$ awk &#39;BEGIN { a = 10; b = 10; if (a == b) print &quot;a == b&quot; }&#39;
a == b
$ awk &#39;BEGIN { a = 10; b = 20; if (a != b) print &quot;a != b&quot; }&#39;
a != b
$ awk &#39;BEGIN { a = 10; b = 20; if (a &lt; b) print &quot;a  &lt; b&quot; }&#39;
a  &lt; b
$ awk &#39;BEGIN { a = 10; b = 10; if (a &lt;= b) print &quot;a &lt;= b&quot; }&#39;
a &lt;= b
$ awk &#39;BEGIN { a = 10; b = 20; if (b &gt; a ) print &quot;b &gt; a&quot; }&#39;
b &gt; a
</code></pre>

<h3 id="toc_61">逻辑操作符</h3>

<pre><code>$ awk &#39;BEGIN {
   num = 5; if (num &gt;= 0 &amp;&amp; num &lt;= 7) printf &quot;%d is in octal format\n&quot;, num
}&#39;
5 is in octal format
$ awk &#39;BEGIN {
   ch = &quot;\n&quot;; if (ch == &quot; &quot; || ch == &quot;\t&quot; || ch == &quot;\n&quot;)
   print &quot;Current character is whitespace.&quot;
}&#39;
Current character is whitespace.
$ awk &#39;BEGIN { name = &quot;&quot;; if (! length(name)) print &quot;name is empty string.&quot; }&#39;
name is empty string.
</code></pre>

<h3 id="toc_62">三元操作符</h3>

<pre><code>$ awk &#39;BEGIN { a = 10; b = 20; (a &gt; b) ? max = a : max = b; print &quot;Max =&quot;, max}&#39;
Max = 20
</code></pre>

<h3 id="toc_63">一元操作符</h3>

<pre><code>$ awk &#39;BEGIN { a = -10; a = +a; print &quot;a =&quot;, a }&#39;
a = -10
$ awk &#39;BEGIN { a = -10; a = -a; print &quot;a =&quot;, a }&#39;
a = 10
</code></pre>

<h3 id="toc_64">指数操作符</h3>

<pre><code>$ awk &#39;BEGIN { a = 10; a = a ^ 2; print &quot;a =&quot;, a }&#39;
a = 100

$ awk &#39;BEGIN { a = 10; a ^= 2; print &quot;a =&quot;, a }&#39;
a = 100
</code></pre>

<h3 id="toc_65">字符串连接操作符</h3>

<pre><code>$ awk &#39;BEGIN { str1 = &quot;Hello, &quot;; str2 = &quot;World&quot;; str3 = str1 str2; print str3 }&#39;
Hello, World
</code></pre>

<h3 id="toc_66">数组成员操作符</h3>

<pre><code>$ awk &#39;BEGIN { 
   arr[0] = 1; arr[1] = 2; arr[2] = 3; for (i in arr) printf &quot;arr[%d] = %d\n&quot;, i, arr[i]
}&#39;
arr[2] = 3
arr[0] = 1
arr[1] = 2
</code></pre>

<h3 id="toc_67">正则表达式操作符</h3>

<p>正则表达式操作符使用 <strong>~</strong> 和 <strong>!~</strong> 分别代表匹配和不匹配。</p>

<pre><code>$ awk &#39;$0 ~ 9&#39; marks.txt
2) Rahul   Maths    90
5) Hari    History  89

$ awk &#39;$0 !~ 9&#39; marks.txt
1) Amit     Physics   80
3) Shyam    Biology   87
4) Kedar    English   85

# 匹配正则表达式需要在表达式前后添加反斜线，与js类似吧
$ tail -n 40 /var/log/nginx/access.log | awk &#39;$0 ~ /ip\[127\.0\.0\.1\]/&#39;
</code></pre>

<blockquote>
<p>更多关于正则表达式请看后面的正则表达式部分</p>
</blockquote>

<h2 id="toc_68">正则表达式</h2>

<p>AWK在处理正则表达式方面是非常强大的，使用简单的正则表达式可以处理非常复杂的问题。</p>

<pre><code>$ echo -e &quot;cat\nbat\nfun\nfin\nfan&quot; | awk &#39;/f.n/&#39;
fun
fin
fan

$ echo -e &quot;This\nThat\nThere\nTheir\nthese&quot; | awk &#39;/^The/&#39;
There
Their

$ echo -e &quot;knife\nknow\nfun\nfin\nfan\nnine&quot; | awk &#39;/n$/&#39;
fun
fin
fan

$ echo -e &quot;Call\nTall\nBall&quot; | awk &#39;/[CT]all/&#39;
Call
Tall

$ echo -e &quot;Call\nTall\nBall&quot; | awk &#39;/[^CT]all/&#39;
Ball

$ echo -e &quot;Call\nTall\nBall\nSmall\nShall&quot; | awk &#39;/Call|Ball/&#39;
Call
Ball

$ echo -e &quot;Colour\nColor&quot; | awk &#39;/Colou?r/&#39;
Colour
Color

$ echo -e &quot;ca\ncat\ncatt&quot; | awk &#39;/cat*/&#39;
ca
cat
catt

$ echo -e &quot;111\n22\n123\n234\n456\n222&quot;  | awk &#39;/2+/&#39;
22
123
234
222

$ echo -e &quot;Apple Juice\nApple Pie\nApple Tart\nApple Cake&quot; | awk &#39;/Apple (Juice|Cake)/&#39;
Apple Juice
Apple Cake
</code></pre>

<h2 id="toc_69">数组</h2>

<p>AWK支持关联数组，也就是说，不仅可以使用数字索引的数组，还可以使用字符串作为索引，而且数字索引也不要求是连续的。数组不需要声明可以直接使用，语法如下：</p>

<pre><code>array_name[index] = value
</code></pre>

<p>创建数组的方式非常简单，直接为变量赋值即可</p>

<pre><code>$ awk &#39;BEGIN {
   fruits[&quot;mango&quot;] = &quot;yellow&quot;;
   fruits[&quot;orange&quot;] = &quot;orange&quot;
   print fruits[&quot;orange&quot;] &quot;\n&quot; fruits[&quot;mango&quot;]
}&#39;
orange
yellow
</code></pre>

<p>删除数组元素使用<code>delete</code>语句</p>

<pre><code>$ awk &#39;BEGIN {
   fruits[&quot;mango&quot;] = &quot;yellow&quot;;
   fruits[&quot;orange&quot;] = &quot;orange&quot;;
   delete fruits[&quot;orange&quot;];
   print fruits[&quot;orange&quot;]
}&#39;
</code></pre>

<p>在AWK中，只支持一维数组，但是可以通过一维数组模拟多维，例如我们有一个3x3的三维数组</p>

<pre><code>100   200   300
400   500   600
700   800   900
</code></pre>

<p>可以这样操作</p>

<pre><code>$ awk &#39;BEGIN {
   array[&quot;0,0&quot;] = 100;
   array[&quot;0,1&quot;] = 200;
   array[&quot;0,2&quot;] = 300;
   array[&quot;1,0&quot;] = 400;
   array[&quot;1,1&quot;] = 500;
   array[&quot;1,2&quot;] = 600;

   # print array elements
   print &quot;array[0,0] = &quot; array[&quot;0,0&quot;];
   print &quot;array[0,1] = &quot; array[&quot;0,1&quot;];
   print &quot;array[0,2] = &quot; array[&quot;0,2&quot;];
   print &quot;array[1,0] = &quot; array[&quot;1,0&quot;];
   print &quot;array[1,1] = &quot; array[&quot;1,1&quot;];
   print &quot;array[1,2] = &quot; array[&quot;1,2&quot;];
}&#39;
array[0,0] = 100
array[0,1] = 200
array[0,2] = 300
array[1,0] = 400
array[1,1] = 500
array[1,2] = 600
</code></pre>

<h2 id="toc_70">流程控制</h2>

<p>流程控制语句与大多数语言一样，基本格式如下</p>

<pre><code>if (condition)
   action

if (condition) {
   action-1
   action-1
   .
   .
   action-n
}

if (condition)
   action-1
else if (condition2)
   action-2
else
   action-3
</code></pre>

<p>例如：</p>

<pre><code>$ awk &#39;BEGIN {
   num = 11; if (num % 2 == 0) printf &quot;%d is even number.\n&quot;, num; 
      else printf &quot;%d is odd number.\n&quot;, num 
}&#39;

$ awk &#39;BEGIN {
   a = 30;

   if (a==10)
   print &quot;a = 10&quot;;
   else if (a == 20)
   print &quot;a = 20&quot;;
   else if (a == 30)
   print &quot;a = 30&quot;;
}&#39;
</code></pre>

<h2 id="toc_71">循环</h2>

<p>循环操作与其他C系语言一样，主要包括 <code>for</code>，<code>while</code>，<code>do...while</code>，<code>break</code>，<code>continue</code> 语句，当然，还有一个 <code>exit</code>语句用于退出脚本执行。</p>

<pre><code>for (initialisation; condition; increment/decrement)
   action

while (condition)
   action

do
   action
while (condition)
</code></pre>

<p>例子：</p>

<pre><code>$ awk &#39;BEGIN { for (i = 1; i &lt;= 5; ++i) print i }&#39;

$ awk &#39;BEGIN {i = 1; while (i &lt; 6) { print i; ++i } }&#39;

$ awk &#39;BEGIN {i = 1; do { print i; ++i } while (i &lt; 6) }&#39;

$ awk &#39;BEGIN {
   sum = 0; for (i = 0; i &lt; 20; ++i) { 
      sum += i; if (sum &gt; 50) break; else print &quot;Sum =&quot;, sum 
   } 
}&#39;

$ awk &#39;BEGIN {
   for (i = 1; i &lt;= 20; ++i) {
      if (i % 2 == 0) print i ; else continue
   } 
}&#39;

$ awk &#39;BEGIN {
   sum = 0; for (i = 0; i &lt; 20; ++i) {
      sum += i; if (sum &gt; 50) exit(10); else print &quot;Sum =&quot;, sum 
   } 
}&#39;
</code></pre>

<blockquote>
<p><code>exit</code>用于退出脚本，参数为退出的状态码，可以通过shell中的<code>$?</code>获取</p>
</blockquote>

<h2 id="toc_72">函数</h2>

<h3 id="toc_73">内建函数</h3>

<p>AWK提供了很多方便的内建函数供编程人员使用。由于函数比较多，个人觉得单纯看每个函数的使用也没有什么实际意义，比较容易遗忘，因此，这里只简单的列出常用的一些函数，只需要对其有个印象即可，使用的时候再去 <a href="https://www.gnu.org/software/gawk/manual/gawk.html#Built_002din">查手册</a> 效果会更好一些吧。</p>

<h4 id="toc_74">数学函数</h4>

<ul>
<li><code>atan2(y, x)</code> </li>
<li><code>cos(expr)</code> </li>
<li><code>exp(expr)</code> </li>
<li><code>int(expr)</code> </li>
<li><code>log(expr)</code> </li>
<li><code>rand</code> </li>
<li><code>sin(expr)</code> </li>
<li><code>sqrt(expr)</code> </li>
<li><code>srand([expr])</code> </li>
</ul>

<h4 id="toc_75">字符串函数</h4>

<ul>
<li><code>asort(arr [, d [, how] ])</code> </li>
<li><code>asorti(arr [, d [, how] ])</code> </li>
<li><code>gsub(regex, sub, string)</code> </li>
<li><code>index(str, sub)</code> </li>
<li><code>length(str)</code> </li>
<li><code>match(str, regex)</code> </li>
<li><code>split(str, arr, regex)</code> </li>
<li><code>sprintf(format, expr-list)</code> </li>
<li><code>strtonum(str)</code> </li>
<li><code>sub(regex, sub, string)</code> </li>
<li><code>substr(str, start, l)</code> </li>
<li><code>tolower(str)</code> </li>
<li><code>toupper(str)</code></li>
</ul>

<h4 id="toc_76">时间函数</h4>

<ul>
<li><code>systime</code> </li>
<li><code>mktime(datespec)</code> </li>
<li><code>strftime([format [, timestamp[, utc-flag]]])</code> </li>
</ul>

<h4 id="toc_77">字节操作函数</h4>

<ul>
<li><code>and</code> </li>
<li><code>compl</code> </li>
<li><code>lshift</code> </li>
<li><code>rshift</code> </li>
<li><code>or</code> </li>
<li><code>xor</code> </li>
</ul>

<h4 id="toc_78">其它</h4>

<ul>
<li><p><code>close(expr)</code> 关闭管道文件</p>

<p>请看下面这段代码</p>

<pre><code>$ awk &#39;BEGIN {
   cmd = &quot;tr [a-z] [A-Z]&quot;
   print &quot;hello, world !!!&quot; |&amp; cmd

   close(cmd, &quot;to&quot;)
   cmd |&amp; getline out
   print out;

   close(cmd);
}&#39;
HELLO, WORLD !!!
</code></pre>

<p>是不是感觉很难懂？让我来解释一下</p>

<ul>
<li>第一个语句<code>cmd = &quot;tr [a-z] [A-Z]&quot;</code>是我们在AWK中要用来建立双向连接的命令。</li>
<li>第二个语句<code>print</code>提供了<code>tr</code>命令的输入，使用 <strong>&amp;|</strong> 表名建立双向连接。</li>
<li>第三个语句<code>close(cmd, &quot;to&quot;)</code>用于执行完成后关闭<strong>to</strong>进程</li>
<li>第四个语句<code>cmd |&amp; getline out</code>使用<code>getline</code>函数存储输出到<strong>out</strong>变量</li>
<li>接下来打印变量out的内容，然后关闭cmd</li>
</ul></li>
<li><p><code>delete</code>  用于删除数组元素</p></li>
<li><p><code>exit</code>  退出脚本执行，并返回状态码参数</p></li>
<li><p><code>fflush</code>  </p></li>
<li><p><code>getline</code> 该命令让awk读取下一行内容</p>

<p>该命令让awk读取下一行内容，比如</p>

<pre><code>$ awk &#39;{getline; print $0}&#39; marks.txt
2) Rahul   Maths     90
4) Kedar   English   85
5) Hari    History   89
</code></pre>

<p>使用<code>getline var &lt; file</code>可以从file中读取输入，存储到变量var中</p>

<pre><code>{
     if (NF == 2 &amp;&amp; $1 == &quot;@include&quot;) {
          while ((getline line &lt; $2) &gt; 0)
               print line
          # 这里的close确保如果文件中两个@include，可以让其读取两次
          close($2)
     } else
          print
}
</code></pre>

<p>命令的输出也可以通过管道输入到<code>getline</code>，使用<code>command | getline</code>这种方式。在这种情况下，字符串命令会作为shell命令执行，其标准输出会通过管道传递个awk作为其输入，这种形式的getline会从管道中一次读取一条记录。例如下面的命令会从输入中逐行读取，如果遇到<code>@execute</code>，则将该行作为命令执行，将命令的输出作为最终的输出内容</p>

<pre><code>{
     if ($1 == &quot;@execute&quot;) {
          tmp = substr($0, 10)        # Remove &quot;@execute&quot;
          while ((tmp | getline) &gt; 0)
               # 这里实际上设置了$0为这一行的内容
               print
          close(tmp)
     } else
          print
}
</code></pre>

<p>如果文件包含以下内容</p>

<pre><code>foo
bar
baz
@execute who
bletch
</code></pre>

<p>则会输出</p>

<pre><code>foo
bar
baz
arnold     ttyv0   Jul 13 14:22
miriam     ttyp0   Jul 13 14:23     (murphy:0)
bill       ttyp1   Jul 13 14:23     (murphy:0)
bletch
</code></pre>

<p>使用<code>command | getline var</code>可以实现将命令的输出写入到变量var。</p>

<pre><code>BEGIN {
     &quot;date&quot; | getline current_time
     close(&quot;date&quot;)
     print &quot;Report printed on &quot; current_time
}
</code></pre>

<p><code>getline</code>使用管道读取输入是一种单向的操作，在某些场景下，你可能希望发送数据到另一个进程，然后从这个进程中读取处理后的结果，  这就用到了协同进程，我们可以使用<code>|&amp;</code>打开一个双向管道。</p>

<pre><code>print &quot;some query&quot; |&amp; &quot;db_server&quot;
&quot;db_server&quot; |&amp; getline
</code></pre>

<p>同样，我们也可以使用<code>command |&amp; getline var</code>将协同进程的输出写入到变量var。</p></li>
<li><p><code>next</code> </p></li>
<li><p><code>nextfile</code> </p></li>
<li><p><code>return</code> </p>

<p>用于用户自定义函数的返回值。<br/>
首先，创建一个<strong>functions.awk</strong>文件，包含下面的awk命令</p>

<pre><code>function addition(num1, num2) {
   result = num1 + num2
   return result
}
BEGIN {
   res = addition(10, 20)
   print &quot;10 + 20 = &quot; res
}
</code></pre>

<p>执行上述代码，输出</p>

<pre><code>10 + 20 = 30
</code></pre></li>
<li><p><code>system</code> </p>

<p>该函数用于执行指定的命令并且返回它的退出状态，返回状态码0表示命令成功执行。</p>

<pre><code>$ awk &#39;BEGIN { ret = system(&quot;date&quot;); print &quot;Return value = &quot; ret }&#39;
2016年 10月 27日 星期四 22:08:36 CST
Return value = 0
</code></pre></li>
</ul>

<h3 id="toc_79">用户自定义函数</h3>

<p>函数是程序基本的组成部分，AWK允许我们自己创建自定义的函数。一个大型的程序可以被划分为多个函数，每个函数之间可以独立的开发和测试，提供可重用的代码。</p>

<p>下面是用户自定义函数的基本语法</p>

<pre><code>function function_name(argument1, argument2, ...) { 
   function body
}
</code></pre>

<p>例如，我们创建一个名为functions.awk的文件，包含下面的代码</p>

<pre><code># Returns minimum number
function find_min(num1, num2){
   if (num1 &lt; num2)
   return num1
   return num2
}
# Returns maximum number
function find_max(num1, num2){
   if (num1 &gt; num2)
   return num1
   return num2
}
# Main function
function main(num1, num2){
   # Find minimum number
   result = find_min(10, 20)
   print &quot;Minimum =&quot;, result

   # Find maximum number
   result = find_max(10, 20)
   print &quot;Maximum =&quot;, result
}
# Script execution starts here
BEGIN {
   main(10, 20)
}
</code></pre>

<p>执行上述代码，会得到下面的输出</p>

<pre><code>Minimum = 10
Maximum = 20
</code></pre>

<h2 id="toc_80">输出重定向</h2>

<h3 id="toc_81">重定向操作符</h3>

<p>到目前为止，我们所有的程序都是直接显示数据到了标准输出流，其实，我们也可以将输出重定向到文件。重定向操作符跟在<code>print</code>和<code>printf</code>函数的后面，与shell中的用法基本一致。</p>

<pre><code>print DATA &gt; output-file
print DATA &gt;&gt; output-file
</code></pre>

<p>例如，下面两条命令输出是一致的</p>

<pre><code>$ echo &quot;Hello, World !!!&quot; &gt; /tmp/message.txt
$ awk &#39;BEGIN { print &quot;Hello, World !!!&quot; &gt; &quot;/tmp/message.txt&quot; }&#39;
</code></pre>

<blockquote>
<p>与shell中一样，<code>&gt;</code>用于将输出写入到指定的文件中，如果文件中有内容则覆盖，而<code>&gt;&gt;</code>则为追加模式写入。</p>
</blockquote>

<pre><code>$ awk &#39;BEGIN { print &quot;Hello, World !!!&quot; &gt;&gt; &quot;/tmp/message.txt&quot; }&#39;
$ cat /tmp/message.txt
</code></pre>

<h3 id="toc_82">管道</h3>

<p>除了将输出重定向到文件之外，我们还可以将输出重定向到其它程序，与shell中一样，我们可以使用管道操作符<code>|</code>。</p>

<pre><code>$ awk &#39;BEGIN { print &quot;hello, world !!!&quot; | &quot;tr [a-z] [A-Z]&quot; }&#39;
HELLO, WORLD !!!
</code></pre>

<p>AWK中可以使用<code>|&amp;</code>进行<strong>双向连接</strong>，那么什么是双向连接呢？一种常见的场景是我们发送数据到另一个程序处理，然后读取处理结果，这种场景下就需要打开一个到另外一个进程的双向管道了。第二个进程会与<strong>gawk</strong>程序并行执行，这里称其为 <strong>协作进程</strong>。与单向连接使用<code>|</code>操作符不同的是，双向连接使用<code>|&amp;</code>操作符。</p>

<pre><code>do {
    print data |&amp; &quot;subprogram&quot;
    &quot;subprogram&quot; |&amp; getline results
} while (data left to process)
close(&quot;subprogram&quot;)
</code></pre>

<p>第一次I/O操作使用了<code>|&amp;</code>操作符，gawk会创建一个到运行其它程序的子进程的双向管道，<code>print</code>的输出被写入到了<code>subprogram</code>的标准输入，而这个<code>subprogram</code>的标准输出在gawk中使用<code>getline</code>函数进行读取。</p>

<blockquote>
<p>注意：目前协同进程的标准错误输出将会和gawk的标准错误输出混杂在一起，无法单独获取标准错误输出。另外，I/O缓冲可能存在问题，gawk程序会自动的刷新所有输出到下游的协同进程的管道。但是，如果协同进程没有刷新其标准输出的话，gawk将可能会在使用<code>getline</code>函数从协同进程读取输出的时候挂起，这就可能引起死锁。</p>
</blockquote>

<p>我们可以使用<code>close</code>函数关闭双向管道的<strong>to</strong>或者<strong>from</strong>一端，这两个字符串值告诉gawk发送数据到协同进程完成时或者从协同进程读取完毕时关闭管道。在使用系统命令<code>sort</code>的时候是这样做是非常必要的，因为它必须等所有输出都读取完毕时才能进行排序。</p>

<pre><code>BEGIN {
    command = &quot;LC_ALL=C sort&quot;
    n = split(&quot;abcdefghijklmnopqrstuvwxyz&quot;, a, &quot;&quot;)

    for (i = n; i &gt; 0; i--)
        print a[i] |&amp; command
    close(command, &quot;to&quot;)

    while ((command |&amp; getline line) &gt; 0)
        print &quot;got&quot;, line
    close(command)
}
</code></pre>

<p>例如，下面的例子中使用<code>tr</code>命令转换小写为大写。我们的<strong>command.awk</strong>文件包含以下内容</p>

<pre><code>BEGIN {
   cmd = &quot;tr [a-z] [A-Z]&quot;
   print &quot;hello, world !!!&quot; |&amp; cmd
   close(cmd, &quot;to&quot;)

   cmd |&amp; getline out
   print out;
   close(cmd);
}
</code></pre>

<p>输出 </p>

<pre><code>HELLO, WORLD !!!
</code></pre>

<p>上例看起来有些复杂，我们逐行分析一下</p>

<ul>
<li>首先，第一行 <strong>cmd = &quot;tr [a-z] [A-Z]&quot;</strong> 是在AWK中要建立双向连接的命令</li>
<li>第二行的<strong>print</strong>命令用于为<strong>tr</strong>命令提供输入，而 <code>|&amp;</code> 用于指出要建立双向连接</li>
<li>第三行用于在上面的语句<strong>close(cmd, &quot;to&quot;),</strong>在执行完成后关闭其<strong>to</strong>进程</li>
<li>第四行 <strong>cmd |&amp; getline out</strong>使用getline函数存储输出到变量out中</li>
<li>最后一行使用<strong>close</strong>函数关闭命令</li>
</ul>

<h2 id="toc_83">美化输出</h2>

<p>到目前为止，我们已经使用过<code>print</code>和<code>printf</code>函数显示数据到标准输出，但是<code>printf</code>函数实际上要比我们之前使用的情况更加强大得多。该函数是从C语言中借鉴来的，在处理格式化的输出时非常有用。</p>

<pre><code>$ awk &#39;BEGIN { printf &quot;Hello\nWorld\n&quot; }&#39;
Hello
World

$ awk &#39;BEGIN { printf &quot;ASCII value 65 = character %c\n&quot;, 65 }&#39;
ASCII value 65 = character A
</code></pre>

<blockquote>
<p>格式化输出标识有 <code>%c</code>， <code>%d</code>，<code>%s</code> 等，基本与C语言一致，这里就不多赘述了。</p>
</blockquote>

<h2 id="toc_84">执行shell命令</h2>

<p>在AWK中执行shell命令有两种方式</p>

<ul>
<li>使用<code>system</code>函数</li>
<li>使用管道</li>
</ul>

<h3 id="toc_85">使用system函数</h3>

<p><strong>system</strong>函数用于执行操作系统命令并且返回命令的退出码到awk。</p>

<pre><code>END {
     system(&quot;date | mail -s &#39;awk run done&#39; root&quot;)
}
</code></pre>

<h3 id="toc_86">使用管道</h3>

<p>如果要执行的命令很多，可以将输出的命令直接用管道传递给<strong>&quot;/bin/sh&quot;</strong>执行</p>

<pre><code>while (more stuff to do)
    print command | &quot;/bin/sh&quot;
close(&quot;/bin/sh&quot;)
</code></pre>

<h2 id="toc_87">参考</h2>

<ul>
<li><a href="https://www.tutorialspoint.com/awk/index.htm">AWK Tutorial</a></li>
<li><a href="https://www.gnu.org/software/gawk/manual/gawk.html">The GNU Awk User&#39;s Guide</a></li>
</ul>

<p>本文将会持续修正和更新，最新内容请参考我的 <a href="https://github.com/mylxsw">GITHUB</a> 上的 <a href="https://github.com/mylxsw/growing-up">程序猿成长计划</a> 项目，欢迎 Star。</p>