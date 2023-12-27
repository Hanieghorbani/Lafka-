import React from "react"
import TopSection from "../../../components/Main/TopSection/TopSection"
import Footer from "../../../components/Footer/Footer"
import BurgerBox from "../../../components/Main/BurgerBox"
export default function Search() {
  return (
    <div>
      <TopSection
        subTitle={"نتیجه جستجو “برگر”"}
        bg={"bg-img-search"}
        desc={
          "خدمت با عشق از ابتدا پیتزا ، پاستا ، ساندویچ ، سالاد و خیلی چیزهای دیگر ، ساخته شده برای سفارش و تحویل سریع به همسایگان طرف شمال ما برای ناهار ، شام و اواخر شب."
        }
      />

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-20 gap-10 container-primary">
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
