import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { IoFastFoodOutline } from "react-icons/io5";
import { RiCoupon3Line, RiListOrdered } from "react-icons/ri";
import { Link } from "react-router-dom";
function SideBar() {
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
              <span className="text-primary text-uppercase">Uber Eats - Restaurant</span>
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
                <Link to={"/logout"}>
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
