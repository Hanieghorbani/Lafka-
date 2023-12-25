import React, { useState, useEffect } from "react"
import Header from "../../../components/Header/Header"

import { Swiper, SwiperSlide } from "swiper/react"
// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"
import "./About.css"
// import required modules
import { Autoplay, Pagination } from "swiper/modules"
import CommentBox from "../../../components/Main/CommentBox/CommentBox"
import Footer from "../../../components/Footer/Footer"
import TopSection from "../../../components/Main/TopSection/TopSection"
export default function About() {
  const [isFixedTopbar, setIsFixedTopbar] = useState(true)

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleScroll = () => {
    if (window.scrollY > 67) {
      setIsFixedTopbar(false)
    } else {
      setIsFixedTopbar(true)
    }
  }

  return (
    <div className="">
      <TopSection subTitle={"درباره ما"} bg={"bg-img-about"} />

      {/* section 2  */}
      <div className="md:w-2/3 mx-auto py-20 container-primary">
        <h2 className="font-[delbar] sm:text-[1.4rem] sm:text-center md:text-5xl lg:text-4xl mb-10">
          ما فقط از بالاترین کیفیت مواد تشکیل دهنده استفاده می کنیم. نتیجه سلیقه
          ای است که می توانید با آن قسم بخورید.
        </h2>
        <p className={`text-gray-400 text-center`}>
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
          از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و
          سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای
          متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه
          درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد
        </p>
      </div>
      {/* end of section 2  */}

      <img
        src="/imgs/bg/sandwich-board.png"
        alt=""
        className="container-primary"
      />

      {/* our story  */}
      <div className="flex items-center flex-col mt-20 md:w-1/2 mx-auto container-primary">
        <h2 className="mb-10 font-[delbar] text-4xl">داستان ما</h2>
        <div className="flex relative md:w-full justify-between">
          <span className="border-t-4 border-dashed center-position w-full -z-10"></span>
          <button className="btn-yearStory">1378</button>
          <button className="btn-yearStory">1382</button>
          <button className="btn-yearStorySelect">1388</button>
          <button className="btn-yearStory">1399</button>
        </div>
      </div>
      <p className="text-gray-400 text-center mt-10 md:w-3/4 container-primary leading-8">
        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
        از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و
        سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای
        متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه
        درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد
      </p>
      {/*end of our story  */}

      {/* section 3  */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 sm:gap-10 md:gap-0 bg-[#22272d] container-primary my-40 py-10 items-center">
        <img src="/imgs/foods/Mason-Zidar-Teran-burger.jpg" alt="" />
        <div className="flex flex-col items-center justify-center gap-10">
          <h3 className="text-white font-bold sm:text-lg  md:text-2xl text-center">
            ما غذای واقعی را با دست تهیه می کنیم ، تازه سفارش می دهیم این
            سریعترین راه نیست – این راه درست است .
          </h3>
          <p className=" text-[#888888] text-center">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و
            کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی
            در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را
            می طلبد
          </p>
          <img
            src="/imgs/logos/signature-white-130x60.png"
            alt=""
            className="mb-10 md:mb-0"
          />
        </div>
      </div>
      {/* end of section 3  */}

      {/* section 4 */}
      <div className=" container-primary md:w-2/3 flex flex-col items-center gap-10">
        <h1 className="font-[delbar] sm:text-[1.9rem] sm:text-center md:text-5xl lg:text-5xl">
          مطبوعات و جوایز
        </h1>
        <p className="text-gray-400 text-center leading-9">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
          از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و
          سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای
          متنوع با هدف بهبود ابزارهای کاربردی می باشد
        </p>
        <img src="/imgs/logos/awards-red-600x164 (1).jpg" alt="" />
      </div>
      {/*end of section 4 */}

      {/* comments section  */}
      <div className="bg-zinc-200 pb-16 pt-24 mt-40">
        <div className="container-primary md:w-2/3">
          <h3 className="font-[delbar] sm:text-[1.9rem] sm:text-center md:text-5xl lg:text-5xl sm:mb-10 md:mb-16">
            نگاهی به نظرات کاربران
          </h3>
          <Swiper
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            modules={[Pagination, Autoplay]}
            className="swiperNews mb-10"
            loop={true}
            data-aos="fade-up"
            data-aos-duration="2000"
            data-aos-delay="100"
          >
            <SwiperSlide>
              <CommentBox
                content="به شدت غذاهای خوش مزه و عالی.مشتری ثابتتون شدم.ممنون ازتون."
                name="امیر صادقی"
                score={5}
              />
            </SwiperSlide>
            <SwiperSlide>
              <CommentBox
                content="بسته بندی غذا خوب بود ولی غذاها یکم سرد به دستمون رسیدن"
                name="فرزانه عباسی"
                score={3}
              />
            </SwiperSlide>
            <SwiperSlide>
              <CommentBox
                content="حجم غذا نسبت به قیمت عالی بود با تشکر"
                name="محمد امینی"
                score={5}
              />
            </SwiperSlide>
            <SwiperSlide>
              <CommentBox
                content="خیلی لذت بردیم از غذاهاتون مخصوصا از رویال برگر ویژه.عالی بود"
                name="سارا خدایی"
                score={4}
              />
            </SwiperSlide>
            <SwiperSlide>
              <CommentBox
                content=" هم حجم غذا هم کیفیت هم قیمت ،همه چی خیلی خوب بود بازم سفارش میدم ازتون خیلی راضی بودم (:"
                name="حانیه قربانی"
                score={5}
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      {/*end of comments section  */}

      <Footer />
    </div>
  )
}
