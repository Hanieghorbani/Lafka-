import React, { useState, useEffect, Fragment, useContext } from "react"
// icons
import { FaPhoneAlt } from "react-icons/fa"
import { FaBars, FaCreditCard, FaAngleDown } from "react-icons/fa6"
import { CiUser, CiHeart, CiShoppingCart, CiSearch } from "react-icons/ci"
import { FiUserPlus } from "react-icons/fi"
import { AiOutlineSearch } from "react-icons/ai"
import { IoIosLogOut } from "react-icons/io"
// end of icons

import { Dialog, Transition } from "@headlessui/react"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { Link } from "react-router-dom"
import ProductCartBox from "../ProductCartBox/ProductCartBoxInSide"
import ContextData from "../../../ContextData/ContextData"
import useScroll from "../../../hooks/useScroll"
export default function Header() {
  // const [isOpenSidebarMenu, setIsOpenSidebarMenu] = useState(false)
  // const [isOpenSidebarCart, setIsOpenSidebarCart] = useState(false)
  // const [isOpenSideSearch, setIsOpenSideSearch] = useState(false)
  // const [isFixed, setIsFixed] = useState(false)
  const [isFixed] = useScroll(67)
  const contextDatas = useContext(ContextData)

  return (
    <div
      className={`w-full  z-50 text-white container-primary transition-all duration-500 py-5 fixed top-0 ${
        isFixed ? " bg-primary" : "bg-inherit"
      }`}
    >
      {/* show admin panel for admins  */}
      {contextDatas.userInfos.role == "ADMIN" && (
        <Link
          to={"/p-admin"}
          className=" absolute -top-10 right-10 bg-secondary p-4 pb-2 rounded-b-3xl cursor-pointer flex gap-1  flex-col items-center group hover:top-0 hover:pb-4 transition-all duration-500 text-dark"
        >
          <p>پنل ادمین</p>
          <FaAngleDown className="group-hover:rotate-180 transition-all duration-500" />
        </Link>
      )}
      {/*end of show admin panel for admins  */}

      {/* top header  */}
      <div className="flex items-center sm:justify-center xl:justify-between w-1/2  mx-auto relative">
        {/* xl */}
        <div className="gap-5 sm:hidden xl:flex text-sm">
          <Link to={"/"} className="li-header">
            خانه
          </Link>
          <Link to={"/about"} className="li-header">
            درباره ما
          </Link>
          <Link to={"/locations"} className="li-header">
            شعبه ها
          </Link>
        </div>

        <img
          className={`w-100 transition-all duration-500 ${
            isFixed ? "h-20" : "h-[6.5rem]"
          }`}
          src="/imgs/logos/flame-burgers-logo-clean.png"
          alt="logo"
        />

        <div className="gap-5 sm:hidden xl:flex text-sm">
          <Link to={"/shop/1"} className="li-header">
            سفارش آنلاین
          </Link>
          <Link to={"/blogs"} className="li-header">
            وبلاگ
          </Link>
          <Link to={"/contact"} className="li-header">
            تماس با ما
          </Link>
        </div>
      </div>

      {/* bottom header  */}
      <div className="flex justify-between items-center -mt-7">
        {/* right section */}
        {/* md */}
        <div className="shadow-xl p-2 rounded-3xl sm:hidden md:flex flex-col items-center">
          <p className=" text-gray-300">برای سفارش آنلاین تماس بگیرید</p>
          <p className="flex gap-2 items-center mt-1">
            <FaPhoneAlt />
            <span className="font-[faNum]">{contextDatas.infos.phone}</span>
          </p>
        </div>

        {/* sm  */}
        <div className="md:hidden flex items-center justify-center bg-lime-500 rounded-full h-12 w-12 shadow-xl">
          <FaPhoneAlt className="" />
        </div>

        {/* left section */}

        {/* lg */}
        <div className="shadow-xl p-3 rounded-3xl text-3xl gap-4 sm:hidden xl:flex">
          {contextDatas.isLoggedIn ? (
            <Link to={"/login"}>
              <CiUser className="li-header" />
            </Link>
          ) : (
            <Link to={"/login"}>
              <IoIosLogOut className="li-header" />
            </Link>
          )}

          <Link to={"/favorites"} className="relative">
            <span className="badge-header text-white">0</span>
            <CiHeart className="li-header" />
          </Link>
          <div
            className="relative"
            onClick={() => contextDatas.setIsOpenSidebarCart(true)}
          >
            <span className="badge-header ">
              {contextDatas.cart.reduce(
                (total, product) => total + product.count,
                0
              )}
            </span>
            <CiShoppingCart className="li-header" />
          </div>

          <CiSearch
            className="li-header"
            onClick={() => contextDatas.setIsOpenSideSearch(true)}
          />
        </div>

        {/* sm */}
        <div
          className="xl:hidden flex items-center justify-center bg-red-500 rounded-full h-12 w-12 shadow-xl"
          onClick={() => contextDatas.setIsOpenSidebarMenu(true)}
        >
          <FaBars />
        </div>
      </div>

      {/* sidebar menu */}
      <Transition.Root show={contextDatas.isOpenSidebarMenu} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => contextDatas.setIsOpenSidebarMenu(false)}
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
                          onClick={() =>
                            contextDatas.setIsOpenSidebarMenu(false)
                          }
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
                          <div className="flex text-2xl gap-3">
                            <div
                              className="relative"
                              onClick={() => {
                                contextDatas.setIsOpenSidebarMenu(false)
                                contextDatas.setIsOpenSidebarCart(true)
                              }}
                            >
                              <span className="badge-header">0</span>
                              <CiShoppingCart className="li-header" />
                            </div>

                            <div className="relative">
                              <span className="badge-header">0</span>
                              <CiHeart className="li-header" />
                            </div>
                          </div>
                        </Dialog.Title>
                      </div>

                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        {/* content section  */}
                        <ul className="flex flex-col space-y-5 text-white">
                          <Link
                            to={"/"}
                            className="li-sidebar"
                            onClick={() =>
                              contextDatas.setIsOpenSidebarMenu(false)
                            }
                          >
                            خانه
                          </Link>
                          <Link
                            to={"/about"}
                            className="li-sidebar"
                            onClick={() =>
                              contextDatas.setIsOpenSidebarMenu(false)
                            }
                          >
                            درباره ما
                          </Link>
                          <Link
                            to={"/locations"}
                            className="li-sidebar"
                            onClick={() =>
                              contextDatas.setIsOpenSidebarMenu(false)
                            }
                          >
                            شعبه ها
                          </Link>
                          <Link
                            to={"/shop"}
                            className="li-sidebar"
                            onClick={() =>
                              contextDatas.setIsOpenSidebarMenu(false)
                            }
                          >
                            سفارش آنلاین
                          </Link>
                          <Link
                            to={"/blogs"}
                            className="li-sidebar"
                            onClick={() =>
                              contextDatas.setIsOpenSidebarMenu(false)
                            }
                          >
                            وبلاگ
                          </Link>
                          <Link
                            to={"/contact"}
                            className="li-sidebar"
                            onClick={() =>
                              contextDatas.setIsOpenSidebarMenu(false)
                            }
                          >
                            تماس با ما
                          </Link>

                          <li
                            onClick={() => {
                              contextDatas.setIsOpenSidebarMenu(false)
                              contextDatas.setIsOpenSideSearch(true)
                            }}
                            className="li-sidebar"
                          >
                            جستجو
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

      {/* sidebar cart  */}
      <Transition.Root show={contextDatas.isOpenSidebarCart} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => contextDatas.setIsOpenSidebarCart(false)}
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
              <div className="pointer-events-none  fixed inset-y-0 right-0 flex  md:w-1/2 lg:1/3 pl-10">
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
                          onClick={() =>
                            contextDatas.setIsOpenSidebarCart(false)
                          }
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
                          سبد خرید
                          <div className="flex text-2xl gap-3">
                            <Link to={"/login"}>
                              <CiUser className="li-header" />
                            </Link>

                            <Link to={"/favorites"} className="relative">
                              <span className="badge-header text-white">0</span>
                              <CiHeart className="li-header" />
                            </Link>
                          </div>
                        </Dialog.Title>
                      </div>

                      <div className="relative mt-6 px-4 sm:px-6">
                        {/* content section  */}
                        <ul className="flex flex-col space-y-5 text-white">
                          {contextDatas.cart.length ? (
                            <>
                              {contextDatas.cart.map((item) => (
                                <ProductCartBox key={item._id} {...item} />
                              ))}
                            </>
                          ) : (
                            <>
                              <span className="text-lg text-zinc-200">
                                هنوز هیچ محصولی به سبد خرید خود اضافه نکردید!
                              </span>
                            </>
                          )}
                        </ul>
                      </div>

                      <div className="flex items-center justify-between py-2 px-4 sm:px-6 mt-10 bg-black/20">
                        <p>جمع کل:</p>
                        <p>
                          {" "}
                          <span className="font-[faNum]">
                            {new Intl.NumberFormat().format(
                              contextDatas.cart.reduce(
                                (total, product) =>
                                  total + product.price * product.count,
                                0
                              )
                            )}
                          </span>{" "}
                          تومان
                        </p>
                      </div>

                      <div className="flex sm:flex-col md:flex-row sm:gap-5 md:gap-0 md:items-center justify-between px-4 sm:px-6 mt-8">
                        <Link
                          to={"/cart"}
                          className="bg-zinc-300 shadow-inner text-black rounded-[2.5rem] py-3 px-5 hover:text-info transition-all duration-500 flex gap-1 items-center"
                          onClick={() =>
                            contextDatas.setIsOpenSidebarCart(false)
                          }
                        >
                          {" "}
                          <CiShoppingCart className="text-xl font-bold" />
                          مشاهده سبد خرید{" "}
                        </Link>
                        <button
                          className="bg-zinc-300  shadow-inner text-black rounded-[2.5rem] py-3 px-5 hover:text-info transition-all duration-500 flex gap-1 items-center"
                          onClick={() =>
                            contextDatas.setIsOpenSidebarCart(false)
                          }
                          disabled= {!contextDatas.cart.length}
                        >
                          <FaCreditCard />
                          تصویه حساب
                        </button>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* sidebar for  search   */}
      <Transition.Root show={contextDatas.isOpenSideSearch} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => contextDatas.setIsOpenSideSearch(false)}
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
              <div className="pointer-events-none  fixed inset-y-0 right-0 flex  md:w-1/2 lg:1/3 pl-10">
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
                          onClick={() =>
                            contextDatas.setIsOpenSideSearch(false)
                          }
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
                          جستجو
                          <div className="flex text-2xl gap-3">
                            <Link to={"/login"}>
                              <CiUser className="li-header" />
                            </Link>

                            <Link to={"/favorites"} className="relative">
                              <span className="badge-header text-white">0</span>
                              <CiHeart className="li-header" />
                            </Link>
                          </div>
                        </Dialog.Title>
                      </div>

                      <div className="relative mt-6 px-4 sm:px-6 flex flex-col gap-3 justify-center items-center">
                        {/* content section  */}
                        <div className="relative w-full">
                          <input
                            type="text"
                            className="form-contact"
                            placeholder="جستجوی محصولات"
                          />
                          <Link to={"/search"}>
                            <AiOutlineSearch className=" absolute top-1 left-2 text-dark cursor-pointer text-3xl" />
                          </Link>
                        </div>

                        <span className="text-xs">برای جستجو تایپ کنید...</span>
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
