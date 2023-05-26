/* eslint-disable react/jsx-pascal-case */
import MainLayout from "../Components/Layouts/ClientLayout/MainLayout";
import DeliverLayout from "../Components/Layouts/DeliverLayout/DeliverLayout";
import ResMainLayout from "../Components/Layouts/RestaurantLayout/ResMainLayout";
import Cart from "../Components/Pages/Client/Cart/Cart";
import Food from "../Components/Pages/Client/Food/Food";
import Home from "../Components/Pages/Client/Home/Home";
import OrderFix from "../Components/Pages/Client/Order/OrderFix";
import OrderDetails from "../Components/Pages/Client/OrderDetails/OrderDetails";
import * as ClientProfile from "../Components/Pages/Client/Profile/Profile";
import Search from "../Components/Pages/Client/Search/Search";
import Deliver from "../Components/Pages/Deliver/Deliver";
import Login from "../Components/Pages/Login/Login";
import Register from "../Components/Pages/Register/Register";
import AddRestaurant from "../Components/Pages/Restaurant/AddRestaurant/AddRestaurant";
import AuthAddRestaurant from "../Components/Pages/Restaurant/AddRestaurant/AuthAddRestaurant";
import Dashboard from "../Components/Pages/Restaurant/Dashboard/Dashboard";
import OrderDetail from "../Components/Pages/Restaurant/Order/OrderDetails";
import AddProduct from "../Components/Pages/Restaurant/Product/AddProduct";
import ListProduct from "../Components/Pages/Restaurant/Product/ListProduct";
import UpdateProduct from "../Components/Pages/Restaurant/Product/UpdateProduct";
import ListRestaurant from "../Components/Pages/Restaurant/Profile/Components/ListRestaurant";
import Profile from "../Components/Pages/Restaurant/Profile/Profile";
import OrderMgmt from "./../Components/Pages/Restaurant/Order/Order";
import AddVoucher from "./../Components/Pages/Restaurant/Voucher/AddVoucher";
import ListVoucher from "./../Components/Pages/Restaurant/Voucher/ListVoucher";
import UpdateVoucher from "./../Components/Pages/Restaurant/Voucher/UpdateVoucher";

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
    path: "/search/:keyWord",
    component: <MainLayout children={<Search />} />,
  },
  {
    path: "/order",
    component: <MainLayout children={<OrderFix />} />,
  },
  {
    path: "/profile",
    component: <MainLayout children={<ClientProfile.default />} />,
  },
  {
    path: "/order_details",
    component: <MainLayout children={<OrderDetails />} />,
  },
  {
    path: "/restaurant/:id",
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
    path: "/restaurant/add",
    component: <ResMainLayout child={<AuthAddRestaurant />} />,
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
    path: "/profile/:id",
    component: <ResMainLayout child={<Profile />} />,
  },

  {
    path: "/order",
    component: <ResMainLayout child={<OrderMgmt />} />,
  },
  {
    path: "/order/:id",
    component: <ResMainLayout child={<OrderDetail />} />,
  },
];

export const deliveryRoute = [
  {
    path: "/",
    component: <DeliverLayout children={<Deliver />} />,
  },
  {
    path: "/profile",
    component: <DeliverLayout children={<ClientProfile.default />} />,
  },
];
