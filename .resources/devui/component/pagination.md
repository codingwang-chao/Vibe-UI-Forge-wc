# Pagination Component

`Pagination` 是 DevUI 分页器组件，用于数据列表的分页导航。

## Source

```text
devui-playground/src/components/ui/pagination/pagination.tsx
devui-playground/src/components/ui/pagination/pagination.css
devui-playground/src/components/ui/pagination/pagination.stories.tsx
devui-playground/src/components/ui/pagination/index.ts
```

## Benchmark

[html/component/pagination-benchmark.html](file://html/component/pagination-benchmark.html)

**Figma Node**: `233:431`

## Core Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `current` | `number` | `1` | 当前页码（1-based） |
| `total` | `number` | `1` | 总页数 |
| `pageSize` | `number` | `10` | 每页条数 |
| `pageSizeOptions` | `number[]` | `[10, 20, 50, 100]` | 每页条数选项 |
| `totalItems` | `number` | - | 总条目数（显示用） |
| `showJump` | `boolean` | `false` | 是否显示跳页输入框 |
| `onChange` | `(page: number) => void` | - | 页码变化回调 |
| `onPageSizeChange` | `(pageSize: number) => void` | - | 每页条数变化回调 |
| `className` | `string` | - | 额外 CSS 类 |

## 设计要素

| 要素 | 规格 |
|------|------|
| 页码按钮尺寸 | 24px × 24px |
| 页码按钮圆角 | 4px |
| 页码字号 | 12px, line-height 20px |
| 默认文本色 | `var(--devui-aide-text, #8a8e99)` |
| 悬停文本色 | `var(--devui-text, #252b3a)` |
| 激活态背景 | `var(--devui-list-item-hover-bg, #f2f5fc)` |
| 激活态文本色 | `var(--devui-icon-fill-active, #5e7ce0)` |
| 禁用态背景 | `var(--devui-disabled-fill-bg, #f3f3f3)` |
| 禁用态文本色 | `var(--devui-disabled-text, #adb0b8)` |
| 每页条数选择器高度 | 28px |
| 跳页输入框宽度 | 49px |

## Icons

| 用途 | Icon Name |
|------|-----------|
| 上一页 | `chevron-left` |
| 下一页 | `chevron-right` |
| 页码省略 | `more-horizontal` |
| 下拉箭头 | `chevron-down` |

## 实现状态

| 功能 | 状态 | 说明 |
|------|------|------|
| 基础分页 | ✅ | 已实现 |
| 页码省略算法 | ✅ | 7页以内显示全部，否则显示省略 |
| 上一页/下一页 | ✅ | 已实现，支持 disabled 状态 |
| 每页条数选择器 | ✅ | 使用原生 select |
| 跳页输入框 | ✅ | 可选功能 |
| 响应式省略算法 | ✅ | 根据当前页位置动态显示省略 |

## Usage

```tsx
import { Pagination } from "@/components/ui/pagination"

// 基础用法
<Pagination
  current={1}
  total={10}
  pageSize={10}
  totalItems={100}
  onChange={(page) => console.log(page)}
/>

// 带跳页
<Pagination
  current={5}
  total={100}
  pageSize={20}
  totalItems={2000}
  showJump
  onChange={(page) => setCurrentPage(page)}
  onPageSizeChange={(size) => setPageSize(size)}
/>
```