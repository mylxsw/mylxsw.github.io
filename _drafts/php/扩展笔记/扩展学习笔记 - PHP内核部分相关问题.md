扩展学习笔记 - PHP内核部分相关问题
==================

[TOC]

###如何在编译的时候检查出来是否时候用了线程安全兼容的编码方式?

在`./configure`的时候，增加选项`enable-maintainer-zts`将会按照线程安全的方式进行
编译时检查，即使在Cli模式下使用，也会检查是否增加了线程安全兼容。


###常用的线程安全宏定义

    #define TSRMLS_D      void ***tsrm_ls
    #define TSRMLS_DC     , void ***tsrm_ls
    #define TSRMLS_C      tsrm_ls
    #define TSRMLS_CC     , tsrm_ls

从上面的定义可以看出，`_D`的含义应该是`definitions`，在函数定义的时候使用，`_C`则
为实参。


###如何从符号表中检索内容

    {
      zval **fooval;

      if (zend_hash_find(EG(active_symbol_table), "foo", sizeof("foo"),
        (void **) &fooval) == SUCCESS) {
          php_printf("Got the value of $foo!");
        } else {
          php_printf("$foo is not defined.");
        }
    }

这里使用`zend_hash_find()`方法接收四个参数，第一个为当前活动的符号表（哈希表），第二个为要查找的key，
第三个为key的长度，第四个为结果存储到的变量。


    ZEND_API int zend_hash_find(const HashTable *ht, const char *arKey, uint nKeyLength, void **pData)

上面为`zend_hash_find()`函数签名，第二、三个参数建议使用宏替换。

    /* zend.h:502 */
    #define ZEND_STRS(str) (str), (sizeof(str))

    /* 调用DEMO */
    zend_hash_find(&EG(symbol_table), ZEND_STRS("_POST"), (void **)&carrier)




###内存管理

在扩展开发中，我们不应该直接使用原生的内存分配函数，取而代之的是我们应该尽量使用Zend提供的内存分配函数代替。

标准C     | Zend标准        | Zend持久化
---------|----------------|----------
malloc   | emalloc        | pemalloc
calloc   | ecalloc        | pemalloc
realloc  | erealloc       | perealloc
strdup   | estrdup        | pestrdup
free     | efree          | pefree


以`p`开头的宏为可以持久化存储的宏，这类宏中，通常会有一个`persistent`的参数，该参数取值为
0（非持久化，跳转到`e`系列宏）或者1（持久化，跳转到原生的内存分配函数）。这里的持久化/非持久化
指的是该内存的生命周期是针对整个PHP进程的还是每个请求的。

> 相关内存分配、释放函数（宏）见源码`zend_alloc.h`文件第69行。另外，不要认为持久化的内存
> 会是真正的持久存储的，这里的持久是对线程来说的，进程结束后这部分内存也会被释放掉。

__________

###zval_dtor和 FREE_ZVAL的区别

这两个前者是zval销毁时的析构函数，FREE_ZVAL是个宏，这两者一定要按照顺序调用，先zval_dtro，
然后是FREE_ZVAL，因为zval_dtor完成的工作是释放zval指向的数据区域（例如数组、对象等），
而FREE_ZVAL则只是释放zval本身。


###配置开发环境

使用`./configure`的时候，比较实用的选项：`enable-debug` 和 `enable-maintainer-zts`。

- enable-debug 将启用开发模式，可以报告出程序出现的内存泄漏以及Zend和PHP源码中所有调试信息，
  同时，编译后的程序中会包含调试信息，可以使用`gdb`进行跟踪调试。

- enable-maintainer-zts 将会使用多线程模式（线程安全）编译，可以检查程序对线程安全的兼容性。



####头文件

通常都需要一个头文件，这里叫做`php_sample.h`:


    #ifndef PHP_SAMPLE_H
    /* 防止该头文件被多次include时出现重定义问题 */
    #define PHP_SAMPLE_H

    /* 定义扩展属性 */
    #define PHP_SAMPLE_EXTNAME    "sample"
    #define PHP_SAMPLE_EXTVER    "1.0"

    /* 当在PHP源文件树之外构建的时候，导入配置选项 */
    #ifdef HAVE_CONFIG_H
    #include "config.h"
    #endif

    /* 包含PHP标准头文件 */
    #include "php.h"

    /* 定义Zend在加载模块时的入口符号 */
    extern zend_module_entry sample_module_entry;
    #define phpext_sample_ptr &sample_module_entry

    #endif /* PHP_SAMPLE_H */


