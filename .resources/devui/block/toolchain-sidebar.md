# ToolchainSidebar

> DevOps 工具链侧边导航，包含项目选择、一级/二级导航和底部收起入口。

## 1. 源码支撑

```text
devui-playground/src/components/ui/toolchain-sidebar/toolchain-sidebar.tsx
devui-playground/src/components/ui/toolchain-sidebar/toolchain-sidebar.css
devui-playground/src/components/ui/toolchain-sidebar/toolchain-sidebar.stories.tsx
```

## 2. Figma 来源

```text
fileKey: VBxWjuXDcxprCHcUFKNF81
nodeId: 10673:14824
nodeName: 工具链专用导航
```

## 3. 可配置区域

| Prop | 作用 |
|---|---|
| `projectName` | 顶部项目名称 |
| `items` | 一级/二级导航树 |
| `activeId` | 当前选中导航项 |
| `openIds` | 当前展开的一级导航项 |

## 4. 页面模板约束

- `ToolchainSidebar` 只负责工具链导航，不负责页面标题、面包屑或表格内容。
- 完整列表页应把它放在页面工作区左侧。
- 如果生成的是非 DevOps 工具链页面，优先使用通用 `SidebarNav`，不要强行使用本 Block。
