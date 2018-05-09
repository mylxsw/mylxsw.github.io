---
ID: 67
post_title: >
  跟我一起学Laravel-EloquentORM高级部分
author: mylxsw
post_excerpt: ""
layout: post
permalink: >
  https://aicode.cc/gen-wo-yi-qi-xuelaraveleloquentorm-gao-ji-bu-fen.html
published: true
post_date: 2016-03-25 23:07:13
---
<ul>
 	<li><a href="#toc_0">查询作用域</a>
<ul>
 	<li><a href="#toc_1">全局作用域</a></li>
 	<li><a href="#toc_2">本地作用域</a></li>
</ul>
</li>
 	<li><a href="#toc_3">事件</a>
<ul>
 	<li><a href="#toc_4">使用场景</a></li>
</ul>
</li>
 	<li><a href="#toc_5">序列化</a>
<ul>
 	<li><a href="#toc_6">转换模型/集合为数组 - toArray()</a></li>
 	<li><a href="#toc_7">转换模型为json - toJson()</a></li>
 	<li><a href="#toc_8">隐藏属性</a></li>
 	<li><a href="#toc_9">为json追加值</a></li>
</ul>
</li>
 	<li><a href="#toc_10">Mutators</a>
<ul>
 	<li><a href="#toc_11">Accessors &amp; Mutators</a>
<ul>
 	<li><a href="#toc_12">accessors</a></li>
 	<li><a href="#toc_13">mutators</a></li>
 	<li><a href="#toc_14">属性转换</a></li>
</ul>
</li>
</ul>
</li>
</ul>
<h2 id="toc_0">查询作用域</h2>
<h3 id="toc_1">全局作用域</h3>
全局作用域允许你对给定模型的所有查询添加约束。使用全局作用域功能可以为模型的所有操作增加约束。
<blockquote>软删除功能实际上就是利用了全局作用域功能</blockquote>
实现一个全局作用域功能只需要定义一个实现<code>Illuminate\Database\Eloquent\Scope</code>接口的类，该接口只有一个方法<code>apply</code>，在该方法中增加查询需要的约束
<pre><code>&lt;?php

namespace App\Scopes;

use Illuminate\Database\Eloquent\Scope;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class AgeScope implements Scope
{
    /**
     * Apply the scope to a given Eloquent query builder.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $builder
     * @param  \Illuminate\Database\Eloquent\Model  $model
     * @return void
     */
    public function apply(Builder $builder, Model $model)
    {
        return $builder-&gt;where('age', '&gt;', 200);
    }
}
</code></pre>
在模型的中，需要覆盖其<code>boot</code>方法，在该方法中增加<code>addGlobalScope</code>
<pre><code>&lt;?php

namespace App;

