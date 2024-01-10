import axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ContextData from "../../../ContextData/ContextData"
export default function ViewOrder() {
  const { orderID } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const { config } = useContext(ContextData)
  const [orderInfos, setOrderInfos] = useState([])
  useEffect(() => {
    axios
      .get(`https://lafka-back.liara.run/v1/orders/${orderID}`, config)
      .then((res) => {
        setOrderInfos(res.data[0])
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
