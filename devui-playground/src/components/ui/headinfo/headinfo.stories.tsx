import type { Meta, StoryObj } from "@storybook/react-vite"
import { HeadInfo } from "./headinfo"

const meta: Meta<typeof HeadInfo> = {
  title: "UI/HeadInfo",
  component: HeadInfo,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["lg", "md"],
      description: "Size variant (lg = 18px text, md = 14px text)",
    },
    status: {
      control: "select",
      options: ["未检查", "已检查"],
      description: "Code health check status",
    },
    showSearch: {
      control: "boolean",
      description: "Show search dropdown instead of repo ID",
    },
    isSearchCollapsed: {
      control: "boolean",
      description: "Is search collapsed (状态3 variant)",
    },
  },
}

export default meta
type Story = StoryObj<typeof HeadInfo>

const defaultRepo = {
  id: "123456",
  org: "huawei",
  name: "Sample",
}

const sampleSearchResults = [
  { id: "1", org: "huawei", name: "Sample-P" },
  { id: "2", org: "huawei", name: "Sample-U" },
]

export const Default: Story = {
  args: {
    size: "lg",
    breadcrumbs: [
      { label: "huawei", isActive: false },
      { label: "Sample", isActive: true },
    ],
    repo: defaultRepo,
    status: "未检查",
    showSearch: false,
  },
}

export const WithCheckedStatus: Story = {
  args: {
    ...Default.args,
    status: "已检查",
  },
}

export const MultipleBreadcrumbs: Story = {
  args: {
    size: "lg",
    breadcrumbs: [
      { label: "huawei", isActive: false },
      { label: "Sample", isActive: false },
      { label: "Branch", isActive: true },
    ],
    repo: { ...defaultRepo, id: "789012" },
    status: "未检查",
    showSearch: false,
  },
}

export const SizeMd: Story = {
  args: {
    size: "md",
    breadcrumbs: [
      { label: "huawei", isActive: false },
      { label: "Sample", isActive: true },
    ],
    repo: defaultRepo,
    status: "未检查",
    showSearch: false,
  },
}

export const SearchDropdown: Story = {
  args: {
    size: "md",
    breadcrumbs: [
      { label: "huawei", isActive: false },
      { label: "Sample", isActive: true },
    ],
    repo: { id: "123456", org: "huawei", name: "Sample" },
    status: "未检查",
    showSearch: true,
    searchPlaceholder: "搜索代码仓",
    searchResults: sampleSearchResults,
    searchResultCount: 2,
    isSearchCollapsed: false,
  },
}

export const SearchCollapsed: Story = {
  args: {
    size: "md",
    breadcrumbs: [
      { label: "huawei", isActive: false },
      { label: "Sample", isActive: true },
    ],
    repo: { id: "123456", org: "huawei", name: "Sample" },
    status: "未检查",
    showSearch: true,
    searchPlaceholder: "搜索代码仓",
    searchResults: sampleSearchResults,
    searchResultCount: 2,
    isSearchCollapsed: true,
  },
}

export const SearchWith3Results: Story = {
  args: {
    size: "md",
    breadcrumbs: [
      { label: "huawei", isActive: false },
      { label: "Sample", isActive: true },
    ],
    repo: { id: "123456", org: "huawei", name: "Sample" },
    status: "未检查",
    showSearch: true,
    searchPlaceholder: "搜索代码仓",
    searchResults: [
      { id: "1", org: "huawei", name: "Sample-P" },
      { id: "2", org: "huawei", name: "Sample-U" },
      { id: "3", org: "huawei", name: "Sample-U" },
    ],
    searchResultCount: 3,
    isSearchCollapsed: false,
  },
}

export const SearchWith4Results: Story = {
  args: {
    size: "md",
    breadcrumbs: [
      { label: "huawei", isActive: false },
      { label: "Sample", isActive: true },
    ],
    repo: { id: "123456", org: "huawei", name: "Sample" },
    status: "未检查",
    showSearch: true,
    searchPlaceholder: "搜索代码仓",
    searchResults: [
      { id: "1", org: "huawei", name: "Sample-P" },
      { id: "2", org: "huawei", name: "Sample-U" },
      { id: "3", org: "huawei", name: "Sample-U" },
      { id: "4", org: "huawei", name: "Sample-U" },
    ],
    searchResultCount: 4,
    isSearchCollapsed: false,
  },
}
