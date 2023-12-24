import React from "react"
import { GiHamburger, GiCheeseWedge, GiSteak } from "react-icons/gi"
import { BsEggFried } from "react-icons/bs"

export default function InfosBox({ icon, title, calories }) {
  const icons = {
    GiHamburger: <GiHamburger />,
    GiCheeseWedge: <GiCheeseWedge />,
    GiSteak: <GiSteak />,
    BsEggFried: <BsEggFried />,
  }
  return (
    <div className="flex flex-col items-center text-xl gap-5">
      <div className="text-4xl text-dark">{icons[icon]}</div>
      <h6 className="">{title}</h6>
      <p className="text-white">
        {" "}
        <span className="font-[faNum]">{calories}</span> کالری
      </p>
    </div>
  )
}