use App\Scopes\AgeScope;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    /**
     * The "booting" method of the model.
     *
     * @return void
     */
    protected static function boot()
    {
        parent::boot();

        static::addGlobalScope(new AgeScope);
    }
}
</code></pre>
添加全局作用域之后，<code>User::all()</code>操作将会产生如下等价sql
<pre><code>select * from `users` where `age` &gt; 200
</code></pre>
也可以使用匿名函数添加全局约束
<pre><code>static::addGlobalScope('age', function(Builder $builder) {
  $builder-&gt;where('age', '&gt;', 200);
});
</code></pre>
查询中要移除全局约束的限制，使用<code>withoutGlobalScope</code>方法
<pre><code>// 只移除age约束
User::withoutGlobalScope('age')-&gt;get();
User::withoutGlobalScope(AgeScope::class)-&gt;get();
// 移除所有约束
User::withoutGlobalScopes()-&gt;get();
// 移除多个约束
User::withoutGlobalScopes([FirstScope::class, SecondScope::class])-&gt;get();
</code></pre>
<h3 id="toc_2">本地作用域</h3>
本地作用域只对部分查询添加约束，需要手动指定是否添加约束，在模型中添加约束方法，使用前缀<code>scope</code>
<pre><code>&lt;?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    /**
     * Scope a query to only include popular users.
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePopular($query)
    {
        return $query-&gt;where('votes', '&gt;', 100);
    }

    /**
     * Scope a query to only include active users.
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query-&gt;where('active', 1);
    }
}
</code></pre>
使用上述添加的本地约束查询，只需要在查询中使用<code>scope</code>前缀的方法，去掉<code>scope</code>前缀即可
<pre><code>$users = App\User::popular()-&gt;active()-&gt;orderBy('created_at')-&gt;get();
</code></pre>
本地作用域方法是可以接受参数的
<pre><code>public function scopeOfType($query, $type)
{
    return $query-&gt;where('type', $type);
}
</code></pre>
调用的时候
<pre><code>$users = App\User::ofType('admin')-&gt;get();
</code></pre>
<h2 id="toc_3">事件</h2>
Eloquent模型会触发下列事件

<code>creating</code>, <code>created</code>, <code>updating</code>, <code>updated</code>, <code>saving</code>, <code>saved</code>,<code>deleting</code>, <code>deleted</code>, <code>restoring</code>, <code>restored</code>
<h3 id="toc_4">使用场景</h3>
假设我们希望保存用户的时候对用户进行校验，校验通过后才允许保存到数据库，可以在服务提供者中为模型的事件绑定监听
<pre><code>&lt;?php

namespace App\Providers;

use App\User;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        User::creating(function ($user) {
            if ( ! $user-&gt;isValid()) {
                return false;
            }
        });
    }

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
</code></pre>
上述服务提供者对象中，在框架启动时会监听模型的<code>creating</code>事件，当保存用户之间检查用户数据的合法性，如果不合法，返回false，模型数据不会被持久化到数据。
<blockquote>返回false会阻止模型的<code>save</code> / <code>update</code>操作</blockquote>
<h2 id="toc_5">序列化</h2>
当构建JSON API的时候，经常会需要转换模型和关系为数组或者json。Eloquent提供了一些方法可以方便的来实现数据类型之间的转换。
<h3 id="toc_6">转换模型/集合为数组 - toArray()</h3>
<pre><code>$user = App\User::with('roles')-&gt;first();
return $user-&gt;toArray();

$users = App\User::all();
return $users-&gt;toArray();
</code></pre>
<h3 id="toc_7">转换模型为json - toJson()</h3>
<pre><code>$user = App\User::find(1);
return $user-&gt;toJson();

$user = App\User::find(1);
return (string) $user;
</code></pre>
<h3 id="toc_8">隐藏属性</h3>
有时某些字段不应该被序列化，比如用户的密码等，使用<code>$hidden</code>字段控制那些字段不应该被序列化
<pre><code>&lt;?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = ['password'];
}
</code></pre>
<blockquote>隐藏关联关系的时候，使用的是它的方法名称，不是动态的属性名</blockquote>
也可以使用<code>$visible</code>指定会被序列化的白名单
<pre><code>&lt;?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    /**
     * The attributes that should be visible in arrays.
     *
     * @var array
     */
    protected $visible = ['first_name', 'last_name'];
}
</code></pre>
有时可能需要某个隐藏字段被临时序列化，使用<code>makeVisible</code>方法
<pre><code>return $user-&gt;makeVisible('attribute')-&gt;toArray();
</code></pre>
<h3 id="toc_9">为json追加值</h3>
有时需要在json中追加一些数据库中不存在的字段，使用下列方法，现在模型中增加一个get方法
<pre><code>&lt;?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['is_admin'];


    /**
     * Get the administrator flag for the user.
     *
     * @return bool
     */
    public function getIsAdminAttribute()
    {
        return $this-&gt;attributes['admin'] == 'yes';
    }
}
</code></pre>
方法签名为<code>getXXXAttribute</code>格式，然后为模型的<code>$appends</code>字段设置字段名。
<h2 id="toc_10">Mutators</h2>
在Eloquent模型中，Accessor和Mutator可以用来对模型的属性进行处理，比如我们希望存储到表中的密码字段要经过加密才行，我们可以使用Laravel的加密工具自动的对它进行加密。
<h3 id="toc_11">Accessors &amp; Mutators</h3>
<h4 id="toc_12">accessors</h4>
要定义一个accessor，需要在模型中创建一个名称为<code>getXxxAttribute</code>的方法，其中的Xxx是驼峰命名法的字段名。

假设我们有一个字段是<code>first_name</code>，当我们尝试去获取first_name的值的时候，<code>getFirstNameAttribute</code>方法将会被自动的调用
<pre><code>&lt;?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    /**
     * Get the user's first name.
     *
     * @param  string  $value
     * @return string
     */
    public function getFirstNameAttribute($value)
    {
        return ucfirst($value);
    }
}
</code></pre>
在访问的时候，只需要正常的访问属性就可以
<pre><code>$user = App\User::find(1);
$firstName = $user-&gt;first_name;
</code></pre>
<h4 id="toc_13">mutators</h4>
创建mutators与accessorsl类似，创建名为<code>setXxxAttribute</code>的方法即可
<pre><code>&lt;?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    /**
     * Set the user's first name.
     *
     * @param  string  $value
     * @return string
     */
    public function setFirstNameAttribute($value)
    {
        $this-&gt;attributes['first_name'] = strtolower($value);
    }
}
</code></pre>
赋值方式
<pre><code>$user = App\User::find(1);
$user-&gt;first_name = 'Sally';
</code></pre>
<h4 id="toc_14">属性转换</h4>
模型的<code>$casts</code>属性提供了一种非常简便的方式转换属性为常见的数据类型，在模型中，使用<code>$casts</code>属性定义一个数组，该数组的key为要转换的属性名称，value为转换的数据类型，当前支持<code>integer</code>, <code>real</code>, <code>float</code>, <code>double</code>, <code>string</code>, <code>boolean</code>, <code>object</code>, <code>array</code>,<code>collection</code>, <code>date</code>, <code>datetime</code>, 和 <code>timestamp</code>。
<pre><code>&lt;?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'is_admin' =&gt; 'boolean',
    ];
}
</code></pre>
数组类型的转换时非常有用的，我们在数据库中存储json数据的时候，可以将其转换为数组形式。
<pre><code>&lt;?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'options' =&gt; 'array',
    ];
}
</code></pre>
从配置数组转换的属性取值或者赋值的时候都会自动的完成json和array的转换
<pre><code>$user = App\User::find(1);  
$options = $user-&gt;options;
$options['key'] = 'value';
$user-&gt;options = $options;
$user-&gt;save();
</code></pre>

<hr />

参考：
<ul>
 	<li><a href="https://laravel.com/docs/5.2/eloquent">Eloquent: Getting Started</a></li>
 	<li><a href="https://laravel.com/docs/5.2/eloquent-serialization">Eloquent: Serialization</a></li>
 	<li><a href="https://laravel.com/docs/5.2/eloquent-mutators">Eloquent: Mutators</a></li>
</ul>