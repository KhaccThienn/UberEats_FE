import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import React from "react";
import { useCookies } from "react-cookie";
import * as UserService from "../../../services/UserService";
import { Link } from "react-router-dom";
import logo from "../../../images/logo.png";
import style from "./header.module.css";

const cx = classNames.bind(style);

function Header() {
  const [cookies, setCookie, removeCookie] = useCookies(["user_data"]);

  const getUserDataFromCookie = () => {
    return cookies["user_data"];
  };

  const user = getUserDataFromCookie();
  const expiredAt = new Date(user.exp * 1000);

  const isExpired = new Date() > expiredAt;

  console.log(isExpired);
  const handleLogout = () => {};

  return (
    <header className={cx("bg-white", "sticky-top")}>
      <div className="container-fluid px-5 d-flex justify-content-between align-items-center">
        <Link to="/" className={cx("logo")}>
          <img src={logo} className="card-img" alt="Nuber Eats" />
        </Link>
        {/* {!user && (
          <span className="text-xs">
            <Link to="/login" >
              <FontAwesomeIcon icon={faUser} className={cx("user")}  />
            </Link>
          </span>
        )} */}
        <span className="text-xs">
          <Link to="/login">
            <FontAwesomeIcon icon={faUser} className={cx("user")} />
          </Link>
        </span>
        {/* {user && (
          <span className="text-xs">
            <button className="border-0 bg-white" >
              <FontAwesomeIcon icon={faUser} className={cx("user")} />
            </button>
          </span>
        )} */}
      </div>
    </header>
  );
}

export default Header;
