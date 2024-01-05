import React from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"

export default function Input({label,id}) {
  return (
    <div className="text-start">
      <label htmlFor={id} className="text-sm text-zinc-700">
       {label}
      </label>
      <Field className="form-contact" type="text" id={id} name={id} />
      <ErrorMessage
        name={id}
        component="div"
        className="error form-error  md:w-1/2"
      />
    </div>
  )
}
