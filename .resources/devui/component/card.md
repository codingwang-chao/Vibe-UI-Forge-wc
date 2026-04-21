# Card Component Usage

`Card` 是工作台、门户和概览页中的基础卡片容器。它属于 Component，不作为第一轮 Block 注册。

## Source

```text
devui-playground/src/components/ui/card/card.tsx
devui-playground/src/components/ui/card/card.stories.tsx
```

## Props

| Prop | 说明 |
|---|---|
| `avatar` | 头像或图标区域 |
| `title` | 卡片标题 |
| `subtitle` | 副标题 |
| `src` | 图片 |
| `content` | 内容区 |
| `actions` | 操作区 |
| `align` | 操作区对齐 |
| `shadow` | 阴影策略 |

## Optional Areas

| 区域 | 默认 | 何时隐藏 |
|---|---|---|
| 头像/图标 | 可选 | 文本卡片或图片卡片时隐藏 |
| 副标题 | 可选 | 标题已经足够说明时隐藏 |
| 图片 | 可选 | 非媒体卡片时隐藏 |
| 内容区 | 可选 | 入口型短卡片可隐藏 |
| 操作区 | 可选 | 卡片整体可点击或无动作时隐藏 |

## Generation Notes

- 工作台页面可以用多张 `Card` 组合成 `cardGrid`。
- 如果需要公告卡、活动卡、帮助文档卡，当前先用 `Card` 组合承载。
- 旧 MiniDevUI 的 `announcementCard`、`activityCard`、`helpDocCard`、`menuCard` 尚未作为独立 React 源码迁入。
