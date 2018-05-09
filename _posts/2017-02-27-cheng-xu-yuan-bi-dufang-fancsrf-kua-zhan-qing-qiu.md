---
ID: 177
post_title: >
  程序猿必读-防范CSRF跨站请求伪造
author: mylxsw
post_excerpt: ""
layout: post
permalink: >
  https://aicode.cc/cheng-xu-yuan-bi-dufang-fancsrf-kua-zhan-qing-qiu.html
published: true
post_date: 2017-02-27 22:04:21
---

<p>CSRF（Cross-site request forgery，中文为<strong>跨站请求伪造</strong>）是一种利用网站可信用户的权限去执行未授权的命令的一种恶意攻击。通过<strong>伪装可信用户的请求来利用信任该用户的网站</strong>，这种攻击方式虽然不是很流行，但是却难以防范，其危害也不比其他安全漏洞小。</p>

<p>本文将简要介绍CSRF产生的原因以及利用方式，然后对如何避免这种攻击方式提供一些可供参考的方案，希望广大程序猿们都能够对这种攻击方式有所了解，避免自己开发的应用被别人利用。</p>

<blockquote>
<p>CSRF也称作<strong>one-click attack</strong>或者<strong>session riding</strong>，其简写有时候也会使用<strong>XSRF</strong>。</p>
</blockquote>

<ul>
<li>
<a href="#toc_0">什么是CSRF？</a>
</li>
<li>
<a href="#toc_1">CSRF有哪些危害</a>
</li>
<li>
<a href="#toc_2">产生原理以及利用方式</a>
<ul>
<li>
<a href="#toc_3">利用方式</a>
<ul>
<li>
<a href="#toc_4">GET请求利用</a>
</li>
<li>
<a href="#toc_5">POST请求利用</a>
</li>
</ul>
</li>
</ul>
</li>
<li>
<a href="#toc_6">如何防范</a>
<ul>
<li>
<a href="#toc_7">防范原理</a>
</li>
<li>
<a href="#toc_8">防范技术</a>
<ul>
<li>
<a href="#toc_9">Synchronizer token pattern</a>
</li>
<li>
<a href="#toc_10">Cookie-to-Header Token</a>
</li>
<li>
<a href="#toc_11">验证码</a>
</li>
</ul>
</li>
<li>
<a href="#toc_12">简单实现STP</a>
</li>
<li>
<a href="#toc_13">解析Laravel框架中的VerifyCsrfToken中间件</a>
</li>
</ul>
</li>
<li>
<a href="#toc_14">写在最后</a>
</li>
<li>
<a href="#toc_15">参考</a>
</li>
</ul>


<p>本文将会持续修正和更新，最新内容请参考我的 <a href="https://github.com/mylxsw">GITHUB</a> 上的 <a href="https://github.com/mylxsw/growing-up">程序猿成长计划</a> 项目，欢迎 Star，更多精彩内容请 <a href="https://github.com/mylxsw">follow me</a>。</p>

<h2 id="toc_0">什么是CSRF？</h2>

<p>简单点说，CSRF攻击就是 <strong>攻击者利用受害者的身份，以受害者的名义发送恶意请求</strong>。与XSS（Cross-site scripting，跨站脚本攻击）不同的是，XSS的目的是获取用户的身份信息，攻击者窃取到的是用户的身份（session/cookie），而CSRF则是利用用户当前的身份去做一些未经过授权的操作。</p>

<p>CSRF攻击最早在2001年被发现，由于它的请求是从用户的IP地址发起的，因此在服务器上的web日志中可能无法检测到是否受到了CSRF攻击，正是由于它的这种隐蔽性，很长时间以来都没有被公开的报告出来，直到2007年才真正的被人们所重视。</p>

<h2 id="toc_1">CSRF有哪些危害</h2>

<p>CSRF可以盗用受害者的身份，完成受害者在web浏览器有权限进行的任何操作，想想吧，能做的事情太多了。</p>

<ul>
<li>以你的名义发送诈骗邮件，消息</li>
<li>用你的账号购买商品</li>
<li>用你的名义完成虚拟货币转账</li>
<li>泄露个人隐私</li>
<li>...</li>
</ul>

<h2 id="toc_2">产生原理以及利用方式</h2>

<p>要完成一个CSRF攻击，必须具备以下几个条件：</p>

<ul>
<li>受害者已经登录到了目标网站（你的网站）并且没有退出</li>
<li>受害者有意或者无意的访问了攻击者发布的页面或者链接地址</li>
</ul>

