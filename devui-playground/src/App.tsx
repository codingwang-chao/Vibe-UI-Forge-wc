import { useMemo, useState } from "react"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { SidebarNav } from "@/components/ui/sidebar-nav"
import type { SidebarNavItem } from "@/components/ui/sidebar-nav"
import { Subheader } from "@/components/ui/subheader"
import { Table, Column } from "@/components/ui/table"
import { ToolbarBlock } from "@/components/ui/toolbar-block"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"
import {
  Bell,
  BookOpenText,
  BriefcaseBusiness,
  Bug,
  ChevronDown,
  Ellipsis,
  Flag,
  FlaskConical,
  Grid3X3,
  HelpCircle,
  Home,
  LayoutList,
  MapPin,
  MonitorCog,
  NotebookText,
  Pencil,
  Plus,
  Search,
  Settings2,
  Star,
  Target,
  Workflow,
} from "lucide-react"

type MainTab = "planning" | "work-items" | "iteration" | "stats" | "report"
type ListTab = "all" | "backlog" | "bug"
type ViewMode = "table" | "tree" | "card"
type WorkTag = "Bug" | "Story"
type WorkPriority = "高" | "中" | "低"

type WorkRow = {
  key: string
  id: string
  title: string
  tag: WorkTag
  endAt: string
  status: "新建"
  owner: string
  startAt: string
  expectedEndAt: string
  overdueDays?: number
  priority: WorkPriority
}

const topNavItems: Array<{ key: string; label: string; icon: LucideIcon }> = [
  { key: "home", label: "首页", icon: Home },
  { key: "desk", label: "工作台", icon: BriefcaseBusiness },
  { key: "insight", label: "效能洞察", icon: Target },
  { key: "service", label: "服务", icon: ChevronDown },
  { key: "mirror", label: "华为开源镜像站", icon: BookOpenText },
]

const mainTabs = [
  { id: "planning", label: "规划" },
  { id: "work-items", label: "工作项" },
  { id: "iteration", label: "迭代" },
  { id: "stats", label: "统计" },
  { id: "report", label: "报告" },
] as const

const listTabs = [
  { key: "all", label: "全部" },
  { key: "backlog", label: "Backlog" },
  { key: "bug", label: "缺陷" },
] as const

const rows: WorkRow[] = [
  {
    key: "row-1",
    id: "12345678",
    title: "用户管理-无法手动设置会员级别",
    tag: "Bug",
    endAt: "--",
    status: "新建",
    owner: "hw12345678",
    startAt: "2025-03-09",
    expectedEndAt: "2026-02-09",
    overdueDays: 9,
    priority: "中",
  },
  {
    key: "row-2",
    id: "12345678",
    title: "积分管理-无法显示积分规则界面",
    tag: "Bug",
    endAt: "--",
    status: "新建",
    owner: "hw12345678",
    startAt: "--",
    expectedEndAt: "--",
    priority: "高",
  },
  {
    key: "row-3",
    id: "12345678",
    title: "作为用户应该可以查看产品列表",
    tag: "Story",
    endAt: "--",
    status: "新建",
    owner: "hw12345678",
    startAt: "--",
    expectedEndAt: "--",
    priority: "低",
  },
  {
    key: "row-4",
    id: "12345678",
    title: "作为管理员应该可以设置会员级别",
    tag: "Story",
    endAt: "--",
    status: "新建",
    owner: "hw12345678",
    startAt: "--",
    expectedEndAt: "--",
    priority: "低",
  },
  {
    key: "row-5",
    id: "12345678",
    title: "作为管理员应该可以添加优惠活动",
    tag: "Story",
    endAt: "--",
    status: "新建",
    owner: "hw12345678",
    startAt: "--",
    expectedEndAt: "--",
    priority: "低",
  },
  {
    key: "row-6",
    id: "12345678",
    title: "作为管理员应该可以添加团购活动",
    tag: "Story",
    endAt: "--",
    status: "新建",
    owner: "hw12345678",
    startAt: "--",
    expectedEndAt: "--",
    priority: "低",
  },
  {
    key: "row-7",
    id: "12345678",
    title: "作为管理员应该可以添加限时打折",
    tag: "Story",
    endAt: "--",
    status: "新建",
    owner: "hw12345678",
    startAt: "--",
    expectedEndAt: "--",
    priority: "低",
  },
  {
    key: "row-8",
    id: "12345678",
    title: "门店网络界面没有显示省份筛选",
    tag: "Bug",
    endAt: "--",
    status: "新建",
    owner: "hw12345678",
    startAt: "--",
    expectedEndAt: "--",
    priority: "低",
  },
]

