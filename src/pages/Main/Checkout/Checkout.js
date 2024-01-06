import React, { useContext, useState } from "react"
import TopSection from "../../../components/Main/TopSection/TopSection"
import Footer from "../../../components/Main/Footer/Footer"
import ContextData from "../../../ContextData/ContextData"
import { IoCloseOutline } from "react-icons/io5"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { Link } from "react-router-dom"
import swal from "sweetalert"
import axios from "axios"
import Input from "../../../components/Input/Input"
export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState("credit")
  const [readPolicy, setReadPolicy] = useState(false)
  const { config, cart, setCart } = useContext(ContextData)
  const initialValues = {
    state: "",
    city: "",
    address: "",
    postalCode: "",
    orderDesc: "",
  }
  const validationSchema = Yup.object().shape({
    state: Yup.string().required(" نام استان الزامی است"),
    address: Yup.string().required("آدرس کامل الزامی است"),
    city: Yup.string().required("نام شهر الزامی است"),
    postalCode: Yup.string()
      .required("کد پستی الزامی است")
      .min(10, "کد پستی نمی تواند کمتر از 10 رقم باشد"),
  })

  function paymentHandler() {
    if (paymentMethod == "credit") {
    } else {
      swal({
        text: "متاسفیم!در استان شما امکان پرداخت درب منزل وجود ندارد،لطفا از طریق بانک پرداخت کنید..",
        icon: "warning",
        buttons: ["لغو", "پرداخت"],
      }).then((res) => {
        if (res) {
          swal({
            text: "منتقل شدن به درگاه پرداخت و پرداخت موفق",
            icon: "success",
            dangerMode: false,
            buttons: "تایید",
          }).then(() => {
            cart.forEach((product) => {
              const data = { price: product.price }
              axios
                .post(
                  `http://localhost:8000/v1/courses/${product._id}/register`,
                  data,
                  config
                )
                .then((res) => {
                  setCart([])
                  localStorage.setItem("cart", JSON.stringify([]))
                })
                .catch((err) => console.log(err))
            })
          })
        }
      })
    }
  }
  return (
    <div>
      <TopSection
        bg={"bg-zinc-100"}
        bgHead={"bg-primary"}
        subTitle={"پرداخت"}
        showCategory={true}
        textColor={"text-black"}
      />
      <div className="grid grid-cols-3 my-20 gap-10 container-primary">
        <div className="col-span-2">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
          >
            <Form
              id="formCheckout"
              className="bg-white space-y-7 p-10 rounded-2xl"
            >
              <h1 className="text-3xl">جزئیات صورتحساب</h1>

              <Input label={"استان"} id={"state"} />
              <Input label={"شهر"} id={"city"} />
              <Input label={"کد پستی"} id={"postalCode"} />
              <Input label={"آدرس کامل"} id={"address"} />

              {/* order description  */}
              <div className="">
                <h4 className="text-xl mb-3">اطلاعات بیشتر</h4>
                <label htmlFor="orderDesc" className="text-sm text-zinc-700">
                  توضیحات سفارش (اختیاری)
                </label>
                <Field
                  placeholder="یادداشت‌ها درباره سفارش شما، برای مثال نکات مهم درباره نحوه تحویل سفارش"
                  className="form-contact placeholder:text-sm h-44"
                  as="textarea"
                  id="orderDesc"
                  name="orderDesc"
                />
              </div>
            </Form>
          </Formik>
        </div>
        <div className=" col-span-1 border p-5">
          {/* info */}
          <table className="w-full">
            <thead>
              <tr className="bg-zinc-100 text-zinc-600">
                <th className="text-start p-5 ">محصول</th>
                <th className="text-start p-5 ">جمع جزء</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr className="text-sm border-b">
                  <td className="flex items-center text-start p-5 text-zinc-600">
                    {item.name} <IoCloseOutline className="text-zinc-800" />{" "}
                    {item.count}
                  </td>
                  <td className="font-[faNum] text-start p-5 text-zinc-500">
                    {new Intl.NumberFormat().format(item.price)}تومان
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* total  */}
          <div className="flex justify-between p-5">
            <p>مجموع</p>
            <p className=" text-xl text-black">
              <span className="font-[faNum]">
                {new Intl.NumberFormat().format(
                  cart.reduce(
                    (total, product) => total + product.price * product.count,
                    0
                  )
                )}
              </span>{" "}
              تومان
            </p>
          </div>

          {/* payment method  */}
          <div>
            <div className="text-gray-400 text-sm border-b p-5">
              <input
                type="radio"
                id="paymentMethod1"
                name="paymentMethod"
                onClick={() => setPaymentMethod("credit")}
                defaultChecked
              />
              <label htmlFor="paymentMethod1" className="mr-4 text-gray-600">
                انتقال مستقیم بانکی
              </label>
              {paymentMethod == "credit" && (
                <p className="mt-5 leading-6">
                  پرداخت خود را مستقیما به حساب بانکی ما واریز کنید.خواهشمندیم
                  شماره سفارش خود را بعنوان کد ارجاع پرداخت استفاده کنید.سفارش
                  شما تا زمانی که وجوه به حساب ما وارد نشود ارسال نخواهد شد.
                </p>
              )}
            </div>
            <div className="text-gray-400 text-sm border-b p-5">
              <input
                type="radio"
                id="paymentMethod2"
                name="paymentMethod"
                onClick={() => setPaymentMethod("cash")}
              />
              <label htmlFor="paymentMethod2" className="mr-4 text-gray-600">
                پرداخت هنگام دریافت
              </label>
              {paymentMethod == "cash" && (
                <p className="mt-5">پرداخت نقدی درب منزل</p>
              )}
            </div>
          </div>

          {/* privacy-policy */}
          <p className="text-gray-500 text-sm p-5">
            از داده های شخصی شما برای پشتیبانی از تجربه شما در سراسر این وب سایت
            ، مدیریت دسترسی به حساب کاربری خود ، و سایر اهداف توصیف شده در ما
            استفاده می شود{" "}
            <a href="#" className="text-info">
              سیاست حفظ حریم خصوصی.
            </a>
          </p>

          <div className="p-5">
            <input
              type="checkBox"
              onChange={(e) => {
                setReadPolicy(e.target.checked)
              }}
            />
            <label htmlFor="" className="font-bold text-xs mr-3">
              {" "}
              من{" "}
              <a href="#" className="text-info">
                شرایط و مقررات
              </a>{" "}
              را خوانده ام و آن را می پذیرم. *{" "}
            </label>
            <button
              className="btn bg-info mt-5"
              disabled={!readPolicy}
              //   type="submit"
              //   form="formCheckout"
              onClick={paymentHandler}
            >
              ثبت سفارش
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
