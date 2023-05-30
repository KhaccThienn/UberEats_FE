import React from "react";
import '../../../global/restaurant/css/typography.css'
import Footer from './Footer/Footer';
import Header from './Header/Header';
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import Swal from "sweetalert2";

const socket = io("http://localhost:8000");

function MainLayout({ children }) {
  const navigate = useNavigate();
  socket.on("updateOrderStatus", (data) => {
    console.log("orderStatus Socket Data", data);
    data &&
      Swal.fire({
        title: 'Your Order has been updated, do you want to view it ?',
        showCancelButton: true,
        confirmButtonText: 'Accept',
        position: "top-left"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/list_orderded")
        }
      })
  })

  socket.on("updateOrderStatusClient", (data) => {
    console.log("orderStatus Socket Data", data);
    data &&
      Swal.fire({
        title: 'Your Order has been updated, do you want to view it ?',
        showCancelButton: true,
        confirmButtonText: 'Accept',
        position: "top-left"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/list_orderded")
        }
      })
  })
  socket.on("updateOrderStatusDeliver", (data) => {
    console.log("orderStatus Socket Data", data);
    data &&
      Swal.fire({
        title: 'Your Order has been updated, do you want to view it ?',
        showCancelButton: true,
        confirmButtonText: 'Accept',
        position: "center"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/list_orderded")
        }
      })
  })
  socket.on("updateDeliver", (data) => {
    console.log("orderStatus Socket Data", data);
    data &&
      Swal.fire({
        title: `Your Order #${data.orderId} has been accepted by ${data.deliver.userName}, do you want to view it ?`,
        showCancelButton: true,
        confirmButtonText: 'Accept',
        position: "center"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/list_orderded")
        }
      })
  })

  socket.on("deliverUpdateOrderStatus", (data) => {
    console.log("orderStatus Socket Data", data);
    data &&
      Swal.fire({
        title: `Your Order #${data.orderId} has been picked up by ${data.deliver.userName}, do you want to view it ?`,
        showCancelButton: true,
        confirmButtonText: 'Accept',
        position: "center"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/list_orderded")
        }
      })
  })

  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default MainLayout;
