import React, { useEffect, useState } from "react"
import DataTable from "../../../components/AdminPanel/DataTable/DataTable"
import swal from "sweetalert"

export default function Contact() {
  const [contacts, setContacts] = useState([])
  const localStorageData = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    getAllContacts()
  }, [])

  function getAllContacts() {
    fetch("http://localhost:8000/v1/contact")
      .then((res) => res.json())
      .then((allContacts) => {
        setContacts(allContacts)
      })
  }
  function showContactBody(name, body) {
    swal({
      text: `${name}: ${body}`,
      buttons: "تایید",
    })
  }

  function answerContactHandler(email) {
    swal({
      text: "متن پاسخ را وارد کنید:",
      content: "input",
      buttons: "ارسال",
    }).then((value) => {
      if (value.trim()) {
        fetch("http://localhost:8000/v1/contact/answer", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            answer: value,
          }),
        }).then((res) => {
          if (res.ok) {
            swal({
              text: "پیغام شما ارسال شد",
              icon: "success",
              dangerMode: false,
              buttons: "تایید",
            }).then(()=>{
              getAllContacts()
            })
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

  function removeContact(id) {
    swal({
      text: "آیا از حذف این پیغام اطمینان دارید؟",
      icon: "warning",
      buttons: ["لغو", "حذف"],
    }).then((res) => {
      if (res) {
        fetch(`http://localhost:8000/v1/contact/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              text: "پیغام با موفقیت حذف شد",
              icon: "success",
              dangerMode: false,
              buttons: "تایید",
            }).then(() => {
              getAllContacts()
            })
          } else {
            swal({
              text: "حذف پیغام با مشکل مواجه شد!",
              icon: "error",
              dangerMode: true,
              buttons: "تایید",
            })
          }
        })
      }
    })
  }
  return (
    <>
      <DataTable title="پیغام‌ها">
        <table className="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>نام و نام خانوادگی</th>
              <th>ایمیل</th>
              <th>شماره تماس</th>
              <th>مشاهده</th>
              <th>حذف</th>
              <th>پاسخ</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr key={contact._id}>
                <td className={contact.answer ? 'bg-success text-white' : 'bg-danger text-white'}>{index + 1}</td>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary edit-btn"
                    onClick={() => showContactBody(contact.name, contact.body)}
                  >
                    مشاهده پیغام
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary edit-btn"
                    onClick={() => answerContactHandler(contact.email)}
                  >
                    پاسخ
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger delete-btn"
                    onClick={() => removeContact(contact._id)}
                  >
                    حذف
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
