import React, { useState, useEffect, useContext } from "react"
import Header from "../../../components/Main/Header/Header"
import TopSection from "../../../components/Main/TopSection/TopSection"
import ProductCartBoxInPage from "../../../components/Main/ProductCartBox/ProductCartBoxInPage"
import BurgerBox from "../../../components/Main/BurgerBox/BurgerBox"
import Footer from "../../../components/Main/Footer/Footer"
import ContextData from "../../../ContextData/ContextData"
export default function Cart() {
  const contextDatas = useContext(ContextData)
  return (
    <div>
      <TopSection
        subTitle={"سفارشات من"}
        bg={"bg-zinc-100"}
        bgHead={"bg-primary"}
        textColor="text-black"
      />
      <div className="grid sm:grid-col-1 lg:grid-cols-3 container-primary my-20 gap-10">
        <div className="lg:col-span-2 ">
          <div className="space-y-5">
            {contextDatas.cart.length ? (
              <>
                {contextDatas.cart.map((item) => (
                  <ProductCartBoxInPage key={item._id} {...item} />
                ))}
              </>
            ) : (
              <>
                <span className="text-lg text-zinc-700">هنوز هیچ محصولی به سبد خرید خود اضافه نکردید!</span>
              </>
            )}
          </div>
          <div className="flex sm:flex-col md:flex-row md:justify-between items-center text-sm mt-20 border-t-2 border-b-2 py-5">
            <div className="flex sm:flex-col md:flex-row items-center md:w-1/2 gap-2 sm:mb-5 md:mb-0">
              <input
                type="text"
                className=" border-0 bg-zinc-200  focus:bg-zinc-300 rounded-xl"
                placeholder="کد تخفیف"
              />
              <button className="btn-yearStorySelect">اعمال کد</button>
            </div>
            <button className="bg-dark text-white rounded-[2.5rem] py-3 px-5  ">
              به روز رسانی سبد خرید
            </button>
          </div>
        </div>

        <div className="lg:col-span-1 border p-3 rounded-2xl">
          <h6 className="border-b-2 pb-3">
            اين محصول را هم به شما پيشنهاد می كنيم …
          </h6>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-5 border-b-2 pt-7 pb-3">
            {contextDatas.products
              .sort()
              .slice(0, contextDatas.cart.length + 1 )
              .map((prod) => (
                <BurgerBox key={prod._id} {...prod} />
              ))}
          </div>

          <div className="mt-7">
            <h4 className="border-b-2 pb-3">جمع کل سبد خرید</h4>
            <div className="grid grid-cols-3 items-center gap-2 text-zinc-400 my-10 px-3">
              <div className="space-y-5 col-span-1 text-sm">
                <h5 className="pb-3">جمع کل</h5>
                <h5 className="pb-3">جمع کل با تخفیف</h5>
              </div>
              <div className="space-y-5 col-span-2 pr-5">
                <p className="border-b-2 pb-3">
                  <span className="font-[faNum]">
                    {new Intl.NumberFormat().format(
                      contextDatas.cart.reduce(
                        (total, product) =>
                          total + product.price * product.count,
                        0
                      )
                    )}
                  </span>{" "}
                  تومان
                </p>
                <p className="border-b-2 pb-3 text-xl text-black">
                  <span className="font-[faNum]">
                    {new Intl.NumberFormat().format(
                      contextDatas.cart.reduce(
                        (total, product) =>
                          total + product.price * product.count,
                        0
                      )
                    )}
                  </span>{" "}
                  تومان
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <button className="btn-yearStorySelect text-sm">
                ادامه جهت تسویه حساب
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
