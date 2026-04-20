# Phase 0 Baseline Record

> 记录时间: 2026-04-20
> Baseline commit: `0900b94`

---

## 1. harmony-ui-playground/components.json

```json
{
  "name": "@harmony",
  "blocks": [
    {
      "name": "health-clover",
      "type": "registry:block",
      "description": "健康三叶草页面 - 展示每日健康任务进度",
      "registry": "@harmony",
      "files": [{ "path": "src/blocks/health-clover.tsx" }],
      "dependencies": ["status-bar", "title-bar", "clover-week-panel", "task-card", "button"]
    },
    {
      "name": "medication",
      "type": "registry:block",
      "description": "服药提醒页面 - 浮层卡片列表展示",
      "registry": "@harmony",
      "files": [{ "path": "src/blocks/medication.tsx" }],
      "dependencies": ["status-bar", "float-layer", "service-card", "service-card-status", "service-card-item"]
    },
    {
      "name": "water-settings",
      "type": "registry:block",
      "description": "喝水设置页面 - 设置项列表与开关控制",
      "registry": "@harmony",
      "files": [{ "path": "src/blocks/water-settings.tsx" }],
      "dependencies": ["status-bar", "title-bar", "list", "list-item", "switch"]
    }
  ]
}
```

---

## 2. harmony-ui-playground/registry.json

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "radix-nova",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/index.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "rtl": false,
  "aliases": {
    "components": "@/component",
    "utils": "@/lib/utils",
    "ui": "@/component",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "menuColor": "default",
  "menuAccent": "subtle",
  "registries": {
    "@harmony": "./registry.json"
  }
}
```

---

## 3. src/component/index.ts 导出

### 独立导出的组件
- Button, Checkbox, CloverWeekPanel, Divider, FloatLayer, List/ListItem
- Message, ServiceCard/ServiceCardItem/ServiceCardStatus, SubHeader, Switch, TaskCard, TitleBar

### PublicComponents 对象
- AiBottomBar, AppIcon, Avatar, CloverIcon, IconButton, StatusBar, WifiIcon

### 依赖关系（blocks.json 中的 components）

| Block | Components |
|-------|-----------|
| health-clover | status-bar, title-bar, clover-week-panel, task-card, button |
| medication | status-bar, float-layer, service-card, service-card-status, service-card-item |
| water-settings | status-bar, title-bar, list, list-item, switch |

---

## 4. 核心 Blocks 文件

| Block | TSX | Stories |
|-------|-----|---------|
| water-settings | src/blocks/water-settings.tsx | src/blocks/water-settings.stories.tsx |
| settings-page | src/blocks/settings-page.tsx | src/blocks/settings-page.stories.tsx |
| health-clover | src/blocks/health-clover.tsx | src/blocks/health-clover.stories.tsx |
| medication | src/blocks/medication.tsx | src/blocks/medication.stories.tsx |

---

## 5. Build 状态

### npm run build
```
✓ built in 1.09s
dist/index.html                       0.46 kB
dist/assets/index.css               49.78 kB
dist/assets/index.js               234.43 kB
```

### npm run build-storybook
```
Storybook build completed successfully
Output: storybook-static/
```

---

## 6. 备注

- `settings-page` 存在于 `registry.json` blocks 列表中，但 `components.json` 中未列出
- 所有 blocks 都有对应的 `.stories.tsx` 文件
- Build 和 Storybook build 均通过，无错误
