"use client"

import { useState } from "react"
import { StatusBar } from "@/component/StatusBar"
import { TitleBar } from "@/component/TitleBar"
import { List, ListItem } from "@/component/List"
import { Switch } from "@/component/Switch"
import { Avatar } from "@/component/Avatar"

import iconChevronBack from "./blocks/assets/pixso-icons/icon-chevron-backward.png"
import iconArrowRightSmall from "./blocks/assets/pixso-icons/icon-arrow-right-small.png"

import {
  User,
  Globe,
  Moon,
  Mail,
  Monitor,
} from "lucide-react"

function App() {
  // 个人资料
  const [username] = useState("张三")

  // 偏好设置
  const [language, setLanguage] = useState("简体中文")
  const [darkModeEnabled, setDarkModeEnabled] = useState(false)

  // 通知设置
  const [emailNotificationEnabled, setEmailNotificationEnabled] = useState(true)
  const [desktopNotificationEnabled, setDesktopNotificationEnabled] = useState(true)

  return (
    <div className="w-[360px] min-h-[792px] mx-auto bg-gray-100">
      <StatusBar time="09:41" backgroundColor="#f3f4f6" />

      <div className="w-[328px] mx-auto">
        <TitleBar
          title="设置"
          leftIcon={iconChevronBack}
        />
      </div>

      <div className="px-4">
        {/* 个人资料 */}
        <div className="mt-2 mb-1 px-1">
          <span className="text-xs text-gray-500">个人资料</span>
        </div>
        <List className="rounded-[20px]">
          <ListItem
            left={
              <Avatar
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                size={40}
              />
            }
            title={<span className="font-medium">头像</span>}
            right={
              <div className="flex items-center gap-1">
                <img src={iconArrowRightSmall} alt="" className="w-3 h-6" />
              </div>
            }
            showArrow={false}
          />
          <ListItem
            left={<User size={24} color="rgba(0, 0, 0, 0.9)" strokeWidth={1.5} />}
            title={<span className="font-medium">用户名</span>}
            right={
              <div className="flex items-center gap-1">
                <span className="text-gray-500 opacity-60">{username}</span>
                <img src={iconArrowRightSmall} alt="" className="w-3 h-6" />
              </div>
            }
            showArrow={false}
            border={false}
          />
        </List>

        {/* 偏好设置 */}
        <div className="mt-4 mb-1 px-1">
          <span className="text-xs text-gray-500">偏好设置</span>
        </div>
        <List className="rounded-[20px]">
          <ListItem
            left={<Globe size={24} color="rgba(0, 0, 0, 0.9)" strokeWidth={1.5} />}
            title={<span className="font-medium">语言选择</span>}
            right={
              <div className="flex items-center gap-1">
                <span className="text-gray-500 opacity-60">{language}</span>
                <img src={iconArrowRightSmall} alt="" className="w-3 h-6" />
              </div>
            }
            showArrow={false}
            onClick={() => {
              // 语言选择逻辑
              const languages = ["简体中文", "English", "日本語"]
              const currentIndex = languages.indexOf(language)
              const nextIndex = (currentIndex + 1) % languages.length
              setLanguage(languages[nextIndex])
            }}
          />
          <ListItem
            left={<Moon size={24} color="rgba(0, 0, 0, 0.9)" strokeWidth={1.5} />}
            title={<span className="font-medium">深色模式</span>}
            right={
              <Switch
                modelValue={darkModeEnabled}
                onUpdateModelValue={setDarkModeEnabled}
              />
            }
            showArrow={false}
            border={false}
          />
        </List>

        {/* 通知设置 */}
        <div className="mt-4 mb-1 px-1">
          <span className="text-xs text-gray-500">通知设置</span>
        </div>
        <List className="rounded-[20px]">
          <ListItem
            left={<Mail size={24} color="rgba(0, 0, 0, 0.9)" strokeWidth={1.5} />}
            title={<span className="font-medium">邮件通知</span>}
            right={
              <Switch
                modelValue={emailNotificationEnabled}
                onUpdateModelValue={setEmailNotificationEnabled}
              />
            }
            showArrow={false}
          />
          <ListItem
            left={<Monitor size={24} color="rgba(0, 0, 0, 0.9)" strokeWidth={1.5} />}
            title={<span className="font-medium">桌面通知</span>}
            right={
              <Switch
                modelValue={desktopNotificationEnabled}
                onUpdateModelValue={setDesktopNotificationEnabled}
              />
            }
            showArrow={false}
            border={false}
          />
        </List>
      </div>

      <div className="h-7 flex justify-center mt-4">
        <div className="w-28 h-1.5 rounded-full bg-gray-300"></div>
      </div>
    </div>
  )
}

export default App