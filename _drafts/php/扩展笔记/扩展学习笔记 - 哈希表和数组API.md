扩展学习笔记 - 哈希表和数组API
==========================

[TOC]

Zend Hash API是以`zend_hash_*`样式的函数定义，注意的是，这里的`zend_hash_*`并不是函数，
而是宏定义，对应的函数一般为`_zend_hash_*`，哈希表相关操作源文件在 *zend_hash.h/zend_hash.c* 中。

###哈希表结构

    struct _hashtable;

    typedef struct bucket {
    	ulong h;            // 对char *key进行hash后的值，或者是用户指定的数字索引值
    	uint nKeyLength;	// hash关键字的长度，如果数组索引为数字，此值为0
    	void *pData;		// 指向value，一般是用户数据的副本，如果是指针数据，则指向pDataPtr
    	void *pDataPtr;		//如果是指针数据，此值会指向真正的value，同时上面pData会指向此值
    	struct bucket *pListNext;	// 整个hash表的下一元素
    	struct bucket *pListLast;   // 整个哈希表该元素的上一个元素
    	struct bucket *pNext;		// 存放在同一个hash Bucket内的下一个元素
    	struct bucket *pLast;		// 同一个哈希bucket的上一个元素
    	// 保存当前值所对于的key字符串，这个字段只能定义在最后，实现变长结构体
    	char arKey[1];
    } Bucket;

    typedef struct _hashtable {
    	uint nTableSize;    	// hash Bucket的大小，最小为8，以2x增长。
    	uint nTableMask;		// nTableSize-1 ， 索引取值的优化
    	uint nNumOfElements; 	// hash Bucket中当前存在的元素个数，count()函数会直接返回此值
    	ulong nNextFreeElement;	// 下一个数字索引的位置
    	Bucket *pInternalPointer;   // 当前遍历的指针（foreach比for快的原因之一）
    	Bucket *pListHead;          // 存储数组头元素指针
    	Bucket *pListTail;          // 存储数组尾元素指针
    	Bucket **arBuckets;         // 存储hash数组
    	dtor_func_t pDestructor;	// 在删除元素时执行的回调函数，用于资源的释放
    	zend_bool persistent;       //指出了Bucket内存分配的方式。如果persisient为TRUE，则使用操作系统本身的内存分配函数为Bucket分配内存，否则使用PHP的内存分配函数。
    	unsigned char nApplyCount; // 标记当前hash Bucket被递归访问的次数（防止多次递归）
    	zend_bool bApplyProtection;// 标记当前hash桶允许不允许多次访问，不允许时，最多只能递归3次
    #if ZEND_DEBUG
    	int inconsistent;
    #endif
    } HashTable;

______________

###哈希表操作API

####哈希表创建

    int zend_hash_init(
        HashTable *ht,              /* 声明的HashTable变量指针 */
        uint nSize,                 /* 哈希表可能存储的最大元素数量 */
        hash_func_t pHashFunction,  /* 使用的哈希函数，现在一律使用NULL（DJBX33A） */
        dtor_func_t pDestructor,    /* 从哈希表移除元素时的回调函数 */
        zend_bool persistent        /* 该哈希表是持久化的还是每请求的 */
    )

其中，`nSize`参数要为实际可能存储的元素数，如果超过该数目，将重新扩展哈希表为2倍大小。`nSize`
应该为2的整数倍，如果不是的话，将会自动设置为下一个2的整数倍数。

> nSize取值: nSize = pow(2, ceil(log(nSize, 2)));

这里的`pDestructor` 参数是一个函数指针，该函数会在从哈希表移除元素的时候调用，比如`zend_hash_del`，
`zend_hash_update`， 该函数的原型必须为：

    void method_name(void *pElement); /* pElement为要移除的元素 */

另外，最后一个参数`persistent`如果设置为持久化的话，该哈希表变量`ht`必须是使用`pemalloc()`分配内存的。

例如，在每个PHP请求开始的时候，都会对`EG(symbol_table)`全局符号表进行初始化，这时会调用该函数：

    zend_hash_init(&EG(symbol_table), 50, NULL, ZVAL_PTR_DTOR, 0);

> 这里的`nSize`为50，因此会被自动扩展为64。

______________

####哈希表填充

