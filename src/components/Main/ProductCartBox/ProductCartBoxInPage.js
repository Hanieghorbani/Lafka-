import React, { useContext, useState } from "react"
import { BsFillTrashFill } from "react-icons/bs"
import { IoCloseOutline } from "react-icons/io5"
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6"

import { CiSquarePlus, CiSquareMinus } from "react-icons/ci"
import Counter from "../Counter/Counter"
import ContextData from "../../../ContextData/ContextData"
export default function ProductCartBoxInPage(prodInfos) {
  const { cover, name, price, count } = prodInfos
  const [mainCount, setMainCount] = useState(count)
  const contextDatas = useContext(ContextData)
  return (
    <div className="flex sm:flex-col md:flex-row sm:gap-5 md:gap-0 items-center justify-between bg-zinc-200 p-4 rounded-2xl relative text-zinc-600 text-sm">
      <BsFillTrashFill
        className="text-xl text-zinc-500 cursor-pointer hover:text-info transition-all duration-300 sm:hidden md:block"
        onClick={() => contextDatas.minesCart(prodInfos, true)}
      />
      <IoCloseOutline
        className="absolute top-0 right-1 text-3xl text-zinc-800 cursor-pointer hover:text-info transition-all duration-300 sm:block md:hidden"
        onClick={() => contextDatas.minesCart(prodInfos, true)}
      />
      <img
        src={`http://localhost:8000/courses/covers/${cover}`}
        alt="food"
        className="sm:w-32 md:w-[4.5rem] md:-mr-10 lg:-mr-20 p-2 rounded-xl cursor-pointer"
      />
      <p className="text-zinc-500 cursor-pointer hover:text-primary">{name}</p>
      <p className="font-[faNum]">
        {new Intl.NumberFormat().format(price)} تومان
      </p>

      {/* counter  */}
      <div className="bg-zinc-200 flex justify-between text-xl items-center text-zinc-400 w-20 p-2 rounded-2xl">
        <FaCircleMinus
          className="hover:bg-white rounded-full cursor-pointer"
          onClick={() => {
            if (mainCount > 0) {
              setMainCount((prev) => prev - 1)
              contextDatas.minesCart(prodInfos, false)
            }
          }}
        />
        <p className="text-dark font-[faNum]">{mainCount}</p>

        <FaCirclePlus
          className="hover:bg-white rounded-full cursor-pointer"
          onClick={() => {
            setMainCount((prev) => prev + 1)
            contextDatas.addToCart(prodInfos)
          }}
        />
      </div>
      <p className="font-[faNum]">
        {new Intl.NumberFormat().format(price * mainCount)} تومان
      </p>
    </div>
  )
}
