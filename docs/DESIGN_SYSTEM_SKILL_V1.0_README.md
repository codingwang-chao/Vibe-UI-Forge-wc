# Design System Skill v1.0

> 页面生成工作流：通过意图识别、布局推理、源码 grounding，生成符合本地设计系统的页面。

---

## 1. 核心工作流

```
用户输入 (prompt / Figma)
    ↓
Step 1: Route Matching
    读 .resources/config.json
    读 .resources/harmony/route-index.md
    → 输出: page_type
    ↓
Step 2: Layout Resolution
    读 .resources/harmony/layout/{page_type}.md
    → 输出: layout_skeleton + reference_blocks + needed_components
    ↓
Step 3: Source Grounding
    读 reference_blocks 指向的 src/blocks/*.tsx
    读 needed_components 指向的 src/component/* 源码和 stories
    → 输出: 参考源码
    ↓
Step 4: Page Generation
    生成页面 TSX/stories
    使用 @/component alias
    遵守 composition/styling 规则
    ↓
Step 5: Validation
    npm run build
    npm run build-storybook
```

---

## 2. 目录结构

```
Vibe-UI-Forge-main/
├── .resources/                          # 资源层（索引和规则）
│   ├── config.json                      # active 资源声明
│   └── harmony/                        # Harmony 设计系统
│       ├── route-index.md              # page_type 路由
│       ├── blocks.json                 # block 主索引
│       ├── components.json             # component 映射
│       ├── layout/                    # 布局 markdown
│       │   ├── index.md
│       │   ├── mobile-settings.md
│       │   ├── health-dashboard.md
│       │   └── mobile-sheet.md
│       └── component/                 # 组件规范（按需）
│           └── README.md
│
├── harmony-ui-playground/               # 真实来源
│   ├── src/
│   │   ├── component/                 # 组件源码
│   │   ├── blocks/                   # block 源码 + generated pages
│   │   └── styles/devui-tokens.css  # token
│   ├── components.json                # shadcn 配置（alias）
│   └── registry.json                  # legacy block 清单
│
├── scripts/
│   └── validate_design_system_resources.mjs  # 资源校验脚本
│
└── docs/
    ├── DESIGN_SYSTEM_SKILL_V1.0_README.md   # 本文档
    ├── DESIGN_SYSTEM_SKILL_V1.0.md          # 架构原则
    ├── DESIGN_SYSTEM_SKILL_V1.0_WORKPLAN.md # 开发计划
    ├── EXPECTED_ARCHITECTURE_LIGHT.md       # 轻量架构
    ├── component-maintenance.md              # 维护指南
    └── design-system-skill-v1.0-trial-log.md # 试跑记录
```

---

## 3. 文件角色

### 3.1 资源层（`.resources/`）

| 文件 | 角色 | 是否默认读取 |
|------|------|-------------|
| `config.json` | 声明 active 资源 | ✓ |
| `route-index.md` | prompt → page_type | ✓ |
| `layout/{page_type}.md` | page_type → layout skeleton | ✓ |
| `blocks.json` | block id → 源码路径 | ✓ |
| `components.json` | component id → 源码路径 | ✓ |
| `component/*.md` | 组件规范 | **按需** |

### 3.2 真实来源（`harmony-ui-playground/`）

| 目录/文件 | 角色 |
|-----------|------|
| `src/component/` | 组件 TSX 源码 |
| `src/blocks/` | block TSX 源码 |
| `src/styles/devui-tokens.css` | CSS token |
| `components.json` | shadcn alias 配置 |

---

## 4. page_type 与 layout

| page_type | layout file | 适用场景 |
|-----------|-------------|----------|
| `mobile-settings` | `layout/mobile-settings.md` | 喝水设置、偏好设置 |
| `health-dashboard` | `layout/health-dashboard.md` | 健康任务进度、三叶草 |
| `mobile-sheet` | `layout/mobile-sheet.md` | 服药提醒、底部浮层 |

---

## 5. 使用流程

### 5.1 收到 prompt

```
"生成一个喝水设置页"
```

### 5.2 Route Matching

读取 `route-index.md`，命中 `mobile-settings`：
- hit_rules: "喝水设置" / "设置页"
- 输出: `page_type = mobile-settings`

### 5.3 Layout Resolution

读取 `mobile-settings.md`：
- `reference_blocks`: water-settings, settings-page
- `needed_components`: status-bar, title-bar, list, list-item, switch
- `composition_mapping`: 布局块 → 组件映射

