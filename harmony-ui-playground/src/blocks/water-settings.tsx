"use client"

import { useState } from "react"
import { StatusBar } from "@/component/StatusBar"
import { TitleBar } from "@/component/TitleBar"
import { List, ListItem } from "@/component/List"
import { Switch } from "@/component/Switch"

import iconChevronBack from "./assets/pixso-icons/icon-chevron-backward.png"
import iconGoalSetting from "./assets/pixso-icons/icon-goal-setting.png"
import iconRemindHighlight from "./assets/pixso-icons/icon-remind-highlight.png"
import iconArrowRightSmall from "./assets/pixso-icons/icon-arrow-right-small.png"

export default function WaterSettingsPage() {
  const [remindEnabled, setRemindEnabled] = useState(true)

  const textTitle = "喝水设置"
  const textGoal = "目标设定"
  const textReminder = "提醒"
  const textStartTime = "提醒开始时间"
  const textEndTime = "提醒结束时间"
  const textReminderNote = "默认每小时提醒一次。为避免打扰，\"每日喝水\"会在您设置的提醒范围内根据打卡的进度灵活提醒，且12:00~14:00时段午休时间，不进行提醒。"

  return (
    <div className="w-[360px] min-h-[792px] mx-auto bg-gray-100">
      <StatusBar time="08:08" backgroundColor="#f1f3f5" />

      <div className="w-[328px] mx-auto">
        <TitleBar
          title={textTitle}
          leftIcon={iconChevronBack}
          backgroundColor="#f1f3f5"
        />
      </div>

      <div className="px-4">
        <List className="rounded-3xl">
          <ListItem
            left={<img src={iconGoalSetting} alt="" className="w-6 h-6" />}
            title={<span className="font-medium">{textGoal}</span>}
            right={
              <div className="flex items-center gap-1">
                <span className="text-gray-500">2000 ml</span>
                <img src={iconArrowRightSmall} alt="" className="w-3 h-6" />
              </div>
            }
            showArrow={false}
            border={false}
            onClick={() => {}}
          />
        </List>

        <div className="mt-2 rounded-3xl overflow-hidden">
          <List>
            <ListItem
              left={<img src={iconRemindHighlight} alt="" className="w-6 h-6" />}
              title={<span className="font-medium">{textReminder}</span>}
              right={
                <Switch
                  modelValue={remindEnabled}
                  onUpdateModelValue={setRemindEnabled}
                />
              }
              showArrow={false}
              border={false}
            />

            <ListItem
              title={textStartTime}
              right={
                <div className="flex items-center gap-1">
                  <span className="text-gray-500 opacity-60 pl-3">08:00</span>
                  <img src={iconArrowRightSmall} alt="" className="w-3 h-6" />
                </div>
              }
              showArrow={false}
              border={false}
              onClick={() => {}}
            />

            <ListItem
              title={textEndTime}
              right={
                <div className="flex items-center gap-1">
                  <span className="text-gray-500 opacity-60 pl-3">18:00</span>
                  <img src={iconArrowRightSmall} alt="" className="w-3 h-6" />
                </div>
              }
              showArrow={false}
              border={false}
              onClick={() => {}}
            />
          </List>
        </div>

        <p className="text-xs text-gray-500 mt-2 leading-relaxed">
          {textReminderNote}
        </p>
      </div>

      <div className="h-7 flex justify-center">
        <div className="w-28 h-1.5 rounded-full bg-gray-300"></div>
      </div>
    </div>
  )
}