import React, { useContext, useEffect } from "react"
import ContextData from "../../ContextData/ContextData"
import { useNavigate } from "react-router-dom"
export default function PUserPrivate({ children }) {
  const { isLoggedIn,userInfos } = useContext(ContextData)
  const localStorageToken = JSON.parse(localStorage.getItem("user"))
  const navigate = useNavigate()
  useEffect(() => {
    if (!localStorageToken) {
      navigate("/login")
    }
  }, [isLoggedIn])

  return <>{isLoggedIn && <>{children}</>}</>
}
