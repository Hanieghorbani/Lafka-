import React, { useContext, useState, useEffect } from "react"
import { IoMdNotifications } from "react-icons/io"
import { IoMoonSharp, IoHomeSharp } from "react-icons/io5"
import ContextData from "../../../ContextData/ContextData.js"
import { IoMdArrowDropup } from "react-icons/io"
import axios from "axios"
export default function Topbar() {
  const contextDatas = useContext(ContextData)
  const [isShowNotifs, setIsShowNotifs] = useState(false)
  const [notifs, setNotifs] = useState([])
  const localStorageToken = JSON.parse(localStorage.getItem("user"))
  const config = {
    headers: {
      Authorization: `Bearer ${localStorageToken.token}`,
    },
  }
  useEffect(() => {
    getAllNotifs()
  }, [])

  function getAllNotifs() {
    axios
      .get("http://localhost:8000/v1/auth/me", config)
      .then((userDatas) => {
        setNotifs(userDatas.data.notifications)
      })
      .catch((err) => console.log(err))
  }

  function seeNotif(id) {
    axios
      .put(`http://localhost:8000/v1/notifications/see/${id}`, {}, config)
      .then(() => getAllNotifs())
  }

  



  return (
    <div className="rounded-3xl py-3 px-7 bg-zinc-100 flex justify-between items-center w-full">
      <div className="flex gap-8 relative">
        <IoHomeSharp className="border-2 rounded-full p-3 w-12 h-12 cursor-pointer" />
        <IoMdNotifications
          className="border-2 rounded-full p-3 w-12 h-12 cursor-pointer"
          onMouseEnter={() => setIsShowNotifs(true)}
        />
        <IoMoonSharp className="border-2 rounded-full p-3 w-12 h-12 cursor-pointer" />

        {isShowNotifs && (
          <ul
            className="absolute top-[3.7rem] rounded-xl -left-56 text-white  bg-green-400 p-4 w-[23rem] space-y-3"
            onMouseLeave={() => setIsShowNotifs(false)}
          >
            <IoMdArrowDropup className="text-green-400 text-4xl -mt-9" />
            {notifs.length > 0 ? (
              <>
                {notifs.map((notif) => (
                  <li
                    key={notif._id}
                    className="flex justify-between items-center"
                  >
                    <p>{notif.msg} </p>{" "}
                    <button
                      className="btn text-sm bg-blue-400"
                      onClick={() => seeNotif(notif._id)}
                    >
                      تایید
                    </button>
                  </li>
                ))}
              </>
            ) : (
              <li className="text-lg">هیچ پیغامی وجود ندارد!</li>
            )}
          </ul>
        )}
      </div>
      <div className="pr-5 border-r-4 border-zinc-200">
        <div>
          <img src="" alt="" />
          <div className="text-center">
            <p className="font-bold"> {contextDatas.userInfos.name}</p>
            <p className="text-sm">ادمین</p>
          </div>
        </div>
      </div>
    </div>
  )
}
