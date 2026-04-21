# Subheader

> 轻量二级头部，可承载面包屑和页内 Tab。

## 1. 适用场景

- 需要面包屑提示当前层级。
- 页面只需要轻量 Tab，不需要强标题区域。
- 表单页或详情页的二级上下文。

## 2. 源码支撑

```text
devui-playground/src/components/ui/subheader/subheader.tsx
devui-playground/src/components/ui/subheader/subheader.stories.tsx
```

核心 props：

| Prop | 用途 |
|---|---|
| `breadcrumbs` | 面包屑数组 |
| `tabs` | Tab 数组 |
| `modelValue` | 受控选中值 |
| `defaultModelValue` | 默认选中值 |

## 3. 可选 / 可隐藏区域

| 区域 | 默认 | 何时隐藏 |
|---|---|---|
| 面包屑 | 可选 | 页面层级不需要说明时隐藏 |
| Tab | 可选 | 无子视图切换时隐藏 |

如果面包屑和 Tab 都不需要，不要生成空的 `Subheader`。

## 4. 旧 MiniDevUI 映射

旧 `subheader-block` 映射到当前 `Subheader`。
