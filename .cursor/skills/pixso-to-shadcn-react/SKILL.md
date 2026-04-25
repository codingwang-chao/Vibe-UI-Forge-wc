---
name: pixso-to-shadcn-react
description: >-
  Turns a Pixso design link (with item-id) into grounded React UI in this repo
  using the Pixso MCP bridge plus the project shadcn SKILL (.agent/skills/shadcn)
  and the harmony resource map. Enforces 1:1 visual fidelity from Pixso
  (DSL + screenshots), Harmony tokens, and Storybook. Use when the user pastes
  a pixso.cn design URL, asks to implement or match a Pixso node, or wants
  Figma/Pixso-to-code in harmony-ui-playground with shadcn rules and
  .resources grounding.
---

# Pixso 链接 → shadcn 风格 React 组件（本仓库工作流）

本 Skill 描述在本仓库内，从 **Pixso 设计链接** 到 **可运行 React 组件**（并遵守 **`.agent/skills/shadcn`** 与 **`.resources`** 契约）的推荐路径。

## 前置条件

1. **Pixso MCP 可用**（**二选一**即可）：**本地** Pixso 桌面 + `http://127.0.0.1:3667/mcp`（见 `wiki/02-从 0 构建资源接入/01-MCP准备.md`），或 **远程** `https://pixso.cn/api/mcp/mcp` 等（以当前 `.cursor/mcp.json` 为准）。需能成功调用 `get_node_dsl` / `get_image`（或等效设计数据与截图能力）。
2. 目标设计文件/节点在账号下**可访问**；Token/权限能覆盖该文件（避免「无文件权限」类错误）。
3. **工程上下文**：读取 `.resources/config.json` 的 `active` 与 `projectRoot`（通常为 `harmony-ui-playground`），所有源码改动落在对应子工程内。

## 链接规范

- 使用带 **`item-id=nodeId`** 的图层链接（例如 `https://pixso.cn/app/design/...?item-id=3286:12110`），不要用仅文件首页的链接。
- `item-id` 即 Node ID（与 DSL 中 `guid` 等效），供 MCP 精确定位节点。

## 设计真值与 1:1 还原（硬约束）

以 **Pixso 为唯一视觉真值**；实现须同时满足**结构化数据**与**像素级对照**。

1. **设计数据（必用）**  
   使用 **MCP/DSL**（或等效设计数据）读取**指定画板/节点**中的：自动布局、内边距/外边距、圆角、尺寸、色值、字级/字重/行高、图层层级与命名；凡可量化项须落到 **px 或已映射 Token**。

2. **截图 / 导出图（必用）**  
   必须拉取**设计稿节点截图或导出图**（如 MCP `get_image` 或等效结果），在**实现前后**与实现稿对照。凡涉及**可动部件**（滑块/旋钮/游标/页签/选中态等），须显式核对：  
   **几何中心/原点、与轨道或容器的边距、激活层与把手/指示器的覆盖关系**——禁止仅凭 `百分比` 或心算而**不**用稿面验证（避免出现「填充端点与圆心关系错误」「边距与 Auto Layout 不一致」等）。

3. **数据与图不一致时**  
   以**可复现的稿面、切片或设计标注**为准，在交付说明中写清**取舍与原因**（例如某节点为示意稿、与 Symbol 主组件不一致时以主件为准）。

4. **多子类型**  
   若规范中存在多子类型（如粗轨/细轨、带图标行/纯文本行、多状态面板），须**按类型/状态分别**对齐尺寸与边距，不得只还原一种就类推全局。

5. **工程与规范**  
   输出仍须符合本仓库约定（见下文 Step 2、Step 3）：目录、命名、Storybook、设计 Token、既有 Harmony 组件与 `components.json` 等。

## 工作流（按顺序执行）

### Step 0 — 读取规则与工程上下文

