# Spec: scene-mode-card（Harmony · 情景模式卡片）

[Metadata]
- **实现目录**: `harmony-ui-playground/src/component/SceneModeCard/`
- **样式**: `SceneModeCard.css`，类名前缀 `my-scene-mode-card__*`
- **Storybook**: `src/component/SceneModeCard/SceneModeCard.stories.tsx`
- **Pixso 来源**: `https://pixso.cn/app/design/OPXcaxT2Rj_9QE_M8xckbw?item-id=3368:205`
  - COMPONENT_SET `3368:205`「情景模式卡片」，含 3 个变体
- **采用 MCP 工具**: `get_node_dsl`（远程 `https://pixso.cn/api/mcp/mcp`）

## 1. 组成

| 导出 | 用途 |
|------|------|
| `SceneModeCard` | 控制中心情景模式卡片（毛玻璃白底、垂直 icon + 标题 + 副标题） |

## 2. 用法

- 用于「场景模式」「快捷开关」类卡片，例如「免打扰」「工作模式」「睡眠」。
- 默认非交互；传 `onClick` 后自动获得 `role="button"`、键盘 Enter/Space 支持与 `:focus-visible` 描边。
- `actionPill` 为可选浮动操作胶囊（按 Pixso 节点 `3368:133/345/720` 的位置 1:1 还原，会少量突出右边缘），不需要时不传即可。

## 3. 变体（Pixso COMPONENT_SET 三个 variant 收敛为 size）

| Pixso 变体 | size | 卡片尺寸 (px) | 圆角 | icon | 主标题 | 副标题 |
|------------|------|---------------|------|------|--------|--------|
| 中间大卡片 (`3368:152`) | `large` | 244 × 220 | 24 | 64 × 64 @ top:14 | 24 / 28，Regular | 14 / 16，Bold |
| 右侧小卡片 (`3368:206`) | `small` | 220 × 198（DSL 219.6） | 22（DSL 21.6） | 58 × 58 @ top:13 | 22 / 25 | 13 / 15 |
| 左侧小卡片 (`3368:704`) | `small` | 220 × 198 | 22 | 同上 | 同上 | 同上 |

> 「左/右侧小卡片」在 DSL 中除底层 mask 位置不同外，所有可见结构与样式完全一致；统一收敛为 `size="small"`。

## 4. 设计 Token（来自 `localStyleMap`）

- 表面：`rgba(255, 255, 255, 0.8)`（控制中心毛玻璃，与 `comp_background_*` 序列一致）
- 主标题：`rgba(0, 0, 0, 0.898)` —— `Light/font_primary` (`602:9446`)
- 副标题：`rgba(0, 0, 0, 0.4)` —— `Light/font_tertiary` (`602:9448`)
- 字体族：`HarmonyOS Sans` / `HarmonyOS Sans SC`（缺字体时回落到系统中文等宽字体）
- 字阶来源：
  - 主标题继承 `Font/Title_M/Bold` (`602:9699`，24px Bold)，DSL 显式覆盖 `fontWeight=400`
  - 副标题继承 `Font/Body_M/Regular` (`602:9661`，14px Regular)，DSL 显式覆盖 `fontWeight=700`

## 5. 布局测量（large，详见 DSL 节点 `3368:120`）

| 元素 | 节点 | left/top | size |
|------|------|----------|------|
| 背景矩形 (radius=24) | `3368:121` | 0, 0 | 244 × 220 |
| Icon (svg 2) | `3368:122` | 90, 14 | 64 × 64（horizontally centered: (244−64)/2 = 90 ✓） |
| 主标题 `免打扰` | `3368:131` | 86, 90 | 72 × 28（fontSize 24，3 CJK 字符） |
| 副标题 `减少打扰保持专注` | `3368:132` | 66, 120 | 112 × 16（fontSize 14，8 CJK 字符） |
| 浮动操作胶囊 | `3368:133` | 180, 20 | 120 × 40 / r=20 |

间距（推导自上面坐标）：
- icon→title gap = `90 − (14 + 64) = 12`
- title→subtitle gap = `120 − (90 + 28) = 2`
- 浮动胶囊右溢出 large = `180 + 120 − 244 = 56px`，small = `162 + 108 − 220 = 50px`

## 6. 交互状态

| 状态 | 视觉 |
|------|------|
| `default` | 表面 `rgba(255,255,255,0.8)`；非交互态 |
| `hover` | 表面 `rgba(255,255,255,0.92)`（仅在 `role=button` 时） |
| `active`（pressed） | 表面 `rgba(255,255,255,0.7)` + `transform: scale(0.98)` |
| `focus`（focus-visible） | `outline: 2px solid rgba(25,137,250,0.45)` |
| `disabled` | `opacity: 0.4`，`cursor: not-allowed`，禁止 click |

## 7. Props

```ts
type SceneModeCardSize = "large" | "small"

interface SceneModeCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  size?: SceneModeCardSize          // default 'large'
  icon?: React.ReactNode            // 顶部图标插槽
  title?: React.ReactNode           // 主标题
  subtitle?: React.ReactNode        // 副标题
  actionPill?: React.ReactNode      // 可选浮动操作胶囊（按 Pixso 1:1）
  disabled?: boolean
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
}
```

## 8. 取舍说明

- **小卡片归一**：DSL 给出 219.6 × 198 / r=21.6（中间大卡片的 0.9× 缩放），实现按 1px 网格归一为 220 × 198 / r=22，不影响视觉。
- **字重方向**：DSL 中主标题 `fontWeight=400`、副标题 `fontWeight=700`（与「常见标题=粗、副标题=细」相反）。这是 DSL 的显式覆盖，本组件忠实还原；若产品规范确认需互换，可在 props/CSS 中切换。
- **未拉取 Pixso 导出 CSS**：远程 MCP 不提供 `get_image` / `design_to_code`，亦未走 `localhost:3667/code/*.css`。所有量化与样式均依据 `get_node_dsl` 与 `localStyleMap`，并参照仓库内 `Card`、`TaskCard` 的命名/结构惯例。
- **图标实现**：DSL 仅含图标的几何与色值（紫色圆 #542BD7 + 黑色 mask 内的月牙矢量），未含 SVG path 数据；Storybook 用等价 SVG 组件作为示例。生产使用建议传入项目内的真实图标资源。
