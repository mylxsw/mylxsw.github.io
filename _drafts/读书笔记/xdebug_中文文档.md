##XDEBUG 中文文档

###变量显示特性

Xdebug替换了PHP内置的显示变量的函数```var_dump()```。Xdebug版本的```var_dump()```包含了用不同颜色显示不同类型和数组元素/对象总量的属性，最大的深度以及字符串长度。当然，这里也有一些其它的方法用于显示变量。

####使用```var_dump()```的效果
Xdebug使用多个配置项用于控制Xdebug修改版本的```var_dump()```函数的输出： ```xdebug.var_display_max_children```, ```xdebug.var_display_max_data``` 和 ```xdebug.var_display_max_depth```。这几个配置项的效果通过下面的例子展示出来。下面的脚本运行四次，每一次都使用不同的配置，你可以使用标签页的形式查看他们之间的不同。

<pre>
&lt;?php
class test {
    public $pub = false;
    private $priv = true;
    protected $prot = 42;
}
$t = new test;
$t-&gt;pub = $t;
$data = array(
    'one' =&gt; 'a somewhat long string!',
    'two' =&gt; array(
        'two.one' =&gt; array(
            'two.one.zero' =&gt; 210,
            'two.one.one' =&gt; array(
                'two.one.one.zero' =&gt; 3.141592564,
                'two.one.one.one'  =&gt; 2.7,
            ),
        ),
    ),
    'three' =&gt; $t,
    'four' =&gt; range(0, 5),
);
var_dump( $data );
?&gt;
</pre>
输出结果如下：
<pre>
array
  'one' => string 'a somewhat long string!' (length=23)
  'two' => 
    array
      'two.one' => 
        array
          'two.one.zero' => int 210
          'two.one.one' => 
            array
              ...
  'three' => 
    object(test)[1]
      public 'pub' => 
        &object(test)[1]
      private 'priv' => boolean true
      protected 'prot' => int 42
  'four' => 
    array
      0 => int 0
      1 => int 1
      2 => int 2
      3 => int 3
      4 => int 4
      5 => int 5
array
  'one' => string 'a somewhat long string!' (length=23)
  'two' => 
    array
      'two.one' => 
        array
          'two.one.zero' => int 210
          'two.one.one' => 
            array
              ...
  more elements...
array
  'one' => string 'a somewhat long '... (length=23)
  'two' => 
    array
      'two.one' => 
        array
          'two.one.zero' => int 210
          'two.one.one' => 
            array
              ...
  'three' => 
    object(test)[1]
      public 'pub' => 
        &object(test)[1]
      private 'priv' => boolean true
      protected 'prot' => int 42
  'four' => 
    array
      0 => int 0
      1 => int 1
      2 => int 2
      3 => int 3
      4 => int 4
      5 => int 5
array
  'one' => string 'a somewhat long string!' (length=23)
  'two' => 
    array
      'two.one' => 
        array
          ...
  'three' => 
    object(test)[1]
      public 'pub' => 
        &object(test)[1]
      private 'priv' => boolean true
      protected 'prot' => int 42
  'four' => 
    array
      0 => int 0
      1 => int 1
      2 => int 2
      3 => int 3
      4 => int 4
      5 => int 5
array
  'one' => string 'a somewh'... (length=23)
  'two' => 
    array
      ...
  'three' => 
    object(test)[1]
      ...
  more elements...
</pre>
####相关配置

