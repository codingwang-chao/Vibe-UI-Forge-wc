# TreeNav

> 树形导航，适合层级资源选择。

## 1. 适用场景

- 组织结构、资源目录、部门树、项目树。
- 需要在表单/配置页中选择或定位层级对象。

## 2. 源码支撑

```text
devui-playground/src/components/ui/tree-nav/tree-nav.tsx
devui-playground/src/components/ui/tree-nav/tree-nav.stories.tsx
```

核心 props：

| Prop | 用途 |
|---|---|
| `title` | 树标题 |
| `data` | 树节点 |
| `selectedKey` | 当前选中节点 |
| `height` | 面板高度 |
| `emptyState` | 空状态 |

## 3. 可选 / 可隐藏区域

| 区域 | 默认 | 何时隐藏 |
|---|---|---|
| 标题 | 可选 | 外层已有明确上下文时隐藏 |
| 子节点 | 自动 | 当前节点没有 children 时隐藏 |
| 空状态 | 自动 | 有树数据时不显示 |

## 4. 旧 MiniDevUI 映射

旧 `tree` 映射到当前 `TreeNav`。
