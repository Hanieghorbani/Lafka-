import React, { useState, useEffect } from "react"
import FavoriteBox from "../../../components/Main/FavoriteBox/FavoriteBox"
import Footer from "../../../components/Main/Footer/Footer"
import TopSection from "../../../components/Main/TopSection/TopSection"
export default function Favorites() {

  return (
    <div>
     <TopSection subTitle={"لیست علاقه مندی ها"} bg={"bg-zinc-100"} bgHead={'bg-primary'} textColor='text-black'/>
      <div className="container-primary md:w-2/3 my-20 space-y-10">
        <FavoriteBox
          img={"beef-chicken-600x386.png"}
          name="برگر ویژه گوشت"
          price={130000}
        />
        <FavoriteBox
          img={"beef-chicken-600x386.png"}
          name="برگر ویژه گوشت"
          price={130000}
        />
        <FavoriteBox
          img={"beef-chicken-600x386.png"}
          name="برگر ویژه گوشت"
          price={130000}
        />
      </div>

      <Footer />
    </div>
  )
}