const priorityClassMap: Record<WorkPriority, string> = {
  高: "text-destructive",
  中: "text-warning",
  低: "text-muted-foreground",
}

function App() {
  const [region, setRegion] = useState("cn-north-4")
  const [mainTab, setMainTab] = useState<MainTab>("work-items")
  const [listTab, setListTab] = useState<ListTab>("backlog")
  const [viewMode, setViewMode] = useState<ViewMode>("table")
  const [keyword, setKeyword] = useState("")
  const [pageSize, setPageSize] = useState<string | number>(15)

  const sidebarItems = useMemo<SidebarNavItem[]>(
    () => [
      { key: "dashboard", label: <NavLabel icon={Target} text="仪表盘" /> },
      {
        key: "work-items",
        label: <NavLabel icon={NotebookText} text="工作项" selected />,
        children: [
          {
            key: "work-demand",
            label: <NavLabel icon={MonitorCog} text="需求管理" />,
          },
          { key: "work-bug", label: <NavLabel icon={Bug} text="缺陷管理" /> },
        ],
      },
      { key: "modeling", label: <NavLabel icon={Workflow} text="软件建模" /> },
      { key: "code", label: <NavLabel icon={BookOpenText} text="代码" /> },
      {
        key: "delivery",
        label: <NavLabel icon={BriefcaseBusiness} text="持续交付" />,
      },
      {
        key: "artifact",
        label: <NavLabel icon={Grid3X3} text="制品仓库" />,
      },
      { key: "test", label: <NavLabel icon={FlaskConical} text="测试" /> },
      { key: "wiki", label: <NavLabel icon={BookOpenText} text="知识库" /> },
    ],
    []
  )

  const filteredRows = useMemo(() => {
    const normalized = keyword.trim().toLowerCase()

    return rows.filter((row) => {
      if (listTab === "bug" && row.tag !== "Bug") {
        return false
      }
      if (normalized.length === 0) {
        return true
      }
      return (
        row.title.toLowerCase().includes(normalized) ||
        row.owner.toLowerCase().includes(normalized) ||
        row.id.includes(normalized)
      )
    })
  }, [keyword, listTab])

  return (
    <div className="min-h-svh bg-muted/30 text-foreground">
      <header className="border-b bg-card">
        <div className="flex h-10 items-center justify-between px-4">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="inline-flex size-6 items-center justify-center rounded-full bg-destructive/15 text-[11px] font-semibold text-destructive">
                华
              </span>
              <span className="text-base font-semibold">华为云</span>
              <span className="text-base text-muted-foreground">控制台</span>
            </div>

            <Separator orientation="vertical" className="h-5" />

            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-muted-foreground" />
            </div>

            <div className="w-42">
              <Select
                modelValue={region}
                onUpdateModelValue={(value) => setRegion(String(value))}
                options={[{ name: "华北-北京四", value: "cn-north-4" }]}
                size="sm"
              />
            </div>

            <nav className="hidden items-center gap-4 lg:flex">
              {topNavItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.key}
                    type="button"
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                  >
                    <Icon size={14} />
                    <span>{item.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>

          <div className="flex items-center gap-1">
            <Button size="icon-sm" variant="ghost" aria-label="通知">
              <Bell size={14} />
            </Button>
            <Button size="icon-sm" variant="ghost" aria-label="帮助">
              <HelpCircle size={14} />
            </Button>
            <Button size="sm" variant="ghost">
              EN
            </Button>
            <Avatar name="HZ" width={28} height={28} />
          </div>
        </div>
      </header>

      <div className="flex min-h-[calc(100svh-40px)]">
        <aside className="border-r bg-card">
          <div className="flex h-14 w-[230px] items-center justify-between border-b px-3">
            <div className="flex min-w-0 items-center gap-2">
              <span className="inline-flex size-5 items-center justify-center rounded bg-primary/15 text-[10px] font-semibold text-primary">
                项
              </span>
              <span className="truncate text-sm font-semibold">
                DevOps全流程示例项
              </span>
            </div>
            <ChevronDown size={14} className="text-muted-foreground" />
          </div>

          <SidebarNav
            className="w-[230px] border-0 p-2"
            items={sidebarItems}
            selectedKeys={["work-demand"]}
            openKeys={["work-items"]}
          />
        </aside>

        <main className="flex min-w-0 flex-1 flex-col">
          <Subheader
            className="border-x-0 border-t-0 px-4"
            modelValue={mainTab}
            onUpdateModelValue={(value) => setMainTab(value as MainTab)}
            breadcrumbs={[
              { key: "home", label: "首页" },
              { key: "project", label: "DevOps全流程示例项目" },
              { key: "work", label: "工作项" },
            ]}
            tabs={mainTabs.map((tab) => ({
              id: tab.id,
              label: tab.label,
            }))}
          />

          <ToolbarBlock className="mx-0 my-0 flex-nowrap !rounded-none !border-x-0 !border-t-0 !border-b !bg-muted/70 px-4 py-2">
            <div className="mr-2 flex items-end gap-5 text-sm">
              {listTabs.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setListTab(tab.key)}
                  className={cn(
                    "h-8 border-b-2 border-transparent text-[18px] leading-none font-medium text-muted-foreground",
                    listTab === tab.key && "border-primary font-semibold text-foreground"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <Separator orientation="vertical" className="mx-1 h-6" />
            <Button size="sm">
              <Plus size={14} />
              新建
            </Button>
            <Button size="sm" variant="text">
              临时过滤
              <ChevronDown size={14} />
            </Button>
            <div className="flex min-w-80 flex-1 items-center gap-2 rounded-md border bg-background px-2 py-1">
              <Search size={14} className="text-muted-foreground" />
              <Button size="sm" variant="outline">
                状态: 新建
              </Button>
              <Button size="sm" variant="outline">
                进行中
              </Button>
              <Button size="sm" variant="outline">
                已解决
              </Button>
              <div className="min-w-56 flex-1">
                <Input
                  modelValue={keyword}
                  onUpdateModelValue={setKeyword}
                  size="sm"
                  placeholder="点击此处添加筛选条件"
                  className="!border-0 !shadow-none"
                  showGlowStyle={false}
                />
              </div>
            </div>
            <Separator orientation="vertical" className="mx-1 h-6" />
            <Button size="sm" variant="text">
              <Settings2 size={14} />
              表格设置
            </Button>
            <Button size="sm" variant="text">
              更多
            </Button>
            <Button
              size="icon-sm"
              variant={viewMode === "table" ? "outline" : "ghost"}
              onClick={() => setViewMode("table")}
              aria-label="表格"
            >
              <LayoutList size={14} />
            </Button>
            <Button
              size="icon-sm"
              variant={viewMode === "tree" ? "outline" : "ghost"}
              onClick={() => setViewMode("tree")}
              aria-label="树形"
            >
              <Workflow size={14} />
            </Button>
            <Button
              size="icon-sm"
              variant={viewMode === "card" ? "outline" : "ghost"}
              onClick={() => setViewMode("card")}
              aria-label="卡片"
            >
              <Grid3X3 size={14} />
            </Button>
          </ToolbarBlock>

          <div className="min-h-0 flex-1 px-4">
            <Table
              data={filteredRows as unknown as Record<string, unknown>[]}
              rowKey="key"
              size="sm"
              tableWidth="100%"
              borderType="bordered"
            >
              <Column type="checkable" width={48} />
              <Column field="id" header="编号" sortable minWidth={110} />
              <Column
                field="title"
                header="标题"
                sortable
                minWidth={320}
                formatter={(row) => {
                  const item = row as unknown as WorkRow
                  return (
                    <div className="flex items-center gap-2">
                      <Badge
                        status={item.tag === "Bug" ? "warning" : "success"}
                        count={item.tag}
                      />
                      <span className="truncate" title={item.title}>
                        {item.title}
                      </span>
                    </div>
                  )
                }}
              />
              <Column field="endAt" header="结束时间" sortable minWidth={120} />
              <Column
                field="status"
                header="状态"
                sortable
                filterable
                filterList={[
                  { name: "新建", value: "新建" },
                  { name: "进行中", value: "进行中" },
                  { name: "已解决", value: "已解决" },
                ]}
                minWidth={110}
              />
              <Column field="owner" header="处理人" sortable minWidth={130} />
              <Column field="startAt" header="预计开始时间" sortable minWidth={150} />
              <Column
                field="expectedEndAt"
                header="预计结束时间"
                sortable
                minWidth={180}
                formatter={(row) => {
                  const item = row as unknown as WorkRow
                  return (
                    <div className="flex items-center gap-2">
                      <span>{item.expectedEndAt}</span>
                      {item.overdueDays ? (
                        <Badge status="danger" count={`超期${item.overdueDays}天`} />
                      ) : null}
                    </div>
                  )
                }}
              />
              <Column
                field="priority"
                header="优先级"
                sortable
                minWidth={100}
                formatter={(row) => {
                  const item = row as unknown as WorkRow
                  return (
                    <span
                      className={cn(
                        "inline-flex items-center gap-1",
                        priorityClassMap[item.priority]
                      )}
                    >
                      <Flag size={13} />
                      {item.priority}
                    </span>
                  )
                }}
              />
              <Column header="操作" minWidth={120}>
                {({ row }) => {
                  void row
                  return (
                    <div className="flex items-center gap-1">
                      <Button size="icon-sm" variant="ghost" aria-label="编辑">
                        <Pencil size={14} />
                      </Button>
                      <Button size="icon-sm" variant="ghost" aria-label="收藏">
                        <Star size={14} />
                      </Button>
                      <Button size="icon-sm" variant="ghost" aria-label="更多">
                        <Ellipsis size={14} />
                      </Button>
                    </div>
                  )
                }}
              </Column>
            </Table>
          </div>

          <ToolbarBlock className="mx-4 mb-3 mt-2 justify-end !rounded-none !border-0 !border-t !bg-transparent !px-0 !py-3">
            <div className="w-[80px]">
              <Select
                modelValue={pageSize}
                onUpdateModelValue={(value) =>
                  setPageSize(Array.isArray(value) ? value[0] ?? 15 : value)
                }
                options={[
                  { name: "15", value: 15 },
                  { name: "30", value: 30 },
                  { name: "50", value: 50 },
                ]}
                size="sm"
              />
            </div>
            <span className="text-sm text-muted-foreground">条/页</span>
            <span className="text-sm text-muted-foreground">
              总条数：{filteredRows.length}
            </span>
            <Button size="icon-sm" variant="ghost" aria-label="上一页">
              ‹
            </Button>
            <span className="text-sm text-primary">1</span>
            <Button size="icon-sm" variant="ghost" aria-label="下一页">
              ›
            </Button>
          </ToolbarBlock>
        </main>
      </div>
    </div>
  )
}

function NavLabel({
  icon: Icon,
  text,
  selected,
}: {
  icon: LucideIcon
  text: string
  selected?: boolean
}) {
  return (
    <span className="flex items-center gap-2">
      <Icon
        size={16}
        className={cn(selected ? "text-primary" : "text-muted-foreground")}
      />
      <span>{text}</span>
    </span>
  )
}

export default App
