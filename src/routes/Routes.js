import MainLayout from "../Components/Layouts/MainLayout";
import ResMainLayout from "../Components/Layouts/RestaurantLayout/ResMainLayout";
import Home from "../Components/Pages/Client/Home/Home";
import Login from "../Components/Pages/Login/Login";
import Register from "../Components/Pages/Register/Register";
import Dashboard from "../Components/Pages/Restaurant/Dashboard/Dashboard";
import ListProduct from "../Components/Pages/Restaurant/Product/ListProduct";

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
    path: "/product",
    component: <ResMainLayout child={<ListProduct />} />,
  },
];

export const deliveryRoute = [
  {
    path: "/",
    component: "",
  },
];
