# Icon 资源标准化迁移计划

> 本文定义 DevUI 与 Harmony 两套设计系统从默认 `lucide-react` 切换到各自本地设计资源的迁移方案。目标是让页面生成、组件实现、Storybook 验收都稳定引用当前设计系统自己的图标资源。

---

## 1. 输入与输出

### 1.1 输入资源

| 设计系统 | 输入资源 | 角色 | 当前结论 |
|---|---|---|---|
| DevUI | `/Users/renyuqing/Desktop/2026/Design-system-2AI/(skill)MiniDevUI/design_systems/minidevui/assets/icons/` | canonical SVG 图标库 | 已确认存在，约 429 个 SVG，按 family 分组 |
| DevUI | `/Users/renyuqing/Desktop/2026/Design-system-2AI/(skill)MiniDevUI/design_systems/minidevui/rules/icon-manifest.json` | 图标 manifest 真值 | 已包含 `id`、`style_family`、`render_mode`、`canonical_path`、`aliases` |
| DevUI | `/Users/renyuqing/Desktop/2026/Design-system-2AI/(skill)MiniDevUI/design_systems/minidevui/spec/0.role/icon_role.md` | 图标使用规范 | 已定义 manifest-first、family、render mode、禁用绝对路径 |
| Harmony | `/Users/renyuqing/Desktop/2026/Design-system-2AI/AI-MiniHarmony/spec/0.governance/hmsymbol-map.json` | HMSymbol 字典真值 | 已确认存在，版本 `2.1`，404 个图标 |
| Harmony | `/Users/renyuqing/Desktop/2026/Design-system-2AI/AI-MiniHarmony/spec/0.governance/icon_role.md` | 图标优先级规范 | 已定义 `HMSymbol > 本地 SVG > 复杂多色资源` |
| Harmony | `/Users/renyuqing/Desktop/2026/Design-system-2AI/AI-MiniHarmony/Page-Render/DrinkSettings/assets/HMSymbolVF_1.ttf` | HMSymbol 字体文件 | 可作为落库字体源 |
| Harmony | `/Users/renyuqing/Desktop/2026/Design-system-2AI/AI-MiniHarmony/assets/pixso-svg/` | HMSymbol 未命中时的本地 SVG fallback | 仅作为补充资源 |

> 说明：用户最初给出的 DevUI `asset` 路径在本机不存在；已确认实际规范资源目录为 `assets/icons/`。

### 1.2 输出产物

| 层级 | DevUI 输出 | Harmony 输出 |
|---|---|---|
| Resource Layer | `.resources/devui/icons.json` | `.resources/harmony/icons.json` |
| Resource Config | `.resources/config.json` 增加 `resources.devui.icons` | `.resources/config.json` 增加 `resources.harmony.icons` |
| Runtime Assets | `devui-playground/src/assets/icons/**` | `harmony-ui-playground/src/assets/hmsymbol/HMSymbolVF.ttf`，必要时 `src/assets/icons/**` |
| Runtime API | `devui-playground/src/components/ui/icon/` | `harmony-ui-playground/src/component/HMSymbolIcon/` |
| Stories | `DevuiIcon` story | `HMSymbolIcon` story |
| 规则文档 | 更新 shadcn icon rule / 资源接入说明 | 更新 shadcn icon rule / 资源接入说明 |

---

## 2. SDD：设计说明

### 2.1 总体原则

1. `lucide-react` 不再作为 DevUI / Harmony 稳定源码的默认图标来源。
2. `.resources/{ds}/icons.json` 是 Agent 页面生成的图标 catalog 入口。
3. 运行时代码只引用 playground 内部资源，禁止引用本机绝对路径或外部临时服务。
4. `src/render/**` 是历史/实验产物，本轮不迁移，也不作为新生成参考。
5. `components.json.iconLibrary: "lucide"` 保留为 shadcn CLI 兼容字段，不作为本仓库设计系统图标选择依据。

### 2.2 DevUI 图标架构

DevUI 使用 canonical SVG + manifest 驱动，不做全量 “SVG 转 TSX” 的一刀切迁移。

#### 资源映射

- 输入 manifest：`(skill)MiniDevUI/design_systems/minidevui/rules/icon-manifest.json`
- 输入资产：`(skill)MiniDevUI/design_systems/minidevui/assets/icons/**`
- 仓内落点：`devui-playground/src/assets/icons/**`
- 资源索引：`.resources/devui/icons.json`

#### Runtime API

```tsx
<DevuiIcon name="mono-action/search" />
<DevuiIcon name="search" />
<DevuiIcon name="nav-sidebar/dashboard" />
```

