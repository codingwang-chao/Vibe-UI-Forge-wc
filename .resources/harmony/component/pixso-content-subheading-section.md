# Spec: pixso-content-subheading-section（Harmony · Content Subheading 状态组）

[Metadata]
- **实现目录**: `harmony-ui-playground/src/component/PixsoContentSubheadingSection/`
- **样式**: `PixsoContentSubheadingSection.css`，类名前缀 `pixso-content-subheading-section__*`
- **Storybook**: `src/component/PixsoContentSubheadingSection/PixsoContentSubheadingSection.stories.tsx`
- **Pixso 来源**: `https://pixso.cn/app/design/OPXcaxT2Rj_9QE_M8xckbw?item-id=3286:12399`
- **采用 MCP 工具**: `get_image`、`design_to_code`；`get_node_dsl` 失败（Pixso 插件报 `Cannot read properties of undefined (reading 'length')`）

## 1. 组成

| 导出 | 用途 |
|------|------|
| `PixsoContentSubheadingSection` | 还原 Pixso `Section_3286_12399`，包含顶部标题/操作与 3 个虚线状态组 |

## 2. 设计真值与量化

- 根节点：约 `744 × 522px`，白底。
- 顶部标题：`18px / 24px`，`font-weight: 700`，副标题 `14px / 18px`。
- 操作文案：`14px / 20px`，`font-weight: 700`，蓝色 `#0a59f7`。
- 左状态组：`206 × 376px`，`top: 145px`；含标题、副标题、`101 × 38px` 选择胶囊、底部标题/副标题。
- 中状态组：`209 × 365px`，`left: 302px`；含 `more`、上箭头、3 个刷新图标、右下操作。
- 右状态组：`138 × 184px`，`left: 605px`；刷新图标按 `1 / 2 / 3` 行排列。
- 状态组边框：`2px dashed #7d4cff`。

## 3. 取舍说明

- Pixso `get_node_dsl` 对该节点失败，完整 URL 形式也失败；已按技能降级流程使用 `get_image` 截图 + `design_to_code` 结构作为真值。
- `design_to_code` 的 CSS 临时资源已过期或批次不可读（localhost 返回 400），因此 CSS 由截图量化手写。
- 刷新图标在 codegen 中为字体私有区字符，组件改为等价 inline SVG，保持尺寸、颜色和位置一致，避免依赖不可用字体。
