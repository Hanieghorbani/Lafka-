import React from "react"
import { FaRegHeart } from "react-icons/fa"
export default function BurgerBox({ price, img, name }) {
  return (
    <div>
      <div className="relative border p-3 rounded-2xl">
        <p className="bg-price text-secondary rounded-xl p-2 inline text-xs absolute top-5 right-5">
          <span className="font-[faNum]">
            {new Intl.NumberFormat().format(price)}
          </span>{" "}
          تومان
        </p>
        <img src={`/imgs/foods/${img}`} className=" cursor-pointer w-full" />
        <FaRegHeart className="text-xl absolute bottom-5 left-5 cursor-pointer hover:text-primary" />
      </div>

      <div className="flex flex-col items-center gap-3 mt-5 p-5">
        <h5 className="">{name}</h5>
        <p className="text-gray-500 text-center text-sm">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
          از طراحان گرافیک است
        </p>
        <button className="btn-order font-bold mt-4">سفارش دهید</button>
      </div>
    </div>
  )
}
