import React, { useEffect, useState } from "react"
import DataTable from "../../../components/AdminPanel/DataTable/DataTable"
import swal from "sweetalert"
import "./Category.css"
import Swal from "sweetalert2"

export default function Category() {
  const localStorageData = JSON.parse(localStorage.getItem("user"))


  const [categories, setCategories] = useState([])

  useEffect(() => {
    getAllCategories()
  }, [])

  function getAllCategories() {
    fetch(`http://localhost:8000/v1/category`)
      .then((res) => res.json())
      .then((allCategories) => {
        setCategories(allCategories)
      })
  }

  function createNewCategory(e) {
    e.preventDefault()

    const newCategoryInfo = {
      // title: formState.inputs.title.value,
      // name: formState.inputs.shortname.value,
    }

    fetch("http://localhost:8000/v1/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorageData.token}`,
      },
      body: JSON.stringify(newCategoryInfo),
    })
      .then((res) => res.json())
      .then((result) => {
        swal({
          title: "دسته بندی مورد نظر با موفقیت اضافه شد",
          icon: "success",
          buttons: "تایید",
        }).then(() => {
          getAllCategories()
        })
      })
  }

  function removeCategoryHandler(id) {
    swal({
      text: "آیا از حذف این دسته بندی اطمینان دارید؟",
      icon: "warning",
      buttons: ["لغو", "حذف"],
    }).then((res) => {
      if (res) {
        fetch(`http://localhost:8000/v1/category/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              text: "دسته بندی با موفقیت حذف شد",
              icon: "success",
              dangerMode: false,
              buttons: "تایید",
            }).then(() => {
              getAllCategories()
            })
          }
        })
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
          fetch(`http://localhost:8000/v1/category/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorageData.token}`,
            },
            body: JSON.stringify({ 
              title:newTitle,
              name:newShortName,
             }),
          })
            .then((res) => res.json())
            .then((res) => {
              getAllCategories()
            })
        }
      }
    })
  }

  return (
    <>
      <div className="container-fluid" id="home-content">
        <div className="container">
          <div className="home-title">
            <span>افزودن دسته‌بندی جدید</span>
          </div>
          <form className="form">
            <div className="col-6">
              <div className="name input">
                <label className="input-title">عنوان</label>
                {/* <Input
                  element="input"
                  onInputHandler={onInputHandler}
                  type="text"
                  id="title"
                  placeholder="لطفا عنوان را وارد کنید..."
                  validations={[minValidator(5), maxValidator(20)]}
                /> */}
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="name input">
                <label className="input-title">اسم کوتاه</label>
                {/* <Input
                  element="input"
                  onInputHandler={onInputHandler}
                  type="text"
                  id="shortname"
                  placeholder="لطفا اسم کوتاه را وارد کنید..."
                  validations={[minValidator(5), maxValidator(20)]}
                /> */}
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-12">
              <div className="bottom-form">
                <div className="submit-btn">
                  <input
                    type="submit"
                    value="افزودن"
                    onClick={createNewCategory}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <DataTable title="دسته‌بندی‌ها">
        <table className="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={category._id}>
                <td>{index + 1}</td>
                <td>{category.title}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary edit-btn"
                    onClick={() => updateCategory(category._id)}
                  >
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger delete-btn"
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
    </>
  )
}
