import React, { Fragment, useContext, useState } from "react"

import { Link } from "react-router-dom"
// icons
import { IoHomeOutline } from "react-icons/io5"
import {
  MdOutlineProductionQuantityLimits,
  MdLibraryBooks,
  MdOutlineLocalOffer,
} from "react-icons/md"
import { HiOutlineUsers } from "react-icons/hi2"
import { AiOutlineComment } from "react-icons/ai"
import { BiSolidOffer } from "react-icons/bi"
import { TbCategory } from "react-icons/tb"
import { FaEnvelopeOpenText } from "react-icons/fa6"
import { BsTicketDetailed } from "react-icons/bs"
import { RiLogoutBoxRLine } from "react-icons/ri"
import { IoMdNotifications } from "react-icons/io"
import { IoMdClose } from "react-icons/io"
import { IoMoonSharp, IoHomeSharp } from "react-icons/io5"
//end of icons
import { Dialog, Transition } from "@headlessui/react"
import { XMarkIcon } from "@heroicons/react/24/outline"
import ContextData from "../../../ContextData/ContextData"
import SidebarMain from "../../Sidebar/Sidebar"
export default function Sidebar({ isShowNotifs, setIsShowNotifs }) {
  const contextDatas = useContext(ContextData)
  const { isOpenSidebarMenuPAdmin, setIsOpenSidebarMenuPAdmin } = contextDatas
  return (
    <>
      <div className="bg-zinc-100 w-[20%] fixed top-0 right-0 sm:hidden lg:block">
        {/* logo  */}
        <img
          src="/imgs/pAdmin/logo.png"
          alt=""
          className="w-1/2 mx-auto pt-7"
        />

        {/* context and links  */}
        <div className="pAdmin-links-sidebar space-y-10 px-10 text-lg font-bold text-zinc-700 mt-10 overflow-y-auto h-[80vh] pb-10">
          <Link to={"/p-admin"}>
            <IoHomeOutline />
            <p>صفحه اصلی</p>
          </Link>
          <Link to={"products/1"}>
            <MdOutlineProductionQuantityLimits />
            <p>محصولات</p>
          </Link>
          <Link to={"articles"}>
            <MdLibraryBooks />
            <p>مقاله ها</p>
          </Link>
          <Link to={"users/1"}>
            <HiOutlineUsers />
            <p>کاربران</p>
          </Link>
          <Link to={"comments/1"}>
            <AiOutlineComment />
            <p>نظرات کاربران</p>
          </Link>
          <Link to={"messages"}>
            <FaEnvelopeOpenText />
            <p>پیغام کاربران</p>
          </Link>
          <Link to={"offers"}>
            <MdOutlineLocalOffer />
            <p>کدهای تخفیف</p>
          </Link>
          <Link to={"discount"}>
            <BiSolidOffer />
            <p>تخفیف همگانی</p>
          </Link>
          <Link to={"tickets"}>
            <BsTicketDetailed />
            <p>تیکت ها</p>
          </Link>
          <Link to={"category"}>
            <TbCategory />
            <p>دسته بندی ها</p>
          </Link>
          <Link to={"/p-admin"}>
            <RiLogoutBoxRLine />
            <p>خروج از حساب</p>
          </Link>
        </div>
      </div>
      <SidebarMain
        isOpen={isOpenSidebarMenuPAdmin}
        setIsOpen={setIsOpenSidebarMenuPAdmin}
      >
        <div className="flex h-full flex-col py-6 shadow-xl bg-dark text-white">
          {/* top section  */}
          <div className="px-4 sm:px-6 py-5 bg-black/20">
            <Dialog.Title className="text-lg flex justify-between items-center">
              منو
              <div className="flex items-center gap-2">
                <IoMdNotifications
                  className="border-2 rounded-full p-3 w-12 h-12 cursor-pointer"
                  onMouseEnter={() => {
                    setIsOpenSidebarMenuPAdmin(false)
                    setIsShowNotifs(true)
                  }}
                />
                <IoMoonSharp className="border-2 rounded-full p-3 w-12 h-12 cursor-pointer" />
              </div>
            </Dialog.Title>
          </div>

          <div className="relative mt-6 flex-1 px-4 sm:px-6">
            {/* content section  */}
            <div className="pAdmin-links-sidebar space-y-10 text-lg font-bold mt-10 overflow-y-auto h-[80vh] pb-10">
              <Link
                to={"/p-admin"}
                onClick={() => setIsOpenSidebarMenuPAdmin(false)}
              >
                <IoHomeOutline />
                <p>صفحه اصلی</p>
              </Link>
              <Link
                to={"products/1"}
                onClick={() => setIsOpenSidebarMenuPAdmin(false)}
              >
                <MdOutlineProductionQuantityLimits />
                <p>محصولات</p>
              </Link>
              <Link
                to={"articles"}
                onClick={() => setIsOpenSidebarMenuPAdmin(false)}
              >
                <MdLibraryBooks />
                <p>مقاله ها</p>
              </Link>
              <Link
                to={"users/1"}
                onClick={() => setIsOpenSidebarMenuPAdmin(false)}
              >
                <HiOutlineUsers />
                <p>کاربران</p>
              </Link>
              <Link
                to={"comments/1"}
                onClick={() => setIsOpenSidebarMenuPAdmin(false)}
              >
                <AiOutlineComment />
                <p>نظرات کاربران</p>
              </Link>
              <Link
                to={"messages"}
                onClick={() => setIsOpenSidebarMenuPAdmin(false)}
              >
                <FaEnvelopeOpenText />
                <p>پیغام کاربران</p>
              </Link>
              <Link
                to={"offers"}
                onClick={() => setIsOpenSidebarMenuPAdmin(false)}
              >
                <MdOutlineLocalOffer />
                <p>کدهای تخفیف</p>
              </Link>
              <Link
                to={"discount"}
                onClick={() => setIsOpenSidebarMenuPAdmin(false)}
              >
                <BiSolidOffer />
                <p>تخفیف همگانی</p>
              </Link>
              <Link
                to={"tickets"}
                onClick={() => setIsOpenSidebarMenuPAdmin(false)}
              >
                <BsTicketDetailed />
                <p>تیکت ها</p>
              </Link>
              <Link
                to={"category"}
                onClick={() => setIsOpenSidebarMenuPAdmin(false)}
              >
                <TbCategory />
                <p>دسته بندی ها</p>
              </Link>
              <Link
                to={"/p-admin"}
                onClick={() => contextDatas.logoutHandler()}
              >
                <RiLogoutBoxRLine />
                <p>خروج از حساب</p>
              </Link>
            </div>
          </div>
        </div>
      </SidebarMain>
    </>
  )
}
