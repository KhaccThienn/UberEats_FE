// import { faUser } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import * as UserService from "../../../services/UserService";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../images/logo.png";
import style from "./header.module.css";
import { useSelector } from "react-redux";
import { selectUserData } from "../../../redux/reducers/users";
import { AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai'
import Cart from "../../Pages/Client/Cart/Cart";

const cx = classNames.bind(style);

const getDataFromLocalStorage = () => {
  return localStorage.getItem("access_token")
    ? localStorage.getItem("access_token")
    : {};
};

function Header() {
  const [cookies, setCookie, removeCookie] = useCookies(["user_data"]);
  const navigate = useNavigate();

  const getUserDataFromCookie = () => {
    return cookies["user_data"] ? cookies["user_data"] : {};
  };

  const accessToken = getDataFromLocalStorage();

  const user = getUserDataFromCookie();
  const userData = useSelector(selectUserData);

  const expiredAt = new Date(user.exp * 1000) || new Date(userData.exp * 1000);

  const isExpired = true;

  console.log(new Date() > expiredAt);
  console.log(accessToken);

  const handleLogout = async () => {
    const [data, error] = await UserService.logout({});
    if (error) {
      console.log(error);
    }

    if (data) {
      console.log(data);
      navigate("/");
    }
  };

  return (
    <>
      <header className={cx("bg-white", "sticky-top")}>
        <div className="container-fluid px-5 d-flex justify-content-between align-items-center">
          <Link to="/" className={cx("logo")}>
            <img src={logo} className="card-img" alt="Nuber Eats" />
          </Link>
          <div>
            {isExpired && (
              <span>
                <Link to="/login" className={cx('btn')}>
                  <AiOutlineUser className={cx('icon-header')} />
                </Link>
              </span>
            )}
            {/* <span>
              <Link to="/login" className={cx('btn')}>
                <AiOutlineUser className={cx('icon-header')} />
              </Link>
            </span> */}
            {isExpired === false && (
              <span>
                <button className={cx('btn')} onClick={handleLogout}>
                  <AiOutlineUser className={cx('icon-header')} />
                </button>
              </span>
            )}
            <span>
              <Link to='/cart' className={cx('btn')}>
                <AiOutlineShoppingCart className={cx('icon-header')} />
                <sup className={cx('number-cart')}>
                  3
                </sup>
              </Link>
            </span>
          </div>
        </div>
      </header>
    </>

  );
}

export default Header;
