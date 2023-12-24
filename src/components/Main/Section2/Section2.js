import React from "react"
import InfosBox from "./InfosBox"
export default function Section2() {
  return (
    <div className="bg-secondary bg-img-cheese bg-cover py-20 container-primary">
      <div className="flex flex-col items-center text-white gap-10">
        <h2 className="font-[delbar] sm:text-3xl sm:text-center md:text-5xl lg:text-6xl">
          یک برگر سالم دوست دارید؟ … بفرمایید!
        </h2>
        <p className="text-xl text-center">
          اما به هر حال ، هر روز آنها را می خوریم
        </p>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-3 mt-20 gap-10">
        <div className="space-y-10 bg-yellow-100/30 rounded-xl p-5">
          <InfosBox title="نان برگر" icon="GiHamburger" calories="165" />
          <InfosBox title="تخم مرغ" icon="BsEggFried" calories="142" />
        </div>
        <div className="flex flex-col items-center justify-between">
          <img src="/imgs/foods/burger-healthy.png" alt="" />
          <p className="text-xl text-gray-700 text-center">
            اوه ، پسر … آنها طعم تخم مرغ را فرا می گیرند!
          </p>
        </div>
        <div className="space-y-10 bg-yellow-100/30 rounded-xl p-5">
          <InfosBox title="پنیر" icon="GiCheeseWedge" calories="78" />
          <InfosBox title="ورقه های گوشت" icon="GiSteak" calories="118" />
        </div>
      </div>
      <div className="text-center">
        <button className="btn-primary mt-10">سفارش</button>
      </div>
    </div>
  )
}