####源文件

这里的源文件名称为`sample.c`，虽然下面的代码没有实际意义，但是演示了一个基本的扩展需要提供的内容。


    /* 包含刚才定义的头文件 */
    #include "php_sample.h"

    /* 定义头文件中声明的zend_module_entry结构体 */
    zend_module_entry sample_module_entry = {
    #if ZEND_MODULE_API_NO >= 20010901
         STANDARD_MODULE_HEADER,
    #endif
        PHP_SAMPLE_EXTNAME,
        NULL, /* Functions */
        NULL, /* MINIT */
        NULL, /* MSHUTDOWN */
        NULL, /* RINIT */
        NULL, /* RSHUTDOWN */
        NULL, /* MINFO */
    #if ZEND_MODULE_API_NO >= 20010901
        PHP_SAMPLE_EXTVER,
    #endif
        STANDARD_MODULE_PROPERTIES
    };

    #ifdef COMPILE_DL_SAMPLE
    ZEND_GET_MODULE(sample)
    #endif


> 注意： 上面的结构体中包含了条件判断语句，该语句是为 **PHP 4.2.0** 以下版本兼容提供的，
> 因为现在PHP版本都在5.0以上，该条件语句可以直接忽略。

####在*nix系统下构建扩展

首先需要进入到扩展源文件目录，执行以下命令就可以单独构建扩展，`make install`之后，
扩展将会被安装到系统中php指定的扩展文件目录中，例如，我的系统是Mac，使用系统自带的phpize编译
之后，扩展文件会被安装到`/usr/lib/php/extensions/no-debug-non-zts-20121212/
`目录中。


    # phpize
    # ./configure
    # make
    # make install



####加载扩展的两种方式

第一种是使用函数`dl()`进行加载，如下:

    <?php
      dl('sample.so');
      var_dump(get_loaded_modules());


第二种是在`php.ini`中配置:

    extension_dir=/usr/local/lib/php/modules/
    extension=sample.so


###变量相关操作

####php变量结构


    typedef struct _zval_struct zval;

    struct _zval_struct {
      zvalue_value value; /* 存储变量的值 */
      zend_uint refcount__gc; /* 引用计数，默认值1 */
      zend_uchar type; /* 存储变量的类型 */
      zend_uchar is_ref__gc; /* 表示是否为引用，默认值0 */
    }

    typedef union _zvalue_value {
      long lval;
      double dval;
      struct {
        char *val;
        int len;
      } str;
      HashTable *ht;
      zend_object_value obj;
    } zvalue_value;


    typedef unsigned int zend_object_handle;
    typedef struct _zend_object_handlers zend_object_handlers;

    typedef struct _zend_object_value {
      zend_object_handle handle;
      zend_object_handlers *handlers;
    } zend_object_value;


字段type取值：`IS_NULL`，`IS_LONG`， `IS_DOUBLE`， `IS_BOOL`， `IS_ARRAY`，
`IS_OBJECT`， `IS_STRING`， `IS_RESOURCE`，`IS_CONSTANT`， `IS_CONSTANT_ARRAY`。


####常见的变量操作宏


    CG    -> Complier Global      编译时信息，包括函数表等(zend_globals_macros.h:32)
    EG    -> Executor Global      执行时信息(zend_globals_macros.h:43)
    PG    -> PHP Core Global      主要存储php.ini中的信息(php_globals.h:29)
    SG    -> SAPI Global          SAPI信息


EG获取的是`struct _zend_execution_globals`结构体中的数据。

    struct _zend_execution_globals {
      ...
      HashTable symbol_table;   /* 全局作用域，如果没有进入函数内部，全局＝活动 */
      HashTable *active_symbol_table; /* 活动作用域，当前作用域 */
      ...
    }

