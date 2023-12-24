import React, { useState, useEffect, Fragment } from "react"
import { FaPhoneAlt } from "react-icons/fa"
import { FaBars } from "react-icons/fa6"
import { CiUser, CiHeart, CiShoppingCart, CiSearch } from "react-icons/ci"
import { Dialog, Transition } from "@headlessui/react"
import { XMarkIcon } from "@heroicons/react/24/outline"

export default function Header() {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false)

  const [isFixedTopbar, setIsFixedTopbar] = useState(true)

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleScroll = () => {
    if (window.scrollY > 67) {
      setIsFixedTopbar(false)
    } else {
      setIsFixedTopbar(true)
    }
  }

  return (
    <div
      className={` w-full z-50 bg-primary text-white container-primary py-5 ${
        isFixedTopbar ? "sticky top-0" : 'fixed top-0'
      }`}
    >
      <div className="flex items-center sm:justify-center xl:justify-between w-1/2  mx-auto">
        {/* xl */}
        <ul className="gap-5 sm:hidden xl:flex">
          <li className="li-header">خانه</li>
          <li className="li-header">درباره ما</li>
          <li className="li-header">شعبه ها</li>
        </ul>

        {/* show logo, all times*/}
        <img
          className="w-100 h-24"
          src="/imgs/logos/flame-burgers-logo-clean.png"
          alt="logo"
        />

        {/* xl */}
        <ul className="gap-5 sm:hidden xl:flex">
          <li className="li-header">سفارش آنلاین</li>
          <li className="li-header">وبلاگ</li>
          <li className="li-header">تماس با ما</li>
        </ul>
      </div>
      <div className="flex justify-between items-center">
        {/* right section */}
        {/* md */}
        <div className="shadow-xl p-3 rounded-3xl sm:hidden md:block">
          <p className=" text-gray-300">برای سفارش آنلاین تماس بگیرید</p>
          <p className="flex gap-2 items-center mt-1">
            <FaPhoneAlt />
            <span className="font-[faNum]">09121234567</span>
          </p>
        </div>

        {/* sm  */}
        <div className="md:hidden flex items-center justify-center bg-lime-500 rounded-full h-12 w-12 shadow-xl">
          <FaPhoneAlt className="" />
        </div>

        {/* left section */}

        {/* lg */}
        <div className="shadow-xl p-3 rounded-3xl text-3xl gap-4 sm:hidden xl:flex">
          <CiUser className="li-header" />

          <div className="relative">
            <span className="badge-header ">0</span>
            <CiHeart className="li-header" />
          </div>
          <div className="relative">
            <span className="badge-header ">0</span>
            <CiShoppingCart className="li-header" />
          </div>

          <CiSearch className="li-header" />
        </div>

        {/* sm */}
        <div
          className="xl:hidden flex items-center justify-center bg-red-500 rounded-full h-12 w-12 shadow-xl"
          onClick={() => setIsOpenSidebar(true)}
        >
          <FaBars />
        </div>
      </div>

      {/* sidebar */}
      <Transition.Root show={isOpenSidebar} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsOpenSidebar(false)}
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
              <div className="pointer-events-none  fixed inset-y-0 right-0 flex sm:w-2/3 md:w-1/2 lg:1/3 pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-full relative">
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
                          onClick={() => setIsOpenSidebar(false)}
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
                          منو
                          <div className="flex text-2xl gap-3">
                            <div className="relative">
                              <span className="badge-header">0</span>
                              <CiShoppingCart className="li-header" />
                            </div>

                            <div className="relative">
                              <span className="badge-header">0</span>
                              <CiHeart className="li-header" />
                            </div>
                          </div>
                        </Dialog.Title>
                      </div>

                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        {/* content section  */}
                        <ul className="flex flex-col space-y-5 text-white">
                          <a
                            href="#landing"
                            className="li-sidebar"
                            onClick={() => setIsOpenSidebar(false)}
                          >
                            خانه
                          </a>
                          <a
                            href="#about"
                            className="li-sidebar"
                            onClick={() => setIsOpenSidebar(false)}
                          >
                            درباره ما
                          </a>
                          <a
                            href="#features"
                            className="li-sidebar"
                            onClick={() => setIsOpenSidebar(false)}
                          >
                            شعبه ها
                          </a>
                          <a
                            href="#screenShots"
                            className="li-sidebar"
                            onClick={() => setIsOpenSidebar(false)}
                          >
                            سفارش آنلاین
                          </a>
                          <a
                            href="#team"
                            className="li-sidebar"
                            onClick={() => setIsOpenSidebar(false)}
                          >
                            وبلاگ
                          </a>
                          <a
                            href="#news"
                            className="li-sidebar"
                            onClick={() => setIsOpenSidebar(false)}
                          >
                            تماس با ما
                          </a>
                          <a
                            href="#contact"
                            className="li-sidebar"
                            onClick={() => setIsOpenSidebar(false)}
                          >
                            تماس
                          </a>
                        </ul>
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
