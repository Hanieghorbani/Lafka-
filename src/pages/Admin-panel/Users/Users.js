import React, { useEffect, useState } from "react"
import DataTable from "../../../components/AdminPanel/DataTable/DataTable"
import swal from "sweetalert"

import Swal from "sweetalert2"
import { click } from "@testing-library/user-event/dist/click"

export default function Users() {
  const [role, setRole] = useState("")
  const [users, setUsers] = useState([])

  const localStorageToken = JSON.parse(localStorage.getItem("user"))
  useEffect(() => {
    getAllUsers()
  }, [])

  function getAllUsers() {
    fetch("http://localhost:8000/v1/users", {
      headers: {
        Authorization: `Bearer ${localStorageToken.token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setUsers(result)
      })
  }

  function deleteUser(id) {
    swal({
      text: "آیا از حذف کاربر اطمینان دارید؟",
      icon: "warning",
      buttons: ["لغو", "حذف"],
    }).then((res) => {
      if (res) {
        fetch(`http://localhost:8000/v1/users/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorageToken.token}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              text: "کاربر با موفقیت حذف شد",
              icon: "success",
              dangerMode: false,
              buttons: "تایید",
            }).then(() => {
              getAllUsers()
            })
          }
        })
      }
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
              getAllUsers()
            })
          }
        })
      }
    })
  }

  function registerNewUser(event) {
  //   event.preventDefault()
  //   console.log(formState.inputs);
  //   if (
  //     formState.inputs.password.value ===
  //     formState.inputs.confirmPassword.value
  //   ) {
  //     const newUserInfo = {
  //       name: formState.inputs.name.value,
  //       username: formState.inputs.username.value,
  //       email: formState.inputs.email.value,
  //       phone: formState.inputs.phone.value,
  //       password: formState.inputs.password.value,
  //       confirmPassword: formState.inputs.password.value,
  //     }
      
      

  //     fetch("http://localhost:8000/v1/auth/register", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(newUserInfo),
  //     })
  //       .then((res) => {
  //         if (res.ok) {
  //           return res.json()
  //         } else {
  //           return res.text().then((text) => {
  //             throw new Error(text)
  //           })
  //         }
  //       })
  //       .then((result) => {
  //         swal({
  //           text: "کاربر مورد نظر با موفقیت ثبت نام شد",
  //           icon: "success",
  //           dangerMode: false,
  //           buttons: "تایید",
  //         }).then(() => {
  //           getAllUsers()
  //         })
  //       })
  //       .catch((err) => {
  //         if (err == 'Error: {"message":"this phone number banned!"}') {
  //           swal({
  //             text: "این شماره تلفن مسدود شده",
  //             icon: "error",
  //             dangerMode: true,
  //             buttons: "تایید",
  //           })
  //         } else if (
  //           err == 'Error: {"message":"username or email is duplicate."}'
  //         ) {
  //           swal({
  //             text: "ایمیل یا نام کاربری تکراری است.",
  //             icon: "error",
  //             dangerMode: true,
  //             buttons: "تایید",
  //           })
  //         }
  //         {
  //         }
  //       })
  //   } else {
  //     swal({
  //       text: "تکرار رمز عبور اشتباه است !",
  //       icon: "error",
  //       dangerMode: true,
  //       buttons: "تلاش مجدد",
  //     })
  //   }
  // }

  // function roleChange(id) {
  //   swal({
  //     text: "نقش کاربر را وارد کنید: (ADMIN or USER)",
  //     content: "input",
  //     buttons: "ارسال",
  //   }).then((role) => {
  //     if (role.trim()) {
  //       fetch(`http://localhost:8000/v1/users/role`, {
  //         method: "PUT",
  //         headers: {
  //           Authorization: `Bearer ${localStorageToken.token}`,
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ role, id }),
  //       }).then((res) => {
  //         if (res.ok) {
  //           swal({
  //             text: `نقش کاربر به ${
  //               role == "ADMIN" ? "مدیر" : "کاربر عادی"
  //             } تغیر یافت`,
  //             icon: "success",
  //             dangerMode: false,
  //             buttons: "تایید",
  //           }).then(() => {
  //             getAllUsers()
  //           })
  //         } else {
  //           swal({
  //             icon: "error",
  //             buttons: "تایید",
  //           })
  //         }
  //       })
  //     }
  //   })
  }

  return (
    <>
      <div className="home-content-edit">
        <div className="back-btn">
          <i className="fas fa-arrow-right"></i>
        </div>
        <form className="form">
          <div className="col-6">
            <div className="name input">
              <label className="input-title">نام و نام خانوادگی</label>
              {/* <Input
                type="text"
                className=""
                id="name"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا نام و نام خانوادگی کاربر را وارد کنید..."
              /> */}
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-6">
            <div className="family input">
              <label className="input-title">نام کاربری</label>
              {/* <Input
                type="text"
                className=""
                id="username"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا نام کاربری را وارد کنید..."
              /> */}
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-6">
            <div className="email input">
              <label className="input-title">ایمیل</label>
              {/* <Input
                type="text"
                className=""
                id="email"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                  emailValidator(),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا ایمیل کاربر را وارد کنید..."
              /> */}
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-6">
            <div className="password input">
              <label className="input-title">رمز عبور</label>
              {/* <Input
                type="text"
                className=""
                id="password"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا رمز عبور کاربر را وارد کنید..."
              /> */}
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-6">
            <div className="password input">
              <label className="input-title">نکرار رمز عبور</label>
              {/* <Input
                type="text"
                className=""
                id="confirmPassword"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا تکرار رمز عبور کاربر را وارد کنید..."
              /> */}
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-6">
            <div className="phone input">
              <label className="input-title">شماره تلفن</label>
              {/* <Input
                type="text"
                className=""
                id="phone"
                element="input"
                validations={[phoneValidator()]}
                onInputHandler={onInputHandler}
                placeholder="لطفا شماره تلفن کاربر را وارد کنید..."
              /> */}
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-12">
            <div className="bottom-form">
              <div className="submit-btn">
                <input type="submit" value="افزودن" onClick={registerNewUser} />
              </div>
            </div>
          </div>
        </form>
      </div>
      <DataTable title="کاربران">
        <table className="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>نام</th>
              <th>شماره</th>
              <th>ایمیل</th>
              <th>نقش</th>
              <th>تغییر نقش</th>
              <th>ویرایش</th>
              <th>حذف</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {users.length ? (
              <>
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.phone}</td>
                    <td>{user.email}</td>
                    <td>{user.role == "ADMIN" ? "مدیر" : "کاربر عادی"}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary edit-btn"
                        // onClick={() => roleChange(user._id)}
                      >
                        تغییر نقش
                      </button>
                    </td>
                    <td>
                      <button type="button" className="btn btn-primary edit-btn">
                        ویرایش
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger delete-btn"
                        onClick={() => deleteUser(user._id)}
                      >
                        حذف
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-secondary delete-btn"
                        onClick={() => banUser(user._id)}
                      >
                        بن
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <tr className="alert alert-warning">
                <td>هیچ کاربری یافت نشد !</td>
              </tr>
            )}
          </tbody>
        </table>
      </DataTable>
    </>
  )
}
