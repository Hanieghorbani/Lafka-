import React from "react"
import Sidebar from "../../components/Admin-panel/Sidebar/Sidebar"
import { Outlet } from "react-router-dom"
export default function index() {
  return (
    <div className="bg-zinc-200 w-full">
      <Sidebar />
      <div>
        <Outlet />
      </div>
    </div>
  )
}
