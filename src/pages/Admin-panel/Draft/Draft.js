import React, { useEffect, useState } from "react"
import swal from "sweetalert"
import Editor from "../../../components/Editor/Editor"
import { useNavigate, useParams } from "react-router-dom"
export default function Draft() {
  const localStorageData = JSON.parse(localStorage.getItem("user"))
  const navigate = useNavigate()
  const [articleInfos, setArticleInfos] = useState([])
  const [categories, setCategories] = useState([])
  const [articleCategory, setArticleCategory] = useState("-1")
  const [articleCover, setArticleCover] = useState({})
  const [articleBody, setArticleBody] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { articleName } = useParams()
 

  useEffect(() => {
    fetch(`http://localhost:8000/v1/category`)
      .then((res) => res.json())
      .then((allCategories) => {
        setCategories(allCategories)
      })

    fetch(`http://localhost:8000/v1/articles/${articleName}`, {
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
    })
      .then((res) => res.json())
      .then((datas) => {
        setArticleInfos(datas)
        setArticleBody(datas.body)
        setArticleCategory(datas.categoryID._id)
        setIsLoading(true)
      })
  }, [])
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
            navigate("/p-admin/articles")
          })
        } else {
          res.json().then((data) => {
            if (data.message.includes("duplicated short name")) {
              swal({
                text: "این مشکل بک انده،متاسفانه باید لینک رو تغییر بدی ):",
                icon: "error",
                buttons: "تایید",
              })
            }
          })
        }
      })
    } else {
      swal({
        title: "تصویر مقاله را انتخاب کنید",
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
          navigate("/p-admin/articles")
        })
      } else {
        swal({
          icon: "error",
          buttons: "تایید",
        })
      }
    })
  }

  return (
    <>
      {isLoading && (
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
                    defaultValue={articleInfos.title}
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
                    defaultValue={articleInfos.shortName}
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
                    defaultValue={articleInfos.description}
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
                    defaultValue={articleInfos.categoryID._id}
                    onChange={(event) => setArticleCategory(event.target.value)}
                  >
                    <option value="-1">دسته بندی مقاله را انتخاب کنید،</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.title}
                      </option>
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
      )}
    </>
  )
}
