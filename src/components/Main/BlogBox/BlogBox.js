import React from "react"
import { FaRegCircleUser } from "react-icons/fa6"
import { MdAccessTime } from "react-icons/md"
import jalaliMoment from "jalali-moment"
import { Link } from "react-router-dom"
export default function BlogBox({
  title,
  cover,
  creator,
  createdAt,
  shortName,
}) {
  return (
    <div className="space-y-4">
      <Link to={`/blogInfo/${shortName}`}>
        <img
          src={`http://localhost:8000/courses/covers/${cover}`}
          alt=""
          className="rounded-3xl mb-5"
        />
      </Link>
      <Link
        to={`/blogInfo/${shortName}`}
        className="font-[faNum] text-zinc-500"
      >
        {title}
      </Link>
      <div className="flex gap-5">
        <p className="flex text-sm items-center text-zinc-400">
          <FaRegCircleUser className="text-xl ml-1" />
          {creator.name}
        </p>
        <p className="text-sm font-[faNum] flex items-center text-zinc-400">
          <MdAccessTime className="text-xl ml-1" />{" "}
          {jalaliMoment(createdAt).format("jYYYY/jM/jD")}
        </p>
      </div>
    </div>
  )
}
