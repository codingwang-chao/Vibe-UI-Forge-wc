# Spec: slider（Harmony）

[Metadata]
- **实现目录**: `harmony-ui-playground/src/component/Slider/`
- **入口导出**: `SliderBase` / `SliderWithIcons` / `SliderWithScale`（见 `index.ts`）
- **Storybook**: `src/component/Slider/Slider.stories.tsx`

## 1. 组件拆分

| 组件 | 用途 |
|------|------|
| `SliderBase` | 单条轨道 + 原生 `range` 输入，受控 `modelValue` |
| `SliderWithIcons` | 左右插槽（如亮度小/大图标）+ 中间 `SliderBase` |
| `SliderWithScale` | 底部刻度文案（默认 0~100 步进）+ 可选当前值展示 |

## 2. 受控写法（与 Switch 对齐）

- `modelValue`: 当前数值
- `onUpdateModelValue(value: number)`: 变更回调
- `min` / `max` / `step` / `disabled`
- 主题色：`activeColor`（默认 `#0a59f7`）、`inactiveColor`、`thumbColor`

## 3. 交互与无障碍

- 底层为 `<input type="range">`，键盘支持左右/上下步进。
- 禁用态：`disabled` + 根节点 `hmy-slider--disabled` 降低透明度。

## 4. 样式约定

- 样式文件：`Slider.css`，类名前缀 `hmy-slider-*`。
- WebKit 与 Firefox（`::-moz-range-*`）均已处理轨道与拇指。

## 5. 生成时选用建议

- 仅需要滑条：用 `SliderBase`。
- 设计稿左右有图标：用 `SliderWithIcons`。
- 设计稿底部有 0/20/…/100 等刻度或百分比气泡：用 `SliderWithScale`（可传 `ticks`、`showValue`、`valueFormatter`）。
