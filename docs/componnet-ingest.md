# DevUI Component Ingest Workflow

> 本文是 Agent / 工程执行规范，用于把 Figma MCP、节点链接、截图或其他设计输入，稳定转成 `devui-playground` 中可运行、可复用、可注册的 React Component / Block。

核心链路：

```text
MCP / Figma Node 输入
  ↓
读取设计结构与截图
  ↓
生成 benchmark HTML 作为视觉标杆
  ↓
参考 shadcn 源组件写法
  ↓
产出 Component / Block TSX 真值
  ↓
如果是 Block，按 shadcn registry:block 模型登记依赖和文件
  ↓
Storybook 验收
  ↓
注册 Resource Layer
```

核心原则：

```text
benchmark HTML 只是视觉对齐物
devui-playground/src/components/ui/** 下的 TSX 才是 Component / Block 真值
```

---

## 1. Workflow Goal

这条 workflow 的目标不是“把 Figma 图层翻译成代码”，而是把设计输入整理成稳定的组件真值：

- 可运行：组件能在 `devui-playground` 中正常编译和渲染。
- 可复用：组件 API 清楚，能被 Block / Page 组合调用。
- 可注册：Component 能写入 `.resources/devui/components.json`，Block 能写入 `.resources/devui/blocks.json`。
- 可验收：组件能在 Storybook 中被设计师检查视觉、状态和变体。

必须避免三类错误：

| 错误 | 为什么不允许 |
|---|---|
| 把 benchmark HTML 当作最终真值 | benchmark 只用于视觉对齐，不能被页面生成复用 |
| 把静态 HTML / CSS 直接硬塞进 React | 这会绕开项目已有组件、token 和组合方式 |
| 让 Storybook story 承载组件逻辑 | Story 只是调试入口，组件逻辑必须在 TSX 源码里 |

最终真值只能落在：

```text
devui-playground/src/components/ui/{component-or-block-id}/
```

---

## 2. Input Contract

Agent 可以接受这些输入：

| 输入 | 用途 |
|---|---|
| Figma / Pixso MCP 链接 | 读取节点结构、变量、尺寸、截图 |
| `node-id` | 锁定组件节点，避免误读整个页面 |
| 组件名称 | 对齐目录名、export 名、Storybook title、资源层 ID |
| 截图 | 在 MCP 信息不足时辅助视觉还原 |
| 组件用途 | 判断它是 Component、Block，还是 Layout |
| 变体说明 | 推导 `variant`、`size`、`state` 等 API |
| 状态说明 | 覆盖 default、hover、active、disabled、loading、selected 等状态 |

开始前必须先做输入检查：

- 节点是否是组件本体，而不是整页、容器或页面局部截图。
- 节点是否包含完整变体，或是否需要额外节点补齐。
- 是否混入了外层 Page / Block 职责。
- 是否应该拆成多个 Component，而不是一个大组件。
- 是否应该抽为 Block 或 Layout，而不是 Component。

判断边界时按这条规则：

| 对象 | 判断标准 |
|---|---|
| Component | 原子或基础复用单元，关注 props、状态、变体 |
| Block | 由多个 Component 组合成稳定业务区块 |
| Layout | 页面骨架或槽位机制，决定区域组合关系 |

如果输入节点实际是 Block，例如 `ToolbarBlock`，则 TSX 必须优先组合已有 Component，例如 `Button`、`Input`、`Select`、`Separator`、`Tag`，不能把所有子元素写成静态 HTML。

Block 的真值也必须是 TSX。Figma MCP 节点、benchmark HTML 和截图都只能证明“这个 Block 长什么样、由哪些子组件组成、有哪些状态和插槽”，不能替代源码。

---

## 3. Benchmark HTML Phase

benchmark HTML 的职责是先快速对齐设计理解：

- 结构是否正确。
- 视觉是否接近设计稿。
- 状态是否被识别。
- 变体是否齐全。
- 组件边界是否合理。

benchmark 通过前，不进入 TSX 真值实现。

benchmark 通过后，也不能直接把 HTML / CSS 原样搬进 React。进入 TSX 阶段时，必须重新按项目组件架构实现：

