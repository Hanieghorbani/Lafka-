import React, { useContext } from "react"
import { Link } from "react-router-dom"

export default function MainBox({ title, href }) {
  return (
    <Link
      to={href}
      className="text-center bg-info text-white py-6 rounded-md mb-6 transition-all duration-300 hover:bg-primary"
      href="#"
    >
      {title}
    </Link>
  )
}
