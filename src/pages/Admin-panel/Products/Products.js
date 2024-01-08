import React, { useContext, useEffect, useState } from "react"
import DataTable from "../../../components/Admin-panel/DataTable/DataTable"
import axios from "axios"
import swal from "sweetalert"
import Swal from "sweetalert2"
import ReactDOM from "react-dom"
import Input from "../../../components/Fields/Input/Input"
import Select from "../../../components/Fields/Select/Select"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import Pagination from "../../../components/Pagination/Pagination"
import ContextData from "../../../ContextData/ContextData"
import { useParams } from "react-router-dom"

export default function Products() {
  const [shownItems, setShownItems] = useState([])
  const [coverFile, setCoverFile] = useState([])
  const {
    config,
    getAllCategorys,
    getAllProducts,
    categorys,
    products,
    formDataConfig,
  } = useContext(ContextData)
  const { page } = useParams()

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
    getAllProducts()
    getAllCategorys()
  }, [])
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

  function addNewProductHandler(values, { resetForm }) {
    const formData = new FormData()
    const { name, description, url, category, price, scale, stock } = values
    formData.append("name", name)
    formData.append("description", description)
    formData.append("shortName", url)
    formData.append("categoryID", category)
    formData.append("price", price)
    formData.append("scale", scale)
    formData.append("stock", stock)
    formData.append("cover", coverFile)

    axios
      .post("http://localhost:8000/v1/courses/", formData, formDataConfig)
      .then((res) => {
        swal({
          title: "محصول جدید با موفقیت اضافه شد",
          icon: "success",
          buttons: "تایید",
        }).then(() => {
          getAllProducts()
          resetForm()
        })
      })
      .catch((err) => console.log(err))
  }

  function updateProduct(prodInfos) {
    const seetAlertContainer = document.createElement("div")
    document.body.appendChild(seetAlertContainer)
    const { name, price, description, shortName, scale, stock } = prodInfos
    const initialValues = {
      name,
      price,
      description,
      url: shortName,
      category: "",
      scale,
      stock,
      file: null,
    }
    Swal.fire({
      title: "اطلاعات جدید را وارد کنید",
      html: '<div id="formik-yup"></div>',
      showCloseButton: true,
      showConfirmButton: false,
      showCancelButton: false,
    })

    ReactDOM.render(
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values)
          const formData = new FormData()
          formData.append("name", values.name)
          formData.append("description", values.description)
          formData.append("shortName", values.url)
          formData.append("categoryID", values.category)
          formData.append("price", values.price)
          formData.append("scale", values.scale)
          formData.append("stock", values.stock)
          formData.append("cover", values.file)
          axios
            .put(
              `http://localhost:8000/v1/courses/${prodInfos._id}`,
              formData,
              formDataConfig
            )
            .then((res) => {
              swal({
                title: "محصول با موفقیت بروز رسانی شد",
                icon: "success",
                buttons: "تایید",
              }).then(() => {
                getAllProducts()
              })
            })
            .catch((err) => {
              console.log(err)
              swal({
                text: "آپدیت محصول با مشکل مواجه شد!",
                icon: "error",
                dangerMode: true,
                buttons: "تایید",
              })
            })
        }}
      >
        {(formik) => {
          return (
            <>
              <Form className="bg-zinc-100 grid sm:grid-cols-1 gap-8 sm:p-4 md:p-10 rounded-2xl ">
                <Input
                  label={"نام محصول*"}
                  id={"name"}
                  style={"form-create-product"}
                />

                <Input
                  id={"description"}
                  label={"توضیحات محصول"}
                  style={"form-create-product"}
                />

                <Input
                  id={"url"}
                  label={"لینک محصول"}
                  style={"form-create-product"}
                />

                {/* category  */}
                <Select
                  label={"دسته بندی محصول"}
                  id={"category"}
                  items={categorys}
                />

                <Input
                  id={"price"}
                  label={"قیمت محصول"}
                  type={"number"}
                  style={"form-create-product"}
                />

                <Input
                  id={"scale"}
                  label={"وزن محصول"}
                  type={"number"}
                  style={"form-create-product"}
                />

                <Input
                  id={"stock"}
                  label={"موجودی محصول"}
                  type={"number"}
                  style={"form-create-product"}
                />

                {/* cover  */}
                <div className="">
                  <label htmlFor="file" className="text-sm text-zinc-700">
                    تصویر محصول
                  </label>
                  <input
                    type="file"
                    id="file"
                    name="file"
                    className="form-create-product"
                    onChange={(e) => {
                      formik.setFieldValue("file", e.target.files[0])
                    }}
                  />
                  <ErrorMessage
                    name="file"
                    component="div"
                    className="error form-error  md:w-1/2"
                  />
                </div>

                {/* login btn  */}
                <div className="flex items-center justify-center ">
                  <button
                    type="submit"
                    className="btn bg-green-400 text-sm w-1/2"
                  >
                    ویرایش
                  </button>
                </div>
              </Form>
            </>
          )
        }}
      </Formik>,
      document.getElementById("formik-yup")
    )
  }
  return (
    <div className="container-primary">
      <div className=" mt-20">
        <h1 className="text-2xl font-bold col-span-2 mb-10">
          افزودن محصول جدید
        </h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={addNewProductHandler}
        >
          <Form className="bg-zinc-100 grid sm:grid-cols-1 md:grid-cols-2 gap-8 sm:p-4 md:p-10 rounded-2xl ">
            <Input
              label={"نام محصول"}
              id={"name"}
              style={"form-create-product"}
            />
            <Input
              label={"توضیحات محصول"}
              id={"description"}
              style={"form-create-product"}
            />
            <Input
              label={"لینک محصول"}
              id={"url"}
              style={"form-create-product"}
            />
            <Input
              label={"قیمت محصول"}
              id={"price"}
              type={"number"}
              style={"form-create-product"}
            />
            <Input
              label={"وزن محصول"}
              id={"scale"}
              type={"number"}
              style={"form-create-product"}
            />
            <Input
              label={"موجودی محصول"}
              id={"stock"}
              type={"number"}
              style={"form-create-product"}
            />
            <Select
              label={"دسته بندی محصول"}
              id={"category"}
              items={categorys}
            />

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
            <div className="flex items-center justify-center md:col-span-2">
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
                  <button
                    type="button"
                    className="btn bg-green-400"
                    onClick={() => updateProduct(product)}
                  >
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
          items={products}
          itemsCount={5}
          pathname="/p-admin/products"
          setShownItems={setShownItems}
        />
      </DataTable>
    </div>
  )
}
