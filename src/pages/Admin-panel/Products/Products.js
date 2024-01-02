import React, { useContext, useEffect, useState } from "react"
import DataTable from "../../../components/Admin-panel/DataTable/DataTable"
import axios from "axios"
import swal from "sweetalert"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import Pagination from "../../../components/Pagination/Pagination"
import ContextData from "../../../ContextData/ContextData"
import { useParams } from "react-router-dom"
export default function Products() {
  const [shownItems, setShownItems] = useState([])
  const [prodCategory, setProdCategory] = useState("")
  const [coverFile, setCoverFile] = useState([])
  const contextDatas = useContext(ContextData)
  const { page } = useParams()
  const localStorageToken = JSON.parse(localStorage.getItem("user"))
  const config1 = {
    headers: {
      Authorization: `Bearer ${localStorageToken.token}`,
      "Content-Type": "application/json",
    },
  }
  const config2 = {
    headers: {
      Authorization: `Bearer ${localStorageToken.token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }
  const initialValues = {
    name: "",
    price: "",
    description: "",
    url: "",
    category: "",
    scale: "",
    stock: "",
  }
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("نام محصول الزامی است"),
    price: Yup.string().required("قیمت محصول الزامی است"),
    description: Yup.string().required("توضیحات محصول الزامی است"),
    url: Yup.string().required("لینک کوتاه محصول الزامی است"),
    category: Yup.string().required("دسته بندی محصول الزامی است"),
    scale: Yup.string().required("وزن محصول الزامی است"),
    stock: Yup.string().required("موجودی محصول الزامی است"),
  })
  useEffect(() => {
    contextDatas.getAllProducts()
    contextDatas.getAllCategorys()
  }, [])
  function removeProductHandler(id) {
    swal({
      text: "آیا از حذف این دوره اطمینان دارید؟",
      icon: "warning",
      buttons: ["لغو", "حذف"],
    }).then((res) => {
      if (res) {
        axios
          .delete(`http://localhost:8000/v1/courses/${id}`, config1)
          .then(() => {
            swal({
              text: "محصول با موفقیت حذف شد",
              icon: "success",
              dangerMode: false,
              buttons: "تایید",
            }).then(() => {
              contextDatas.getAllProducts()
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

  function addNewProductHandler(values, { resetForm }) {
    console.log(values, coverFile)
    const formData = new FormData()
    formData.append("name", values.name)
    formData.append("description", values.description)
    formData.append("shortName", values.url)
    formData.append("categoryID", values.category)
    formData.append("price", values.price)
    formData.append("scale", values.scale)
    formData.append("stock", values.stock)
    formData.append("cover", coverFile)

    console.log(formData)
    axios
      .post("http://localhost:8000/v1/courses/", formData, config2)
      .then((res) => {
        swal({
          title: "محصول جدید با موفقیت اضافه شد",
          icon: "success",
          buttons: "تایید",
        }).then(() => {
          contextDatas.getAllProducts()
          resetForm()
        })
      })
      .catch((err) => console.log(err))
  }
  return (
    <div>
      <div className=" mt-20">
        <h1 className="text-2xl font-bold col-span-2 mb-10">
          افزودن محصول جدید
        </h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={addNewProductHandler}
        >
          <Form className="bg-zinc-100 grid grid-cols-2 gap-8 p-10 rounded-2xl">
            {/* name  */}
            <div className="">
              <label htmlFor="name" className="text-sm text-zinc-700">
                نام محصول
              </label>
              <Field
                className="form-create-product"
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

            {/* descs*/}
            <div className="">
              <label htmlFor="description" className="text-sm text-zinc-700">
                توضیحات محصول
              </label>
              <Field
                className="form-create-product"
                type="text"
                id="description"
                name="description"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="error form-error  md:w-1/2"
              />
            </div>

            {/* phone  */}
            <div className="">
              <label htmlFor="url" className="text-sm text-zinc-700">
                لینک محصول
              </label>
              <Field
                className="form-create-product"
                type="text"
                id="url"
                name="url"
              />
              <ErrorMessage
                name="url"
                component="div"
                className="error form-error  md:w-1/2"
              />
            </div>

            {/* category  */}
            <div className="">
              <label htmlFor="category" className="text-sm text-zinc-700">
                دسته بندی محصول
              </label>

              <Field
                className="form-create-product"
                as="select"
                id="category"
                name="category"
                // onChange={(e) => setProdCategory(e.target.value)}
              >
                <option value="">انتخاب کنید</option>
                {contextDatas.categorys.map((category) => (
                  <option
                    key={category._id}
                    value={category._id}
                    label={category.title}
                  />
                ))}
              </Field>
              <ErrorMessage
                name="category"
                component="div"
                className="error form-error  md:w-1/2"
              />
            </div>

            {/* price  */}
            <div className="">
              <label htmlFor="price" className="text-sm text-zinc-700">
                قیمت محصول
              </label>
              <Field
                className="form-create-product"
                type="price"
                id="price"
                name="price"
              />
              <ErrorMessage
                name="price"
                component="div"
                className="error form-error  md:w-1/2"
              />
            </div>

            {/* scale  */}
            <div className="">
              <label htmlFor="scale" className="text-sm text-zinc-700">
                وزن محصول
              </label>
              <Field
                className="form-create-product"
                type="number"
                id="scale"
                name="scale"
              />
              <ErrorMessage
                name="scale"
                component="div"
                className="error form-error  md:w-1/2"
              />
            </div>

            {/* stock  */}
            <div className="">
              <label htmlFor="stock" className="text-sm text-zinc-700">
                موجودی محصول
              </label>
              <Field
                className="form-create-product"
                type="number"
                id="stock"
                name="stock"
              />
              <ErrorMessage
                name="stock"
                component="div"
                className="error form-error  md:w-1/2"
              />
            </div>

            {/* cover  */}
            <div className="">
              <label htmlFor="file" className="text-sm text-zinc-700">
                تصویر محصول
              </label>
              <input
                type="file"
                id="file"
                className="form-create-product"
                onChange={(e) => {
                  setCoverFile(e.target.files[0])
                }}
              />
              <ErrorMessage
                name="file"
                component="div"
                className="error form-error  md:w-1/2"
              />
            </div>

            {/* login btn  */}
            <div className="flex items-center justify-center col-span-2">
              <button type="submit" className="btn bg-green-400 text-sm w-1/2">
                افزودن
              </button>
            </div>
          </Form>
        </Formik>
      </div>
      <DataTable title={"لیست محصولات"}>
        <table className="dataTable w-full text-center border-collapse mt-10">
          <thead>
            <tr>
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
            {shownItems.map((product, index) => (
              <tr key={product._id}>
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

        <Pagination
          items={contextDatas.products}
          itemsCount={5}
          pathname="/p-admin/products"
          setShownItems={setShownItems}
        />
      </DataTable>
    </div>
  )
}
