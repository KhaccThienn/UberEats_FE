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
import { useEffect } from "react";
import * as CartService from '../../../../services/CartService'
import { selectCartsData } from "../../../../redux/reducers/cart";

const cx = classNames.bind(style);

function Header() {
  const [products, setProducts] = useState([]);
  const userData = useSelector(selectUserData);
  const cartData = useSelector(selectCartsData);
  console.log(cartData.carts.length);
  useEffect(() => {
    const getCartFromAPI = async () => {
      const [data, error] = await CartService.getAllCartByUser(userData.user.subject);
      if (data) {
        console.log(data);
        setProducts(data.carts);
      }
      if (error) {
        console.log(error);
      }
    }
    getCartFromAPI();
  }, [userData.user.subject]);
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
