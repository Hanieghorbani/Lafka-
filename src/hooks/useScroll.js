import { useEffect, useState } from "react"

export default function useScroll(init) {
  const [isVisible, setIsVisible] = useState(false)
  const [offset, setOffset] = useState(0)
  function handleShowScroll() {
    if (window.pageYOffset > offset) {
      setIsVisible(false)
    } else {
      setIsVisible(true)
    }
    setOffset(window.pageYOffset)
  }
  window.addEventListener("scroll", handleShowScroll)

  return [isVisible,offset]
}
