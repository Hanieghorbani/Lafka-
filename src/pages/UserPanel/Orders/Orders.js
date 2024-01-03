import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const localStorageToken = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    fetch(`http://localhost:8000/v1/orders`, {
      headers: {
        Authorization: `Bearer ${localStorageToken.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders(data)
        setIsLoading(true)
      })
  }, [])

  return (
    <div className="w-full">
      {isLoading && (
        <div className="pr-12">
          <table className=" w-full">
            <thead className="border-b-2 pb-5">
              <tr className="">
                <th className="text-lg font-bold">شناسه</th>
                <th className="text-lg font-bold">تاریخ</th>
                <th className="text-lg font-bold">وضعیت</th>
                <th className="text-lg font-bold">دوره</th>
                <th className="text-lg font-bold">مبلغ</th>
                <th className="text-lg font-bold">عملیات ها</th>
              </tr>
            </thead>
            <tbody className="">
              {orders.map((order, index) => (
                <tr key={order._id} className="border-b-2">
                  <td className="text-xl">
                    <a href="#" className="">
                      {index + 1}
                    </a>
                  </td>
                  <td className="text-xl">
                    {order.createdAt.slice(0, 10)}
                  </td>
                  <td className="text-xl">تکمیل شده</td>
                  <td className="text-xl">{order.course.name}</td>
                  <td className="text-xl">{order.price}</td>
                  <td className="text-xl">
                    <Link
                      className="my-3 bg-primary text-white text-center text-xl font-bold py-3 px-0 max-w-[7.5rem] rounded-lg hover:text-white bg-primary"
                      to={`/my-account/view-order/${order._id}`}
                    >
                      نمایش
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
