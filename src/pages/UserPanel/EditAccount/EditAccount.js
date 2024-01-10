import React, { useContext, useState } from "react"
import ContextData from "../../../ContextData/ContextData"
import Input from "../../../components/Fields/Input/Input"

import swal from "sweetalert"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function EditAccount() {
  const navigate = useNavigate()
  const { config, userInfos, setReLoading } = useContext(ContextData)
  const { name, username, email, phone } = userInfos
  const [isVisiblePass, setIsVisiblePass] = useState(false)

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
    axios
      .put(`https://lafka-back.liara.run/v1/users`, values, config)
      .then((res) => {
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
              <Input label={"نام و نام خانوادگی*"} id={"name"} />
              <Input label={"نام کاربری (نمایشی)*"} id={"username"} />
              <Input label={"شماره موبایل*"} id={"phone"} />
              <Input label={"آدرس ایمیل*"} id={"email"} />
              <Input
                label={"رمزعبور*"}
                id={"password"}
                type={isVisiblePass ? "text" : "password"}
                isVisible={isVisiblePass}
                setIsVisible={setIsVisiblePass}
                pass={true}
              />

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
