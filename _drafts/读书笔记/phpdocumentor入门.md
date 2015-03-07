[TOC]

### 概述

本文的目的是向你介绍使用`phpDocumentor`书写并且生成高效的文档。

### 写一个个文档块（DocBlock）

文档块是源代码中的一行文档注释，用于告诉你它所标识的类、方法或者是其它结构化的元素的作用是什么。

### 哪些元素可以被文档化

在讨论DocBlock之前，让我们先看看你可以为哪些元素创建文档。`phpDocumentor`遵循了PHPDOC规范，能够识别下列结构化元素：

- Function 函数
- Constant 常量
- Class 类
- Interface 接口
- Trait
- Class constant 类常量
- Property 属性
- Method 方法

除了上面这些，PHPDoc标准也支持对文件的DocBlock和include/require块。

在上面这些元素的前面，都可以有一个文档块标识它们，但是注意的是，在文档块和代码定义之间不可以有其它代码或者注释。

### 文档块是什么

文档块总是放在/**和 \*/之间，在之间的每一行内容都应该以\*开头。每个文档块都放在它关联的元素定义之前。

例如：
```php
<?php
/**
 * This is a DocBlock.
 */
function associatedFunction()
{
}
```

> ####文件级别的代码块
> 通常有很多项目希望在整个文件上标注它使用的license或者是函数，而不是在单个元素上做。可以通过在文件的第一个元素上面进行标注实现这个功能。需要注意的是，接下来的其它的代码块将不会再被作为文件级别的代码块了。   
> 下面的文档块是文件级别的代码块：
```php
<?php
/**
 * 属于文件的块
 */ 
/**
 * 属于类的注释
 */
class Def
{
}
```

然而，下面的例子中的文档块属于下面的类：

```php
<?php
/**
 * I belong to a class
 */

class Def
{
}
```

文档块被分为三部分。

- 总结部分
	有时候也被成为是短描述，它提供了对关联的元素的简单描述。

- 描述部分
	有时候也叫做长描述，提供更多的描述信息。例如描述函数的实现算法、使用方式或者是描述如何适应整个应用程序的架构等额外的信息。这一部分在标签出现或者是注释部分结束的地方终止。

- 标签和注解
	提供被描述元素的一些元信息，例如描述方法或者是函数的返回类型。每个标签都以新行中的@开头。

例子：
```php
<?php
 /**
  * 这里是总结信息.
  *
  * 描述部分，这部分可以是多行，提供了对元素的详细描述信息
  * 并且提供了对其它一些后台的信息或者是对其它资源的引用
  *
  * @param string $myArgument 参数描述，这个描述也可以
  * 	是多行的
  * @return void
  */
  function myFunction($myArgument)
  {
  }
```

### 运行phpDocumentor

在安装phpDocumentor之后，你可以使用命令`phpdoc`生成文档。

该命令的基本用法是使用选项(-d 文件， -f 文件)指定要操作的文件夹或者文件，并且告诉它你要输出文档的位置（-t）。
```shell
$ phpdoc -d ./src -t ./docs/api
```
上述命令将会搜索src目录和它的子目录下的文件，对他们进行分析并生成一个包含文档的站点到你的doc/api目录下。如果你忽略-t选项的话，默认将会输出到当前路径下的output目录下。

> phpDocumentor支持多种不同的主题，可以协助你生成不同样式的文档。

使用phpDocumentor时，有很多命令行参数可供选择，但是通常情况下，最常用到的是`-t`（指定输出目录）, `-d`（指定要为该文件夹下的所有文件生成文档） , `-f`（为指定的文件生成文档）.

> phpDocumentor默认认为代码是使用UTF-8进行编码的，如果你的代码是其它编码格式，可以使用参数`--encoding`指定其它编码格式。

如果希望在使用`-d`选项指定目录的时候，能够排除一些不需要生成文档的文件，可以使用`--ignore`参数，该参数支持通配符。`--ignore "*/tests/*,tests/*"`。

默认情况下，phpDocumentor将会忽略隐藏文件和符号链接，你可以通过选项`--hidden=off`和`--symlinks=off`控制它的行为。

### 标签常用方法

#### @example
该标签用于指出代码的范例所在的位置，该位置可以为绝对路径或者是相对本文件的相对路径。
```php
@example [location][<start-line>[<number-of-lines>]][<description>]
```
例如：
```php
/**
  * @example example1.php Counting in action.
  * @example http://example.com/example2.phps Counting in action by a 3rd party.
  * @example "My Own Example.php" My counting.
  */
 function count()
 {
     <...>
 }
```
> 该标签`@example`可以用于内联，也可以用于非内联。

