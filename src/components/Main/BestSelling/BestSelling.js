import React from "react"
import BurgerBox from "../BurgerBox"
import HeaderSection from "../HeaderSection/HeaderSection"
export default function BestSelling() {
  return (
    <div className="container-primary py-20">
      <HeaderSection
        title={"یکی از پرفروش های ما را انتخاب کنید"}
        desc={"زمان اثبات طعم و مزه هزاران نفر"}
      />

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <BurgerBox
          price="240000"
          img="burger11-300x300.jpg"
          name="غول برگر لافکا"
        />
        <BurgerBox
          price="132000"
          img="burger13-300x300.jpg"
          name="برگر تخم مرغ رویال	"
        />
        <BurgerBox
          price="465000"
          img="burger16-300x300.jpg"
          name="برگر ویژه گوشت	"
        />
        <BurgerBox
          price="110000"
          img="burger12-300x300.jpg"
          name="برگر مرغ رویال"
        />
        <BurgerBox
          price="320000"
          img="burger18-300x300 (1).jpg"
          name="برگر گوشت رویال"
        />
        <BurgerBox
          price="180000"
          img="burger20-300x300.jpg"
          name="برگر ساده رویال"
        />
      </div>
    </div>
  )
}
