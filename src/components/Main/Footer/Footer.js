import React from "react"
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaTelegramPlane,
} from "react-icons/fa"

export default function Footer() {
  return (
    <div className="container-primary bg-primary pt-20 pb-10">
      <img
        src="/imgs/logos/flame-burgers-logo.png"
        alt=""
        className="mx-auto"
      />
      <div className="flex sm:flex-col md:flex-row gap-5 justify-between items-center mt-20 ">
        <div className="flex gap-3 justify-between text-white text-xl">
          <FaFacebookF className="li-footer" />
          <FaInstagram className="li-footer" />
          <FaTwitter className="li-footer" />
          <FaTelegramPlane className="li-footer" />
        </div>

        <div className="text-white text-center text-xs">
          <p>توسعه داده شده توسط حانیه قربانی | </p>
          <p>طراحی قالب از تیم تفرش تم</p>
        </div>
      </div>
    </div>
  )
}
