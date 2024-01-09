import React, { useContext, useEffect, useState } from "react"
import ContextData from "../../../ContextData/ContextData"
import DataTable from "../../../components/Admin-panel/DataTable/DataTable"
import MainInfoBox from "../../../components/UserPanel/MainInfoBox/MainInfoBox"
import axios from "axios"

export default function Main() {
  const { config } = useContext(ContextData)
  const [isLoading, setIsLoading] = useState(false)
  const [infos, setInfos] = useState([])
  useEffect(() => {
    axios.get("http://localhost:8000/v1/infos/p-admin", config).then((res) => {
      setInfos(res.data)
      setIsLoading(true)
    })
  }, [])
  return (
    <>
      {isLoading && (
        <div className="mx-auto sm:px-10">
          <div className="mt-20 text-2xl sm:text-center md:text-start">
            <span className="">
              خوش آمدید,
              <span className=" text-blue-500">{infos.adminName}</span>
            </span>
          </div>
          <div className="home-content-boxes mt-10">
            <div className="grid md:grid-cols-2 gap-10">
              {infos.infos.map((info) => (
                <>
                  {info.title != "جلسات" && (
                    <MainInfoBox key={info._id} {...info} />
                  )}
                </>
              ))}
            </div>
          </div>
          <DataTable title={"کاربران اخیر اضافه شده"}>
            <table className="dataTable w-full text-center border-collapse mt-10">
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
                {infos.lastUsers.length ? (
                  <>
                    {infos.lastUsers.map((user, index) => (
                      <tr key={user._id}>
                        <td>{index + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.phone}</td>
                        <td>{user.email}</td>
                        <td>{user.role == "ADMIN" ? "مدیر" : "کاربر"}</td>
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
      )}
    </>
  )
}
