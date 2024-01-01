import React, { useEffect, useState } from "react"
import TopSection from "../../../components/Main/TopSection/TopSection"
import BurgerBox from "../../../components/Main/BurgerBox/BurgerBox"
import Footer from "../../../components/Main/Footer/Footer"
import axios from "axios"
import Pagination from "../../../components/Pagination/Pagination"
export default function Orders() {
  const [products, setProducts] = useState([])
  const [shownItems,setShownItems] = useState([])
  useEffect(() => {
    getAllProducts()
  }, [])

  function getAllProducts() {
    axios.get("http://localhost:8000/v1/courses").then((res) => {
      setProducts(res.data)
    })
  }
  return (
    <div>
      <TopSection
        subTitle={"سفارش آنلاین"}
        bg={"bg-img-shop"}
        desc="خدمت با عشق از ابتدا پیتزا ، پاستا ، ساندویچ ، سالاد و خیلی چیزهای دیگر ، ساخته شده برای سفارش و تحویل سریع به همسایگان طرف شمال ما برای ناهار ، شام و اواخر شب."
      />

      {/* products  */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 container-primary my-20">
        {shownItems.map((prod) => (
          <BurgerBox key={prod._id} {...prod} />
        ))}
      </div>

      <Pagination
        items={products}
        itemsCount={3}
        pathname="/shop"
        setShownItems={setShownItems}
      />

      <Footer />
    </div>
  )
}
