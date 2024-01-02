import React, { useEffect, useState } from "react"
import { FaCircle } from "react-icons/fa6"
import differenceInDays from "date-fns/differenceInDays"
import differenceInHours from "date-fns/differenceInHours"
import differenceInMinutes from "date-fns/differenceInMinutes"
import differenceInMonths from "date-fns/differenceInMonths"
import differenceInSeconds from "date-fns/differenceInSeconds"
import { FaEllipsisV } from "react-icons/fa"
import { parseISO } from "date-fns"
import { Link } from "react-router-dom"
export default function Ticket(props) {
  const [datePassedShown, setDatePassedShown] = useState("")

  useEffect(() => {
    const date = new Date()
    const diffMonths = differenceInMonths(date, parseISO(props.createdAt))
    const diffInDays = differenceInDays(date, parseISO(props.createdAt))
    const hoursPassed = differenceInHours(date, parseISO(props.createdAt))
    const diffMins = differenceInMinutes(date, parseISO(props.createdAt))
    const diffSecs = differenceInSeconds(date, parseISO(props.createdAt))

    if (diffInDays > 30) {
      setDatePassedShown(`${diffMonths} ماه`)
    } else if (diffInDays) {
      setDatePassedShown(`${diffInDays} روز`)
    } else if (!diffInDays && hoursPassed) {
      setDatePassedShown(`${hoursPassed} ساعت`)
    } else if (!hoursPassed && diffMins) {
      setDatePassedShown(`${diffMins} دقیقه`)
    } else if (!diffMins) {
      setDatePassedShown(`${diffSecs} ثانیه`)
    }
  }, [])
  return (
    <div className=" bg-white border-r-4 border-primary rounded-md my-2 mx-0 py-8 px-5 flex justify-between items-center">
      <div className="flex items-center">
        <div className="flex flex-col">
          <Link
            className=" text-black text-2xl font-bold max-w-[12rem]"
            to={`answer/${props._id}`}
          >
            {props.title}
          </Link>
          <span className="text-2xl my-4 mx-0  max-w-[11rem] py-6 px-2 bg-white rounded-3xl flex items-center">
            <FaEllipsisV className="text-2xl text-zinc-400 ml-2" />
            {props.departmentSubID}
          </span>
        </div>
        <div className="ticket-content__right-left">
          <span className="text-2xl">{props.user}</span>
        </div>
      </div>
      <div className="flex items-center">
        <div className=" ml-24 ">
          <div className="border-2 border-white rounded-[0 14px 14px 14px] py-2 px-12 relative">
            <span className="text-2xl">
              <FaCircle
                className={` absolute right-6 top-0 b-0 m-auto w-4 h-4 rounded-full ${
                  props.answer ? "text-green-400" : "text-info"
                }`}
              />
              {props.answer ? "پاسخ داده شده" : "پاسخ داده نشده"}
            </span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className=" text-2xl">{props.createdAt.slice(0, 10)}</span>
          <span className="text-2xl text-zinc-500 mt-4">
            {datePassedShown} قبل
          </span>
        </div>
      </div>
    </div>
  )
}
