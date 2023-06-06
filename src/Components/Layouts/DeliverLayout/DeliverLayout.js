import React from "react";
import Footer from "../ClientLayout/Footer/Footer";
import '../../../global/restaurant/css/typography.css'
import DeliverHeader from "./DeliverHeader/DeliverHeader";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { selectUserData } from "../../../redux/reducers/users";

const socket = io(process.env.REACT_APP_URL_API);

function DeliverLayout({ children }) {
  const navigate = useNavigate();

  const userData = useSelector(selectUserData)

  if (userData.user?.subject) {
    socket.on("updateOrderStatusDeliver", (data) => {
      console.log("orderStatus Socket Data", data);
      data &&
        Swal.fire({
          title: 'There is a new order for you to accept, would you like to view it?',
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


  return (
    <div>
      <DeliverHeader />
      {children}
      <Footer />
    </div>
  );
}

export default DeliverLayout;
