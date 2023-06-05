import React, { useState } from "react";
import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from 'yup';
import { useFormik } from "formik";
import "sweetalert2/dist/sweetalert2.css";
import style from "./register.module.css";
import * as RegisterService from "../../../services/UserService";
import Header from "../../Layouts/ClientLayout/Header/Header";

const cx = classNames.bind(style);


function Register() {
  const [registerData, setRegisterData] = useState([]);
  const [conflictErr, setConflictErr] = useState({});
  const initialValues = {
    userName: "",
    password: "",
    confirmPassword: "",
    email: "",
    phone: "",
  }
  const validationSchema = Yup.object().shape({
    userName: Yup.string().required('Please enter your username'),
    password: Yup.string().required('Please enter your password').min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string().required('Please enter confirm password').oneOf([Yup.ref('password')], 'Confirm Password must be equal to your password'),
    email: Yup.string().required('Please enter your email').email('Invalid type of email'),
    phone: Yup.string().required('Please enter your phone number').matches((/(84|0[3|5|7|8|9])+([0-9]{8})\b/g), 'Invalid phone number')
  })

  const navigate = useNavigate();
  const handleChange = async (e) => {
    const { name, value } = await e.target;
    setRegisterData({ ...registerData, [name]: value });
    setConflictErr({})
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (e) => {
      console.log(registerData);
      const [data, error] = await RegisterService.register(registerData);
      if (data) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Register Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/login");
      }
      if (error.response.status === 409) {
        switch (error.response.data.error) {
          case 'Both email and phone are already exist':
            setConflictErr({ mailErr: 'This email address is already exists', phoneErr: 'This phone number is already exists' })
            break;
          case 'This email address is already exists':
            setConflictErr({ mailErr: 'This email address is already exists' })
            break;
          case 'This phone number is already exists':
            setConflictErr({ phoneErr: 'This phone number is already exists' })
            break;
          default:
            break;
        }
      }

    },
  })
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
                onSubmit={(e) => formik.handleSubmit(e)}
              >
                <div className={cx("form-group")}>
                  <label htmlFor="">User name: </label>
                  <input
                    type="text"
                    name="userName"
                    id="username"
                    className={cx(
                      "form-control rounded-pill",
                      "fz-14",
                      formik.errors.userName && 'is-invalid',
                      formik.errors.userName ? 'border-error' : "border-black"
                    )}
                    placeholder="Enter user name..."
                    onChange={(e) => { formik.handleChange(e); handleChange(e) }}
                    value={formik.values.userName}
                  />
                  {
                    formik.errors.userName &&
                    <small id="helpId" className="text-danger">{formik.errors.userName}</small>
                  }
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
                      formik.errors.password && 'is-invalid',
                      formik.errors.password ? 'border-error' : "border-black"
                    )}
                    placeholder="Enter password..."
                    onChange={(e) => { formik.handleChange(e); handleChange(e) }}
                    value={formik.values.password}
                  />
                  {
                    formik.errors.password &&
                    <small id="helpId" className="text-danger">{formik.errors.password}</small>
                  }
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
                      formik.errors.confirmPassword && 'is-invalid',
                      formik.errors.confirmPassword ? 'border-error' : "border-black"
                    )}
                    placeholder="Confirm password..."
                    onChange={(e) => { formik.handleChange(e); handleChange(e) }}
                    value={formik.values.confirmPassword}
                  />
                  {
                    formik.errors.confirmPassword &&
                    <small id="helpId" className="text-danger">{formik.errors.confirmPassword}</small>
                  }
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
                      formik.errors.email && 'is-invalid',
                      formik.errors.email ? 'border-error' : "border-black"
                    )}
                    placeholder="Enter email..."
                    onChange={(e) => { formik.handleChange(e); handleChange(e) }}
                    value={formik.values.email}
                  />
                  {
                    formik.errors.email &&
                    <small id="helpId" className="text-danger">{formik.errors.email}</small>
                  }
                  {
                    conflictErr.mailErr &&
                    <small id="helpId" className="text-danger">{conflictErr.mailErr}</small>
                  }
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
                      formik.errors.phone && 'is-invalid',
                      formik.errors.phone ? 'border-error' : "border-black"
                    )}
                    placeholder="Enter phone number..."
                    onChange={(e) => { formik.handleChange(e); handleChange(e) }}
                    value={formik.values.phone}
                  />
                  {
                    formik.errors.phone &&
                    <small id="helpId" className="text-danger">{formik.errors.phone}</small>
                  }
                  {
                    conflictErr.phoneErr &&
                    <small id="helpId" className="text-danger">{conflictErr.phoneErr}</small>
                  }
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
                    onChange={(e) => handleChange(e)}
                  >
                    <option value={1} >Customers</option>
                    <option value={2} >Restaurants</option>
                    <option value={3} >Delivers</option>
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
