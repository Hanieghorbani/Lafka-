import React, { useState, useEffect, useContext } from "react"
import ContextData from "../../../ContextData/ContextData"
import DataTable from "../../../components/Admin-panel/DataTable/DataTable"

import axios from "axios"
import swal from "sweetalert"

export default function Messages() {
  const [contacts, setContacts] = useState([])
  const { config } = useContext(ContextData)

  useEffect(() => {
    getAllContacts()
  }, [])

  function getAllContacts() {
    axios.get(`https://lafka-back.liara.run/v1/contact`).then((res) => {
      setContacts(res.data)
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
      buttons: ["لغو", "ارسال"],
    }).then((value) => {
      if (value && value.trim()) {
        const data = {
          email,
          answer: value,
        }
        axios
          .post("https://lafka-back.liara.run/v1/contact/answer", data, config)
          .then((res) => {
            swal({
              text: "پیغام شما ارسال شد",
              icon: "success",
              dangerMode: false,
              buttons: "تایید",
            }).then(() => {
              getAllContacts()
            })
          })
          .catch((err) => {
            swal({
              icon: "error",
              buttons: "تایید",
            })
            console.log(err)
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
        axios
          .delete(`https://lafka-back.liara.run/v1/contact/${id}`, config)
          .then(() => {
            swal({
              text: "پیغام با موفقیت حذف شد",
              icon: "success",
              dangerMode: false,
              buttons: "تایید",
            }).then(() => {
              getAllContacts()
            })
          })
          .catch((err) => {
            swal({
              text: "حذف پیغام با مشکل مواجه شد!",
              icon: "error",
              dangerMode: true,
              buttons: "تایید",
            })
            console.log(err)
          })
      }
    })
  }
  return (
    <div className="mx-auto sm:px-10">
      {contacts.length ? (
        <DataTable title={"پیغام کاربران"}>
          <table className="dataTable w-full text-center border-collapse mt-10">
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
                  <td
                    className={
                      contact.answer
                        ? "bg-green-400 text-white"
                        : "bg-info text-white"
                    }
                  >
                    {index + 1}
                  </td>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.phone}</td>
                  <td>
                    <button
                      type="button"
                      className="btn bg-blue-400 "
                      onClick={() =>
                        showContactBody(contact.name, contact.body)
                      }
                    >
                      مشاهده پیغام
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn bg-green-400"
                      onClick={() => answerContactHandler(contact.email)}
                    >
                      پاسخ
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn bg-info "
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
      ) : (
        <p className="text-xl text-center mt-20">
          هنوز پیغامی ثبت نشده است!
        </p>
      )}
    </div>
  )
}
