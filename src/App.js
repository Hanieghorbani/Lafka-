import { useEffect, useState } from "react"

import ScrollToTop from "./components/ScrollToTopbar/ScrollToTopbar"
import AOS from "aos"
function App() {
  useEffect(() => {
    AOS.init({})
  }, [])
  const [isScrollBtnVisible, setIsScrollBtnVisible] = useState(false)
  useEffect(() => {
    window.addEventListener("scroll", handleShowScroll)
    return () => {
      window.removeEventListener("scroll", handleShowScroll)
    }
  }, [])

  const handleShowScroll = () => {
    if (window.scrollY > 400) {
      setIsScrollBtnVisible(true)
    } else {
      setIsScrollBtnVisible(false)
    }
  }
  return (
    <div className="ov overflow-x-hidden">
      {isScrollBtnVisible && <ScrollToTop />}
    </div>
  )
}

export default App
