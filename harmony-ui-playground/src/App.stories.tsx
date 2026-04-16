import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { Avatar } from "./component/Avatar"
import { List, ListItem } from "./component/List"
import { Switch } from "./component/Switch"
import { TitleBar } from "./component/TitleBar"
import { User, Globe, Moon, Mail, Monitor } from "lucide-react"
import "./settings-app.css"

// 图标组件
const IconWrapper = ({
  children,
  color = "var(--devui-primary)",
}: {
  children: React.ReactNode
  color?: string
}) => <div style={{ color }}>{children}</div>

// 设置页面组件
function SettingsApp() {
  // 个人资料状态
  const [userName, setUserName] = useState("张三")
  const [isEditingName, setIsEditingName] = useState(false)

  // 偏好设置状态
  const [language, setLanguage] = useState("简体中文")
  const [darkMode, setDarkMode] = useState(false)

  // 通知设置状态
  const [emailNotification, setEmailNotification] = useState(true)
  const [desktopNotification, setDesktopNotification] = useState(false)

  return (
    <div className="settings-app">
      <TitleBar title="设置" />

      <div className="settings-app__content">
        {/* 个人资料部分 */}
        <div className="settings-section">
          <div className="settings-section__title">个人资料</div>
          <List className="settings-section__list">
            <ListItem
              border={true}
              left={
                <IconWrapper>
                  <Avatar
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                    size={48}
                  />
                </IconWrapper>
              }
              title="头像"
              showArrow={true}
            />
            <ListItem
              border={false}
              left={
                <IconWrapper>
                  <User size={22} />
                </IconWrapper>
              }
              title="用户名"
              rightText={isEditingName ? undefined : userName}
              showArrow={!isEditingName}
              onClick={() => {
                if (!isEditingName) {
                  setIsEditingName(true)
                }
              }}
              right={
                isEditingName ? (
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    onBlur={() => setIsEditingName(false)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setIsEditingName(false)
                      }
                    }}
                    autoFocus
                    style={{
                      border: "1px solid var(--devui-primary)",
                      borderRadius: "4px",
                      padding: "4px 8px",
                      fontSize: "14px",
                      outline: "none",
                      width: "120px",
                    }}
                  />
                ) : undefined
              }
            />
          </List>
        </div>

        <div className="settings-section__spacer" />

        {/* 偏好设置部分 */}
        <div className="settings-section">
          <div className="settings-section__title">偏好设置</div>
          <List className="settings-section__list">
            <ListItem
              border={true}
              left={
                <IconWrapper>
                  <Globe size={22} />
                </IconWrapper>
              }
              title="语言"
              rightText={language}
              showArrow={true}
              onClick={() => {
                // 循环切换语言
                const languages = ["简体中文", "English", "日本語", "한국어"]
                const currentIndex = languages.indexOf(language)
                const nextIndex = (currentIndex + 1) % languages.length
                setLanguage(languages[nextIndex])
              }}
            />
            <ListItem
              border={false}
              left={
                <IconWrapper>
                  <Moon size={22} />
                </IconWrapper>
              }
              title="深色模式"
              right={
                <Switch
                  modelValue={darkMode}
                  onUpdateModelValue={setDarkMode}
                />
              }
              showArrow={false}
            />
          </List>
        </div>

        <div className="settings-section__spacer" />

        {/* 通知设置部分 */}
        <div className="settings-section">
          <div className="settings-section__title">通知设置</div>
          <List className="settings-section__list">
            <ListItem
              border={true}
              left={
                <IconWrapper>
                  <Mail size={22} />
                </IconWrapper>
              }
              title="邮件通知"
              subtitle="接收重要更新和提醒邮件"
              right={
                <Switch
                  modelValue={emailNotification}
                  onUpdateModelValue={setEmailNotification}
                />
              }
              showArrow={false}
            />
            <ListItem
              border={false}
              left={
                <IconWrapper>
                  <Monitor size={22} />
                </IconWrapper>
              }
              title="桌面通知"
              subtitle="在桌面显示实时通知"
              right={
                <Switch
                  modelValue={desktopNotification}
                  onUpdateModelValue={setDesktopNotification}
                />
              }
              showArrow={false}
            />
          </List>
        </div>

        <div className="settings-section__spacer" />

        {/* 版本信息 */}
        <div className="settings-footer">
          <span className="settings-footer__version">版本 1.0.0</span>
        </div>
      </div>
    </div>
  )
}

// Storybook 配置
const meta = {
  title: "Playground/SettingsApp",
  component: SettingsApp,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SettingsApp>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}