import React, { useState, useRef, useEffect } from "react"
import Header from "../../../components/Header/Header"
import Footer from "../../../components/Footer/Footer"
import EnergyBox from "../../../components/Main/EnergyBox/EnergyBox"
import Counter from "../../../components/Main/Counter/Counter"
// icons
import { CiUser, CiHeart, CiShoppingCart, CiSearch } from "react-icons/ci"
import { GiScales } from "react-icons/gi"
import { FaHeartbeat, FaRegUserCircle, FaStar, FaRegStar } from "react-icons/fa"
// end of icons

import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import StarRatings from "react-star-ratings"
import BurgerBox from "../../../components/Main/BurgerBox/BurgerBox"
export default function ProductInfo() {
  const [showCommOrDesc, setShowCommOrDesc] = useState("desc")
  const [rating, setRating] = useState(0)
  // const [stars, setStars] = useState()
  const stars = [false, false, false, false, false]
  const [mainStar, setMainStar] = useState(stars)
  const [isClickStar, setIsClickStar] = useState(false)
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    title: "",
    contentText: "",
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("نام الزامی است")
      .min(7, "نام باید حداقل ۳ حرف داشته باشد"),
    email: Yup.string()
      .email("فرمت ایمیل وارد شده نا معتبراست")
      .required("ایمیل الزامی است"),
    phone: Yup.string().required("تلفن الزامی است"),
    contentText: Yup.string()
      .required("متن پیام الزامی است")
      .min(20, "پیام وارد شده نمی تواند کمتر از 20 حرف باشد"),
  })

  function hoverStar(index, stars) {
    if (!isClickStar) {
      for (let i = 0; i <= index; i++) {
        stars[i] = true
      }
      setMainStar(stars)
    }
  }

  function leaveStar() {
    if (!isClickStar) {
      setMainStar([false, false, false, false, false])
    }
  }

  function clickStart(e, index, stars) {
    for (let i = 0; i <= index; i++) {
      stars[i] = true
    }
    setMainStar(stars)
    setIsClickStar(true)
  }

  return (
    <div>
      <div className="bg-primary">
        <Header />
      </div>

      <div className="my-20 mt-52">
        {/* main info  */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-10 items-center container-primary">
          <img
            src={`/imgs/foods/beef-chicken-600x386.png`}
            className=" cursor-pointer w-full"
          />
          <div className="relative space-y-8 sm:overflow-y-scroll lg:overflow-y-hidden overflow-x-hidden contentBurgerBox">
            <h1 className="text-2xl">برگر گوشت رویال</h1>
            <p className="text-sm text-zinc-600">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
              استفاده از طراحان گرافیک است
            </p>

            {/* scale  */}
            <div className="flex gap-2 items-center bg-zinc-200 md:w-1/3 sm:w-1/2 rounded-2xl p-2 text-dark text-sm">
              <GiScales className="text-lg" />
              <p>
                سایز: <span className="font-[faNum]">300</span> گرم
              </p>
            </div>
            {/* end of  scale  */}

            {/* energy info  */}
            <div className="grid sm:grid-cols-3 lg:grid-cols-5 md:gap-5 sm:gap-2">
              <EnergyBox title="انرژی" value=" 34 کال" di="29%" />
              <EnergyBox title="پروتئین" value=" 34 گرم" di="64%" />
              <EnergyBox title="چربی" value=" 34 گرم" di="17%" />
              <EnergyBox title="حداکثر چربی" value=" 34 گرم" di="10%" />
              <EnergyBox title="کربوهیدرات" value=" 34 گرم" di="7%" />
            </div>
            <p className="text-xs text-zinc-500">
              *DI: مصرف روزانه را بر اساس رژیم 2000 کالری توصیه می شود
            </p>
            {/*end of energy info  */}

            <div className="flex gap-3 items-center text-sm">
              <FaHeartbeat className="text-info text-xl" />
              <p>آلرژی زا: شیر ، تخم مرغ ، سویا ، گلوتن</p>
            </div>
            <div className="flex flex-col sm:gap-5 mt-10">
              <h3 className="text-2xl">
                <span className="font-[faNum]">93000</span>تومان
              </h3>

              <div className="flex items-center sm:justify-between md:justify-start gap-2">
                <Counter count={1} />
                <button className="btn-yearStorySelect text-sm w-1/3">
                  سفارش
                </button>
                <CiHeart className="text-5xl cursor-pointer hover:text-info" />
              </div>
            </div>
          </div>
        </div>

        {/* descs and comments  */}
        <div className="bg-zinc-200 my-20 py-20">
          <div className="container-primary">
            <div className="flex items-center justify-center gap-10 text-lg">
              <h5
                className={` border-black pb-2 hover:border-b-2 cursor-pointer ${
                  showCommOrDesc == "desc" && "border-b-2"
                }`}
                onClick={() => setShowCommOrDesc("desc")}
              >
                توضیحات
              </h5>
              <h5
                className={` pb-2 text-zinc-700 border-black hover:border-b-2 cursor-pointer  ${
                  showCommOrDesc == "comment" && "border-b-2"
                }`}
                onClick={() => setShowCommOrDesc("comment")}
              >
                نظرات (<span className="font-[faNum]">0</span>)
              </h5>
            </div>
            <div>
              {showCommOrDesc == "desc" ? (
                <div>
                  <p className=" sm:text-justify md:w-2/3 md:text-center mx-auto pt-10 text-zinc-600 leading-9">
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و
                    با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه
                    و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی
                    تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای
                    کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و
                    آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم
                    افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص
                    طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد.
                  </p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-10 py-10">
                  {/* right section / */}
                  <div>
                    <h1 className="text-2xl mb-10">نقد و بررسی‌ها</h1>
                    {/* comments  */}
                    <div className="space-y-6">
                      <div className="bg-white rounded-2xl p-4">
                        <div className="flex gap-10 text-xl mb-5">
                          <div className="flex items-center gap-1  text-zinc-500">
                            <FaRegUserCircle />
                            <p className="text-base">حانیه قربانی</p>
                          </div>

                          <div className="flex text-secondary ">
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaRegStar />
                          </div>
                        </div>

                        <p className="text-zinc-700">
                          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                          چاپ و با استفاده از طراحان گرافیک است
                        </p>
                      </div>
                      <div className="bg-white rounded-2xl p-4">
                        <div className="flex gap-10 text-xl mb-5">
                          <div className="flex items-center gap-1  text-zinc-500">
                            <FaRegUserCircle />
                            <p className="text-base">حانیه قربانی</p>
                          </div>

                          <div className="flex text-secondary ">
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaRegStar />
                          </div>
                        </div>

                        <p className="text-zinc-700">
                          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                          چاپ و با استفاده از طراحان گرافیک است
                        </p>
                      </div>
                      <div className="bg-white rounded-2xl p-4">
                        <div className="flex gap-10 text-xl mb-5">
                          <div className="flex items-center gap-1  text-zinc-500">
                            <FaRegUserCircle />
                            <p className="text-base">حانیه قربانی</p>
                          </div>

                          <div className="flex text-secondary ">
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaRegStar />
                          </div>
                        </div>

                        <p className="text-zinc-700">
                          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                          چاپ و با استفاده از طراحان گرافیک است
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* left section  */}
                  <div className="sm:border-t-2 md:border-t-0 md:border-r-2 border-zinc-500 sm:pt-10 md:pt-0 md:pr-10 space-y-5">
                    <h1 className="text-lg">دیدگاه خود را بنویسید</h1>
                    <p>
                      نشانی ایمیل شما منتشر نخواهد شد. بخش‌های موردنیاز
                      علامت‌گذاری شده‌اند *
                    </p>

                    <div className="flex gap-2 items-center">
                      <p>امتیاز شما:</p>
                      <div className="flex  gap-1">
                        {mainStar.map((star, index) => (
                          <FaStar
                            className={`${
                              star ? "text-secondary" : "text-zinc-500"
                            } cursor-pointer transition-all duration-300`}
                            key={index}
                            data-index={index}
                            onMouseEnter={() => hoverStar(index, stars)}
                            onMouseLeave={leaveStar}
                            onClick={(e) => clickStart(e, index, stars)}
                          />
                        ))}
                      </div>
                    </div>

                    {/* create comment  */}
                    <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                    >
                      <Form className="space-y-10">
                        <div className=" md:col-span-3 relative">
                          <label
                            htmlFor="contentText"
                            className="text-sm text-zinc-500"
                          >
                            دیدگاه شما:
                          </label>
                          <Field
                            as="textarea"
                            type="text"
                            id="contentText"
                            name="contentText"
                            className="form-comment h-40"
                            style={{ boxShadow: "none" }}
                          />
                          <ErrorMessage
                            name="contentText"
                            component="div"
                            className="error form-error  md:w-1/2"
                          />
                        </div>
                        <div className="relative">
                          <label
                            htmlFor="name"
                            className="text-sm text-zinc-500"
                          >
                            نام شما:
                          </label>
                          <Field
                            className="form-comment"
                            type="text"
                            id="name"
                            name="name"
                            style={{ boxShadow: "none" }}
                          />
                          <ErrorMessage
                            name="name"
                            component="div"
                            className="error form-error  md:w-1/2"
                          />
                        </div>
                        <div className="relative">
                          <label
                            htmlFor="email"
                            className="text-sm text-zinc-500"
                          >
                            آدرس ایمیل:
                          </label>
                          <Field
                            className="form-comment"
                            type="text"
                            id="email"
                            name="email"
                            style={{ boxShadow: "none" }}
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="error form-error  md:w-1/2"
                          />
                        </div>
                        <div className="flex gap-1 items-center">
                          <input type="checkBox" />
                          <p className="text-sm text-zinc-600">
                            ذخیره نام، ایمیل و وبسایت من در مرورگر برای زمانی که
                            دوباره دیدگاهی می‌نویسم.
                          </p>
                        </div>
                        <button
                          type="submit"
                          className="btn-yearStorySelect text-sm"
                        >
                          ثبت دیدگاه
                        </button>
                      </Form>
                    </Formik>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* suggestions products */}
        <div className="grid sm:grid-cols-1 md:grid-cols-4 gap-10 container-primary">
          <div className="md:col-span-1">
            <p className="text-center">شاید شما این را نیز دوست داشته باشید…</p>
          </div>
          <div className="md:col-span-3 grid sm:grid-cols-1 md:grid-cols-3 gap-5">
            <BurgerBox
              price="320000"
              img="burger18-300x300 (1).jpg"
              name="برگر گوشت رویال"
            />
            <BurgerBox
              price="180000"
              img="burger20-300x300.jpg"
              name="برگر ساده رویال"
            />
            <BurgerBox
              price="99000"
              img="shake5-300x300.jpg"
              name="برگر ساده رویال"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
