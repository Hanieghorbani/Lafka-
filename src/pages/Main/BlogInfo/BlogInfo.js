import React, { useContext, useEffect, useState } from "react"
import TopSection from "../../../components/Main/TopSection/TopSection"
import { useParams } from "react-router-dom"
import ContextData from "../../../ContextData/ContextData"
import axios from "axios"
import Footer from "../../../components/Main/Footer/Footer"
import DOMPurify from "dompurify"
import { FaRegCircleUser } from "react-icons/fa6"
import { MdAccessTime } from "react-icons/md"
import jalaliMoment from "jalali-moment"
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
  const { cover, title, body, creator, createdAt } = article
  return (
    <div>
      <TopSection
        subTitle={title}
        bg={"bg-zinc-100"}
        bgHead={"bg-primary"}
        textColor={"text-black"}
        showCategory={true}
      />
      <div className="container-primary my-20 text-justify">
        <img
          src={`http://localhost:8000/courses/covers/${cover}`}
          alt={title}
          className="w-1/2 mx-auto mb-10"
        />
        <h1 className="text-center text-3xl font-bold mb-20">{title}</h1>

        <div
          className="w-2/3 mx-auto"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(body),
          }}
        ></div>
        <div className="flex gap-5 items-center justify-center mt-20">
          <p className="flex text-sm items-center text-zinc-400">
            <FaRegCircleUser className="text-xl ml-1" />
            {creator ? creator.name : "نا معلوم"}
          </p>
          <p className="text-sm font-[faNum] flex items-center text-zinc-400">
            <MdAccessTime className="text-xl ml-1" />{" "}
            {jalaliMoment(createdAt).format("jYYYY/jM/jD")}
          </p>
        </div>
      </div>
      <Footer />
    </div>
  )
}
