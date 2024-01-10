import React, { useContext, useEffect, useState } from "react"
import Sidebar from "../../components/UserPanel/Sidebar/Sidebar"
import Header from "../../components/Main/Header/Header"
import Footer from "../../components/Main/Footer/Footer"
import SidebarMain from "../../components/Sidebar/Sidebar"
import ContextData from "../../ContextData/ContextData"

import { FaBars } from "react-icons/fa6"

import { Dialog } from "@headlessui/react"
import { Link, Outlet } from "react-router-dom"

export default function Index() {
  const contextDatas = useContext(ContextData)
  const [isOpenSidebarMenu, setIsOpenSidebarMenu] = useState(false)
  useEffect(() => window.scrollTo(0, 0), [])
  return (
    <div>
      <div className="bg-primary">
        <Header />
      </div>

      <section className="sm:mt-40 lg:mt-60">
        <div className="py-7 border-y-2 border-primary ">
          <div className="container-primary flex justify-between items-center">
            <div>
              <span className="block font-bold sm:text-xl md:text-2xl">
                حساب کاربری من
              </span>
              <span className="text-xs text-gray-600">
                {contextDatas.userPanelSubMenu}
              </span>
            </div>
            <FaBars
              className=" cursor-pointer sm:block md:hidden text-xl"
              onClick={() => setIsOpenSidebarMenu(true)}
            />
          </div>
        </div>
        <div className="my-12">
          <div className="container-primary">
            <div className="grid grid-cols-12 md:gap-10">
              <Sidebar />
              <div className="sm:col-span-12 md:col-span-9 md:pr:12">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />

      {/* sidebar for menus user-panel in sm size  */}

      <SidebarMain isOpen={isOpenSidebarMenu} setIsOpen={setIsOpenSidebarMenu}>
        <div className="flex h-full flex-col py-6 shadow-xl bg-dark text-white">
          {/* top section  */}
          <div className="px-4 sm:px-6 py-5 bg-black/20">
            <Dialog.Title className="text-lg flex justify-between items-center">
              منو
            </Dialog.Title>
          </div>

          <div className="relative mt-6 flex-1 px-4 sm:px-6">
            {/* content section  */}
            <ul className="flex flex-col space-y-5 text-white">
              <Link
                to={"/my-account"}
                className="li-sidebar"
                onClick={() => {
                  setIsOpenSidebarMenu(false)
                  contextDatas.setUserPanelSubMenu("پیشخوان")
                }}
              >
                پیشخوان
              </Link>
              <Link
                to={"orders"}
                className="li-sidebar"
                onClick={() => {
                  setIsOpenSidebarMenu(false)
                  contextDatas.setUserPanelSubMenu("سفارشات")
                }}
              >
                سفارشات
              </Link>
              <Link
                to={"edit-account"}
                className="li-sidebar"
                onClick={() => {
                  setIsOpenSidebarMenu(false)
                  contextDatas.setUserPanelSubMenu("جزئیات حساب کاربری")
                }}
              >
                جزئیات حساب کاربری
              </Link>
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
      </SidebarMain>
    </div>
  )
}
