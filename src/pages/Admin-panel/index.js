import React from "react"
import Sidebar from "../../components/Admin-panel/Sidebar/Sidebar"
import { Outlet } from "react-router-dom"
import Topbar from "../../components/Admin-panel/Topbar/Topbar"
export default function index() {
  return (
    <div className="bg-zinc-200 w-full relative flex">
      <Sidebar />
      <div className="w-3/4 mt-10 sticky right-[23%] pb-40">
        <Topbar />
        <Outlet />
      </div>
    </div>
  )
}
