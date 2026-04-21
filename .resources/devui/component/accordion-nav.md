# AccordionNav Component Usage

`AccordionNav` 用于可展开/收起的配置分组导航。

## Source

```text
devui-playground/src/components/ui/accordion-nav/accordion-nav.tsx
devui-playground/src/components/ui/accordion-nav/accordion-nav.stories.tsx
```

## Data Shape

```ts
type AccordionNavItem = {
  key: string
  label: ReactNode
  children?: AccordionNavItem[]
  disabled?: boolean
}
```

## Props

| Prop | 说明 |
|---|---|
| `title` | 导航标题，可隐藏 |
| `items` | 导航项 |
| `selectedKeys` | 当前选中项 |
| `defaultExpandedKeys` | 默认展开项 |
| `expandedKeys` | 受控展开项 |
| `emptyState` | 空状态内容 |

## Generation Notes

- 分组导航适合配置页，不适合简单表单。
- 没有子级的项目不会显示展开按钮。