建议 props：

```ts
type DevuiIconProps = {
  name: DevuiIconName | string
  size?: number | string
  className?: string
  title?: string
  decorative?: boolean
}
```

#### 渲染规则

| `render_mode` | 适用 family | Runtime 行为 |
|---|---|---|
| `mask` | `mono-action` | 用 CSS mask 渲染，`background-color: currentColor`，支持状态色继承 |
| `img` | `nav-top` / `service` / `status` / `priority` / `identity/*` | 用 `<img>` 保留多色和品牌视觉 |
| `background-image` | `nav-sidebar` | 可由 wrapper 用 `<span>` 背景图或 `<img>` 渲染，必须遵循 manifest |

#### 兼容包装

现有 `ButtonIcon`、`InputIcon`、select/dialog/headinfo 内部小图标改为调用 `DevuiIcon`，但保留原组件 API，避免一次性破坏已有组件调用。

### 2.3 Harmony 图标架构

Harmony 使用 HMSymbol 字体图标为第一优先级，本地 SVG 仅作为 fallback。

#### 资源映射

- 输入字典：`AI-MiniHarmony/spec/0.governance/hmsymbol-map.json`
- 输入规则：`AI-MiniHarmony/spec/0.governance/icon_role.md`
- 输入字体：`AI-MiniHarmony/Page-Render/DrinkSettings/assets/HMSymbolVF_1.ttf`
- 仓内字体落点：`harmony-ui-playground/src/assets/hmsymbol/HMSymbolVF.ttf`
- 资源索引：`.resources/harmony/icons.json`

#### Runtime API

```tsx
<HMSymbolIcon name="arrow_left" />
<HMSymbolIcon name="chevron_right" />
<HMSymbolIcon name="search" />
```

建议 props：

```ts
type HMSymbolIconProps = {
  name: HMSymbolIconName | string
  size?: number | string
  className?: string
  title?: string
  decorative?: boolean
}
```

#### 渲染规则

1. `name` 优先匹配 `hmsymbol-map.json.icons[].name`。
2. 语义检索时可参考 `name_cn`、`categories`、`module`。
3. 线性页面默认过滤 `_fill`、`filled`、`_solid`，除非设计明确要求面性图标。
4. 字体通过本地 `@font-face` 加载：

```css
@font-face {
  font-family: "HMSymbol";
  src: url("../../assets/hmsymbol/HMSymbolVF.ttf") format("truetype");
  font-style: normal;
  font-weight: 400;
}
```

5. `HMSymbol` 未命中时才允许回退到 `AI-MiniHarmony/assets/pixso-svg/**` 的本地 SVG，并在 `.resources/harmony/icons.json` 记录 fallback 来源。

### 2.4 资源层 schema 建议

DevUI `.resources/devui/icons.json`：

```json
{
  "version": "v1.0.5",
  "source": {
    "manifest": "(skill)MiniDevUI/design_systems/minidevui/rules/icon-manifest.json",
    "assets": "(skill)MiniDevUI/design_systems/minidevui/assets/icons"
  },
  "runtime": {
    "assetRoot": "devui-playground/src/assets/icons",
    "component": "devui-playground/src/components/ui/icon"
  },
  "icons": {
    "mono-action/search": {
      "aliases": ["search"],
      "styleFamily": "mono-action",
      "renderMode": "mask",
      "asset": "mono-action/search.svg"
    }
  }
}
```

Harmony `.resources/harmony/icons.json`：

```json
{
  "version": "2.1",
  "source": {
    "map": "AI-MiniHarmony/spec/0.governance/hmsymbol-map.json",
    "font": "AI-MiniHarmony/Page-Render/DrinkSettings/assets/HMSymbolVF_1.ttf"
  },
  "runtime": {
    "font": "harmony-ui-playground/src/assets/hmsymbol/HMSymbolVF.ttf",
    "component": "harmony-ui-playground/src/component/HMSymbolIcon"
  },
  "icons": {
    "arrow_left": {
      "unicode": "F00CA",
      "char": "󰃊",
      "categories": ["箭头"]
    }
  }
}
```

### 2.5 迁移范围

纳入本轮迁移：

- `devui-playground/src/App.tsx`
- `devui-playground/src/components/ui/**`
- `devui-playground/src/stories/**`
- `harmony-ui-playground/src/App.tsx`
- `harmony-ui-playground/src/App.stories.tsx`
- `harmony-ui-playground/src/blocks/*.tsx`
- `harmony-ui-playground/src/component/**`
- 对应 Storybook stories