```text
benchmark HTML
  ↓ 只作为视觉标杆
React TSX + CSS + existing components
  ↓ 才是可注册真值
```

设计师只需要检查 benchmark 是否“理解对了”。Agent 需要在进入 TSX 前主动说明：

- benchmark 中哪些元素会变成真实子组件。
- 哪些静态样式会转成 token / CSS。
- 哪些变体会进入 props。
- 哪些内容属于 Block 或 Layout，不应该塞进 Component。

---

## 4. shadcn Source Reference Phase

写 TSX 前，Agent 必须参考 shadcn 的源码写法，而不是只参考 Storybook 展示。

参考重点：

| 维度 | 要求 |
|---|---|
| 源码结构 | 单组件源码清晰、紧凑，组件逻辑在 TSX 中 |
| Props 命名 | 用组件语义命名，不使用 Figma 图层名 |
| 变体表达 | 用 `variant`、`size`、`state` 等稳定字段表达 |
| 内容入口 | 优先使用 `children`，不要无必要新增 `text` 之类重复 API |
| 组合方式 | 优先组合已有组件和 slot，而不是复制静态 DOM |
| class 处理 | 使用 `cn` 合并 class，必要时使用 `cva` 表达变体 |
| 可识别性 | 根节点可加 `data-slot` / `data-runtime-component` 等标识 |
| Storybook | Story 只是调试入口，不承载组件真值 |

可以参考的 shadcn 源码特征：

```tsx
const componentVariants = cva("base-class", {
  variants: {
    variant: {
      default: "...",
      destructive: "...",
    },
    size: {
      default: "...",
      sm: "...",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})
```

本项目允许根据工程约束调整，不需要机械复制 shadcn：

- 如果项目 lint 不允许组件文件导出非组件对象，可以把 `xxxVariants` 保留为内部常量，不对外 export。
- 如果组件有独立 CSS 文件，`cva` 可以只负责组合稳定 class，不必把所有样式写进 class 字符串。
- 如果已有组件没有 `asChild` 模式，不需要强行补 `asChild`。
- 如果组件内部有 close button、icon slot 等结构，优先保证 API 清楚和渲染稳定。

---

## 4.1 shadcn Block Mechanism

shadcn 的 Block 不是“截图级模板”，而是 registry 中的可安装代码单元。它的关键机制可以抽象为：

| shadcn 字段 / 概念 | 作用 | DevUI ingest 对应关系 |
|---|---|---|
| `type: "registry:block"` | 标记复杂组件或业务区块 | `.resources/devui/blocks.json` 中的一条 block 记录 |
| `name` | registry 内唯一 ID，通常 kebab-case | `id` |
| `title` / `description` | 人类可读说明 | `name` / `description` / `doc` |
| `registryDependencies` | 依赖哪些 shadcn primitives 或其他 registry items | `dependencies`，必须指向已注册 DevUI Component / Block |
| `dependencies` | npm 包依赖 | 只有真实新增包时才记录，不用于表达内部组件依赖 |
| `files[]` | Block 由哪些源码文件组成 | `files`，必须指向 TSX / CSS / hook / lib 等真实文件 |
| `registry:page` | 可落到路由或页面文件 | DevUI 中通常归 Layout / Page，不直接塞进基础 Component |
| `registry:component` | Block 内部或外部复用组件 | DevUI 中对应 `devui-playground/src/components/ui/**` |
| `registry:hook` / `registry:lib` | Block 辅助逻辑 | 需要时单独落 hook / lib，并在 `files` 中登记 |

shadcn 官方 block 可以是单个组件变体，也可以是 dashboard 这类多文件复杂区块；关键不是层级大小，而是它能否作为一个稳定组合被安装、复用和预览。

DevUI ingest 借用这个机制，但不直接把 `.resources/devui/blocks.json` 写成 shadcn CLI registry schema。内部资源层优先服务 Agent 页面生成和组件维护；未来如需对接 shadcn CLI，可从 `blocks.json` 派生出符合 `registry-item.json` 的发布产物。

---

