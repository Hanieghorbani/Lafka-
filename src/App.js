import { useEffect, useState, useCallback } from "react"
import routes from "./Routes"
import ScrollToTop from "./components/Main/ScrollToTop/ScrollToTop"
import AOS from "aos"
import { useRoutes } from "react-router-dom"
import useScroll from "./hooks/useScroll"
import ContextData from "./ContextData/ContextData"
import { toast, ToastContainer } from "react-toastify"
import swal from "sweetalert"
import axios from "axios"
function App() {
  useEffect(() => {
    AOS.init({})
  }, [])
  const router = useRoutes(routes)
  const [isScrollBtnVisible] = useScroll(400)
  const [token, setToken] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userInfos, setUserInfos] = useState([])
  const [categorys, setCategorys] = useState([])
  const [products, setProducts] = useState([])
  const [infos, setInfos] = useState([])
  const [cart, setCart] = useState([])
  const [countProduct, setCountProduct] = useState(1)
  const [isOpenSidebarMenu, setIsOpenSidebarMenu] = useState(false)
  const [isOpenSidebarCart, setIsOpenSidebarCart] = useState(false)
  const [isOpenSideSearch, setIsOpenSideSearch] = useState(false)
  const [reLoading, setReLoading] = useState(false)
  const login = useCallback((userInfos, token) => {
    setToken(token)
    setIsLoggedIn(true)
    setUserInfos(userInfos)
    localStorage.setItem("user", JSON.stringify({ token }))
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserInfos({})
    setIsLoggedIn(false)
    localStorage.removeItem("user")
  })

  function getAllCategorys() {
    axios
      .get("http://localhost:8000/v1/category")
      .then((res) => {
        setCategorys(res.data)
      })
      .catch((err) => console.log(err))
  }

  function getAllProducts() {
    axios.get("http://localhost:8000/v1/courses").then((res) => {
      setProducts(res.data)
    })
  }

  function addToCart(prodInfos, newPrice) {
    const existingItem = cart.find((prod) => prod._id === prodInfos._id)
    if (existingItem) {
      if (newPrice) {
        const addNewInfos = cart.map((prod) => {
          return prod._id == prodInfos._id
            ? { ...prod, count: prod.count + 1, price: newPrice }
            : prod
        })
        setCart(addNewInfos)
        localStorage.setItem("cart", JSON.stringify(addNewInfos))
      } else {
        const addCountProd = cart.map((prod) => {
          return prod._id == prodInfos._id
            ? { ...prod, count: prod.count + 1 }
            : prod
        })
        setCart(addCountProd)
        localStorage.setItem("cart", JSON.stringify(addCountProd))
      }
    } else {
      let updateCart
      if (newPrice) {
        updateCart = [...cart, { ...prodInfos, count: 1, price: newPrice }]
      } else {
        updateCart = [...cart, { ...prodInfos, count: 1 }]
      }
      setCart(updateCart)
      localStorage.setItem("cart", JSON.stringify(updateCart))
    }
    toast.success("محصول با موفقیت اضافه شد", {
      position: toast.POSITION.TOP_LEFT,
    })
  }

  function minesCart(prodInfos, removeAll) {
    console.log(removeAll)
    if (prodInfos.count > 1 && !removeAll) {
      const minesCountProd = cart.map((prod) => {
        return prod._id == prodInfos._id
          ? { ...prod, count: prod.count - 1 }
          : prod
      })
      setCart(minesCountProd)
      localStorage.setItem("cart", JSON.stringify(minesCountProd))
    } else if (prodInfos.count == 1 || removeAll) {
      const filterdCart = cart.filter((prod) => prod._id !== prodInfos._id)
      setCart(filterdCart)
      localStorage.setItem("cart", JSON.stringify(filterdCart))
    }
    toast.success("محصول با موفقیت حذف شد", {
      position: toast.POSITION.TOP_LEFT,
    })
  }

  function getInfos() {
    axios.get("http://localhost:8000/v1/infos/index").then((res) => {
      setInfos(res.data)
    })
  }

  //for get user data
  useEffect(() => {
    const localStorageToken = JSON.parse(localStorage.getItem("user"))
    if (localStorageToken) {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorageToken.token}`,
        },
      }
      axios
        .get("http://localhost:8000/v1/auth/me", config)
        .then((userDatas) => {
          setIsLoggedIn(true)
          setUserInfos(userDatas.data)
        })
        .catch((err) => console.log(err))
    }
  }, [token, reLoading])

  useEffect(() => {
    const cartInLoacalStorage = JSON.parse(localStorage.getItem("cart"))
    if (cartInLoacalStorage) {
      setCart(cartInLoacalStorage)
    } else {
      setCart([])
    }
    getAllCategorys()
    getAllProducts()
    getInfos()
  }, [])

  return (
    <div className="overflow-x-hidden">
      <ContextData.Provider
        value={{
          login,
          logout,
          isLoggedIn,
          userInfos,
          getAllCategorys,
          categorys,
          getAllProducts,
          products,
          infos,
          cart,
          setCart,
          addToCart,
          countProduct,
          setCountProduct,
          isOpenSidebarMenu,
          setIsOpenSidebarMenu,
          isOpenSidebarCart,
          setIsOpenSidebarCart,
          isOpenSideSearch,
          setIsOpenSideSearch,
          minesCart,
          reLoading,
          setReLoading,
        }}
      >
        {router}
        <ToastContainer autoClose={1000} rtl />
        {isScrollBtnVisible && <ScrollToTop />}
      </ContextData.Provider>
    </div>
  )
}

export default App
