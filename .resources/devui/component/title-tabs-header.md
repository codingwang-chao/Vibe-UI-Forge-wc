# TitleTabsHeader Component Usage

`TitleTabsHeader` 是带标题和 Tab 的头部组件。

## Source

```text
devui-playground/src/components/ui/title-tabs-header/title-tabs-header.tsx
devui-playground/src/components/ui/title-tabs-header/title-tabs-header.stories.tsx
```

## Data Shape

```ts
type TitleTabsHeaderItem = {
  id: string
  label: ReactNode
  disabled?: boolean
}
```

## Props

| Prop | 说明 |
|---|---|
| `title` | 标题 |
| `items` | Tab 列表 |
| `modelValue` | 受控选中值 |
| `defaultModelValue` | 默认选中值 |
| `onUpdateModelValue` | 切换回调 |

## Generation Notes

- 没有 Tab 时不要使用该组件。
- 只有面包屑或轻量 Tab 时可考虑 `Subheader`。
