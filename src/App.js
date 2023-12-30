import { useEffect, useState, useCallback } from "react"
import routes from "./Routes"
import ScrollToTop from "./components/Main/ScrollToTop/ScrollToTop"
import AOS from "aos"
import { useRoutes } from "react-router-dom"
import useScroll from "./hooks/useScroll"
import ContextData from "./ContextData/ContextData"
import axios from "axios"
function App() {
  useEffect(() => {
    AOS.init({})
  }, [])
  const router = useRoutes(routes)
  const [isScrollBtnVisible] = useScroll(400)
  const [token, setToken] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userInfos, setUserInfos] = useState([])

  const login = useCallback((userInfos, token) => {
    setToken(token)
    setIsLoggedIn(true)
    setUserInfos(userInfos)
    localStorage.setItem("user", JSON.stringify({ token }))
  }, [])

  //for get user data
  useEffect(() => {
    const localStorageToken = JSON.parse(localStorage.getItem("user"))
    if (localStorageToken) {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorageToken.token}`,
        },
      }
      axios
        .get("http://localhost:8000/v1/auth/me", config)
        .then((userDatas) => {
          setIsLoggedIn(true)
          setUserInfos(userDatas.data)
        })
        .catch((err) => console.log(err))
    }
  }, [token])

  return (
    <div className="overflow-x-hidden">
      <ContextData.Provider
        value={{
          login,
          isLoggedIn,
          userInfos,
        }}
      >
        {router}
        {isScrollBtnVisible && <ScrollToTop />}
      </ContextData.Provider>
    </div>
  )
}

export default App
