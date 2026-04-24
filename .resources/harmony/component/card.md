# Spec: card（Harmony）

[Metadata]
- **实现目录**: `harmony-ui-playground/src/component/Card/`
- **样式**: `Card.css`，类名前缀 `my-card__*`
- **Storybook**: `src/component/Card/Card.stories.tsx`

## 1. 组成

| 导出 | 用途 |
|------|------|
| `Card` | 外层容器：白底、`border-radius: 20px`（与设置页 `List` 圆角一致） |
| `CardHeader` | 顶区：标题 + 描述 |
| `CardTitle` | 主标题（`h3`） |
| `CardDescription` | 副文案 |
| `CardContent` | 主内容区 |
| `CardFooter` | 底栏操作区，默认右对齐、横向 `gap` |

## 2. 用法

- 与 `List` 同属「圆角白卡片」语义，用于非列表型信息块。
- 需要操作按钮时放在 `CardFooter`；次要 + 主按钮可参考 Story 中 `Button`：`type="default"` + `plain` 与 `type="primary"`，`size="small"`。

## 3. Token

- 标题：`rgba(0, 0, 0, 0.9)`，18px / 600
- 描述：`rgba(0, 0, 0, 0.6)`，14px / 400
- 表面：`#ffffff`
