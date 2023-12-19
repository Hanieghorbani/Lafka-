import React from "react"
import "./index.css"
import { Outlet } from "react-router-dom"
import Sidebar from "../../components/AdminPanel/Sidebar/Sidebar"
import Topbar from "../../components/AdminPanel/Topbar/Topbar"
export default function index() {
  return (
    <>
      <div id="content">
        <Sidebar />

        <div id="home" className="col-10">
          <Topbar />

          <div className="container-fluid" id="home-content">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}
