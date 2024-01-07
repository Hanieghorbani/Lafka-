import React, { useContext, useEffect, useState } from "react"
import TopSection from "../../../components/Main/TopSection/TopSection"
import { useParams } from "react-router-dom"
import ContextData from "../../../ContextData/ContextData"
import axios from "axios"
import Footer from "../../../components/Main/Footer/Footer"
import DOMPurify from "dompurify"

export default function BlogInfo() {
  const [article, setArticle] = useState({})
  const { shortName } = useParams()
  const { config } = useContext(ContextData)
  useEffect(() => {
    axios
      .get(`http://localhost:8000/v1/articles/${shortName}`, config)
      .then((res) => {
        setArticle(res.data)
        console.log(res.data)
      })
  }, [shortName])
  const { cover, title,body } = article
  return (
    <div>
      <TopSection
        subTitle={title}
        bg={"bg-zinc-100"}
        bgHead={"bg-primary"}
        textColor={"text-black"}
        showCategory={true}
      />
      <div className="container-primary my-20">
        <img
          src={`http://localhost:8000/courses/covers/${cover}`}
          alt={title}
          className="w-1/2 mx-auto mb-10"
        />
        <h1 className="text-center text-3xl font-bold mb-20">{title}</h1>


        <div
          className="article-section"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(body),
          }}
        ></div>
      </div>
      <Footer />
    </div>
  )
}
