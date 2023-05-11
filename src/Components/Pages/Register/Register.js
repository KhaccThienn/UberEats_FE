import React, { useState } from "react";
import classNames from "classnames/bind";

import style from "./register.module.css";
import { Link } from "react-router-dom";

const cx = classNames.bind(style);

function Register() {
    const [registerData,setRegisterData] = useState([]);
    const handleChange = async (e) => {
        const {name,value} = await e.target;
        setRegisterData({...registerData,[name]:value})
    }
    const handleSubmit =  (e) => {
        e.preventDefault();  
        console.log(registerData);
    }
    return (
        <div className={cx('bg-image')}>
            <div className={cx('container')}>
                <div className={cx('row', 'align-items-center')}>
                    <div className={cx('col-lg-6')}>
                    </div>
                    <div className={cx('col-lg-6')}>
                        <form className={cx('form-register')} method="POST" onSubmit={(e)=>handleSubmit(e)}>
                            <div className={cx('form-group')}>
                                <label htmlFor="">User name: </label>
                                <input type="text" name="userName" id="userName" className={cx("form-control rounded-pill", 'fz-14', 'border-black')} placeholder="Enter user name..."  onChange={handleChange}/>
                                {/* <small id="helpId" className="text-muted">Help text</small> */}
                            </div>
                            <div className={cx('form-group')}>
                                <label htmlFor="">Password: </label>
                                <input type="password" name="password" id="password" className={cx("form-control rounded-pill", 'fz-14', 'border-black')} placeholder="Enter password..."  onChange={handleChange}/>
                                {/* <small id="helpId" className="text-muted">Help text</small> */}
                            </div>
                            <div className={cx('form-group')}>
                                <label htmlFor="">Confirm password: </label>
                                <input type="password" name="confirmPassword" id="confirmPassword" className={cx("form-control rounded-pill", 'fz-14', 'border-black')} placeholder="Confirm password..."  onChange={handleChange}/>
                                {/* <small id="helpId" className="text-muted">Help text</small> */}
                            </div>
                            <div className={cx('form-group')}>
                                <label htmlFor="">Email: </label>
                                <input type="email" name="email" id="email" className={cx("form-control rounded-pill", 'fz-14', 'border-black')} placeholder="Enter email..."  onChange={handleChange}/>
                                {/* <small id="helpId" className="text-muted">Help text</small> */}
                            </div>
                            <div className={cx('form-group')}>
                                <label htmlFor="">Phone number: </label>
                                <input type="text" name="phone" id="phone" className={cx("form-control rounded-pill", 'fz-14', 'border-black')} placeholder="Enter phone number..."  onChange={handleChange}/>
                                {/* <small id="helpId" className="text-muted">Help text</small> */}
                            </div>
                            <div className={cx("form-group")}>
                                <label htmlFor="">Role:</label>
                                <select className={cx("form-control rounded-pill custom-select", 'fz-14', 'border-black')} name="role_id" onChange={handleChange}>
                                    <option value="1">Customers</option>
                                    <option value="2">Restaurants</option>
                                    <option value="3">Delivers</option>
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