排除本轮迁移：

- `devui-playground/src/render/**`（若存在）
- `harmony-ui-playground/src/render/**`
- `HistoryRender/**`
- `Page-Render/**`
- 原始资源仓自身

---

## 3. TDD：验收标准与测试策略

### 3.1 资源验收

| 编号 | 验收项 | 通过标准 |
|---|---|---|
| A-01 | DevUI 资源落库 | `devui-playground/src/assets/icons/**` 存在，目录结构与 canonical family 保持一致 |
| A-02 | DevUI manifest | `.resources/devui/icons.json` 能回溯到原始 `icon-manifest.json`，包含 `renderMode` 与 `aliases` |
| A-03 | Harmony 字体落库 | `harmony-ui-playground/src/assets/hmsymbol/HMSymbolVF.ttf` 存在 |
| A-04 | Harmony 字典 | `.resources/harmony/icons.json` 能回溯到 `hmsymbol-map.json`，保留 `version`、`unicode`、`char` |
| A-05 | config 指针 | `.resources/config.json` 中 `devui.icons` 与 `harmony.icons` 指向正确 |

### 3.2 代码验收

| 编号 | 验收项 | 通过标准 |
|---|---|---|
| C-01 | DevUI runtime API | `DevuiIcon` 可按 `name` 和 alias 渲染 mask/img 图标 |
| C-02 | Harmony runtime API | `HMSymbolIcon` 可按 `name` 渲染 glyph，并继承 `currentColor` |
| C-03 | 兼容包装 | `ButtonIcon`、`InputIcon` 等旧入口继续可用 |
| C-04 | lucide 移除 | 稳定源码中不再直接 `import ... from "lucide-react"` |
| C-05 | 无绝对路径 | TSX/CSS/JSON 中不出现 `/Users/...` 作为运行时资源路径 |

推荐检查命令：

```bash
rg "lucide-react" devui-playground/src harmony-ui-playground/src -g '!src/render/**'
rg "/Users/renyuqing" devui-playground/src harmony-ui-playground/src .resources
```

### 3.3 构建验收

| 编号 | 命令 | 通过标准 |
|---|---|---|
| B-01 | `cd devui-playground && npm run build` | 构建成功 |
| B-02 | `cd devui-playground && npm run build-storybook` | Storybook 构建成功 |
| B-03 | `cd harmony-ui-playground && npm run build` | 构建成功 |
| B-04 | `cd harmony-ui-playground && npm run build-storybook` | Storybook 构建成功 |

### 3.4 视觉验收

| 编号 | 场景 | 通过标准 |
|---|---|---|
| V-01 | DevUI `mono-action/search` | 图标颜色随父级 `color` 改变 |
| V-02 | DevUI `nav-sidebar/dashboard` | 多色 SVG 保持原始视觉，不被 mask 单色化 |
| V-03 | DevUI `status/成功` | 状态图标保持原始颜色与尺寸 |
| V-04 | Harmony `arrow_left` | HMSymbol 字体正确加载，不显示方块/乱码 |
| V-05 | Harmony SettingsPage | 设置页图标不再来自 lucide，尺寸与对齐不回退 |

---

## 4. 测试案例

### 4.1 DevUI 单元/组件测试案例

| Case | 输入 | 操作 | 预期 |
|---|---|---|---|
| D-01 | `name="mono-action/search"` | 渲染 `<DevuiIcon />` | 输出 mask 模式节点，`background-color: currentColor` |
| D-02 | `name="search"` | 通过 alias 渲染 | 命中 `mono-action/search` |
| D-03 | `name="nav-sidebar/dashboard"` | 渲染侧边导航图标 | 输出 img/background-image 模式，不丢失渐变色 |
| D-04 | `name="unknown"` | 渲染不存在图标 | 返回 `null` 或受控 fallback，不抛运行时异常 |
| D-05 | `size={20}` | 渲染任意图标 | 图标盒子为 `20px * 20px` |
| D-06 | `decorative={false}` + `title` | 渲染可访问图标 | 输出可访问 label，不设置 `aria-hidden=true` |

### 4.2 Harmony 单元/组件测试案例

| Case | 输入 | 操作 | 预期 |
|---|---|---|---|
| H-01 | `name="arrow_left"` | 渲染 `<HMSymbolIcon />` | 输出 `hmsymbol-map.json` 对应 `char` |
| H-02 | `name` 命中 `_fill` 与线性候选 | 执行语义选择 | 默认选择线性图标 |
| H-03 | `name="not_found"` | 渲染不存在图标 | 返回受控 fallback 或 `null`，记录缺口 |
| H-04 | `size={24}` | 渲染 HMSymbol | 字号/盒子为 24px，颜色继承 `currentColor` |
| H-05 | 字体未加载模拟 | 渲染 story | Storybook 能通过本地字体路径加载，不依赖外网 |

