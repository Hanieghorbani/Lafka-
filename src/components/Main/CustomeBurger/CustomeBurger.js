import React from "react"
import HeaderSection from "../HeaderSection/HeaderSection"
export default function CustomeBurger() {
  return (
    <div className="bg-gray-100 py-20 container-primary flex flex-col items-center justify-center gap-10">
      <HeaderSection
        title={"خودتان برگرتان را بسازید"}
        desc={"فقط عناصر مورد علاقه خود را اضافه کنید"}
      />
      <img src="/imgs/foods/burger-layers.png" alt="" className=""/>
      <button className="btn-primary">ساخت برگر</button>
    </div>
  )
}
