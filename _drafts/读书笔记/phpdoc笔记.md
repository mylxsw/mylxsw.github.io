###PHPDoc支持的变量类型

#####下面是PHPDOC的基本数据类型列表：

- **string**

	A piece of text of an unspecified length.

- **int or integer**

	A whole number that may be either positive or negative.

- **float**

	A real, or decimal, number that may be either positive or negative.

- **bool or boolean**

	A variable that can only contain the state ‘true’ or ‘false’.

- **array**

	A collection of variables of unknown type. It is possible to specify the types of array members, see the chapter on arrays for more information.

- **resource**

	A file handler or other system resource as described in the PHP manual.

- **null**

	The value contained, or returned, is literally null. This type is not to be confused with void, which is the total absence of a variable or value (usually used with the @return tag).

- **callable**

	A function or method that can be passed by a variable, see the PHP manual for more information on callables.

#####PHPDoc也支持一些非PHP本地的，但是却经常会被使用的数据类型

- **mixed**

	A value with this type can be literally anything; the author of the documentation is unable to predict which type it will be.

- **void**

	This is not the value that you are looking for. The tag associated with this type does not intentionally return anything. Anything returned by the associated element is incidental and not to be relied on.

- **object**

	An object of any class is returned,

- **false or true**

	An explicit boolean value is returned; usually used when a method returns ‘false’ or something of consequence.

- **self**

	An object of the class where this type was used, if inherited it will still represent the class where it was originally defined.

- **static**

	An object of the class where this value was consumed, if inherited it will represent the child class. (对应PHP的静态延迟绑定).

- **$this**

	This exact object instance, usually used to denote a fluent interface.

###常用标签

- @inheritDoc

	内联标签，一般放在长描述中，用于引用覆写的方法的文档内容，会将父类中的长描述内容引入到当前方法描述中。


