import React, { useState, useEffect, Fragment } from "react"
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

// end of icons
import "./BurgerBox.css"
export default function BurgerBox({ price, cover, name, shortName }) {
  const [isOpenSidebarOrder, setIsOpenSidebarOrder] = useState(false)
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
        <p className="text-gray-500 text-center text-sm">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
          از طراحان گرافیک است
        </p>
        <button
          className="btn-order font-bold mt-4"
          onClick={() => setIsOpenSidebarOrder(true)}
        >
          سفارش دهید
        </button>
      </div>

      <Transition.Root show={isOpenSidebarOrder} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsOpenSidebarOrder(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex pl-10 w-[98%] md:w-1/2">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto  w-full relative">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-500"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-500"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                        <button
                          type="button"
                          className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={() => setIsOpenSidebarOrder(false)}
                        >
                          <span className="absolute -inset-2.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="flex h-full flex-col py-6 shadow-xl bg-dark text-white">
                      {/* top section  */}
                      <div className="px-4 sm:px-6 py-5 bg-black/20">
                        <Dialog.Title className="text-lg flex justify-between items-center">
                          اطلاعات محصول
                        </Dialog.Title>
                      </div>

                      {/* content section  */}
                      <div className="relative mt-6 px-4 sm:px-6 space-y-5 sm:overflow-y-scroll lg:overflow-y-hidden overflow-x-hidden contentBurgerBox">
                        <h1 className="text-2xl">برگر گوشت رویال</h1>
                        <p className="text-sm text-zinc-300">
                          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                          چاپ و با استفاده از طراحان گرافیک است
                        </p>

                        {/* scale  */}
                        <div className="flex gap-2 items-center bg-zinc-200 md:w-1/3 sm:w-1/2 rounded-2xl p-2 text-dark text-sm">
                          <GiScales className="text-lg" />
                          <p>
                            سایز: <span className="font-[faNum]">300</span> گرم
                          </p>
                        </div>
                        {/* end of  scale  */}

                        {/* energy info  */}
                        <div className="grid sm:grid-cols-3 lg:grid-cols-5 md:gap-5 sm:gap-2">
                          <EnergyBox title="انرژی" value=" 34 کال" di="29%" />
                          <EnergyBox title="پروتئین" value=" 34 گرم" di="64%" />
                          <EnergyBox title="چربی" value=" 34 گرم" di="17%" />
                          <EnergyBox
                            title="حداکثر چربی"
                            value=" 34 گرم"
                            di="10%"
                          />
                          <EnergyBox
                            title="کربوهیدرات"
                            value=" 34 گرم"
                            di="7%"
                          />
                        </div>
                        <p className="text-xs text-zinc-300">
                          *DI: مصرف روزانه را بر اساس رژیم 2000 کالری توصیه می
                          شود
                        </p>
                        {/*end of energy info  */}

                        <div className="flex gap-3 items-center text-sm">
                          <FaHeartbeat className="text-info text-xl" />
                          <p>آلرژی زا: شیر ، تخم مرغ ، سویا ، گلوتن</p>
                        </div>
                        <div className="flex sm:flex-col lg:flex-row items-center justify-between sm:gap-5 lg:gap-0">
                          <h3 className="text-2xl">
                            <span className="font-[faNum]">93000</span>تومان
                          </h3>

                          <div className="flex items-center gap-2">
                            <Counter count={1} />
                            <button className="btn-yearStorySelect text-sm">
                              سفارش
                            </button>
                            <CiHeart className="text-5xl cursor-pointer hover:text-info" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  )
}
