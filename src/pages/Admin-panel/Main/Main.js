import React, { useEffect, useState } from "react"
import "./Main.css"
import DataTable from "../../../components/AdminPanel/DataTable/DataTable"
import swal from "sweetalert"
import MainInfoBox from "../../../components/AdminPanel/MainInfoBox/MainInfoBox"
export default function Main() {
  const localStorageToken = JSON.parse(localStorage.getItem("user"))
  const [MainInfos, setMainInfos] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    fetch("http://localhost:8000/v1/infos/p-admin", {
      headers: {
        Authorization: `Bearer ${localStorageToken.token}`,
      },
    })
      .then((res) => res.json())
      .then((datas) => {
        setMainInfos(datas)
        setIsLoading(true)
      })
  }, [])

  return (
    <>
      {isLoading && (
        <div className="container-fluid" id="home-content">
          <div className="container">
            <div className="home-content-title">
              <span className="welcome">
                خوش آمدید,<span className="name">{MainInfos.adminName}</span>
              </span>
            </div>
            <div className="home-content-boxes">
              <div className="row">
                {MainInfos.infos.map((info) => (
                  <MainInfoBox key={info._id} {...info} />
                ))}
              </div>
            </div>

            <DataTable title="کاربران اخیر اضافه شده">
              <table className="table">
                <thead>
                  <tr>
                    <th>شناسه</th>
                    <th>نام</th>
                    <th>شماره</th>
                    <th>ایمیل</th>
                    <th>نقش</th>
                  </tr>
                </thead>
                <tbody>
                  {MainInfos.lastUsers.length ? (
                    <>
                      {MainInfos.lastUsers.map((user, index) => (
                        <tr key={user._id}>
                          <td>{index + 1}</td>
                          <td>{user.name}</td>
                          <td>{user.phone}</td>
                          <td>{user.email}</td>
                          <td>{user.role}</td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <tr className="alert alert-warning">
                      <td>هیچ کاربری یافت نشد !</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </DataTable>
          </div>
        </div>
      )}
    </>
  )
}