对哈希表的填充操作，主要有四个函数：

    int zend_hash_add(
      HashTable *ht,        /* 要操作的哈希表指针 */
      char *arKey,          /* 数组的Key，这里是字符型key */
      uint nKeyLen,         /* 数组Key长度 */
      void **pData,         /* 实际存储的数据 */
      uint nDataSize,       /* 数据大小 */
      void *pDest           /* 如果指定，则为指向data的副本的指针 */
    );
    int zend_hash_update(HashTable *ht, char *arKey, uint nKeyLen,
                    void *pData, uint nDataSize, void **pDest);

    int zend_hash_index_update(
      HashTable *ht,
      ulong h, /* 数组下标索引 */
      void *pData,
      uint nDataSize,
      void **pDest
    );

    /* 该函数自动计算下一个索引，不需要自己提供 */
    int zend_hash_next_index_insert(
      HashTable *ht,
      void *pData, uint nDataSize, void **pDest);

这里需要注意的是，前两个函数是对非数字key的数组操作的，后两个是对数值索引数组操作的。

`zend_hash_add`和`zend_hash_update`的区别在于，一个是新增元素，一个是更新元素，如果`arKey`
已经存在了的话，`zend_hash_add`将会失败。

    /* $foo['bar'] = 'baz'; */
    zend_hash_add(fooHashTbl, "bar", sizeof("bar"), &barZval, sizeof(zval*), NULL);

使用`zend_hash_index_update()` 的例子:

    ulong nextid = zend_hash_next_free_element(ht);
    zend_hash_index_update(ht, nextid, &data, sizeof(data), NULL);

______________

####哈希表查找
由于哈希表有两种使用方式（数值索引/关联索引），因此，对于哈希表查找，也有两种查找函数：

    int zend_hash_find(HashTable *ht, char *arKey, uint nKeyLength,
                                            void **pData);
    int zend_hash_index_find(HashTable *ht, ulong h, void **pData);


例如：

    void hash_sample(HashTable *ht, sample_data *data1)
    {
       sample_data *data2;
       ulong targetID = zend_hash_next_free_element(ht);
       if (zend_hash_index_update(ht, targetID,
               data1, sizeof(sample_data), NULL) == FAILURE) {
           /* Should never happen */
           return;
       }
       if(zend_hash_index_find(ht, targetID, (void **)&data2) == FAILURE) {
           /* Very unlikely since we just added this element */
           return;
       }
       /* data1 != data2, 但是 *data1 == *data2 */
    }

相比查找数组中的值，通常，我们还会经常用到判断数组中是否存在某个索引，这时，使用下面两个函数：

    int zend_hash_exists(HashTable *ht, char *arKey, uint nKeyLen);
    int zend_hash_index_exists(HashTable *ht, ulong h);

例如：

    /* 该部分代码实现功能与isset($foo)类似 */
    if (zend_hash_exists(EG(active_symbol_table),
                                    "foo", sizeof("foo"))) {
        /* $foo is set */
    } else {
        /* $foo does not exist */
    }

______________

####快速填充和查找

要实现快速的填充和查找，这里采用的方法是首先使用`zend_get_hash_value()`函数计算出哈希索引值，
在接下来对数组的操作中，直接使用`quick`系列函数，避免每次操作都重新计算哈希值。

    ZEND_API ulong zend_get_hash_value(const char *arKey, uint nKeyLength);

快速操作函数如下：


    int zend_hash_quick_add(HashTable *ht,
        char *arKey, uint nKeyLen, ulong hashval,
        void *pData, uint nDataSize, void **pDest);

    int zend_hash_quick_update(HashTable *ht,
        char *arKey, uint nKeyLen, ulong hashval,
        void *pData, uint nDataSize, void **pDest);

    int zend_hash_quick_find(HashTable *ht,

        char *arKey, uint nKeyLen, ulong hashval, void **pData);
    int zend_hash_quick_exists(HashTable *ht,
        char *arKey, uint nKeyLen, ulong hashval);

    int zend_hash_quick_del(HashTable *ht, char *arKey, unit nKeyLength, ulong hashval);

例如：

    void php_sample_hash_copy(HashTable *hta, HashTable *htb,
                        char *arKey, uint nKeyLen TSRMLS_DC)
    {
        /* 事先计算出key的哈希值 */
        ulong hashval = zend_get_hash_value(arKey, nKeyLen);
        zval **copyval;

        if (zend_hash_quick_find(hta, arKey, nKeyLen,
                    hashval, (void**)&copyval) == FAILURE) {
            /* arKey doesn't actually exist */
            return;
        }
        /* The zval* is about to be owned by another hash table */
        (*copyval)->refcount++;
        zend_hash_quick_update(htb, arKey, nKeyLen, hashval,
                    copyval, sizeof(zval*), NULL);
    }