<p><img src="https://oayrssjpa.qnssl.com/2017-02-27-14882028931608.jpg" alt=""/></p>

<p>（图片来自网络，出处不明，百度来的😂）</p>

<p>整个步骤大致是这个样子的：</p>

<ol>
<li>用户小明在你的网站A上面登录了，A返回了一个session ID（使用cookie存储）</li>
<li>小明的浏览器保持着在A网站的登录状态，事实上几乎所有的网站都是这样做的，一般至少是用户关闭浏览器之前用户的会话是不会结束的</li>
<li>攻击者小强给小明发送了一个链接地址，小明打开了这个地址，查看了网页的内容</li>
<li>小明在打开这个地址的时候，这个页面已经自动的对网站A发送了一个请求，这时候因为A网站没有退出，因此只要请求的地址是A的就会携带A的cookie信息，也就是使用A与小明之间的会话</li>
<li>这时候A网站肯定是不知道这个请求其实是小强伪造的网页上发送的，而是误以为小明就是要这样操作，这样小强就可以随意的更改小明在A上的信息，以小明的身份在A网站上进行操作</li>
</ol>

<h3 id="toc_3">利用方式</h3>

<p>利用CSRF攻击，主要包含两种方式，一种是基于GET请求方式的利用，另一种是基于POST请求方式的利用。</p>

<h4 id="toc_4">GET请求利用</h4>

<p>使用GET请求方式的利用是最简单的一种利用方式，其隐患的来源主要是由于在开发系统的时候没有按照HTTP动词的正确使用方式来使用造成的。<strong>对于GET请求来说，它所发起的请求应该是只读的，不允许对网站的任何内容进行修改</strong>。</p>

<p>但是事实上并不是如此，很多网站在开发的时候，研发人员错误的认为GET/POST的使用区别仅仅是在于发送请求的数据是在Body中还是在请求地址中，以及请求内容的大小不同。对于一些危险的操作比如删除文章，用户授权等允许使用GET方式发送请求，在请求参数中加上文章或者用户的ID，这样就造成了只要请求地址被调用，数据就会产生修改。</p>

<p>现在假设攻击者（用户ID=121）想将自己的身份添加为网站的管理员，他在网站A上面发了一个帖子，里面包含一张图片，其地址为<code>http://a.com/user/grant_super_user/121</code></p>

<pre><code>&lt;img src=&quot;http://a.com/user/grant_super_user/121&quot; /&gt;
</code></pre>

<p>设想管理员看到这个帖子的时候，这个图片肯定会自动加载显示的。于是在管理员不知情的情况下，一个赋予用户管理员权限的操作已经悄悄的以他的身份执行了。这时候攻击者121就获取到了网站的管理员权限。</p>

<h4 id="toc_5">POST请求利用</h4>

<p>相对于GET方式的利用，POST方式的利用更加复杂一些，难度也大了一些。攻击者需要伪造一个能够自动提交的表单来发送POST请求。</p>

