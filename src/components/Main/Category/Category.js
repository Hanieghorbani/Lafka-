import React from "react"
import { Link } from "react-router-dom"
export default function Category({categorys}) {
  return (
    <div className="lg:w-3/4 bg-primary sm:mt-28 md:mt-28 lg:mt-[9.2rem] container-primary p-3 rounded-b-3xl text-sm">
      <div className="lg:w-1/2 text-white flex items-center justify-between mx-auto">
        {categorys.map((category) => (
          <Link
            to={`/productCategory/${category.name}`}
            key={category._id}
            className="li-header"
          >
            {category.title}
          </Link>
        ))}
      </div>
    </div>
  )
}