- 必读：`.agent/skills/shadcn/SKILL.md`（Page Generation Workflow、Critical Rules、资源感知规则）。
- 若生成**整页**：按 Skill 执行 `route-index` → `layout` → `blocks.json` / `components.json` → 源码锚定 → 生成 → `npm run build` / `validate_design_system_resources.mjs`。
- 若仅生成**单个组件或节点切片**：可跳过 route/layout，但仍需对齐现有 **Source Layer**（`src/component/**`）与 **Token**（`src/styles`、`index.css` 等）。

### Step 1 — 用 Pixso MCP 拉取设计真值

在 **同一轮对话内尽快** 使用 MCP（避免批会话缓存过期）：

1. **`get_node_dsl`（或等效）**：按 `file_key` + `guid`（即 `item-id`）取结构化几何与样式，作为**可验收的数字化清单**。
2. **`get_image`（或等效）**：拉取**同一节点**截图，用于**多状态、密度、视觉细节**及可动件与轨道的位置关系；实现后再次对照。
3. **`design_to_code`（若可用）**：`itemId` 填 `nodeId` 或完整 URL；`clientFrameworks` 填 `react`。得到 **TSX 结构草案** 与 **manifest**（含 `http://localhost:3667/code/*.css` 等临时 URL；见下注意）。

**CSS 落盘注意**：`localhost:3667` 上的样式 URL 与 MCP **批次绑定**；若 Agent 环境无法在同一批内 `curl` 成功，不要阻塞流程——改为对照 `get_node_dsl` 与仓库内已有同类组件的 **CSS 变量与几何**（例如 `TitleBar` / `Switch`）手写等价样式，并在 PR 说明中标注「Pixso 导出 CSS 未拉取，已按设计系统 + DSL 对齐」。

**交付须包含（摘要即可）**：

- 从设计数据得出的**关键量化结论**（px、Token 名、圆角/间距表）与**截图对照结论**；
- 若未写入 Pixso 导出 CSS，**fallback 依据**（引用了哪些已有组件/变量）。

### Step 2 — 映射到仓库组件模型（shadcn SKILL 约束）

- **优先复用**：`src/component/` 下已有组件（`List`、`TitleBar`、`Switch`、`Button` 等），用 `npx shadcn@latest info` / 现有 `components.json` 确认别名与已安装能力。
- **新建组件时**：目录与命名对齐现有习惯（独立文件夹、`*.css` 同目录、`*.stories.tsx`、可选 `index.ts` barrel）。
- **遵守 Skill 规则**：如 `cn()`、竖向用 `flex flex-col gap-*`、表单用 `FieldGroup`（若使用 shadcn 表单组件）、图标 `data-icon` 等（详见 `shadcn/rules/*.md`）。
- **本仓库 Harmony 特例**：大量 UI 为自研 `my-*` / `pub-*` 样式而非 `@/components/ui` 全套 shadcn；生成时以 **现有 harmony 组件** 为准，不要假设未安装的 shadcn 组件已存在。

### Step 3 — 实现与接入资源层（按需）

1. 在 `projectRoot` 下实现 TSX + CSS；样式与 **layout 宽度（如 328px）**、**圆角（如 20px）**、**主色（如 #0a59f7）** 与现有页面保持一致，且与 **本 Skill「设计真值与 1:1 还原」** 的量化结论一致。
2. **Storybook**：为组件增加 `*.stories.tsx`；需覆盖**基础用法、多变体、多状态**；若需在画布中「居中预览」，在 `meta.decorators` 中复用与现有一致的装饰器，避免整页背景与项目其余 Story 不一致。具体约定：与 `Card.stories.tsx`、`Slider.stories.tsx` 等保持同一包层，例如外层 `className` 为 `box-border flex min-h-screen w-full min-w-0 items-center justify-center`（部分组件用 `items-start`），**整页（画布）背景色使用 `bg-[#f3f4f6]`**；**不要**为「衬托毛玻璃/渐变稿面」等理由单独换成渐变、彩色底纹或其它 hex，避免 Storybook 里出现与仓库不统一的整页色。
3. **资源地图（可选但推荐）**：在 `.resources/{active}/components.json` 增加条目（`id`、`path`、`export`、`stories`）；在 `.resources/{active}/component/{name}.md` 写简短规格（何时用、props 约定）。
4. **校验**：`node scripts/validate_design_system_resources.mjs`；在子工程内 `npm run build`；必要时 `npm run build-storybook`。

