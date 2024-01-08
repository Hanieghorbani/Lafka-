import React, { useContext } from "react"
import Header from "../../../components/Main/Header/Header"
import EndOfHeader from "../../../components/Main/EndOfHeader/EndOfHeader"
import InfosBox from "../../../components/Main/InfoBoxInSec2/InfosBox"
import Footer from "../../../components/Main/Footer/Footer"
import BurgerBox from "../../../components/Main/BurgerBox/BurgerBox"
import { Link } from "react-router-dom"
import ContextData from "../../../ContextData/ContextData"
import HeaderSection from '../../../components/Main/HeaderSection/HeaderSection'
export default function Index() {
  const contextDatas = useContext(ContextData)
  return (
    <div className="relative overflow-hidden">
      <div className=" bg-primary ">
        <Header />
        <EndOfHeader />
      </div>

      {/* section 1  */}
      <div className=" bg-img-fries bg-cover bg-no-repeat py-20 container-primary">
        <HeaderSection
          title={"کدام را می پسندید ؟ گوشت یا مرغ .. ؟"}
          desc={"آنها در شکل ها و اندازه های مختلف هستند"}
          topDesc={"کدام گزینه جوانه های طعم شما را بیشتر می کند؟"}
        />

        <div className="flex sm:flex-col md:flex-row gap-10 items-center justify-between mt-16">
          <div className="flex flex-col items-center justify-center">
            <img src="/imgs/foods/chicken-beef-600x386.png" alt="" />
            <Link to={"/productCategory/برگرها"} className="btn-primary">
              سفارش مرغ
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center">
            <img src="/imgs/foods/beef-chicken-600x386.png" alt="" />
            <Link to={"/productCategory/برگرها"} className="btn-primary">
              سفارش گوشت
            </Link>
          </div>
        </div>
      </div>

      {/* section 2  */}
      <div className="bg-secondary bg-img-cheese bg-cover py-20 container-primary">
        <HeaderSection
          title={"یک برگر سالم دوست دارید؟ … بفرمایید!"}
          desc={"          اما به هر حال ، هر روز آنها را می خوریم"}
          textWhite={true}
        />

        <div className="grid sm:grid-cols-1 md:grid-cols-3 mt-20 gap-10">
          <div className="space-y-10 bg-yellow-100/30 rounded-xl p-5">
            <InfosBox title="نان برگر" icon="GiHamburger" calories="165" />
            <InfosBox title="تخم مرغ" icon="BsEggFried" calories="142" />
          </div>
          <div className="flex flex-col items-center justify-between">
            <img src="/imgs/foods/burger-healthy.png" alt="" />
            <p className="text-xl text-gray-700 text-center">
              اوه ، پسر … آنها طعم تخم مرغ را فرا می گیرند!
            </p>
          </div>
          <div className="space-y-10 bg-yellow-100/30 rounded-xl p-5">
            <InfosBox title="پنیر" icon="GiCheeseWedge" calories="78" />
            <InfosBox title="ورقه های گوشت" icon="GiSteak" calories="118" />
          </div>
        </div>
        <Link to={'/productCategory/برگرها'} className="text-center mx-auto block">
          <button  className="btn-primary mt-10">سفارش</button>
        </Link>
      </div>

      {/* Best Selling  */}
      <div className="container-primary py-20">
        <HeaderSection
          title={"یکی از پرفروش های ما را انتخاب کنید"}
          desc={"زمان اثبات طعم و مزه هزاران نفر"}
        />

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {contextDatas.products
            .slice(-6)
            .map((product) => (
              <BurgerBox key={product._id} {...product} />
            ))}
        </div>
      </div>

      {/* Custome Burger */}
      <div className="bg-gray-100 py-20 container-primary flex flex-col items-center justify-center">
        <HeaderSection
          title={"خودتان برگرتان را بسازید"}
          desc={"فقط عناصر مورد علاقه خود را اضافه کنید"}
        />
        <img src="/imgs/foods/burger-layers.png" alt="" className="" />
        <button className="btn-primary mt-16">ساخت برگر</button>
      </div>

      {/* Best Service  */}
      <div className=" bg-secondary py-20 bg-img-fries bg-cover flex items-center justify-center flex-col container-primary">
        <HeaderSection
          title={"سیب زمینی سرخ کرده + شیک خامه ای"}
          desc={"بهترین محصول ما"}
          topDesc={"بهترین خدمت با"}
          textWhite={true}
        />
        <img src="/imgs/foods/fries-healthy.png" alt="" />
        <Link to={'/shop/1'} className="btn-primary mt-16">نمایش همه</Link>
      </div>

      <Footer />
    </div>
  )
}