## 4.2 Figma MCP Block Intake

当 Figma MCP 输入节点被判断为 Block 时，按以下顺序纳入：

```text
Figma MCP component / instance / node
  ↓
识别 Block 边界和子组件依赖
  ↓
读取/创建 .resources/devui/block/{block-id}.md 工作流草案
  ↓
生成 benchmark HTML 作为视觉标杆
  ↓
拆解为 props、slots、data model、dependencies
  ↓
产出 Block TSX / CSS / story
  ↓
回写 block markdown 的源码支撑、props、可隐藏区域和生成约束
  ↓
登记 .resources/devui/blocks.json
  ↓
必要时登记 .resources/devui/components.json
```

### 4.2.1 Block Boundary Rules

Figma 节点纳入 Block 前必须先判断边界：

| 判断项 | 要求 |
|---|---|
| 是否是稳定组合 | 由多个基础 Component 组成，且页面中会重复出现 |
| 是否包含页面职责 | 如果包含页面路由、全屏布局、数据加载流程，应拆到 Layout / Page |
| 是否包含可复用 primitives | 能拆出 Button、Input、Tag、Table、Card 等已有或新增 Component |
| 是否需要独立 API | 能用 props / slots 控制内容，而不是只能渲染一份静态 DOM |
| 是否需要独立验收 | 设计师需要在 Storybook 看到该区块的默认状态、变体或响应式表现 |

如果节点只是单个可复用控件，进入 Component workflow；如果节点是整页，先进入 Layout workflow，再把页面内稳定片段切成 Block。

### 4.2.2 MCP Extraction Contract

从 Figma MCP 读取 Block 时，Agent 必须记录这些信息：

| 信息 | 用途 |
|---|---|
| `figma.fileKey` / `nodeId` / `nodeName` | 追溯设计来源 |
| 截图或 rendered image | 作为 benchmark 和 Storybook 视觉验收参照 |
| 组件实例和变体 | 推导依赖组件与 props |
| Auto layout、尺寸、间距 | 转成 Block CSS 布局约束 |
| fills、strokes、typography、effects | 对齐 token 或记录 token 缺口 |
| 文案、图标、状态 | 推导默认 args、slots、actions |
| nested component names | 匹配 `.resources/devui/components.json` 中已有组件 |

MCP 读取结果必须进入 Block 文档或资源元数据，至少保留 `source.kind`、`source.nodeId` 和可追溯的文件信息。不要只把 Figma 链接写在临时对话里。

推荐在 `.resources/devui/blocks.json` 中保留来源字段：

```json
{
  "id": "toolbar-block",
  "name": "ToolbarBlock",
  "pageType": "table-page",
  "description": "页面或区块操作条，可承载按钮、搜索、筛选、导出、刷新等操作。",
  "doc": "block/toolbar-block.md",
  "source": {
    "kind": "figma-mcp",
    "fileKey": "xxx",
    "nodeId": "3665:10320",
    "nodeName": "ToolbarBlock"
  },
  "files": [
    "src/components/ui/toolbar-block/toolbar-block.tsx",
    "src/components/ui/toolbar-block/toolbar-block.css"
  ],
  "stories": [
    "src/components/ui/toolbar-block/toolbar-block.stories.tsx"
  ],
  "dependencies": ["button", "input", "select", "tag"]
}
```

### 4.2.3 TSX Truth From Block

Block TSX 的目标是把 Figma 结构变成可调用 API：

| Figma / MCP 信息 | TSX 真值表达 |
|---|---|
| Frame / auto-layout | 根节点结构、CSS layout class |
| Component instance | import 已有 DevUI 组件 |
| Variant property | `variant`、`size`、`state`、`orientation` 等 props |
| Text layer | 默认 `children`、`label`、`title` 或数据数组 |
| Icon layer | icon slot、icon component、action config |
| Repeated item | typed array prop，例如 `tabs`、`actions`、`items` |
| Optional group | slot prop，例如 `prefix`、`suffix`、`toolbar`、`footer` |
| Interaction state | controlled / uncontrolled props、callback、disabled/loading 状态 |

