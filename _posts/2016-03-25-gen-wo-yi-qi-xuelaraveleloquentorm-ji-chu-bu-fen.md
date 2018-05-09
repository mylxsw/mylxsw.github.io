---
ID: 61
post_title: >
  跟我一起学Laravel-EloquentORM基础部分
author: mylxsw
post_excerpt: ""
layout: post
permalink: >
  https://aicode.cc/gen-wo-yi-qi-xuelaraveleloquentorm-ji-chu-bu-fen.html
published: true
post_date: 2016-03-25 08:55:31
---
<ul>
 	<li><a href="#toc_0">查询</a>
<ul>
 	<li><a href="#toc_1">基本查询操作</a></li>
 	<li><a href="#toc_2">查询单个结果</a></li>
 	<li><a href="#toc_3">查询聚集函数结果</a></li>
 	<li><a href="#toc_4">分页查询</a></li>
</ul>
</li>
 	<li><a href="#toc_5">插入</a>
<ul>
 	<li><a href="#toc_6">基本插入操作</a></li>
 	<li><a href="#toc_7">批量赋值插入</a></li>
</ul>
</li>
 	<li><a href="#toc_8">更新</a>
<ul>
 	<li><a href="#toc_9">基本更新操作</a></li>
</ul>
</li>
 	<li><a href="#toc_10">删除</a>
<ul>
 	<li><a href="#toc_11">基本删除操作</a></li>
 	<li><a href="#toc_12">软删除</a>
<ul>
 	<li><a href="#toc_13">查询软删除的模型</a>
<ul>
 	<li><a href="#toc_14">包含软删除的模型</a></li>
 	<li><a href="#toc_15">只查询软删除的模型</a></li>
 	<li><a href="#toc_16">还原软删除的模型</a></li>
 	<li><a href="#toc_17">强制删除（持久化删除）</a></li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ul>
使用Eloquent <em>['eləkwənt]</em> 时，数据库查询构造器的方法对模型类也是也用的，使用上只是省略了<code>DB::table('表名')</code>部分。
<blockquote>在模型中使用protected成员变量<code>$table</code>指定绑定的表名。</blockquote>
<pre><code>&lt;?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Flight extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'my_flights';
}
</code></pre>
Eloquent 假设每个表都有一个名为<code>id</code>的主键，可以通过<code>$primaryKey</code>成员变量覆盖该字段名称，另外，Eloquent假设主键字段是自增的整数，如果你想用非自增的主键或者非数字的主键的话，必须指定模型中的public属性<code>$incrementing</code>为false。

默认情况下，Eloquent期望表中存在<code>created_at</code>和<code>updated_at</code>两个字段，字段类型为<code>timestamp</code>，如果不希望这两个字段的话，设置<code>$timestamps</code>为false
<pre><code>&lt;?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Flight extends Model
{
    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * The storage format of the model's date columns.
     *
     * @var string
     */
    protected $dateFormat = 'U';
}
</code></pre>
使用<code>protected $connection = 'connection-name'</code>指定模型采用的数据库连接。
<h2 id="toc_0">查询</h2>
<h3 id="toc_1">基本查询操作</h3>
方法<code>all</code>用于返回模型表中所有的结果
<pre><code>$flights = Flight::all();
foreach ($flights as $flight) {
    echo $flight-&gt;name;
}
</code></pre>
也可以使用<code>get</code>方法为查询结果添加约束
<pre><code>$flights = App\Flight::where('active', 1)
     -&gt;orderBy('name', 'desc')
     -&gt;take(10)
     -&gt;get();
</code></pre>
<blockquote>可以看到，查询构造器的方法对模型类也是可以使用的</blockquote>
在eloquent ORM中，<code>get</code>和<code>all</code>方法查询出多个结果集，它们的返回值是一个<code>Illuminate\Database\Eloquent\Collection</code>对象，该对象提供了多种对结果集操作的方法
<pre><code>public function find($key, $default = null);
public function contains($key, $value = null);
public function modelKeys();
public function diff($items)
...
</code></pre>
该对象的方法有很多，这里只列出一小部分，更多方法参考API文档 <a href="https://laravel.com/api/5.2/Illuminate/Database/Eloquent/Collection.html">Collection</a> 和<a href="https://laravel.com/docs/5.2/collections">使用说明文档</a>。

