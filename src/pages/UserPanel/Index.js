import React, { useContext, Fragment, useState } from "react"
import { Outlet } from "react-router-dom"
import Sidebar from "../../components/UserPanel/Sidebar/Sidebar"
import Header from "../../components/Main/Header/Header"
import Footer from "../../components/Main/Footer/Footer"
import ContextData from "../../ContextData/ContextData"
import { FaBars } from "react-icons/fa6"
import { Dialog, Transition } from "@headlessui/react"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { Link } from "react-router-dom"
export default function Index() {
  const contextDatas = useContext(ContextData)
  const [isOpenSidebarMenu, setIsOpenSidebarMenu] = useState(false)
  return (
    <div>
      <div className="bg-primary">
        <Header />
      </div>

      <section className="mt-60">
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
      <Transition.Root show={isOpenSidebarMenu} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsOpenSidebarMenu(false)}
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
              <div className="pointer-events-none  fixed inset-y-0 right-0 flex sm:w-2/3 md:w-1/2 lg:1/3 pl-10">
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
                          onClick={() => setIsOpenSidebarMenu(false)}
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
                              contextDatas.setUserPanelSubMenu(
                                "جزئیات حساب کاربری"
                              )
                            }}
                          >
                            جزئیات حساب کاربری
                          </Link>
                          <li
                            className="sidebar__item"
                            style={{ cursor: "pointer" }}
                          >
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
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  )
}
