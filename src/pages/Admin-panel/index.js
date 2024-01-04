import React, { useState, Fragment } from "react"
import Sidebar from "../../components/Admin-panel/Sidebar/Sidebar"
import { Outlet } from "react-router-dom"
import Topbar from "../../components/Admin-panel/Topbar/Topbar"

export default function Index() {
  const [isShowNotifs, setIsShowNotifs] = useState(false)
  
  return (
    <div className="bg-zinc-200 w-full relative flex">
      <Sidebar isShowNotifs={isShowNotifs} setIsShowNotifs={setIsShowNotifs}/>
      <div className="sm:w-full lg:w-3/4 mt-10 sticky right-[23%] pb-40">
        <Topbar isShowNotifs={isShowNotifs} setIsShowNotifs={setIsShowNotifs}/>
        <Outlet />
      </div>
    </div>
  )
}
