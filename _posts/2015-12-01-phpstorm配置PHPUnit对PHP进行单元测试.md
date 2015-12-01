---
caegories: [PHP]
tags: [php, phpunit, lnmp]
---

在 phpstorm 中配置 php 项目的单元测试，项目使用 `Composer` 进行管理，为了避免在项目中直接引入 `phpunit` 相关代码包，使项目的 `vendor` 目录变得臃肿，这里采用全局安装方式安装了 `phpunit` 代码包。

    composer global require "phpunit/phpunit=5.0.*"

安装完成之后，phpunit 在系统全局范围内被安装在了`~/.composer/vendor/bin`目录。

<!--more-->

接下来配置 phpstorm，打开菜单(Preferences)

![phpstorm-phpunit-1](http://source.aicode.cc/markdown/phpunit-dashboard.jpg)

具体配置如上图所示，注意第三项指定了默认的自举文件，该文件是项目中用于初始化项目环境的php 脚本，我们项目的结构是这样的：

![phpstorm-phpunit-2](http://source.aicode.cc/markdown/phpstorm-phpunit-2.jpg)

其中`test`下的`src`目录是测试用例的源码目录，`test/src/env.php`文件就是项目册初始化脚本，因为项目中使用了 Composer 进行项目管理，并采用了`psr-4`规范的命名空间，因此该文件的内容非常简单。

	<?php
	require __DIR__ . "/../../vendor/autoload.php";

以上配置完成之后，在测试文件的方法或者类内右键执行单元测试用例就可以了。
