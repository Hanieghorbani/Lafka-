import React, { useContext, useEffect, useState } from "react"
import ContextData from "../../../ContextData/ContextData"
import Pagination from "../../../components/Pagination/Pagination"
import DataTable from "../../../components/Admin-panel/DataTable/DataTable"

import axios from "axios"
import swal from "sweetalert"

export default function Comments() {
  const [comments, setComments] = useState([])
  const [shownItems, setShownItems] = useState([])
  const { config } = useContext(ContextData)
  useEffect(() => {
    getAllComments()
  }, [])

  function getAllComments() {
    axios
      .get("http://localhost:8000/v1/comments")
      .then((res) => {
        setComments(res.data)
      })
      .catch((err) => console.log(err))
  }

  function remvoeComment(id) {
    swal({
      text: "آیا از حذف این کامنت اطمینان دارید؟",
      icon: "warning",
      buttons: ["لغو", "حذف"],
    }).then((res) => {
      if (res) {
        axios
          .delete(`http://localhost:8000/v1/comments/${id}`, config)
          .then(() => {
            swal({
              text: "کامنت با موفقیت حذف شد",
              icon: "success",
              dangerMode: false,
              buttons: "تایید",
            }).then(() => {
              getAllComments()
            })
          })
          .catch((err) => console.log(err))
      }
    })
  }

  function showCommentBody(name, body) {
    swal({
      text: `${name}: ${body}`,
      buttons: "تایید",
    })
  }

  function banUser(id) {
    swal({
      text: "آیا از بن کردن کاربر اطمینان دارید؟",
      icon: "warning",
      buttons: ["لغو", "بن"],
    }).then((res) => {
      if (res) {
        axios
          .put(`http://localhost:8000/v1/users/ban/${id}`, {}, config)
          .then(() => {
            swal({
              text: "کاربر با موفقیت بن شد",
              icon: "success",
              dangerMode: false,
              buttons: "تایید",
            }).then(() => {
              getAllComments()
            })
          })
          .catch((err) => console.log(err))
      }
    })
  }

  function answerComment(id) {
    swal({
      text: "متن پاسخ را وارد کنید:",
      content: "input",
      buttons: ["لغو", "ارسال"],
    }).then((value) => {
      if (value && value.trim()) {
        const body = {
          body: value,
        }
        axios
          .post(`http://localhost:8000/v1/comments/answer/${id}`, body, config)
          .then(() => {
            swal({
              text: "پیغام شما ارسال شد",
              icon: "success",
              dangerMode: false,
              buttons: "تایید",
            }).then(() => {
              getAllComments()
            })
          })
          .catch((err) => {
            swal({
              title: "پیغام شما ارسال نشد!",
              icon: "error",
              buttons: "تایید",
            })
            console.log(err)
          })
      }
    })
  }

  function acceptComment(id) {
    swal({
      text: "آیااز تایید کامنت اطمینان دارید؟",
      icon: "warning",
      buttons: ["لغو", "تایید"],
    }).then((res) => {
      if (res) {
        axios
          .put(`http://localhost:8000/v1/comments/accept/${id}`, {}, config)
          .then(() => {
            swal({
              text: "کامنت با موفقیت تایید شد",
              icon: "success",
              dangerMode: false,
              buttons: "بستن",
            }).then(() => {
              getAllComments()
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
  function rejectComment(id) {
    swal({
      text: "آیااز رد کامنت اطمینان دارید؟",
      icon: "warning",
      buttons: ["لغو", "رد"],
    }).then((res) => {
      if (res) {
        axios
          .put(`http://localhost:8000/v1/comments/reject/${id}`, {}, config)
          .then(() => {
            swal({
              text: "کامنت با موفقیت رد شد",
              icon: "success",
              dangerMode: false,
              buttons: "بستن",
            }).then(() => {
              getAllComments()
            })
          })
          .catch((err) => console.log(err))
      }
    })
  }
  return (
    <div className="container-primary">
      <DataTable title={"لیست کامنت ها"}>
        <table className="dataTable w-full text-center border-collapse mt-10">
          <thead>
            <tr>
              <th>کاربر</th>
              <th>امتیاز</th>
              <th>محصول</th>
              <th>مشاهده</th>
              <th>پاسخ</th>
              <th>ویرایش</th>
              <th>تایید/رد</th>
              <th>حذف</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {shownItems.map((comment, index) => (
              <tr key={comment._id}>
                <td>{comment.creator.name}</td>
                <td>{comment.score}</td>
                <td>{comment.course}</td>
                <td>
                  <button
                    type="button"
                    className="btn bg-blue-400"
                    onClick={() =>
                      showCommentBody(comment.creator.name, comment.body)
                    }
                  >
                    مشاهده
                  </button>
                </td>
                {comment.answer ? (
                  <td>
                    <button
                      type="button"
                      className="btn bg-green-400 "
                      onClick={() => rejectComment(comment._id)}
                    >
                      رد
                    </button>
                  </td>
                ) : (
                  <td>
                    <button
                      type="button"
                      className="btn bg-info"
                      onClick={() => acceptComment(comment._id)}
                    >
                      تایید
                    </button>
                  </td>
                )}

                <td>
                  <button
                    type="button"
                    className="btn bg-blue-400 "
                    onClick={() => answerComment(comment._id)}
                  >
                    پاسخ
                  </button>
                </td>
                <td>
                  <button type="button" className="btn bg-gray-400 ">
                    ویرایش
                  </button>
                </td>

                <td>
                  <button
                    type="button"
                    className="btn bg-gray-400"
                    onClick={() => banUser(comment.creator._id)}
                  >
                    بن
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn bg-info"
                    onClick={() => remvoeComment(comment._id)}
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>

      <Pagination
        items={comments}
        itemsCount={5}
        pathname="/p-admin/comments"
        setShownItems={setShownItems}
      />
    </div>
  )
}
