import React from "react"
import { FaStar, FaRegStar } from "react-icons/fa"
export default function CommentBox({ name, content, score }) {
  console.log(score);
  return (
    <div className="flex flex-col items-center sm:gap-5 md:gap-9">
      <h5 className="md:text-2xl text-center">"{content}"</h5>
      <div className="flex text-info">
        {Array(5 - score)
          .fill("0")
          .map((item, index) => (
            <FaRegStar />
          ))}
        {Array(score)
          .fill(1)
          .map((item, index) => (
            <FaStar />
          ))}
      </div>
      <p className="text-zinc-600 sm:text-sm md:text-base">{name}</p>
    </div>
  )
}
