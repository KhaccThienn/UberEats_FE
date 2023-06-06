import React from "react";
import '../../../global/restaurant/css/typography.css'
import Footer from './Footer/Footer';
import Header from './Header/Header';
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { selectUserData } from "../../../redux/reducers/users";

const socket = io(process.env.REACT_APP_URL_API);

function MainLayout({ children }) {
  const navigate = useNavigate();
  const userData = useSelector(selectUserData);

  if (userData.user?.subject) {
    socket.on("updateOrderStatusClient", (data) => {
      console.log("updateOrderStatusClient Socket Data", data);
      data &&
        Swal.fire({
          title: `Your Order #${data.orderID} is cooking now!`,
          showCancelButton: true,
          confirmButtonText: 'OK',
          position: "center"
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/list_orderded")
          }
        })
    })

    socket.on("updateOrderStatusDeliver", (data) => {
      console.log("updateOrderStatusDeliver Socket Data", data);
      data &&
        Swal.fire({
          title: `Your Order #${data.orderID} has been cooked !`,
          showCancelButton: true,
          confirmButtonText: 'OK',
          position: "center"
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/list_orderded")
          }
        })
    })

    socket.on("updateDeliver", (data) => {
      console.log("updateDeliver Socket Data", data);
      data &&
        Swal.fire({
          title: `Your Order #${data.orderId} has been accepted by ${data.deliver.userName}, do you want to view it ?`,
          showCancelButton: true,
          confirmButtonText: 'OK',
          position: "center"
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/list_orderded")
          }
        })
    })

    socket.on("deliverUpdateOrderStatus", (data) => {
      console.log("deliverUpdateOrderStatus Socket Data", data);
      data &&
        Swal.fire({
          title: `Your Order #${data.orderId} has been picked up by ${data.deliver.userName}, do you want to view it ?`,
          showCancelButton: true,
          confirmButtonText: 'OK',
          position: "center"
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/list_orderded")
          }
        })
    })

    socket.on("deliverShippingOrder", (data) => {
      console.log("orderStatus Socket Data", data);
      data &&
        Swal.fire({
          title: `Order #${data.orderId} is shipping by ${data.deliver.userName}`,
          showCancelButton: true,
          confirmButtonText: 'OK',
          position: "center"
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/list_orderded")
          }
        })
    })

    socket.on("deliverShippedOrder", (data) => {
      console.log("orderStatus Socket Data", data);
      data &&
        Swal.fire({
          title: `Your order has been shipped at ${data.shippedDate}, Thanks for using our service`,
          showCancelButton: true,
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/list_orderded")
          }
        })
    })
  }
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default MainLayout;
