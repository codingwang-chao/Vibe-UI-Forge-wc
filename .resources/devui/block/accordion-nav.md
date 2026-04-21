# AccordionNav

> 可展开/收起的配置分组导航。

## 1. 适用场景

- 表单页或设置页需要按分组定位。
- 分组层级不深，但需要展开/收起。
- 用户需要在多个配置区域之间切换。

## 2. 源码支撑

```text
devui-playground/src/components/ui/accordion-nav/accordion-nav.tsx
devui-playground/src/components/ui/accordion-nav/accordion-nav.stories.tsx
```

核心 props：

| Prop | 用途 |
|---|---|
| `title` | 导航标题 |
| `items` | 导航项 |
| `selectedKeys` | 选中项 |
| `defaultExpandedKeys` | 默认展开项 |
| `expandedKeys` | 受控展开项 |
| `emptyState` | 空状态 |

## 3. 可选 / 可隐藏区域

| 区域 | 默认 | 何时隐藏 |
|---|---|---|
| 标题 | 可选 | 外层已有配置区标题时隐藏 |
| 展开按钮 | 自动 | 当前项没有子级时隐藏 |
| 空状态 | 自动 | 有导航数据时不显示 |

## 4. 旧 MiniDevUI 映射

旧 `accordion` 映射到当前 `AccordionNav`。
