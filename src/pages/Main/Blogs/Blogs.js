import React, { useContext, useEffect ,useState} from "react"
import TopSection from "../../../components/Main/TopSection/TopSection"
import BlogBox from "../../../components/Main/BlogBox/BlogBox"
import Footer from "../../../components/Main/Footer/Footer"
import ContextData from "../../../ContextData/ContextData"
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
        {/* <BlogBox title="نوشته 1" img="food-blog-1-1.jpg" />
        <BlogBox title="نوشته 3" img="food-blog-3-1.jpg" />
        <div className="md:-mt-28 lg:-mt-0">
          <BlogBox title="نوشته 5" img="food-blog-7-1.jpg" />
        </div>
        <div className="lg:-mt-28">
          <BlogBox title="نوشته 6" img="food-blog-6-1.jpg" />
        </div>
        <div className="md:-mt-48 lg:-mt-0">
          <BlogBox title="نوشته 4" img="food-blog-4-1.jpg" />
        </div> */}
      </div>

      <Footer />
    </div>
  )
}
