import React, { useContext, useEffect, useState } from "react"
import ContextData from "../../../ContextData/ContextData"
import DataTable from "../../../components/Admin-panel/DataTable/DataTable"
import Pagination from "../../../components/Pagination/Pagination"
import Input from "../../../components/Fields/Input/Input"

import { Formik, Form} from "formik"
import * as Yup from "yup"
import ReactDOM from "react-dom"
import axios from "axios"
import Swal from "sweetalert2"
import swal from "sweetalert"


export default function Users() {
  const { config } = useContext(ContextData)
  const [users, setUsers] = useState([])
  const [shownItems, setShownItems] = useState([])
  const [selectUser, setSelectUser] = useState([])

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
      .get("https://lafka-back.liara.run/v1/users", config)
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
          .delete(`https://lafka-back.liara.run/v1/users/${id}`, config)
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
          .put(`https://lafka-back.liara.run/v1/users/ban/${id}`, {}, config)
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
      buttons: ["لغو", "ارسال"],
    }).then((role) => {
      if (role != null && role.trim()) {
        axios
          .put("https://lafka-back.liara.run/v1/users/role", { role, id }, config)
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
          className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 bg-white p-10 rounded-2xl"
        >
          <Input label={"نام و نام خانوادگی*"} id={"name"} />

          <Input label={"نام کاربری*"} id={"username"} />

          <Input id={"phone"} label={"شماره موبایل*"} />

          <Input id="password" label={"رمزعبور*"} />
          <div className="lg:col-span-2">
            <Input label={"آدرس ایمیل*"} id={"email"} />
          </div>

          {/* change btn  */}
          <div className="flex items-center justify-center lg:col-span-2">
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
    axios
      .put(`https://lafka-back.liara.run/v1/users/${selectUser._id}`, values, config)
      .then((res) => {
        swal({
          text: "ویرایش کاربر با موفقیت انجام شد",
          icon: "success",
          buttons: "تایید",
        }).then(() => {
          getAllUsers()
        })
      })
      .catch((err) => console.log(err))
  }
  return (
    <div className="mx-auto sm:px-10">
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
            {shownItems.map((user, index) => (
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

      <Pagination
        items={users}
        itemsCount={5}
        pathname="/p-admin/users"
        setShownItems={setShownItems}
      />
    </div>
  )
}
