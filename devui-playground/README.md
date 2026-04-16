# ui-playground

Vite + React + shadcn/ui playground.  
这个项目同时承载页面开发与组件库预览，组件预览由 Storybook 统一管理。

## Storybook 相关目录

- `.storybook/main.ts`: Storybook 主配置（stories 匹配规则、Vite alias、Tailwind 插件）
- `.storybook/preview.ts`: 全局预览配置（全局样式、layout、controls）
- `src/components/ui/**/*.stories.tsx`: 组件级预览文件（跟组件同目录维护）
- `src/stories/foundations/*.stories.tsx`: 样式基础能力预览（自动解析 `src/styles/devui-tokens.css`，展示颜色、字体、间距、圆角、阴影、动效、z-index）
- `src/stories/components/showcase.stories.tsx`: 组件总览预览页（用于快速 smoke-check）

## 运行与构建

安装依赖：

```bash
npm install
```

启动应用页面（Vite）：

```bash
npm run dev
```

启动组件预览（Storybook，默认端口 6006）：

```bash
npm run storybook
```

构建 Storybook 静态产物（用于 CI/部署/视觉回归）：

```bash
npm run build-storybook
```

## 如何预览组件

1. 启动 `npm run storybook`
2. 打开 `http://localhost:6006`
3. 在左侧导航查看：
   - `Components/*`：组件预览与交互控制
   - `Foundations/*`：设计 token 与基础样式预览
   - `Components/Showcase`：组件总览页（快速看全局）

当前已覆盖的组件 stories：

- Avatar
- Badge
- Button
- Card
- Dialog
- Input
- Select
- Separator
- Switch
- Table

## 新增组件时的建议流程

1. 先实现组件代码（`src/components/ui/<component>/...`）
2. 同步新增 `<component>.stories.tsx`，至少覆盖：
   - 默认态
   - 禁用/错误态（如适用）
   - 关键变体
3. 本地跑 `npm run storybook` 手动验收
4. 提交前跑 `npm run build-storybook`，确保预览可构建

## 组件引用示例

```tsx
import { Button } from "@/components/ui/button"
```
