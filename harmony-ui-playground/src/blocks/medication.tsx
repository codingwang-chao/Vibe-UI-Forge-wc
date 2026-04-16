"use client"

import { useState } from "react"
import { StatusBar } from "@/component/StatusBar"
import { FloatLayer } from "@/component/FloatLayer"
import { ServiceCard } from "@/component/ServiceCard"
import { ServiceCardStatus } from "@/component/ServiceCard/ServiceCardStatus"
import { ServiceCardItem } from "@/component/ServiceCard/ServiceCardItem"

import iconMedication from "./assets/pixso-icons/icon-medication-9-3308.png"
import iconSmallCancel from "./assets/pixso-icons/icon-small-cancel.png"

export default function MedicationPage() {
  const [open, setOpen] = useState(true)

  const textTitle = "服药"
  const textDesc = "为确保药效及稳定病情，按时服药和正确服药是最好的方式"
  const textAction = "服药"
  const textMedicineName = "复合维生素"
  const textMedicineMeta = "1粒,凉水服用,饭后"
  const textDone = "已服药"

  const schedules = [
    { time: "12:00", status: "pending", items: [textMedicineName, textMedicineName] },
    { time: "18:00", status: "pending", items: [textMedicineName] },
    { time: "08:00", status: "done", items: [textMedicineName], doneTime: "08:01" },
  ]

  return (
    <div className="w-[360px] mx-auto bg-gray-100">
      <StatusBar time="08:08" backgroundColor="#f1f3f5" />

      <FloatLayer
        modelValue={open}
        onUpdateModelValue={setOpen}
        closeOnClickMask={false}
        showClose={false}
        showGrab={false}
        panelClass="max-w-[360px] mx-auto px-4"
        panelStyle={{
          background: "#f5f5f5",
          borderRadius: "32px 32px 0 0",
          height: 748,
          maxHeight: 748
        }}
        headPreset="titlebar"
        titleClass="!pt-2"
        close={
          <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <img src={iconSmallCancel} alt="" className="w-[18px] h-[18px]" />
          </button>
        }
        title={
          <div>
            <h1 className="text-xl font-bold">{textTitle}</h1>
            <p className="text-sm text-gray-500 mt-1">{textDesc}</p>
          </div>
        }
      >
        <div className="w-full max-w-[328px] mx-auto space-y-3 pb-4">
          {schedules.map((schedule) => (
            <ServiceCard
              key={schedule.time}
              title={schedule.time}
              variant={schedule.status === "done" ? "muted" : "white"}
              extra={
                <ServiceCardStatus
                  variant={schedule.status === "done" ? "light" : "primary"}
                  text={schedule.status === "done" ? textDone : textAction}
                />
              }
            >
              {schedule.items.map((medicine, index) => (
                <ServiceCardItem
                  key={index}
                  name={medicine}
                  subtitle={textMedicineMeta}
                  time={schedule.doneTime}
                  border={index < schedule.items.length - 1}
                  icon={<img src={iconMedication} alt="" className="w-5 h-5" />}
                />
              ))}
            </ServiceCard>
          ))}
        </div>
      </FloatLayer>
    </div>
  )
}