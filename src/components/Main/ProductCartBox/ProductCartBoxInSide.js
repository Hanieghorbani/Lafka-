import React, { useContext } from "react"
import { BsFillTrashFill } from "react-icons/bs"
import { IoCloseOutline } from "react-icons/io5"
import ContextData from "../../../ContextData/ContextData"
export default function ProductCartBox(prodInfos) {
  const {cover, name, price,count} = prodInfos
  const contextDatas = useContext(ContextData)
  return (
    <div className="flex items-center justify-between bg-zinc-300 p-4 rounded-2xl relative">
      <div className="flex items-center sm:gap-1 md:gap-5">
        <img
          src={`http://localhost:8000/courses/covers/${cover}`}
          alt="food"
          className="sm:w-16 md:w-[4.5rem] p-2 rounded-xl cursor-pointer"
        />
        <div className="text-sm sm:space-y-1 md:space-y-3">
          <p className="text-zinc-800 cursor-pointer hover:text-primary">
            {name}
          </p>
          <div className="flex text-info font-[faNum] items-center gap-2">
            <p className="font-[faNum]">{count}</p>
            <IoCloseOutline />
            <p className="font-[faNum]">
              {new Intl.NumberFormat().format(price)}تومان
            </p>
          </div>
        </div>
      </div>

      <BsFillTrashFill className="text-xl text-zinc-800 cursor-pointer hover:text-info transition-all duration-300 sm:hidden md:block" onClick={()=>contextDatas.minesCart(prodInfos,true)}/>
      <IoCloseOutline className="absolute top-0 right-1 text-xl text-zinc-800 cursor-pointer hover:text-info transition-all duration-300 sm:block md:hidden" onClick={()=>contextDatas.minesCart(prodInfos,true)}/>
    </div>
  )
}
