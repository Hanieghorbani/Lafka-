import React, { useState, useContext } from "react"
import ContextData from "../../../ContextData/ContextData"
import Input from "../../../components/Fields/Input/Input"
import Header from "../../../components/Main/Header/Header"
import Footer from "../../../components/Main/Footer/Footer"

import { Formik, Form} from "formik"
import * as Yup from "yup"
import axios from "axios"
import swal from "sweetalert"
import { useNavigate,Link } from "react-router-dom"

export default function Login() {
  const {config,login} = useContext(ContextData)
  const [isVisiblePass, setIsVisiblePass] = useState(false)
  const navigate = useNavigate()
  const initialValues = {
    identifier: "",
    password: "",
  }

  function userLogin(values) {
    axios
      .post("https://lafka-back.liara.run/v1/auth/login", values, config)
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
    password: Yup.string()
      .required("رمز عبور الزامی است")
      .min(8, "رمز عبور باید حداقل 8 کاراکتر باشد"),
  })

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
            <h1 className="text-3xl text-center">ورود</h1>
            <div className="text-center">
              <p className=" text-zinc-600">
                حساب کاربر ندارید؟{" "}
                <Link to={"/register"} className="text-info">
                  ثبت نام
                </Link>
              </p>
            </div>
          
            <Input label={'نام کاربر یا آدرس ایمیل*'} id={"identifier"} />
            <Input label={'گذرواژه*'} id={"password"} type={isVisiblePass ? 'text' : 'password'} isVisible={isVisiblePass} setIsVisible={setIsVisiblePass} pass={true}/>

            <div className="flex sm:flex-col lg:flex-row lg:items-center justify-between gap-2">
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
