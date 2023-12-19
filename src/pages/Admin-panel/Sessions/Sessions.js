import React, { useEffect, useState } from "react"
import swal from "sweetalert"
import DataTable from "../../../components/AdminPanel/DataTable/DataTable"

export default function Sessions() {
  const [courses, setCourses] = useState([])
  const [sessionCourse, setSessionCourse] = useState("-1")
  const [sessionVideo, setSessionVideo] = useState({})
  const localStorageToken = JSON.parse(localStorage.getItem("user"))
  const [sessions, setSessions] = useState([])
  const [isFree,setIsFree] = useState(1)
  

  useEffect(() => {
    getAllSessions()

    fetch("http://localhost:8000/v1/courses")
      .then((res) => res.json())
      .then((allCourses) => {
        setCourses(allCourses)
      })
  }, [])

  function getAllSessions() {
    fetch("http://localhost:8000/v1/courses/sessions")
      .then((res) => res.json())
      .then((allSessions) => setSessions(allSessions))
  }

  function createSession(e) {
    e.preventDefault()
    if (sessionCourse != "-1") {
      let formData = new FormData()
      // formData.append("title", formState.inputs.title.value)
      // formData.append("time", formState.inputs.time.value)
      // formData.append("video", sessionVideo)
      // formData.append("free", isFree)
      fetch(`http://localhost:8000/v1/courses/${sessionCourse}/sessions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorageToken.token}`,
        },
        body: formData,
      }).then((res) => {
        if (res.ok) {
          swal({
            text: "جلسه اضافه شد",
            icon: "success",
            dangerMode: false,
            buttons: "تایید",
          }).then(() => {
            getAllSessions()
          })
        } else {
          swal({
            icon: "error",
            buttons: "تایید",
          })
        }
      })
    }
  }

  function removeSession(id){
    swal({
      text: "آیا از حذف این جلسه اطمینان دارید؟",
      icon: "warning",
      buttons: ["لغو", "حذف"],
    }).then((res) => {
      if (res) {
        fetch(`http://localhost:8000/v1/courses/sessions/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorageToken.token}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              text: "جلسه با موفقیت حذف شد",
              icon: "success",
              dangerMode: false,
              buttons: "تایید",
            }).then(() => {
              getAllSessions()
            })
          }
        })
      }
    })
  }

  return (
    <>
      <div className="container-fluid" id="home-content">
        <div className="container">
          <div className="home-title">
            <span>افزودن جلسه جدید</span>
          </div>
          <form className="form">
            <div className="col-6">
              <div className="name input">
                <label className="input-title">عنوان جلسه</label>
                {/* <Input
                  element="input"
                  onInputHandler={onInputHandler}
                  type="text"
                  id="title"
                  validations={[minValidator(5)]}
                  placeholder="لطفا نام جلسه را وارد کنید..."
                /> */}
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="price input">
                <label className="input-title">مدت زمان جلسه</label>
                {/* <Input
                  element="input"
                  onInputHandler={onInputHandler}
                  type="text"
                  id="time"
                  validations={[minValidator(1)]}
                  placeholder="لطفا مدت زمان جلسه را وارد کنید..."
                /> */}
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="price input">
                <label className="input-title" style={{ display: "block" }}>
                  ویدیو جلسه
                </label>
                <input
                  type="file"
                  onChange={(e) => setSessionVideo(e.target.files[0])}
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="price input">
                <label className="input-title" style={{ display: "block" }}>
                  دوره
                </label>
                <select
                  className="select"
                  onChange={(event) => setSessionCourse(event.target.value)}
                >
                  <option value="-1">دوره مدنظر را انتخاب کنید</option>
                  {courses.map((course) => (
                    <option value={course._id} key={course._id}>
                      {course.name}
                    </option>
                  ))}
                </select>
                <span className="error-message text-danger"></span>
              </div>
            </div>

            <div className="col-12">
              <div className="bottom-form">
                <div className="condition">
                  <label className="input-title">وضعیت دوره</label>
                  <div className="radios">
                    <div className="available">
                      <label>
                        <span>رایگان</span>
                        <input
                          type="radio"
                          value="1"
                          name="condition"
                          defaultChecked
                          onClick={(e) => setIsFree(e.target.value)}
                        />
                      </label>
                    </div>
                    <div className="unavailable">
                      <label>
                        <span>نقدی</span>
                        <input
                          type="radio"
                          value="0"
                          name="condition"
                          onClick={(e) => setIsFree(e.target.value)}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12">
              <div className="bottom-form">
                <div className="submit-btn">
                  <input
                    type="submit"
                    value="افزودن"
                    onClick={createSession}
                    // disabled={!formState.isFormValid}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <DataTable title="جلسات">
        <table className="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>
              <th>تایم</th>
              <th>دوره</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session, index) => (
              <tr key={session._id}>
                <td>{index + 1}</td>
                <td>{session.title}</td>
                <td>
                  {session.time.substring(0, 2)}:{session.time.substring(2, 4)}
                </td>
                <td>{session.course.name}</td>
                <td>
                  <button type="button" className="btn btn-danger delete-btn" onClick={()=>removeSession(session._id)}>
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
