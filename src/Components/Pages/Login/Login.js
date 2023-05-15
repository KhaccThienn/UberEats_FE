import React, { useState } from "react";
import classNames from "classnames/bind";
import { useSelector, useDispatch } from "react-redux";
import {
  setUser,
  clearUser,
  selectUserData,
} from "../../../redux/reducers/users";
import jwt from "jwt-decode";
import * as LoginService from "../../../services/UserService";
import style from "./login.module.css";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { useCookies } from "react-cookie";

const cx = classNames.bind(style);

function Login() {
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["user_data"]);
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
      console.log(error.response.data.message);
    }
    if (data) {
      // console.log("Response Data when login: ", data);
      const token = data.accessToken;
      const user = jwt(token);

      console.log("Decoded Token: ", user);

      localStorage.setItem("access_token", data.accessToken);
      // localStorage.setItem("users", JSON.stringify(user));
      // const expires = moment.unix(user.exp).format("YYYY-MM-DD HH:mm:ss");

      setCookie("user_data", user);

      dispatch(setUser(user));

      navigate("/");
    }
  };
  return (
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
              <div className={cx("form-check")}>
                <label className={cx("form-check-label")}>
                  <input
                    type="checkbox"
                    className={cx("form-check-input")}
                    name=""
                    id=""
                    value="checkedValue"
                  />
                  Remember me
                </label>
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
  );
}

export default Login;
