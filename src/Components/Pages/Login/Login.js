import React from "react";
import classNames from "classnames/bind";

import style from "./login.module.css";
import { Link } from "react-router-dom";

const cx = classNames.bind(style);

function Login() {
  return (
    <div className={cx('bg-image')}>
      <div className={cx("container")}>
        <div className={cx("row align-items-center")}>
          <div className={cx("col-lg-6")}>
            <form className={cx('form-login')}>
              <div className={cx("form-group")}>
                <label for="">Email: </label>
                <input type="text" name="" id="" className={cx("form-control rounded-pill", 'fz-14', 'border-black')} placeholder="Enter your email..." aria-describedby="helpId" />
                {/* <small id="helpId" className="text-muted">Help text</small> */}
              </div>
              <div className={cx("form-group")}>
                <label for="">Password: </label>
                <input type="password" name="" id="" className={cx("form-control rounded-pill", 'fz-14', 'border-black')} placeholder="Enter your password..." aria-describedby="helpId" />
                {/* <small id="helpId" className="text-muted">Help text</small> */}
              </div>
              <div className={cx("form-check")}>
                <label className={cx("form-check-label")}>
                  <input type="checkbox" className={cx('form-check-input')} name="" id="" value="checkedValue" />
                  Remember me
                </label>
              </div>
              <button type="submit" className={cx("btn btn-block mt-4 rounded-pill", 'btn-login')}>Login</button>
              <small>Have  no account? <Link to={'/register'} >Register here</Link></small>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
