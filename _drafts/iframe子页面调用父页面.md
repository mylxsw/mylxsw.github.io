iframe子页面调用父页面
======

##iframe子页面调用父页面js

    window.parent.父页面函数

> 判断当前页面是否位iframe页面
>   
>   window.top != window.self
>
> 如果为`true`则为iframe页

##iframe父页面调用子页面

    document.getElementById('iframeID').contentWindow.函数



参考: [iframe子页面调用父页面javascript函数的方法](http://fish-bone.iteye.com/blog/1277081)
