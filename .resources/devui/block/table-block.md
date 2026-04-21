# TableBlock

> 表格页面区块，由 ToolbarBlock + Table + Pagination 组合而成，适用于需要列表展示和分页的页面。

## 1. 适用场景

- 表格页（table-page）：需要展示列表数据并支持分页、排序、筛选。
- 工单管理、任务列表、缺陷追踪等业务场景。

## 2. 源码支撑

```text
devui-playground/src/components/ui/table-block/table-block.tsx
devui-playground/src/components/ui/table-block/table-block.css
devui-playground/src/components/ui/table-block/table-block.stories.tsx
```

## 3. 核心 Props

| Prop | 用途 |
|------|------|
| `toolbarProps` | ToolbarBlock 的所有 props |
| `tableProps` | Table 组件的 data、columns 等 |
| `paginationProps` | Pagination 组件的当前页、总页数等 |
| `onPageChange` | 页码变化回调 |
| `onPageSizeChange` | 每页条数变化回调 |

## 4. 可选 / 可隐藏区域

| 区域 | 默认 | 何时隐藏 |
|------|------|----------|
| 工具栏主操作按钮 | 显示 | 无新建需求时隐藏 |
| 筛选输入 | 显示 | 不需要关键词筛选时隐藏 |
| 视图切换 | 显示 | 只有一种视图时隐藏 |
| 分页跳页输入 | 可选 | 通过 `showJump` 控制 |

## 5. 组合建议

- TableBlock 组合 ToolbarBlock、Table、Pagination 三个组件。
- 不要在 TableBlock 内部复制这三个组件的 markup。
- 列配置通过 `columns` prop 传给 Table。
- 行操作通过 Table 的 `childrenRenderer` 或 action 列实现。

## 6. 依赖组件

- `ToolbarBlock` - 工具栏
- `Table` - 表格
- `Pagination` - 分页器

## 7. Figma 来源

Figma Node: `10743-20021`