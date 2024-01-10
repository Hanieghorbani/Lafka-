import React, { useContext, useEffect } from "react"
import ContextData from "../../../ContextData/ContextData"
import TopSection from "../../../components/Main/TopSection/TopSection"
import BurgerBox from "../../../components/Main/BurgerBox/BurgerBox"
import Footer from "../../../components/Main/Footer/Footer"
import ProductCartBoxInPage from "../../../components/Main/ProductCartBox/ProductCartBoxInPage"

import { Link } from "react-router-dom"
export default function Cart() {
  const contextDatas = useContext(ContextData)
  useEffect(()=>window.scrollTo(0, 0),[])
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
                <span className="text-lg text-zinc-700">
                  هنوز هیچ محصولی به سبد خرید خود اضافه نکردید!
                </span>
              </>
            )}
          </div>
          <div className="mt-7">
            <div className="flex justify-between items-center my-10 md:px-3 border-y-2 py-5">
              <div className="space-y-5 col-span-1 text-sm">
                <h5 className="">جمع کل سبد خرید:</h5>
              </div>
              <div className="space-y-5 col-span-2 pr-5">
             
                <p className=" text-xl text-black">
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
              <Link to={'/checkout'} className="btn-yearStorySelect text-sm">
                ادامه جهت تسویه حساب
              </Link>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 border p-3 rounded-2xl">
          <h6 className="border-b-2 pb-3">
            اين محصول را هم به شما پيشنهاد می كنيم …
          </h6>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-5 pt-7 pb-3">
            {contextDatas.products
              .sort()
              .slice(0, contextDatas.cart.length + 1)
              .map((prod) => (
                <BurgerBox key={prod._id} {...prod} />
              ))}
          </div>

         
        </div>
      </div>

      <Footer />
    </div>
  )
}
