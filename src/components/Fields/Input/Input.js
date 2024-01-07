import React from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md"

export default function Input({
  label,
  id,
  type,
  isVisible,
  setIsVisible,
  pass,
  style,
}) {
  return (
    <div className="text-start relative">
      <label htmlFor={id} className="text-sm text-zinc-700">
        {label}
      </label>
      <Field
        className={style ? style : "form-contact"}
        type={type ? type : "text"}
        id={id}
        name={id}
      />
      <ErrorMessage
        name={id}
        component="div"
        className="error form-error  md:w-1/2"
      />
      {pass && (
        <div>
          {isVisible ? (
            <MdOutlineVisibility
              onClick={() => setIsVisible(false)}
              className=" cursor-pointer absolute top-9 left-4 text-zinc-600"
            />
          ) : (
            <MdOutlineVisibilityOff
              onClick={() => setIsVisible(true)}
              className=" cursor-pointer absolute top-9 left-4 text-zinc-600"
            />
          )}
        </div>
      )}
    </div>
  )
}
