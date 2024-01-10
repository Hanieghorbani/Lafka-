import React from "react"
import { FaMoneyBill } from "react-icons/fa"

export default function MainInfoBox({ count, title }) {
  return (
    <div className="bg-zinc-100 rounded-2xl text-center">
      <div className="flex flex-col gap-5 p-4">
        <span className="font-bold text-lg">
          {title == "دوره‌ها" ? "محصولات" : 'فروش ها'}
        </span>
        <span className="text-2xl">{count}</span>
        <span className="text-sm">{title == "دوره‌ها" ? "محصولات" : 'فروش ها'} در یک ماه گذشته</span>
      </div>
    </div>
  )
}
