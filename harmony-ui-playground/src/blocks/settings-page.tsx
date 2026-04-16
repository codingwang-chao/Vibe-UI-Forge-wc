"use client"

import { useState } from "react"
import { StatusBar } from "@/component/StatusBar"
import { TitleBar } from "@/component/TitleBar"
import { List, ListItem } from "@/component/List"
import { Switch } from "@/component/Switch"

import iconChevronBack from "./assets/pixso-icons/icon-chevron-backward.png"
import iconArrowRightSmall from "./assets/pixso-icons/icon-arrow-right-small.png"

import {
  WifiIcon,
  Bluetooth,
  MapPin,
  Moon,
  Sun,
  Bell,
  Volume2,
  Shield,
  Save,
  Globe,
  Calendar,
  RefreshCw,
  Smartphone,
} from "lucide-react"

/**
 * 设置页面 - 鸿蒙风格
 *
 * 设计规范调整记录：
 *
 * 1. 导航栏标题字体属性：
 *    - 字号: 20px
 *    - 字重: 700 (Bold)
 *    - 行高: 20px
 *    - 颜色: rgba(0, 0, 0, 0.898)
 *
 * 2. List 标题字体属性：
 *    - 字号: 16px
 *    - 字重: 500 (Medium)
 *    - 行高: 22px
 *    - 颜色: rgba(0, 0, 0, 0.9)
 *
 * 3. List 分组间距: 12px (mt-3)
 *
 * 4. 导航栏与第一个 List 间距: 8px (mt-2)
 *
 * 5. 状态栏背景色: #f3f4f6 (与页面背景一致)
 *
 * 6. List 圆角: 20px
 *
 * 7. 单行 ListItem 高度: 64px
 *
 * 8. List 图标属性：
 *    - 尺寸: 24px
 *    - 颜色: rgba(0, 0, 0, 0.9)
 *    - 描边宽度: 1.5px
 *
 * 9. 开关打开颜色: #0a59f7 (主题色)
 *
 * 10. List 右侧说明文本属性：
 *     - 字号: 14px
 *     - 字重: 400 (Regular)
 *     - 行高: 20px
 *     - 颜色: rgba(0, 0, 0, 0.6)
 *
 * 11. 系统更新右侧说明文本颜色: #0a59f7 (主题色)
 *
 * 12. 多条 ListItem 的卡片显示分割线（中间项显示，最后一项隐藏）
 *
 * 13. 最后一个 List 距离底部栏间距: 16px (mt-4)
 */
