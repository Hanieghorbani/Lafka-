import React from "react"
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaTelegramPlane,
  FaGithub,
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
          <a href="https://github.com/Hanieghorbani">
            <FaGithub className="li-footer" />
          </a>
          <a href="https://t.me/hnieghorbani">
            <FaTelegramPlane className="li-footer" />
          </a>
        </div>

        <div className="text-white text-center text-sm">
          <p>توسعه داده شده توسط حانیه قربانی | </p>
          <a href="https://tafresh-theme.com/">ui از تیم تفرش تم</a>
        </div>
      </div>
    </div>
  )
}
