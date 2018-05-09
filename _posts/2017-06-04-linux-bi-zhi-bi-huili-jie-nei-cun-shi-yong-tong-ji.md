---
ID: 243
post_title: >
  Linux必知必会-理解内存使用统计命令free
author: mylxsw
post_excerpt: ""
layout: post
permalink: >
  https://aicode.cc/linux-bi-zhi-bi-huili-jie-nei-cun-shi-yong-tong-ji.html
published: true
post_date: 2017-06-04 23:16:52
---

<ul>
<li>
<a href="#toc_0">指标说明</a>
</li>
<li>
<a href="#toc_1">常用参数</a>
</li>
<li>
<a href="#toc_2">参考示例</a>
</li>
<li>
<a href="#toc_3">参考文献</a>
</li>
</ul>


<p>本文详细介绍了Linux系统中的<code>free</code>命令的使用方法以及关键参数的含义，这可能是你见过的关于<code>free</code>命令最详细的一篇文章了，绝对值得你收藏。</p>

<p><strong>free</strong>命令显示了Linux系统中物理内存、交换分区的使用统计信息。</p>

<h2 id="toc_0">指标说明</h2>

<p><img src="https://oayrssjpa.qnssl.com/14965636958956.jpg" alt=""/></p>

<p>使用<code>free</code>命令查看内存信息，最重要的是理解当前系统的可用内存并不是直接看 <strong>free</strong> 字段就可以看出来的，应该参考的是</p>

<pre><code>可用内存 = free + buffers + cached
</code></pre>

<p>除去标题行之后，第一行为 <strong>物理内存使用统计</strong>：</p>

<table>
<thead>
<tr>
<th>标题</th>
<th>说明</th>
</tr>
</thead>

<tbody>
<tr>
<td>total</td>
<td>物理内存总量 <strong>total = used + free</strong></td>
</tr>
<tr>
<td>used</td>
<td>已使用内存总量，包含应用使用量+buffer+cached</td>
</tr>
<tr>
<td>free</td>
<td>空闲内存总量</td>
</tr>
<tr>
<td>shared</td>
<td>共享内存总量</td>
</tr>
<tr>
<td>buffers</td>
<td>块设备所占用的缓存</td>
</tr>
<tr>
<td>cached</td>
<td>普通文件数据所占用的缓存</td>
</tr>
<tr>
<td>available</td>
<td>当前可用内存总量（可用于分配给应用的，不包含虚拟内存）</td>
</tr>
</tbody>
</table>

<blockquote>
<p>对于<code>available</code>字段，在内核3.14中，它会从<code>/proc/meminfo</code>中的<strong>MemAvailable</strong>读取，在内核2.6.27+的系统上采用模拟的方式获取，其它情况下直接与<strong>free</strong>的值相同。</p>
</blockquote>

<p>第二行<strong>-/+ buffers/cache</strong> 中只有两列<strong>used</strong>和<strong>free</strong>有值，它们是物理内存的调整值</p>

<table>
<thead>
<tr>
<th>标题</th>
<th>说明</th>
</tr>
</thead>

<tbody>
<tr>
<td>used</td>
<td>已使用内存（used）减去buffer和cached之后的内存，也就是<strong>应用正在使用的内存总量</strong></td>
</tr>
<tr>
<td>free</td>
<td>空闲内存加上buffer和cached之后的内存，也就是<strong>真正的可用内存总量</strong></td>
</tr>
</tbody>
</table>

<p>第三行为交换分区使用统计</p>

<table>
<thead>
<tr>
<th>标题</th>
<th>说明</th>
</tr>
</thead>

<tbody>
<tr>
<td>total</td>
<td>交换分区内存总量</td>
</tr>
<tr>
<td>used</td>
<td>正在使用的交换分区内存</td>
</tr>
<tr>
<td>free</td>
<td>空闲交换分区内存</td>
</tr>
</tbody>
</table>

<p>在上面这些指标中，我们需要注意的是在下面这些情况下，系统是正常的，不需要担心</p>

<ul>
<li>空闲内存<strong>free</strong>接近于0</li>
<li>已使用内存<strong>used</strong>接近于<strong>total</strong></li>
<li>可用内存（<strong>free+buffers/cache</strong>）占<strong>total</strong>的 20% 以上</li>
<li>交换分区内存 <strong>swap</strong> 没有发生改变</li>
</ul>

<p>下面情况说明内存过低，需要注意！</p>

<ul>
<li>可用内存（<strong>free+buffers/cache</strong>）过低，接近于0的时候</li>
<li>交换分区内存占用<strong>swap used</strong>增加或者有波动</li>
<li><code>dmesg | grep oom-killer</code>显示有<strong>OutOfMemory-killer</strong>正在运行</li>
</ul>

<h2 id="toc_1">常用参数</h2>

<table>
<thead>
<tr>
<th>选项</th>
<th>说明</th>
</tr>
</thead>

<tbody>
<tr>
<td>-b/k/m/g</td>
<td>以bytes/kilobytes/megabytes/gigabytes为单位显示结果</td>
</tr>
<tr>
<td>-h</td>
<td>以人类可读的方式输出统计结果</td>
</tr>
<tr>
<td>-t</td>
<td>使用该选项会多显示一行标题为Total的统计信息</td>
</tr>
<tr>
<td>-o</td>
<td>禁止显示第二行的缓冲区调整值</td>
</tr>
<tr>
<td>-s</td>
<td>每隔多少秒自动刷新结果</td>
</tr>
<tr>
<td>-c</td>
<td>与<strong>-s</strong>配合使用，控制刷新结果次数</td>
</tr>
<tr>
<td>-l</td>
<td>显示高低内存的统计详情</td>
</tr>
<tr>
<td>-a</td>
<td>显示可用内存</td>
</tr>
<tr>
<td>-V</td>
<td>显示版本号</td>
</tr>
</tbody>
</table>

<blockquote>
<p>版本不同，可能部分选项也不相同。</p>
</blockquote>

<h2 id="toc_2">参考示例</h2>

<pre><code># free -t -a -g
</code></pre>

<p><img src="https://oayrssjpa.qnssl.com/14965907444264.jpg" alt=""/></p>

<p>本文将会持续修正和更新，最新内容请参考我的 <a href="https://github.com/mylxsw">GITHUB</a> 上的 <a href="https://github.com/mylxsw/growing-up">程序猿成长计划</a> 项目，欢迎 Star，更多精彩内容请 <a href="https://github.com/mylxsw">follow me</a>。</p>

<h2 id="toc_3">参考文献</h2>

<ul>
<li><a href="https://serverfault.com/questions/85470/meaning-of-the-buffers-cache-line-in-the-output-of-free">Meaning of the buffers/cache line in the output of free</a></li>
<li><a href="http://www.linuxatemyram.com/">Linux ate my ram!</a></li>
</ul>