import React, { useEffect, useState } from "react"
import TopSection from "../../../components/Main/TopSection/TopSection"
import Footer from "../../../components/Main/Footer/Footer"
import BurgerBox from "../../../components/Main/BurgerBox/BurgerBox"
import axios from "axios"
import { useParams } from "react-router-dom"
export default function Search() {
  const { searchValue } = useParams()
  const [allResultProducts, setAllResultProducts] = useState([])
  
  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(`https://lafka-back.liara.run/v1/search/${searchValue}`)
      .then((res) => {
        setAllResultProducts(res.data.allResultCourses)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [searchValue])
  return (
    <div>
      <TopSection
        subTitle={`نتیجه جستجو ''${searchValue}''`}
        bg={"bg-img-search"}
        desc={
          "خدمت با عشق از ابتدا پیتزا ، پاستا ، ساندویچ ، سالاد و خیلی چیزهای دیگر ، ساخته شده برای سفارش و تحویل سریع به همسایگان طرف شمال ما برای ناهار ، شام و اواخر شب."
        }
      />

      <div className="my-20">
        {allResultProducts.length ? (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 container-primary">
            {allResultProducts.map((prod) => (
              <BurgerBox key={prod._id} {...prod} />
            ))}
          </div>
        ) : (
          <p className="text-xl p-3 rounded-lg text-center mx-auto">
            هیچ نتیجه ای برای ''{searchValue}'' یافت نشد!
          </p>
        )}
      </div>
      <Footer />
    </div>
  )
}
