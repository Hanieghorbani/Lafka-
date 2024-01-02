import React, { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { MdKeyboardVoice } from "react-icons/md"

import { FaLink, FaBars, FaPlus, FaChevronRight } from "react-icons/fa6"
import ContextData from "../../../ContextData/ContextData"
export default function TicketAnswer() {
  const { id } = useParams()
  const [ticketInfo, setTicketInfo] = useState({})
  const contextDatas = useContext(ContextData)
  useEffect(() => {
    fetch(`http://localhost:8000/v1/tickets/answer/${id}`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTicketInfo(data)
      })
  }, [])

  return (
    <div className="w-full">
      <div className="pr-12">
        <div className="border-b-2 border-primary flex justify-between">
          <Link
            className="text-2xl text-zinc-700 font-bold"
            to="/my-account/send-ticket"
          >
            ارسال تیکت جدید
          </Link>
        </div>
        <div className="py-8 flex items-center">
          <div className="">
            <a
              className="flex items-center justify-center w-20 h-20 bg-primary rounded-full"
              href="#"
            >
              <FaChevronRight className="text-4xl text-white" />
            </a>
          </div>
          <div className="mr-8">
            <span className="flex text-3xl font-bold">تیکت تست</span>
            <span className="flex text-2xl">شناسه تیکت : 2070</span>
          </div>
        </div>
        <div className="">
          <div className="flex justify-between mt-8">
            <div className="flex">
              <div className="relative ml-10 after:context-[' '] after:absolute after:w-2 h-[90%] bg-zinc-4 right-14">
                <MdKeyboardVoice className="text-8 text-zinc-4 " />
                <span className=" text-zinc-700">0</span>
              </div>
              <div className="ticket-send__header-pin">
                <FaLink className="text-8 text-zinc-4" />
                <span className=" text-zinc-700">0</span>
              </div>
            </div>
            <div className="ticket-send__header-left">
              <FaBars className="text-8 text-zinc-700" />
            </div>
          </div>
          <div className="flex items-center justify-center my-8 relative after:context-[' '] after:absolute after:w-full after:bg-primary after:z-[-1]">
            <span className="flex items-center bg-primary text-white rounded-2xl text-2 py-1 px-8">تیکت شما</span>
          </div>
          <div className="ticket-send__answer">
            <div className="bg-primary text-white text-2xl w-[55rem] rounded-[2rem 2rem 0 2rem] py-10 px-6 mb-2 text-justify">
              <p className="ticket-send__answer-text">{ticketInfo.ticket}</p>
            </div>
            <div className="ticket-send__answer-bottom">
              <span className="ticket-send__answer-name text-2xl text-zinc-800 ml-3 font-bold ">
                {contextDatas.userInfos.name}
              </span>
              <span className="ticket-send__answer-date text-2xl text-zinc-800 ml-3 font-bold ">
                2022-11-29{" "}
              </span>
              <span className="ticket-send__answer-time text-2xl text-zinc-800 ml-3 font-bold ">
                14:28
              </span>
            </div>
          </div>
          <div className="ticket-send__title">
            <span className="ticket-send__title-text">پاسخ ها</span>
          </div>

          {!ticketInfo.answer ? (
            <div className="alert alert-danger">
              هنوز پاسخی برای تیکت ارسال نشده
            </div>
          ) : (
            <div className=" flex flex-col items-end">
              <div className=" bg-blue-400 text-white text-2xl w-[55rem] rounded-[2rem 2rem 2rem 0] py-8 px-6 mb-2 text-justify">
                <p className="ticket-send__answer-user-text">
                  {ticketInfo.answer}
                </p>
              </div>
              <div className="ticket-send__answer-user-bottom">
                <span className="ticket-send__answer-user-name  text-2xl text-zinc-700 mr-3 font-bold">
                  محمد امین سعیدی راد
                </span>
                <span className="ticket-send__answer-user-date text-2xl text-zinc-700 mr-3 font-bold">
                  2022-11-29
                </span>
                <span className="ticket-send__answer-user-time text-2xl text-zinc-700 mr-3 font-bold">
                  14:28
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
