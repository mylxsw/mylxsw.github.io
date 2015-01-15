###Cent OS 7 安装Qpid

下载Qpid源码包并解压

	$ wget http://mirrors.cnnic.cn/apache/qpid/0.30/qpid-cpp-0.30.tar.gz
    $ tar -zxvf qpid-cpp-0.30.tar.gz
	$ cd qpid-cpp-0.30

执行`cmake`编译

	$ cmake .
	...
        -- Could NOT find Ruby (missing:  RUBY_EXECUTABLE RUBY_INCLUDE_DIR RUBY_LIBRARY)
    -- Could NOT find Doxygen (missing:  DOXYGEN_EXECUTABLE) 
    -- Could NOT find VALGRIND (missing:  VALGRIND_EXECUTABLE) 
    -- Looking for sasl_checkpass in sasl2
    -- Looking for sasl_checkpass in sasl2 - not found
    -- Looking for include file sasl/sasl.h
    -- Looking for include file sasl/sasl.h - not found
    -- Could NOT find SASL (missing:  FOUND_SASL_LIB FOUND_SASL_H) 
    CMake Error at src/CMakeLists.txt:87 (message):
      Can't locate ruby, needed to generate amqp 0-10 framing code.
    -- Configuring incomplete, errors occurred!

提示没有安装ruby等，因为用的是vagrant虚拟开发环境，比较纯净，所有没有预装是正常的

	$ sudo yum install cmake boost-devel libuuid-devel pkgconfig gcc-c++ make ruby help2man doxygen graphviz -y
    $ sudo yum install cyrus-sasl-devel nss-devel nspr-devel -y
    $ sudo yum install xqilla-devel xerces-c-devel -y
    $ sudo yum install ruby ruby-devel swig -y
    $ sudo yum install libdb-cxx-devel libaio-devel -y

重新编译

    $ cmake .
    $ make
    $ sudo make install
    $ sudo cp etc/qpidd.conf /etc/