- **xdebug.cli_color**   
	Type: integer, 默认值： 0 ,从Xdebug 2.2开始引入   
	
	如果这个项被设置为1，Xdebug将会在cli模式和输出到TTY上的时候，对```var_dump()```和堆栈轨迹的输出使用彩色展示。在Windows下，需要安装 [ANSICON](http://adoxa.110mb.com/ansicon/) 工具。   
	
	如果这个项被设置为2，Xdebug将会总是以彩色模式显示结果，无论是否连接到TTY或者是安装了 [ANSICON](http://adoxa.110mb.com/ansicon/) 。
- **xdebug.overload_var_dump**   
	Type:boolean, 默认值: 1, 从Xdebug2.1开始引入   
	
	默认情况下，Xdebug在php.ini 中的```html_errors``` 配置项设置为1的情况下，使用它的扩展版本的```var_dump()```用于显示变量，为了照顾到你可能不希望使用这个特性，你可以设置该项为0，但是不要忘记首先检查一下是否它不够智能的关闭了 ```html_errors```。
	
	你也可以设置这个项为2，除了格式化```var_dump()```的输出让它看起来更加好看之外，它也添加了文件名和行号到输出中，还增加了```xdebug.file_link_format``` 配置项。（Xdebug2.3新增）
- **xdebug.var_display_max_children**   
	Type: integer, 默认值： 128
	
	控制使用```xdebug_var_dump()```, ```xdebug.show_local_vars```或者堆栈函数输出数组变量子元素或者对象的属性的数量。
	
	要想不做任何限制，设置该项为-1。
	
	这个选项并不会影响使用远程调试时发送给客户端的子元素的数量。
- **xdebug.var_display_max_data**   
	Type: integer,  默认值: 512
	
	控制使用```xdebug_var_dump()```, ```xdebug.show_local_vars```或者堆栈函数输出最大的字符串长度。
	
	要想不做任何限制，设置该项为-1。
	
	这个选项并不会影响使用远程调试时发送给客户端的子元素的数量。
- **xdebug.var_display_max_depth**   
	Type: integer, 默认值: 3
	
	控制使用```xdebug_var_dump()```, ```xdebug.show_local_vars```或者堆栈函数输出数组变量子元素或者对象的属性的嵌套数量。
	
	要想不做任何限制，设置该项为-1。
	
	这个选项并不会影响使用远程调试时发送给客户端的子元素的数量。

####相关函数

- **void var_dump([mixed var[,...]])**   
	显示变量的详细信息
	
	这个函数是xdebug覆写的，描述请看 ```xdebug_var_dump()```。
- **void xdebug_debug_zval([string varname[,...]])**   
	显示变量的信息
	
	这个函数用于显示变量的结构化信息，包含：值、类型、引用计数。数组将会被递归的展示。这个函数与PHP的```debug_zval_dump()```的实现方式是不同的，PHP内置的```debug_zval_dump()``` 函数通过传递变量给函数，这使得输出结果并不准确。而Xdebug版本的，则通过传递变量名称作为参数，xdebug将会通过变量名称去到内部的符号表中去查找变量，直接访问所有的属性。这样的实现方式输出的zval的结构信息比PHP内置的方式是更加精确的。
	
	支持任何简单的变量名是从Xdebug2.3开始引入的（例如下面的"a[2]"）。
	<pre>
	&lt;?php
    $a = array(1, 2, 3);
    $b =& $a;
    $c =& $a[2];

    xdebug_debug_zval('a');
    xdebug_debug_zval("a[2]");
	?&gt;
	</pre>	
	输出结果：
	<pre>
	a: (refcount=2, is_ref=1)=array (
	0 => (refcount=1, is_ref=0)=1, 
	1 => (refcount=1, is_ref=0)=2, 
	2 => (refcount=2, is_ref=1)=3)
	a[2]: (refcount=2, is_ref=1)=3
	</pre>
- **void xdebug_debug_zval_stdout([string varname[,...]])**   
	输出变量内容到标准输出。
	
	与```xdebug_zval_dump()```的不同之处在于它不会输出到Web服务器的API层，而是直接显示在标准输出中（当你运行在Apache的单进程模式中时，它将会输出到控制台）。
- **void xdebug_dump_superglobals()**   
	显示超级全局变量的信息.
	
	这个函数根据```xdebug.dump.*```指令的配置输出超级全局变量的值。