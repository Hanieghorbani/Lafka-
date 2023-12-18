import React from "react"
import { animateScroll } from "react-scroll"
import { IoIosArrowUp } from "react-icons/io";
export default function ScrollToTop() {

  return (
    <button
      className="rounded-full fixed bottom-16 left-16 bg-secondary w-16 h-16 border-none outline-none text-white z-50 flex justify-center items-center"
      onClick={() => {
        animateScroll.scrollToTop()
      }}
    >
      <IoIosArrowUp className="text-4xl"/>
    </button>
  )
}