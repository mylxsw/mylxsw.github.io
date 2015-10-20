---
categories: [python]
tags: [python]
---

在使用Python的`json`模块解析json字符串的时候出现如下错误：


    ValueError: Expecting property name: line 1 column 2 (char 1)

获取的原始json字符串为

    {loginFlag: 'LOGIN_FLAG',page: 0,hasNextPage: true,errmsg: '',order: 'asc',type: 'list',previewSign:'',fileNum: 2}

从上面这段代码中可以看出，该段代码并不是合法的json格式，而是一个javascript对象（关于javascript对象与json的区别，请[参考](http://aicode.cc/article/344.html)）。

因此，需要首先将上述的代码转换成合法的json格式，也就是所有的key/value应该是用双引号`"`包含起来，而不是`'`。

使用Python代码如下，需要先导入`re`模块（`import re`）。

<!--more-->

    def replace(m):
        return '"%s":' % m.group(1)

    def replace2(m):
        return ': "%s"' % m.group(1).strip("'")

    # resp为上述的javascript对象字符串
    match = re.sub(r'([a-zA-Z_]+[a-zA-Z0-9_]+):', replace, resp)
    match = re.sub(":\s?('.*?')", replace2, match)


上面代码中使用了两处正则表达式替换，第一次调用`re.sub`替换了所有key为双引号包含格式，第二次替换所有的value的单引号为双引号。


    print json.loads(match)

正确输出了Json格式的内容：

    {u'hasNextPage': True, u'previewSign': u'', u'loginFlag': u'LOGIN_FLAG', u'page': 0, u'fileNum': 2, u'type': u'list', u'order': u'asc', u'errmsg': u''}
