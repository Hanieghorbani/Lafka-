import React, { useEffect, useState } from "react"
import DataTable from "../../../components/AdminPanel/DataTable/DataTable"
import swal from "sweetalert"
import Editor from '../../../components/Editor/Editor'
import { Link } from "react-router-dom"
export default function Articles() {
  const localStorageData = JSON.parse(localStorage.getItem("user"))
  const [articles, setArticles] = useState([])
  const [categories, setCategories] = useState([])
  const [articleCategory, setArticleCategory] = useState("-1")
  const [articleCover, setArticleCover] = useState({})
  const [articleBody, setArticleBody] = useState("")


  useEffect(() => {
    getAllArticles()
    fetch(`http://localhost:8000/v1/category`)
      .then((res) => res.json())
      .then((allCategories) => {
        setCategories(allCategories)
      })
  }, [])

  function getAllArticles() {
    fetch("http://localhost:8000/v1/articles")
      .then((res) => res.json())
      .then((allArticles) => {
        setArticles(allArticles)
      })
  }

  function removeArticle(id) {
    swal({
      text: "آیا از حذف این مقاله اطمینان دارید؟",
      icon: "warning",
      buttons: ["لغو", "حذف"],
    }).then((res) => {
      if (res) {
        fetch(`http://localhost:8000/v1/articles/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              text: "مقاله با موفقیت حذف شد",
              icon: "success",
              dangerMode: false,
              buttons: "تایید",
            }).then(() => {
              getAllArticles()
            })
          } else {
            swal({
              text: "حذف مقاله با مشکل مواجه شد!",
              icon: "error",
              dangerMode: true,
              buttons: "تایید",
            })
          }
        })
      }
    })
  }

  function createArticle(e) {
    e.preventDefault()

    if (articleCover) {
       let formData = new FormData()
    // formData.append("title", formState.inputs.title.value)
    // formData.append("description", formState.inputs.description.value)
    // formData.append("body", articleBody)
    // formData.append("shortName", formState.inputs.shortName.value)
    // formData.append("categoryID", articleCategory)
    // formData.append("cover", articleCover)

    fetch("http://localhost:8000/v1/articles", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
      body: formData,
    }).then((res) => {
      if (res.ok) {
        swal({
          title: "مقاله جدید با موفقیت ایجاد شد",
          icon: "success",
          buttons: "تایید",
        }).then(() => {
          getAllArticles()
        })
      } else {
        swal({
          title: 'مقاله جدید با مشکل مواجه شد',
          icon: "error",
          buttons: "تایید",
        })
      }
    })
    }else{
      swal({
        title: 'تصویر مقاله را انتخاب کنید',
        icon: "error",
        buttons: "تایید",
      })
    }
   
  }
  function createArticleDraft(e) {
    e.preventDefault()
    let formData = new FormData()
    // formData.append("title", formState.inputs.title.value)
    // formData.append("description", formState.inputs.description.value)
    // formData.append("body", articleBody)
    // formData.append("shortName", formState.inputs.shortName.value)
    // formData.append("categoryID", articleCategory)
    // formData.append("cover", articleCover)

    fetch("http://localhost:8000/v1/articles/draft", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
      body: formData,
    }).then((res) => {
      if (res.ok) {
        swal({
          title: "مقاله جدید با موفقیت پیش نویس شد",
          icon: "success",
          buttons: "تایید",
        }).then(() => {
          getAllArticles()
        })
      } else {
        swal({
          title: "مقاله جدید پیش نویس نشد!!",
          icon: "error",
          buttons: "تایید",
        })
      }
    })
  }

  return (
    <>
      <div className="container-fluid" id="home-content">
        <div className="container">
          <div className="home-title">
            <span>افزودن مقاله جدید</span>
          </div>
          <form className="form">
            <div className="col-6">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  عنوان
                </label>
                {/* <Input
                  element="input"
                  type="text"
                  id="title"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(8)]}
                /> */}
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  لینک
                </label>
                {/* <Input
                  element="input"
                  type="text"
                  id="shortName"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(5)]}
                /> */}
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-12">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  چکیده
                </label>
                {/* <Input
                  element="textarea"
                  type="text"
                  id="description"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(5)]}
                  className="article-textarea"
                /> */}
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-12">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  محتوا
                </label>
                <Editor value={articleBody} setValue={setArticleBody} />

                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  کاور
                </label>
                <input
                  type="file"
                  onChange={(event) => {
                    setArticleCover(event.target.files[0])
                  }}
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  دسته بندی
                </label>
                <select
                  onChange={(event) => setArticleCategory(event.target.value)}
                >
                  <option value="-1">دسته بندی مقاله را انتخاب کنید،</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>{category.title}</option>
                  ))}
                </select>
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-12">
              <div className="bottom-form">
                <div className="submit-btn">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    onClick={createArticle}
                    // disabled={!formState.isFormValid}
                  >
                    افزودن
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg me-3"
                    onClick={createArticleDraft}
                    // disabled={!formState.isFormValid}
                  >
                    پیش نویس
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* <DataTable title="مقاله‌ها">
        <table className="table">
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
                  <button type="button" className="btn btn-primary edit-btn">
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger delete-btn"
                    onClick={() => removeArticle(article._id)}
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable> */}
    </>
  )
}
