import React from "react"

export default function DataTable({ title, children }) {
  return (
    <div className="mt-20">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div>{children}</div>
      
    </div>
  )
}
