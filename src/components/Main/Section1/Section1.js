import React from "react"

export default function Section1() {
  return (
    <div className=" bg-img-fries bg-cover bg-no-repeat py-20 container-primary">
      <div className="flex flex-col items-center sm:gap-9 md:gap-14">
        <p className="sm:text-lg md:text-xl text-primary text-center">
          آنها در شکل ها و اندازه های مختلف هستند
        </p>
        <h2 className="font-[delbar] sm:text-3xl sm:text-center md:text-5xl lg:text-6xl">
          کدام را می پسندید ؟ گوشت یا مرغ .. ؟
        </h2>
        <p className="sm:text-lg md:text-xl text-gray-400 text-center">
          کدام گزینه جوانه های طعم شما را بیشتر می کند؟
        </p>
      </div>

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
