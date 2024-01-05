import React, { useState } from "react"
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md"
export default function VisiblePass() {
  const [isVisiblePass, setIsVisiblePass] = useState(false)
  return (
    <div>
      {isVisiblePass ? (
        <MdOutlineVisibility onClick={() => setIsVisiblePass(false)} className=" cursor-pointer absolute top-[53%] left-4"/>
      ) : (
        <MdOutlineVisibilityOff onClick={() => setIsVisiblePass(true)} className=" cursor-pointer absolute top-[53%] left-4"/>
      )}
    </div>
  )
}
