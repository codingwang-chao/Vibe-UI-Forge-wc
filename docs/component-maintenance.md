# 组件维护指南

本文档用于维护 `wundt-shadcn` 仓库内两个 playground 的组件代码，覆盖新增、删除、修改与校验流程。

## 1. 先区分两种维护方式

组件维护按来源分为两种方式（两类都不是“原生未改动组件”）：

1. 基于 shadcn 组件体系添加并二次定制
2. 添加符合目标设计规范的组件（Harmony / DevUI 风格，自主实现）

当前仓库映射（仅说明现状，不代表方式绑定项目）：

| 项目 | 当前主要维护方式 |
|------|------------------|
| `devui-playground` | 添加符合目标规范的组件（项目特有组件维护） |
| `harmony-ui-playground` | 添加符合目标规范的组件（项目特有组件维护） |

注意：

- `devui-playground` 与 `harmony-ui-playground` 都是项目内维护组件，不是“原生未改动组件”。
- 两个 playground 都依赖 `src/styles/devui-tokens.css` 与 `src/index.css` 的 token 映射。

---

## 2. 方式一：基于 shadcn 体系添加并二次定制（通用）

### 2.1 新增组件

在目标项目目录执行：

```bash
npx shadcn@latest add <component> --dry-run
npx shadcn@latest add <component>
```

校验点：

1. 文件是否生成到项目定义的 `aliases.ui` 目录
2. 导入 alias 是否与项目 `components.json` 一致
3. 是否引入了项目不需要的样式或依赖
4. 是否补充/更新了对应 `*.stories.tsx`

### 2.2 删除组件

推荐步骤：

```bash
rg "<ui-alias>/<name>" src
rg "<name>" src src/stories
```

1. 先清理所有导入和使用
2. 删除组件文件/目录（实际路径以 `aliases.ui` 为准）
3. 删除对应 stories
4. 运行 `npm run build` 与 `npm run build-storybook`

### 2.3 修改组件

可直接改该项目 `aliases.ui` 指向目录下的文件。建议流程：

1. `npx shadcn@latest add <component> --dry-run` 看上游变更范围
2. `npx shadcn@latest add <component> --diff <file>` 对比单文件
3. 保留本地定制后手动合并

不要直接用 `--overwrite` 覆盖有本地改动的文件。

---

## 3. 方式二：添加符合目标规范的组件（通用）

### 3.1 目录与命名

常见结构：

```text
src/component/<ComponentName>/
├── <ComponentName>.tsx
├── <ComponentName>.css
├── <ComponentName>.stories.tsx
└── index.ts
```

说明：

- 目录通常用 PascalCase（如 `TaskCard`、`StatusBar`）
- 但 `registry.json` 的 `dependencies` 使用 kebab-case 名称（如 `task-card`、`status-bar`）
- 以现有组件风格为准，不强制所有组件都必须提供 default export

### 3.2 新增组件

1. 在 `src/component/<ComponentName>/` 新建 TSX/CSS/`index.ts`
2. 在 `src/component/index.ts` 增加导出
3. 需要对外给 block 使用时，同步更新 `registry.json` 里的 `dependencies`
4. 新增 stories 并跑构建校验

### 3.3 删除组件

```bash
rg "@/component/<ComponentName>" src
rg "<component-kebab-name>" registry.json src/blocks src/component/index.ts
```

1. 清理导入与使用点
2. 删除组件目录
3. 更新 `src/component/index.ts`
4. 更新 `registry.json` 中引用项
5. 运行 `npm run build` 与 `npm run build-storybook`

### 3.4 修改组件

修改后至少检查：

- TS 类型是否与 props 行为一致
- CSS 是否继续使用 token（避免硬编码主题色）
- stories 是否覆盖关键状态（默认/禁用/交互态）

---

## 4. Token 维护要点

两个 playground 都有独立 token 文件：

- `devui-playground/src/styles/devui-tokens.css`
- `harmony-ui-playground/src/styles/devui-tokens.css`

修改 token 时：

1. 评估是否两个 playground 都要改
2. 如需在 Tailwind 语义类中使用，补充 `src/index.css` 的 `@theme inline` 映射
3. 回归 Storybook（`Foundations/*` 与关键组件 stories）

---

## 5. 使用 `react-component-integrator` 辅助新增组件

可参考以下 skill 文档：

- `/Users/ruijunliu/Documents/projects/wundt_shadcn/.agent/skills/react-component-integrator/references/integration-surfaces.md`

它可以帮助你在“新增组件”时系统检查集成落点，避免只加了组件文件但漏改周边：

- 模块图谱：组件文件、导入方、barrel 导出（如 `index.ts`）
- 运行时接入：路由、菜单/导航、页面组合入口
- 样式与设计系统：CSS/Tailwind、token、图标与资产引用
- 数据与状态：query/store/context、埋点、权限和 feature flag
- 质量资产：stories、测试、fixtures/mocks
- 文档与开发体验：docs/usage 示例、变更说明
- 构建与依赖面：新增依赖、无用依赖、alias/vite/tsconfig 影响

建议把该文档当作“新增组件前后检查清单”使用。

---

## 6. 与 shadcn CLI / SKILL 的关系（重要）

### 6.1 方式一项目（基于 shadcn 体系）的一般规则

- `components.json` 需满足 shadcn CLI 的标准校验
- 可用命令：
  - `npx shadcn@latest info`
  - `npx shadcn@latest add ...`
  - `npx shadcn@latest add ... --diff ...`

### 6.2 本仓库现状（`devui-playground` / `harmony-ui-playground`）

- `devui-playground`：可正常使用上面的 shadcn CLI 命令
- `harmony-ui-playground`：当前 `components.json` 中

```json
"registries": {
  "@harmony": "./registry.json"
}
```

该写法用于本仓库工作流，但不满足 shadcn CLI 对 registry URL 模板（需含 `{name}`）的校验要求。  
因此当前直接执行 `npx shadcn@latest info` / `view @harmony/...` 会报配置错误。

结论：

- 两个项目都属于“项目特有组件维护”语境，验收应以源码一致性与构建结果为主
- `harmony-ui-playground` 不要依赖上述两个 CLI 命令做验收
- 改用文件一致性校验：`registry.json`、`src/blocks/*`、`src/component/index.ts`、构建命令

---

## 7. 维护完成后的最小验收清单

新增/删除/修改任一组件后至少执行：

```bash
# devui-playground 或 harmony-ui-playground 目录内
npm run build
npm run build-storybook
```

并人工确认：

- 组件导出入口无断链
- stories 可正常渲染
- token 变更未引发明显视觉回归
- 若涉及 block，`registry.json` 的 `dependencies` 与实际组件一致
