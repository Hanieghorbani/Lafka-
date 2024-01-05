import React, { useContext, useEffect, useState } from "react"

import swal from "sweetalert"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import ContextData from "../../../ContextData/ContextData"

export default function EditAccount() {
  const navigate = useNavigate()
  const { config, userInfos,setReLoading } = useContext(ContextData)
  const { name, username, email, phone } = userInfos
  const initialValues = {
    name,
    username,
    email,
    password: "",
    phone,
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

  function userEditInfos(values) {
    console.log(values)
    axios
      .put(`http://localhost:8000/v1/users`, values, config)
      .then((res) => {
        console.log(res)
        swal({
          text: "اطلاعات شما بروزرسانی شد",
          icon: "success",
          dangerMode: false,
          buttons: "تایید",
        }).then(() => {
          navigate("/my-account")
          setReLoading((prev) => !prev)
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

  return (
    <div className="w-full">
      <div className="">
        <div className="">
          <Formik
            initialValues={initialValues}
            onSubmit={userEditInfos}
            validationSchema={validationSchema}
          >
            <Form className="bg-white grid sm:grid-cols-1 md:grid-cols-2 gap-10 md:p-10 rounded-2xl">
              {/* name  */}
              <div className="relative">
                <label htmlFor="name" className="text-sm text-zinc-700">
                  نام و نام خانوادگی*
                </label>
                <Field
                  className="form-contact"
                  type="text"
                  id="name"
                  name="name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="error form-error  md:w-1/2"
                />
              </div>

              {/* user name  */}
              <div className="relative">
                <label htmlFor="username" className="text-sm text-zinc-700">
                  نام کاربری (نمایشی)*
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
              <div className="relative">
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

              {/* email  */}
              <div className="relative">
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

              {/* password  */}
              <div className="relative">
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

              {/* login btn  */}
              <div className="flex items-center justify-center md:col-span-2">
                <button
                  // type="submit"
                  className="btn-yearStorySelect text-sm w-1/2"
                >
                  ذخیره اطلاعات
                </button>
              </div>
            </Form>
          </Formik>
          {/* form for change pass */}
        </div>
      </div>
    </div>
  )
}
