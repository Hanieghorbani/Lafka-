import React, { useContext, useEffect, useState } from "react"
import ContextData from "../../../ContextData/ContextData"
import TopSection from "../../../components/Main/TopSection/TopSection"
import Footer from "../../../components/Main/Footer/Footer"

import DOMPurify from "dompurify"
import { useParams } from "react-router-dom"
import axios from "axios"
import jalaliMoment from "jalali-moment"

import { FaRegCircleUser } from "react-icons/fa6"
import { MdAccessTime } from "react-icons/md"

export default function BlogInfo() {
  const { shortName } = useParams()
  const { config } = useContext(ContextData)
  const [article, setArticle] = useState({})
  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(`https://lafka-back.liara.run/v1/articles/${shortName}`, config)
      .then((res) => {
        setArticle(res.data)
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
          src={`https://lafka-back.liara.run/courses/covers/${cover}`}
          alt={title}
          className="md:w-1/2 mx-auto mb-10 rounded-3xl"
        />
        <h1 className="text-center text-3xl font-bold mb-20">{title}</h1>

        <div
          className="md:w-2/3 mx-auto content-blog"
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
