import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { HiOutlineTicket } from "react-icons/hi2"
import Ticket from "../../../components/UserPanel/Ticket/Ticket"
export default function Tickets() {
  const [tickets, setTickets] = useState([])

  useEffect(() => {
    fetch(`http://localhost:8000/v1/tickets/user`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTickets(data)
      })
  }, [])

  return (
    <div className="w-full">
      <div className="pr-12">
        <div className=" border-b-2 border-primary flex justify-between items-center pb-5">
          <span className=" text-xl text-zinc-700 font-bold ">همه تیکت ها</span>
          <Link
            className="btn bg-info"
            to="/my-account/send-ticket"
          >
            ارسال تیکت جدید
          </Link>
        </div>
        <div className="flex">
          <div className="flex flex-col items-center shadow-[0px 0px 10px 1px rgba(43, 206, 86, 0.5)] rounded-sm w-1/5 my-8 mx-6 py-4 px-0 ticket-boxes__custom before:bg-orange-400">
            <HiOutlineTicket className="w-12 h-12 " />
            <span className="text-zinc-700 text-xl py-3 font-bold">باز</span>
            <span className="text-2xl text-orange-400">0</span>
          </div>
          <div className="flex flex-col items-center shadow-[0px 0px 10px 1px rgba(43, 206, 86, 0.5)] rounded-sm w-1/5 my-8 mx-6 py-4 px-0 before:bg-gray-400  ticket-boxes__custom">
            <HiOutlineTicket className="w-12 h-12 " />
            <span className="text-zinc-700  text-xl py-3 font-bold">بسته</span>
            <span className="text-2xl text-gray-500">
              2
            </span>
          </div>
          <div className="flex flex-col items-center shadow-[0px 0px 10px 1px rgba(43, 206, 86, 0.5)] rounded-sm w-1/5 my-8 mx-6 py-4 px-0 ticket-boxes__answered before:bg-green-400 ticket-boxes__custom">
            <HiOutlineTicket className="w-12 h-12 " />
            <span className="text-zinc-700 py-3 text-xl font-bold">
              پاسخ داده شده
            </span>
            <span className="text-2xl text-green-400">1</span>
          </div>
          <div className="flex flex-col items-center shadow-[0px 0px 10px 1px rgba(43, 206, 86, 0.5)] rounded-sm w-1/5 my-8 mx-6 py-4 px-0 ticket-boxes__finished ticket-boxes__custom before:bg-gray-400">
            <HiOutlineTicket className="w-12 h-12 " />
            <span className="text-zinc-700 text-xl  py-3 px-0 font-bold">
              پایان یافته
            </span>
            <span className="text-2xl text-gray-500">
              1
            </span>
          </div>
          <div className="flex flex-col items-center shadow-[0px 0px 10px 1px rgba(43, 206, 86, 0.5)] rounded-sm w-1/5 my-8 mx-6 py-4 px-0 ticket-boxes__custom">
            <HiOutlineTicket className=" w-12 h-12" />
            <span className="text-zinc-700 text-xl  py-3 px-0 font-bold">
              همه
            </span>
            <span className="text-2xl">2</span>
          </div>
        </div>
        <div className="ticket-filter">
          <form action="#" className="ticket-filter__form">
            <select className="shadow-[0px 0px 6px 1px rgba(43, 206, 86, 0.5)] rounded-md border-0 m-[1rem 0 1rem 1.5rem] p-[0.4rem 0.5rem 0.4rem 1rem] text-2xl bg-white">
              <option className="text-2xl" value="">
                همه
              </option>
              <option className="text-2xl" value="">
                فرستاده شده
              </option>
              <option className="text-2xl" value="">
                دریافتی
              </option>
            </select>
            <select className="shadow-[0px 0px 6px 1px rgba(43, 206, 86, 0.5)] rounded-md border-0 m-[1rem 0 1rem 1.5rem] p-[0.4rem 0.5rem 0.4rem 1rem] text-2xl bg-white">
              <option className="text-2xl" value="">
                همه
              </option>
              <option className="text-2xl" value="">
                باز
              </option>
              <option className="text-2xl" value="">
                بسته
              </option>
              <option className="text-2xl" value="">
                پاسخ داده شده
              </option>
              <option className="text-2xl" value="">
                پایان یافته
              </option>
            </select>
            <select className="shadow-[0px 0px 6px 1px rgba(43, 206, 86, 0.5)] rounded-md border-0 m-[1rem 0 1rem 1.5rem] p-[0.4rem 0.5rem 0.4rem 1rem] text-2xl bg-white">
              <option className="text-2xl" value="">
                تاریخ پاسخ
              </option>
              <option className="text-2xl" value="">
                تاریخ ایجاد
              </option>
            </select>
            <button className="bg-primary text-white text-2xl rounded-md border-0 py-2 px-6" type="submit">
              اعمال
            </button>
          </form>
        </div>
        <div className="my-8 mx-0">
          <span className=" text-2xl font-bold text-zinc-700">
            نمایش {tickets.length} تیکت
          </span>
          {tickets.map((ticket) => (
            <Ticket key={ticket._id} {...ticket} />
          ))}
        </div>
      </div>
    </div>
  )
}
