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

      <Transition.Root show={isOpenSidebarMenuPAdmin} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsOpenSidebarMenuPAdmin(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none  fixed inset-y-0 right-0 flex sm:w-full md:w-1/2 lg:w-1/3 pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-full relative">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-500"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-500"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                        <button
                          type="button"
                          className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={() => setIsOpenSidebarMenuPAdmin(false)}
                        >
                          <span className="absolute -inset-2.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </Transition.Child>
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
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}
