import React, { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import ContextData from "../../ContextData/ContextData"
export default function PAdminPrivate({ children }) {
  const { userInfos,isLoggedIn } = useContext(ContextData)
  const navigate = useNavigate()
  useEffect(() => {
    if (isLoggedIn && userInfos.role == "USER") {
      navigate("/login")
    } else if (!isLoggedIn && !userInfos) {
      navigate("/login")
    }
  }, [userInfos])

  return <>{userInfos && <>{userInfos.role == "ADMIN" && <>{children}</>}</>}</>
}
