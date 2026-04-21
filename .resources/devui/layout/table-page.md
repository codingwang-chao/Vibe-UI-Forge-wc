# Table Page

> 用于查询表格、列表管理、日志列表、资源清单等以数据浏览为核心的页面。

---

## 1. 何时使用

### 1.1 命中条件

- 页面核心任务是查看一批结构化数据。
- 需要搜索、筛选、排序、刷新、导出、新建、批量操作。
- 页面主体应落在 `TableShellFrame`，内容区使用 `Table`。

### 1.2 不适合的情况

- 页面核心是填写配置或提交表单，改用 `form-page`。
- 页面核心是卡片入口或工作台，改用 `card-workbench-page`。

---

## 2. 推荐结构

```tsx
<TableShellFrame
  header={topArea}
  primaryNav={primaryNav}
  secondaryHeader={secondaryHeader}
  toolbar={toolbar}
>
  <Table>{columns}</Table>
</TableShellFrame>
```

对应源码：

| 资源 | Source |
|---|---|
| `table-shell-frame` | `devui-playground/src/components/ui/table-shell-frame` |
| `table` | `devui-playground/src/components/ui/table` |
| `toolbar-block` | `devui-playground/src/components/ui/toolbar-block` |
| `sidebar-nav` | `devui-playground/src/components/ui/sidebar-nav` |
| `title-tabs-header` | `devui-playground/src/components/ui/title-tabs-header` |

层级边界：

| 层级 | 资源 |
|---|---|
| Layout truth | `TableShellFrame` |
| Block truth | `ToolbarBlock`、`SidebarNav`、`TitleTabsHeader` |
| Component truth | `Table`、`Column`、`Button`、`Input`、`Select` |

---

## 3. Slot 规则

| Slot | 默认 | 推荐资源 | 何时隐藏 |
|---|---|---|---|
| `header` | 显示 | 页面标题、全局顶部区 | 嵌入式页面或外层系统已经提供顶部栏时可隐藏 |
| `primaryNav` | 可选 | `SidebarNav` | 单页列表、无一级导航时隐藏 |
| `secondaryHeader` | 可选 | `TitleTabsHeader` 或轻量说明区 | 无页内 Tab、无筛选摘要时隐藏 |
| `toolbar` | 显示 | `ToolbarBlock` | 只读表格、无操作时可隐藏 |
| `children` | 必填 | `Table` | 不应隐藏 |

---

## 4. 生成约束

- 表格页应先生成 shell，再填充 toolbar 和 table，不要把所有内容堆进一个大组件。
- 搜索、筛选、导出、新建等操作优先放入 `ToolbarBlock`。
- 表格列定义应尽量清楚表达字段、排序、筛选、操作列，而不是只写静态 HTML。
- 如果用户没有要求一级导航，不要强行生成 `primaryNav`。
- 如果页面需要页内 Tab，优先使用 `TitleTabsHeader` 放入 `secondaryHeader`。

---

## 5. 旧 MiniDevUI 对应关系

| 旧资源 | 当前资源 |
|---|---|
| `table-shell` | `table-page` + `TableShellFrame` |
| `table-block` | `TableShellFrame` + `ToolbarBlock` + `Table` 组合 |
| `sidebar` | `SidebarNav` |
| `title-tabs-header-block` | `TitleTabsHeader` |

旧 `header`、`pagination`、`filter` 等 canonical 资源当前尚未独立迁入，生成时应优先使用已有源码资源组合，必要时在业务代码中局部实现。
