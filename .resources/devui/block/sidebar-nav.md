# SidebarNav

> 一级侧边导航，适合企业管理页面的主导航或资源分组。

## 1. 适用场景

- 表格页或配置页需要一级导航。
- 导航项可能有一到两层子级。
- 当前页面需要显示选中态。

## 2. 源码支撑

```text
devui-playground/src/components/ui/sidebar-nav/sidebar-nav.tsx
devui-playground/src/components/ui/sidebar-nav/sidebar-nav.stories.tsx
```

核心 props：

| Prop | 用途 |
|---|---|
| `title` | 导航标题 |
| `subtitle` | 辅助说明 |
| `items` | 导航项 |
| `selectedKeys` | 选中项 |
| `openKeys` | 展开项 |
| `emptyState` | 空状态 |

## 3. 可选 / 可隐藏区域

| 区域 | 默认 | 何时隐藏 |
|---|---|---|
| 标题 | 可选 | 外层已有清晰导航上下文时隐藏 |
| 副标题 | 可选 | 不需要补充说明时隐藏 |
| 子级导航 | 可选 | 导航只有一级时隐藏 |
| 空状态 | 自动 | 有导航数据时不显示 |

## 4. 旧 MiniDevUI 映射

旧 `sidebar` 映射到当前 `SidebarNav`。