______________

###**zval\*** 数组API

在PHP扩展中，对哈希表的操作中95%的操作都是对用户空间的数据进行存取。因此PHP创建了一系列简单的
宏和助手函数用于对数组进行操作。

####数组创建

    int array_init(zval *arg);

该函数原型实际上是zend API定义的一个宏，其实现代码如下所示：


    /* zend_API.h:347 */
    #define array_init(arg)			_array_init((arg), 0 ZEND_FILE_LINE_CC)

    /* zend_API.c:958 */
    ZEND_API int _array_init(zval *arg, uint size ZEND_FILE_LINE_DC) /* {{{ */
    {
    	ALLOC_HASHTABLE_REL(Z_ARRVAL_P(arg)); /* 首先分配一个哈希表 */

    	/* 调用zend_hash_init完成哈希表的初始化 */
    	_zend_hash_init(Z_ARRVAL_P(arg), size, NULL, ZVAL_PTR_DTOR, 0 ZEND_FILE_LINE_RELAY_CC);
    	Z_TYPE_P(arg) = IS_ARRAY;/* 设置变量的数据类型为数组 */
    	return SUCCESS;
    }


使用范例:

    PHP_FUNCTION(sample_array)
    {
    	array_init(return_value);
    }

####数组填充

对与关联数组，提供了如下API：

    int add_assoc_long(zval *arg,  const char *key, long lval);
    int add_assoc_null(zval *arg,  const char *key);
    int add_assoc_bool(zval *arg,  const char *key, zend_bool bval);
    int add_assoc_resource(zval *arg,  const char *key, int r);
    int add_assoc_double(zval *arg,  const char *key, double dval);
    int add_assoc_string(zval *arg,  const char *key, char *strval, int dup);
    int add_assoc_stringl(zval *arg,  const char *key, char *strval, uint strlen, int dup);
    int add_assoc_zval(zval *arg,  const char *key, zval *value);

> 注意： 上述API为宏定义，为了直观展示，用函数定义的形式展现。

对于数值索引数组，提供了如下API，这些API都是函数定义：


    ZEND_API int add_index_long(zval *arg, ulong idx, long n);
    ZEND_API int add_index_null(zval *arg, ulong idx);
    ZEND_API int add_index_bool(zval *arg, ulong idx, int b);
    ZEND_API int add_index_resource(zval *arg, ulong idx, int r);
    ZEND_API int add_index_double(zval *arg, ulong idx, double d);
    ZEND_API int add_index_string(zval *arg, ulong idx, const char *str, int duplicate);
    ZEND_API int add_index_stringl(zval *arg, ulong idx, const char *str, uint length, int duplicate);
    ZEND_API int add_index_zval(zval *arg, ulong index, zval *value);


> 注意： Zend提供的数组API函数并不仅仅只有这些，还有更多方便实用的API请查看源文件: `zend_API.h` 346-431行。

范例：

    PHP_FUNCTION(sample_array)
    {
        zval *subarray;

        array_init(return_value);

        /* Add some scalars */
        add_assoc_long(return_value, "life", 42);
        add_index_bool(return_value, 123, 1);
        add_next_index_double(return_value, 3.1415926535);

        /* Toss in a static string, dup'd by PHP */
        add_next_index_string(return_value, "Foo", 1);

        /* Now a manually dup'd string */
        add_next_index_string(return_value, estrdup("Bar"), 0);

        /* Create a subarray */
        MAKE_STD_ZVAL(subarray);
        array_init(subarray);

        /* Populate it with some numbers */
        add_next_index_long(subarray, 1);
        add_next_index_long(subarray, 20);
        add_next_index_long(subarray, 300);
    		
        /* Place the subarray in the parent */
        add_index_zval(return_value, 444, subarray);
    }


上述代码片段创建的数组`var_dump`之后如下:

    array(6) {
      ["life"]=> int(42)
      [123]=> bool(true)
      [124]=> float(3.1415926535)
      [125]=> string(3) "Foo"
      [126]=> string(3) "Bar"
      [444]=> array(3) {

        [0]=> int(1)
        [1]=> int(20)
        [2]=> int(300)
      }
    }

