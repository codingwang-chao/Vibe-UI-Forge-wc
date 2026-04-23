# 00 | Design System Skill 全局概览

> 先理解 Design System Skill 解决什么问题，再按你的任务选择入口。

---

## 它解决什么问题？

普通 AI 直接生成 UI 时，最大的问题不是“写不出来”，而是**不稳定**。

同一个按钮、表单、设置页或 dashboard，每次生成都可能出现不同结构、不同样式、不同组件组合。根本原因是：AI 生成时没有稳定读取设计系统的约束，不知道哪些组件是真实可用的、哪些 token 应该使用、哪些页面结构可以复用。

Design System Skill 要解决的就是这件事：

```text
把 AI 从“凭感觉画 UI”
变成“按设计系统生成页面”
```

---

## 为什么它可以解决？

这套 Skill 不要求 AI 只看截图或只读一大段设计说明，而是把设计系统拆成两类信息：

| 层 | 一句话理解 | 作用 |
|---|---|---|
| Resource Layer | 地图和说明书 | 告诉 AI 有哪些页面族、Layout、Block、Component，以及它们怎么组合 |
| Source Layer | 可运行真值 | 提供真实 React 组件、Block、CSS、token 和 stories，让 AI 对齐真实实现 |

AI 生成页面前，会先用 Resource Layer 判断需求属于哪类页面，再读取对应 Layout、Block 和 Component 说明，最后回到 Source Layer 确认组件 Props、状态、样式和引用方式。

所以它不是让 AI 记住更多散文，而是让 AI 有路可走、有真值可查、有结果可验收。

---

## 你需要记住的最小模型

```text
设计输入
  ↓
Resource Layer：页面族、Layout、Block、Component 的地图
  ↓
Source Layer：React / CSS / token 的可运行真值
  ↓
生成页面
  ↓
验证结果，并写入 generation log
```

对平台设计师来说，你主要负责定义设计语义和验收标准；AI / 工程负责把这些语义落到资源层和真实组件源码里。

---

## 你现在想做什么？

如果你已经知道自己当前要做什么，可以直接从这里进入对应文档。

| 任务 | 推荐入口 |
|---|---|
| 我第一次了解这个项目 | → [为什么是这样一个架构](<./01-认识 Skill/01-为什么是react + markdown?.md>) |
| 我想理解 Design System Skill 怎么工作 | → [Design System Skill 简介](<./01-认识 Skill/02-Design system skill简介.md>) |
| 我要配置 Figma / Pixso MCP | → [MCP 准备](<./02-从 0 构建资源接入/01-MCP准备.md>) |
| 我要打开 Storybook 预览组件 | → [如何预览 React 组件](<./02-从 0 构建资源接入/02-如何预览react组件.md>) |
| 我要从设计输入接入一套设计系统 | → [从设计输入到资源层的完整路径](<./02-从 0 构建资源接入/03-从设计输入到资源层的完整路径.md>) |
| 我要把组件接入资源层 | → [抽取 Component 资源](<./02-从 0 构建资源接入/04-抽取 Component 资源.md>) |
| 我要抽取页面区块模板 | → [抽取 Block](<./02-从 0 构建资源接入/05-抽取 Block.md>) |
| 我要整理页面类型和 Layout | → [配置 Page Type 与 Layout](<./02-从 0 构建资源接入/06-配置 Page Type 与 Layout.md>) |
| 我要生成资源层索引 | → [生成 Resource Layer 索引](<./02-从 0 构建资源接入/07-生成 Resource Layer 索引.md>) |
| 我要做资源接入验收 | → [资源接入验收清单](<./02-从 0 构建资源接入/08-资源接入验收清单.md>) |
| 我要修改样式、组件或页面 | → [先判断应该改哪一层](<./03-后续修改与维护/01-先判断应该改哪一层.md>) |
| 我要查资源层字段和模板 | → [资源层文件说明](<./04-参考资料/01-资源层文件说明.md>) |
| 我不理解某个术语 | → [术语表](<./04-参考资料/06-术语表.md>) |

---

## 项目仓库

GitHub 仓库地址：

[https://github.com/dragonestdwolf/Vibe-UI-Forge](https://github.com/dragonestdwolf/Vibe-UI-Forge)

如果打开后提示没有权限，或看到 404 / Not Found，通常说明这是 private 仓库。请联系仓库管理员、项目负责人或团队内已有访问权限的同事，让对方把你的 GitHub 账号加入仓库 collaborator，或通过组织 / team 发起访问邀请。

---

## 推荐阅读路径

```text
第一次理解项目
  ↓
01-认识 Skill
  ↓
02-从 0 构建资源接入
  ↓
03-后续修改与维护
  ↓
04-参考资料
```

如果你是第一次接入一套设计系统，建议按下面顺序读：

1. [为什么是这样一个架构](<./01-认识 Skill/01-为什么是react + markdown?.md>)
2. [Design System Skill 简介](<./01-认识 Skill/02-Design system skill简介.md>)
3. [MCP 准备](<./02-从 0 构建资源接入/01-MCP准备.md>)
4. [如何预览 React 组件](<./02-从 0 构建资源接入/02-如何预览react组件.md>)
5. [从设计输入到资源层的完整路径](<./02-从 0 构建资源接入/03-从设计输入到资源层的完整路径.md>)
6. [资源接入验收清单](<./02-从 0 构建资源接入/08-资源接入验收清单.md>)

---

## 目录说明

### 01-认识 Skill

解释这套系统是什么、为什么需要真实 React 组件库、Skill 有哪些层、AI 生成页面时怎样读取资源。

适合：

- 第一次了解项目
- 需要向团队解释项目原理
- 想理解 React 真值、Markdown 资源地图和 Skill 工作规则之间的关系

### 02-从 0 构建资源接入

解释从 Figma / Pixso / 设计文档 / 截图 / 旧项目等输入出发，如何生成 React 组件、抽取 Component / Block / Page Type，并形成 `.resources` 资源层。

适合：

- 接入新的设计系统
- 把设计稿或旧组件库转成可生成资源
- 设计师和 Agent 协作整理资源层
- 在 Storybook 中检视组件、Block 和页面模板

### 03-后续修改与维护

解释资源接入后如何判断改哪一层：CSS / Token、Component、Page / Block。

适合：

- 修改视觉样式
- 扩展组件能力
- 调整页面结构
- 做质量审核和回归验证

### 04-参考资料

集中放资源层文件说明、模板、术语表和项目目录说明。

适合：

- 查 `route-index.md` 怎么写
- 查 `layout markdown` 怎么写
- 查 `blocks.json` / `components.json` 字段
- 查术语和项目目录

---

## 找文件

| 需要找 | 去哪里 |
|---|---|
| 当前资源配置 | `.resources/config.json` |
| 路由索引 | `.resources/{active}/route-index.md` |
| 布局规范 | `.resources/{active}/layout/` |
| Block 索引 | `.resources/{active}/blocks.json` |
| Component 索引 | `.resources/{active}/components.json` |
| 组件源码 | `harmony-ui-playground/src/component/` |
| Block 源码 | `harmony-ui-playground/src/blocks/` |
| Storybook stories | `harmony-ui-playground/src/**/*.stories.tsx` |
| 生成预览 | `harmony-ui-playground/src/render/` |
| token 和样式 | `harmony-ui-playground/src/styles/` |

---

## 最重要的边界

```text
Figma / Pixso / 截图 / 设计文档 = 设计输入
Resource Layer = 地图和 how to use 说明
React / CSS / token = 可运行真值
src/blocks/** = 稳定模板源
src/render/** = 生成预览，不能作为新模板源
```
