import React from "react"

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
//end of icons

export default function Sidebar() {
  return (
    <div className="bg-zinc-100 w-[20%] fixed top-0 right-0">
      {/* logo  */}
      <img src="/imgs/pAdmin/logo.png" alt="" className="w-1/2 mx-auto pt-7" />

      {/* context and links  */}
      <div className="pAdmin-links-sidebar space-y-10 px-10 text-lg font-bold text-zinc-700 mt-10 overflow-y-auto h-[80vh] mb-10">
        <Link to={"/p-admin"}>
          <IoHomeOutline />
          <p>صفحه اصلی</p>
        </Link>
        <Link to={"products"}>
          <MdOutlineProductionQuantityLimits />
          <p>محصولات</p>
        </Link>
        <Link to={"articles"}>
          <MdLibraryBooks />
          <p>مقاله ها</p>
        </Link>
        <Link to={"users"}>
          <HiOutlineUsers />
          <p>کاربران</p>
        </Link>
        <Link to={"comments"}>
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
        <Link to={"/p-admin"}>
          <TbCategory />
          <p>دسته بندی ها</p>
        </Link>
        <Link to={"/p-admin"}>
          <RiLogoutBoxRLine />
          <p>خروج از حساب</p>
        </Link>
      </div>
    </div>
  )
}