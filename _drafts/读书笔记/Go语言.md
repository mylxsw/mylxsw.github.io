##1 如何写Go代码

###1.1 代码组织

####1.1.1 工作空间
Go语言的`go`工具是为开源项目设计的，因此在开发的时候，需要遵循开源项目的模型来建立开发环境（这并不意味之你必须公开你的代码！）。

Go的代码必须放在`工作空间`中。所谓的工作空间就是一个含有以下三个子目录的目录。

- **src** 以包的形式组织的Go语言源文件
- **pkg** 包含包对象
- **bin** 包含可执行的命令

项目构建的时候，`go`工具会编译源码并且将生成的二进制文件到`pkg`和`bin`目录下。`src`目录通常会包含多个版本控制系统（例如Git和Mercurial）用于代码的管理和跟踪。

下面是一个工作空间的例子：
```shell
bin/
    streak                         # 可执行的命令
    todo                           # 可执行的命令
pkg/
    linux_amd64/
        code.google.com/p/goauth2/
            oauth.a                # 包对象
        github.com/nf/todo/
            task.a                 # 包对象
src/
    code.google.com/p/goauth2/
        .hg/                       # mercurial repository metadata
        oauth/
            oauth.go               # package source
            oauth_test.go          # test source
    github.com/nf/
        streak/
            .git/                  # git repository metadata
            oauth.go               # command source
            streak.go              # command source
        todo/
            .git/                  # git repository metadata
            task/
                task.go            # package source
            todo.go                # command source
```

这里包含了三个仓库（goauth2, streak, todo），他们生成了两个可执行的命令。	

####1.1.2 环境变量GOPATH

环境变量`GOPATH`指定了工作空间所在的目录，这个环境变量是在进行GO开发的时候唯一需要设置的环境变量。

在开始编程之前，需要创建一个工作空间，并且设置环境变量GOPATH。工作空间可以创建在磁盘上的任意位置，但是需要注意的是不要在Go安装目录中创建。我们通常在设置为`$HOME/go`。

```shell
$ mkdir $HOME/go
$ export GOPATH=$HOME/go
```

> 方便起见，可以将工作空间的`bin`目录添加到`PATH`环境变量中。
```shell
$ export PATH=$PATH:$GOPATH/bin
```

####1.1.3 包路径

对自己创建的包，推荐使用能够避免冲突的前缀，通常情况下，如果有github账号，就使用github账号地址作为前缀。

```shell
$ mkdir -p $GOPATH/src/github.com/user
```

> `mkdir -p`这里的`-p`参数表示如果各级目录不存在，则自动创建各级目录，如果存在，则忽略。

####1.1.4 第一个Go程序
创建一个简单的Go程序，首先需要在工作空间中创建相应的目录结构。
```shell
$ mkdir $GOPATH/src/github.com/user/hello
```

接下来创建一个名为`hello.go`的文件。
```go
package main

import "fmt"

func main(){
	fmt.Println("Hello,world.\n")
}
```

接下来就可以构建并且安装该程序了：
```shell
$ go install github.com/user/hello
```

> 注意的是，你可以在系统中任意位置运行上述的命令，`go`命令会根据环境变量`GOPATH`查找位于`github.com/user/hello`下的源码。

如果在该包的目录下的话，可以忽略包的路径。
```shell
$ cd $GOPATH/src/github.com/user/hello
$ go install
```

上述命令将会构建可执行文件到`bin`目录下，在我们的例子中，`hello`（windows下是`hello.exe`）会出现在`$GOPATH/bin/hello`。

如果你使用了版本控制系统的话，这个时候可以初始化一个仓库，添加文件并且提交你的第一次修改了。
```shell
$ cd $GOPATH/src/github.com/user/hello
$ git init
Initialized empty Git repository in /home/user/go/src/github.com/user/hello/.git/
$ git add hello.go
$ git commit -m "initial commit"
[master (root-commit) 0b4507d] initial commit
 1 file changed, 1 insertion(+)
  create mode 100644 hello.go
```

####1.1.5 第一个库

接下来，我们创建一个库文件，并且在`hello`程序中调用它。同样，第一步是选择一个包路径，并且创建包的目录结构。

```shell
$ mkdir $GOPATH/src/github.com/user/newmath
```

接下来，创建一个名为`sqrt.go`的文件。

