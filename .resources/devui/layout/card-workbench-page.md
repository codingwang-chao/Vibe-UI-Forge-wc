# Card Workbench Page

> 用于工作台首页、项目门户、卡片导航页和概览入口页。它强调入口组织，不强调单个表格或表单。

---

## 1. 何时使用

### 1.1 命中条件

- 用户要求工作台、项目门户、概览、应用入口、快捷操作入口。
- 页面主体是多张卡片或分组入口。
- 页面可以有顶部操作区、分类筛选、右侧辅助信息区。

### 1.2 不适合的情况

- 用户明确要查询、筛选、排序一批数据，改用 `table-page`。
- 用户明确要填写、编辑、保存配置，改用 `form-page`。

---

## 2. 推荐结构

当前 `card-workbench-page` 先使用已有 React 组件组合，不注册尚未迁移的旧 Vue runtime block：

```tsx
<main>
  {header}
  {toolbar}
  <section>
    <Card />
    <Card />
    <Card />
  </section>
  {optionalRightRail}
</main>
```

对应源码：

| 资源 | Source |
|---|---|
| `card` | `devui-playground/src/components/ui/card` |
| `toolbar-block` | `devui-playground/src/components/ui/toolbar-block` |
| `title-tabs-header` | `devui-playground/src/components/ui/title-tabs-header` |
| `sidebar-nav` | `devui-playground/src/components/ui/sidebar-nav` |
| `button` / `badge` / `avatar` | `devui-playground/src/components/ui/*` |

---

## 3. Slot 规则

| Slot | 默认 | 推荐资源 | 何时隐藏 |
|---|---|---|---|
| `header` | 显示 | 标题、说明、全局上下文 | 嵌入式工作台或外层已有标题时隐藏 |
| `toolbar` | 可选 | `ToolbarBlock` | 无搜索、分类、快捷操作时隐藏 |
| `cardGrid` | 必填 | `Card` 列表 | 不应隐藏 |
| `rightRail` | 可选 | 业务自定义卡片 | 无公告、活动、帮助文档时隐藏 |
| `primaryNav` | 可选 | `SidebarNav` | 门户不需要一级导航时隐藏 |

---

## 4. 可替换清单

卡片页比 block 更灵活，允许在部分 slot 中替换资源：

| Slot | 默认资源 | 可替换资源 |
|---|---|---|
| `toolbar` | `ToolbarBlock` | 自定义搜索条、分类 Tab、按钮组 |
| `cardGrid` | `Card` | 业务卡片组件、入口卡片、统计卡片 |
| `rightRail` | 自定义卡片区 | 公告卡、活动卡、帮助文档卡 |
| `primaryNav` | `SidebarNav` | `AccordionNav`、隐藏 |

生成时要把可替换关系写清楚，不要把某个工作台页面固化成只能服务一个业务场景的死模板。

---

## 5. 旧 MiniDevUI 对应关系

| 旧资源 | 当前状态 |
|---|---|
| `card-workbench-shell` | 当前作为 `card-workbench-page` 语义参考 |
| `banner-block` | 待迁移，不注册为当前源码真值 |
| `card-toolbar-block` | 待迁移，暂用 `ToolbarBlock` 替代 |
| `announcementCard` / `activityCard` / `helpDocCard` / `menuCard` | 待迁移，当前可用 `Card` 组合承载 |

旧 MiniDevUI 的 card workbench 资源更偏 Vue runtime 和 benchmark 资产；当前第一阶段只迁入可由 `devui-playground/src` 支撑的 React 资源。
