import React, { useState, useEffect } from "react"

import Header from "../Header/Header"
export default function TopSection({ subTitle, bg, desc, bgHead, textColor }) {
  return (
    <div className={`bg-cover overflow-hidden sm:min-h-[75vh] md:h-[100vh] ${bg}`}>
      <div className={bgHead}>
        <Header />
      </div>
      {/* section 1  */}
      <div
        className={` text-center space-y-16 mt-60 ${textColor ? textColor : "text-white"}`}
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
