import React, { useEffect, useState } from "react"

export default function Products() {
  const [courses, setCourses] = useState([])
  const [showCourseState, setShowCourseState] = useState("all")
  const [shownCourses, setShownCourses] = useState([])
  useEffect(() => {
    fetch(`http://localhost:8000/v1/users/courses/`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCourses(data)
        setShownCourses(data)
      })
  }, [])

  function filterCourses(state) {
    switch (state) {
      case "all": {
        setShownCourses(courses)
        break
      }
      case "free": {
        setShownCourses(courses.filter((course) => !course.price))
        break
      }
      case "unfree": {
        setShownCourses(courses.filter((course) => course.price))
        break
      }
      default: {
        setShownCourses(courses)
      }
    }
  }

  return (
    <div className="w-full">
      <div className="pr-12">
        <div className="courses-header__panel">
          <span className=" text-2xl font-bold">دوره های ثبت نام شده</span>
          <ul className="flex border-b-2 border-primary gap-5 pb-5 mt-10">
            <li
              className="m-[1rem 0 1rem 3.5rem]"
              onClick={(event) => {
                event.preventDefault()
                setShowCourseState("all")
                filterCourses("all")
              }}
            >
              <a
                className={`text-xl ${
                  showCourseState === "all" && "text-primary font-bold"
                }`}
                href="#"
              >
                همه دوره ها
              </a>
            </li>
            <li
              className="m-[1rem 0 1rem 3.5rem]"
              onClick={(event) => {
                event.preventDefault()
                setShowCourseState("free")
                filterCourses("free")
              }}
            >
              <a
                className={`text-xl ${
                  showCourseState === "free" && "text-primary font-bold"
                }`}
                href="#"
              >
                دوره های رایگان
              </a>
            </li>
            <li
              className="m-[1rem 0 1rem 3.5rem]"
              onClick={(event) => {
                event.preventDefault()
                setShowCourseState("unfree")
                filterCourses("unfree")
              }}
            >
              <a
                className={`text-xl ${
                  showCourseState === "unfree" && "text-primary font-bold"
                }`}
                href="#"
              >
                دوره های غیر رایگان
              </a>
            </li>
          </ul>
        </div>
        <div className="main">
          <div className="row">
            <div className="col-12">
              {shownCourses.length ? (
                <>
                  {shownCourses.map((course) => (
                    <div className="flex my-8 mx-0 border-2 rounded-lg border-primary overflow-hidden">
                      <div className="w-[30%]">
                        <a className="main__box-img-link" href="#">
                          <img
                            className="h-100"
                            src={`http://localhost:8000/courses/covers/${course.course.cover}`}
                          />
                        </a>
                      </div>
                      <div className="pr-8">
                        <a href="#" className="text-xl font-bold mt-4">
                          {course.course.name}
                        </a>
                        <div className="flex mt-2">
                          <div className="ml-12">
                            <span className="font-bold text-primary ms-2">
                              وضعیت:
                            </span>
                            <span className="main__box-all-value">
                              {course.course.isComplete
                                ? "تکمیل شده"
                                : "درحال برگزاری"}
                            </span>
                          </div>
                          <div className="ml-12">
                            <span className="text-primary font-bold ms-2">
                              قیمت:
                            </span>
                            <span className="main__box-completed-value">
                              {course.price
                                ? course.price.toLocaleString()
                                : "رایگان"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="text-2xl mt-10 text-zinc-700">
                  هیچ دوره ای برای این دسته بندی یافت نشد!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
