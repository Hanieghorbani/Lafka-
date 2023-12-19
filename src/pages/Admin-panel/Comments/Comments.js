import React, { useEffect, useState } from "react"
// import DataTable from "./../../../components/AdminPanel/DataTable/DataTable"
import swal from "sweetalert"

export default function Comments() {
  const [comments, setComments] = useState([])
  const localStorageToken = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    getAllComments()
  }, [])

  function getAllComments() {
    fetch("http://localhost:8000/v1/comments")
      .then((res) => res.json())
      .then((allComments) => setComments(allComments))
  }

  function remvoeComment(id) {
    swal({
      text: "آیا از حذف این کامنت اطمینان دارید؟",
      icon: "warning",
      buttons: ["لغو", "حذف"],
    }).then((res) => {
      if (res) {
        fetch(`http://localhost:8000/v1/comments/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorageToken.token}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              text: "کامنت با موفقیت حذف شد",
              icon: "success",
              dangerMode: false,
              buttons: "تایید",
            }).then(() => {
              getAllComments()
            })
          }
        })
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
        fetch(`http://localhost:8000/v1/users/ban/${id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorageToken.token}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              text: "کاربر با موفقیت بن شد",
              icon: "success",
              dangerMode: false,
              buttons: "تایید",
            }).then(() => {
              getAllComments()
            })
          }
        })
      }
    })
  }

  function answerComment(id) {
    swal({
      text: "متن پاسخ را وارد کنید:",
      content: "input",
      buttons: "ارسال",
    }).then((value) => {
      if (value.trim()) {
        fetch(`http://localhost:8000/v1/comments/answer/${id}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorageToken.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ body: value }),
        }).then((res) => {
          if (res.ok) {
            swal({
              text: "پیغام شما ارسال شد",
              icon: "success",
              dangerMode: false,
              buttons: "تایید",
            }).then(() => {
              getAllComments()
            })
          } else {
            swal({
              title: "پیغام شما ارسال نشد!!",
              icon: "error",
              buttons: "تایید",
            })
          }
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
        fetch(`http://localhost:8000/v1/comments/accept/${id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorageToken.token}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              text: "کامنت با موفقیت تایید شد",
              icon: "success",
              dangerMode: false,
              buttons: "بستن",
            }).then(() => {
              getAllComments()
            })
          }else{
            swal({
              icon: "error",
              buttons: "تایید",
            })
          }
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
        fetch(`http://localhost:8000/v1/comments/reject/${id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorageToken.token}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              text: "کامنت با موفقیت رد شد",
              icon: "success",
              dangerMode: false,
              buttons: "بستن",
            }).then(() => {
              getAllComments()
            })
          }
        })
      }
    })
  }

  // return (
  //   <>
  //     <DataTable title="کامنت‌ها">
  //       <table className="table">
  //         <thead>
  //           <tr>
  //             <th>شناسه</th>
  //             <th>کاربر</th>
  //             <th>امتیاز</th>
  //             <th>دوره</th>
  //             <th>مشاهده</th>
  //             <th>پاسخ</th>
  //             <th>ویرایش</th>
  //             <th>تایید</th>
  //             <th>حذف</th>
  //             <th>بن</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {comments.map((comment, index) => (
  //             <tr key={comment._id}>
  //               <td
  //                 className={
  //                   comment.answer
  //                     ? "bg-success text-white"
  //                     : "bg-danger text-white"
  //                 }
  //               >
  //                 {index + 1}
  //               </td>
  //               <td>{comment.creator.name}</td>
  //               <td>{comment.score}</td>
  //               <td>{comment.course}</td>
  //               <td>
  //                 <button
  //                   type="button"
  //                   className="btn btn-primary edit-btn"
  //                   onClick={() =>
  //                     showCommentBody(comment.creator.name, comment.body)
  //                   }
  //                 >
  //                   مشاهده
  //                 </button>
  //               </td>
  //               <td>
  //                 <button
  //                   type="button"
  //                   className="btn btn-primary edit-btn"
  //                   onClick={() => answerComment(comment._id)}
  //                 >
  //                   پاسخ
  //                 </button>
  //               </td>
  //               <td>
  //                 <button type="button" className="btn btn-primary edit-btn">
  //                   ویرایش
  //                 </button>
  //               </td>
  //               {comment.answer ? (
  //                 <td>
  //                   <button
  //                     type="button"
  //                     className="btn btn-danger edit-btn"
  //                     onClick={() => rejectComment(comment._id)}
  //                   >
  //                     رد
  //                   </button>
  //                 </td>
  //               ) : (
  //                 <td>
  //                   <button
  //                     type="button"
  //                     className="btn btn-primary edit-btn "
  //                     onClick={() => acceptComment(comment._id)}
  //                   >
  //                     تایید
  //                   </button>
  //                 </td>
  //               )}

  //               <td>
  //                 <button
  //                   type="button"
  //                   className="btn btn-danger delete-btn"
  //                   onClick={() => remvoeComment(comment._id)}
  //                 >
  //                   حذف
  //                 </button>
  //               </td>
  //               <td>
  //                 <button
  //                   type="button"
  //                   className="btn btn-danger delete-btn"
  //                   onClick={() => banUser(comment.creator._id)}
  //                 >
  //                   بن
  //                 </button>
  //               </td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     </DataTable>
  //   </>
  // )
}
