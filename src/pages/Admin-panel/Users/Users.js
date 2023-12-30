import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import DataTable from "../../../components/Admin-panel/DataTable/DataTable"
import axios from "axios"
import Swal from "sweetalert2"
import swal from "sweetalert"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
export default function Users() {
  const [users, setUsers] = useState([])
  const [selectUser, setSelectUser] = useState([])
  const localStorageToken = JSON.parse(localStorage.getItem("user"))
  const config = {
    headers: {
      Authorization: `Bearer ${localStorageToken.token}`,
      "Content-Type": "application/json",
    },
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("نام و نام خانوادگی الزامی است"),
    phone: Yup.string()
      .required("شماره موبایل الزامی است")
      .matches(
        /09(1[0-9]|3[1-9]|2[1-9]|9[0-9])-?[0-9]{3}-?[0-9]{4}/,
        "شماره مویابل را به درستی وارد کنید"
      )
      .max(11, "شماره مویابل را به درستی وارد کنید"),
    username: Yup.string()
      .required("نام کاربری الزامی است")
      .matches(
        /^[a-zA-Z0-9-]+$/,
        "در نام کاربری فقط استفاده از حروف انگلیسی، اعداد و ـ (زیر خط) مجاز است."
      ),
    email: Yup.string()
      .email("ایمیل را به درستی وارد کنید")
      .required("ایمیل الزامی است"),
    password: Yup.string()
      .required("گذرواژه الزامی است")
      .min(8, "رمز عبور باید حداقل 8 کاراکتر باشد"),
  })
  useEffect(() => {
    getAllUsers()
  }, [])

  function getAllUsers() {
    axios
      .get("http://localhost:8000/v1/users", config)
      .then((res) => {
        setUsers(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  function deleteUser(id) {
    swal({
      text: "آیا از حذف کاربر اطمینان دارید؟",
      icon: "warning",
      buttons: ["لغو", "حذف"],
    }).then((res) => {
      if (res) {
        axios
          .delete(`http://localhost:8000/v1/users/${id}`, config)
          .then(() => {
            swal({
              text: "کاربر با موفقیت حذف شد",
              icon: "success",
              dangerMode: false,
              buttons: "تایید",
            }).then(() => {
              getAllUsers()
            })
          })
          .catch((err) => console.log(err))
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
        axios
          .put(`http://localhost:8000/v1/users/ban/${id}`, {}, config)
          .then(() => {
            swal({
              text: "کاربر با موفقیت بن شد",
              icon: "success",
              dangerMode: false,
              buttons: "تایید",
            }).then(() => {
              getAllUsers()
            })
          })
          .catch((err) => console.log(err))
      }
    })
  }

  function roleChange(id) {
    swal({
      text: "نقش کاربر را وارد کنید: (ADMIN or USER)",
      content: "input",
      buttons: "ارسال",
    }).then((role) => {
      if (role.trim()) {
        axios
          .put("http://localhost:8000/v1/users/role", { role, id }, config)
          .then(() => {
            swal({
              text: `نقش کاربر به ${
                role == "ADMIN" ? "مدیر" : "کاربر عادی"
              } تغیر یافت`,
              icon: "success",
              dangerMode: false,
              buttons: "تایید",
            }).then(() => {
              getAllUsers()
            })
          })
          .catch((err) => {
            console.log(err)
            swal({
              icon: "error",
              buttons: "تایید",
            })
          })
      }
    })
  }

  function updateUser(userInfos) {
    setSelectUser(userInfos)
    const seetAlertContainer = document.createElement("div")
    document.body.appendChild(seetAlertContainer)
    const initialValues = {
      name: userInfos.name,
      username: userInfos.username,
      email: userInfos.email,
      password: "",
      phone: userInfos.phone,
    }
    Swal.fire({
      title: "اطلاعات جدید را وارد کنید",
      html: '<div id="formik-yup"></div>',
      showCloseButton: true,
      showConfirmButton: false,
      showCancelButton: false,
    })

    ReactDOM.render(
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={changeUserHandler}
      >
        <Form
          id="formik-yup"
          className="grid grid-cols-2 gap-4 bg-white p-10 rounded-2xl"
        >
          {/* name  */}
          <div className="text-start">
            <label htmlFor="name" className="text-sm text-zinc-700">
              نام و نام خانوادگی*
            </label>
            <Field className="form-contact" type="text" id="name" name="name" />
            <ErrorMessage
              name="name"
              component="div"
              className="error form-error  md:w-1/2"
            />
          </div>

          {/* user name  */}
          <div className="text-start">
            <label htmlFor="username" className="text-sm text-zinc-700">
              نام کاربری*
            </label>
            <Field
              className="form-contact"
              type="text"
              id="username"
              name="username"
            />
            <ErrorMessage
              name="username"
              component="div"
              className="error form-error  md:w-1/2"
            />
          </div>

          {/* phone  */}
          <div className="text-start">
            <label htmlFor="phone" className="text-sm text-zinc-700">
              شماره موبایل*
            </label>
            <Field
              className="form-contact"
              type="text"
              id="phone"
              name="phone"
            />
            <ErrorMessage
              name="phone"
              component="div"
              className="error form-error  md:w-1/2"
            />
          </div>

          {/* password  */}
          <div className="text-start">
            <label htmlFor="password" className="text-sm text-zinc-700">
              رمزعبور*
            </label>
            <Field
              className="form-contact"
              type="password"
              id="password"
              name="password"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="error form-error  md:w-1/2"
            />
          </div>
          {/* email  */}
          <div className=" col-span-2 text-start">
            <label htmlFor="email" className="text-sm text-zinc-700">
              آدرس ایمیل*
            </label>
            <Field
              className="form-contact"
              type="email"
              id="email"
              name="email"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="error form-error  md:w-1/2"
            />
          </div>

          {/* change btn  */}
          <div className="flex items-center justify-center col-span-2">
            <button type="submit" className="btn-yearStorySelect text-sm w-1/2">
              ثبت
            </button>
          </div>
        </Form>
      </Formik>,
      document.getElementById("formik-yup")
    )
  }

  function changeUserHandler(values) {
    // axios.put("http://localhost:4000/v1/users/", values, config)
    console.log(values)

    swal({
      text: "برای این قسمت هنوز api نوشته نشده.فقط کاربر میتواند از طریق پنل کاربری اقدام به به روزرسانی اطلاعات خود کند",
      icon: "success",
      dangerMode: false,
      buttons: "تایید",
    }).then(() => {
      getAllUsers()
    })

    
    //get token => error password not correct
    // const datas = {
    //   identifier: selectUser.username,
    //   password: selectUser.password,
    // }
    // axios
    //   .post("http://localhost:8000/v1/auth/login", datas, config)
    //   .then((res) => {
    //     console.log(res)
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
  }
  return (
    <div>
      <DataTable title={"لیست کاربران"}>
        <table className="dataTable w-full text-center border-collapse mt-10">
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
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>{user.role == "ADMIN" ? "مدیر" : "کاربر عادی"}</td>
                <td>
                  <button
                    className="btn bg-blue-500"
                    onClick={() => roleChange(user._id)}
                  >
                    تغییر نقش
                  </button>
                </td>
                <td>
                  <button
                    className="btn bg-green-400"
                    onClick={() => {
                      // setSelectUser(user)
                      updateUser(user)
                    }}
                  >
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    className="btn bg-info text-sm"
                    onClick={() => deleteUser(user._id)}
                  >
                    حذف
                  </button>
                </td>
                <td>
                  <button
                    className="btn bg-gray-400 text-sm"
                    onClick={() => banUser(user._id)}
                  >
                    بن
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </div>
  )
}
