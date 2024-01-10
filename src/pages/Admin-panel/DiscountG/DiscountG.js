import React, { useContext } from "react"
import ContextData from "../../../ContextData/ContextData"
import Input from "../../../components/Fields/Input/Input"

import axios from "axios"
import swal from "sweetalert"
import * as Yup from "yup"
import { Formik, Form} from "formik"

export default function DiscountG() {
  const { config } = useContext(ContextData)
  const validationSchema = Yup.object().shape({
    percent: Yup.string().required("درصد تخفیف همگانی الزامی است"),
  })
  const initialValues = {
    percent: "",
  }
  function addDiscount(value, { resetForm }) {
    const data = { discount: value.percent }
    axios.post("https://lafka-back.liara.run/v1/offs/all", data, config).then(() => {
      swal({
        title: "کمپین با موفقیت ایجاد شد",
        icon: "success",
        buttons: "تایید",
      }).then(() => resetForm())
    })
  }
  return (
    <div className="mx-auto sm:px-10">
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
            <Input label={"درصد کمپین"} id={"percent"} type={'number'} style={"form-create-product"}/>

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
