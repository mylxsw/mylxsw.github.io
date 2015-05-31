Go语言常见问题集锦
=======

[TOC]


###模板引擎

导入包`text/template`或者`html/template`。

	import "text/template"

解析普通文本作为模板，直接输出解析后的内容（省略错误处理）

	tmpl, err := template.New("TemplateName").Parse("Template Content")
    // 直接输出到标准输出，不提供数据
    tmpl.Execute(os.Stdout, nil)

解析文件模板

	// ParseFiles可以接受多个文件名称，从这些文件中解析模板定义
	tmpl, err := template.ParseFiles("TemplateFilePath")
    tmpl.Execute(os.Stdout, nil)

解析模板并且只返回模板对象，如果解析失败则panic

	tmpl := template.Must(template.New("TemplateName").Parse("Template Content"))



###文件读写

####读取文件内容到变量

	import(
    	"os"
        "io/ioutil"
    )
	file, _ := os.Open("filename")
    defer file.Close()
    content, _ := ioutil.ReadAll(file)

###类型转换

####string->byte[]

使用强制类型转换即可

	username := "Tomcat"
    fmt.Println([]byte(username))

####byte[]->string

	var text byte[] = ...
    var text_str string = string(text)