<pre><code>&lt;script&gt;
$(function() {
    $(&#39;#csrf_form&#39;).trigger(&#39;submit&#39;);
});
&lt;/script&gt;
&lt;form action=&quot;http://a.com/user/grant_super_user&quot; id=&quot;csrf_form&quot; method=&quot;post&quot;&gt;
    &lt;input name=&quot;uid&quot; value=&quot;121&quot; type=&quot;hidden&quot;&gt;
&lt;/form&gt;
</code></pre>

<p>只要想办法实现用户访问的时候自动提交表单就可以了。</p>

<h2 id="toc_6">如何防范</h2>

<h3 id="toc_7">防范原理</h3>

<p>防范Csrf攻击，其实本质就是要求网站<strong>能够识别出哪些请求是非正常用户主动发起的</strong>。这就要求我们<strong>在请求中嵌入一些额外的授权数据，让网站服务器能够区分出这些未授权的请求</strong>，比如说在请求参数中添加一个字段，这个字段的值从登录用户的Cookie或者页面中获取的（这个字段的值必须对每个用户来说是随机的，不能有规律可循）。攻击者伪造请求的时候是无法获取页面中与登录用户有关的一个随机值或者用户当前cookie中的内容的，因此就可以避免这种攻击。</p>

<h3 id="toc_8">防范技术</h3>

<h4 id="toc_9">Synchronizer token pattern</h4>

<p>令牌同步模式（Synchronizer token pattern，简称STP）是在用户请求的页面中的所有表单中嵌入一个token，在服务端验证这个token的技术。token可以是任意的内容，但是一定要保证无法被攻击者猜测到或者查询到。攻击者在请求中无法使用正确的token，因此可以判断出未授权的请求。</p>

<h4 id="toc_10">Cookie-to-Header Token</h4>

<p>对于使用Js作为主要交互技术的网站，将csrf的token写入到cookie中</p>

<pre><code>Set-Cookie: Csrf-token=i8XNjC4b8KVok4uw5RftR38Wgp2BFwql; expires=Thu, 23-Jul-2015 10:25:33 GMT; Max-Age=31449600; Path=/
</code></pre>

<p>然后使用javascript读取token的值，在发送http请求的时候将其作为请求的header</p>

<pre><code>X-Csrf-Token: i8XNjC4b8KVok4uw5RftR38Wgp2BFwql
</code></pre>

<p>最后服务器验证请求头中的token是否合法。</p>

<h4 id="toc_11">验证码</h4>

<p>使用验证码可以杜绝Csrf攻击，但是这种方式要求每个请求都输入一个验证码，显然没有哪个网站愿意使用这种粗暴的方式，用户体验太差，用户会疯掉的。</p>

<h3 id="toc_12">简单实现STP</h3>

<p>首先在index.php中，创建一个表单，在表单中，我们将session中存储的token放入到隐藏域，这样，表单提交的时候token会随表单一起提交</p>

<pre><code>&lt;?php
$token = sha1(uniqid(rand(), true));
$_SESSION[&#39;token&#39;] = $token;
?&gt;
&lt;form action=&quot;buy.php&quot; method=&quot;post&quot;&gt;
    &lt;input type=&quot;hidden&quot; name=&quot;token&quot; value=&quot;&lt;?=$token; ?&gt;&quot; /&gt;
    ... 表单内容
&lt;/form&gt;
</code></pre>

<p>在服务端校验请求参数的<code>buy.php</code>中，对表单提交过来的token与session中存储的token进行比对，如果一致说明token是有效的</p>

<pre><code>&lt;?php
if ($_POST[&#39;token&#39;] != $_SESSION[&#39;token&#39;]) {
    // TOKEN无效
    throw new \Exception(&#39;Token无效，请求为伪造请求&#39;);
}
// TOKEN有效，表单内容处理
</code></pre>

<p>对于攻击者来说，在伪造请求的时候是无法获取到用户页面中的这个<code>token</code>值的，因此就可以识别出其创建的伪造请求。</p>

<h3 id="toc_13">解析Laravel框架中的VerifyCsrfToken中间件</h3>

<p>在Laravel框架中，使用了<code>VerifyCsrfToken</code>这个中间件来防范CSRF攻击。</p>

<p>在页面的表单中使用<code>{{ csrf_field() }}</code>来生成token，该函数会在表单中添加一个名为<code>_token</code>的隐藏域，该隐藏域的值为Laravel生成的token，Laravel使用随机生成的40个字符作为防范csrf攻击的token。</p>

<pre><code>$this-&gt;put(&#39;_token&#39;, Str::random(40));
</code></pre>

<p>如果请求是ajax异步请求，可以在<code>meta</code>标签中添加token</p>

<pre><code>&lt;meta name=&quot;csrf-token&quot; content=&quot;{{ csrf_token() }}&quot;&gt;
</code></pre>

<p>使用<code>jquery</code>作为前端的框架时候，可以通过以下配置将该值添加到所有的异步请求头中</p>

<pre><code>$.ajaxSetup({
    headers: {
        &#39;X-CSRF-TOKEN&#39;: $(&#39;meta[name=&quot;csrf-token&quot;]&#39;).attr(&#39;content&#39;)
    }
});
</code></pre>

<p>在启用session的时候，Laravel会生成一个名为<code>_token</code>的值存储到session中。而使用前面两种方式在页面中加入的token就是使用的这一个值。在用户请求到来时，<code>VerifyCsrfToken</code>中间件会对符合条件的请求进行Csrf检查</p>

<pre><code>if (
  $this-&gt;isReading($request) ||
  $this-&gt;runningUnitTests() ||
  $this-&gt;shouldPassThrough($request) ||
  $this-&gt;tokensMatch($request)
) {
  return $this-&gt;addCookieToResponse($request, $next($request));
}

throw new TokenMismatchException;
</code></pre>

<p>在<code>if</code>语句中有四个条件，只要任何一个条件结果为<code>true</code>则任何该请求是合法的，否则就会抛出<code>TokenMismatchException</code>异常，告诉用户请求不合法，存在Csrf攻击。</p>

<p>第一个条件<code>$this-&gt;isReading($request)</code>用来检查请求是否会对数据产生修改</p>

<pre><code>protected function isReading($request)
{
    return in_array($request-&gt;method(), [&#39;HEAD&#39;, &#39;GET&#39;, &#39;OPTIONS&#39;]);
}
</code></pre>

<p>这里判断了请求方式，如果是<code>HEAD</code>，<code>GET</code>，<code>OPTIONS</code>这三种请求方式则直接放行。你可能会感到疑惑，为什么GET请求也要放行呢？这是因为Laravel认为这三个请求都是请求查询数据的，<strong>如果一个请求是使用GET方式，那无论请求多少次，无论请求参数如何，都不应该最数据做任何修改</strong>。</p>

<p>第二个条件顾名思义是对单元测试进行放行，第三个是为开发者提供了一个可以对某些请求添加例外的功能，最后一个<code>$this-&gt;tokensMatch($request)</code>则是真正起作用的一个，它是Laravel防范Csrf攻击的关键</p>

<pre><code>$sessionToken = $request-&gt;session()-&gt;token();
$token = $request-&gt;input(&#39;_token&#39;) ?: $request-&gt;header(&#39;X-CSRF-TOKEN&#39;);

if (! $token &amp;&amp; $header = $request-&gt;header(&#39;X-XSRF-TOKEN&#39;)) {
  $token = $this-&gt;encrypter-&gt;decrypt($header);
}

if (! is_string($sessionToken) || ! is_string($token)) {
  return false;
}

return hash_equals($sessionToken, $token);
</code></pre>

<p>Laravel会从请求中读取<code>_token</code>参数的的值，这个值就是在前面表单中添加的<code>csrf_field()</code>函数生成的。如果请求是异步的，那么会读取<code>X-CSRF-TOKEN</code>请求头，从请求头中读取token的值。</p>

<p>最后使用<code>hash_equals</code>函数验证请求参数中提供的token值和session中存储的token值是否一致，如果一致则说明请求是合法的。</p>

<p>你可能注意到，这个检查过程中也会读取一个名为<code>X-XSRF-TOKEN</code>的请求头，这个值是为了提供对一些javascript框架的支持（比如Angular），它们会自动的对异步请求中添加该请求头，而该值是从Cookie中的<code>XSRF-TOKEN</code>中读取的，因此在每个请求结束的时候，Laravel会发送给客户端一个名为<code>XSRF-TOKEN</code>的Cookie值</p>

<pre><code>$response-&gt;headers-&gt;setCookie(
    new Cookie(
        &#39;XSRF-TOKEN&#39;, $request-&gt;session()-&gt;token(), time() + 60 * $config[&#39;lifetime&#39;],
        $config[&#39;path&#39;], $config[&#39;domain&#39;], $config[&#39;secure&#39;], false
    )
);
</code></pre>

<h2 id="toc_14">写在最后</h2>

<p>本文只是对CSRF做了一个简单的介绍，主要是侧重于CSRF是什么以及如何应对CSRF攻击。有一个事实是我们无法回避的：<strong>没有绝对安全的系统</strong>，你有一千种防御对策，攻击者就有一千零一种攻击方式，但不管如何，我们都要尽最大的努力去将攻击者拦截在门外。如果希望深入了解如何发起一个CSRF攻击，可以参考一下这篇文章 <a href="http://www.freebuf.com/articles/web/55965.html">从零开始学CSRF</a>。</p>

<p>作为一名web方向的研发人员，无论你是从事业务逻辑开发还是做单纯的技术研究，了解一些安全方面的知识都是很有必要的，多关注一些安全方向的动态，了解常见的攻击方式以及应对策略，必将在你成长为一名大牛的路上为你“推波助澜”。</p>

<p>本文将会持续修正和更新，最新内容请参考我的 <a href="https://github.com/mylxsw">GITHUB</a> 上的 <a href="https://github.com/mylxsw/growing-up">程序猿成长计划</a> 项目，欢迎 Star，更多精彩内容请 <a href="https://github.com/mylxsw">follow me</a>。</p>

<h2 id="toc_15">参考</h2>

<ul>
<li><a href="https://en.wikipedia.org/wiki/Cross-site_request_forgery">wikipedia: Cross-site request forgery</a></li>
<li><a href="http://shiflett.org/articles/cross-site-request-forgeries">Cross-Site Request Forgeries</a></li>
<li><a href="http://www.cnblogs.com/hyddd/archive/2009/04/09/1432744.html">浅谈CSRF攻击方式</a></li>
</ul>