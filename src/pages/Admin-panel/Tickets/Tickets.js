import React, { useEffect, useState } from "react"
import DataTable from "./../../../components/AdminPanel/DataTable/DataTable"
import swal from "sweetalert"

export default function Tickets() {
  const [tickets, setTickets] = useState([])
  const localStorageToken = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    fetch(`http://localhost:8000/v1/tickets`, {
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

  function showTicket(name, body) {
    swal({
      text: `${name}: ${body}`,
      buttons: "تایید",
    })
  }

  function answerTicket(id) {
    swal({
      text: "متن پاسخ را وارد کنید:",
      content: "input",
      buttons: "ارسال",
    }).then((value) => {
      if (value.trim()) {
        fetch(`http://localhost:8000/v1/tickets/answer`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorageToken.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ticketID: id, body: value }),
        }).then((res) => {
          if (res.ok) {
            swal({
              text: "پیغام شما ارسال شد",
              icon: "success",
              dangerMode: false,
              buttons: "تایید",
            }).then(() => {})
          } else {
            swal({
              icon: "error",
              buttons: "تایید",
            })
          }
        })
      }
    })
  }

  return (
    <>
      <DataTable title="تیکت‌ها">
        <table className="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>کاربر</th>
              <th>عنوان</th>
              <th>نوع تیکت</th>
              <th>دوره</th>
              <th>اولویت</th>
              <th>مشاهده</th>
              <th>پاسخ</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (
              <tr key={ticket._id}>
                <td>{index + 1}</td>
                <td>{ticket.user}</td>
                <td>{ticket.title}</td>
                <td>{ticket.departmentSubID}</td>
                <td>{ticket.course ? ticket.course : "---"}</td>
                <td>
                  {ticket.priority === 3 && "بالا"}
                  {ticket.priority === 2 && "متوسط"}
                  {ticket.priority === 1 && "کم"}
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary edit-btn"
                    onClick={() => showTicket(ticket.user, ticket.body)}
                  >
                    مشاهده
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary edit-btn"
                    onClick={() => answerTicket(ticket._id)}
                  >
                    پاسخ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </>
  )
}