实现时必须遵守：

- 先匹配 `.resources/devui/components.json` 中已有组件；没有才新增 Component。
- Block 只组合和编排，不复制已有组件内部 DOM。
- Block 的默认 props 可以还原 Figma 默认形态，但调用者必须能替换内容。
- Figma 图层名不能直接变成公开 prop 名；公开 API 用业务语义命名。
- benchmark HTML 通过后，也要重新写 TSX，不允许原样迁移静态 DOM。
- 如果 Block 需要 hook / util，源码应落在明确路径，并登记到 `files`。

### 4.2.4 Component Registration From Block

从 Figma Block 中发现新基础组件时，按以下规则纳入 Component 真值：

| 情况 | 处理 |
|---|---|
| 子节点已匹配现有组件 | 直接 import 使用，并写入 Block `dependencies` |
| 子节点是可复用控件但尚未存在 | 先创建 Component TSX，再让 Block 依赖它 |
| 子节点只是该 Block 的私有片段 | 可作为 Block 内部私有子组件，不注册到 `components.json` |
| 子节点是页面数据结构 | 不注册为 Component，进入 Block props / data model |
| 子节点是一次性装饰 | 优先转 CSS 或内部元素，不污染资源层 |

因此，Block 可以触发 Component ingest，但不能反过来把整个 Block 注册成基础 Component，除非它已经被定义为可跨页面复用的区块组件，例如 `ToolbarBlock`。

---

## 4.3 Local Block Markdown Workflow

`.resources/devui/block/{block-id}.md` 是本地 Block 构建 workflow，不只是说明文档。它承担三件事：

| 阶段 | 作用 |
|---|---|
| 构建前 | 判断 Block 是否应该复用已有实现，避免重复造一个相似区块 |
| 构建中 | 约束 props、可隐藏区域、组合方式和页面生成边界 |
| 构建后 | 让 Agent 页面生成时能稳定选择和调用这个 Block |

### 4.3.1 Build Order

构建 Block 时，block markdown 必须和 TSX 同步推进：

```text
1. 查找 .resources/devui/blocks.json 是否已有相近 block
2. 读取相近 block 的 .resources/devui/block/*.md
3. 判断复用、扩展、还是新增 block
4. 新增时先创建 block markdown 草案
5. 用 markdown 草案约束 benchmark 和 TSX API
6. 实现 TSX / CSS / story
7. 回写 markdown，确保它描述的是最终源码而不是初稿
8. 更新 blocks.json 和必要的 components.json
```

不要先写完 TSX 再凭记忆补文档。Block markdown 必须参与 API 命名、区域拆分和显隐规则设计。

### 4.3.2 Required Markdown Shape

本地 block markdown 推荐固定结构：

````md
# BlockName

> 一句话说明这个 Block 的职责。

## 1. 适用场景

- 这个 Block 应该出现在哪类页面或区块。

## 2. 源码支撑

```text
devui-playground/src/components/ui/{block-id}/{block-id}.tsx
devui-playground/src/components/ui/{block-id}/{block-id}.stories.tsx
```

核心 props：

| Prop | 用途 |
|---|---|
| `items` | 数据或重复项 |

## 3. 可选 / 可隐藏区域

| 区域 | 默认 | 何时隐藏 |
|---|---|---|
| 标题 | 可选 | 外层已有明确上下文时隐藏 |

## 4. 组合建议

- 页面生成时优先调整 props，不要复制 Block 内部 markup。

## 5. 旧 MiniDevUI 映射

旧 `{legacy-id}` 映射到当前 `{BlockName}`。
````

如果该 Block 没有旧 MiniDevUI 映射，也要写明：

```text
暂无旧 MiniDevUI 映射。
```

### 4.3.3 Markdown Fields As Build Constraints

block markdown 中的字段必须反向约束 TSX：