### 5.4 Source Grounding

1. 读 `src/blocks/water-settings.tsx`（参考布局）
2. 读 `src/component/StatusBar/`, `TitleBar/`, `List/`, `Switch/`（组件 API）

### 5.5 Page Generation

生成文件：
- `src/blocks/{page-name}-generated.tsx`
- `src/blocks/{page-name}-generated.stories.tsx`
- `src/blocks/{page-name}-generated.log.md`（生成记录）

### 5.6 Validation

```bash
cd harmony-ui-playground
npm run build
npm run build-storybook
```

---

## 6. 维护规则

### 6.1 新增 layout

需修改/创建：
1. `.resources/harmony/layout/{new-layout}.md`（新建）
2. `.resources/harmony/layout/index.md`（注册）
3. `.resources/harmony/route-index.md`（增加命中规则）

校验命令：
```bash
node scripts/validate_design_system_resources.mjs
```

### 6.2 新增 block

需修改/创建：
1. `harmony-ui-playground/src/blocks/{block-name}.tsx`
2. `harmony-ui-playground/src/blocks/{block-name}.stories.tsx`
3. `.resources/harmony/blocks.json`（注册 block）

校验命令：
```bash
node scripts/validate_design_system_resources.mjs
```

### 6.3 新增 component

需修改/创建：
1. `harmony-ui-playground/src/component/{ComponentName}/`
2. `harmony-ui-playground/src/component/index.ts`（导出）
3. `.resources/harmony/components.json`（注册 component）

校验命令：
```bash
cd harmony-ui-playground && npm run build && npm run build-storybook
```

---

## 7. 校验脚本

### 7.1 资源一致性校验

```bash
node scripts/validate_design_system_resources.mjs
```

校验内容：
- `blocks.json` 的 files/stories 路径是否存在
- `components.json` 的 path/stories 路径是否存在
- layout 的 `reference_blocks` 是否在 blocks.json 中存在
- layout 的 `needed_components` 是否在 components.json 中存在
- block 的 dependencies 是否都在 components.json 中存在

### 7.2 构建校验

```bash
cd harmony-ui-playground
npm run build              # TypeScript + Vite
npm run build-storybook     # Storybook 构建
```

---

## 8. 变更后最小验收命令

| 变更类型 | 最小命令 |
|---------|---------|
| layout/blocks.json/components.json 变更 | `node scripts/validate_design_system_resources.mjs` |
| 组件源码变更 | `cd harmony-ui-playground && npm run build` |
| stories 变更 | `cd harmony-ui-playground && npm run build-storybook` |
| 任意变更（推荐） | 完整校验链 |

---

## 9. 快速开始

### 9.1 初始化校验

```bash
# 验证资源层一致性
node scripts/validate_design_system_resources.mjs

# 验证构建
cd harmony-ui-playground && npm run build
```

### 9.2 生成新页面

1. 编写 prompt: `"生成一个 XXX 页"`
2. 按工作流执行 Step 1-5
3. 生成文件到 `harmony-ui-playground/src/blocks/`
4. 运行校验命令

### 9.3 添加新 layout

1. 在 `layout/` 下创建 `{new-layout}.md`
2. 在 `route-index.md` 增加命中规则
3. 在 `layout/index.md` 注册
4. 运行校验脚本

---

## 10. 试跑记录

已完成的试跑：

| 试跑 | Prompt | page_type | 生成文件 | 验证 |
|------|--------|-----------|---------|------|
| 1 | 生成一个喝水设置页 | mobile-settings | water-settings-generated.tsx | ✓ build + storybook |

---

## 11. 相关文档

| 文档 | 说明 |
|------|------|
| `DESIGN_SYSTEM_SKILL_V1.0.md` | 架构原则和定位 |
| `DESIGN_SYSTEM_SKILL_V1.0_WORKPLAN.md` | 开发计划 |
| `EXPECTED_ARCHITECTURE_LIGHT.md` | 轻量架构说明 |
| `component-maintenance.md` | 组件维护指南 |
| `design-system-skill-v1.0-trial-log.md` | 试跑记录 |
| `phase-0-baseline-record.md` | baseline 状态记录 |

---

## 12. 版本

- **v1.0**: 2026-04-20
- 完成 Phase: 0-6 全部完成
- 资源校验: 通过
- 构建验证: 通过
