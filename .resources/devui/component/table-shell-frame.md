# TableShellFrame Component Usage

`TableShellFrame` 是表格页骨架组件，负责页面区域布局，不负责生成表格数据本身。

层级定位：`TableShellFrame` 是 layout truth，不是 block。它应由 `layout/table-page.md` 路由和承载，内部 slot 再填入 `ToolbarBlock`、`SidebarNav`、`TitleTabsHeader` 等 block。

## Source

```text
devui-playground/src/components/ui/table-shell-frame/table-shell-frame.tsx
devui-playground/src/components/ui/table-shell-frame/table-shell-frame.stories.tsx
```

## Props

| Prop | 类型 | 说明 |
|---|---|---|
| `header` | `ReactNode` | 顶部区域 |
| `primaryNav` | `ReactNode` | 一级侧边导航 |
| `secondaryHeader` | `ReactNode` | 二级头部 |
| `toolbar` | `ReactNode` | 操作条 |
| `children` | `ReactNode` | 主内容，通常是 `Table` |

## Generation Notes

- 没有一级导航时不要传 `primaryNav`。
- 没有页内 Tab 或筛选摘要时不要传 `secondaryHeader`。
- 表格主内容应放到 `children`，不要塞进 `toolbar`。
