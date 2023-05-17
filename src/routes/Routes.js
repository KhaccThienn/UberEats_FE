import MainLayout from "../Components/Layouts/MainLayout";
import ResMainLayout from "../Components/Layouts/RestaurantLayout/ResMainLayout";
import Cart from "../Components/Pages/Client/Cart/Cart";
import Home from "../Components/Pages/Client/Home/Home";
import Login from "../Components/Pages/Login/Login";
import Register from "../Components/Pages/Register/Register";
import AddRestaurant from "../Components/Pages/Restaurant/AddRestaurant/AddRestaurant";
import Dashboard from "../Components/Pages/Restaurant/Dashboard/Dashboard";
import AddProduct from "../Components/Pages/Restaurant/Product/AddProduct";
import ListProduct from "../Components/Pages/Restaurant/Product/ListProduct";
import UpdateProduct from "../Components/Pages/Restaurant/Product/UpdateProduct";
import ListVoucher from "./../Components/Pages/Restaurant/Voucher/ListVoucher";
import AddVoucher from "./../Components/Pages/Restaurant/Voucher/AddVoucher";
import UpdateVoucher from "./../Components/Pages/Restaurant/Voucher/UpdateVoucher";
import Profile from "../Components/Pages/Restaurant/Profile/Profile";
import Food from "../Components/Pages/Client/Food/Food";
import Order from "../Components/Pages/Restaurant/Order/Order";
import OrderDetails from "../Components/Pages/Restaurant/Order/OrderDetails";


export const unLoginRoute = [
  {
    path: "/",
    component: <MainLayout children={<Home />} />,
  },
  {
    path: "/login",
    component: <Login />,
  },
  {
    path: "/register",
    component: <Register />,
  },
];

export const clientRoute = [
  {
    path: "/",
    component: <MainLayout children={<Home />} />,
  },
  {
    path: "/cart",
    component: <MainLayout children={<Cart />} />,
  },
  {
    path: "/id_name-restaurant",
    component: <MainLayout children={<Food />} />,
  },
];

export const restaurantRoute = [
  {
    path: "/",
    component: <ResMainLayout child={<Dashboard />} />,
  },
  {
    path: "/add-restaurant",
    component: <AddRestaurant />,
  },
  {
    path: "/product",
    component: <ResMainLayout child={<ListProduct />} />,
  },
  {
    path: "/product/add",
    component: <ResMainLayout child={<AddProduct />} />,
  },
  {
    path: "/product/update/:id",
    component: <ResMainLayout child={<UpdateProduct />} />,
  },

  {
    path: "/voucher",
    component: <ResMainLayout child={<ListVoucher />} />,
  },
  {
    path: "/voucher/add",
    component: <ResMainLayout child={<AddVoucher />} />,
  },
  {
    path: "/voucher/update/:id",
    component: <ResMainLayout child={<UpdateVoucher />} />,
  },

  {
    path: "/profile",
    component: <ResMainLayout child={<Profile />} />,
  },

  {
    path: "/order",
    component: <ResMainLayout child={<Order />} />,
  },
  {
    path: "/order/:id",
    component: <ResMainLayout child={<OrderDetails />} />,
  },
];

export const deliveryRoute = [
  {
    path: "/",
    component: "",
  },
];
