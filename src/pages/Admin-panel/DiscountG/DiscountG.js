import React from "react"
import axios from "axios"
import swal from "sweetalert"
import * as Yup from "yup"
import { Formik, Form, Field, ErrorMessage } from "formik"

export default function DiscountG() {
  const validationSchema = Yup.object().shape({
    percent: Yup.string().required("درصد تخفیف همگانی الزامی است"),
  })
  const initialValues = {
    percent: "",
  }
  const localStorageToken = JSON.parse(localStorage.getItem("user"))
  const config = {
    headers: {
      Authorization: `Bearer ${localStorageToken.token}`,
      "Content-Type": "application/json",
    },
  }

  function addDiscount(value, { resetForm }) {
    const data = { discount: value.percent }
    axios.post("http://localhost:8000/v1/offs/all", data, config).then(() => {
      swal({
        title: "کمپین با موفقیت ایجاد شد",
        icon: "success",
        buttons: "تایید",
      }).then(() => resetForm())
    })
  }
  return (
    <div>
      <div className=" mt-20">
        <h1 className="text-2xl font-bold col-span-2 mb-10">
          افزودن کمپین جدید
        </h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={addDiscount}
        >
          <Form className="bg-zinc-100 grid sm:grid-cols-1 md:grid-cols-2 gap-8 sm:p-4 md:p-10 rounded-2xl ">
            {/* percent  */}
            <div className="">
              <label htmlFor="percent" className="text-sm text-zinc-700">
                درصد کمپین
              </label>
              <Field
                className="form-create-product"
                type="text"
                id="percent"
                name="percent"
              />
              <ErrorMessage
                name="percent"
                component="div"
                className="error form-error  md:w-1/2"
              />
            </div>

            {/* login btn  */}
            <div className="flex items-center justify-center md:col-span-2">
              <button type="submit" className="btn bg-green-400 text-sm w-1/2">
                افزودن
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  )
}