```go
package newmath

func Sqrt(x float64) float64 {
	z := 1.0
    for i := 0; i < 1000; i ++ {
    	z -= (z*z -x) / (2 * z)
    }
    return z
}
```

现在，使用`go build`命令编译这个包。
```shell
$ go build github.com/user/newmath
```
> 如果当前目录在包的源码目录的话，只需要执行`go build`即可。

需要注意的是，以上命令并不会输出一个文件，如果需要的话，使用`go install`命令将编译产生的包对象添加到工作空间的`pkg`目录下。

在确定`newmath`包成功构建之后，修改`hello.go`文件，引用该库。

```go
package main

import (
	"fmt"

	"github.com/user/newmath"
)

func main() {
	fmt.Printf("Hello, world.  Sqrt(2) = %v\n", newmath.Sqrt(2))
}
```

无论是安装包还是二进制文件，`go`工具都将会自动的安装它的依赖，所以可以使用如下命令安装hello程序。

```shell
$ go install github.com/user/hello
```
执行上述命令之后，`newmath`包也将会自动的安装。

运行新版本的程序:
```shell
$ hello
Hello, world.  Sqrt(2) = 1.414213562373095
```

在完成上面的步骤之后，你的工作空间应该是下面这样的:

```shell
bin/
    hello              # 可执行的命令
pkg/
    linux_amd64/       # 该文件指的是当前的操作系统和架构
        github.com/user/
            newmath.a  # package object
src/
    github.com/user/
        hello/
            hello.go   # command source
        newmath/
            sqrt.go    # package source
```

可执行的Go程序是静态链接的，生成的Go程序的运行是不需要依赖包对象的。

###1.2 代码测试
Go语言有一个轻量级的测试框架，使用`go test`命令和`testing`包。

测试文件是含有后缀`_test.go`的文件，这些文件中包含了名称类似`TestXXX`，函数签名为`func (t *testing.T)`的函数。测试框架会运行每一个这样的函数，如果这些函数调用了`t.Error`或者`t.Fail`这样的失败函数，就认为该测试是失败的。

在`newmath`中添加一个`sqrt_test.go`的文件：

```go
package newmath

import "testing"

func TestSqrt(t *testing.T) {
	const in, out = 4, 2
	if x := Sqrt(in); x != out {
		t.Errorf("Sqrt(%v) = %v, want %v", in, x, out)
	}
}
```

接下来使用下面的命令执行测试:
```shell
$ go test github.com/user/newmath
ok  	github.com/user/newmath 0.165s
```

##2 高效的Go

###2.1 代码格式

使用`gofmt`命令可以格式化代码。
比如下面的代码：
```go
type T struct {
    name string // name of the object
    value int // its value
}
```
使用`gofmt`格式化之后将会将会变成下面这样:
```go
type T struct {
    name    string // name of the object
    value   int    // its value
}
```

###2.2 注释
Go语言提供了类C语言的`/**/`注释和C++中的`//`注释。

包注释：
```go
/*
Package regexp implements a simple library for regular expressions.

The syntax of the regular expressions accepted is:

    regexp:
        concatenation { '|' concatenation }
    concatenation:
        { closure }
    closure:
        term [ '*' | '+' | '?' ]
    term:
        '^'
        '$'
        '.'
        character
        '[' [ '^' ] character-ranges ']'
        '(' regexp ')'
*/
package regexp
```

###2.3 命名
在Go语言中，命名是非常重要的，包中函数或变量的可见性是通过名称首字母是否大写确定的。

####2.3.1 包名
按照惯例，包名应该是小写的，单个单词组成的，一般不需要添加下划线或者是大写字母。另外，需要注意的是，包名是源码目录的名称，例如在`src/pkg/encoding/base64`导入的名称为`encoding/base64`， 但是使用的时候名字是`base64`。

####2.3.2 Getter
Go并没有对getter和setter提供直接的支持，可以自己实现Getter/Setter方法，但是需要注意的是，在Go中，对getter方法，不需要添加Get名称，直接使用字段名称更好一些，而对于setter方法，则添加`Set`前缀。

例如，假设存在字段owner, 那么对应的Getter方法应该为Owner， 而不是GetOwner，但是Setter方法为SetOwner。
```go
owner := obj.Owner()
if owner != user {
    obj.SetOwner(user)
}
```

####2.3.3 接口名称
