import React, { useContext } from "react"
import FavouriteBox from "../../../components/Main/FavoriteBox/FavoriteBox"
import TopSection from "../../../components/Main/TopSection/TopSection"
import Footer from "../../../components/Main/Footer/Footer"
import ContextData from "../../../ContextData/ContextData"
export default function Favourites() {
  const { favourites } = useContext(ContextData)
  return (
    <div>
      <TopSection
        subTitle={"لیست علاقه مندی ها"}
        bg={"bg-zinc-100"}
        bgHead={"bg-primary"}
        textColor="text-black"
      />
      <div className="container-primary md:w-2/3 my-20 space-y-10">
        {favourites ? (
          <>
            {favourites.map((item) => (
              <FavouriteBox key={item._id} {...item} />
            ))}
          </>
        ) : (
          <p>محصولی در علاقه مندی های شما یافت نشد!</p>
        )}
      </div>

      <Footer />
    </div>
  )
}
