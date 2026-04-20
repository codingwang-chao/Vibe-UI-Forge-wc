# Layout: health-dashboard

> 来源：基于 `blocks.json` health-clover block 组成推导

## hit_rules

命中 `health-dashboard` 时，页面应同时满足以下特征：
- 画布为单屏移动端竖向比例
- 顶部存在稳定壳层：`status bar` 与 `titlebar` 连续排列
- 主体包含健康任务进度可视化（三叶草/周面板）
- 任务以卡片形式展示，每个任务可独立操作
- 页面重心在于进度展示而非设置控制
- 通常包含周期性回顾元素（如周面板）

## exclusion_rules

出现以下任一特征时，不应命中该布局：
- 页面以设置项列表为主（应命中 mobile-settings）
- 存在浮层/半模态交互（应命中 mobile-sheet）
- 顶部存在 tab 或分段切换
- 底部存在固定主 CTA 按钮行
- 页面主体为图表、报表或数据看板（非任务型）
- 需要绝对定位才能保持布局结构

## reference_blocks

- `health-clover`

## layout_skeleton

```html
<main class="layout-health-dashboard">
  <section class="layout-status-bar"></section>
  <header class="layout-titlebar"></header>
  <section class="layout-content">
    <section class="layout-clover-panel"></section>
    <section class="layout-task-list">
      <article class="layout-task-card"></article>
      <article class="layout-task-card"></article>
    </section>
    <div class="layout-action"></div>
  </section>
  <footer class="layout-home-indicator"></footer>
</main>
```

### Shell Rules

| 区域 | 高度 | 说明 |
|------|------|------|
| status bar | 36px | 贴顶，系统壳层 |
| titlebar | 56px | 紧接状态栏下方 |
| content | flex | 顶部三叶草面板 + 任务卡片列表 + 底部操作 |
| home indicator | 28px | 底部系统区域 |

### Content Width
- 主内容标准宽度：`328px`
- 水平居中，左右边距各 `16px`

## needed_components

- `status-bar`
- `title-bar`
- `clover-week-panel`
- `task-card`
- `button`

## composition_mapping

| Layout Block | Component | Variant / Composition |
|---|---|---|
| `status bar` | `status-bar` | harmony-public + theme(light/dark) |
| `titlebar` | `title-bar` | default，左侧返回、标题、右侧可选 |
| `clover panel` | `clover-week-panel` | 周视图展示，7格进度可视化 |
| `task card` | `task-card` | 任务项展示，支持操作按钮 |
| `action area` | `button` | primary/secondary 操作按钮 |

## generation_constraints

- 禁止把整页实现为连续的匿名 frame 容器
- 禁止使用绝对定位布局核心结构
- 三叶草面板必须使用 `clover-week-panel` 组件
- 任务卡片必须使用 `task-card` 组件
- 任务列表垂直排列，卡片间保持固定间距
- 页面滚动时 status bar / titlebar 固定

## semantic_tokens

| Semantic Part | Token |
|---|---|
| Page canvas | `background_secondary` |
| Card surface | `comp_background_primary` |
| Title / primary labels | `font_primary` |
| Secondary labels | `font_secondary` |
| Clover completed | `icon_positive` / green |
| Clover incomplete | `icon_disabled` / gray |
| Primary action | `interactive_primary` |

## validation_notes

- 三叶草面板展示 7 天进度，命中规则应与 reference block health-clover 一致
- 任务卡片数量应与实际业务数据匹配
- Build 通过且 Storybook 组件故事存在
- 与 mobile-settings 的核心区别：有无任务进度可视化、是否以设置行为主
