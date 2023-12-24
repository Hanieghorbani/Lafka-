import React from "react"
import HeaderSection from "../HeaderSection/HeaderSection"
export default function BestService() {
  return (
    <div className=" bg-secondary py-20 bg-img-fries bg-cover flex items-center justify-center flex-col container-primary">
      <HeaderSection
        title={"سیب زمینی سرخ کرده + شیک خامه ای"}
        desc={"بهترین محصول ما"}
        topDesc={"بهترین خدمت با"}
        textWhite={true}
      />
      <img src="/imgs/foods/fries-healthy.png" alt="" />
      <button className="btn-primary mt-16">نمایش همه</button>
    </div>
  )
}
