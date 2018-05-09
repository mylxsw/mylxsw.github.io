---
ID: 208
post_title: '【译】Let&#8217;s Encrypt &#8211; 免费的SSL/TLS证书'
author: mylxsw
post_excerpt: ""
layout: post
permalink: >
  https://aicode.cc/yilets-encrypt-mian-fei-dessltls-zheng-shu.html
published: true
post_date: 2016-08-03 09:15:57
---
<p>每一个建立过安全站点的人都在如何维护证书这个问题上深受困扰。Let’s Encrypt 推荐的客户端 Certbot，能够自动的消除这些用户的痛点，并且让站点维护人员能够使用简单的命令开启和管理站点的HTTPS功能。</p>

<p>不需要验证邮件，不需要去编辑复杂的配置，也不再你的站点因为证书过期而无法正常工作。当然，因为Let’s Encrypt提供的是免费证书，因此也不需要付费。</p>

<p>本文简要描述了如何使用<a href="https://github.com/certbot/certbot">Certbot</a>进行证书管理。（欢迎使用任何兼容的客户端；相关说明请查看这些项目的指导页面）。</p>

<p>如果你想知道更多关于它是工作原理，查看我们的 <a href="https://letsencrypt.org/how-it-works/">工作原理</a> 页面。</p>

<h2 id="toc_0">安装客户端软件</h2>

<p>如果你的操作系统包含了一个<code>certbot</code>的安装包，<a href="https://certbot.eff.org">从这里安装它</a> ，然后使用相应的<code>certbot</code>命令。如果没有的话，则可以使用我们提供的<code>cert-auto</code>包装器脚本快速的获取一份。</p>

<pre><code>$ git clone https://github.com/certbot/certbot
$ cd certbot
$ ./certbot-auto --help 
</code></pre>

<p><code>certbot-auto</code> 与<code>certbot</code>命令拥有相同的命令行参数；它会安装所有的依赖并且自动更新 Certbot 的代码（这个过程下载的文件比较大，因此比较慢）。</p>

<h2 id="toc_1">使用限制</h2>

<p>Let’s Encrypt 每周会产生有限数量的证书，确切的数量请<a href="https://community.letsencrypt.org/t/rate-limits-for-lets-encrypt/6769">查看这篇文章</a>。如果你第一次使用certbot，你可能希望添加<code>--test-cert</code>标识，并且使用一个未使用的域名。这样将会从<code>staging</code>服务器获得一个证书，它们在浏览器中是无效的，除此之外，其它过程都是相同的，因此你可以测试各种配置选项而不会超过这个数量限制。</p>

<h2 id="toc_2">如何使用客户端</h2>

<p>Cerbot 支持很多插件，可以用它们来获取和安装证书。下面包含了一些选项的使用例子：</p>

<p>如果你在近期发布的Debian操作系统上运行Apache服务，你可以尝试Apache插件，使用它可以自动获取和安装证书：</p>

<p><code>certbot --apache</code></p>

<p>目前在其它平台上还没有实现自动安装，因此你必须使用命令<code>certonly</code>进行安装。下面是一些例子：</p>

<p>要获取一个可以在任何web服务器的webroot目录上能够运行证书，需要使用“webroot”插件：</p>

<p><code>certbot certonly --webroot -w /var/www/example -d example.com -d www.example.com -w /var/www/thing -d thing.is -d m.thing.is</code></p>

<p>这个命令将会获取example.com，www.example.com， thing.is 和 m.thing.is 的单个证书，它将会把前两个域名生成的文件放到/var/www/example目录，后面两个放到/var/www/thing目录。</p>

<p>例如使用内建的“独立”web服务器获取 example.com 和 <a href="http://www.example.com">www.example.com</a> 的证书（你可能需要临时停止已经存在的web服务器）：</p>

<p><code>certbot certonly --standalone -d example.com -d www.example.com</code></p>

<h2 id="toc_3">证书续订</h2>

<p>从0.4.0版本开始，Certbot增加了高级的<code>renew</code>子命令，它可以用于使用之前获取证书时相同的配置续订所有的证书。你可以通过运行以下命令测试一下：</p>

<p><code>certbot renew --dry-run</code></p>

<p>上述命令会获取一个测试证书，它不会对你的系统产生任何持久化的修改。如果你觉得这个结果还可以，可以运行下面的命令：</p>

