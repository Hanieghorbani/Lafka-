import React, { useEffect ,useState} from "react"
import TopSection from "../../../components/Main/TopSection/TopSection"
import BlogBox from "../../../components/Main/BlogBox/BlogBox"
import Footer from "../../../components/Main/Footer/Footer"

import axios from "axios"

export default function Blogs() {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:8000/v1/articles")
      .then((res) => setArticles(res.data))
  }, [])
  
  return (
    <div>
      <TopSection
        subTitle={"وبلاگ"}
        bg={"bg-img-blog"}
        desc="خدمت با عشق از ابتدا پیتزا ، پاستا ، ساندویچ ، سالاد و خیلی چیزهای دیگر ، ساخته شده برای سفارش و تحویل سریع به همسایگان طرف شمال ما برای ناهار ، شام و اواخر شب."
      />

      <div className="grid container-primary sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-20 gap-10">
        {articles.map((article) => (
          <BlogBox key={article._id} {...article}/>
        ))}
      </div>

      <Footer />
    </div>
  )
}
