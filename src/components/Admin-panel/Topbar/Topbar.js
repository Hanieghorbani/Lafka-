import React, { useContext } from "react"
import { IoMdNotifications } from "react-icons/io"
import { IoMoonSharp, IoHomeSharp } from "react-icons/io5"
import ContextData from '../../../ContextData/ContextData.js'
export default function Topbar() {
  const contextDatas = useContext(ContextData)
  return (
    <div className="rounded-3xl py-3 px-7 bg-zinc-100 flex justify-between items-center w-full">
      <div className="flex gap-8">
      <IoHomeSharp className="border-2 rounded-full p-3 w-12 h-12 cursor-pointer"/>
      <IoMdNotifications className="border-2 rounded-full p-3 w-12 h-12 cursor-pointer"/>
      <IoMoonSharp className="border-2 rounded-full p-3 w-12 h-12 cursor-pointer"/>
      </div>
      <div className="pr-5 border-r-4 border-zinc-200">
        <div>
          <img src="" alt="" />
          <div className="text-center">
         
          <p className="font-bold"> {contextDatas.userInfos.name}</p>
          <p className="text-sm">ادمین</p>
          </div>
        </div>
      </div>
    </div>
  )
}
