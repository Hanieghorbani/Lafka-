import React, { useState, useEffect } from "react"
import Header from "../../../components/Header/Header"
import HeaderSection from "../../../components/Main/HeaderSection/HeaderSection"
import { SiCodechef } from "react-icons/si";
import { Swiper, SwiperSlide } from "swiper/react"
// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"
import './About.css'
// import required modules
import { Autoplay, Pagination } from "swiper/modules"
import CommentBox from "../../../components/About/CommentBox/CommentBox";
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
    <div className="pb-96">
      <div className="bg-img-about bg-cover overflow-hidden h-screen">
        <Header />
        {/* section 1  */}
        <div
          className={`text-white text-center ${
            !isFixedTopbar ? "pt-[20rem]" : "pt-24"
          }`}
        >
          <p className="text-xl">خانه / درباره ما</p>
          <h1 className="font-[delbar] text-8xl">درباره ما</h1>
        </div>
        {/* end of section 1  */}
      </div>

      {/* section 2  */}
      <div className="w-2/3 mx-auto py-20 container-primary">
        <h2 className="font-[delbar] sm:text-[1.6rem] sm:text-center md:text-5xl lg:text-4xl mb-10">
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

      <div className="container-primary">
        <img src="/imgs/bg/sandwich-board.png" alt="" />
      </div>

      {/* our story  */}
      <div className="flex items-center flex-col mt-20 w-1/2 mx-auto container-primary">
        <h2 className="mb-10 font-[delbar] text-4xl">داستان ما</h2>
        <div className="flex relative w-full justify-between">
          <span className="border-t-4 border-dashed center-position w-full -z-10"></span>
          <button className="btn-yearStory">1378</button>
          <button className="btn-yearStory">1382</button>
          <button className="btn-yearStorySelect">1388</button>
          <button className="btn-yearStory">1399</button>
        </div>
      </div>
      <p className="text-gray-400 text-center mt-10 w-3/4 container-primary leading-8">
        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
        از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و
        سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای
        متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه
        درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد
      </p>
      {/*end of our story  */}

      {/* section 3  */}
      <div className="grid grid-cols-2 bg-[#22272d] container-primary my-40">
        <img src="/imgs/foods/Mason-Zidar-Teran-burger.jpg" alt="" />
        <div className="flex flex-col items-center justify-center gap-10">
          <h3 className="text-white font-bold text-2xl text-center">
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
          <img src="/imgs/logos/signature-white-130x60.png" alt="" />
        </div>
      </div>
      {/* end of section 3  */}

      {/* section 4 */}
      <div className=" container-primary w-2/3 flex flex-col items-center gap-10">
        <h1 className="font-[delbar] sm:text-[1.6rem] sm:text-center md:text-5xl lg:text-5xl mb-10">مطبوعات و جوایز</h1>
        <p className="text-gray-400 text-center leading-9">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد</p>
        <img src="/imgs/logos/awards-red-600x164 (1).jpg" alt="" />
      </div>
      {/*end of section 4 */}

      <div className="container-primary w-2/3">
      <SiCodechef className="text-center  text-[#ac8320] text-6xl"/>
      <Swiper
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 2000,
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
          <CommentBox content='به شدت غذاهای خوش مزه و عالی.مشتری ثابتتون شدم.ممنون ازتون.' name='امیر صادقی' score='5'/>
          </SwiperSlide>
          <SwiperSlide>
          <CommentBox content='بسته بندی غذا خوب بود ولی غذاها یکم سرد به دستمون رسیدن' name='فرزانه عباسی' score='3'/>
          </SwiperSlide>
          <SwiperSlide>
          <CommentBox content='حجم غذا نسبت به قیمت عالی بود با تشکر' name='محمد امینی' score='5'/>
          </SwiperSlide>
          <SwiperSlide>
          <CommentBox content='خیلی لذت بردیم از غذاهاتون مخصوصا از رویال برگر ویژه.عالی بود' name='سارا خدایی' score='5'/>
          </SwiperSlide>
          <SwiperSlide>
          <CommentBox content='هک حجم غذا هم کیفیت هم قیمت ،همه چی خیلی خوب بود بازم سفارش میدم ازتون خیلی راضی بودم (:' name='حانیه قربانی' score='5'/>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  )
}