通常，使用`EG(symbol_table)`获取的是全局作用域中的符号表，使用`EG(active_symbol_table)`获取的是当前作用域下的符号表。

> 需要注意的是`symbol_table`并不是指针，注意适当的时候应该添加`&`。

例如,PHP中的`<?php $foo = 'bar'; ?>`，在C中为:

    {
      zval *fooval;

      MAKE_STD_ZVAL(fooval);
      ZVAL_STRING(fooval, "bar", 1);
      ZEND_SET_SYMBOL(EG(active_symbol_table), "foo", fooval);
    }

上面的代码中，`EG(active_symbol_table) == &EG(symbol_table)`。

宏定义`PG`用于访问`php_core_globals`类型(main.c:125)的全局变量，该全局变量包含了`php.ini`中的配置信息，用于访问配置。


####如何获取变量的类型和值

要获取变量的类型，使用宏`Z_TYPE_P`宏。


    void describe_zval(zval *foo)
    {
      if (Z_TYPE_P(foo) == IS_NULL) {
        php_printf("The variable is NULL");
      } else {
        php_printf("The variable is of type %d", ZEND_TYPE_P(foo));
      }
    }


> 注意的是，获取变量类型要用Z_TYPE_P()宏，而不要使用zval->type，兼容性考虑。这里的`_P`指
该宏的参数应该是一个指针，如果`_PP`则其参数为指向指针的指针，如果没有的话，参数直接为zval变量。

要获取变量的值，也应该使用Zend定义的宏进行访问。对于简单的标量数据类型、Boolean，long，double，
使用`Z_BVAL`, `Z_LVAL`, `Z_DVAL`。


    void display_values(zval boolzv, zval *longpzv, zval **doubleppzv)
    {
      if (Z_TYPE(boolzv) == IS_BOOL) {
        php_printf("The value of the boolean is : %s\n", Z_BVAL(boolzv) ? "true" : "false");
      }
      if(Z_TYPE_P(longpzv) == IS_LONG) {
        php_printf("The value of the long is: %ld\n", Z_LVAL_P(longpzv));
      }
      if(Z_TYPE_PP(doubleppzv) == IS_DOUBLE) {
        php_printf("The value of the double is : %f\n", Z_DVAL_PP(doubleppzv));
      }
    }


对于字符串类型，因为它含有两个字段`char *` (Z_STRVAL) 和 `int` (Z_STRLEN)，因此需要用两个宏来进行取值。


    void display_string(zval *zstr)
    {
      if (Z_TYPE_P(zstr) != IS_STRING) {
        php_printf("The wronng datatype was passed!\n");
        return ;
      }
      PHPWRITE(Z_STRVAL_P(zstr), Z_STRLEN_P(zstr));
    }


因为数组在zval中是以HashTable形式存在的，因此使用`Z_ARRVAL()`进行访问。具体访问方式和对象、
资源的访问将会单独进行介绍。


####如何创建变量

创建变量要为变量分配内存空间，在扩展开发中，不能使用`malloc(sizeof(zval))` ，而应该使用
Zend定义的宏`MAKE_STD_ZVAL(pzv)`分配变量内存空间，该宏将会对`ref_count__gc`和`is_ref__gc`
初始化，并且处理内存溢出的错误。

> 在PHP源码中，通常还会遇到另外一个创建变量的宏`ALLOC_INIT_ZVAL`，它与`MAKE_STD_ZVAL`的区别是
前者会初始化变量的类型为`IS_NULL`。


    /* zend.h */
    #define INIT_PZVAL(z)		\
      (z)->refcount__gc = 1;	\
      (z)->is_ref__gc = 0;

    #define INIT_ZVAL(z) z = zval_used_for_init;

    #define ALLOC_INIT_ZVAL(zp)						\
      ALLOC_ZVAL(zp);		\
      INIT_ZVAL(*zp);

    #define MAKE_STD_ZVAL(zv)				 \
      ALLOC_ZVAL(zv); \
      INIT_PZVAL(zv);


    /* zend_alloc.h */
    #define ALLOC_ZVAL(z)	\
      ZEND_FAST_ALLOC(z, zval, ZVAL_CACHE_LIST)

    #define ZEND_FAST_ALLOC(p, type, fc_type)	\
      (p) = (type *) emalloc(sizeof(type))



