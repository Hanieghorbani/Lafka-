import React, { useContext } from "react"
import { CiHeart } from "react-icons/ci"
import ContextData from "../../../ContextData/ContextData"

export default function HeartBtn({ prodInfos }) {
  const { favorites ,setFavorites} = useContext(ContextData)
  function addFavoriteHandler() {
    console.log(prodInfos)
    setFavorites(prev=>[...prev,prodInfos])
    const existingItem = favorites.find((prod) => prod._id === prodInfos._id)

    localStorage.setItem("favorites", JSON.stringify([...favorites, prodInfos]))
  }
  return (
    <CiHeart
      className="text-5xl cursor-pointer hover:text-info"
      onClick={addFavoriteHandler}
    />
  )
}
