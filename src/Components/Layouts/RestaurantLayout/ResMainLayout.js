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
import { io } from "socket.io-client";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const socket = io(process.env.REACT_APP_URL_API);

function ResMainLayout({ child }) {
  const navigate = useNavigate();

  const userData = useSelector(selectUserData);

  const [restaurants, setRestaurants] = useState([]);
  const [reload, setReload] = useState(false);

  if (userData.user?.subject) {
    socket.on("handleCanceledOrder", (data) => {
      console.log("orderStatus Socket Data", data);
      data &&
        Swal.fire({
          title: `Order ${data.orderId} is already canceled by ${data.user.userName} !`,
          showCancelButton: true,
          confirmButtonText: 'OK',
          position: "center"
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/order")
          }
        })
    })

    socket.on("createOrderClient", (data) => {
      console.log("orderStatus Socket Data", data);
      data &&
        Swal.fire({
          title: `You have a new order created at ${data.date}, do you want to view it ?`,
          showCancelButton: true,
          confirmButtonText: 'OK',
          position: "center"
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/order")
          }
        })
    })

    socket.on("deliverUpdateOrderStatus", (data) => {
      console.log("orderStatus Socket Data", data);
      data &&
        Swal.fire({
          title: `Order #${data.orderId} has been picked up by ${data.deliver.userName}`,
          showCancelButton: true,
          confirmButtonText: 'OK',
          position: "center"

        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/order")
          }
        })
    })

    socket.on("deliverShippingOrder", (data) => {
      console.log("orderStatus Socket Data", data);
      data &&
        Swal.fire({
          title: `Order #${data.orderId} has been shipping by ${data.deliver.userName}`,
          showCancelButton: true,
          confirmButtonText: 'OK',
          position: "center"

        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/order")
          }
        })
    })

    socket.on("deliverShippedOrder", (data) => {
      console.log("orderStatus Socket Data", data);
      data &&
        Swal.fire({
          title: `Order #${data.orderId} has been shipped successfully by ${data.deliver.userName}`,
          showCancelButton: true,
          confirmButtonText: 'OK',
          position: "center"

        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/")
          }
        })
    })
  }




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
