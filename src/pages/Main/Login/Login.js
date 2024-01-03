import React, { useState, useEffect, useContext } from "react"
import Header from "../../../components/Main/Header/Header"
import Footer from "../../../components/Main/Footer/Footer"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import useFetch from "../../../hooks/useFetch"
import axios from "axios"
import ContextData from "../../../ContextData/ContextData"
import swal from "sweetalert"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
export default function Login() {

  const contextData = useContext(ContextData)
  const navigate = useNavigate()
  const initialValues = {
    identifier: "",
    password: "",
  }


  function userLogin(values, { resetForm }) {
    console.log(values)
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }

    //  resetForm()
    axios
      .post("http://localhost:8000/v1/auth/login", values, config)
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
      .catch((err) =>
        swal({
          text:
            err == 'Error: "there is no user with this email or username"'
              ? "نام کاربری اشتباه است"
              : "رمز عبور اشتباه است",
          icon: "error",
          dangerMode: true,
          buttons: "تلاش مجدد",
        }).then((value) => {
          navigate("/login")
        })
      )
  }

  const validationSchema = Yup.object().shape({
    identifier: Yup.string()
      .required("نام کاربری یا آدرس ایمیل الزامی است")
      .min(3, "نام باید حداقل ۳ حرف داشته باشد"),
    password: Yup.string().required("رمز عبور الزامی است").min(8,'رمز عبور باید حداقل 8 کاراکتر باشد'),
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
            <h1 className="text-3xl text-center">ورود</h1>
            <div className="text-center">
              <p className=" text-zinc-600">
                حساب کاربر ندارید؟{" "}
                <Link to={"/register"} className="text-info">
                  ثبت نام
                </Link>
              </p>
            </div>
            <div className="relative">
              <label htmlFor="identifier" className="text-sm text-zinc-700">
                نام کاربر یا آدرس ایمیل*
              </label>
              <Field
                className="form-contact"
                type="text"
                id="identifier"
                name="identifier"
                style={{ boxShadow: "none" }}
              />
              <ErrorMessage
                name="identifier"
                component="div"
                className="error form-error  md:w-1/2"
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="text-sm text-zinc-700">
                گذرواژه*
              </label>
              <Field
                className="form-contact"
                type="password"
                id="password"
                name="password"
                style={{ boxShadow: "none" }}
              />
              <ErrorMessage
                name="password"
                component="div"
                className="error form-error  md:w-1/2"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <input type="checkBox" />
                <p>مرا به خاطر بسپار</p>
              </div>
              <p className="cursor-pointer text-info text-sm hover:text-primary">
                گذرواژه خود را فراموش کرده اید؟
              </p>
            </div>
      

            {/* login btn  */}
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="btn-yearStorySelect text-sm w-1/2"
              >
                ورود
              </button>
            </div>
          </Form>
        </Formik>
      </div>
      <Footer />
    </div>
  )
}