#### @internal
该标签指出声明的方法、函数等为项目内部使用的，通常与`@api`一起使用，用于指出标注的结构化元素只在软件的内部使用。

```php
@internal [description]
```
例如：
```php
/**
  * @internal
  *
  * @return integer Indicates the number of items.
  */
 function count()
 {
     <...>
 }
```
如果是内联的话，这样使用:
```php
/**
  * Counts the number of Foo.
  *
  * {@internal Silently adds one extra Foo to compensate for lack of Foo }}
  *
  * @return integer Indicates the number of items.
  */
 function count()
 {
     <...>
 }
```

####@inheritdoc
该标签用于子类或者子类中重写的父类方法的注释，引用父类中的注释内容。
例如：
```php
class A extends B{
	/**
     * 该方法在B类中存在
     *
     * 该方法在B类中存在，这里引用B类中的注释内容{@inheritdoc}
     *
     * @return void
     */
	public function methodA(){}
}
```

####@link
该标签用于指出当前文档块与`@link`指向的链接内容有一定的关系。

```php
@link [URI][<description>]
```

例如：
```php
/**
  * @link http://example.com/my/bar Documentation of Foo.
  *
  * @return integer Indicates the number of items.
  */
 function count()
 {
     <...>
 }
```
内联用法:
```php
/**
  * This method counts the occurrences of Foo.
  *
  * When no more Foo ({@link http://example.com/my/bar}) are given this
  * function will add one as there must always be one Foo.
  *
  * @return integer Indicates the number of items.
  */
 function count()
 {
     <...>
 }
```

####@see
该标签用于引用文档中的其它标签或者是其它的URI。
```php
@see [URI|其它文档元素][<description>]
```
例子：
```php
/**
  * @see http://example.com/my/bar Documentation of Foo.
  * @see MyClass::$items           For the property whose items are counted.
  * @see MyClass::setItems()       To set the items for this collection.
  *
  * @return integer Indicates the number of items.
  */
 function count()
 {
     <...>
 }
```

####@api
该标签用于表明声明的元素为向第三方提供的API，被该标签声明的元素应该在日后其使用方法是不变的，除非有新的版本，而且应该保持向后兼容，一般用在框架或者其他对外开放的调用服务中。
```php
@api
```
例子：
```php
/**
  * This method will not change until a major release.
  *
  * @api
  *
  * @return void
  */
  function showVersion()
  {
     <...>
  }
```

####@author
说明元素的作者。
```php
@author [name][<email address>]
```
例如：
```php
/**
  * @author My Name
  * @author My Name <my.name@example.com>
  */
```

####@copyright
用于标识版权信息.
```php
@copyright [description]
```

例如：
```php
/**
  * @copyright 1997-2005 The PHP Group
  */
```

####@deprecated
表明元素已经不推荐使用了，在之后将会被移除。
```php
@deprecated [<version>][<description>]
```

例如：
```php
/**
  * @deprecated
  * @deprecated 1.0.0
  * @deprecated No longer used by internal code and not recommended.
  * @deprecated 1.0.0 No longer used by internal code and not recommended.
  */
 function count()
 {
     <...>
 }
```

####@filesource
该标签用于在文档中包含文件源码，该标签只能用在文件级别。

```php
@filesource
```
例如:
```php
/**
  * @filesource
  */
```

####@ignore
该标签用于告诉phpDocumentor该元素不需要被处理。
```php
@ignore [<description>]
```
例如：
```php
if ($ostest) {
     /**
      * This define will either be 'Unix' or 'Windows'
      */
     define("OS","Unix");
 } else {
     /**
      * @ignore
      */
     define("OS","Windows");
 }
```

####@license
该标签用于指出文档块使用的license。
```php
@license [<url>][name]
```
例如：
```php
/**
  * @license GPL
  * @license http://opensource.org/licenses/gpl-license.php GNU Public License
  */
```

####@method
该标签用于告诉类哪些**魔术方法**是可以调用的。该标签只能用于class和interface。
```php
@method [return type][name]([[type][parameter]<,...>])[<description>]
```
例子：
```php
class Parent
 {
     public function __call()
     {
         <...>
     }
 }

 /**
  * @method string getString()
  * @method void setInteger(integer $integer)
  * @method setString(integer $integer)
  */
 class Child extends Parent
 {
     <...>
 }
```

