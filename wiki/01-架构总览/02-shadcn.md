# 02 | shadcn/ui 架构

> 这一篇介绍我们为什么选择 shadcn 作为 Design System 的组件基础。

---

## 1. 三种方案的对比

AI 生成 UI 有三种主流方案：

| 方案             | 示例                   | 优点                                | 致命缺点                                 |
| -------------- | -------------------- | --------------------------------- | ------------------------------------ |
| **纯 Markdown** | design.md、设计文档       | 轻量                                | 消耗大量注意力上下文；无法保证 AI 理解到位；无法验证正确性      |
| **设计文档 + CSS** | design.md + Tailwind CSS/HTML 代码片段 | 样式有规范；片段可直接复用 | **真实项目数据接入时，CSS+HTML 代码片段过多过杂，直接撑爆模型上下文，导致注意力涣散** |
| **真实项目组件**     | shadcn/ui            | **生产级稳定性**；组件语义完整；AI 看到的就是真实运行的 | 需要项目环境                               |

---

## 2. 为什么不是 Markdown

AI 的注意力是有限的。Markdown 文档的问题：

- **信息密度低**：一段 200 行的 Markdown 描述，AI 实际能精准记住的关键信息可能不到 30%
- **无法验证理解**：AI 可以复述文档，但无法证明它真的理解了这个组件能做什么、不能做什么
- **边界模糊**：文档说"这个按钮支持 disabled 状态"，但 AI 不知道 `disabled` 是 prop 还是 className，还是 CSS 变量

Markdown 适合人类阅读，不适合 AI 消耗上下文。

---

## 3. 为什么不是 design.md + CSS + HTML

design.md + Tailwind CSS/HTML 代码片段是比纯 Markdown 更好的方案，但它解决不了根本问题：

```
design.md 说："按钮有四种变体：primary、secondary、outline、ghost"
         ↓
AI 猜测：variant="primary"  还是  className="btn-primary"
         ↓
AI 生成：<button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
         ↓
运行结果：样式可能和系统里其他按钮不一致
         可能缺少 disabled 样式
         可能缺少 focus/hover 状态
```

**问题本质 1：CSS 是无状态的描述，不包含组件的行为约束。**

**问题本质 2：真实 B 端项目数据接入时，CSS+HTML 代码片段过多、过杂。**

```
一个 B 端表格页面可能包含：
- 20+ 个组件的样式片段
- 每个片段 5-20 行 CSS/HTML
- 总上下文 100-400 行代码片段
         ↓
直接撑爆模型上下文
注意力被碎片化的代码片段分散
无法聚焦在真正的业务逻辑上
```

**shadcn 只需要：**
```tsx
import { Button } from "@/components/ui/button"
```
一行 import，组件的完整语义（Props、变体、状态、样式）AI 自己去源码里读。

---

## 4. 为什么是 shadcn 组件

shadcn 的核心价值：**组件源码 = 组件的完整语义**

```
AI 读取 src/components/ui/button.tsx
         ↓
完整看到：Props 定义（variant、size、disabled...）
         完整看到：内部结构（哪些元素可以嵌套、哪些不能）
         完整看到：所有变体的样式（className 的组合方式）
         完整看到：交互状态（disabled 时文字变灰、cursor 变 not-allowed...）
         ↓
AI 生成：<Button variant="default" disabled>提交</Button>
         ↓
运行结果：✅ 样式一致 ✅ 行为正确 ✅ 与系统其他按钮完全一致
```

**shadcn 组件是"AI 可见即可知，知之即可用"的。**

---

## 5. shadcn 的额外优势

**组件源码在项目中 ≠ 不可维护**
- 组件通过 `npx shadcn@latest add` 安装，版本可控
- 可以修改源码定制，修改后不会被 CLI 更新覆盖（除非主动运行 add）
- 组件是白盒，不是黑盒依赖

**CLI 驱动 = 安装流程可预测**
- AI 知道执行 `shadcn add button` 后文件会出现在哪里
- AI 知道 `components.json` 会被更新
- AI 知道如何引用：`import { Button } from "@/components/ui/button"`

**与 Tailwind 原生集成**
- shadcn 组件本身就用 Tailwind 编写
- AI 在组件里看到的样式类名，和 AI 自己写的样式是同一套语言
- 不会出现"组件用了一套 CSS 类名，AI 生成用了另一套"的不一致

---

## 6. 总结

| 问题 | 答案 |
|------|------|
| 为什么不是 Markdown？ | 信息密度低，AI 注意力消耗大，无法验证理解 |
| 为什么不是 design.md + CSS + HTML？ | CSS+HTML 代码片段过杂，真实 B 端场景直接撑爆上下文，注意力涣散 |
| 为什么是 shadcn？ | **组件源码 = 完整语义；AI 看到的就是真实运行的；生成结果天然一致** |

**shadcn 的本质是"让 AI 看到生产级的代码约束"，而不是"让 AI 读一段描述然后自己猜"。**