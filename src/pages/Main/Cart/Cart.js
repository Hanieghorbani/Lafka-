import React, { useState, useEffect } from "react"
import Header from "../../../components/Header/Header"
import TopSection from "../../../components/Main/TopSection/TopSection"
import ProductCartBoxInPage from "../../../components/Main/ProductCartBox/ProductCartBoxInPage"
export default function Cart() {
  return (
    <div>
      <TopSection
        subTitle={"سفارشات من"}
        bg={"bg-zinc-100"}
        bgHead={"bg-primary"}
        textColor="text-black"
      />
      <div className="grid grid-cols-3 container-primary my-20">
        <div className="col-span-2 ">
          <div className="space-y-5">
            <ProductCartBoxInPage
              name={"برگر مخصوص جالاپنو"}
              price={120000}
              count={2}
              img={"burger-healthy.png"}
            />
            <ProductCartBoxInPage
              name={"برگر مخصوص جالاپنو"}
              price={120000}
              count={2}
              img={"burger-healthy.png"}
            />
            <ProductCartBoxInPage
              name={"برگر مخصوص جالاپنو"}
              price={120000}
              count={2}
              img={"burger-healthy.png"}
            />
          </div>
          <div className="flex justify-between items-center text-sm mt-20 border-t-2 border-b-2 py-5">
            <div className="flex items-center w-1/2 gap-2">
              <input
                type="text"
                className=" border-0 bg-zinc-200  focus:bg-zinc-200 rounded-xl"
                placeholder="کد تخفیف"
              />
              <button className="btn-yearStorySelect">اعمال کد</button>
            </div>
            <button className="bg-dark text-white rounded-[2.5rem] py-3 px-5  ">
              به روز رسانی سبد خرید
            </button>
          </div>
        </div>

        <div className="col-span-1"></div>
      </div>
    </div>
  )
}
