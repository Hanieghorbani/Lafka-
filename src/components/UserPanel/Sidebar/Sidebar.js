import React, { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import swal from "sweetalert"
import ContextData from "../../../ContextData/ContextData"

export default function Sidebar() {
  const contextDatas = useContext(ContextData)
  const navigate = useNavigate()
  function logoutHandler() {
    swal({
      text: " آیا می خواهید از حساب کاربری خود خارج شوید؟",
      icon: "warning",
      buttons: ["لغو", "خروج"],
    }).then((res) => {
      if (res) {
        swal({
          text: "شما با موفقیت از حساب کاربری خود خارج شدید",
          icon: "success",
          dangerMode: false,
          buttons: "تایید",
        }).then((val) => {
          // contextData.logout()
          navigate("/")
        })
      }
    })
  }
  return (
    <div className="col-span-3">
      <div className="sidebar border-l-2 border-primary">
        <span className="text-zinc-700 text-xl">{contextDatas.userInfos.name}</span>
        <ul className="mt-4">
          <li className="sidebar__item">
            <Link className="block py-4 font-bold text-xl" to={"/my-account"}>
              پیشخوان
            </Link>
          </li>
          <li className="sidebar__item">
            <Link className="block py-4 font-bold text-xl" to={"orders"}>
              سفارشات
            </Link>
          </li>
          <li className="sidebar__item">
            <Link className="block py-4 font-bold text-xl" to={"edit-account"}>
              جزئیات حساب کاربری
            </Link>
          </li>
          <li className="sidebar__item">
            <Link
              className="block py-4 font-bold text-xl"
              to={"products"}
            >
              دوره های خریداری شده
            </Link>
          </li>
          <li className="sidebar__item">
            <Link className="block py-4 font-bold text-xl" to={"tickets"}>
              تیکت های پشتیبانی
            </Link>
          </li>
          <li className="sidebar__item" style={{ cursor: "pointer" }}>
            <a className="block py-4 font-bold text-xl" onClick={logoutHandler}>
              خروج از سیستم
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
