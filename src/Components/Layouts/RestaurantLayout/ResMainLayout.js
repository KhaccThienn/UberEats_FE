import React, { useState } from "react";
import "../../../global/restaurant/css/bootstrap.min.css";
import "../../../global/restaurant/css/responsive.css";
import "../../../global/restaurant/css/style.css";
import "../../../global/restaurant/css/typography.css";

import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import SideBar from "./Sidebar/SideBar";

import { useEffect } from "react";
import { useSelector } from 'react-redux';
import * as RestaurantService from "../../../services/RestaurantService";
import { selectUserData } from './../../../redux/reducers/users';
import AuthRestaurantSideBar from "./Sidebar/AuthRestaurantSideBar";

function ResMainLayout({ child }) {
  const userData = useSelector(selectUserData);

  const [restaurants, setRestaurants] = useState([]);
  const [reload, setReload] = useState(false);
  // console.log(userData);

  useEffect(() => {
    const getRestaurantByUserID = async () => {
      const [data, error] = await RestaurantService.getAllRestaurantByUser(userData.user.subject);
      if (data) {
        setRestaurants(data.restaurant);
        // console.log(data.restaurant);
      }
      if (error) {
        console.log(error);
      }
    }
    getRestaurantByUserID();

  }, [userData.user.subject, restaurants.length, reload]);
  return (
    <div className="wrapper">
      {
        restaurants.length == 0 ? <AuthRestaurantSideBar /> : <SideBar />
      }
      <Header />
      <div id="content-page" className="content-page">
        <div className="container-fluid">{child}</div>
      </div>
      <Footer />
    </div>
  );
}

export default ResMainLayout;
