import React, { useContext, useEffect, useState } from "react"
import ContextData from "../../../ContextData/ContextData"
import DataTable from "../../../components/Admin-panel/DataTable/DataTable"
import Input from "../../../components/Fields/Input/Input"
import Select from "../../../components/Fields/Select/Select"

import { Formik, Form } from "formik"
import * as Yup from "yup"
import axios from "axios"
import swal from "sweetalert"
import jalaliMoment from "jalali-moment"

export default function Offers() {
  const { config, products } = useContext(ContextData)
  const [offCodes, setOfCodes] = useState([])
  const [productName, setProductName] = useState({})
  const initialValues = {
    code: "",
    percent: "",
    course: "",
    max: "",
  }
  const validationSchema = Yup.object().shape({
    code: Yup.string().required("کد تخفیف الزامی است"),
    percent: Yup.string().required("درصد کد الزامی است"),
    course: Yup.string().required("محصول مورد نظر الزامی است"),
    max: Yup.string().required("حداکثر استفاده از کد الزامی است"),
  })
  useEffect(() => {
    getAllOffs()
    axios.get("https://lafka-back.liara.run/v1/courses").then((res) => {
      const objProducts = {}
      res.data.forEach((course) => {
        objProducts[course._id] = course.name
      })
      setProductName(objProducts)
    })
  }, [])

  function getAllOffs() {
    axios
      .get(`https://lafka-back.liara.run/v1/offs/`, config)
      .then((res) => {
        setOfCodes(res.data)
      })
      .catch((err) => console.log(err))
  }

  function removeOff(id) {
    swal({
      text: "آیا از حذف این کد تخفیف اطمینان دارید؟",
      icon: "warning",
      buttons: ["لغو", "حذف"],
    }).then((res) => {
      if (res) {
        axios
          .delete(`https://lafka-back.liara.run/v1/offs/${id}`, config)
          .then((res) => {
            swal({
              text: "کد تخفیف حذف شد",
              icon: "success",
              dangerMode: false,
              buttons: "تایید",
            }).then(() => {
              getAllOffs()
            })
          })
          .catch((err) => console.log(err))
      }
    })
  }

  function addNewOffCode(values, { resetForm }) {
    axios
      .post("https://lafka-back.liara.run/v1/offs/", values, config)
      .then((res) => {
        swal({
          text: "کد تخفیف اضافه شد",
          icon: "success",
          dangerMode: false,
          buttons: "تایید",
        }).then(() => {
          getAllOffs()
          resetForm()
        })
      })
      .catch((err) => console.log(err))
  }
  return (
    <div className="container-primary">
      <div className="mt-20">
        <h1 className="text-2xl font-bold col-span-2 mb-10">
          افزودن کد تخفیف جدید
        </h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={addNewOffCode}
        >
          <Form className="bg-zinc-100  grid lg:grid-cols-2 gap-8 p-10 rounded-2xl">
            <Input
              label={"کد تخفیف"}
              id={"code"}
              style={"form-create-product"}
            />
            <Input
              label={"درصد تخفیف"}
              id={"percent"}
              type={"number"}
              style={"form-create-product"}
            />
            <Input
              label={"حداکثر استفاده"}
              id={"max"}
              type={"number"}
              style={"form-create-product"}
            />

            {/* product  */}
            <Select label={"محصول مورد نظر"} id={"course"} items={products} />

            {/* login btn  */}
            <div className="flex items-center justify-center lg:col-span-2">
              <button type="submit" className="btn bg-green-400 text-sm w-1/2">
                افزودن
              </button>
            </div>
          </Form>
        </Formik>
      </div>
      {offCodes.length ? (
        <DataTable title={"لیست تخفیفات"}>
          <table className="dataTable w-full text-center border-collapse mt-10">
            <thead>
              <tr>
                <th>شناسه</th>
                <th>کد</th>
                <th>درصد</th>
                <th>سازنده</th>
                <th>دوره</th>
                <th>حداکثر استفاده</th>
                <th>دفعات استفاده</th>
                <th>تاریخ ساخت</th>
                <th>حذف</th>
              </tr>
            </thead>
            <tbody>
              {offCodes.map((off, index) => (
                <tr key={off._id}>
                  <td>{index + 1}</td>
                  <td>{off.code}</td>
                  <td>{off.percent}</td>
                  <td>{off.creator}</td>
                  <td>{productName[off.course]}</td>
                  <td>{off.max}</td>
                  <td>{off.uses}</td>

                  <td>{jalaliMoment(off.createdAt).format("jYYYY/jM/jD")}</td>
                  <td>
                    <button
                      type="button"
                      className="btn bg-info"
                      onClick={() => removeOff(off._id)}
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </DataTable>
      ) : (
        <p className="text-xl text-center mt-20">هنوز کد تخفیفی ثبت نشده است!</p>
      )}
    </div>
  )
}