| Markdown 内容 | TSX / Story 要求 |
|---|---|
| 适用场景 | 决定 `pageType`、`tags` 和是否应该进入 `blocks.json` |
| 源码支撑 | 路径必须真实存在，story 路径必须可打开 |
| 核心 props | TSX props 类型必须逐项对应，不允许文档写了但源码没有 |
| 可选 / 可隐藏区域 | TSX 必须提供显隐方式，不能只靠空字符串占位 |
| 组合建议 | Block 必须优先 import 已有 Component，不复制内部 DOM |
| 旧 MiniDevUI 映射 | 用于 legacy canonical map、页面迁移和旧 spec 对齐 |

反过来，TSX 新增或删除 props、slot、区域时，必须同步更新 block markdown。否则页面生成会读到过期契约。

### 4.3.4 Reuse Existing Block Markdown First

构建新 Block 前必须先扫现有 block markdown：

```bash
rg -n "适用场景|核心 props|旧 MiniDevUI 映射|ToolbarBlock|SidebarNav" .resources/devui/block
```

判断规则：

| 命中情况 | 处理 |
|---|---|
| 适用场景相同，props 只差文案或数据 | 复用已有 Block，新增 story 场景或更新 markdown |
| 结构相同但视觉密度不同 | 优先加 `variant` / `size`，不要新增 Block |
| 子区域多一两块可隐藏内容 | 优先加 optional slot 或 action config |
| 交互模型不同且无法用 props 表达 | 新增 Block，并在 markdown 写清楚边界 |
| 只是旧 MiniDevUI 名称不同 | 更新映射，不新增实现 |

当前本地参考：

| Block | markdown 重点 |
|---|---|
| `ToolbarBlock` | 操作条、筛选、页签、视图切换，强调用 props 隐藏区域 |
| `SidebarNav` | 一级侧边导航，强调 `items`、`selectedKeys`、`openKeys` |
| `TitleTabsHeader` | 标题 + 页内 Tab，Tab 不存在时不要使用 |
| `Subheader` | 面包屑 + 轻量 Tab，两个区域都为空时不要生成 |
| `AccordionNav` | 设置页分组导航，展开状态必须可控或有默认值 |
| `TreeNav` | 层级资源选择，树数据和空状态必须有清晰入口 |

### 4.3.5 Block Markdown Sync Gate

Block 进入验收前必须检查：

| 检查项 | 通过标准 |
|---|---|
| markdown 存在 | `.resources/devui/block/{block-id}.md` 已创建 |
| 源码支撑准确 | markdown 中列出的 TSX / story 路径真实存在 |
| props 同步 | markdown 核心 props 和 TSX props 类型一致 |
| 显隐同步 | markdown 的可隐藏区域都有 props、slot 或 data model 支撑 |
| 依赖同步 | markdown 组合建议和 `blocks.json.dependencies` 一致 |
| 映射同步 | 有 legacy 来源时写入旧 MiniDevUI 映射 |

如果这些检查没有通过，不能只更新 `blocks.json`；要先修正 block markdown 或源码。

---

## 5. Component TSX Architecture

DevUI 组件推荐结构：

```text
devui-playground/src/components/ui/{component-id}/
├── {component-id}.tsx
├── {component-id}.css
├── {component-id}.stories.tsx
└── index.ts
```

### 5.1 TSX 职责

TSX 是组件真值，必须承载：

- 组件结构。
- Props 类型。
- 变体和状态。
- 必要交互。
- 与已有组件的组合关系。

实现要求：

- 优先复用已有组件，例如 `Button`、`Input`、`Select`、`Separator`、`Tag`。
- Props 必须表达组件语义，而不是表达 Figma 图层。
- 内容优先走 `children`。
- 变体优先用 `variant`、`size`、`state`、`orientation` 等稳定字段。
- 复杂插槽可以显式命名，例如 `prefix`、`suffix`、`actions`、`header`、`footer`。
- 不写静态 benchmark HTML。
- 不把 Block / Layout 的职责塞进 Component。

### 5.2 CSS 职责

CSS 只承载视觉样式：

- 优先使用项目 token。
- 保持 class 命名稳定。
- 处理尺寸、间距、颜色、字体、圆角、hover 等视觉规则。
- 不把业务状态藏进不可控 class。
- 不用硬编码颜色替代已有 token，除非设计稿没有对应 token 且已明确记录。

