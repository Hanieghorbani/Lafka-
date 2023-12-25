import React, { useState, useEffect } from "react"

import Header from "../../Header/Header"
export default function TopSection({subTitle,bg}) {
  const [isFixedTopbar, setIsFixedTopbar] = useState(true)

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleScroll = () => {
    if (window.scrollY > 67) {
      setIsFixedTopbar(false)
    } else {
      setIsFixedTopbar(true)
    }
  }
  return (
    <div className= {`bg-cover overflow-hidden sm:h-[70vh] md:h-screen ${bg}`}>
      <Header />
      {/* section 1  */}
      <div
        className={`text-white text-center ${
          !isFixedTopbar ? "sm:py-[15rem] md:py-[20rem]" : "sm:pt-16 md:pt-24"
        }`}
      >
        <p className="text-xl">خانه /  {subTitle}</p>
        <h1 className="font-[delbar] sm:text-5xl md:text-8xl">{subTitle}</h1>
      </div>
      {/* end of section 1  */}
    </div>
  )
}
