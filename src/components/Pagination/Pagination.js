import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

export default function Pagination({
  items,
  itemsCount,
  pathname,
  setShownItems,
}) {
  const [pageCount, setPageCount] = useState(null)
  const { page } = useParams()
  useEffect(() => {
    let endIndex = page * itemsCount
    let startIndex = endIndex - itemsCount
    setShownItems(items.slice(startIndex, endIndex))
    setPageCount(Math.ceil(items.length / itemsCount))
  }, [page, items])

  return (
    <div className="my-12">
      <ul className="flex items-center justify-center gap-1 w-1/3 container-primary">
        {Array(pageCount)
          .fill("H")
          .map((numPage, index) => (
            <li key={index} className="">
              <Link
                to={`${pathname}/${index + 1}`}
                className={` transition-all duration-300 rounded-lg w-8 h-8 flex justify-center items-center bg-secondary hover:text-white hover:bg-primary ${
                  index + 1 == Number(page) && "text-white bg-primary"
                }`}
              >
                {index + 1}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  )
}