对大量结果分段处理，同样是使用<code>chunk</code>方法
<pre><code>Flight::chunk(200, function ($flights) {
    foreach ($flights as $flight) {
        //
    }
});
</code></pre>
<h3 id="toc_2">查询单个结果</h3>
使用<code>find</code>和<code>first</code>方法查询单个结果，返回的是单个的模型实例
<pre><code>// 通过主键查询模型...
$flight = App\Flight::find(1);

// 使用约束...
$flight = App\Flight::where('active', 1)-&gt;first();
</code></pre>
使用<code>find</code>方法也可以返回多个结果，以<code>Collection</code>对象的形式返回，参数为多个主键
<pre><code>$flights = App\Flight::find([1, 2, 3]);
</code></pre>
如果查询不到结果的话，可以使用<code>findOrFail</code>或者<code>firstOrFail</code>方法，这两个方法在查询不到结果的时候会抛出<code>Illuminate\Database\Eloquent\ModelNotFoundException</code>异常
<pre><code>$model = App\Flight::findOrFail(1);
$model = App\Flight::where('legs', '&gt;', 100)-&gt;firstOrFail();
</code></pre>
如果没有捕获这个异常的话，laravel会自动返回给用户一个<code>404</code>的响应结果，因此如果希望找不到的时候返回<code>404</code>，是可以直接使用该方法返回的
<pre><code>Route::get('/api/flights/{id}', function ($id) {
    return App\Flight::findOrFail($id);
});
</code></pre>
<h3 id="toc_3">查询聚集函数结果</h3>
与查询构造器查询方法一样，可以使用聚集函数返回结果，常见的比如<code>max</code>， <code>min</code>，<code>avg</code>，<code>sum</code>，<code>count</code>等
<pre><code>$count = App\Flight::where('active', 1)-&gt;count();
$max = App\Flight::where('active', 1)-&gt;max('price');
</code></pre>
<h3 id="toc_4">分页查询</h3>
分页查询可以直接使用<code>paginate</code>函数
<pre><code>LengthAwarePaginator paginate( 
    int $perPage = null, 
    array $columns = array('*'), 
    string $pageName = 'page', 
    int|null $page = null
)
</code></pre>
参数说明
<table>
<thead>
<tr>
<th>参数</th>
<th>类型</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>perPage</td>
<td>int</td>
<td>每页显示数量</td>
</tr>
<tr>
<td>columns</td>
<td>array</td>
<td>查询的列名</td>
</tr>
<tr>
<td>pageName</td>
<td>string</td>
<td>页码参数名称</td>
</tr>
<tr>
<td>page</td>
<td>int</td>
<td>当前页码</td>
</tr>
</tbody>
</table>
返回值为 <a href="https://laravel.com/api/5.2/Illuminate/Contracts/Pagination/LengthAwarePaginator.html">LengthAwarePaginator</a> 对象。
<pre><code>$limit = 20;
$page = 1;
return Enterprise::paginate($limit, ['*'], 'page', $page);
</code></pre>
<h2 id="toc_5">插入</h2>
<h3 id="toc_6">基本插入操作</h3>
插入新的数据只需要创建一个新的模型实例，然后设置模型属性，最后调用<code>save</code>方法即可
<pre><code>$flight = new Flight;
$flight-&gt;name = $request-&gt;name;
$flight-&gt;save();
</code></pre>
<blockquote>在调用<code>save</code>方法的时候，会自动为<code>created_at</code>和<code>updated_at</code>字段设置时间戳，不需要手动指定</blockquote>
<h3 id="toc_7">批量赋值插入</h3>
使用<code>create</code>方法可以执行批量为模型的属性赋值的插入操作，该方法将会返回新插入的模型，在执行<code>create</code>方法之前，需要先在模型中指定<code>fillable</code>和<code>guarded</code>属性，用于防止不合法的属性赋值（例如避免用户传入的is_admin属性被误录入数据表）。

指定<code>$fillable</code>属性的目的是该属性指定的字段可以通过<code>create</code>方法插入，其它的字段将被过滤掉，类似于白名单，而<code>$guarded</code>则相反，类似于黑名单。
<pre><code>protected $fillable = ['name'];
// OR
protected $guarded = ['price'];
</code></pre>
执行<code>create</code>操作就只有白名单或者黑名单之外的字段可以更新了
<pre><code>$flight = App\Flight::create(['name' =&gt; 'Flight 10']);
</code></pre>
除了<code>create</code>方法，还有两外两个方法可以使用<code>firstOrNew</code>和<code>firstOrCreate</code>。

