# TitleTabsHeader

> 带标题和页内 Tab 的二级头部。

## 1. 适用场景

- 详情页中切换概览、配置、日志等子视图。
- 表格页中切换不同状态列表。
- 表单页中切换不同配置分组。

## 2. 源码支撑

```text
devui-playground/src/components/ui/title-tabs-header/title-tabs-header.tsx
devui-playground/src/components/ui/title-tabs-header/title-tabs-header.stories.tsx
```

核心 props：

| Prop | 用途 |
|---|---|
| `title` | 页面或区块标题 |
| `items` | Tab 列表 |
| `modelValue` | 受控选中值 |
| `defaultModelValue` | 默认选中值 |
| `onUpdateModelValue` | 切换回调 |

## 3. 可选 / 可隐藏区域

| 区域 | 默认 | 何时隐藏 |
|---|---|---|
| 标题 | 必填 | 不隐藏 |
| Tab | 必填 | 如果没有 Tab，不要使用该组件，改用普通标题或 `Subheader` |

## 4. 旧 MiniDevUI 映射

旧 `title-tabs-header-block` 映射到当前 `title-tabs-header`。
