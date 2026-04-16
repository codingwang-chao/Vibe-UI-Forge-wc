"use client"

import { useState } from "react"
import { StatusBar } from "@/component/StatusBar"
import { TitleBar } from "@/component/TitleBar"
import { CloverWeekPanel } from "@/component/CloverWeekPanel"
import { TaskCard } from "@/component/TaskCard"
import { Button } from "@/component/Button"

import iconRise from "./assets/pixso-icons/icon-rise.svg"
import iconExercise from "./assets/pixso-icons/icon-exercise.svg"
import iconStress from "./assets/pixso-icons/icon-stress.svg"
import iconSteps from "./assets/pixso-icons/icon-steps.svg"
import iconDrink from "./assets/pixso-icons/icon-drink.svg"
import iconFood from "./assets/pixso-icons/icon-food.svg"
import iconMeditation from "./assets/pixso-icons/icon-meditation.svg"
import iconSleep from "./assets/pixso-icons/icon-sleep.svg"
import iconBloodPressure from "./assets/pixso-icons/icon-blood-pressure.svg"
import iconMedication from "./assets/pixso-icons/icon-medication.svg"
import iconWeight from "./assets/pixso-icons/icon-weight.svg"

export default function HealthCloverPage() {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0)

  const weekStatuses = ["done", "done", "done", "done", "done", "disabled", "disabled"]

  const cloverLegend = [
    { text: "规律起床", color: "#B18CFE" },
    { text: "锻炼时长", color: "#FF9D42" },
    { text: "压力均值", color: "#50D4C1" },
  ]

  const primaryTasks = [
    { value: "07:30", suffix: "/08:00", title: "规律起床", icon: iconRise },
    { value: "30", suffix: "/60 分钟", title: "锻炼时长", icon: iconExercise },
    { value: "正常", suffix: "", title: "压力均值", icon: iconStress },
  ]

  const optionalTasks = [
    { value: "0", suffix: "/8000 步", title: "步数", icon: iconSteps },
    { value: "0", suffix: "/2000 ml", title: "喝水", icon: iconDrink },
    { value: "0", suffix: "/3 次", title: "饮食记录", icon: iconFood },
    { value: "--", suffix: "/1 次", title: "每日正念", icon: iconMeditation },
    { value: "--", suffix: "/22:30", title: "早睡", icon: iconSleep },
    { value: "0", suffix: "/2 次", title: "血压测量", icon: iconBloodPressure },
    { value: "0", suffix: "/3 次", title: "服药提醒", icon: iconMedication },
    { value: "0", suffix: "/1 次", title: "体重测量", icon: iconWeight },
  ]

  return (
    <div className="w-[360px] min-h-[792px] mx-auto bg-gray-50">
      <StatusBar time="08:08" />

      <TitleBar title="健康三叶草" />

      <div className="px-4">
        <p className="text-sm text-gray-400">4月1日 周二</p>

        <CloverWeekPanel
          modelValue={selectedDayIndex}
          dayStatuses={weekStatuses}
          legend={cloverLegend}
          onUpdateModelValue={setSelectedDayIndex}
        />

        <div className="space-y-3 mt-6">
          {primaryTasks.map((task) => (
            <TaskCard
              key={task.title}
              value={task.value}
              suffix={task.suffix}
              title={task.title}
              actionText="已完成"
              actionTone="accent"
              icon={<img src={task.icon} alt="" className="w-8 h-8" />}
            />
          ))}
        </div>

        <h2 className="text-lg font-bold mt-4">自选任务</h2>

        <div className="space-y-3 mt-2">
          {optionalTasks.map((task) => (
            <TaskCard
              key={task.title}
              value={task.value}
              suffix={task.suffix}
              title={task.title}
              actionText="去查看"
              icon={<img src={task.icon} alt="" className="w-8 h-8" />}
            />
          ))}
        </div>

        <Button type="default" block className="mt-3 h-14 rounded-[20px] text-base font-medium" style={{ boxShadow: "0 1px 0 rgba(0,0,0,0.04)" }}>
          <span className="flex items-center justify-center gap-2 w-full h-full px-3">
            <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 20h4l10.5-10.5a2 2 0 000-2.83L17.33 5a2 2 0 00-2.83 0L4 15.17V20z"
                stroke="rgba(0,0,0,0.75)"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              <path d="M13 7l4 4" stroke="rgba(0,0,0,0.75)" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <span className="font-normal">编辑任务</span>
          </span>
        </Button>
      </div>
    </div>
  )
}