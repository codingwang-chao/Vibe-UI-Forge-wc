# Layout: mobile-sheet

> 来源：`history/spec/1.layout/layout.md` Section 14.3 - mobile-sheet-overlay

## hit_rules

命中 `mobile-sheet` 时，页面应同时满足以下特征：
- 以 `size` 壳层为底，叠加 `bindsheet` 的半模态页面
- 背景内容可见但不可操作，主交互集中在底部 sheet
- 典型场景：服药提醒弹层、设置二级详情半模态、确认/编辑半模态
- Sheet 以底部锚定方式覆盖画布

## exclusion_rules

出现以下任一特征时，不应命中该布局：
- 页面为主表单录入页（应命中 mobile-settings）
- 全屏模态对话框覆盖整个画布
- 页面无底部 sheet 结构
- 仅作为普通页面滚动内容，而非浮层交互

## reference_blocks

- `medication`

## layout_skeleton

```html
<main class="layout-mobile-sheet-overlay">
  <div class="layout-size-root">
    <section class="layout-status-bar"></section>
    <section class="layout-page-content"></section>
    <footer class="layout-home-indicator"></footer>

    <section class="layout-bindsheet-overlay">
      <div class="layout-bindsheet-mask"></div>
      <div class="layout-bindsheet-sheet layout-bindsheet-sheet-{{state}}">
        <div class="layout-bindsheet-handle"></div>
        <header class="layout-bindsheet-header"></header>
        <div class="layout-bindsheet-content"></div>
      </div>
    </section>
  </div>
</main>
```

### Shell Rules

| 区域 | 约束 |
|------|------|
| size-root | `360x792`，`position: relative` |
| bindsheet-overlay | `position: absolute; inset: 0; width: 360px; height: 792px` |
| bindsheet-mask | 独立节点，覆盖 `360x792` 全画布，禁止挂在 sheet 本体 |
| bindsheet-sheet | 底部锚定（`bottom:0`），禁止作为普通文档流节点 |
| bindsheet-content | 滚动所有权在 content 区，不在根画布 |

### Height States

| State | 高度 | 说明 |
|-------|------|------|
| expanded | ~748px | 全展开 |
| half | ~50% 画布 | 半屏 |
| collapsed | 最小可见区 | 仅 header + 最小内容 |

## needed_components

- `status-bar`
- `float-layer`
- `service-card`
- `service-card-item`
- `service-card-status`

## composition_mapping

| Layout Block | Component | Variant / Composition |
|---|---|---|
| `status bar` | `status-bar` | harmony-public + theme(light/dark) |
| `page content` | 背景页面 | 不可交互，仅视觉存在 |
| `sheet overlay` | `float-layer` | 遮罩层 |
| `sheet sheet` | 卡片组件组合 | 底部弹层容器 |
| `sheet header` | `service-card-item` | 标题 + 操作按钮 |
| `sheet content` | `service-card` + `service-card-item` + `service-card-status` | 服务卡片列表 |

## generation_constraints

- 禁止将 `bindsheet` 挂在 `.harmony-size-content` 等流式内容槽中
- 遮罩为独立 `mask` 节点且覆盖 `360x792`，不与 sheet 合并
- 高度切换只允许改变 sheet 高度与内部滚动区高度；遮罩尺寸与根锚点不变
- 从下到上层级：页面内容层 -> `bindsheet-mask` -> `bindsheet-sheet`
- `bindsheet-sheet` 必须高于 mask，且低于全局 toast/dialog

## semantic_tokens

| Semantic Part | Token |
|---|---|
| Mask background | `overlay_mask` / rgba(0,0,0,0.5) |
| Sheet surface | `comp_background_primary` |
| Handle | `icon_secondary` |
| Sheet header | `font_primary` |
| Card content | `font_secondary` |

## validation_notes

- Sheet 以 root overlay 绝对定位挂载（`inset:0`）
- 至少具备 expanded/half/collapsed 三档高度语义
- Build 通过且 Storybook 组件故事存在
- 与 mobile-settings 的核心区别：是否存在浮层遮罩和底部 sheet 锚定结构
