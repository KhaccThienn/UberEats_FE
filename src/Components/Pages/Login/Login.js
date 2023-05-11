import React, { useState } from "react";
import classNames from "classnames/bind";
import * as LoginService from "../../../services/LoginService";

import style from "./login.module.css";
import { Link } from "react-router-dom";

const cx = classNames.bind(style);

function Login() {
  const [loginData, setLoginData] = useState([]);
  const [errs, setErrs] = useState([]);

  const handleChange = async (e) => {
    const { name, value } = await e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(loginData);

    LoginService.register(loginData)
      .then((res) => {
        console.log(res);
        localStorage.setItem('access_token', res.accessToken);
      })
      .catch((err) => {
        setErrs(err.response.data.message);
      });
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