<p><code>certbot renew</code></p>

<p>如果你想续订某一个证书（而不是所有的）或者修改某一个用于续订的配置参数，你可以使用<code>certbot certonly</code>命令和其它特定的配置获取单个证书。当使用<code>certbot certonly</code>命令的时候，你可以得到单个证书的续订。使用指定<code>-d</code>选项指定你希望续订的域名所覆盖的每一个域名。</p>

<p><strong>注意：</strong> 从0.4.0开始，Certbot将会记录任何你使用<code>certonly</code>和<code>renew</code>时选择的配置，未来使用renew的时候将会使用最近的配置。在版本0.3.0中，Certbot只会记录第一次获取证书时的配置，并不会使用之后续订时的配置替换它。</p>

<p>动词<code>renew</code>被设计用来半自动或者自动的使用，因此它也隐含着<code>--non-interactive</code>的意味。该选项意味着Certbot不会停下来与你进行交互；对于自动续订来说，使用该选项是非常不错的，但是因为指定该选项的话你无法与Certbot进行交互，因此你应该确保你所有的配置都被正确的设置。</p>

<p>选项<code>--dry-run</code>用于从我们的<code>staging</code>服务器获取证书。获取的证书不会保存到磁盘上，并且你的配置也不会被更新，因此你可以用来测试是否的<code>renew</code>或者<code>certonly</code>命令能够正确的执行续订。从<code>staging</code>服务器获取证书不会影响生产服务器的数量限制。</p>

<p>如果你想要改变之前指定的值，你可以在续订时，在命令行中指定一个新的选项，例如：</p>

<p><code>certbot renew --rsa-key-size 4096</code></p>

<p>运行<code>certbot renew</code>命令将会续订所有在续订窗口的证书（默认情况下，证书过期时间为30天）。如果你想要续订单个证书，你应该使用<code>certbot certonly -d</code>命令指定要续订的证书的域名。例如：</p>

<p><code>certbot certonly --keep-until-expiring --webroot -w /var/www/example.com -d example.com,www.example.com -w /var/www/thing -d thing.is,m.thing.is</code></p>

<p>如果你的证书安装在本地服务器，则一旦<code>certonly</code>命令执行完成，你需要重载服务器的配置文件（例如，对于<code>apache2</code>服务器来说执行<code>server apache2 reload</code>命令）。</p>

<h3 id="toc_4">开发自己的续订脚本</h3>

<p>对于如何建立自动续订功能，请参考<a href="https://certbot.eff.org/docs/using.html#renewal">续订文档</a>。</p>

<h2 id="toc_5">撤销证书</h2>

<p>使用下面的命令撤销撤销一个证书</p>

<p><code>$ certbot revoke --cert-path example-cert.pem</code></p>

<h2 id="toc_6">完整文档</h2>

<p>更多关于Certbot的信息，请参考 <a href="https://certbot.eff.org/docs/intro.html">完整文档</a>。已知的一些问题使用<a href="https://github.com/certbot/certbot/issues">Github</a>进行跟踪。在提交新的问题的时候请先参考最近是否有相似的问题。</p>

<h2 id="toc_7">获得帮助</h2>

<p>在阅读文档和问题列表之后，如果你需要额外的帮助的话，请尝试我们的<a href="https://community.letsencrypt.org/">帮助社区论坛</a>。</p>

<ul>
<li><p><a href="https://github.com/letsencrypt">letsencrypt</a> </p></li>
<li><p><a href="https://twitter.com/letsencrypt">letsencrypt</a> </p></li>
</ul>

<p>查看我们的 <a href="https://letsencrypt.org/privacy/">隐私策略</a>.</p>

<p>查看我们的 <a href="https://letsencrypt.org/trademarks/">商标策略</a>.</p>

<p>Let’s Encrypt是由非营利的互联网安全研究小组（ISRG）管理的一个免费，自动化，开放的证书授权机构。</p>

<p>1 Letterman Drive, Suite D4700, San Francisco, CA 94129</p>

<p>Linux Foundation是Linux基金会的注册商标。Linux是由Linus Torvalds注册的<a href="https://www.linuxfoundation.org/programs/legal/trademark">商标</a>。</p>

<hr/>

<p>原文:</p>

<p><a href="https://letsencrypt.org/getting-started/">Let&#39;s Encrypt - Getting Started</a></p>