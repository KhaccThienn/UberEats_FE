import React, { useEffect, useState } from "react";
import * as UserService from "./../../../../../services/UserService";
import { useSelector } from "react-redux";
import { selectUserData } from "../../../../../redux/reducers/users";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

function ChangePassword() {
  const initPasswordState = {
    old_password: "",
    new_password: "",
    confirm_password: ""
  }
  const userData = useSelector(selectUserData);
  const [password, setPassword] = useState(initPasswordState);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value });
  }

  const handleSubmitForm = async () => {
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
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Invalid Account',
        showConfirmButton: false,
        timer: 1500
      })
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
            <div>
              <p className="px-3">Change Password </p>
              <div className="form-group col-sm-12">
                <label htmlFor="uname">Old Password:</label>
                <input type="text" className="form-control" id="name" name="old_password" onChange={handleChangeInput} />
              </div>
              <div className="d-flex">
                <div className="form-group col-sm-6">
                  <label htmlFor="cname">New Password:</label>
                  <input type="text" className="form-control" id="address" name="new_password" onChange={handleChangeInput} />
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="cname">Confirm Password:</label>
                  <input type="text" className="form-control" id="email" name="confirm_password" onChange={handleChangeInput} />
                </div>
              </div>
            </div>
            <button type="button" onClick={() => handleSubmitForm()} className="btn btn-primary mr-2">

              Submit
            </button>
            <button type="reset" className="btn iq-bg-danger">
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
