import React, { useState, useEffect } from "react"

export default function useScroll({ init }) {
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    window.addEventListener("scroll", handleShowScroll)
    return () => {
      window.removeEventListener("scroll", handleShowScroll)
    }
  },[])

  const handleShowScroll = () => {
    console.log(window.scrollY );
    if (window.scrollY > init) {
      setIsVisible(window.scrollY)
    } else {
      setIsVisible(window.scrollY)
    }
  }

  return [isVisible]
}
