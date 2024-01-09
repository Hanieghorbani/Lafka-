import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import jalaliMoment from "jalali-moment"
import axios from "axios"
import ContextData from "../../../ContextData/ContextData"

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { config } = useContext(ContextData)
  useEffect(() => {
    axios.get(`http://localhost:8000/v1/orders`, config).then((res) => {
      setOrders(res.data)
      setIsLoading(true)
    })
  }, [])

  return (
    <div className="w-full">
      {isLoading && (
        <div className="">
          {orders.length == true ? (
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
        </div>
      )}
    </div>
  )
}
