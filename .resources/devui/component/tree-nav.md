# TreeNav Component Usage

`TreeNav` 用于树形资源选择或目录导航。

## Source

```text
devui-playground/src/components/ui/tree-nav/tree-nav.tsx
devui-playground/src/components/ui/tree-nav/tree-nav.stories.tsx
```

## Data Shape

```ts
type TreeNavNode = {
  key: string
  label: ReactNode
  children?: TreeNavNode[]
  disabled?: boolean
}
```

## Props

| Prop | 说明 |
|---|---|
| `title` | 树标题，可隐藏 |
| `data` | 树节点 |
| `selectedKey` | 当前选中节点 |
| `height` | 面板高度，默认 `360` |
| `emptyState` | 空状态内容 |

## Generation Notes

- 树导航适合资源目录和层级对象，不适合普通平铺导航。
- `height` 应根据页面容器设置，避免树区域撑破页面。
