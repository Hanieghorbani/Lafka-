import React, { useEffect, useState } from "react"
import axios from "axios"
export default function useFetch({ url, methodType, dataBody,dataHeader }) {
  const [datas, setDatas] = useState([])
  const [errs, setErrs] = useState("")

  function fetchData(){
        axios
      .methodType(url,dataBody,dataHeader)
      .then((res) => setDatas(res))
      .catch((err) => setErrs(err))
  }


  return [datas, errs,fetchData]
}
