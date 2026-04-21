# DevUI Resource Route Index

> 这个文件负责回答一个问题：当用户描述一个页面时，Agent 应该先进入哪一种页面资源。

DevUI 当前支持三类页面入口：

| 页面类型 | 适合场景 | Layout 文档 |
|---|---|---|
| `table-page` | 查询表格、列表管理、日志列表、审批列表、资源清单 | `layout/table-page.md` |
| `form-page` | 创建/编辑表单、分组配置页、用户设置、工作区详情 | `layout/form-page.md` |
| `card-workbench-page` | 工作台首页、项目门户、卡片导航页、概览入口页 | `layout/card-workbench-page.md` |

---

## 1. 如何路由

### 1.1 table-page

优先命中：

- 用户要求展示一批数据，并且主要操作是筛选、搜索、排序、查看详情、批量操作。
- 关键词包含：表格、列表、查询、筛选、日志、资源清单、审批列表、table、list。
- 页面主体明显应该由 `TableShellFrame` + `Table` 承载。

不要命中：

- 页面核心是填写数据，而不是浏览数据。
- 页面核心是卡片入口、项目门户或工作台。

### 1.2 form-page

优先命中：

- 用户要求创建、编辑、配置、保存一组字段。
- 页面存在左侧二级导航、树导航、分组表单、配置项、开关项。
- 关键词包含：表单、配置、设置、详情、编辑、创建、form、settings。
- 页面主体明显应该由 `FormShellFrame` 承载。

不要命中：

- 页面主体是密集数据表格。
- 页面核心是卡片式工作台入口。

### 1.3 card-workbench-page

优先命中：

- 用户要求工作台、项目门户、卡片导航、概览首页。
- 页面主体是多个卡片入口，常伴随顶部操作区和右侧辅助信息区。
- 关键词包含：工作台、门户、卡片、概览、入口、dashboard、workbench、portal。

不要命中：

- 页面明确要求列表管理或查询表格。
- 页面明确要求创建/编辑表单。

---

## 2. 默认策略

当用户描述同时包含多种特征时，按下面顺序判断：

1. 如果有大量字段需要填写或配置，优先 `form-page`。
2. 如果有明确数据列表、查询条件、批量操作，优先 `table-page`。
3. 如果是入口型、导航型、概览型页面，优先 `card-workbench-page`。

如果仍然不明确，可以先问用户页面核心任务是什么；如果必须直接生成，企业管理类页面默认走 `table-page`。

---

## 3. Source Truth

本资源集的可运行真值来自：

```text
devui-playground/src/components/ui/**
devui-playground/src/**/*.stories.tsx
devui-playground/src/styles/devui-tokens.css
```

旧 `(skill)MiniDevUI` 中的 layout、slot、block 文档只作为语义参考，不直接作为当前源码真值。
