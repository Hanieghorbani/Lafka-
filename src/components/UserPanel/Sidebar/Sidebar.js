import React, { useContext } from "react"
import ContextData from "../../../ContextData/ContextData"
import { Link, useNavigate } from "react-router-dom"
import swal from "sweetalert"

export default function Sidebar() {
  const contextDatas = useContext(ContextData)
  const navigate = useNavigate()
  return (
    <div className="md:col-span-3 sm:hidden md:block">
      <div className="sidebar border-l-2 border-primary">
        <span className="text-zinc-700 text-xl">
          {contextDatas.userInfos.name}
        </span>
        <ul className="mt-4 space-y-7">
          <li className="sidebar__item">
            <Link
              className="font-bold"
              to={"/my-account"}
              onClick={() => contextDatas.setUserPanelSubMenu("پیشخوان")}
            >
              پیشخوان
            </Link>
          </li>
          <li className="sidebar__item">
            <Link
              className="font-bold"
              to={"orders"}
              onClick={() => contextDatas.setUserPanelSubMenu("سفارشات")}
            >
              سفارشات
            </Link>
          </li>
          <li className="sidebar__item">
            <Link
              className="font-bold"
              to={"edit-account"}
              onClick={() => contextDatas.setUserPanelSubMenu("جزئیات حساب کاربری")}
            >
              جزئیات حساب کاربری
            </Link>
          </li>
          <li className="sidebar__item" style={{ cursor: "pointer" }}>
            <a
              className="font-bold"
              onClick={() => contextDatas.logoutHandler()}
            >
              خروج از سیستم
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
