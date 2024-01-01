import React, { useState, useEffect, useContext } from "react"
import ContextData from "../../../ContextData/ContextData"
import Header from "../Header/Header"
import { Link, useParams } from "react-router-dom"
export default function TopSection({
  subTitle,
  bg,
  desc,
  bgHead,
  textColor,
  showCategory,
}) {
  const contextDatas = useContext(ContextData)
  return (
    <div
      className={`bg-cover overflow-hidden sm:min-h-[75vh] md:h-[100vh] ${bg}`}
    >
      <div className={bgHead}>
        <Header />
      </div>
      {showCategory && (
        <div className="w-3/4 bg-primary mt-[11.5rem] container-primary p-3 rounded-b-3xl mt-60">
          <div className="w-1/2 text-white flex items-center justify-between mx-auto">
            {contextDatas.categorys.map((category) => (
              <Link
                to={`/productCategory/${category.name}`}
                key={category._id}
                className="li-header"
              >
                {category.title}
              </Link>
            ))}
          </div>
        </div>
      )}
      {/* section 1  */}
      <div
        className={` text-center space-y-16 ${
          showCategory ? "mt-10" : "mt-60"
        } ${textColor ? textColor : "text-white"}`}
      >
        <p className="text-xl">خانه / {subTitle}</p>
        <h1 className="font-[delbar] sm:text-5xl md:text-7xl">{subTitle}</h1>
        <p className="text-xl md:w-2/3 mx-auto leading-9 pb-10 container-primary">
          {desc}
        </p>
      </div>
      {/* end of section 1  */}
    </div>
  )
}
