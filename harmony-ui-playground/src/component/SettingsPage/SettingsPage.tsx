import { useState, type ReactNode } from "react"
import { TitleBar } from "../TitleBar"
import { List, ListItem } from "../List"
import { Switch } from "../Switch"
import { WifiIcon } from "../WifiIcon"
import {
  Plane,
  Bluetooth,
  MapPin,
  Moon,
  Sun,
  Type,
  Monitor,
  Bell,
  Volume2,
  Smartphone,
  Share2,
  Printer,
  Watch,
  Battery,
  Fingerprint,
  AppWindow,
  Shield,
  Globe,
  Calendar,
  Keyboard,
  Save,
  RefreshCw,
  Info,
} from "lucide-react"
import type { TitleBarProps } from "../TitleBar/title-bar"
import "./SettingsPage.css"

export interface SettingsPageProps {
  /** 页面标题 */
  title?: string
  /** 左侧图标点击回调 */
  onLeftClick?: TitleBarProps["left-click"]
  /** 右侧图标点击回调 */
  onRightClick?: TitleBarProps["right-click"]
  /** 用户头像 */
  userAvatar?: string
  /** 用户名称 */
  userName?: string
  /** 设备名称 */
  deviceName?: string
  className?: string
  children?: ReactNode
}

// 图标组件 - 使用 lucide-react
const Icon = ({
  name,
  size = 22,
  color = "var(--devui-primary)",
}: {
  name: string
  size?: number
  color?: string
}) => {
  const iconMap: Record<string, ReactNode> = {
    airplane: <Plane size={size} color={color} />,
    bluetooth: <Bluetooth size={size} color={color} />,
    wifi: <WifiIcon />,
    mobile: <Smartphone size={size} color={color} />,
    nfc: <Share2 size={size} color={color} />,
    location: <MapPin size={size} color={color} />,
    darkmode: <Moon size={size} color={color} />,
    brightness: <Sun size={size} color={color} />,
    font: <Type size={size} color={color} />,
    screen: <Monitor size={size} color={color} />,
    ring: <Bell size={size} color={color} />,
    notification: <Volume2 size={size} color={color} />,
    vibrate: <Smartphone size={size} color={color} />,
    dnd: <Bell size={size} color={color} />,
    lock: <Shield size={size} color={color} />,
    banner: <Bell size={size} color={color} />,
    协同: <Share2 size={size} color={color} />,
    投屏: <Monitor size={size} color={color} />,
    print: <Printer size={size} color={color} />,
    watch: <Watch size={size} color={color} />,
    battery: <Battery size={size} color={color} />,
    power: <Battery size={size} color={color} />,
    storage: <Save size={size} color={color} />,
    fingerprint: <Fingerprint size={size} color={color} />,
    face: <Shield size={size} color={color} />,
    find: <MapPin size={size} color={color} />,
    privacy: <Shield size={size} color={color} />,
    app: <AppWindow size={size} color={color} />,
    default: <AppWindow size={size} color={color} />,
    permission: <Shield size={size} color={color} />,
    bell: <Bell size={size} color={color} />,
    language: <Globe size={size} color={color} />,
    time: <Calendar size={size} color={color} />,
    keyboard: <Keyboard size={size} color={color} />,
    backup: <Save size={size} color={color} />,
    update: <RefreshCw size={size} color="var(--devui-success)" />,
    phone: <Smartphone size={size} color={color} />,
  }

  return <>{iconMap[name] || <Info size={size} color={color} />}</>
}

// 设置分组
interface SettingsGroup {
  id: string
  title?: string
  items: {
    id: string
    title: string
    subtitle?: string
    icon?: string
    iconColor?: string
    right?: ReactNode
    rightText?: string
    showArrow?: boolean
    onClick?: () => void
  }[]
}

