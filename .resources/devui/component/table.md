# Table Component Usage

`Table` 是 DevUI 表格组件，配合 `Column` 定义列。

## Source

```text
devui-playground/src/components/ui/table/table.tsx
devui-playground/src/components/ui/table/column.tsx
devui-playground/src/components/ui/table/table.css
devui-playground/src/components/ui/table/table.stories.tsx
```

## Benchmark

[html/component/table-benchmark.html](file://html/component/table-benchmark.html)

**Figma Node**: `497:2419`

## Core Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `data` | `Record<string, unknown>[]` | `[]` | 表格数据 |
| `size` | `"sm"` \| `"md"` \| `"lg"` | `"sm"` | 尺寸 |
| `striped` | `boolean` | `false` | 斑马纹 |
| `borderType` | `""` \| `"bordered"` \| `"borderless"` | `""` | 边框类型 |
| `checkable` | `boolean` | `false` | 表格级勾选 |
| `rowHoveredHighlight` | `boolean` | `true` | 行悬停高亮 |
| `fixHeader` | `boolean` | `false` | 固定表头 |
| `tableLayout` | `"fixed"` \| `"auto"` | `"fixed"` | 表布局 |
| `empty` | `ReactNode` | `"No Data"` | 空状态 |
| `rowKey` | `string \| function` | `"id"` | 行唯一标识 |

## Column Props

| Prop | 类型 | 说明 |
|------|------|------|
| `type` | `"checkable"` \| `"index"` \| `"expand"` \| `""` | 列类型 |
| `field` | `string` | 数据字段 |
| `header` | `ReactNode \| function` | 表头内容 |
| `width` | `number \| string` | 列宽 |
| `minWidth` | `number \| string` | 最小列宽 |
| `sortable` | `boolean` | 可排序 |
| `filterable` | `boolean` | 可筛选 |
| `filterList` | `FilterConfig[]` | 筛选选项 |
| `align` | `"left"` \| `"center"` \| `"right"` | 对齐 |
| `fixedLeft` | `string` | 左侧固定 |
| `fixedRight` | `string` | 右侧固定 |
| `childrenRenderer` | `function` | 自定义单元格渲染 |

## Cell Renderer

使用 `childrenRenderer` 渲染复杂单元格内容（如 Tag、图标）：

```tsx
<Column
  field="title"
  header="标题"
  childrenRenderer={({ row }) => (
    <div className="cell-content">
      <Tag size="md" tagStyle="fill" color="green">{row.type}</Tag>
      <span>{row.title}</span>
    </div>
  )}
/>
```

## Icons

项目使用 **Lucide React** 图标库。

### Lucide Icon 映射

| Figma Icon | Lucide Icon | 用途 |
|------------|-------------|------|
| Sort3 | `arrow-up-down` | 排序指示器 |
| FilterO | `filter` | 筛选按钮 |
| TreeExpand | `chevron-right` | 树形展开 |
| PriorityFlag | `flag` | 优先级 (按颜色区分高/中/低) |
| CodehubOpEdit | `pencil` | 编辑 |
| CodehubCollection | `star` | 收藏 |
| More2 | `more-horizontal` | 更多 |

### 在 ButtonIcon 中新增

如需在 button-icon.tsx 中新增这些图标，参考格式：

```tsx
function ArrowUpDownIcon({ className }: { className?: string }) {
  return (
    <IconBase className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8 7l4-4 4 4M8 17l4 4 4-4" />
      <path d="M4 12h16" />
    </IconBase>
  )
}

function FlagIcon({ className }: { className?: string }) {
  return (
    <IconBase className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" y1="22" x2="4" y2="15" />
    </IconBase>
  )
}
```

## 设计要素（来自 Benchmark）

| 要素 | 规格 |
|------|------|
| 表头行高 | 42px |
| 数据行高 | 42px |
| 表头字号 | 12px, Bold (700) |
| 数据行字号 | 14px, Regular (400) |
| 行高 | 22px |
| 边框色 | `var(--devui-dividing-line, #dfe1e6)` |
| 表头背景 | `var(--devui-base-bg, #ffffff)` |
| 行悬停背景 | `var(--devui-list-item-hover-bg, #f2f5fc)` |

## 实现状态

| 功能 | 状态 | 说明 |
|------|------|------|
| 基础表格 | ✅ | 已实现 |
| 排序 | ✅ | 使用文字 ▲▼ |
| 筛选 | ✅ | 使用文字 ⌄ |
| 勾选 | ✅ | 已实现 |
| 固定列 | ✅ | 支持 fixedLeft/fixedRight |
| 树形展开 | ✅ | 使用圆形 +/- |
| Tag 渲染 | ⚠️ | 需通过 childrenRenderer |
| Sort SVG | ❌ | 需替换为 ButtonIcon |
| Filter SVG | ❌ | 需替换为 ButtonIcon |
| TreeExpand SVG | ❌ | 需替换为 ButtonIcon |
| PriorityFlag | ❌ | 需新增图标或通过 childrenRenderer |
| Actions 按钮组 | ❌ | 需通过 childrenRenderer |

## Generation Notes

- 表格应放在 `TableShellFrame` 的 `children` 中
- 查询条件和批量操作应放在 `ToolbarBlock` 或独立筛选区
- 复杂单元格内容（Tag、图标组）使用 `childrenRenderer`
- 样式优先使用 devui token
