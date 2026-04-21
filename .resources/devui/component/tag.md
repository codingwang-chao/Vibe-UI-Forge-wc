# Tag Component Usage

`Tag` 是标签组件，用于筛选条件、状态提示、轻量分类标记等场景。

## Source

```text
devui-playground/src/components/ui/tag/tag.tsx
devui-playground/src/components/ui/tag/tag.css
devui-playground/src/components/ui/tag/tag.stories.tsx
```

## Variants

| tagStyle | 说明 | 适用场景 |
|----------|------|----------|
| `fill` | 实心标签 | 强调状态、醒目提示 |
| `outline` | 线性/轮廓标签 | 次要状态、分类标记 |
| `regular` | 常规标签 | 辅助信息、灰色调 |

## Colors

| color | 说明 | 适用 tagStyle |
|-------|------|---------------|
| `green` | 成功/正向状态 | fill, outline, regular |
| `orange` | 警告/注意状态 | fill, outline |
| `red` | 危险/错误状态 | outline |
| `grey` | 默认/中性状态 | regular |

## Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `children` | `React.ReactNode` | `"标签"` | 标签内容 |
| `size` | `"md"` \| `"lg"` | `"md"` | 尺寸：md=20px高, lg=24px高 |
| `tagStyle` | `"fill"` \| `"outline"` \| `"regular"` | `"regular"` | 样式类型 |
| `color` | `"green"` \| `"orange"` \| `"red"` \| `"grey"` | `"grey"` | 颜色 |
| `icon` | `string` | `"setting"` | 前置图标名（仅 regular 类型） |
| `showIcon` | `boolean` | `true` | 是否显示前置图标（仅 regular 类型） |
| `closable` | `boolean` | `false` | 是否显示关闭按钮（仅 regular 类型） |
| `closeAriaLabel` | `string` | `"关闭标签"` | 关闭按钮无障碍文案 |
| `onClose` | `() => void` | - | 点击关闭按钮回调 |
| `className` | `string` | - | 自定义类名 |

## 使用示例

```tsx
// 实心标签 - 成功状态
<Tag size="md" tagStyle="fill" color="green">已完成</Tag>

// 线性标签 - 警告状态
<Tag size="lg" tagStyle="outline" color="orange">进行中</Tag>

// 常规标签 - 带图标和关闭
<Tag size="md" showIcon closable onClose={() => handleClose()}>
  设置标签
</Tag>

// 辅助标签 - 绿色背景
<Tag size="md" tagStyle="regular" color="green">推荐</Tag>
```

## 组件边界

- ✅ 可以：作为筛选条件、状态标签、分类标记
- ✅ 可以：组合到 List、Card、ToolbarBlock 等容器中
- ❌ 不可以：当作按钮或链接使用
- ❌ 不可以：承载长文本或复杂内容
- ❌ 不可以：放入 Block / Layout 职责

## Storybook

```text
Components/Tag
├── Playground          # 交互式 Controls
└── AllVariants        # 全变体展示（设计师验收用）
```

## Figma Node Mapping

| tagStyle | Figma Node ID |
|----------|---------------|
| fill | `40:116` |
| outline | `306:595` |
| regular (green) | `40:138` |
| regular (grey) | `131:279` |
