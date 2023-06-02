import React, { useState } from "react";
import classNames from "classnames/bind";
import { useSelector, useDispatch } from "react-redux";
import jwt from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import {
  setUser,
  selectUserData,
} from "../../../redux/reducers/users";
import * as LoginService from "../../../services/UserService";
import style from "./login.module.css";
import Header from "../../Layouts/ClientLayout/Header/Header";
import Swal from "sweetalert2";

const cx = classNames.bind(style);

function Login() {
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["user_data", "access_token", "refresh_token"]);
  const [accErr, setAccErr] = useState(false);
  const [passErr, setPassErr] = useState(false);
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  }
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Please enter your email').email('Invalid type of email'),
    password: Yup.string().required('Please enter your password').min(6, 'Password must be at least 6 characters')
  })

  const handleChange = async (e) => {
    const { name, value } = await e.target;
    setLoginData({ ...loginData, [name]: value });
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit : async (e) => {
      const [data, error] = await LoginService.login(loginData);
      if (error) {
        switch (error.response.status) {
          case 401:
            if (error.response.data.error === 'Account does not exist') {
              setAccErr(true)
            }else{
              setAccErr(false)
            }
            if (error.response.data.error === 'Password does not match') {
              setPassErr(true)
            }else{
              setPassErr(false)
            }
            break;
  
          default:
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "Having some unknown error when requesting",
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
    }
  })
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
                onSubmit={(e)=>formik.handleSubmit(e)}
              >
                <div className={cx("form-group")}>
                  <label htmlFor="">Email: </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className={cx(
                      "form-control rounded-pill",
                      "fz-14",
                      (accErr === true || formik.errors.email) && 'is-invalid',
                      accErr === true || formik.errors.email ? 'border-error' : 'border-black'
                    )}
                    placeholder="Enter your email..."
                    onChange={(e) => {handleChange(e); setAccErr(false); setPassErr(false); formik.handleChange(e)}}
                    value={formik.values.email}
                  />
                  { formik.errors.email && <small id="helpId" className="text-danger">{formik.errors.email}</small> }
                  { accErr === true && <small id="helpId" className="text-danger">Account does not exists</small> }
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
                      (passErr === true|| formik.errors.password) && 'is-invalid',
                      passErr === true || formik.errors.password ? 'border-error' : 'border-black'
                    )}
                    placeholder="Enter your password..."
                    onChange={(e) => {handleChange(e); setAccErr(false); setPassErr(false); formik.handleChange(e)}}
                    value={formik.values.password}
                  />
                  { formik.errors.password && <small id="helpId" className="text-danger">{formik.errors.password}</small> }
                  {passErr === true && <small id="helpId" className="text-danger">Password does not match</small>}
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