<code>firstOrCreate</code>方法用来使用给定的列值对查询记录，如果查不到则插入新的。<code>fristOrNew</code>与<code>firstOrCreate</code>类似，不同在于如果不存在，它会返回一个新的模型对象，不过该模型是未经过持久化的，需要手动调用<code>save</code>方法持久化到数据库。
<pre><code>// 使用属性检索flight，如果不存在则创建...
$flight = App\Flight::firstOrCreate(['name' =&gt; 'Flight 10']);

// 使用属性检索flight，如果不存在则创建一个模型实例...
$flight = App\Flight::firstOrNew(['name' =&gt; 'Flight 10']);
</code></pre>
<h2 id="toc_8">更新</h2>
<h3 id="toc_9">基本更新操作</h3>
方法<code>save</code>不仅可以要用来插入新的数据，也可以用来更新数据，只需先使用模型方法查询出要更新的数据，设置模型属性为新的值，然后再<code>save</code>就可以更新了，<code>updated_at</code>字段会自动更新。
<pre><code>$flight = App\Flight::find(1);
$flight-&gt;name = 'New Flight Name';
$flight-&gt;save();
</code></pre>
也可使用<code>update</code>方法对多个结果进行更新
<pre><code>App\Flight::where('active', 1)
    -&gt;where('destination', 'San Diego')
    -&gt;update(['delayed' =&gt; 1]);
</code></pre>
<h2 id="toc_10">删除</h2>
<h3 id="toc_11">基本删除操作</h3>
使用<code>delete</code>方法删除模型
<pre><code>$flight = App\Flight::find(1);
$flight-&gt;delete();
</code></pre>
上述方法需要先查询出模型对象，然后再删除，也可以直接使用主键删除模型而不查询，使用<code>destroy</code>方法
<pre><code>App\Flight::destroy(1);
App\Flight::destroy([1, 2, 3]);
App\Flight::destroy(1, 2, 3);
</code></pre>
使用约束条件删除，返回删除的行数
<pre><code>$deletedRows = App\Flight::where('active', 0)-&gt;delete();
</code></pre>
<h3 id="toc_12">软删除</h3>
软删除是在表中增加<code>deleted_at</code>字段，当删除记录的时候不会真实删除记录，而是设置该字段的时间戳，由Eloquent模型屏蔽已经设置该字段的数据。

要启用软删除，可以在模型中引用<code>Illuminate\Database\Eloquent\SoftDeletes</code>这个Trait，并且在<code>dates</code>属性中增加<code>deleted_at</code>字段。
<pre><code>&lt;?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Flight extends Model
{
    use SoftDeletes;

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['deleted_at'];
}
</code></pre>
要判断一个模型是否被软删除了的话，可以使用<code>trashed</code>方法
<pre><code>if ($flight-&gt;trashed()) {
    //
}
</code></pre>
<h4 id="toc_13">查询软删除的模型</h4>
<h5 id="toc_14">包含软删除的模型</h5>
如果模型被软删除了，普通查询是不会查询到该结果的，可以使用<code>withTrashed</code>方法强制返回软删除的结果
<pre><code>$flights = App\Flight::withTrashed()
      -&gt;where('account_id', 1)
      -&gt;get();

// 关联操作中也可以使用
$flight-&gt;history()-&gt;withTrashed()-&gt;get();
</code></pre>
<h5 id="toc_15">只查询软删除的模型</h5>
<pre><code>$flights = App\Flight::onlyTrashed()
      -&gt;where('airline_id', 1)
      -&gt;get();
</code></pre>
<h5 id="toc_16">还原软删除的模型</h5>
查询到软删除的模型实例之后，调用<code>restore</code>方法还原
<pre><code>$flight-&gt;restore();
</code></pre>
也可以在查询中使用
<pre><code>App\Flight::withTrashed()
    -&gt;where('airline_id', 1)
    -&gt;restore();

// 关联操作中也可以使用
$flight-&gt;history()-&gt;restore();
</code></pre>
<h5 id="toc_17">强制删除（持久化删除）</h5>
<pre><code>// Force deleting a single model instance...
$flight-&gt;forceDelete();

// Force deleting all related models...
$flight-&gt;history()-&gt;forceDelete();
</code></pre>
上述操作后，数据会被真实删除。

<hr />

参考：
<ul>
 	<li><a href="https://laravel.com/docs/5.2/eloquent">Eloquent: Getting Started</a></li>
</ul>