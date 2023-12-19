// import React, { useContext, useEffect } from "react"
// import AuthContext from "../../userContext/authContext"
// import { useNavigate } from "react-router-dom"

// export default function PAdminPrivate({ children }) {
//   const contextData = useContext(AuthContext)
//   const navigate = useNavigate()
//   useEffect(() => {
//     if (
//     (contextData.userInfos && contextData.userInfos.role == "USER")
//     ) {
//       navigate("/login")
//     }
    
//   }, [contextData.userInfos])

//   return (
//     <>
//       {contextData.userInfos && (
//         <>{contextData.userInfos.role == "ADMIN" && <>{children}</>}</>
//       )}
//     </>
//   )
// }
