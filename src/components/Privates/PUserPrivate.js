import React, { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import ContextData from "../../ContextData/ContextData"
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
