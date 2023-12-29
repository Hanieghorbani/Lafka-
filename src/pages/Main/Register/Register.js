import React, { useState, useEffect, useContext } from "react"
import Header from "../../../components/Header/Header"
import Footer from "../../../components/Footer/Footer"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import axios from "axios"
import ContextData from "../../../ContextData/ContextData"
import swal from "sweetalert"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
export default function Register() {
  const contextData = useContext(ContextData)
  const navigate = useNavigate()
  const initialValues = {
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  }
  function userLogin(values, { resetForm }) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }

    //  resetForm()
    axios
      .post("http://localhost:8000/v1/auth/register", values, config)
      .then((res) => {
        console.log(res.data)
        contextData.login([], res.data.accessToken)

        swal({
          text: " شما با موفقیت وارد حساب کاربری خود شدید",
          icon: "success",
          dangerMode: false,
          buttons: "ورود به پنل",
        }).then((value) => {
          navigate("/")
        })
      })
      .catch((err) => {
        if (err == 'Error: {"message":"this phone number banned!"}') {
          swal({
            text: "متاسفیم!شما از طرف مدیران سایت مسدود شدین..",
            icon: "error",
            dangerMode: true,
            buttons: "ارتباط با ما",
          }).then(() => {
            navigate("/contact")
          })
        } else if (
          err.response.status == 409
        ) {
          swal({
            text: "ایمیل یا نام کاربری تکراری است.",
            icon: "error",
            dangerMode: true,
            buttons: "تلاش مجدد",
          }).then(() => {
            navigate("/register")
          })
        }
      })
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("نام و نام خانوادگی الزامی است"),
    phone: Yup.string()
      .required("شماره موبایل الزامی است")
      .matches(
        /09(1[0-9]|3[1-9]|2[1-9]|9[0-9])-?[0-9]{3}-?[0-9]{4}/,
        "شماره مویابل را به درستی وارد کنید"
      ),
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
    confirmPassword: Yup.string()
      .required("تکرار رمز عبور الزامی است")
      .oneOf([Yup.ref("password"), null], "تکرار رمز عبور مطابقت ندارد"),
  })

  return (
    <div className="">
      <div className="bg-primary">
        <Header />
      </div>
      <div
        className={`flex flex-col justify-center items-center container-primary py-20 pt-60 bg-zinc-100`}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={userLogin}
          validationSchema={validationSchema}
        >
          <Form className="bg-white space-y-7 w-[40%] p-10 rounded-2xl">
            <h1 className="text-3xl text-center">عضویت</h1>
            <div className="text-center">
              <p className=" text-zinc-600">
                قبلا ثبت نام کرده اید؟{" "}
                <Link to={"/login"} className="text-info">
                  وارد شوید
                </Link>
              </p>
            </div>

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
            <div className="relative">
              <label
                htmlFor="confirmPassword"
                className="text-sm text-zinc-700"
              >
                تکرار رمز عبور*
              </label>
              <Field
                className="form-contact"
                type="password"
                id="confirmPassword"
                name="confirmPassword"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="error form-error  md:w-1/2"
              />
            </div>

            {/* login btn  */}
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="btn-yearStorySelect text-sm w-1/2"
              >
                ثبت نام
              </button>
            </div>
          </Form>
        </Formik>
      </div>
      <Footer />
    </div>
  )
}
