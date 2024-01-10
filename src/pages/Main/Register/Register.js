import React, { useState, useContext } from "react"
import Header from "../../../components/Main/Header/Header"
import Footer from "../../../components/Main/Footer/Footer"
import Input from "../../../components/Fields/Input/Input"
import ContextData from "../../../ContextData/ContextData"

import { Formik, Form } from "formik"
import * as Yup from "yup"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import swal from "sweetalert"

export default function Register() {
  const [isVisiblePass, setIsVisiblePass] = useState(false)
  const [isVisiblePassConfirm, setIsVisiblePassConfirm] = useState(false)
  const { config, login } = useContext(ContextData)
  const navigate = useNavigate()
  const initialValues = {
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
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
    confirmPassword: Yup.string()
      .required("تکرار رمز عبور الزامی است")
      .oneOf([Yup.ref("password"), null], "تکرار رمز عبور مطابقت ندارد"),
  })
  function userLogin(values) {
    axios
      .post("https://lafka-back.liara.run/v1/auth/register", values, config)
      .then((res) => {
        login([], res.data.accessToken)

        swal({
          text: " شما با موفقیت وارد حساب کاربری خود شدید",
          icon: "success",
          dangerMode: false,
          buttons: "ورود به پنل",
        }).then(() => {
          navigate("/my-account")
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
        } else if (err.response.status == 409) {
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

  return (
    <div className="">
      <div className="bg-primary">
        <Header />
      </div>
      <div
        className={`flex flex-col justify-center items-center container-primary py-20 pt-60 bg-zinc-200`}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={userLogin}
          validationSchema={validationSchema}
        >
          <Form className="bg-white space-y-7 md:w-2/3 lg:w-[40%] sm:p-5 lg:p-10 rounded-2xl">
            <h1 className="text-3xl text-center">عضویت</h1>
            <div className="text-center">
              <p className=" text-zinc-600">
                قبلا ثبت نام کرده اید؟{" "}
                <Link to={"/login"} className="text-info">
                  وارد شوید
                </Link>
              </p>
            </div>

            <Input label={"نام و نام خانوادگی*"} id={"name"} />
            <Input label={"نام کاربری*"} id={"username"} />
            <Input label={"شماره موبایل*"} id={"phone"} />
            <Input label={"آدرس ایمیل*"} id={"email"} type={"email"} />

            {/* password  */}

            <Input
              label={"رمزعبور*"}
              id={"password"}
              type={isVisiblePass ? "text" : "password"}
              isVisible={isVisiblePass}
              setIsVisible={setIsVisiblePass}
              pass={true}
            />
            <Input
              label={"تکرار رمز عبور*"}
              id={"confirmPassword"}
              type={isVisiblePassConfirm ? "text" : "password"}
              isVisible={isVisiblePassConfirm}
              setIsVisible={setIsVisiblePassConfirm}
              pass={true}
            />

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
