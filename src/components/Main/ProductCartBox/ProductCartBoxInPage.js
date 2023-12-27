import React, { useState } from "react"
import { BsFillTrashFill } from "react-icons/bs"
import { IoCloseOutline } from "react-icons/io5"
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci"
import Counter from "../Counter/Counter"
export default function ProductCartBoxInPage({ img, name, count, price }) {
  const [mainCount, setMainCount] = useState(count)
  return (
    <div className="flex sm:flex-col md:flex-row sm:gap-5 md:gap-0 items-center justify-between bg-zinc-200 p-4 rounded-2xl relative text-zinc-600 text-sm">
      <BsFillTrashFill className="text-xl text-zinc-800 cursor-pointer hover:text-info transition-all duration-300 sm:hidden md:block" />
      <IoCloseOutline className="absolute top-0 right-1 text-3xl text-zinc-800 cursor-pointer hover:text-info transition-all duration-300 sm:block md:hidden" />
      <img
        src={`/imgs/foods/${img}`}
        alt="food"
        className="sm:w-32 md:w-[4.5rem] md:-mr-10 lg:-mr-20 p-2 rounded-xl cursor-pointer"
      />
      <p className="text-zinc-500 cursor-pointer hover:text-primary">{name}</p>
      <p className="font-[faNum]">{price}تومان</p>
      <Counter count={count}/>
      <p className="font-[faNum]">{price * mainCount} تومان</p>
    </div>
  )
}