### Step 4 — 交付说明（对用户 / PR）

在回复或 PR 描述中写清：

- Pixso **链接**与 **item-id**；
- 使用的 MCP 工具（`get_node_dsl` / `get_image` / `design_to_code` / …）；
- **设计真值**摘要：关键 **px/Token**、**截图对照**结论、数据与图不一致时的**取舍**；
- 若未写入 Pixso 导出 CSS，说明 **fallback 对齐依据**（对照了哪些现有文件）；
- 改动文件列表与 **Storybook** 入口路径。

## 智能拆解与完整输出（当用户按「全量模板」提需求时）

当用户要求从指定链接产出一整套组件规格与代码时，模型须先完成**拆解**再交付**清单**与**源码**。

### 智能拆解

1. 识别该节点下的**基础核心组件**（不可再拆的设计原子或业务主件）。
2. 识别**衍生变体**（类型、尺寸、主题、状态、配色、不同文案/场景等），并与 DSL 中 Symbol/变体/状态帧对齐。

### 须完整输出的内容（与交付物对应）

1. **DOM/结构树**：容器、子元素、文本、图标、分割元素等的**完整嵌套关系**（可对应 React 树或无障碍树）。
2. **全量样式参数**：色值、字号、字重、行高、宽高、圆角、内外边距、元素间距、边框、阴影、透明度、背景、布局方式等——**不无故省略**（可与 Token 表并列）。
3. **交互状态**：`default` / `hover` / `active` / `disabled` / `focus` 等视觉差异；通用控件补充**合理业务交互**（键盘、受控/非受控、无障碍属性等）。
4. **组件与变体设计**：**shadcn 组合式**思路；完整 **TypeScript Props**；以类型、尺寸、状态、主题等扩展。
5. **技术栈**：**React + TypeScript + Tailwind**（与仓库一致处用 `cn`、与现有 CSS 同目录时可用纯 CSS/变量）；**统一设计 Token**；符合本仓库**组件库工程化**（导出、stories、可选 `index.ts`）。
6. **Storybook**：**基础用法、多变体、多状态**示例，可接入本仓库 Storybook；`decorators` 整页背景与现有一致（`bg-[#f3f4f6]` 等，见上 Step 3）。
7. **最终交付物**：**可直接运行**的组件源码、**类型定义**、**`*.stories.tsx`**，目录与命名**严格**跟随现有 `src/component/**` 习惯。

**整体**须在 **鸿蒙/ Harmony 设计规范** 与 **shadcn/ui 工程习惯**（及本 repo 的 **Harmony 特例**）之间取得一致，以**现有源码**为锚、以 **Pixso 为真值**。

## 反模式（避免）

- 用历史 `src/render/**` 当新页面模板（Skill 明确禁止）。
- 忽略 `.resources` 单独硬编码页面类型（资源感知项目应走 `route-index` / `layout`）。
- 假设 `curl localhost:3667/code/*.css` 在远程 Agent 环境一定成功。
- **仅凭主观「差不多」**还原交互控件的**位置、边距、可动件与轨道的几何关系**；**不做 `get_node_dsl` 或** **不做** 截图对照即宣称 1:1。
- 在 Storybook 中不做任何布局包裹，导致移动端组件贴在画布左上角难以验收。
- 在 Storybook 的 `decorators` 里**随意**设置整页背景（如渐变、与 `bg-[#f3f4f6]` 不一致的纯色），与 `Card`/`Slider` 等已有多数 Story 的画布风格脱节。

