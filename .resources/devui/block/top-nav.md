# TopNav

> 企业控制台顶部全局导航，承载品牌、控制台入口、地域、全局产品菜单、通知和用户入口。

## 1. 源码支撑

```text
devui-playground/src/components/ui/top-nav/top-nav.tsx
devui-playground/src/components/ui/top-nav/top-nav.css
devui-playground/src/components/ui/top-nav/top-nav.stories.tsx
```

`TopNav` 是页面模板级 Block，不承载业务数据表格逻辑。完整页面模板应通过 props 调整品牌、地域、菜单项和用户入口。

## 2. Figma 来源

```text
fileKey: VBxWjuXDcxprCHcUFKNF81
nodeId: 10673:14822
nodeName: 顶部导航栏
```

## 3. 组合边界

| 区域 | 说明 |
|---|---|
| 品牌区 | 负责全局品牌和控制台入口 |
| 地域区 | 负责地域展示和下拉入口 |
| 产品菜单 | 通过 `items` 配置，适合首页、工作台、效能洞察等一级入口 |
| 右侧工具 | 通过 `rightActions` 插槽替换通知、刷新、更多等入口 |
| 用户入口 | 通过 `userInitials` 表达默认头像 |

## 4. 页面模板约束

- `TopNav` 应作为完整页面模板最外层 header。
- 不要把页面内容、左侧导航或表格操作塞进 `TopNav`。
- 页面生成时优先使用 `TopNav`，不要在 Page story 中复制顶部导航 DOM。
