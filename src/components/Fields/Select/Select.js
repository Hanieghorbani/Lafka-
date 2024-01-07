import React from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"

export default function Select({ label, items,id }) {
  return (
    <div className="">
      <label htmlFor={id} className="text-sm text-zinc-700">
        {label}
      </label>

      <Field
        className="form-create-product"
        as="select"
        id={id}
        name={id}
      >
        <option value="">انتخاب کنید</option>
        {items.map((item) => (
          <option key={item._id} value={item._id} label={item.title} />
        ))}
      </Field>
      <ErrorMessage
        name={id}
        component="div"
        className="error form-error  md:w-1/2"
      />
    </div>
  )
}
