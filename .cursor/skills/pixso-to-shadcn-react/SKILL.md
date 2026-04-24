---
name: pixso-to-shadcn-react
description: >-
  Turns a Pixso design link (with item-id) into grounded React UI in this repo
  using the Pixso MCP bridge plus the project shadcn SKILL (.agent/skills/shadcn)
  and the harmony resource map. Use when the user pastes a pixso.cn design URL,
  asks to implement or match a Pixso node, or wants Figma/Pixso-to-code in
  harmony-ui-playground with shadcn rules and .resources grounding.
---

# Pixso 链接 → shadcn 风格 React 组件（本仓库工作流）

本 Skill 描述在本仓库内，从 **Pixso 设计链接** 到 **可运行 React 组件**（并遵守 **`.agent/skills/shadcn`** 与 **`.resources`** 契约）的推荐路径。

## 前置条件

1. **Pixso 桌面端**：已安装、登录；目标文件为当前激活标签页；已启用 Pixso MCP（见 `wiki/02-从 0 构建资源接入/01-MCP准备.md`）。
2. **Cursor MCP**：已配置指向 `http://127.0.0.1:3667/mcp`（与 Pixso 同机、同批会话）。
3. **工程上下文**：读取 `.resources/config.json` 的 `active` 与 `projectRoot`（通常为 `harmony-ui-playground`），所有源码改动落在对应子工程内。

## 链接规范

- 使用带 **`item-id=nodeId`** 的图层链接（例如 `https://pixso.cn/app/design/...?item-id=3286:12110`），不要用仅文件首页的链接。
- `item-id` 即 Node ID，供 MCP 精确定位节点。

## 工作流（按顺序执行）

### Step 0 — 读取规则与工程上下文

- 必读：`.agent/skills/shadcn/SKILL.md`（Page Generation Workflow、Critical Rules、资源感知规则）。
- 若生成**整页**：按 Skill 执行 `route-index` → `layout` → `blocks.json` / `components.json` → 源码锚定 → 生成 → `npm run build` / `validate_design_system_resources.mjs`。
- 若仅生成**单个组件或节点切片**：可跳过 route/layout，但仍需对齐现有 **Source Layer**（`src/component/**`）与 **Token**（`src/styles`、`index.css` 等）。

### Step 1 — 用 Pixso MCP 拉取设计真值

在 **同一轮对话内尽快** 使用 MCP（避免 Pixso 本地批缓存过期）：

1. **`design_to_code`**：`itemId` 填 `nodeId`（如 `3286:12110`）或完整 URL；`clientFrameworks` 填 `react`。得到 **TSX 结构草案** 与 **manifest**（含 `http://localhost:3667/code/*.css` 等临时 URL）。
2. **`get_image`**：同一节点，用于视觉对照（结构/状态/密度）。
3. **`get_node_dsl`**（可选）：若可用，补充 DSL；失败则依赖上两步 + 现有组件源码。

**CSS 落盘注意**：`localhost:3667` 上的样式 URL 与 MCP **批次绑定**；若 Agent 环境无法在同一批内 `curl` 成功，不要阻塞流程——改为对照仓库内已有同类组件的 **CSS 变量与几何**（例如 `TitleBar` / `Switch`）手写等价样式，并在 PR 说明中标注「Pixso 导出 CSS 未拉取，已按设计系统对齐」。

### Step 2 — 映射到仓库组件模型（shadcn SKILL 约束）

- **优先复用**：`src/component/` 下已有组件（`List`、`TitleBar`、`Switch`、`Button` 等），用 `npx shadcn@latest info` / 现有 `components.json` 确认别名与已安装能力。
- **新建组件时**：目录与命名对齐现有习惯（独立文件夹、`*.css` 同目录、`*.stories.tsx`、可选 `index.ts` barrel）。
- **遵守 Skill 规则**：如 `cn()`、竖向用 `flex flex-col gap-*`、表单用 `FieldGroup`（若使用 shadcn 表单组件）、图标 `data-icon` 等（详见 `shadcn/rules/*.md`）。
- **本仓库 Harmony 特例**：大量 UI 为自研 `my-*` / `pub-*` 样式而非 `@/components/ui` 全套 shadcn；生成时以 **现有 harmony 组件** 为准，不要假设未安装的 shadcn 组件已存在。

### Step 3 — 实现与接入资源层（按需）

1. 在 `projectRoot` 下实现 TSX + CSS；样式与 **layout 宽度（如 328px）**、**圆角（如 20px）**、**主色（如 #0a59f7）** 与现有页面保持一致。
2. **Storybook**：为组件增加 `*.stories.tsx`；若需在画布中「居中预览」，在 `meta.decorators` 中使用全屏 `flex min-h-screen items-center justify-center` 包裹（参考 `Card.stories.tsx`、`Slider.stories.tsx`）。
3. **资源地图（可选但推荐）**：在 `.resources/{active}/components.json` 增加条目（`id`、`path`、`export`、`stories`）；在 `.resources/{active}/component/{name}.md` 写简短规格（何时用、props 约定）。
4. **校验**：`node scripts/validate_design_system_resources.mjs`；在子工程内 `npm run build`；必要时 `npm run build-storybook`。

### Step 4 — 交付说明（对用户 / PR）

在回复或 PR 描述中写清：

- Pixso **链接**与 **item-id**；
- 使用的 MCP 工具（`design_to_code` / `get_image` / …）；
- 若未写入 Pixso 导出 CSS，说明 **fallback 对齐依据**（对照了哪些现有文件）；
- 改动文件列表与 **Storybook** 入口路径。

## 反模式（避免）

- 用历史 `src/render/**` 当新页面模板（Skill 明确禁止）。
- 忽略 `.resources` 单独硬编码页面类型（资源感知项目应走 `route-index` / `layout`）。
- 假设 `curl localhost:3667/code/*.css` 在远程 Agent 环境一定成功。
- 在 Storybook 中不做任何布局包裹，导致移动端组件贴在画布左上角难以验收。

## 相关文档索引

| 主题 | 路径 |
|------|------|
| Pixso MCP 配置 | `wiki/02-从 0 构建资源接入/01-MCP准备.md` |
| 设计输入 → 资源层全路径 | `wiki/02-从 0 构建资源接入/03-从设计输入到资源层的完整路径.md` |
| shadcn 页面生成与资源契约 | `.agent/skills/shadcn/SKILL.md`、`references/page-generation.md`、`references/resource-contract.md` |
| 资源校验脚本 | `scripts/validate_design_system_resources.mjs` |
