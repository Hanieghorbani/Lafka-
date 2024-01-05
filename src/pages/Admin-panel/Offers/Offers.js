import React, { useContext, useEffect, useState } from "react"
import DataTable from "../../../components/Admin-panel/DataTable/DataTable"
import axios from "axios"
import Swal from "sweetalert2"
import swal from "sweetalert"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import ContextData from "../../../ContextData/ContextData"
import jalaliMoment from "jalali-moment"

export default function Offers() {
  const contextDatas = useContext(ContextData)
  const [products, setProducts] = useState([])
  const [offCodes, setOfCodes] = useState([])
  const [productName, setProductName] = useState({})
  const { config } = useContext(ContextData)
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
    axios.get("http://localhost:8000/v1/courses").then((res) => {
      const objProducts = {}
      setProducts(res.data)
      res.data.forEach((course) => {
        objProducts[course._id] = course.name
      })
      setProductName(objProducts)
    })
  }, [])

  function getAllOffs() {
    axios
      .get(`http://localhost:8000/v1/offs/`, config)
      .then((res) => {
        setOfCodes(res.data)
      })
      .catch((err) => console.log(err))
  }

  function removeOff(id) {
    console.log(id)
    axios
      .delete(`http://localhost:8000/v1/offs/${id}`, config)
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

  function addNewOffCode(values, { resetForm }) {
    axios
      .post("http://localhost:8000/v1/offs/", values, config)
      .then((res) => {
        console.log(res)
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
            {/* code  */}
            <div className="">
              <label htmlFor="code" className="text-sm text-zinc-700">
                کد تخفیف
              </label>
              <Field
                className="form-create-product"
                type="text"
                id="code"
                name="code"
              />
              <ErrorMessage
                name="code"
                component="div"
                className="error form-error  md:w-1/2"
              />
            </div>

            {/* percent*/}
            <div className="">
              <label htmlFor="percent" className="text-sm text-zinc-700">
                درصد تخفیف
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
            {/* max*/}
            <div className="">
              <label htmlFor="max" className="text-sm text-zinc-700">
                حداکثر استفاده
              </label>
              <Field
                className="form-create-product"
                type="text"
                id="max"
                name="max"
              />
              <ErrorMessage
                name="max"
                component="div"
                className="error form-error  md:w-1/2"
              />
            </div>

            {/* product  */}
            <div className="">
              <label htmlFor="course" className="text-sm text-zinc-700">
                محصول مورد نظر
              </label>

              <Field
                className="form-create-product"
                as="select"
                id="course"
                name="course"
              >
                <option value="">انتخاب کنید</option>
                {contextDatas.products.map((product) => (
                  <option
                    key={product._id}
                    value={product._id}
                    label={product.name}
                  />
                ))}
              </Field>
              <ErrorMessage
                name="category"
                component="div"
                className="error form-error  md:w-1/2"
              />
            </div>

            {/* login btn  */}
            <div className="flex items-center justify-center lg:col-span-2">
              <button type="submit" className="btn bg-green-400 text-sm w-1/2">
                افزودن
              </button>
            </div>
          </Form>
        </Formik>
      </div>
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

                <td>
                  {/* {off.createdAt.slice(0, 10)}{" "} */}
                  {jalaliMoment(off.createdAt).format("jYYYY/jM/jD")}
                </td>
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
    </div>
  )
}