## 相关文档索引

| 主题 | 路径 |
|------|------|
| Pixso MCP 配置 | `wiki/02-从 0 构建资源接入/01-MCP准备.md` |
| 设计输入 → 资源层全路径 | `wiki/02-从 0 构建资源接入/03-从设计输入到资源层的完整路径.md` |
| shadcn 页面生成与资源契约 | `.agent/skills/shadcn/SKILL.md`、`references/page-generation.md`、`references/resource-contract.md` |
| 资源校验脚本 | `scripts/validate_design_system_resources.mjs` |

---

## 附录：可复制的标准需求模板（给用户的原始输入）

将下列整块粘贴到对话，并把链接替换为**带 `item-id` 的 Pixso 链接**：

```text
设计真值与 1:1 还原

以 Pixso 为唯一视觉真值：请使用 MCP/DSL（或等效设计数据）读取指定画板/节点（需带 item-id 或等效 guid）中的自动布局、内边距/外边距、圆角、尺寸、色值、字级、图层层级与命名。

必须同时拉取设计稿节点截图/导出图（或 get_image 等效结果），在实现前后做对照。凡涉及可动部件（滑块/旋钮/游标/选中态等），须核对：几何中心/原点、与轨道/容器的边距、激活层与把手的覆盖关系（避免仅用百分比估算导致与稿不一致）。

交付需写明：从设计数据得到的量化结论（关键 px / token）与截图对照结果；若数据与图不一致，以可复现的稿面/标注为准并说明取舍。

禁止仅凭主观「差不多」实现交互控件的位置与边距；若规范中存在多种子类型（如粗轨/细轨、有图标/无图标行），逐类型对齐尺寸与边距。

输出仍须符合本仓库/工程规范（如目录、Storybook、Token 与既有组件模式）。

请调用 Pixso MCP 协议精准读取指定设计稿链接节点，在有能力时抓取节点截图、做多视角/多状态画面对比，严格 1:1 还原视觉样式，整体遵循鸿蒙设计规范与 shadcn/ui 组件开发标准。

首先智能拆解区分：
1. 识别当前页面内【基础核心组件】
2. 自动识别所有衍生【组件变体】（包含不同类型、尺寸、主题、状态、配色、文案场景）

完整输出以下内容：
1. 完整 DOM 层级结构树：容器、嵌套子元素、文本、图标、分割元素等完整嵌套关系；
2. 全量精确样式参数：色值、字号、字重、行高、宽高、圆角、内边距、外边距、元素间距、边框、阴影、透明度、背景、布局方式，不省略任何设计原始参数；
3. 完整交互状态：default、hover、active、disabled、focus 全部视觉差异，通用组件补充标准业务交互逻辑；
4. 组件拆分与变体设计：采用 shadcn 组合式组件思想，定义完整 TypeScript 类型 Props，区分类型、尺寸、状态、主题多变体，保证可复用可扩展；
5. 代码技术要求：使用 React + TypeScript + Tailwind 编码，统一设计 Token，符合组件库工程化规范；
6. 额外要求：配套输出标准 Storybook 案例代码，包含基础用法、多变体、多状态演示，可直接接入项目 Storybook 文档库；Storybook `decorators` 整页画布背景与仓库已有组件一致（如 `bg-[#f3f4f6]`），勿用与项目其它 Story 不一致的渐变或随意底色；
7. 最终交付：输出可直接复制运行的完整组件源码 + 类型定义 + stories 示例文件，严格参考已有项目中组件的结构、命名、目录规范保持一致。

Pixso 设计链接：<替换成带 item-id 的完整 URL>
```

（Agent 执行时以本文件正文 **「设计真值与 1:1 还原」** 与 **「工作流」** 为准；附录模板便于用户一次粘贴完整要求。）
