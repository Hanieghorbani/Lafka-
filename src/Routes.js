// panel admin pages
// import PAdminPrivate from "./components/Privates/PAdminPrivate"
import AdminPanel from "./pages/Admin-panel/index"
// import MainAdminPanel from "./pages/Admin-panel/Main/Main"
// import Users from "./pages/Admin-panel/Users/Users"
// import AdminCourses from "./pages/Admin-panel/Courses/Courses"
// import Menus from "./pages/Admin-panel/Menus/Menus"
// import AdminArticles from "./pages/Admin-panel/Articles/Articles"
// import Draft from "./pages/Admin-panel/Draft/Draft"
// import AdminCategory from "./pages/Admin-panel/Category/Category"
// import AdminContacts from "./pages/Admin-panel/Contact/Contact"
// import Sessions from "./pages/Admin-panel/Sessions/Sessions"
// import Comments from "./pages/Admin-panel/Comments/Comments"
// import Offs from "./pages/Admin-panel/Offs/Offs"
// import Discounts from "./pages/Admin-panel/Discounts/Discounts"
// import AdminTickets from "./pages/Admin-panel/Tickets/Tickets"

//main pages
import Index from "./pages/Main/Index/Index"
import About from "./pages/Main/About/About"
import Blogs from "./pages/Main/Blogs/Blogs"
import Branches from "./pages/Main/Branches/Branches"
import Cart from "./pages/Main/Cart/Cart"
import Contact from './pages/Main/Contacts/Contacts'
import Favorites from "./pages/Main/Favorites/Favorites"
import Login from "./pages/Main/Login/Login"
import Shop from './pages/Main/Shop/Shop'
import ProductCategory from "./pages/Main/Product-category/Product-category"
import ProductInfo from "./pages/Main/Product-info/Product-info"
import Register from "./pages/Main/Register/Register"
import Search from "./pages/Main/Search/Search"

const routes = [
  {
    path: "/p-admin/*",
    element: <AdminPanel />,
    children: [
      // { path: "", element: <MainAdminPanel /> },
      // { path: "users", element: <Users /> },
      // { path: "courses", element: <AdminCourses /> },
      // { path: "menus", element: <Menus /> },
      // { path: "articles", element: <AdminArticles /> },
      // { path: "articles/draft/:articleName", element: <Draft /> },
      // { path: "category", element: <AdminCategory /> },
      // { path: "contacts", element: <AdminContacts /> },
      // { path: "sessions", element: <Sessions /> },
      // { path: "comments", element: <Comments /> },
      // { path: "offs", element: <Offs /> },
      // { path: "discounts", element: <Discounts /> },
      // { path: "tickets", element: <AdminTickets /> },
    ],
  },
  { path: "/", element: <Index /> },
  { path: "/about", element: <About /> },
  { path: "/blogs", element: <Blogs /> },
  { path: "/locations", element: <Branches /> },
  { path: "/cart", element: <Cart /> },
  { path: "/contact", element: <Contact /> },
  { path: "/favorites", element: <Favorites /> },
  { path: "/login", element: <Login /> },
  { path: "/shop", element: <Shop /> },
  { path: "/productCategory", element: <ProductCategory /> },
  { path: "/productInfo/:productId", element: <ProductInfo /> },
  { path: "/register", element: <Register /> },
  { path: "/search", element: <Search /> },
]

export default routes
