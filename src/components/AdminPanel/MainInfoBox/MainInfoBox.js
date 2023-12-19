import React from 'react'
import { FaMoneyBill } from "react-icons/fa";
export default function MainInfoBox({count,title}) {
  return (
    <div className="col-4">
    <div className="home-content-revanue box">
      <div className="home-box">
        <div className="home-box-left">
          <div className="home-box-title">
            <span>{title}</span>
          </div>
          <div className="home-box-value">
            <div className="home-box-price">
              <span>{count}</span>
            </div>
            {/* <div className="home-box-result">
              <span>+5.2%</span>
            </div> */}
          </div>
          <div className="home-box-text">
            <span>{title} در یک ماه گذشته</span>
          </div>
        </div>
        <div className="home-box-right">
          <div className="home-box-icon">
            <FaMoneyBill />
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
