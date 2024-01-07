import React from "react"
import {  Field, ErrorMessage } from "formik"

export default function TextArea({label,id,style}) {
  return (
    <div className="">
      <label htmlFor={id} className="text-sm text-zinc-500">
        {label}
      </label>
      <Field
        as="textarea"
        id={id}
        name={id}
        className={style ? style : "form-comment h-40"}
      />
      <ErrorMessage
        name={id}
        component="div"
        className="error form-error  md:w-1/2"
      />
    </div>
  )
}
