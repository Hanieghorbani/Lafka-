import React, { useState, useEffect } from "react"
import CommentBox from "../../../components/Main/CommentBox/CommentBox"
import TopSection from "../../../components/Main/TopSection/TopSection"
import Footer from "../../../components/Main/Footer/Footer"

// Import Swiper
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import "./About.css"

import axios from "axios"
export default function About() {
  const [year, setYear] = useState(1388)
  const [comments, setComments] = useState([])

  useEffect(() => {
    axios
      .get("https://lafka-back.liara.run/v1/comments")
      .then((res) => {
        setComments(res.data)
      })
      .catch((err) => console.log(err))
  }, [])

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
          <button
            className={`${
              year === 1378 ? "btn-yearStorySelect" : "btn-yearStory"
            }`}
            onClick={() => setYear(1378)}
          >
            1378
          </button>
          <button
            className={`${
              year === 1382 ? "btn-yearStorySelect" : "btn-yearStory"
            }`}
            onClick={() => setYear(1382)}
          >
            1382
          </button>
          <button
            className={`${
              year === 1388 ? "btn-yearStorySelect" : "btn-yearStory"
            }`}
            onClick={() => setYear(1388)}
          >
            1388
          </button>
          <button
            className={`${
              year === 1399 ? "btn-yearStorySelect" : "btn-yearStory"
            }`}
            onClick={() => setYear(1399)}
          >
            1399
          </button>
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
          {comments.length ? (
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
              {comments.map((comment) => (
                <SwiperSlide>
                  <CommentBox
                    content={comment.body}
                    name={comment.creator.name}
                    score={comment.score}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p className="text-lg text-center text-zinc-600">هنوز دیدگاهی ثبت نشده!</p>
          )}
        </div>
      </div>
      {/*end of comments section  */}

      <Footer />
    </div>
  )
}
