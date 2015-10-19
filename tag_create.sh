#!/usr/bin/env bash

mkdir -p tags/$1
echo "---
layout: tag-page
tag: $1
---" > tags/$1/index.html
