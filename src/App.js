import { useEffect, useState } from "react"
import routes from "./Routes"
import ScrollToTop from "./components/Main/ScrollToTopbar/ScrollToTopbar"
import AOS from "aos"
import { useRoutes } from "react-router-dom"
import useScroll from "./hooks/useScroll"
function App() {
  useEffect(() => {
    AOS.init({})
  }, [])
  const router = useRoutes(routes)
  const isScrollBtnVisible = useScroll(400)

  return (
    <div className="overflow-x-hidden">
      {router}
      {isScrollBtnVisible && <ScrollToTop />}
    </div>
  )
}

export default App
