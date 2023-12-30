import React, { useEffect, useState } from "react"
import DataTable from "../../../components/Admin-panel/DataTable/DataTable"
import axios from "axios"
import swal from "sweetalert"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
export default function Products() {
  const [products, setProducts] = useState([])
  const localStorageToken = JSON.parse(localStorage.getItem("user"))
  const config = {
    headers: {
      Authorization: `Bearer ${localStorageToken.token}`,
      "Content-Type": "application/json",
    },
  }
  const initialValues = {
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  }
  const validationSchema = Yup.object().shape({
  })
  useEffect(() => {
    getAllProducts()
  }, [])
  function getAllProducts() {
    axios
      .get("http://localhost:8000/v1/courses")
      .then((res) => {
        console.log(res, "11")
        setProducts(res.data)
      })
      .catch((err) => console.log(err))
  }

  function removeProductHandler(id) {
    swal({
      text: "آیا از حذف این دوره اطمینان دارید؟",
      icon: "warning",
      buttons: ["لغو", "حذف"],
    }).then((res) => {
      if (res) {
        axios
          .delete(`http://localhost:8000/v1/courses/${id}`, config)
          .then(() => {
            swal({
              text: "محصول با موفقیت حذف شد",
              icon: "success",
              dangerMode: false,
              buttons: "تایید",
            }).then(() => {
              getAllProducts()
            })
          })
          .catch((err) => {
            console.log(err)
            swal({
              text: "حذف محصول با مشکل مواجه شد!",
              icon: "error",
              dangerMode: true,
              buttons: "تایید",
            })
          })
      }
    })
  }
  return (
    <div>
      <div>
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
      <DataTable title={"لیست محصولات"}>
        <table className="dataTable w-full text-center border-collapse mt-10">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>
              <th>مبلغ</th>
              <th>موجودی</th>
              <th>لینک</th>
              <th>دسته بندی</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>
                  {product.price === 0
                    ? "رایگان"
                    : product.price.toLocaleString()}
                </td>
                <td>
                  {product.stock > 0 ? `${product.stock} عدد` : "تمام شده"}
                </td>
                <td>{product.shortName}</td>
                <td>{product.categoryID.title}</td>
                <td>
                  <button type="button" className="btn bg-green-400">
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn bg-info"
                    onClick={() => removeProductHandler(product._id)}
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
