# ToolbarBlock

> 操作条容器，用于承载按钮、搜索、筛选、刷新、导出等页面级或区块级操作。

## 1. 适用场景

- 表格页顶部操作区。
- 表单页保存、重置、测试连接等操作。
- 工作台页分类、搜索、快捷入口。

## 2. 源码支撑

```text
devui-playground/src/components/ui/toolbar-block/toolbar-block.tsx
devui-playground/src/components/ui/toolbar-block/toolbar-block.stories.tsx
```

`ToolbarBlock` 已经是 TSX 承载的真实 block。默认 props 会还原 Figma 节点 `3665:10320` 的标杆形态：左侧范围选择和页签，中间主操作、临时过滤、筛选输入和文本操作，右侧视图切换。

如果传入 `children`，组件会退回到自定义容器模式，用于兼容简单工具条。

## 3. 可选 / 可隐藏区域

| 区域 | 默认 | 何时隐藏 |
|---|---|---|
| 主操作按钮 | 可选 | 页面无主要动作时隐藏 |
| 搜索输入 | 可选 | 页面不需要关键词查询时隐藏 |
| 筛选控件 | 可选 | 筛选条件很少或已在表单区表达时隐藏 |
| 更多操作 | 可选 | 无批量/导出/刷新等扩展动作时隐藏 |
| 视图切换 | 显示 | 页面只有一种展示模式时隐藏 |

## 4. 可配置区域

| Prop | 作用 |
|---|---|
| `scopeLabel` | 左侧范围选择文案，默认 `全部` |
| `tabs` / `activeTabId` | 页签列表与当前页签 |
| `primaryAction` | 主操作按钮，默认 `新建` |
| `temporaryFilterLabel` | 临时过滤下拉文案 |
| `filterTags` | 已选筛选条件 |
| `filterPlaceholder` | 筛选输入提示 |
| `actions` | 右侧文本操作，如 `表格设置`、`更多` |
| `viewModes` / `activeViewModeId` | 视图切换列表与当前视图 |

## 5. 组合建议

- 主操作优先放左侧或视觉优先位置。
- 搜索、筛选、导出等次要动作应保持一行内可扫读。
- 不要把复杂表单塞进 `ToolbarBlock`；复杂条件应作为独立筛选区或表单区。
- 页面生成时优先调整 props，不要复制一份新的 toolbar markup。
- 筛选条件标签由 `Tag` 组件承载，toolbar 只负责组合和布局。

## 6. 旧 MiniDevUI 映射

旧 `toolbar-block` 可直接映射到当前 `ToolbarBlock`。
