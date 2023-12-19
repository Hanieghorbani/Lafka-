import { useEffect, useState } from "react"
import routes from "./Routes"
import ScrollToTop from "./components/ScrollToTopbar/ScrollToTopbar"
import AOS from "aos"
import { useRoutes } from "react-router-dom"
function App() {
  useEffect(() => {
    AOS.init({})
  }, [])
  const router = useRoutes(routes)
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
      {router}
      {isScrollBtnVisible && <ScrollToTop />}
    </div>
  )
}

export default App
