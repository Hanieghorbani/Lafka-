import React, { useContext } from "react"
import MainBox from "../../../components/UserPanel/MainBox/MainBox"
import ContextData from "../../../ContextData/ContextData"

export default function Index() {
  const authContext = useContext(ContextData)

  return (
    <div className="w-full">
      <div className=" space-y-10 ">
        <div className="text-xl sm:text-center md:text-start">
          <span className="">
            سلام{" "}
            <span className="text-primary font-bold">
              {authContext.userInfos.name}
            </span>
            ، به پنل کاربری خوش اومدی
          </span>
        </div>
        <p className="m-[2.3rem 0 2rem 0] sm:text-justify md:text-start">
          از طریق پیشخوان حساب کاربری‌تان، می‌توانید سفارش‌های اخیرتان را
          مشاهده، آدرس‌های حمل و نقل و صورتحساب‌تان را مدیریت و جزییات حساب
          کاربری و کلمه عبور خود را ویرایش کنید.
        </p>
        <div className="main__links">
          <div className="grid sm:grid-cols-1  md:grid-cols-3 gap-10">
            <MainBox title="سفارشات" href="orders" />
            <MainBox title="محصولات خریداری شده" href="#" />
            <MainBox title="جزئیات حساب کاربری" href="edit-account" />
            {authContext.userInfos.role == "ADMIN" && (
              <MainBox title="پنل ادمین" href="/p-admin" />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
