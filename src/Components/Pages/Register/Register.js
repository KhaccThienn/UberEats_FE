import React, { useState } from "react";
import classNames from "classnames/bind";
import * as RegisterService from "../../../services/RegisterService";
import style from "./register.module.css";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../Layouts/Header/Header";

const cx = classNames.bind(style);

function Register() {
  const [registerData, setRegisterData] = useState([]);
  const [errs, setErrs] = useState([]);

  const navigate = useNavigate();
  const handleChange = async (e) => {
    const { name, value } = await e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(registerData);

    // RegisterService.register(registerData)
    //   .then((res) => {
    //     console.log(res);
    //     navigate('/login');
    //   })
    //   .catch((err) => {
    //     setErrs(err.response.data.message);
    //   });
    const [data, error] = await RegisterService.register(registerData);
    if (error) {
      console.log(error);
    }
    if (data) {
      navigate("/login");
    }
  };


  return (
    <>
      <Header />
      <div className={cx("bg-image")}>
        <div className={cx("container")}>
          <div className={cx("row", "align-items-center")}>
            <div className={cx("col-lg-6")}></div>
            <div className={cx("col-lg-6")}>
              <form
                className={cx("form-register")}
                method="POST"
                onSubmit={(e) => handleSubmit(e)}
              >
                <div className={cx("form-group")}>
                  <label htmlFor="">User name: </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className={cx(
                      "form-control rounded-pill",
                      "fz-14",
                      "border-black"
                    )}
                    placeholder="Enter user name..."
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
                    placeholder="Enter password..."
                    onChange={handleChange}
                  />
                  {/* <small id="helpId" className="text-muted">Help text</small> */}
                </div>
                <div className={cx("form-group")}>
                  <label htmlFor="">Confirm password: </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    className={cx(
                      "form-control rounded-pill",
                      "fz-14",
                      "border-black"
                    )}
                    placeholder="Confirm password..."
                    onChange={handleChange}
                  />
                  {/* <small id="helpId" className="text-muted">Help text</small> */}
                </div>
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
                    placeholder="Enter email..."
                    onChange={handleChange}
                  />
                  {/* <small id="helpId" className="text-muted">Help text</small> */}
                </div>
                <div className={cx("form-group")}>
                  <label htmlFor="">Phone number: </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    className={cx(
                      "form-control rounded-pill",
                      "fz-14",
                      "border-black"
                    )}
                    placeholder="Enter phone number..."
                    onChange={handleChange}
                  />
                  {/* <small id="helpId" className="text-muted">Help text</small> */}
                </div>
                <div className={cx("form-group")}>
                  <label htmlFor="">Role:</label>
                  <select
                    className={cx(
                      "form-control rounded-pill custom-select",
                      "fz-14",
                      "border-black"
                    )}
                    name="role"
                    onChange={handleChange}
                  >
                    <option value="1">Customers</option>
                    <option value="2">Restaurants</option>
                    <option value="3">Delivers</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className={cx(
                    "btn btn-block mt-4 rounded-pill",
                    "btn-register"
                  )}
                >
                  Register
                </button>
                <small>
                  Already have an account? <Link to={"/login"}>Login now</Link>
                </small>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
