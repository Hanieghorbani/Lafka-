import React, { useContext } from "react"
import ContextData from "../../../ContextData/ContextData"
import Category from "../Category/Category"
import Header from "../Header/Header"

import { Link } from "react-router-dom"

export default function TopSection({
  subTitle,
  bg,
  desc,
  bgHead,
  textColor,
  showCategory,
}) {
  const {categorys} = useContext(ContextData)
  return (
    <div
      className={`bg-cover overflow-hidden sm:min-h-[75vh] md:min-h-[100vh] ${bg}`}
    >
      <div className={bgHead}>
        <Header />
      </div>
      {showCategory && (
        <Category categorys={categorys}/>
      )}
      {/* section 1  */}
      <div
        className={`mx-auto sm:px-10 text-center space-y-16 ${
          showCategory ? "mt-10" : "mt-60"
        } ${textColor ? textColor : "text-white"}`}
      >
        <p className="text-xl"><Link to={'/'}>خانه</Link> / {subTitle}</p>
        <h1 className="font-[delbar] sm:text-4xl md:text-7xl">{subTitle}</h1>
        <p className="md:text-xl md:w-2/3 leading-9 pb-10 mx-auto">
          {desc}
        </p>
      </div>
      {/* end of section 1  */}
    </div>
  )
}
