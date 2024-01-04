import React, { useContext } from "react"
import MainBox from "../../../components/UserPanel/MainBox/MainBox"
import ContextData from "../../../ContextData/ContextData"

export default function Index() {
  const authContext = useContext(ContextData)

  return (
    <div className="w-full">
      <div className=" space-y-10 pr-12">
        <div className="text-xl">
          <span className="">
            سلام{" "}
            <span className="text-primary font-bold">
              {authContext.userInfos.name}
            </span>
            ، به پنل کاربری خوش اومدی
          </span>
        </div>
        <p className="m-[2.3rem 0 2rem 0]">
          از طریق پیشخوان حساب کاربری‌تان، می‌توانید سفارش‌های اخیرتان را
          مشاهده، آدرس‌های حمل و نقل و صورتحساب‌تان را مدیریت و جزییات حساب
          کاربری و کلمه عبور خود را ویرایش کنید.
        </p>
        <div className="main__links">
          <div className="grid grid-cols-4 gap-10">
            <MainBox title="سفارشات" href="orders" />
            <MainBox title="محصولات خریداری شده" href="products" />
            <MainBox title="جزئیات حساب کاربری" href="edit-account" />
          </div>
        </div>
      </div>
    </div>
  )
}
