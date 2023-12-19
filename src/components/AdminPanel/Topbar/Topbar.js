import React, { useEffect, useState } from "react"
import { FaAngleDown, FaRegBell } from "react-icons/fa6"
export default function Topbar() {
  const [adminInfos, setAdminInfos] = useState([])
  const [notifsBox, setNotifsBox] = useState([])
  const [isShowNotifs, setIsShowNotifs] = useState(false)
  useEffect(() => {
     const localStorageToken = JSON.parse(localStorage.getItem("user"))
    fetch("http://localhost:4000/v1/auth/me", {
      headers: {
        Authorization: `Bearer ${localStorageToken.token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setAdminInfos(res)
        setNotifsBox(res.notifications)
      })
  }, [seeNotifHandler])

  function seeNotifHandler(id) {
    const localStorageToken = JSON.parse(localStorage.getItem("user"))
    fetch(`http://localhost:4000/v1/notifications/see/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorageToken.token}`,
      },
    })
  }
  return (
    <div className="container-fluid">
      <div className="container">
        <div
          className={`home-header ${isShowNotifs && "active-modal-notfication"} `}
        >
          <div className="home-right">
            <div className="home-searchbar">
              <input type="text" className="search-bar" placeholder="جستجو..." />
            </div>
            <div className="home-notification">
              <button type="button" onMouseEnter={() => setIsShowNotifs(true)}>
                <FaRegBell />
              </button>
            </div>
            <div
              className="home-notification-modal"
              onMouseLeave={() => setIsShowNotifs(false)}
            >
              <ul className="home-notification-modal-list">
              {notifsBox.length ? (<>{notifsBox.map((notif) => (
                  <li key={notif._id} className="home-notification-modal-item">
                    <span className="home-notification-modal-text">
                      {notif.msg}
                    </span>
                    <label className="switch">
                      <a
                        href="javascript:void(0)"
                        onClick={() => seeNotifHandler(notif._id)}
                      >
                        تایید
                      </a>
                    </label>
                  </li>
                ))}</>) : (<li className="home-notification-modal-item">هیچ پیغامی وجود ندارد !</li>)}
                
              </ul>
            </div>
          </div>
          <div className="home-left">
            <div className="home-profile">
              <div className="home-profile-image">
                <a href="#">
                  <img
                    src={`/images/info/${adminInfos.profile}`}
                    alt="prof-admin"
                  />
                </a>
              </div>
              <div className="home-profile-name">
                <a href="#">{adminInfos.name}</a>
              </div>
              <div className="home-profile-icon">
                <FaAngleDown />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