####@package
用于在逻辑的目录结构中组织元素，该标签一般用于模拟实现命名空间，所以，对于包名，一般使用`\`作为分隔符。

理论上说，`@package`的目录级别是无限的，但是推荐限制级别在六级以内，同时，也允许使用`_`或者是`.`作为分隔符，当然，并不推荐这样使用，这样只是为了项目向后兼容考虑。

```php
@package [level 1]\[level 2]\[etc.]
```
例如：
```php
/**
  * @package PSR\Documentation\API
  */
```
> 该标签`@package`用于取代已经弃用的`@category`标签，同时，`@subpackage`也被弃用了。

####@param
该标签用于说明函数或者方法的一个参数。
```php
@param [Type][name][<description>]
```
例子：
```php
/**
  * Counts the number of items in the provided array.
  *
  * @param mixed[] $items Array structure to count the elements of.
  *
  * @return int Returns the number of elements.
  */
 function count(array $items)
 {
     <...>
 }
```

####@property
该属性与`@method`类似，用于告诉类他实现了哪些`魔术属性`。
```php
@property [Type][name][<description>]
```

>一般用在类中实现了`__get()`和`__set()`魔术方法的情况下。

例如：
```php
class Parent
 {
     public function __get()
     {
         <...>
     }
 }

 /**
  * @property string $myProperty
  */
 class Child extends Parent
 {
     <...>
 }
```
> 同类型的属性还有`@property-read`和`@property-write`，这两个属性与`@property`作用相同，区别在于一个在于说明属性只读(`__get()`)，一个只写(`__set()`)。

####@return
用于说明函数或者方法的返回值，需要注意的是，如果不提供该参数，则隐含的说明返回值为void，即`@return void`。
```php
@return [Type][<description>]
```
例子：
```php
/**
  * @return integer Indicates the number of items.
  */
 function count()
 {
     <...>
 }
/**
  * @return string|null The label's text or null if none provided.
  */
 function getLabel()
 {
     <...>
 }
```

####@since
用于表明该文档块自哪个版本开始有效。
```php
@since [version][<description>]
```
例如：
```php
/**
  * @since 1.0.1 First time this was introduced.
  *
  * @return integer Indicates the number of items.
  */
 function count()
 {
     <...>
 }

 /**
  * @since 1.0.2 Added the $b argument.
  * @since 1.0.1 Added the $a argument.
  * @since 1.0.0
  *
  * @return void
  */
 function dump($a, $b)
 {
     <...>
 }
```

####@throws
该标签用于指出是否一个结构化的元素可能会抛出指定类型的异常。
```php
@throws [Type][<description>]
```
例子:
```php
/**
  * Counts the number of items in the provided array.
  *
  * @param mixed[] $array Array structure to count the elements of.
  *
  * @throws InvalidArgumentException if the provided argument is not of type
  *     'array'.
  *
  * @return int Returns the number of elements.
  */
 function count($items)
 {
     <...>
 }
```

####@todo
该标签用于表明该元素还需要进行哪些开发。
```php
@todo [description]
```

例子：
```php
/**
  * Counts the number of items in the provided array.
  *
  * @todo add an array parameter to count
  *
  * @return int Returns the number of elements.
  */
 function count()
 {
     <...>
 }
```

####@uses & @used-by
该标签用于说明对其他元素的引用（或者是被引用）。
```php
@uses [其他元素][<description>]
```

该元素与`@see`之间的区别在于`@see`是单向的，而`@uses`是双向的，也就是说，在被引用的元素中，要添加`@used-by`标签，以便于能够跳转回来。

例子：
```php
/**
  * @uses MyClass::$items to retrieve the count from.
  *
  * @return integer Indicates the number of items.
  */
 function count()
 {
     <...>
 }
```

####@var
该标签用于类的属性。
```php
@var ["Type"][$element_name][<description>]
```
例如:
```php
class Foo
{
  /** @var string|null Should contain a description */
  protected $description = null;
}

class Foo
{
  /**
   * @var string $name        Should contain a description
   * @var string $description Should contain a description
   */
  protected $name, $description;
}
```

####@version
说明元素的版本。
```php
@version [<vector>][<description>]
```

版本支持来自版本控制系统的配置，使用语法如下：
```php
版本控制系统名称: $vector$
```
例如：
```php
/**
  * @version 1.0.1
  */
 class Counter
 {
     <...>
 }

 /**
  * @version GIT: $Id$ In development. Very unstable.
  */
 class NeoCounter
 {
     <...>
 }
```