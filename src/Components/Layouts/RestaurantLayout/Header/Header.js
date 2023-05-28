import React from "react";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { selectUserData } from "../../../../redux/reducers/users";

function Header() {

  return (
    <div>
      <div className="iq-top-navbar">
        <div className="iq-navbar-custom">
          <nav className="navbar navbar-expand-lg navbar-light p-0">
            <div className="iq-menu-bt d-flex align-items-center">
              <div className="wrapper-menu">
                <div className="main-circle">
                  <i className="las la-bars"></i>
                </div>
              </div>
              <div className="iq-navbar-logo d-flex justify-content-between">
                <Link to="" className="header-logo">
                  <img
                    src="images/logo.png"
                    className="img-fluid rounded-normal"
                    alt=""
                  />
                </Link>
              </div>
            </div>
            <div className="navbar-breadcrumb"></div>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-label="Toggle navigation"
            >
              <i className="ri-menu-3-line"></i>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ml-auto navbar-list">
                <li className="nav-item nav-icon search-content">
                  <Link
                    to=""
                    className="search-toggle iq-waves-effect text-gray rounded"
                  >
                    <i className="ri-search-line"></i>
                  </Link>

                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Header;