以上代码展开之后，我们可以看到`MAKE_STD_ZVAL`和`ALLOC_INIT_ZVAL`都做了什么：

    /* MAKE_STD_ZVAL*/
    (zv) = (zval *) emalloc(sizeof(zval));
    (zv)->refcount__gc = 1;
    (zv)->is_ref__gc = 0;

    /* ALLOC_INIT_ZVAL */
    (zp) = (zval *) emalloc(sizeof(zval));
    *zp = zval_used_for_init;/* ZEND_API zval zval_used_for_init; */

    /* 对zval_used_for_init的初始化 */
    Z_UNSET_ISREF(zval_used_for_init);
    Z_SET_REFCOUNT(zval_used_for_init, 1);
    Z_TYPE(zval_used_for_init) = IS_NULL;


从上可以看出，`MAKE_STD_ZVAL`只是分配了内存空间，设置引用计数等，而`ALLOC_INIT_ZVAL`
在分配内存空间后，将变量`zval_used_for_init`直接赋值，该变量类型为`IS_NULL`。

一旦创建变量之后，就可以使用变量赋值宏进行赋值了。变量赋值也是用Zend定义的宏完成。
`ZVAL_RESOURCE`,`ZVAL_BOOL`, `ZVAL_NULL`, `ZVAL_LONG`, `ZVAL_DOUBLE`,
`ZVAL_STRING`, `ZVAL_STRINGL`, `ZVAL_EMPTY_STRING`, `ZVAL_ZVAL`。

> 变量赋值相关宏定义查看源码`Zend/zend_API.h`第520行左右。

实际上，这些宏展开一次之后主要分为两步：设置zval类型，设置取值。以`ZVAL_BOOL`为例：


    #define ZVAL_BOOL(z, b) {       \
            Z_TYPE_P(z) = IS_BOOL;  \
            Z_LVAL_P(z) = ((b) != 0);\
          }


####常用的输出函数

    int php_printf(const char *format, ...);
    int php_write(void *buf, uint size TSRMLS_DC);
    int PHPWRITE(void *buf, uint size);
    void php_html_puts(const char *buf, uint size TSRMLS_DC)


当需要调试或者是查看变量当前的值的时候，可以使用下列函数：

    ZEND_API int zend_print_zval(zval *expr, int indent);
    ZEND_API void zend_print_zval_r(zval *expr, int indent TSRMLS_DC);


这里的`expr`是需要打印的`zval`变量，`indent`是打印的时候的缩进量。这两个函数不同之处在于，
前者打印出zval的平面表示，并且打印出那些无法很好显示的复杂类型的文本描述。后者则会递归打印zval，
输出结果与PHP中的`print_r`函数相同。

####格式化函数

在PHP扩展开发中，应该避免直接使用`sprintf`函数，取而代之的是使用`main/spprintf.h`
中定义的`spprintf`和`vspprintf`函数。

在`main/spprintf.h`中，总共定义了两个函数API：

    PHPAPI int spprintf( char **pbuf, size_t max_len, const char *format, ...);
    PHPAPI int vspprintf(char **pbuf, size_t max_len, const char *format, va_list ap);


####字符串连接

    /* zend_operators.h */
    ZEND_API int add_char_to_string(zval *result, const zval *op1, const zval *op2);
    ZEND_API int add_string_to_string(zval *result, const zval *op1, const zval *op2);

    ZEND_API int concat_function(zval *result, zval *op1, zval *op2 TSRMLS_DC);


> 如果需要将str2连接到str1之后，则可以将result设置为str1。

####大小写转换

    ZEND_API void zend_str_tolower(char *str, unsigned int length);
    ZEND_API char *zend_str_tolower_copy(char *dest, const char *source, unsigned int length);
    ZEND_API char *zend_str_tolower_dup(const char *source, unsigned int length);

> 注意的是，在Zend中并没有提供转换为大写的函数，在PHP标准扩展中可以找到该函数。
