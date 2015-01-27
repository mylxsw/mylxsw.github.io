###Linux C socket & pthread


要进行socket编程，需要引入`sys/socket.h`头文件。

####相关函数



	int getsocketname(int socket, struct sockaddr *restrict_address, socklen_t *restrict_address_len)

函数`getsocketname()`用于获取指定socket的当前地址，该函数在成功执行后返回0，如果失败，则返回-1，并且设置全局变量`errno`以指出错误原因。注意该函数通过后两个参数返回结果，最后一个restrict_address_len参数也是要传指针。