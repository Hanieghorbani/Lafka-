import React from "react"
import TopSection from "../../../components/Main/TopSection/TopSection"
import BurgerBox from "../../../components/Main/BurgerBox/BurgerBox"
import Footer from "../../../components/Main/Footer/Footer"
export default function Orders() {
  return (
    <div>
      <TopSection subTitle={"سفارش آنلاین"} bg={"bg-img-shop"} desc='خدمت با عشق از ابتدا پیتزا ، پاستا ، ساندویچ ، سالاد و خیلی چیزهای دیگر ، ساخته شده برای سفارش و تحویل سریع به همسایگان طرف شمال ما برای ناهار ، شام و اواخر شب.'/>
     
     {/* products  */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 container-primary my-20">
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
        <BurgerBox
          price="99000"
          img="shake5-300x300.jpg"
          name="برگر ساده رویال"
        />
        <BurgerBox
          price="99000"
          img="shake6-300x300.jpg"
          name="برگر ساده رویال"
        />
        <BurgerBox
          price="120000"
          img="shake2-300x300.jpg"
          name="برگر ساده رویال"
        />
      </div>

      <Footer />
    </div>
  )
}
