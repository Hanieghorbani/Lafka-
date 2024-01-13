import React, { useState, useEffect, useContext } from "react"
import Header from "../../../components/Main/Header/Header"
import Footer from "../../../components/Main/Footer/Footer"
import EnergyBox from "../../../components/Main/EnergyBox/EnergyBox"
import BurgerBox from "../../../components/Main/BurgerBox/BurgerBox"
import Category from "../../../components/Main/Category/Category"
import TextArea from "../../../components/Fields/TextArea/TextArea"
import ContextData from "../../../ContextData/ContextData"

// icons
import { GiScales } from "react-icons/gi"
import {
  FaRegUserCircle,
  FaStar,
  FaRegStar
} from "react-icons/fa"
import { VscHeartFilled,VscHeart  } from "react-icons/vsc";
// end of icons

import { useParams } from "react-router-dom"

// packages
import { Formik, Form } from "formik"
import * as Yup from "yup"
import axios from "axios"
import swal from "sweetalert"
import jalaliMoment from "jalali-moment"

export default function ProductInfo() {
  const { shortName } = useParams()
  const [productInfo, setProductInfo] = useState([])
  const [related, setRelated] = useState([])
  const stars = [false, false, false, false, false]
  const [mainStar, setMainStar] = useState(stars)
  const [isClickStar, setIsClickStar] = useState(false)
  const [haveOff, setHaveOff] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isInFavourites, setIsInFavourites] = useState(false)

  const [score, setScore] = useState(null)
  const [codeOff, setCodeOff] = useState("")
  const [showCommOrDesc, setShowCommOrDesc] = useState("desc")
  const [newPrice, setNewPrice] = useState(0)
  const {
    config,
    cart,
    categorys,
    setIsOpenSidebarCart,
    addToCart,
    addfavouriteHandler,
    favourites,
    removefavourite
  } = useContext(ContextData)

  const initialValues = {
    contentText: "",
  }

  const validationSchema = Yup.object().shape({
    contentText: Yup.string()
      .required("متن پیام الزامی است")
      .min(5, "پیام وارد شده نمی تواند کمتر از 5 حرف باشد"),
  })

  function setOffHandler() {
    if (haveOff) {
      swal({
        title: "شما قبلا کد تخفیف خود را اعمال کرده اید",
        icon: "error",
        dangerMode: true,
        buttons: "تایید",
      })
    } else if (productInfo.discount != 0) {
      swal({
        title:
          "در زمان تخفیفات همگانی شما نمی توانید از کد تخفیف جدایی استفاده کنید.",
        icon: "error",
        dangerMode: true,
        buttons: "تایید",
      })
    } else {
      const data = { course: productInfo._id }
      axios
        .post(`https://lafka-back.liara.run/v1/offs/${codeOff}`, data, config)
        .then((res) => {
          setNewPrice(
            productInfo.price - (productInfo.price * res.data.percent) / 100
          )
          swal({
            text: "کد تخفیف بر روی این محصول  با هر تعدادی،اعمال شد",
            icon: "success",
            dangerMode: false,
            buttons: "تایید",
          })
          setHaveOff(true)
        })
        .catch((err) => {
          console.log(err)
          if (err.response.status == 404) {
            swal({
              title: "کد تخفیف نامعتبر است!",
              icon: "error",
              dangerMode: true,
              buttons: "تایید",
            })
          } else if (err.response.status == 409) {
            swal({
              title: "این کد تخفیف قبلا استفاده شده",
              icon: "error",
              dangerMode: true,
              buttons: "تایید",
            })
          }
        })
    }
  }

  useEffect(()=>window.scrollTo(0, 0),[])
  useEffect(() => {
    // get product info
    axios
      .get(`https://lafka-back.liara.run/v1/courses/${shortName}`, config)
      .then((res) => {
        const isProdInCart = cart.find((prod) => prod._id === res.data._id)
        if (isProdInCart) {
          setProductInfo(isProdInCart)
        } else {
          setProductInfo(res.data)
        }
        setIsLoading(true)

        setIsInFavourites(favourites.find((prod) => prod._id == res.data._id))
      })
      .catch((err) => console.log(err))

    // get related products
    axios
      .get(`https://lafka-back.liara.run/v1/courses/related/${shortName}`)
      .then((res) => {
        setRelated(res.data)
      })
  }, [shortName,favourites])

  // score handler in comment section
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
    setScore(index + 1)
    for (let i = 0; i <= index; i++) {
      stars[i] = true
    }
    setMainStar(stars)
    setIsClickStar(true)
  }
  // end of score handler

  function createCommentHandler(values, { resetForm }) {
    const commentInfo = {
      body: values.contentText,
      courseShortName: productInfo.shortName,
      score,
    }
    axios
      .post("https://lafka-back.liara.run/v1/comments", commentInfo, config)
      .then((res) => {
        swal({
          text: "دیدگاه شما پس از تایید مدیران سایت نمایش داده خواهد شد",
          icon: "success",
          dangerMode: false,
          buttons: "تایید",
        }).then(() => {
          resetForm()
        })
      })
      .catch((err) => console.log(err))
  }

  return (
    <div>
      <div className="bg-primary">
        <Header />
      </div>
      <Category categorys={categorys} />
      {isLoading && (
        <>
          {" "}
          <div className="my-20">
            {/* main info  */}
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-10 items-center container-primary">
              <img
                src={`https://lafka-back.liara.run/courses/covers/${productInfo.cover}`}
                className="w-full"
              />
              <div className="relative space-y-8 contentBurgerBox">
                <h1 className="text-2xl">{productInfo.name}</h1>
                <p className="text-sm text-zinc-600">
                  {productInfo.description}
                </p>

                {/* scale  */}
                <div className="flex gap-2 items-center bg-zinc-200 md:w-1/3 sm:w-1/2 rounded-2xl p-2 text-dark text-sm">
                  <GiScales className="text-lg" />
                  <p>
                    سایز:{" "}
                    <span className="font-[faNum]">{productInfo.scale}</span>{" "}
                    گرم
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

                <div className="flex flex-col sm:gap-5 mt-10">
                  <div className="flex sm:flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center justify-between sm:gap-4 md:gap-2">
                      <input
                        type="text"
                        className="sm:w-2/3 md:w-auto border-0 bg-zinc-200  focus:bg-zinc-300 rounded-xl"
                        placeholder="کد تخفیف"
                        value={codeOff}
                        onChange={(e) => setCodeOff(e.target.value)}
                      />
                      <button
                        className="btn bg-info text-sm"
                        onClick={setOffHandler}
                      >
                        اعمال کد
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center sm:justify-between  gap-2">
                    <div className="flex items-center gap-3">
                      <button
                        className="btn bg-info text-sm"
                        onClick={() => {
                          setIsOpenSidebarCart(true)

                          addToCart(
                            productInfo,
                            newPrice ||
                              productInfo.price -
                                (productInfo.price * productInfo.discount) / 100
                          )
                        }}
                      >
                        افزودن به سبد خرید
                      </button>
                      {isInFavourites ? (
                        <VscHeartFilled
                          className="sm:text-2xl lg:text-3xl text-info cursor-pointer"
                          onClick={() => removefavourite(productInfo)}
                        />
                      ) : (
                        <VscHeart  
                          className="sm:text-2xl lg:text-3xl cursor-pointer text-info"
                          onClick={() => addfavouriteHandler(productInfo)}
                        />
                      )}
                    </div>
                    {/* price  */}
                    <div>
                      <h3
                        className={`text-2xl ${
                          (haveOff == true || productInfo.discount != 0) &&
                          "line-through text-zinc-400 text-base"
                        }`}
                      >
                        <span className="font-[faNum]">
                          {new Intl.NumberFormat().format(productInfo.price)}
                        </span>{" "}
                        تومان
                      </h3>
                      {(haveOff == true || productInfo.discount != 0) && (
                        <h3 className="sm:text-lg md:text-2xl">
                          <span className="font-[faNum]">
                            {newPrice != 0 &&
                              new Intl.NumberFormat().format(newPrice)}
                            {productInfo.discount != 0 &&
                              new Intl.NumberFormat().format(
                                productInfo.price -
                                  (productInfo.price * productInfo.discount) /
                                    100
                              )}
                          </span>{" "}
                          تومان
                        </h3>
                      )}
                    </div>
                    {/* end of price  */}
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
                    نظرات (
                    <span className="font-[faNum]">
                      {productInfo.comments.length}
                    </span>
                    )
                  </h5>
                </div>
                <div>
                  {showCommOrDesc == "desc" ? (
                    <div>
                      <p className=" sm:text-justify md:w-2/3 md:text-center mx-auto pt-10 text-zinc-600 leading-9">
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                        چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون
                        بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و
                        برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با
                        هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت
                        و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و
                        متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را
                        برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ
                        پیشرو در زبان فارسی ایجاد کرد.
                      </p>
                    </div>
                  ) : (
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-10 py-10">
                      {/* right section / */}
                      <div>
                        <h1 className="sm:text-xl md:text-2xl mb-10">
                          نقد و بررسی‌ها
                        </h1>
                        {/* comments  */}
                        <div className="space-y-6">
                          {productInfo.comments.length ? (
                            <>
                              {" "}
                              {productInfo.comments.map((comment) => (
                                <div className="bg-white rounded-2xl p-4">
                                  {/* name and score  */}
                                  <div className="flex justify-between items-center text-xl mb-5">
                                    <div className="flex  gap-1  text-zinc-500">
                                      <div>
                                        <FaRegUserCircle />
                                        <p className="text-xs">
                                          {comment.creator.role === "ADMIN"
                                            ? "مدیر"
                                            : "کاربر"}
                                        </p>
                                      </div>
                                      <p className="sm:text-sm md:text-base">
                                        {comment.creator.name}
                                      </p>
                                    </div>

                                    <div className="flex text-secondary sm:text-sm md:text-base">
                                      {Array(comment.score)
                                        .fill(1)
                                        .map((star) => (
                                          <FaStar />
                                        ))}

                                      {Array(5 - comment.score)
                                        .fill(0)
                                        .map((star) => (
                                          <FaRegStar />
                                        ))}
                                    </div>
                                  </div>
                                  {/* body  */}
                                  <div>
                                    <p className="text-zinc-700">
                                      {comment.body}
                                    </p>
                                    <div>
                                      {/* use jalali-moment library for change date to Shamsi */}
                                      <p className="text-zinc-500 text-xs text-left">
                                        {jalaliMoment(comment.createdAt).format(
                                          "jYYYY/jM/jD"
                                        )}
                                      </p>
                                    </div>

                                    {/* answer */}
                                    {comment.answerContent && (
                                      <div className="bg-zinc-200 px-5 mt-3 py-3 rounded-2xl">
                                        <div className="flex gap-10 text-xl mb-5">
                                          <div className="flex gap-1  text-zinc-500">
                                            <div>
                                              <FaRegUserCircle />
                                              <p className="text-xs">
                                                {comment.answerContent.creator
                                                  .role === "ADMIN"
                                                  ? "مدیر"
                                                  : "کاربر"}
                                              </p>
                                            </div>
                                            <p className="text-base">
                                              {
                                                comment.answerContent.creator
                                                  .name
                                              }
                                            </p>
                                          </div>
                                        </div>
                                        {/* body  */}
                                        <div>
                                          <p className="text-zinc-700">
                                            {comment.answerContent.body}
                                          </p>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </>
                          ) : (
                            <span>هیچ دیدگاهی برای این محصول یافت نشد!</span>
                          )}
                        </div>
                      </div>

                      {/* left section  */}
                      <div className="sm:border-t-2 md:border-t-0 md:border-r-2 border-zinc-500 sm:pt-10 md:pt-0 md:pr-10 space-y-5">
                        <h1 className="text-lg">دیدگاه خود را بنویسید</h1>
                        <p className="sm:text-sm md:text-base">
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
                          onSubmit={createCommentHandler}
                        >
                          <Form className="space-y-10">
                            <div className=" md:col-span-3 relative">
                              <TextArea
                                label={"دیدگاه شما:"}
                                id={"contentText"}
                              />
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
                <p className="text-center">
                  شاید شما این را نیز دوست داشته باشید…
                </p>
              </div>
              <div className="md:col-span-3 grid sm:grid-cols-1 md:grid-cols-3 gap-5">
                {related.map((product) => (
                  <BurgerBox key={product._id} {...product} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      <Footer />
    </div>
  )
}
