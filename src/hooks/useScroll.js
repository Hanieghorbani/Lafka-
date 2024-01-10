import React, { useState, useEffect } from "react"

export default function useScroll(init) {
  const [isVisible, setIsVisible] = useState(false)

  function handleShowScroll() {
    if (window.pageYOffset > init || 0) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }
  window.addEventListener("scroll", handleShowScroll)

  return [isVisible]
}