### 5.3 Story 职责

Storybook 是验收入口，不是组件真值。

默认写法：

- 保留一个 `Playground` story。
- 通过 Controls 切换关键 props。
- `args` 提供默认视觉验收状态。
- 只有复杂组件才增加少量必要场景 story。

不要为每个小变体都新建 story。以 `Tag` 为例，`md` / `lg`、是否显示图标、是否可关闭，都应该优先通过 Controls 调整，而不是拆成多个 story。

复杂组件可以增加 story，但必须满足至少一个条件：

- 组合结构明显不同。
- 设计师需要并排验收多个状态。
- Controls 无法自然表达该场景。
- 该场景是高风险回归路径。

---

## 6. Registration Contract

Component / Block 通过 Storybook 验收后，才允许注册到 Resource Layer。

### 6.1 Component Registration

基础 Component 或可被代码直接 import 的 TSX 组件注册到：

```text
.resources/devui/components.json
```

推荐字段：

```json
{
  "id": "tag",
  "name": "Tag",
  "path": "src/components/ui/tag",
  "export": "Tag",
  "stories": "src/components/ui/tag/tag.stories.tsx",
  "spec": ".resources/devui/component/tag.md"
}
```

字段说明：

| 字段 | 要求 | 说明 |
|---|---|---|
| `id` | 必填 | 稳定组件 ID，使用 kebab-case |
| `name` | 推荐 | 人类可读名称，通常是 export 名 |
| `path` | 必填 | 相对于 `devui-playground` 的源码目录 |
| `export` | 必填 | 组件导出名称 |
| `stories` | 推荐 | Storybook 文件路径 |
| `spec` | 可选 | 复杂组件使用说明 Markdown |

复杂组件建议补：

```text
.resources/devui/component/{component-id}.md
```

这份 Markdown 不替代 TSX 真值，只用于指导 Agent 正确调用组件。建议写：

- 使用场景。
- Props 语义。
- 可选区域。
- 可隐藏区域。
- 禁止用法。
- 组件和 Block 的边界。
- 常见组合示例。

### 6.2 Block Registration

Block 注册到：

```text
.resources/devui/blocks.json
```

推荐字段：

```json
{
  "id": "toolbar-block",
  "name": "ToolbarBlock",
  "pageType": "table-page",
  "description": "页面或区块操作条，可承载按钮、搜索、筛选、导出、刷新等操作。",
  "doc": "block/toolbar-block.md",
  "source": {
    "kind": "figma-mcp",
    "fileKey": "xxx",
    "nodeId": "3665:10320",
    "nodeName": "ToolbarBlock"
  },
  "files": [
    "src/components/ui/toolbar-block/toolbar-block.tsx",
    "src/components/ui/toolbar-block/toolbar-block.css"
  ],
  "stories": [
    "src/components/ui/toolbar-block/toolbar-block.stories.tsx"
  ],
  "dependencies": [
    "button",
    "input",
    "select",
    "tag"
  ]
}
```

字段说明：

| 字段 | 要求 | 说明 |
|---|---|---|
| `id` | 必填 | 稳定 Block ID，使用 kebab-case |
| `name` | 必填 | TSX export 名或人类可读名称 |
| `pageType` | 推荐 | 适配的页面类型，例如 `table-page`、`form-page`、`card-workbench-page` |
| `description` | 推荐 | 说明 Block 用途和组合边界 |
| `doc` | 推荐 | `.resources/devui/block/{block-id}.md` |
| `source` | 推荐 | Figma MCP 来源，至少保留 `kind`、`nodeId` |
| `files` | 必填 | 相对于 `devui-playground` 的真实源码文件 |
| `stories` | 推荐 | Storybook 文件路径 |
| `dependencies` | 必填 | 依赖的已注册 Component / Block ID |

Block 文档必须同步维护：

```text
.resources/devui/block/{block-id}.md
```

这份 Markdown 是本地 Block 构建 workflow，必须记录：

