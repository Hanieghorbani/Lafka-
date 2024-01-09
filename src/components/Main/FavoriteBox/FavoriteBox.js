import React, { useContext } from "react"
import ContextData from "../../../ContextData/ContextData"
import { BsFillTrashFill } from "react-icons/bs"
import { IoCloseOutline } from "react-icons/io5"

export default function FavoriteBox(prodInfos) {
  const { addToCart, removeFavorite } = useContext(ContextData)
  const { cover, name, price } = prodInfos
  return (
    <div className="flex sm:flex-col md:flex-row justify-between items-center border p-3 rounded-2xl text-sm relative gap-5">
      <BsFillTrashFill
        className="text-xl text-zinc-700 cursor-pointer hover:text-zinc-500 transition-all duration-300 sm:hidden md:block"
        onClick={() => removeFavorite(prodInfos)}
      />
      <IoCloseOutline
        className="absolute top-0 right-1 text-2xl text-zinc-800 cursor-pointer hover:text-info transition-all duration-300 sm:block md:hidden"
        onClick={() => removeFavorite(prodInfos)}
      />
      <img
        src={`http://localhost:8000/courses/covers/${cover}`}
        alt="food"
        className="w-20 cursor-pointer"
      />
      <p className="text-info cursor-pointer hover:text-primary">{name}</p>
      <p className="font-[faNum] text-zinc-500">
        {new Intl.NumberFormat().format(price)} تومان
      </p>
      <p className="text-zinc-500">موجود</p>
      <button
        className="btn-yearStorySelect"
        onClick={() => addToCart(prodInfos)}
      >
        افزودن به سبد خرید
      </button>
    </div>
  )
}
