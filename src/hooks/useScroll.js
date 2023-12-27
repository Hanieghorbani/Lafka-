import React, { useState, useEffect } from "react"

export default function useScroll({ init }) {
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    window.addEventListener("scroll", handleShowScroll)
    return () => {
      window.removeEventListener("scroll", handleShowScroll)
    }
  }, [])

  const handleShowScroll = () => {
    if (window.scrollY > init) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  return [isVisible]
}
