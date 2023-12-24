import React from "react"
import HeaderSection from "../HeaderSection/HeaderSection"
export default function Section1() {
  return (
    <div className=" bg-img-fries bg-cover bg-no-repeat py-20 container-primary">
      <HeaderSection
        title={"کدام را می پسندید ؟ گوشت یا مرغ .. ؟"}
        desc={"آنها در شکل ها و اندازه های مختلف هستند"}
        topDesc={"کدام گزینه جوانه های طعم شما را بیشتر می کند؟"}
      />
      

      <div className="flex sm:flex-col md:flex-row gap-10 items-center justify-between mt-16">
        <div className="flex flex-col items-center justify-center">
          <img src="/imgs/foods/chicken-beef-600x386.png" alt="" />
          <button className="btn-primary">سفارش مرغ</button>
        </div>
        <div className="flex flex-col items-center justify-center">
          <img src="/imgs/foods/beef-chicken-600x386.png" alt="" />
          <button className="btn-primary">سفارش گوشت</button>
        </div>
      </div>
    </div>
  )
}
