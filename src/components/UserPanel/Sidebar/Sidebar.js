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
          contextDatas.logout()
          navigate("/")
        })
      }
    })
  }
  return (
    <div className="col-span-3">
      <div className="sidebar border-l-2 border-primary">
        <span className="text-zinc-700 text-xl">{contextDatas.userInfos.name}</span>
        <ul className="mt-4 space-y-7">
          <li className="sidebar__item">
            <Link className="font-bold" to={"/my-account"}>
              پیشخوان
            </Link>
          </li>
          <li className="sidebar__item">
            <Link className="font-bold" to={"orders"}>
              سفارشات
            </Link>
          </li>
          <li className="sidebar__item">
            <Link className="font-bold" to={"edit-account"}>
              جزئیات حساب کاربری
            </Link>
          </li>
          <li className="sidebar__item">
            <Link
              className="font-bold"
              to={"products"}
            >
              دوره های خریداری شده
            </Link>
          </li>
          <li className="sidebar__item" style={{ cursor: "pointer" }}>
            <a className="font-bold" onClick={logoutHandler}>
              خروج از سیستم
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
