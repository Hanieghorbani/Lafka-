import React, { useContext, useEffect, useState } from "react"
import ContextData from "../../../ContextData/ContextData"
import jalaliMoment from "jalali-moment"
import axios from "axios"

export default function Orders() {
  const [orders, setOrders] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const localStorageToken = JSON.parse(localStorage.getItem("user"))
  const config = {
    headers: {
      Authorization: `Bearer ${localStorageToken.token}`,
    },
  }
  useEffect(() => {
    window.scrollTo(0, 0)
    axios.get(`https://lafka-back.liara.run/v1/orders`, config).then((res) => {
      setOrders(res.data)
      setIsLoading(true)
    }).catch(err=>console.log(err))
  },[])

  return (
    <div className="w-full">
      {isLoading && (
        <>
          {orders ? (
            <table className=" w-full">
              <thead className="border-b-2 pb-5">
                <tr className="sm:text-sm md:text-lg font-bold">
                  <th className="">شناسه</th>
                  <th className="">مبلغ</th>
                  <th className="sm:hidden md:block">وضعیت</th>
                  <th className="">محصول</th>
                  <th className="">تاریخ</th>
                </tr>
              </thead>
              <tbody className="">
                {orders.map((order, index) => (
                  <tr
                    key={order._id}
                    className="border-b-2 sm:text-xs md:text-base"
                  >
                    <td className="text-center py-5">
                      <a href="#" className="">
                        {index + 1}
                      </a>
                    </td>
                    <td className="text-center py-5">
                      {new Intl.NumberFormat().format(order.price)}
                    </td>
                    <td className="text-center py-5 sm:hidden md:block">
                      تکمیل شده
                    </td>
                    <td className="text-center py-5">{order.course.name}</td>
                    <td className="text-center py-5">
                      {jalaliMoment(order.createdAt).format("jYYYY/jM/jD")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-xl">هنوز سفارشی برای شما ثبت نشده!</p>
          )}
        </>
      )}
    </div>
  )
}
