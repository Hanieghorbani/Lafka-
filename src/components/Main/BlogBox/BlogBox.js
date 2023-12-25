import React from "react"
import { FaRegCircleUser } from "react-icons/fa6"
import { MdAccessTime } from "react-icons/md";
export default function BlogBox({ title, img }) {
  return (
    <div className="space-y-2 cursor-pointer">
      <img src={`/imgs/blogs/${img}`} alt="" className="rounded-3xl" />
      <h1 className="font-[faNum] text-zinc-500 text-xl">{title}</h1>
      <div className="flex gap-5">
        <p className="flex items-center text-zinc-400">
          <FaRegCircleUser className="text-xl ml-1"/>
          حانیه قربانی
        </p>
        <p className="font-[faNum] flex items-center text-zinc-400">
          <MdAccessTime className="text-xl ml-1"/>3 خرداد 1402
        </p>
      </div>
    </div>
  )
}
