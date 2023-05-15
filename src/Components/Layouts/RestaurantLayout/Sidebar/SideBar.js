import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { IoFastFoodOutline } from "react-icons/io5";
import {
  RiCoupon3Line,
  RiListOrdered,
  RiUser2Fill,
  RiUser6Fill,
} from "react-icons/ri";
import * as UserService from "../../../../services/UserService";

import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const getDataFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("access_token"))
    ? JSON.parse(localStorage.getItem("access_token"))
    : "";
};

function SideBar() {
  const [cookies, setCookie, removeCookie] = useCookies(["user_data"]);
  const navigate = useNavigate();
  const handleLogout = async () => {
    const [data, error] = await UserService.logout();
    if (error) {
      console.log(error);
    }
    if (data) {
      removeCookie("user_data");
      navigate("/");
    }
  };

  return (
    <div>
      <div className="iq-sidebar">
        <div className="iq-sidebar-logo d-flex justify-content-between">
          <Link to="" className="header-logo">
            <img
              src="images/logo.png"
              className="img-fluid rounded-normal"
              alt=""
            />
            <div className="logo-title">
              <span className="text-primary text-uppercase">
                Uber Eats - Restaurant
              </span>
            </div>
          </Link>
        </div>
        <div id="sidebar-scrollbar">
          <nav className="iq-sidebar-menu">
            <ul id="iq-sidebar-toggle" className="iq-menu">
              <li>
                <Link to={"/"}>
                  <AiOutlineHome />
                  &nbsp; Dashboard
                </Link>
              </li>

              <li>
                <Link to={"/product"}>
                  <IoFastFoodOutline />
                  &nbsp; Product Management
                </Link>
              </li>

              <li>
                <Link to={"/voucher"}>
                  <RiCoupon3Line />
                  &nbsp; Voucher Management
                </Link>
              </li>

              <li>
                <Link to={"/order"}>
                  <RiListOrdered />
                  &nbsp; Order Management
                </Link>
              </li>

              <li>
                <Link to={"/profile"}>
                  <RiUser2Fill />
                  &nbsp; User Profile
                </Link>
              </li>

              <li>
                <Link to={"/restaurant/profile"}>
                  <RiUser6Fill />
                  &nbsp; Restaurant Profile
                </Link>
              </li>

              <li onClick={handleLogout}>
                <Link>
                  <BiLogOut />
                  &nbsp; Log Out
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
