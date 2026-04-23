import { BreadcrumbTabsHeader } from "@/components/ui/breadcrumb-tabs-header"
import { TableBlock } from "@/components/ui/table-block"
import { ToolchainSidebar } from "@/components/ui/toolchain-sidebar"
import { TopNav } from "@/components/ui/top-nav"
import "./devops-work-item-list-page.css"

export function DevOpsWorkItemListPage() {
  return (
    <main className="devops-work-item-page" data-runtime-component="DevOpsWorkItemListPage">
      <TopNav />
      <div className="devops-work-item-page__workspace">
        <ToolchainSidebar />
        <section className="devops-work-item-page__main" aria-label="工作项列表页">
          <BreadcrumbTabsHeader />
          <TableBlock
            className="devops-work-item-page__table-block"
            tableProps={{
              borderType: "",
              size: "md",
            }}
            paginationProps={{
              pageSize: 15,
              totalItems: 8,
              showJump: true,
            }}
          />
        </section>
      </div>
    </main>
  )
}
