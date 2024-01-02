import React, { useContext, useState } from "react"
import { Outlet } from "react-router-dom"
import Sidebar from "../../components/UserPanel/Sidebar/Sidebar"
import Header from "../../components/Main/Header/Header"
import Footer from "../../components/Main/Footer/Footer"
import ContextData from "../../ContextData/ContextData"
export default function Index() {
  // const contextDatas = useContext(ContextData)
  return (
    <div>
      <div className="bg-primary">
        <Header />
      </div>

      <section className="block mt-60">
        <div className="py-7 border-y-2 border-primary ">
          <div className="container-primary">
            <span className="block font-bold text-2xl">حساب کاربری من</span>
            <span className="text-xl">
              {/* {contextDatas.subTitleInPUser} */}
            </span>
          </div>
        </div>
        <div className="my-12">
          <div className="container-primary">
            <div className="grid grid-cols-12 gap-10">
              <Sidebar />
              <div className="col-span-9">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
