import React, { useEffect, useState } from "react"
import Footer from "../../../components/Main/Footer/Footer"
import TopSection from "../../../components/Main/TopSection/TopSection"
import { useParams } from "react-router-dom"
import axios from "axios"
import BurgerBox from "../../../components/Main/BurgerBox/BurgerBox"
export default function Categorya() {
  const { shortName } = useParams()
  const [products, setProducts] = useState([])
  useEffect(() => {
    axios
      .get(`http://localhost:8000/v1/courses/category/${shortName}`)
      .then((res) => {
        setProducts(res.data)
      })
  }, [shortName])
  return (
    <div>
      <TopSection
        bg={"bg-zinc-200"}
        bgHead={"bg-primary"}
        subTitle={shortName}
        textColor={"text-zinc-800"}
        showCategory={true}
      />

      <div className="container-primary my-20">
        {products.length ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 ">
            {products.map((prod) => (
              <BurgerBox key={prod._id} {...prod} />
            ))}
          </div>
        ) : (
          <><span>هیچ محصولی برای این دسته بندی یافت نشد!</span></>
        )}
      </div>
      <Footer />
    </div>
  )
}
