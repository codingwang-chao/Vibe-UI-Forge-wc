# BreadcrumbTabsHeader

> 内容区二级头部，组合面包屑与页内横向 Tab。

## 1. 源码支撑

```text
devui-playground/src/components/ui/breadcrumb-tabs-header/breadcrumb-tabs-header.tsx
devui-playground/src/components/ui/breadcrumb-tabs-header/breadcrumb-tabs-header.css
devui-playground/src/components/ui/breadcrumb-tabs-header/breadcrumb-tabs-header.stories.tsx
```

## 2. Figma 来源

```text
fileKey: VBxWjuXDcxprCHcUFKNF81
nodeId: 10673:14827
nodeName: Frame 227
```

## 3. 可配置区域

| Prop | 作用 |
|---|---|
| `breadcrumbs` | 面包屑路径 |
| `tabs` | 页内 Tab 列表 |
| `activeTabId` | 当前 Tab |
| `onTabChange` | Tab 切换回调 |

## 4. 页面模板约束

- 只用于内容区上方，不替代全局 `TopNav`。
- 如果页面只有标题没有面包屑或页签，优先使用 `Subheader` 或 `TitleTabsHeader`。
- Page story 只应引用该 Block，不应直接写面包屑和 Tab DOM。
