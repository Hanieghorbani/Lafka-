import React, { useContext, useEffect, useState } from "react"
import DataTable from "../../../components/Admin-panel/DataTable/DataTable"
import axios from "axios"
import swal from "sweetalert"
import Swal from "sweetalert2"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { Link } from "react-router-dom"
import ContextData from "../../../ContextData/ContextData"
export default function Category() {
  const contextDatas = useContext(ContextData)
  const localStorageToken = JSON.parse(localStorage.getItem("user"))
  const {config,getAllCategorys,categorys,} = useContext(ContextData)
  const initialValues = {
    title: "",
    name: "",
  }
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("نام دسته بندی الزامی است"),
    title: Yup.string().required("عنوان دسته بندی الزامی است"),
  })
  useEffect(() => {
    getAllCategorys()
  }, [])
  function removeCategoryHandler(id) {
    swal({
      text: "آیا از حذف این دسته بندی اطمینان دارید؟",
      icon: "warning",
      buttons: ["لغو", "حذف"],
    }).then((res) => {
      if (res) {
        axios
          .delete(`http://localhost:8000/v1/category/${id}`, config)
          .then(() => {
            swal({
              text: "دسته بندی با موفقیت حذف شد",
              icon: "success",
              dangerMode: false,
              buttons: "تایید",
            }).then(() => {
              getAllCategorys()
            })
          })
          .catch((err) => console.log(err))
      }
    })
  }

  function updateCategory(id) {
    Swal.fire({
      title: "اطلاعات جدید را وارد کنید",
      html:
        '<input type="text" id="newTitle" class="swal2-input" placeholder="عنوان جدید">' +
        '<input type="text" id="newShortName" class="swal2-input" placeholder="نام کوتاه جدید">',
      showCancelButton: true,
      confirmButtonText: "ثبت",
      cancelButtonText: "لغو",
    }).then((result) => {
      if (result.isConfirmed) {
        const newTitle = document.getElementById("newTitle").value
        const newShortName = document.getElementById("newShortName").value
        // انجام عملیات مربوط به ورودی‌ها
        if (newTitle.trim().length && newShortName.trim().length) {
          const newInfosCate = { title: newTitle, name: newShortName }
          axios
            .put(
              `http://localhost:8000/v1/category/${id}`,
              newInfosCate,
              config
            )
            .then(() => {
              getAllCategorys()
            })
        }
      }
    })
  }

  function addNewCategoryHandler(values, { resetForm }) {
    axios
      .post("http://localhost:8000/v1/category", values, config)
      .then((res) => {
        console.log(res)
        swal({
          title: "دسته بندی مورد نظر با موفقیت اضافه شد",
          icon: "success",
          buttons: "تایید",
        }).then(() => {
          contextDatas.getAllCategorys()
          resetForm()
        })
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className="container-primary">
      <div className=" mt-20">
        <h1 className="text-2xl font-bold col-span-2 mb-10">
          افزودن دسته بندی جدید
        </h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={addNewCategoryHandler}
        >
          <Form className="bg-zinc-100 grid lg:grid-cols-2 gap-8 p-10 rounded-2xl">
            {/* title*/}
            <div className="">
              <label htmlFor="title" className="text-sm text-zinc-700">
                عنوان دسته بندی
              </label>
              <Field
                className="form-create-product"
                type="text"
                id="title"
                name="title"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="error form-error  md:w-1/2"
              />
            </div>

            {/* shortname  */}
            <div className="">
              <label htmlFor="name" className="text-sm text-zinc-700">
                نام کوتاه دسته بندی
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

            {/* login btn  */}
            <div className="flex items-center justify-center lg:col-span-2">
              <button type="submit" className="btn bg-green-400 text-sm w-1/2">
                افزودن
              </button>
            </div>
          </Form>
        </Formik>
      </div>
      <DataTable title={"دسته بندی ها"}>
        <table className="dataTable w-full text-center border-collapse mt-10">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {categorys.map((category, index) => (
              <tr key={category._id}>
                <td>{index + 1}</td>
                <td>{category.title}</td>
                <td>
                  <button
                    type="button"
                    className="btn bg-green-400"
                    onClick={() => updateCategory(category._id)}
                  >
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn bg-info"
                    onClick={() => removeCategoryHandler(category._id)}
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
