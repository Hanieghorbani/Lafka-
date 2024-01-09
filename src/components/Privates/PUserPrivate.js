import React, { useContext, useEffect } from "react"
import ContextData from "../../ContextData/ContextData"
import { useNavigate } from "react-router-dom"
export default function PUserPrivate({ children }) {
  const { isLoggedIn } = useContext(ContextData)
  const navigate = useNavigate()
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login")
    }
  }, [isLoggedIn])

  return <>{isLoggedIn && <>{children}</>}</>
}
