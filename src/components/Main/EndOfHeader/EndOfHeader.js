import React from "react"

export default function EndOfHeader() {
  return (
    <div className="bg-primary container-primary flex flex-col items-center relative overflow-hidden">
      <img
        src="/imgs/bg/blur-tomato.png"
        alt=""
        className="absolute -bottom-28 w-full sm:hidden lg:block"
      />

      <div className="bg-img-burst3 bg-contain bg-no-repeat bg-center flex flex-col justify-center items-center lg:p-5 pb-5 text-white sm:gap-5 md:gap-14">
        <h1 className="font-[delbar] sm:text-4xl sm:text-center md:text-6xl lg:text-7xl sm:py-5 lg:py-10 cursor-pointer">
          میل کنید , لذت ببرید و سیر شوید…
        </h1>
        <p className="sm:text-lg lg:text-xl sm:text-center">
          درمان همه ی گرسنگی ها و هوس های غذا با برگر های ما ..
        </p>
        <img src="/imgs/foods/mighty-meaty.png" alt="" className="mb-24" />
        <button className="btn-primary z-10 -mt-20">سفارش برگر ویژه</button>
      </div>
    </div>
  )
}