### 4.3 集成测试案例

| Case | 范围 | 操作 | 预期 |
|---|---|---|---|
| I-01 | DevUI `ButtonIcon` | 用旧 API `<ButtonIcon name="search" />` | 内部由 `DevuiIcon` 渲染，视觉不变 |
| I-02 | DevUI `InputIcon` | 输入框 prefix/suffix 图标 | 使用 `DevuiIcon`，hover/disabled 色正常 |
| I-03 | DevUI TopNav | 替换 lucide 顶部导航图标 | 选中/未选中视觉与 nav-top 资源一致 |
| I-04 | DevUI ToolchainSidebar | 替换侧边导航图标 | 使用 `nav-sidebar` family，不回退 mono-action |
| I-05 | Harmony TitleBar | 默认返回/更多图标 | 使用 `HMSymbolIcon`，不再内嵌 data URI SVG |
| I-06 | Harmony SettingsPage | 替换 lucide 设置图标 | 使用 HMSymbol 优先策略，未命中才 fallback |

### 4.4 回归测试案例

| Case | 命令/检查 | 预期 |
|---|---|---|
| R-01 | `rg "lucide-react" devui-playground/src harmony-ui-playground/src -g '!src/render/**'` | 无稳定源码命中 |
| R-02 | `rg "/Users/" devui-playground/src harmony-ui-playground/src .resources` | 不存在运行时绝对路径 |
| R-03 | `node scripts/validate_design_system_resources.mjs` | 当前 active resource 校验通过 |
| R-04 | DevUI build + Storybook build | 均通过 |
| R-05 | Harmony build + Storybook build | 均通过 |

---

## 5. 实施顺序

1. 复制 DevUI canonical icons 到 `devui-playground/src/assets/icons/**`。
2. 复制 Harmony HMSymbol 字体到 `harmony-ui-playground/src/assets/hmsymbol/HMSymbolVF.ttf`。
3. 新增 `.resources/devui/icons.json` 与 `.resources/harmony/icons.json`。
4. 更新 `.resources/config.json`，为两套 design system 增加 `icons` 指针。
5. 新增 `DevuiIcon` 与 stories。
6. 新增 `HMSymbolIcon` 与 stories。
7. 迁移 DevUI 兼容包装：`ButtonIcon`、`InputIcon`、select/dialog/headinfo。
8. 迁移 DevUI 稳定页面与 stories 中的 lucide 引用。
9. 迁移 Harmony `App`、`App.stories`、`blocks/*.tsx`、`component/SettingsPage`、`TitleBar`、`IconButton`。
10. 更新 `.agent/skills/shadcn/rules/icons.md`：资源 catalog 优先于 `components.json.iconLibrary`。
11. 运行 TDD 验收命令并修复失败项。

---

## 6. 变更边界与风险

### 6.1 不做

- 不删除 `lucide-react` npm 依赖。
- 不迁移 `src/render/**` 历史生成物。
- 不改写原始资源仓。
- 不引入外部字体 CDN 或在线图标服务。

### 6.2 风险与处理

| 风险 | 影响 | 处理 |
|---|---|---|
| DevUI SVG 内部写死 fill 色 | `mono-action` 无法继承状态色 | 用 mask 模式渲染单色 action 图标 |
| 多色图标被错误 mask | 品牌/服务图标失真 | 严格按 manifest `render_mode` 渲染 |
| HMSymbol 字体路径错误 | 图标显示方块/乱码 | 字体落库到 playground，并由组件 CSS 固定引用 |
| HMSymbol 语义命中不准 | 图标语义偏差 | 先精确匹配 `name`，再用 `name_cn/categories/module` 辅助 |
| 旧组件 API 被破坏 | 页面和 stories 大面积报错 | 保留兼容包装，内部替换实现 |

---

## 7. 完成定义

本迁移完成必须同时满足：

1. 两套设计系统都有独立 `.resources/{ds}/icons.json`。
2. 两套 playground 都有本地图标 runtime API 和 Storybook 示例。
3. 稳定源码不再直接 import `lucide-react`。
4. DevUI 图标按 manifest `render_mode` 渲染。
5. Harmony 图标优先使用 HMSymbol 字典和本地字体。
6. 所有测试案例中的资源、代码、构建、视觉验收项均通过或有明确记录的暂缓项。
