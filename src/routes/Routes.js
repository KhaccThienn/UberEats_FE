import MainLayout from "../Components/Layouts/MainLayout";
import ResMainLayout from "../Components/Layouts/RestaurantLayout/ResMainLayout";
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

export const unLoginRoute = [
  {
    path: "/",
    component: <MainLayout children={<Home />} />,
  },
  {
    path: "/login",
    component: <MainLayout children={<Login />} />,
  },
  {
    path: "/register",
    component: <MainLayout children={<Register />} />,
  },
];

export const clientRoute = [
  {
    path: "/",
    component: <MainLayout children={<Home />} />,
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
];

export const deliveryRoute = [
  {
    path: "/",
    component: "",
  },
];
