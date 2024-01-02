import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
export default function ViewOrder() {
  const { orderID } = useParams()
  const localStorageToken = JSON.parse(localStorage.getItem("user"))
  const [isLoading, setIsLoading] = useState(false)

  const [orderInfos, setOrderInfos] = useState([])
  useEffect(() => {
    fetch(`http://localhost:8000/v1/orders/${orderID}`, {
      headers: {
        Authorization: `Bearer ${localStorageToken.token}`,
      },
    })
      .then((res) => res.json())
      .then((datas) => {
        setOrderInfos(datas[0])
        setIsLoading(true)
      })
  }, [orderID])
  return (
    <>
      {isLoading && (
        <div className="w-full">
          <span className="mt-4">
            سفارش #1234 در تاریخ {orderInfos.createdAt.slice(0, 10)} ثبت شده است
            و در حال حاضر در وضعیت تکمیل شده می باشد.
          </span>
          <h1 className="fw-bold fs-2 my-4">مشخصات سفارش</h1>
          <ul className="list-unstyled">
            <li className="d-flex justify-content-between border-bottom fw-bold py-3">
              <p>محصول</p>
              <p>مجموع</p>
            </li>
            <li className="d-flex justify-content-between border-bottom text-secondary py-3">
              <p>{orderInfos.course.name}</p>
              <span>{orderInfos.course.price.toLocaleString()} تومان</span>
            </li>
            <li className="d-flex justify-content-between border-bottom py-3">
              <p>جمع کل سبد خرید:</p>
              <sapn>{orderInfos.price.toLocaleString()}تومان</sapn>
            </li>
            <li className="d-flex justify-content-between border-bottom py-3">
              <p>قیمت نهایی:</p>
              <span>{orderInfos.price.toLocaleString()} تومان</span>
            </li>
          </ul>
          <button className="btn btn-success btn-lg fs-4 mt-5">
            سفارش دوباره
          </button>
        </div>
      )}
    </>
  )
}
