import React, { useState, useEffect } from "react"

import Header from "../../Header/Header"
export default function TopSection({subTitle,bg,desc}) {
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
    <div className= {`bg-cover overflow-hidden sm:min-h-[70vh] ${bg}`}>
      <Header />
      {/* section 1  */}
      <div
        className={`text-white text-center space-y-16 ${
          !isFixedTopbar ? "sm:py-10 md:py-10" : "sm:pt-16 md:pt-24"
        }`}
      >
        <p className="text-xl">خانه /  {subTitle}</p>
        <h1 className="font-[delbar] sm:text-5xl md:text-8xl">{subTitle}</h1>
        <p className="text-xl md:w-2/3 mx-auto leading-9 pb-10 container-primary">{desc}</p>
      </div>
      {/* end of section 1  */}
    </div>
  )
}
