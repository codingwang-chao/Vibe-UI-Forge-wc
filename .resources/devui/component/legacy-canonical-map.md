# Legacy MiniDevUI Canonical Map

> 旧 `(skill)MiniDevUI` 的 canonical ID 与当前 React Resource Layer 不完全同名。Agent 处理旧 PRD、旧 benchmark 或旧 skill 文档时，必须先做这层映射。

## 1. 已迁移映射

| 旧 canonical ID | 当前推荐 ID | 当前层级 | 当前 Source |
|---|---|---|---|
| `table-shell` | `table-shell-frame` | Layout | `src/components/ui/table-shell-frame` |
| `form-shell` | `form-shell-frame` | Layout | `src/components/ui/form-shell-frame` |
| `sidebar` | `sidebar-nav` | Block | `src/components/ui/sidebar-nav` |
| `accordion` | `accordion-nav` | Block | `src/components/ui/accordion-nav` |
| `tree` | `tree-nav` | Block | `src/components/ui/tree-nav` |
| `title-tabs-header-block` | `title-tabs-header` | Block | `src/components/ui/title-tabs-header` |
| `subheader-block` | `subheader` | Block | `src/components/ui/subheader` |
| `toolbar-block` | `toolbar-block` | Block | `src/components/ui/toolbar-block` |
| `table` | `table` | Component | `src/components/ui/table` |
| `card` | `card` | Component | `src/components/ui/card` |

## 2. 组合映射

| 旧 canonical ID | 当前处理方式 |
|---|---|
| `table-block` | 使用 `TableShellFrame` + `ToolbarBlock` + `Table` 组合 |
| `form` | 使用 `FormShellFrame` 内部的 `Input` / `Select` / `Switch` / `Button` 组合 |
| `card-workbench-shell` | 使用 `card-workbench-page` layout 文档作为语义参考，再组合 `Card` / `ToolbarBlock` |

## 3. 暂未迁移

| 旧 canonical ID | 当前状态 |
|---|---|
| `app-shell` | 待确认是否需要独立源码 |
| `header` | 待确认；当前可由 shell 的 `header` slot 承载 |
| `breadcrumbs` | 待确认；部分能力已由 `Subheader` 承载 |
| `pagination` | 待迁移 |
| `tabs` | 待确认；部分能力已由 `TitleTabsHeader` / `Subheader` 承载 |
| `search` | 待迁移；当前可用 `Input` 局部实现 |
| `checkbox` | 待迁移 |
| `filter` | 待迁移；当前可用 `Input` / `Select` 局部实现 |
| `drawer-panel-block` | 待迁移 |
| `banner-block` | 待迁移 |
| `card-toolbar-block` | 待迁移；当前可用 `ToolbarBlock` 替代 |
| `announcementCard` / `activityCard` / `helpDocCard` / `menuCard` | 待迁移；当前可用 `Card` 组合承载 |

## 4. 使用原则

- 当前生成代码必须优先使用 `.resources/devui/components.json` 和 `devui-playground/src` 中已存在的 React 组件。
- `table-shell` 和 `form-shell` 是 layout 级真值，不进入 `blocks.json`。
- `toolbar-block`、`title-tabs-header`、`subheader`、`sidebar-nav`、`accordion-nav`、`tree-nav` 是 block 级真值，应进入 `blocks.json`。
- 旧 canonical 名称只能作为语义入口，不能直接假设当前存在同名源码。
- 如果一个旧资源被标记为待迁移，Agent 应先使用当前已有组件组合实现，不应临时把旧 Vue runtime 当作 React 真值。
