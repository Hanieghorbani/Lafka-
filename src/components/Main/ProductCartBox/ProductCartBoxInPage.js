import React from "react"
import { BsFillTrashFill } from "react-icons/bs"
import { IoCloseOutline } from "react-icons/io5"
export default function ProductCartBoxInPage({ img, name, count, price }) {
  return (
    <div className="flex items-center justify-between bg-zinc-200 p-4 rounded-2xl relative text-zinc-600 text-sm">
        <BsFillTrashFill className="text-xl text-zinc-800 cursor-pointer hover:text-info transition-all duration-300 sm:hidden md:block" />
        <IoCloseOutline className="absolute top-0 right-1 text-xl text-zinc-800 cursor-pointer hover:text-info transition-all duration-300 sm:block md:hidden" />
        <img
          src={`/imgs/foods/${img}`}
          alt="food"
          className="sm:w-16 md:w-[4.5rem] -mr-24 p-2 rounded-xl cursor-pointer"
        />
          <p className="text-zinc-500 cursor-pointer hover:text-primary">
            {name}
          </p>
            <p className="font-[faNum]">{price}تومان</p>
            <p className="font-[faNum]">{count}</p>
          <p className="font-[faNum]">{price * count} تومان</p>
    </div>
  )
}
