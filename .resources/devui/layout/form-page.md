# Form Page

> 用于创建、编辑、设置、配置、详情类页面。它比表格页更强调分组、导航和局部显隐。

---

## 1. 何时使用

### 1.1 命中条件

- 用户要填写、修改或保存一组字段。
- 页面包含分组配置、详情信息、步骤配置、账号/权限/项目设置。
- 页面需要左侧二级导航、树导航或手风琴导航帮助定位配置区域。
- 页面主体应落在 `FormShellFrame`。

### 1.2 不适合的情况

- 页面主体是批量数据浏览，改用 `table-page`。
- 页面主体是卡片入口、项目门户或工作台，改用 `card-workbench-page`。

---

## 2. 推荐结构

```tsx
<FormShellFrame
  header={topArea}
  primaryNav={primaryNav}
  secondaryNav={secondaryNav}
  secondaryHeader={secondaryHeader}
  toolbar={toolbar}
>
  {formContent}
</FormShellFrame>
```

对应源码：

| 资源 | Source |
|---|---|
| `form-shell-frame` | `devui-playground/src/components/ui/form-shell-frame` |
| `sidebar-nav` | `devui-playground/src/components/ui/sidebar-nav` |
| `accordion-nav` | `devui-playground/src/components/ui/accordion-nav` |
| `tree-nav` | `devui-playground/src/components/ui/tree-nav` |
| `subheader` | `devui-playground/src/components/ui/subheader` |
| `toolbar-block` | `devui-playground/src/components/ui/toolbar-block` |
| `input` / `select` / `switch` / `button` | `devui-playground/src/components/ui/*` |

层级边界：

| 层级 | 资源 |
|---|---|
| Layout truth | `FormShellFrame` |
| Block truth | `SidebarNav`、`AccordionNav`、`TreeNav`、`Subheader`、`ToolbarBlock` |
| Component truth | `Input`、`Select`、`Switch`、`Button` |

---

## 3. Slot 规则

| Slot | 默认 | 推荐资源 | 何时隐藏 |
|---|---|---|---|
| `header` | 显示 | 页面标题、全局顶部区 | 外层应用已经提供顶部栏时可隐藏 |
| `primaryNav` | 可选 | `SidebarNav` | 当前页面不需要一级导航时隐藏 |
| `secondaryNav` | 可选 | `AccordionNav` 或 `TreeNav` | 配置项较少、无需分组跳转时隐藏 |
| `secondaryHeader` | 可选 | `Subheader` 或 `TitleTabsHeader` | 无面包屑、页内 Tab、上下文说明时隐藏 |
| `toolbar` | 可选 | `ToolbarBlock` | 操作按钮已经在表单底部或页面无动作时隐藏 |
| `children` | 必填 | 表单主体 | 不应隐藏 |

---

## 4. 生成约束

- `FormShellFrame` 的 `secondaryNav` 只有在需要配置分组、目录树、步骤导航时才生成。
- 字段较少时，不要为了套模板强行生成复杂侧栏。
- 设置页可以把保存、重置、测试连接等操作放入 `ToolbarBlock`；长表单也可以在主体底部再补操作区。
- 如果表单中嵌入表格，应只把表格作为局部内容，不应改走 `table-page`，除非页面核心任务已经变成表格管理。
- 复杂表单应补充组件使用 markdown，说明字段分组、可隐藏区域和默认值来源。

---

## 5. 旧 MiniDevUI 对应关系

| 旧资源 | 当前资源 |
|---|---|
| `form-shell` | `form-page` + `FormShellFrame` |
| `form` | `FormShellFrame` 内的业务表单内容 |
| `accordion` | `AccordionNav` |
| `tree` | `TreeNav` |
| `subheader-block` | `Subheader` |

旧 MiniDevUI 的 `form` 是页面语义资源；当前 React 侧没有单独 canonical `Form` 组件，生成时应组合 `Input`、`Select`、`Switch`、`Button` 等基础组件。
