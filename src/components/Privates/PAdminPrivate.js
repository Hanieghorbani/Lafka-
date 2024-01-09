import React, { useContext, useEffect } from "react"
import ContextData from "../../ContextData/ContextData"
import { useNavigate } from "react-router-dom"
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
