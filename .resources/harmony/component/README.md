# Component Markdown

> component markdown 是按需参考的资源，不是默认读取的步骤。

## 角色

- route markdown：页面生成**默认**读取
- layout markdown：页面生成**默认**读取
- component markdown：组件规范**按需**读取

## 何时读取 component markdown

1. 组件的 TSX/stories 文件无法判断其用法时
2. 需要了解组件的 variants、props 定义时
3. 需要参考组件的使用示例时

## v1.0 不强制补齐所有 component/{name}.md

后续只有组件规范无法从 TSX/stories 判断时，再补具体组件 markdown。
