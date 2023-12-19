import React, { useEffect, useState } from "react"
import "./Courses.css"
import DataTable from "../../../components/AdminPanel/DataTable/DataTable"
import swal from "sweetalert"

export default function Courses() {
  const [courses, setCourses] = useState([])
  const localStorageData = JSON.parse(localStorage.getItem("user"))
  const [courseCategory, setCourseCategory] = useState("-1")
  const [categories, setCategories] = useState([])
  const [courseStatus, setCourseStatus] = useState("start")
  const [courseCover, setCourseCover] = useState({})

  useEffect(() => {
    getAllCourses()

    fetch(`http://localhost:8000/v1/category`)
      .then((res) => res.json())
      .then((allCategories) => {
        setCategories(allCategories)
      })
  }, [])

  function getAllCourses() {
    fetch("http://localhost:8000/v1/courses", {
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
    })
      .then((res) => res.json())
      .then((allCourses) => {
        setCourses([...allCourses])
      })
  }

  function removeCourseHandler(id) {
    swal({
      text: "آیا از حذف این دوره اطمینان دارید؟",
      icon: "warning",
      buttons: ["لغو", "حذف"],
    }).then((res) => {
      if (res) {
        fetch(`http://localhost:8000/v1/courses/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              text: "دوره با موفقیت حذف شد",
              icon: "success",
              dangerMode: false,
              buttons: "تایید",
            }).then(() => {
              getAllCourses()
            })
          } else {
            swal({
              text: "حذف دوره با مشکل مواجه شد!",
              icon: "error",
              dangerMode: true,
              buttons: "تایید",
            })
          }
        })
      }
    })
  }

  function addNewCourse(e) {
    e.preventDefault()
    let formData = new FormData()
    // formData.append("name", formState.inputs.name.value)
    // formData.append("description", formState.inputs.description.value)
    // formData.append("shortName", formState.inputs.shortName.value)
    // formData.append("categoryID", courseCategory)
    // formData.append("price", formState.inputs.price.value)
    // formData.append("support", formState.inputs.support.value)
    // formData.append("status", courseStatus)
    // formData.append("cover", courseCover)

    if (courseCategory != "-1") {
      fetch(`http://localhost:8000/v1/courses`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorageData.token}`,
        },
        body: formData,
      }).then((res) => {
        if (res.ok) {
          swal({
            title: "دوره جدید با موفقیت اضافه شد",
            icon: "success",
            buttons: "تایید",
          }).then(() => {
            getAllCourses()
          })
        } else {
          res.json().then((data) => {
            for (const err of data.message) {
              if (err.message.includes("تصویر الزامی می باشد")) {
                swal({
                  title: "لطفا تصویر دوره را انتخاب کنید",
                  icon: "error",
                  buttons: "تایید",
                })
              } else if (
                err.message.includes("price must be a `number` type")
              ) {
                swal({
                  title: "لطفا قیمت را به عدد وارد کنید",
                  icon: "error",
                  buttons: "تایید",
                })
              }
            }
          })
        }
      })
    } else {
      swal({
        title: "لطفا دسته بندی را انتخاب کنید",
        icon: "error",
        buttons: "تایید",
      })
    }
  }

  return (
    <>
      <div className="container-fluid" id="home-content">
        <div className="container">
          <div className="home-title">
            <span>افزودن دوره جدید</span>
          </div>
          <form className="form">
            <div className="col-6">
              <div className="name input">
                <label className="input-title">نام دوره</label>
                {/* <Input
                  id="name"
                  element="input"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(5)]}
                  type="text"
                  placeholder="لطفا نام دوره را وارد کنید..."
                /> */}
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="price input">
                <label className="input-title">توضیحات دوره</label>
                {/* <Input
                  id="description"
                  element="input"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(5)]}
                  type="text"
                  placeholder="لطفا توضیحات دوره را وارد کنید..."
                /> */}
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="number input">
                <label className="input-title">Url دوره</label>
                {/* <Input
                  id="shortName"
                  element="input"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(5)]}
                  type="text"
                  isValid="false"
                  placeholder="لطفا Url دوره را وارد کنید..."
                /> */}
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="price input">
                <label className="input-title">قیمت دوره</label>
                {/* <Input
                  id="price"
                  element="input"
                  onInputHandler={onInputHandler}
                  validations={[requiredValidator()]}
                  type="text"
                  isValid="false"
                  placeholder="لطفا قیمت دوره را وارد کنید..."
                /> */}
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="price input">
                <label className="input-title">نحوه پشتیبانی دوره</label>
                {/* <Input
                  id="support"
                  element="input"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(5)]}
                  type="text"
                  isValid="false"
                  placeholder="لطفا نحوه پشتیبانی دوره را وارد کنید..."
                /> */}
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="number input">
                <label className="input-title">دسته‌بندی دوره</label>
                <select onChange={(e) => setCourseCategory(e.target.value)}>
                  <option value="">انتخاب کنید</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>{category.title}</option>
                  ))}
                </select>
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="file">
                <label className="input-title">عکس دوره</label>
                <input
                  type="file"
                  id="file"
                  onChange={(event) => {
                    setCourseCover(event.target.files[0])
                  }}
                />
              </div>
            </div>
            <div className="col-12">
              <div className="bottom-form">
                <div className="condition">
                  <label className="input-title">وضعیت دوره</label>
                  <div className="radios">
                    <div className="available">
                      <label>
                        <span>در حال برگزاری</span>
                        <input
                          type="radio"
                          value="start"
                          name="condition"
                          defaultChecked
                          onClick={(e) => setCourseStatus(e.target.value)}
                        />
                      </label>
                    </div>
                    <div className="unavailable">
                      <label>
                        <span>پیش فروش</span>
                        <input
                          type="radio"
                          value="presell"
                          name="condition"
                          onClick={(e) => setCourseStatus(e.target.value)}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="submit-btn">
                  <input
                    type="submit"
                    value="افزودن"
                    onClick={addNewCourse}
                    // disabled={!formState.isFormValid}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <DataTable title="دوره‌ها">
        <table className="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>
              <th>مبلغ</th>
              <th>وضعیت</th>
              <th>لینک</th>
              <th>مدرس</th>
              <th>دسته بندی</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={course._id}>
                <td>{index + 1}</td>
                <td>{course.name}</td>
                <td>
                  {course.price === 0
                    ? "رایگان"
                    : course.price.toLocaleString()}
                </td>
                <td>
                  {course.isComplete === 0 ? "در حال برگزاری" : "تکمیل شده"}
                </td>
                <td>{course.shortName}</td>
                <td>{course.creator}</td>
                <td>{course.categoryID.title}</td>
                <td>
                  <button type="button" className="btn btn-primary edit-btn">
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger delete-btn"
                    onClick={() => removeCourseHandler(course._id)}
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </>
  )
}
