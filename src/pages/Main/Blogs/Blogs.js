import React from "react"
import TopSection from "../../../components/Main/TopSection/TopSection"
import BlogBox from "../../../components/Main/BlogBox/BlogBox"
import Footer from "../../../components/Main/Footer/Footer"
export default function Blogs() {
  return (
    <div>
      <TopSection
        subTitle={"وبلاگ"}
        bg={"bg-img-blog"}
        desc="خدمت با عشق از ابتدا پیتزا ، پاستا ، ساندویچ ، سالاد و خیلی چیزهای دیگر ، ساخته شده برای سفارش و تحویل سریع به همسایگان طرف شمال ما برای ناهار ، شام و اواخر شب."
      />

      <div className="grid container-primary sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-20 gap-10">
        <BlogBox title="نوشته 2" img="food-blog-2-1.jpg" />
        <BlogBox title="نوشته 1" img="food-blog-1-1.jpg" />
        <BlogBox title="نوشته 3" img="food-blog-3-1.jpg" />
        <div className="md:-mt-28 lg:-mt-0">
          <BlogBox title="نوشته 5" img="food-blog-7-1.jpg" />
        </div>
        <div className="lg:-mt-28">
          <BlogBox title="نوشته 6" img="food-blog-6-1.jpg" />
        </div>
        <div className="md:-mt-48 lg:-mt-0">
          <BlogBox title="نوشته 4" img="food-blog-4-1.jpg" />
        </div>
      </div>

      <Footer />
    </div>
  )
}
