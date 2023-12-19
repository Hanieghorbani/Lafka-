import React, { useEffect, useState } from "react"
import DataTable from "./../../../components/AdminPanel/DataTable/DataTable"
import { FaCheck } from "react-icons/fa"
import swal from "sweetalert"

export default function Menus() {
  const [menus, setMenus] = useState([])
  const [menuParent, setMenuParent] = useState("-1")
  const localStorageToken = JSON.parse(localStorage.getItem("user"))


  useEffect(() => {
    getAllMenus()
  }, [])

  function getAllMenus() {
    fetch("http://localhost:8000/v1/menus/all")
      .then((res) => res.json())
      .then((allMenus) => {
        setMenus(allMenus)
      })
  }

  function removeMenu(id) {
    swal({
      text: "آیا از حذف این منو اطمینان دارید؟",
      icon: "warning",
      buttons: ["لغو", "حذف"],
    }).then((res) => {
      if (res) {
        fetch(`http://localhost:8000/v1/menus/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorageToken.token}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              text: "منو با موفقیت حذف شد",
              icon: "success",
              dangerMode: false,
              buttons: "تایید",
            }).then(() => {
              getAllMenus()
            })
          }
        })
      }
    })
  }

  function createMenu(e) {
    e.preventDefault()

    const menuInfos = {
      // title: formState.inputs.title.value,
      // href: formState.inputs.href.value,
      parent: menuParent != "-1" ? menuParent : undefined,
    }

    fetch("http://localhost:8000/v1/menus", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorageToken.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(menuInfos),
    }).then((res) => {
      if (res.ok) {
        swal({
          title: "منواضافه شد",
          icon: "success",
          dangerMode: false,
          buttons: "تایید",
        }).then(() => {
          getAllMenus()
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
      <div className="container">
        <div className="home-title">
          <span>افزودن کاربر جدید</span>
        </div>
        <form className="form">
          <div className="col-6">
            <div className="name input">
              <label className="input-title">عنوان</label>
              {/* <Input
                element="input"
                onInputHandler={onInputHandler}
                id="title"
                type="text"
                isValid="false"
                placeholder="لطفا عنوان را وارد کنید..."
                validations={[minValidator(5)]}
              /> */}
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-6">
            <div className="name input">
              <label className="input-title">لینک</label>
              {/* <Input
                element="input"
                onInputHandler={onInputHandler}
                id="href"
                type="text"
                isValid="false"
                validations={[minValidator(5)]}
                placeholder="لطفا عنوان را وارد کنید..."
              /> */}
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-6">
            <div className="name input">
              <label className="input-title">منو</label>
              <select
                className="select"
                onChange={(event) => setMenuParent(event.target.value)}
              >
                <option value="-1">منوی اصلی را انتخاب کنید</option>
                {menus.map((menu) => (
                  <>
                    {menu.parent === undefined && (
                      <option value={menu._id} key={menu._id}>
                        {menu.title}
                      </option>
                    )}
                  </>
                ))}
              </select>
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-12">
            <div className="bottom-form">
              <div className="submit-btn">
                <input type="submit" value="افزودن" onClick={createMenu} />
              </div>
            </div>
          </div>
        </form>
      </div>

      <DataTable title="منوها">
        <table className="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>
              <th>مقصد</th>
              <th>والد</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {menus.map((menu, index) => (
              <tr key={menu._id}>
                <td>{index + 1}</td>
                <td>{menu.title}</td>
                <td>{menu.href}</td>
                <td>{menu.parent ? menu.parent.title : <FaCheck />}</td>
                <td>
                  <button type="button" className="btn btn-primary edit-btn">
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger delete-btn"
                    onClick={() => removeMenu(menu._id)}
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
