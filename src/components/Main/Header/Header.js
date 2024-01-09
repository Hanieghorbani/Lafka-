import React, { useState, useContext } from "react"
// icons
import { FaPhoneAlt } from "react-icons/fa"
import { FaBars, FaCreditCard, FaAngleDown } from "react-icons/fa6"
import { CiUser, CiHeart, CiShoppingCart, CiSearch } from "react-icons/ci"
import { AiOutlineSearch } from "react-icons/ai"
import { IoIosLogOut } from "react-icons/io"
// end of icons

import { Dialog} from "@headlessui/react"
import { Link } from "react-router-dom"
import ProductCartBox from "../ProductCartBox/ProductCartBoxInSide"
import ContextData from "../../../ContextData/ContextData"
import useScroll from "../../../hooks/useScroll"
import Sidebar from "../../Sidebar/Sidebar"
export default function Header() {
  const [isFixed] = useScroll(67)
  const {
    setUserPanelSubMenu,
    setIsOpenSidebarMenu,
    setIsOpenSideSearch,
    setIsOpenSidebarCart,
    isOpenSidebarMenu,
    isOpenSideSearch,
    isOpenSidebarCart,
    isLoggedIn,
    cart,
    favorites,
    userInfos,
    infos,
  } = useContext(ContextData)
  const [searchValue, setSearchValue] = useState("")
  return (
    <div
      className={`w-full  z-50 text-white container-primary transition-all duration-500 py-5 fixed top-0 ${
        isFixed ? " bg-primary" : "bg-inherit"
      }`}
    >
      {/* show admin panel for admins  */}
      {userInfos.role == "ADMIN" && (
        <Link
          to={"/p-admin"}
          className=" absolute -top-10 right-10 bg-secondary p-4 pb-2 rounded-b-3xl cursor-pointer sm:hidden md:flex gap-1  flex-col items-center group hover:top-0 hover:pb-4 transition-all duration-500 text-dark "
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
            <span className="font-[faNum]">{infos.phone}</span>
          </p>
        </div>

        {/* sm  */}
        <div className="md:hidden flex items-center justify-center bg-lime-500 rounded-full h-12 w-12 shadow-xl">
          <FaPhoneAlt className="" />
        </div>

        {/* left section */}

        {/* lg */}
        <div className="shadow-xl p-3 rounded-3xl text-3xl gap-4 sm:hidden xl:flex">
          {isLoggedIn ? (
            <Link to={"/my-account"}>
              <CiUser className="li-header" />
            </Link>
          ) : (
            <Link to={"/login"}>
              <IoIosLogOut className="li-header" />
            </Link>
          )}

          <Link to={"/favorites"} className="relative">
            <span className="badge-header text-white">{favorites.length}</span>
            <CiHeart className="li-header" />
          </Link>
          <div className="relative" onClick={() => setIsOpenSidebarCart(true)}>
            <span className="badge-header ">
              {cart.reduce((total, product) => total + product.count, 0)}
            </span>
            <CiShoppingCart className="li-header" />
          </div>

          <CiSearch
            className="li-header"
            onClick={() => setIsOpenSideSearch(true)}
          />
        </div>

        {/* sm */}
        <div
          className="xl:hidden flex items-center justify-center bg-red-500 rounded-full h-12 w-12 shadow-xl"
          onClick={() => setIsOpenSidebarMenu(true)}
        >
          <FaBars />
        </div>
      </div>

      {/* sidebar menu */}
      <Sidebar isOpen={isOpenSidebarMenu} setIsOpen={setIsOpenSidebarMenu}>
        <div className="flex h-full flex-col py-6 shadow-xl bg-dark text-white">
          {/* top section  */}
          <div className="px-4 sm:px-6 py-5 bg-black/20">
            <Dialog.Title className="text-lg flex justify-between items-center">
              منو
              <div className="flex text-2xl gap-3">
                <div
                  className="relative"
                  onClick={() => {
                    setIsOpenSidebarMenu(false)
                    setIsOpenSidebarCart(true)
                  }}
                >
                  <span className="badge-header">{cart.reduce((total, product) => total + product.count, 0)}</span>
                  <CiShoppingCart className="li-header" />
                </div>

                <div className="relative">
                  <span className="badge-header">{favorites.length}</span>
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
                onClick={() => setIsOpenSidebarMenu(false)}
              >
                خانه
              </Link>
              <Link
                to={"/about"}
                className="li-sidebar"
                onClick={() => setIsOpenSidebarMenu(false)}
              >
                درباره ما
              </Link>
              <Link
                to={"/locations"}
                className="li-sidebar"
                onClick={() => setIsOpenSidebarMenu(false)}
              >
                شعبه ها
              </Link>
              <Link
                to={"/shop/1"}
                className="li-sidebar"
                onClick={() => setIsOpenSidebarMenu(false)}
              >
                سفارش آنلاین
              </Link>
              <Link
                to={"/blogs"}
                className="li-sidebar"
                onClick={() => setIsOpenSidebarMenu(false)}
              >
                وبلاگ
              </Link>
              <Link
                to={"/contact"}
                className="li-sidebar"
                onClick={() => setIsOpenSidebarMenu(false)}
              >
                تماس با ما
              </Link>
              <Link
                to={isLoggedIn ? "/my-account" : "/login"}
                className="li-sidebar"
                onClick={() => {
                  setIsOpenSidebarMenu(false)
                  setUserPanelSubMenu("پیشخوان")
                }}
              >
                {isLoggedIn ? "حساب کاربری" : "ورود/ثبت نام"}
              </Link>

              <li
                onClick={() => {
                  setIsOpenSidebarMenu(false)
                  setIsOpenSideSearch(true)
                }}
                className="li-sidebar"
              >
                جستجو
              </li>
            </ul>
          </div>
        </div>
      </Sidebar>

      {/* sidebar cart  */}
      <Sidebar isOpen={isOpenSidebarCart} setIsOpen={setIsOpenSidebarCart}>
        <div className="flex h-full flex-col py-6 shadow-xl bg-dark text-white">
          {/* top section  */}
          <div className="px-4 sm:px-6 py-5 bg-black/20">
            <Dialog.Title className="text-lg flex justify-between items-center">
              سبد خرید
              <div className="flex text-2xl gap-3">
                <Link to={"/my-account"}  onClick={()=>setIsOpenSidebarCart(false)}>
                  <CiUser className="li-header" />
                </Link>

                <Link to={"/favorites"} className="relative" onClick={()=>setIsOpenSidebarCart(false)}>
                  <span className="badge-header text-white">{favorites.length}</span>
                  <CiHeart className="li-header" />
                </Link>
              </div>
            </Dialog.Title>
          </div>

          <div className="relative mt-6 px-4 sm:px-6">
            {/* content section  */}
            <ul className="flex flex-col space-y-5 text-white">
              {cart.length ? (
                <>
                  {cart.map((item) => (
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
                  cart.reduce(
                    (total, product) => total + product.price * product.count,
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
              onClick={() => setIsOpenSidebarCart(false)}
            >
              {" "}
              <CiShoppingCart className="text-xl font-bold" />
              مشاهده سبد خرید{" "}
            </Link>
            <Link
              to={"/checkout"}
              className="bg-zinc-300  shadow-inner text-black rounded-[2.5rem] py-3 px-5 hover:text-info transition-all duration-500 flex gap-1 items-center"
              onClick={() => setIsOpenSidebarCart(false)}
            >
              <FaCreditCard />
              تصویه حساب
            </Link>
          </div>
        </div>
      </Sidebar>

      {/* sidebar for  search   */}
      <Sidebar isOpen={isOpenSideSearch} setIsOpen={setIsOpenSideSearch}>
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
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <Link
                to={`/search/${searchValue}`}
                onClick={() => setIsOpenSideSearch(false)}
              >
                <AiOutlineSearch className=" absolute top-1 left-2 text-dark cursor-pointer text-3xl" />
              </Link>
            </div>

            <span className="text-xs">برای جستجو تایپ کنید...</span>
          </div>
        </div>
      </Sidebar>
    </div>
  )
}
