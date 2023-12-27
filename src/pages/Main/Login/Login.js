import React, { useState, useEffect } from "react"
import Header from "../../../components/Header/Header"
import Footer from "../../../components/Footer/Footer"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
export default function Login() {
  const [captcha, setCaptcha] = useState("")
  const [answer, setAnswer] = useState("")
  const initialValues = {
    name: "",
    password: "",
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("نام کاربری یا آدرس ایمیل الزامی است")
      .min(7, "نام باید حداقل ۳ حرف داشته باشد"),
    password: Yup.string().required("گذرواژه الزامی است"),
  })

  const [isFixedTopbar, setIsFixedTopbar] = useState(true)

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleScroll = () => {
    if (window.scrollY > 67) {
      setIsFixedTopbar(false)
    } else {
      setIsFixedTopbar(true)
    }
  }
  return (
    <div>
      <div className="bg-primary">
        <Header />
      </div>
      <div
        className={`flex flex-col justify-center items-center container-primary my-20 ${
          !isFixedTopbar ? "sm:mt-10 md:pt-64" : ""
        }`}
      >
        <h1 className="text-3xl mb-10">ورود</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          <Form className="space-y-5 w-1/3">
            <div className="relative">
              <label htmlFor="name" className="text-sm text-zinc-500">
                نام کاربر یا آدرس ایمیل*
              </label>
              <Field
                className="form-contact"
                type="text"
                id="name"
                name="name"
                style={{ boxShadow: "none" }}
              />
              <ErrorMessage
                name="name"
                component="div"
                className="error form-error  md:w-1/2"
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="text-sm text-zinc-500">
                گذرواژه*
              </label>
              <Field
                className="form-contact"
                type="text"
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
