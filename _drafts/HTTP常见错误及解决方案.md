HTTP常见错误及解决方案
===========

## **413** Request Entity Too Large

原因是请求实体太长了。一般出现种情况是Post请求时Body内容Post的数据太大了，如上传大文件过大; 如POST数据比较多，处理方法修改nginx.conf的值(添加到http指令内部)就可以解决了。

    client_max_body_size 10M;

参考: [413 Request Entity Too Large 的解决方法][413]





[413]:http://my.oschina.net/junn/blog/147603