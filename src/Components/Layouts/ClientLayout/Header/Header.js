// import { faUser } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import * as UserService from "../../../../services/UserService";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../../images/logo.png";
import style from "./header.module.css";
import { useSelector } from "react-redux";
import { selectUserData } from "../../../../redux/reducers/users";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";

const cx = classNames.bind(style);

const getDataFromLocalStorage = () => {
  return localStorage.getItem("access_token")
    ? localStorage.getItem("access_token")
    : {};
};

function Header() {
  const [cookies, setCookie, removeCookie] = useCookies(["user_data"]);
  const userData = useSelector(selectUserData);
  const navigate = useNavigate();

  return (
    <>
      <header className={cx("bg-white", "sticky-top")}>
        <div className="container-fluid px-5 d-flex justify-content-between align-items-center">
          <Link to="/" className={cx("logo")}>
            <img src={logo} className="card-img" alt="Uber Eats" />
          </Link>
          <div>
            {!userData.user.subject && (
              <span>
                <Link to="/login" className={cx("btn")}>
                  <AiOutlineUser className={cx("icon-header")} />
                </Link>
              </span>
            )}
            {userData.user.subject && (
              <span>
                <Link to={"/profile"} className={cx("btn")} >
                  <AiOutlineUser className={cx("icon-header")} />
                </Link>
              </span>
            )}

            {
              userData.user.subject && (<span>
                <Link to="/cart" className={cx("btn")}>
                  <AiOutlineShoppingCart className={cx("icon-header")} />
                </Link>
              </span>)
            }

          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
