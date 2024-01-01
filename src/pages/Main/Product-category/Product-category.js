import React from "react"
import Footer from "../../../components/Main/Footer/Footer"
import TopSection from "../../../components/Main/TopSection/TopSection"
import { useParams } from "react-router-dom"

export default function Categorya() {
  const { shortName } = useParams()
  return (
    <div>
      <TopSection
        bg={"bg-zinc-200"}
        bgHead={"bg-primary"}
        subTitle={shortName}
        textColor={"text-zinc-800"}
        showCategory={true}
      />
      <Footer />
    </div>
  )
}
