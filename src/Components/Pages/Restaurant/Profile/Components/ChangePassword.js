import React, { useEffect, useState } from "react";
import * as UserService from "./../../../../../services/UserService";
import { useSelector } from "react-redux";
import * as Yup from "yup"
import { useFormik } from 'formik'
import { selectUserData } from "../../../../../redux/reducers/users";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { env } from 'react-dotenv';

function ChangePassword() {
  const initPasswordState = {
    old_password: "",
    new_password: "",
    confirm_password: ""
  }
  const userData = useSelector(selectUserData);
  const [password, setPassword] = useState(initPasswordState);
  const [errMsg, setErrMsg] = useState('');

  const handleChangeInput = (e) => {
    setErrMsg('')
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value });
  }

  const validationSchema = Yup.object().shape({
    old_password: Yup.string().required('Please enter your old password'),
    new_password: Yup.string().required('Please enter your new password').min(6, 'Password must be at least 6 characters'),
    confirm_password: Yup.string().required('Please enter your confirm password').oneOf([Yup.ref('new_password')], 'Confirm Password must be equal to your password')
  })

  const formik = useFormik({
    initialValues: initPasswordState,
    validationSchema,
    onSubmit: async (e) => {
      await handleSubmitForm(e)
    }
  })

  const handleSubmitForm = async (e) => {

    console.log(password);
    const [res, rej] = await UserService.changePassword(userData.user.subject, password);
    if (res) {
      console.log(res);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Update Password Successfully',
        showConfirmButton: false,
        timer: 1500
      })
    }
    if (rej) {
      console.log(rej);
      switch (rej.response.status) {
        case 401:
          setErrMsg(rej.response.data.error)
          break;
        default:
          break;
      }
    }
  }

  return (
    <div>
      <div className="tab-pane fade active show" id="chang-pwd" role="tabpanel">
        <div className="iq-card">
          <div className="iq-card-header d-flex justify-content-between">
            <div className="iq-header-title">
              <h4 className="card-title">Change Password</h4>
            </div>
          </div>
          <div className="iq-card-body">
            <form method="POST" onSubmit={(e) => {
              formik.handleSubmit(e)
            }}>
              <p className="px-3">Change Password </p>
              <div className="form-group col-sm-12">
                <label htmlFor="uname">Old Password:</label>
                <input type="text" className={(formik.errors.old_password || errMsg) ? "form-control is-invalid " : "form-control"} id="name" name="old_password" onChange={(e) => { handleChangeInput(e); formik.handleChange(e) }} />
                {
                  errMsg && <small id="helpId" className="text-danger">{errMsg}</small>
                }
                {formik.errors.old_password && <small id="helpId" className="text-danger">{formik.errors.old_password}</small>}
              </div>
              <div className="d-flex">
                <div className="form-group col-sm-6">
                  <label htmlFor="cname">New Password:</label>
                  <input type="text" className={formik.errors.new_password ? "form-control is-invalid " : "form-control"} id="address" name="new_password" onChange={(e) => { handleChangeInput(e); formik.handleChange(e) }} />
                  {formik.errors.new_password && <small id="helpId" className="text-danger">{formik.errors.new_password}</small>}
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="cname">Confirm Password:</label>
                  <input type="text" className={formik.errors.confirm_password ? "form-control is-invalid " : "form-control"} id="email" name="confirm_password" onChange={(e) => { handleChangeInput(e); formik.handleChange(e) }} />
                  {formik.errors.confirm_password && <small id="helpId" className="text-danger">{formik.errors.confirm_password}</small>}
                </div>
              </div>
              <button type="submit" className="btn btn-primary mr-2 rounded-0">
                Submit
              </button>
            </form>


          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