export function SettingsPage({
  title = "设置",
  onLeftClick,
  onRightClick,
  deviceName = "Mate 70 Pro",
  className,
  children,
}: SettingsPageProps) {
  const [airplaneModeEnabled, setAirplaneModeEnabled] = useState(false)
  const [wifiEnabled, setWifiEnabled] = useState(true)
  const [bluetoothEnabled, setBluetoothEnabled] = useState(true)
  const [nfcEnabled, setNfcEnabled] = useState(false)
  const [locationEnabled, setLocationEnabled] = useState(true)
  const [darkModeEnabled, setDarkModeEnabled] = useState(false)
  const [doNotDisturbEnabled, setDoNotDisturbEnabled] = useState(false)

  const networkGroup: SettingsGroup = {
    id: "network",
    items: [
      {
        id: "airplane",
        title: "飞行模式",
        icon: "airplane",
        right: (
          <Switch
            modelValue={airplaneModeEnabled}
            onUpdateModelValue={setAirplaneModeEnabled}
          />
        ),
      },
    ],
  }

  const wirelessGroup: SettingsGroup = {
    id: "wireless",
    title: "无线和网络",
    items: [
      {
        id: "wifi",
        title: "WLAN",
        subtitle: "已连接 Home-Network-5G",
        icon: "wifi",
        right: (
          <Switch
            modelValue={wifiEnabled}
            onUpdateModelValue={setWifiEnabled}
          />
        ),
      },
      {
        id: "bluetooth",
        title: "蓝牙",
        subtitle: "已连接 2 个设备",
        icon: "bluetooth",
        right: (
          <Switch
            modelValue={bluetoothEnabled}
            onUpdateModelValue={setBluetoothEnabled}
          />
        ),
      },
      {
        id: "nfc",
        title: "NFC",
        icon: "nfc",
        right: (
          <Switch
            modelValue={nfcEnabled}
            onUpdateModelValue={setNfcEnabled}
          />
        ),
      },
      {
        id: "hotspot",
        title: "移动网络",
        icon: "mobile",
        showArrow: true,
        rightText: "中国联通",
      },
    ],
  }

  const locationGroup: SettingsGroup = {
    id: "location",
    title: "位置信息",
    items: [
      {
        id: "location-setting",
        title: "位置信息",
        icon: "location",
        right: (
          <Switch
            modelValue={locationEnabled}
            onUpdateModelValue={setLocationEnabled}
          />
        ),
      },
      {
        id: "location-mode",
        title: "定位模式",
        showArrow: true,
        rightText: "高精确度",
      },
    ],
  }

  const displayGroup: SettingsGroup = {
    id: "display",
    title: "显示和亮度",
    items: [
      {
        id: "darkmode",
        title: "深色模式",
        icon: "darkmode",
        right: (
          <Switch
            modelValue={darkModeEnabled}
            onUpdateModelValue={setDarkModeEnabled}
          />
        ),
      },
      {
        id: "brightness",
        title: "亮度",
        icon: "brightness",
        showArrow: true,
      },
      {
        id: "fontsize",
        title: "字体大小",
        icon: "font",
        showArrow: true,
        rightText: "标准",
      },
      {
        id: "resolution",
        title: "屏幕分辨率",
        icon: "screen",
        showArrow: true,
        rightText: "FHD+",
      },
    ],
  }

  const notificationGroup: SettingsGroup = {
    id: "notification",
    title: "通知",
    items: [
      {
        id: "dnd",
        title: "免打扰",
        icon: "dnd",
        right: (
          <Switch
            modelValue={doNotDisturbEnabled}
            onUpdateModelValue={setDoNotDisturbEnabled}
          />
        ),
      },
      {
        id: "lock-screen",
        title: "锁屏通知",
        icon: "lock",
        showArrow: true,
      },
      {
        id: "banner",
        title: "横幅通知",
        icon: "banner",
        showArrow: true,
      },
    ],
  }

  const deviceGroup: SettingsGroup = {
    id: "device",
    title: "设备连接",
    items: [
      {
        id: "pc",
        title: "多设备协同",
        icon: "协同",
        showArrow: true,
      },
      {
        id: "screen",
        title: "无线投屏",
        icon: "投屏",
        showArrow: true,
      },
      {
        id: "printer",
        title: "打印",
        icon: "print",
        showArrow: true,
      },
      {
        id: "wearable",
        title: "穿戴设备",
        icon: "watch",
        showArrow: true,
      },
    ],
  }

  const batteryGroup: SettingsGroup = {
    id: "battery",
    title: "电池",
    items: [
      {
        id: "battery-setting",
        title: "电池",
        icon: "battery",
        showArrow: true,
        rightText: "78%",
      },
      {
        id: "power-save",
        title: "省电模式",
        icon: "power",
        showArrow: true,
      },
    ],
  }

  const storageGroup: SettingsGroup = {
    id: "storage",
    title: "存储",
    items: [
      {
        id: "storage-setting",
        title: "存储",
        icon: "storage",
        showArrow: true,
        rightText: "128GB / 256GB",
      },
    ],
  }

  const securityGroup: SettingsGroup = {
    id: "security",
    title: "安全与隐私",
    items: [
      {
        id: "fingerprint",
        title: "指纹",
        icon: "fingerprint",
        showArrow: true,
        rightText: "已添加",
      },
      {
        id: "face",
        title: "面部识别",
        icon: "face",
        showArrow: true,
        rightText: "已添加",
      },
      {
        id: "password",
        title: "锁屏密码",
        icon: "lock",
        showArrow: true,
      },
      {
        id: "find-device",
        title: "查找设备",
        icon: "find",
        showArrow: true,
      },
      {
        id: "privacy",
        title: "隐私空间",
        icon: "privacy",
        showArrow: true,
      },
    ],
  }

  const appGroup: SettingsGroup = {
    id: "app",
    title: "应用和服务",
    items: [
      {
        id: "apps",
        title: "应用管理",
        icon: "app",
        showArrow: true,
      },
      {
        id: "default-apps",
        title: "默认应用",
        icon: "default",
        showArrow: true,
      },
      {
        id: "permissions",
        title: "权限管理",
        icon: "permission",
        showArrow: true,
      },
      {
        id: "notifications-manage",
        title: "应用通知",
        icon: "bell",
        showArrow: true,
      },
    ],
  }

  const systemGroup: SettingsGroup = {
    id: "system",
    title: "系统和更新",
    items: [
      {
        id: "language",
        title: "语言和地区",
        icon: "language",
        showArrow: true,
        rightText: "简体中文",
      },
      {
        id: "time",
        title: "日期和时间",
        icon: "time",
        showArrow: true,
      },
      {
        id: "keyboard",
        title: "键盘",
        icon: "keyboard",
        showArrow: true,
      },
      {
        id: "backup",
        title: "备份和恢复",
        icon: "backup",
        showArrow: true,
      },
      {
        id: "system-update",
        title: "系统更新",
        icon: "update",
        iconColor: "var(--devui-success)",
        showArrow: true,
        subtitle: "已是最新版本",
      },
    ],
  }

  const aboutGroup: SettingsGroup = {
    id: "about",
    items: [
      {
        id: "about-device",
        title: "关于手机",
        icon: "phone",
        showArrow: true,
        rightText: deviceName,
      },
    ],
  }

  const allGroups = [
    networkGroup,
    wirelessGroup,
    locationGroup,
    displayGroup,
    notificationGroup,
    deviceGroup,
    batteryGroup,
    storageGroup,
    securityGroup,
    appGroup,
    systemGroup,
    aboutGroup,
  ]

  const renderGroup = (group: SettingsGroup, index: number) => {
    const showTitle = group.title && group.items.length > 0

    return (
      <div key={group.id} className="settings-group">
        {showTitle && (
          <div className="settings-group__title">{group.title}</div>
        )}
        <List className="settings-group__list">
          {group.items.map((item, itemIndex) => (
            <ListItem
              key={item.id}
              title={item.title}
              subtitle={item.subtitle}
              left={item.icon ? <Icon name={item.icon} color={item.iconColor} /> : undefined}
              right={item.right}
              rightText={item.rightText}
              showArrow={item.showArrow}
              border={itemIndex < group.items.length - 1}
              onClick={item.onClick}
            />
          ))}
        </List>
        {index < allGroups.length - 1 && (
          <div className="settings-group__spacer" />
        )}
      </div>
    )
  }

  return (
    <div className={`settings-page ${className || ""}`}>
      <TitleBar
        title={title}
        left-click={onLeftClick}
        right-click={onRightClick}
      />
      <div className="settings-page__content">
        {children || allGroups.map(renderGroup)}
      </div>
    </div>
  )
}

export default SettingsPage