# ToolbarBlock Component Usage

`ToolbarBlock` 是 TSX 承载的真实 block。默认状态对齐 Figma 节点 `3665:10320`，并通过 props 支持显隐和替换。

## Source

```text
devui-playground/src/components/ui/toolbar-block/toolbar-block.tsx
devui-playground/src/components/ui/toolbar-block/toolbar-block.stories.tsx
```

## Props

| Prop | 说明 |
|---|---|
| `children` | 自定义操作条内容；传入后启用兼容容器模式 |
| `className` | 自定义 class |
| `scopeLabel` | 左侧范围选择文案 |
| `tabs` | 页签列表 |
| `activeTabId` | 当前页签 |
| `primaryAction` | 主操作按钮；传 `null` 可隐藏 |
| `temporaryFilterLabel` | 临时过滤下拉文案 |
| `filterTags` | 已选筛选条件 |
| `filterPlaceholder` | 筛选输入提示 |
| `actions` | 文本操作按钮列表 |
| `viewModes` | 视图切换按钮列表 |
| `activeViewModeId` | 当前视图 |

## Generation Notes

- 默认 props 已经能生成完整标杆 toolbar。
- 适合承载范围选择、页签、主操作、临时过滤、筛选条件、表格设置、更多操作、视图切换。
- 筛选条件标签应使用 `Tag` 组件，不要在 toolbar 内部手写 tag markup。
- 不适合承载复杂多行表单。
- 无某类操作时应通过 props 隐藏，不要生成空容器。
- 如果业务需要完全自定义内容，可以传入 `children`。
