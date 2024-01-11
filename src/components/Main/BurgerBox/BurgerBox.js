import React, { useState, useContext, useEffect } from "react"
import ContextData from "../../../ContextData/ContextData"
import Sidebar from "../../Sidebar/Sidebar"
import EnergyBox from "../EnergyBox/EnergyBox"

import { Dialog } from "@headlessui/react"
import { Link } from "react-router-dom"
// icons
import { GiScales } from "react-icons/gi"
import { FaRegHeart } from "react-icons/fa"
import { VscHeartFilled, VscHeart } from "react-icons/vsc"

// end of icons

export default function BurgerBox(prodInfos) {
  const [isOpenSidebarOrder, setIsOpenSidebarOrder] = useState(false)
  const contextDatas = useContext(ContextData)
  const [isInFavourites, setIsInFavourites] = useState(false)
  const { favourites, removefavourite, addfavouriteHandler } = contextDatas
  const { price, cover, name, shortName, description, scale, discount, _id } =
    prodInfos

  useEffect(() => {
    setIsInFavourites(favourites.find((prod) => prod._id == _id))
  })

  return (
    <div className="burgerBox">
      <div className="relative border p-3 rounded-2xl">
        <div className="bg-price text-secondary rounded-xl p-2 inline text-xs absolute top-5 right-5">
          <p
            className={`${
              discount && "line-through text-yellow-100 text-[9px]"
            } `}
          >
            <span className="font-[faNum]">
              {new Intl.NumberFormat().format(price)}
            </span>{" "}
            تومان
          </p>
          {discount != 0 && (
            <p className="">
              <span className="font-[faNum]">
                {new Intl.NumberFormat().format(
                  price - (price * discount) / 100
                )}
              </span>{" "}
              تومان
            </p>
          )}
        </div>
        <Link to={`/productInfo/${shortName}`}>
          <img
            src={`https://lafka-back.liara.run/courses/covers/${cover}`}
            className=" cursor-pointer w-full"
          />
        </Link>
        {isInFavourites ? (
          <VscHeartFilled
            className="absolute bottom-5 left-5 sm:text-2xl lg:text-3xl text-info cursor-pointer"
            onClick={() => removefavourite(prodInfos)}
          />
        ) : (
          <VscHeart
            className="absolute bottom-5 left-5 sm:text-2xl lg:text-3xl cursor-pointer text-primary"
            onClick={() => addfavouriteHandler(prodInfos)}
          />
        )}
      </div>

      <div className="flex flex-col items-center gap-3 mt-1 p-5">
        <h5 className="">{name}</h5>
        <p className="text-gray-500 text-center text-sm">{description}</p>
        <button
          className="btn-order font-bold mt-4"
          onClick={() => setIsOpenSidebarOrder(true)}
        >
          سفارش دهید
        </button>
      </div>

      <Sidebar isOpen={isOpenSidebarOrder} setIsOpen={setIsOpenSidebarOrder}>
        <div className="flex h-full flex-col py-6 shadow-xl bg-dark text-white">
          {/* top section  */}
          <div className="px-4 sm:px-6 py-5 bg-black/20">
            <Dialog.Title className="text-lg flex justify-between items-center">
              اطلاعات محصول
            </Dialog.Title>
          </div>

          {/* content section  */}
          <div className="relative mt-6 px-4 sm:px-6 space-y-5 sm:overflow-y-scroll lg:overflow-y-hidden overflow-x-hidden contentBurgerBox">
            <h1 className="text-2xl">{name}</h1>
            <p className="text-sm text-zinc-300">{description}</p>

            {/* scale  */}
            <div className="flex gap-2 items-center bg-zinc-200 w-2/3 rounded-2xl p-2 text-dark text-sm">
              <GiScales className="text-lg" />
              <p>
                سایز: <span className="font-[faNum]">{scale}</span> گرم
              </p>
            </div>
            {/* end of  scale  */}

            <div className="flex sm:flex-col lg:flex-row items-center justify-between sm:gap-5 lg:gap-0">
              <h3 className="text-2xl">
                <span className="font-[faNum]">
                  {new Intl.NumberFormat().format(price)}
                </span>
                تومان
              </h3>
              <div className="flex items-center gap-2">
                <button
                  className="btn-yearStorySelect text-sm"
                  onClick={() => {
                    contextDatas.addToCart(prodInfos)
                    setIsOpenSidebarOrder(false)
                  }}
                >
                  افزودن به سبد خرید
                </button>
                {isInFavourites ? (
                  <VscHeartFilled
                    className="sm:text-2xl lg:text-3xl text-info cursor-pointer"
                    onClick={() => removefavourite(prodInfos)}
                  />
                ) : (
                  <VscHeart
                    className="sm:text-2xl lg:text-3xl cursor-pointer text-info"
                    onClick={() => addfavouriteHandler(prodInfos)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </Sidebar>
    </div>
  )
}
