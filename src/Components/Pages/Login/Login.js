import React, { useState } from "react";
import classNames from "classnames/bind";
import { useSelector, useDispatch } from "react-redux";
import {
  setUser,
  selectUserData,
} from "../../../redux/reducers/users";
import jwt from "jwt-decode";
import * as LoginService from "../../../services/UserService";
import style from "./login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Header from "../../Layouts/ClientLayout/Header/Header";
import Swal from "sweetalert2";

const cx = classNames.bind(style);

function Login() {
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["user_data", "access_token", "refresh_token"]);
  const [errs, setErrs] = useState([]);
  const navigate = useNavigate();

  const handleChange = async (e) => {
    const { name, value } = await e.target;
    setLoginData({ ...loginData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const [data, error] = await LoginService.login(loginData);
    if (error) {
      switch (error.response.status) {
        case 400:
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "All Fields Are Required",
            showConfirmButton: false,
            timer: 1500,
          });
          break;
        case 401:
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Invalid Account",
            showConfirmButton: false,
            timer: 1500,
          });
          break;

        default:
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Having Some Error When Requesting",
            showConfirmButton: false,
            timer: 1500,
          });
          break;
      }
      console.log(error);
    }
    if (data) {
      const token = data.accessToken;
      const user = jwt(token);

      localStorage.setItem("access_token", data.accessToken);
      setCookie("access_token", data.accessToken);
      setCookie("refresh_token", data.refreshToken);
      setCookie("user_data", user);

      dispatch(setUser(user));
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    }
  };
  return (
    <>
      <Header />
      <div className={cx("bg-image")}>
        <div className={cx("container")}>
          <div className={cx("row align-items-center")}>
            <div className={cx("col-lg-6")}>
              <form
                className={cx("form-login")}
                method="POST"
                onSubmit={handleSubmit}
              >
                <div className={cx("form-group")}>
                  <label htmlFor="">Email: </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className={cx(
                      "form-control rounded-pill",
                      "fz-14",
                      "border-black"
                    )}
                    placeholder="Enter your email..."
                    onChange={handleChange}
                  />
                  {/* <small id="helpId" className="text-muted">Help text</small> */}
                </div>
                <div className={cx("form-group")}>
                  <label htmlFor="">Password: </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className={cx(
                      "form-control rounded-pill",
                      "fz-14",
                      "border-black"
                    )}
                    placeholder="Enter your password..."
                    onChange={handleChange}
                  />
                  {/* <small id="helpId" className="text-muted">Help text</small> */}
                </div>
                <button
                  type="submit"
                  className={cx("btn btn-block mt-4 rounded-pill", "btn-login")}
                >
                  Login
                </button>
                <small>
                  Have no account? <Link to={"/register"}>Register here</Link>
                </small>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
