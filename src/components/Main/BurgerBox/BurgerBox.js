import React, { useState, useEffect, Fragment, useContext } from "react"
import { FaRegHeart } from "react-icons/fa"
import { Dialog, Transition } from "@headlessui/react"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { Link } from "react-router-dom"
import EnergyBox from "../EnergyBox/EnergyBox"
import Counter from "../Counter/Counter"
// icons
import { CiUser, CiHeart, CiShoppingCart, CiSearch } from "react-icons/ci"
import { GiScales } from "react-icons/gi"
import { FaHeartbeat } from "react-icons/fa"
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6"

// end of icons
import "./BurgerBox.css"
import ContextData from "../../../ContextData/ContextData"

import Sidebar from "../../Sidebar/Sidebar"
export default function BurgerBox(prodInfos) {
  const [isOpenSidebarOrder, setIsOpenSidebarOrder] = useState(false)
  const contextDatas = useContext(ContextData)
  const { price, cover, name, shortName, description, scale } = prodInfos
  return (
    <div className="burgerBox">
      <div className="relative border p-3 rounded-2xl">
        <p className="bg-price text-secondary rounded-xl p-2 inline text-xs absolute top-5 right-5">
          <span className="font-[faNum]">
            {new Intl.NumberFormat().format(price)}
          </span>{" "}
          تومان
        </p>
        <Link to={`/productInfo/${shortName}`}>
          <img
            src={`http://localhost:8000/courses/covers/${cover}`}
            className=" cursor-pointer w-full"
          />
          <FaRegHeart className="text-xl absolute bottom-5 left-5 cursor-pointer hover:text-primary" />
        </Link>
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
            <div className="flex gap-2 items-center bg-zinc-200 md:w-1/3 sm:w-1/2 rounded-2xl p-2 text-dark text-sm">
              <GiScales className="text-lg" />
              <p>
                سایز: <span className="font-[faNum]">{scale}</span> گرم
              </p>
            </div>
            {/* end of  scale  */}

            {/* energy info  */}
            <div className="grid sm:grid-cols-3 lg:grid-cols-5 md:gap-5 sm:gap-2">
              <EnergyBox title="انرژی" value=" 34 کال" di="29%" />
              <EnergyBox title="پروتئین" value=" 34 گرم" di="64%" />
              <EnergyBox title="چربی" value=" 34 گرم" di="17%" />
              <EnergyBox title="حداکثر چربی" value=" 34 گرم" di="10%" />
              <EnergyBox title="کربوهیدرات" value=" 34 گرم" di="7%" />
            </div>
            <p className="text-xs text-zinc-300">
              *DI: مصرف روزانه را بر اساس رژیم 2000 کالری توصیه می شود
            </p>
            {/*end of energy info  */}

            <div className="flex gap-3 items-center text-sm">
              <FaHeartbeat className="text-info text-xl" />
              <p>آلرژی زا: شیر ، تخم مرغ ، سویا ، گلوتن</p>
            </div>
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
                  سفارش
                </button>
                <CiHeart className="text-5xl cursor-pointer hover:text-info" />
              </div>
            </div>
          </div>
        </div>
      </Sidebar>
    </div>
  )
}