- 适用场景和不适用边界。
- 源码支撑路径。
- 核心 props / slots / data model。
- 可选 / 可隐藏区域和默认状态。
- 组合建议和依赖组件清单。
- Figma 来源、benchmark 结论或旧 MiniDevUI 映射。
- 页面生成时如何调用，哪些内容不能复制内部 markup。

`blocks.json.doc` 必须指向这份 markdown。新增 Block 时，不允许只注册 `blocks.json` 而没有对应 block markdown。

### 6.3 Dual Registration Rule

`components.json` 和 `blocks.json` 职责不同：

| 资源 | 职责 |
|---|---|
| `components.json` | 解决“代码如何 import 这个 TSX export” |
| `blocks.json` | 解决“页面生成如何发现、选择、组合这个业务区块” |

如果一个 Block 本身也是可被 import 的 React 组件，例如 `ToolbarBlock`，它可以同时出现在两个索引中：

- `components.json` 记录 `path`、`export`、`stories`，服务源码调用。
- `blocks.json` 记录 `pageType`、`dependencies`、`doc`、`source`、`files`，服务页面生成和设计溯源。

不要只注册 `components.json` 而漏掉 Block 语义；否则 Agent 只能把它当普通组件 import，无法知道它适合哪类页面、依赖哪些子组件、来自哪个 Figma 节点。

---

## 7. Quality Gate

最小机器验收：

```bash
cd devui-playground
npm run typecheck
npx eslint <changed-files>
npm run build-storybook
```

人工验收标准：

| 检查项 | 通过标准 |
|---|---|
| Figma 视觉接近 | 颜色、字号、间距、圆角、图标、布局接近设计稿 |
| Props 语义清楚 | Agent 能从 TSX 看懂如何调用组件 |
| Storybook 可预览 | story 能打开，Controls 能切换关键 props |
| 可被 Block 复用 | Block 能通过组件 API 组合，而不是复制静态 DOM |
| 边界正确 | 没有把 Block / Layout 逻辑误塞进 Component |
| Block markdown 同步 | `.resources/devui/block/{block-id}.md` 与 TSX props、可隐藏区域、源码路径一致 |
| Block 依赖正确 | `blocks.json` 的 `dependencies` 都能在资源层中找到 |
| 资源注册正确 | `components.json` / `blocks.json` 路径、export、stories 不断链 |

对照当前 DevUI 案例：

- `Tag` 的真值应在 `tag.tsx`，Story 只保留一个可调试入口。
- `ToolbarBlock` 是 Block，应组合 `Button`、`Input`、`Select`、`Separator`、`Tag` 等已有 TSX 组件。
- benchmark 只能说明“视觉理解是否正确”，不能注册为 Component，也不能替代源码。

---

## 8. Agent Checklist

每次接入新 Component / Block 前，Agent 按这个顺序执行：

```text
1. 确认输入节点和目标名称
2. 判断目标属于 Component / Block / Layout 哪一层
3. 如果是 Block，先读取 blocks.json 和 .resources/devui/block/*.md 判断复用/扩展/新增
4. 读取 MCP 结构、截图、变量和尺寸
5. 如果是新增 Block，先创建 block markdown 草案
6. 生成或检查 benchmark HTML
7. benchmark 通过后，再进入 TSX
8. 参考 shadcn 源码风格、项目已有组件和本地 block markdown 约束
9. 产出 TSX / CSS / index / story
10. 回写 block markdown 的源码支撑、核心 props、可隐藏区域、组合建议和旧映射
11. Story 默认只保留 Playground，复杂组件才增加必要场景
12. 运行 typecheck / targeted eslint / build-storybook
13. 通过验收后注册 components.json；如果是 Block，同步注册 blocks.json
14. Component 补 component usage markdown；Block 必须补 block workflow markdown
```

完成后，Agent 的汇报必须包含：

- 组件或 Block 源码路径。
- Storybook story 路径或访问 ID。
- 是否注册到 `.resources/devui/components.json`。
- 如果是 Block，是否注册到 `.resources/devui/blocks.json`。
- 是否补充 `.resources/devui/component/{component-id}.md` 或 `.resources/devui/block/{block-id}.md`。
- 运行过的校验命令及结果。
