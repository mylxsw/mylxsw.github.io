---
categories: [Linux]
tags: [linux, mac]
---
在Mac下使用file命令查看文件真实的MIME TYPE

```bash
$ file --mime-type SJ-174IMG.bmp
SJ-174IMG.bmp: image/jpeg

$ file --mime-type SJ-174IMG.jpg
SJ-174IMG.jpg: image/jpeg

$ file --mime-type SJ-174IMG.jpeg
SJ-174IMG.jpeg: image/png

```
