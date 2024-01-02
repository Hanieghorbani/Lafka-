import React, { useContext, useEffect, useState } from "react"

import swal from "sweetalert"

import { useNavigate } from "react-router-dom"

export default function EditAccount() {
  const navigate = useNavigate()
  // const localStorageToken = JSON.parse(localStorage.getItem("user"))

  // function ChangeInfosHandler(e) {
  //   e.preventDefault()

  //   fetch(`http://localhost:8000/v1/users/`, {
  //     method: "PUT",
  //     headers: {
  //       Authorization: `Bearer ${localStorageToken.token}`,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(newInfosUser),
  //   }).then((res) => {
  //     if (res.ok) {
  //       swal({
  //         text: 'اطلاعات شما بروزرسانی شد',
  //         icon: "success",
  //         dangerMode: false,
  //         buttons: "تایید",
  //       }).then(() => {
  //         navigate('/my-account')
  //       })
  //     }
  //     swal({
  //       icon: "error",
  //       buttons: "تایید",
  //     })
  //   })
  // }

  return (
    <div className="w-full">
      <div className="edit">
        <form className="edit__form" action="#">
          <div className="edit__personal">
            <div className="row">{/* formik  */}</div>
            {/* form for change pass */}
          </div>
        </form>
      </div>
    </div>
  )
}
