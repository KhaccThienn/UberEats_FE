import React from "react";
import classNames from "classnames/bind";

import style from "./register.module.css";
import { Link } from "react-router-dom";

const cx = classNames.bind(style);

function Register() {
    return (
        <div className={cx('bg-image')}>
            <div className={cx('container')}>
                <div className={cx('row', 'align-items-center')}>
                    <div className={cx('col-lg-6')}>
                    </div>
                    <div className={cx('col-lg-6')}>
                        <form className={cx('form-register')}>
                            <div className={cx('form-group')}>
                                <label for="">User name: </label>
                                <input type="text" name="" id="" className={cx("form-control rounded-pill", 'fz-14', 'border-black')} placeholder="Enter user name..." aria-describedby="helpId" />
                                {/* <small id="helpId" className="text-muted">Help text</small> */}
                            </div>
                            <div className={cx('form-group')}>
                                <label for="">Password: </label>
                                <input type="password" name="" id="" className={cx("form-control rounded-pill", 'fz-14', 'border-black')} placeholder="Enter password..." aria-describedby="helpId" />
                                {/* <small id="helpId" className="text-muted">Help text</small> */}
                            </div>
                            <div className={cx('form-group')}>
                                <label for="">Confirm password: </label>
                                <input type="password" name="" id="" className={cx("form-control rounded-pill", 'fz-14', 'border-black')} placeholder="Confirm password..." aria-describedby="helpId" />
                                {/* <small id="helpId" className="text-muted">Help text</small> */}
                            </div>
                            <div className={cx('form-group')}>
                                <label for="">Email: </label>
                                <input type="email" name="" id="" className={cx("form-control rounded-pill", 'fz-14', 'border-black')} placeholder="Enter email..." aria-describedby="helpId" />
                                {/* <small id="helpId" className="text-muted">Help text</small> */}
                            </div>
                            <div className={cx('form-group')}>
                                <label for="">Phone number: </label>
                                <input type="text" name="" id="" className={cx("form-control rounded-pill", 'fz-14', 'border-black')} placeholder="Enter phone number..." aria-describedby="helpId" />
                                {/* <small id="helpId" className="text-muted">Help text</small> */}
                            </div>
                            <div className={cx("form-group")}>
                                <label for="">Role:</label>
                                <select className={cx("form-control rounded-pill custom-select", 'fz-14', 'border-black')} name="role_id" id="">
                                    <option value="">Customers</option>
                                    <option value="">Restaurants</option>
                                    <option value="">Delivers</option>
                                </select>
                            </div>
                            <button type="submit" className={cx("btn btn-block mt-4 rounded-pill", 'btn-register')}>Register</button>
                            <small>Already have an account? <Link to={'/login'} >Login now</Link></small>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register