import React, { useContext, useState } from "react"
import "./Sidebar.css"
import { Link, useNavigate } from "react-router-dom"
// import AuthContext from "../../../userContext/authContext"
import swal from "sweetalert"

export default function Sidebar() {
  // const contextData = useContext(AuthContext)
  const navigate = useNavigate()
  function logoutHandler() {
    // swal({
    //   text: " آیا می خواهید از حساب کاربری خود خارج شوید؟",
    //   icon: "warning",
    //   buttons: ["لغو", "خروج"],
    // }).then((res) => {
    //   if (res) {
    //     swal({
    //       text: "شما با موفقیت از حساب کاربری خود خارج شدید",
    //       icon: "success",
    //       dangerMode: false,
    //       buttons: "تایید",
    //     }).then((val) => {
    //       contextData.logout()
    //       navigate("/")
    //     })
    //   }
    // })
  }
  return (
    <div id="sidebar" className="col-2">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <Link to={"/"}>
            <img src="/images/logo/Logo.png" alt="Logo" />
          </Link>
        </div>

        <div className="sidebar-menu-btn">
          <i className="fas fa-bars"></i>
        </div>
      </div>
      <div className="sidebar-menu">
        <ul>
          <li className="active-menu">
            <Link to={"/p-admin"}>
              <span>صفحه اصلی</span>
            </Link>
          </li>
          <li>
            <Link to={"courses"}>
              <span>دوره ها</span>
            </Link>
          </li>
          <li>
            <Link to={"sessions"}>
              <span>جلسات</span>
            </Link>
          </li>
          <li>
            <Link to={"menus"}>
              <span>منو ها</span>
            </Link>
          </li>
          <li>
            <Link to={"articles"}>
              <span>مقاله ها</span>
            </Link>
          </li>
          <li>
            <Link to={"users"}>
              <span>کاربران</span>
            </Link>
          </li>
          <li>
            <Link to={"comments"}>
              <span>نظرات کاربران</span>
            </Link>
          </li>
          <li>
            <Link to={"offs"}>
              <span>کدهای تخفیف</span>
            </Link>
          </li>
          <li>
            <Link to={"discounts"}>
              <span>تخفیف همگانی</span>
            </Link>
          </li>
          <li>
            <Link to={"category"}>
              <span>دسته‌بندی‌ها</span>
            </Link>
          </li>
          <li>
            <Link to={"contacts"}>
              <span>پیغام کاربران</span>
            </Link>
          </li>
          <li>
            <Link to={"tickets"}>
              <span>تیکت‌ها</span>
            </Link>
          </li>
          <li>
            <a href="#" onClick={logoutHandler}>
              <span>خروج</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
