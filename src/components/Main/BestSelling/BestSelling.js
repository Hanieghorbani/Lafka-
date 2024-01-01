import React, { useContext } from "react"
import BurgerBox from "../BurgerBox/BurgerBox"
import HeaderSection from "../HeaderSection/HeaderSection"
import ContextData from "../../../ContextData/ContextData"
export default function BestSelling() {
  const contextDatas = useContext(ContextData)
  return (
    <div className="container-primary py-20">
      <HeaderSection
        title={"یکی از پرفروش های ما را انتخاب کنید"}
        desc={"زمان اثبات طعم و مزه هزاران نفر"}
      />

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {contextDatas.products.sort().slice(0, 6).map((product) => (
          <BurgerBox key={product._id} {...product} />
        ))}
      </div>
    </div>
  )
}
