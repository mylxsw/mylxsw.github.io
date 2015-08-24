使用mermaid创建流程图和序列图
=========

[Mermaid][]是一个能够根据文本描述生成图表（流程图、序列图等）的Javascript库，它可以让我们使用类似markdown的语法创建流程图表。

[Mermaid][]的诞生，使得我们可以不需要使用重量级的工具如**Visco**和**OmniGraffle**等工具创建图表，取而代之的是，我们可以通过一种类似与markdown语法格式的脚本语言去生成流程图。

虽然[Mermaid][]是一款Javascript函数库，但它并不限与在浏览器端使用，借助nodeJs等技术，它可以在命令行下作为命令行工具运行，本文中，我们使用[Mermaid][]创建图表就是在命令行下作为客户端程序编译文本描述文件位图片格式的图表。


## 安装使用

首先我们需要安装NPM包管理器，之后，使用如下命令安装:

    npm install -g phantomjs
    npm install -g mermaid

安装完成之后，可以执行`mermaid --help`查看是否安装成功

    $ mermaid --help

    Usage: mermaid [options] <file>...

    file    要渲染的mermaid文本描述文件

    Options:
      -s --svg             输出SVG格式替代PNG格式(实验中的特性)
      -p --png             如果已经使用了-s输出SVG格式，该选项可以同时输出SVG+PNG两种格式
      -o --outputDir       保存输出文件的目录，默认是`cwd`（当前目录），如果目录不存在则自动创建
      -e --phantomPath     指定phantomjs可执行文件的路径
      -t --css             指定处理输出时要引入的css文件，控制输出样式
      -c --sequenceConfig  指定生成序列图时需要提供的配置文件
      -g --ganttConfig     指定生成甘特图时需要提供的配置文件
      -h --help            显示帮助信息
      -v --verbose         显示日志
      --version            打印版本号

安装完成后，我们就可以使用命令行创建图表了，假如我们有一个描述文件 **test.mmd**

    sequenceDiagram
        participant 约翰
        participant 爱丽丝
        爱丽丝->>约翰: 你好
        约翰-->>爱丽丝: 什么
        爱丽丝->约翰: Hello
        爱丽丝-->约翰: Haha
        约翰-x爱丽丝: 好吧
        爱丽丝--x约翰: 异步消息
        Note right of 约翰: 我是约翰
        Note left of 爱丽丝: 我是爱丽丝
        loop 每分钟回复
            爱丽丝->>约翰: ？
        end
        alt 爱丽丝心情好
            爱丽丝-->>约翰: 干嘛呢
        else 爱丽丝心情不好
            爱丽丝-->>约翰: 滚
        end
        opt 可选的
            约翰->>爱丽丝: OOPS...
        end




-----

参考:

- [官方网站](http://knsv.github.io/mermaid/index.html)
- [mermaid CLI](http://knsv.github.io/mermaid/mermaidCLI.html)



[Mermaid]:http://knsv.github.io/mermaid/index.html
