import React, { useState } from "react"
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6"

export default function Counter({ count }) {
  const [mainCount, setMainCount] = useState(count)
  return [
    <div className="bg-zinc-200 flex justify-between text-xl items-center text-zinc-400 w-20 p-2 rounded-2xl">
      <FaCircleMinus
        className="hover:bg-white rounded-full cursor-pointer"
        onClick={() => {
          if (mainCount > 0) {
            setMainCount((prev) => prev - 1)
          }
        }}
      />
      <p className="text-dark font-[faNum]">{mainCount}</p>

      <FaCirclePlus
        className="hover:bg-white rounded-full cursor-pointer"
        onClick={() => {
          setMainCount((prev) => prev + 1)
        }}
      />
    </div>
  ]
}
