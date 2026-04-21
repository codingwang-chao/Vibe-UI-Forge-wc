# SidebarNav Component Usage

`SidebarNav` 用于一级侧边导航。

## Source

```text
devui-playground/src/components/ui/sidebar-nav/sidebar-nav.tsx
devui-playground/src/components/ui/sidebar-nav/sidebar-nav.stories.tsx
```

## Data Shape

```ts
type SidebarNavItem = {
  key: string
  label: ReactNode
  children?: SidebarNavItem[]
  disabled?: boolean
}
```

## Props

| Prop | 说明 |
|---|---|
| `title` | 导航标题，可隐藏 |
| `subtitle` | 辅助说明，可隐藏 |
| `items` | 导航项 |
| `selectedKeys` | 当前选中项 |
| `openKeys` | 指定展开项 |
| `emptyState` | 空状态内容 |

## Generation Notes

- `items` 为空时组件会显示空状态。
- 如果用户没有要求侧边导航，不要为了填充 layout 强行生成。
