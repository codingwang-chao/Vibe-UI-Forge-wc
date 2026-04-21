# FormShellFrame Component Usage

`FormShellFrame` 是表单/配置页骨架组件，负责页面区域布局。

层级定位：`FormShellFrame` 是 layout truth，不是 block。它应由 `layout/form-page.md` 路由和承载，内部 slot 再填入 `SidebarNav`、`AccordionNav`、`TreeNav`、`Subheader`、`ToolbarBlock` 等 block。

## Source

```text
devui-playground/src/components/ui/form-shell-frame/form-shell-frame.tsx
devui-playground/src/components/ui/form-shell-frame/form-shell-frame.stories.tsx
```

## Props

| Prop | 类型 | 说明 |
|---|---|---|
| `header` | `ReactNode` | 顶部区域 |
| `primaryNav` | `ReactNode` | 一级侧边导航 |
| `secondaryNav` | `ReactNode` | 二级导航 |
| `secondaryHeader` | `ReactNode` | 面包屑、Tab、上下文说明 |
| `toolbar` | `ReactNode` | 页面操作条 |
| `children` | `ReactNode` | 表单或配置主体 |

## Generation Notes

- `secondaryNav` 是灵活区域，配置项少时应隐藏。
- `secondaryHeader` 和 `toolbar` 都是可选区域，不要生成空壳。
- 复杂表单应在 `children` 中分组表达字段，不要把字段塞进导航区域。
