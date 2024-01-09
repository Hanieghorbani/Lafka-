import React, { useState, useEffect, useContext } from "react"
import DataTable from "../../../components/Admin-panel/DataTable/DataTable"
import swal from "sweetalert"
import axios from "axios"
import ContextData from "../../../ContextData/ContextData"
import { Link } from "react-router-dom"
import Input from "../../../components/Fields/Input/Input"
import Select from "../../../components/Fields/Select/Select"
import Editor from "../../../components/Fields/Editor/Editor"
import TextArea from "../../../components/Fields/TextArea/TextArea"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
export default function Articles() {
  const [articles, setArticles] = useState([])
  const { categorys, config,formDataConfig } = useContext(ContextData)
  const [articleCover, setArticleCover] = useState([])
  const [articleBody, setArticleBody] = useState("")

  const initialValues = {
    title: "",
    shortName: "",
    description: "",
    category: "",
  }
  const validationSchema = Yup.object().shape({
    title: Yup.string().required(" عنوان مقاله الزامی است"),
    shortName: Yup.string().required(" لینک مقاله الزامی است"),
    description: Yup.string().required(" چکیده مقاله الزامی است"),
    category: Yup.string().required("دسته بندی مقاله الزامی است"),
  })
  useEffect(() => {
    getAllArticles()
  }, [])

  function getAllArticles() {
    axios
      .get("http://localhost:8000/v1/articles")
      .then((res) => setArticles(res.data))
  }

  function removeArticle(id) {
    swal({
      text: "آیا از حذف این مقاله اطمینان دارید؟",
      icon: "warning",
      buttons: ["لغو", "حذف"],
    }).then((res) => {
      if (res) {
        axios
          .delete(`http://localhost:8000/v1/articles/${id}`, config)
          .then(() => {
            swal({
              text: "مقاله با موفقیت حذف شد",
              icon: "success",
              dangerMode: false,
              buttons: "تایید",
            }).then(() => {
              getAllArticles()
            })
          })
          .catch((err) => {
            swal({
              text: "حذف مقاله با مشکل مواجه شد!",
              icon: "error",
              dangerMode: true,
              buttons: "تایید",
            })
            console.log(err)
          })
      }
    })
  }

  function addNewArticleHandler(values,{resetForm}) {
    console.log(values)
    if (articleCover) {
      const { title, description, shortName, category } = values
      const formData = new FormData()
      formData.append("title", title)
      formData.append("description", description)
      formData.append("body", articleBody)
      formData.append("shortName", shortName)
      formData.append("categoryID", category)
      formData.append("cover", articleCover)
      console.log(formData)
      axios
        .post("http://localhost:8000/v1/articles", formData, formDataConfig)
        .then((res) => {
          swal({
            title: "مقاله جدید با موفقیت ایجاد شد",
            icon: "success",
            buttons: "تایید",
          }).then(() => {
            console.log(res.data)
            getAllArticles()
            resetForm()
            setArticleBody('')
          })
        })
        .catch((err) => {
          console.log(err)
          if(err.response.status == 401){
            swal({
              title: 'لینک مورد نظر قبلا استفاده شده',
              icon: "error",
              buttons: "تایید",
            })
          }
        })
    } else {
      swal({
        title: "تصویر مقاله الزامی می باشد",
        icon: "error",
        buttons: "تایید",
      })
    }
  }

  return (
    <div className="mx-auto sm:px-10">
      <div className=" mt-20">
        <h1 className="text-2xl font-bold col-span-2 mb-10">
          افزودن مقاله جدید
        </h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={addNewArticleHandler}
        >
          <Form className="bg-zinc-100 grid sm:grid-cols-1 md:grid-cols-2 gap-8 sm:p-4 md:p-10 rounded-2xl ">
            <Input
              label={"عنوان مقاله"}
              id={"title"}
              style={"form-create-product"}
            />
            <Input
              label={"لینک مقاله"}
              id={"shortName"}
              style={"form-create-product"}
            />
            <div className="lg:col-span-2">
              <TextArea
                label={"چکیده"}
                id={"description"}
                style={"form-create-product"}
              />
            </div>

            <div className=" lg:col-span-2">
              <label className="input-title">محتوا</label>
              <Editor value={articleBody} setValue={setArticleBody} />
            </div>

            {/* cover  */}
            <div className="">
              <label htmlFor="cover" className="text-sm text-zinc-700">
                کاور مقاله
              </label>
              <input
                type="file"
                id="cover"
                className="form-create-product"
                onChange={(e) => {
                  setArticleCover(e.target.files[0])
                }}
              />
              <ErrorMessage
                name="cover"
                component="div"
                className="error form-error  md:w-1/2"
              />
            </div>

            <Select
              label={"دسته بندی مقاله"}
              id={"category"}
              items={categorys}
            />

            {/* login btn  */}
            <div className="flex items-center justify-center md:col-span-2">
              <button type="submit" className="btn bg-green-400 text-sm w-1/2">
                افزودن
              </button>
            </div>
          </Form>
        </Formik>
      </div>
      <DataTable title={"لیست مقاله ها"}>
        <table className="dataTable w-full text-center border-collapse mt-10">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>
              <th>لینک</th>
              <th>نویسنده</th>
              <th>وضعیت</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article, index) => (
              <tr key={article._id}>
                <td>{index + 1}</td>
                <td>{article.title}</td>
                <td>{article.shortName}</td>
                <td>{article.creator.name}</td>
                <td>
                  {article.publish ? (
                    "منتشر شده"
                  ) : (
                    <Link
                      to={`draft/${article.shortName}`}
                      className="btn btn-primary edit-btn"
                    >
                      ادامه
                    </Link>
                  )}
                </td>
                <td>
                  <button type="button" className="btn bg-green-400">
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn bg-info"
                    onClick={() => removeArticle(article._id)}
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