function SettingsPage() {
  const [wifiEnabled, setWifiEnabled] = useState(true)
  const [bluetoothEnabled, setBluetoothEnabled] = useState(true)
  const [locationEnabled, setLocationEnabled] = useState(true)
  const [darkModeEnabled, setDarkModeEnabled] = useState(false)
  const [notificationEnabled, setNotificationEnabled] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)

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
        {/* 无线和网络 */}
        <List className="rounded-[20px] mt-2">
          <ListItem
            left={<WifiIcon size={24} color="rgba(0, 0, 0, 0.9)" strokeWidth={1.5} />}
            title={<span className="font-medium">WLAN</span>}
            right={
              <Switch
                modelValue={wifiEnabled}
                onUpdateModelValue={setWifiEnabled}
              />
            }
            showArrow={false}
          />
          <ListItem
            left={<Bluetooth size={24} color="rgba(0, 0, 0, 0.9)" strokeWidth={1.5} />}
            title={<span className="font-medium">蓝牙</span>}
            right={
              <Switch
                modelValue={bluetoothEnabled}
                onUpdateModelValue={setBluetoothEnabled}
              />
            }
            showArrow={false}
          />
          <ListItem
            left={<MapPin size={24} color="rgba(0, 0, 0, 0.9)" strokeWidth={1.5} />}
            title={<span className="font-medium">位置信息</span>}
            right={
              <div className="flex items-center gap-1">
                <span className="text-gray-500 opacity-60">已开启</span>
                <img src={iconArrowRightSmall} alt="" className="w-3 h-6" />
              </div>
            }
            showArrow={false}
            border={false}
          />
        </List>

        {/* 显示和亮度 */}
        <List className="rounded-[20px] mt-3">
          <ListItem
            left={darkModeEnabled ? <Moon size={24} color="rgba(0, 0, 0, 0.9)" strokeWidth={1.5} /> : <Sun size={24} color="rgba(0, 0, 0, 0.9)" strokeWidth={1.5} />}
            title={<span className="font-medium">深色模式</span>}
            right={
              <Switch
                modelValue={darkModeEnabled}
                onUpdateModelValue={setDarkModeEnabled}
              />
            }
            showArrow={false}
          />
          <ListItem
            left={<Sun size={24} color="rgba(0, 0, 0, 0.9)" strokeWidth={1.5} />}
            title={<span className="font-medium">亮度</span>}
            right={
              <div className="flex items-center gap-1">
                <span className="text-gray-500 opacity-60">中等</span>
                <img src={iconArrowRightSmall} alt="" className="w-3 h-6" />
              </div>
            }
            showArrow={false}
            border={false}
          />
        </List>

        {/* 通知 */}
        <List className="rounded-[20px] mt-3">
          <ListItem
            left={<Bell size={24} color="rgba(0, 0, 0, 0.9)" strokeWidth={1.5} />}
            title={<span className="font-medium">通知</span>}
            right={
              <Switch
                modelValue={notificationEnabled}
                onUpdateModelValue={setNotificationEnabled}
              />
            }
            showArrow={false}
          />
          <ListItem
            left={<Volume2 size={24} color="rgba(0, 0, 0, 0.9)" strokeWidth={1.5} />}
            title={<span className="font-medium">声音</span>}
            right={
              <Switch
                modelValue={soundEnabled}
                onUpdateModelValue={setSoundEnabled}
              />
            }
            showArrow={false}
            border={false}
          />
        </List>

        {/* 安全与隐私 */}
        <List className="rounded-[20px] mt-3">
          <ListItem
            left={<Shield size={24} color="rgba(0, 0, 0, 0.9)" strokeWidth={1.5} />}
            title={<span className="font-medium">安全与隐私</span>}
            right={
              <div className="flex items-center gap-1">
                <img src={iconArrowRightSmall} alt="" className="w-3 h-6" />
              </div>
            }
            showArrow={false}
            border={false}
          />
        </List>

        {/* 存储与备份 */}
        <List className="rounded-[20px] mt-3">
          <ListItem
            left={<Save size={24} color="rgba(0, 0, 0, 0.9)" strokeWidth={1.5} />}
            title={<span className="font-medium">存储和备份</span>}
            right={
              <div className="flex items-center gap-1">
                <span className="text-gray-500 opacity-60">128GB/256GB</span>
                <img src={iconArrowRightSmall} alt="" className="w-3 h-6" />
              </div>
            }
            showArrow={false}
            border={false}
          />
        </List>

        {/* 系统和更新 */}
        <List className="rounded-[20px] mt-3">
          <ListItem
            left={<Globe size={24} color="rgba(0, 0, 0, 0.9)" strokeWidth={1.5} />}
            title={<span className="font-medium">语言和地区</span>}
            right={
              <div className="flex items-center gap-1">
                <span className="text-gray-500 opacity-60">简体中文</span>
                <img src={iconArrowRightSmall} alt="" className="w-3 h-6" />
              </div>
            }
            showArrow={false}
          />
          <ListItem
            left={<Calendar size={24} color="rgba(0, 0, 0, 0.9)" strokeWidth={1.5} />}
            title={<span className="font-medium">日期和时间</span>}
            right={
              <div className="flex items-center gap-1">
                <img src={iconArrowRightSmall} alt="" className="w-3 h-6" />
              </div>
            }
            showArrow={false}
          />
          <ListItem
            left={<RefreshCw size={24} color="rgba(0, 0, 0, 0.9)" strokeWidth={1.5} />}
            title={<span className="font-medium">系统更新</span>}
            right={
              <div className="flex items-center gap-1">
                <span style={{ color: "#0a59f7" }}>已是最新</span>
                <img src={iconArrowRightSmall} alt="" className="w-3 h-6" />
              </div>
            }
            showArrow={false}
            border={false}
          />
        </List>

        {/* 关于手机 */}
        <List className="rounded-[20px] mt-3">
          <ListItem
            left={<Smartphone size={24} color="rgba(0, 0, 0, 0.9)" strokeWidth={1.5} />}
            title={<span className="font-medium">关于手机</span>}
            right={
              <div className="flex items-center gap-1">
                <span className="text-gray-500 opacity-60">Mate 70 Pro</span>
                <img src={iconArrowRightSmall} alt="" className="w-3 h-6" />
              </div>
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

export default SettingsPage