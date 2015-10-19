---
categories: [PHP]
tags: [php, xhprof, lnmp]
thumb: /assets/images/thumb/xhprof.jpeg
---

XHProf是facebook 开发的一个测试php性能的扩展。

####安装Xhprof扩展

    $ wget http://pecl.php.net/get/xhprof-0.9.4.tgz
    $ tar -zxvf xhprof-0.9.4.tgz
    $ cd xhprof-0.9.4
    $ cd extension/
    $ phpize
    $ ./configure
    $ make
    $ sudo make install


修改`php.ini`

    [xhprof]
    extension=xhprof.so
    xhprof.output_dir=/tmp

> 配置中`xhprof.output_dir`指定了生成的profile文件存储的位置，我们将其指定为/tmp。

####对PHP进行性能分析

在XHProf扩展中，一共提供了四个函数用于对PHP进行性能分析。

`xhprof_enable/xhprof_sample_enable`函数用于开始XHProf性能分析，区别在于前者功能更加强大，而后者则是是以简单模式启动性能分析（简单记录了函数的调用栈信息），开销比较小。

`xhprof_disable/xhprof_sample_disable`函数用于停止性能分析，并返回分析的数据。

需要特别说明的函数是`xhprof_enable`，其他函数都是不需要提供参数的，而该函数则可以接受两个可选的参数，用于改变该工具的行为。

    void xhprof_enable ([ int $flags = 0 [, array $options ]] )

- **flags** 该参数用于为剖析结果添加额外的信息，该参数的值使用以下宏，如果需要提供多个值，使用`|`进行分隔。
	- XHPROF_FLAGS_NO_BUILTINS 跳过所有的内置函数
	- XHPROF_FLAGS_CPU 添加对CPU使用的分析
	- XHPROF_FLAGS_MEMORY 添加对内存使用的分析

- **options** 数组形式提供可选参数，在此处提供`ignored_functions`选项需要忽略的函数

比如下面的例子，同时对内存和CPU进行分析，并且忽略对`call_user_func`和`call_user_func_array`函数的分析。

    xhprof_enable(
        XHPROF_FLAGS_MEMORY|XHPROF_FLAGS_CPU,
        [
            'ignored_functions'	=> [
                'call_user_func',
                'call_user_func_array'
            ]
        ]
    );

    // 这里是PHP代码，比如业务逻辑实现等要被分析的代码部分
    ....

    $xhprofData = xhprof_disable();// $xhprofData是数组形式的分析结果
    print_r($xhprofData);

> 注意，如果使用`XHPROF_FLAGS_CPU`选项对CPU占用也进行分析，在Linux环境下，会造成比较高的系统负载，因此不建议使用，而推荐只使用`XHPROF_FLAGS_MEMORY`，对内存的分析不会对系统造成太多负载。

####形象化的查看分析结果

使用`xhprof_disable`完成性能分析并且获取到分析结果之后，我们通常不会直接输出结果，因为这样的结果是以数组形式组织的，看起来并不直观，幸运的是，xhprof提供了基于web的图形界面对分析结果进行查看。

在使用之前，请先确保服务器安装了`graphviz`工具，否则在生成监控图表的时候回出现以下错误:

    failed to execute cmd: " dot -Tpng". stderr: `sh: dot: command not found '

这里提示找不到`dot`命令，所以需要先安装`graphviz`

    $ sudo yum install graphviz


由于分析结果的查看工具是基于web的，因此，我们需要将xhprof安装包中的**xhprof_html**和**xhprof_lib**目录放到服务器的web目录下，让xhprof_html目录中的内容对外可以访问。

比如我的测试服务器环境是使用vagrant搭建的Cent OS，我见过这两个目录放到**/vagrant/xhprof**目录下：

    [vagrant@localhost xhprof]$ pwd
    /vagrant/xhprof
    [vagrant@localhost xhprof]$ ls
    xhprof_html  xhprof_lib

web服务器使用的是Nginx，因此，在Nginx的配置文件`nginx.conf`中的配置如下：

    server {
        listen       80;
        server_name  _;
        root /vagrant;
        ...

web服务器的根目录是/vagrant，因此访问地址为`http://localhost/xhprof/xhprof_html/index.php`.

当然，配置好环境之后，我们还是获取不到分析结果的，因为我们在代码中并没有将分析结果保存到`xhprof.output_dir`指定的目录中。

因此，我们需要修改我们的代码，是其能够将分析结果存放到`xhprof.output_dir`指定的目录中。

    ....
    $xhprofData = xhprof_disable();
    require '/vagrant/xhprof/xhprof_lib/utils/xhprof_lib.php';
    require '/vagrant/xhprof/xhprof_lib/utils/xhprof_runs.php';

    $xhprofRuns = new XHProfRuns_Default();
    $runId = $xhprofRuns->save_run($xhprofData, 'xhprof_test');

    echo 'http://localhost/xhprof/xhprof_html/index.php?run=' . $runId . '&source=xhprof_test';


变量`$runId`是本次请求生成分析结果的id，最后我们输出了一个链接地址，使用改地址就可以看到本次请求的分析结果。

![分析结果][]

注意到中间的`View Full Callgraph`链接，通过该链接我们可以看到图形化的分析结果。

![图形化分析结果][]

图中红色的部分为性能比较低，耗时比较长的部分，我们可以根据根据哪些函数被标记为红色对系统的代码进行优化。

[分析结果]:/assets/images/xhprof_1.png
[图形化分析结果]:/assets/images/xhprof_2.png
