import React from "react"
import TopSection from "../../../components/Main/TopSection/TopSection"
import { FaLocationDot } from "react-icons/fa6"
import LocationBox from "../../../components/Main/LocationBox/LocationBox"
import Footer from '../../../components/Footer/Footer'
export default function Branches() {
  return (
    <div className="">
      <TopSection subTitle={"شعبه ها"} bg={"bg-img-location"} />
      <div className="grid sm:grid-cols-1 md:grid-cols-2 ">
        <div className="bg-secondary container-primary sm:py-9  md:p-12 sm:space-y-5 md:space-y-10">
          <h1 className="sm:text-xl md:text-3xl">ما را در نزدیکی خود پیدا کنید</h1>
          <p className="text-zinc-700 md:leading-5 md:leading-9">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و
            کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد
          </p>
        </div>

        {/* map section  */}
        <div className="bg-zinc-200 flex flex-col items-center gap-5 overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d103647.04770930226!2d51.4162688!3d35.7269504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sfa!2s!4v1703502116788!5m2!1sfa!2s"
            width="400"
            height="300"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
          <div className="flex flex-col items-center bg-white p-5 rounded-lg gap-3 shadow -mb-[7.5rem] hover:-translate-y-28 duration-500 transition-all container-primary">
            <p className="flex items-center text-xl gap-2">
              <FaLocationDot />
              دریافت مسیر ها
            </p>
            <span className="text-zinc-500 text-sm">
              آدرس و یا کد پستی خود را برای محاسبه مسیر پر کنید
            </span>
            <input
              type="text"
              className="bg-zinc-200 border-0 outline-0 rounded-xl focus:border-0"
              style={{ boxShadow: "none" }}
            />
            <button className="bg-info cursor-pointer shadow-2xl text-white rounded-[2rem] py-3 px-8 hover:bg-dark transition-all duration-500 text-sm">
              محاسبه مسیر
            </button>
          </div>
        </div>
      </div>

      <div className="container-primary my-20">
        <h1 className="text-2xl mb-7">تهران</h1>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-10">
          <LocationBox name={"شعبه 1"} city="سعادت آباد" />
          <LocationBox name={"شعبه 2"} city="اسلام شهر" />
          <LocationBox name={"شعبه 3"} city="نیاوران" />
          <LocationBox name={"شعبه 4"} city="پونک" />
        </div>
      </div>
      <div className="container-primary my-20">
        <h1 className="text-2xl mb-7">جنوب کشور</h1>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-10">
          <LocationBox name={"شعبه 5"} city="قشم" />
          <LocationBox name={"شعبه 6"} city="کیش" />
          <LocationBox name={"شعبه 7"} city="بوشهر" />
          <LocationBox name={"شعبه 8"} city="یزد" />
        </div>
      </div>
      <div className="container-primary my-20">
        <h1 className="text-2xl mb-7">شمال کشور</h1>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-10">
          <LocationBox name={"شعبه 9"} city="گیلان" />
          <LocationBox name={"شعبه 10"} city="ارومیه" />
          <LocationBox name={"شعبه 11"} city="مشهد" />
          <LocationBox name={"شعبه 12"} city="تبریز" />
        </div>
      </div>

      <Footer />
    </div>
  )
}
