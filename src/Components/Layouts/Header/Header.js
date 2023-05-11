import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import logo from '../../../images/logo.png';
import classNames from "classnames/bind";
import style from "./header.module.css"

const cx = classNames.bind(style);

function Header() {
  return (
    <header className={cx('bg-white','sticky-top')}>
      <div className="container-fluid px-5 d-flex justify-content-between align-items-center">
        <Link to="/" className={cx('logo')}>
          <img src={logo} className="card-img" alt="Nuber Eats" />
        </Link>
        <span className="text-xs">
          <Link to="/login">
            <FontAwesomeIcon icon={faUser} className={cx('user')} />
          </Link>
        </span>
      </div>
    </header>
  );
}

export default Header;
