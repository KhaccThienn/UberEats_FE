import React, { useState } from 'react'
import styles from './profile.module.css'
import classNames from 'classnames/bind'
import { TiTickOutline } from 'react-icons/ti'
import { MdOutlineRefresh } from 'react-icons/md'
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux'
import * as UserService from "../../../../services/UserService";
import { selectUserData } from './../../../../redux/reducers/users';
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
let cx = classNames.bind(styles)

function Information() {
  const initProfileState = {
    userName: "",
    phone: "",
    email: "",
    address: "",
  };
  const initPostData = {
    userName: "",
    phone: "",
    email: "",
    address: "",
  };

  const userData = useSelector(selectUserData);
  const [profile, setProfile] = useState(initProfileState);
  const [postData, setPostData] = useState(initPostData);
  const navigate = useNavigate();

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  useEffect(() => {
    const getProfileData = async (userID) => {
      const [data, error] = await UserService.getUserProfile(userID);
      if (data) {
        console.log("API User Data: ", data);
        setProfile(data);
      }
      if (error) {
        console.log(error);
      }
    };
    getProfileData(userData.user.subject);
  }, [userData.user.subject]);

  const handlePostData = async (e) => {
    e.preventDefault();
    const formDataa = new FormData();
    formDataa.append(
      "userName",
      postData.userName ? postData.userName : profile.userName
    );
    formDataa.append("phone", postData.phone ? postData.phone : profile.phone);
    formDataa.append("email", postData.email ? postData.email : profile.email);
    formDataa.append(
      "address",
      postData.address ? postData.address : profile.address
    );
    const [res, rej] = await UserService.updateUserData(
      userData.user.subject,
      formDataa
    );
    if (res) {
      console.log(res);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Update Profile Successfully',
        showConfirmButton: false,
        timer: 1500
      })
      navigate("/");
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
  };
  return (
    <div className={cx('container-fluid', 'py-3')}>
      <form method="POST"
        onSubmit={(e) => {
          handlePostData(e);
        }}>
        <div className={cx("row")}>
          <div className={cx('col-6')}>
            <div className={cx("form-group")}>
              <label htmlFor="">User name:</label>
              <input type="text" name="userName"
                defaultValue={profile.userName}
                onChange={handleChangeValue} id="" className={cx("form-control", 'input-info')} placeholder="User name..." />
              {/* <small id="helpId" className="text-muted">Help text</small> */}
            </div>
          </div>
          <div className={cx('col-6')}>
            <div className={cx("form-group")}>
              <label htmlFor="">Phone number:</label>
              <input type="text" name="phone"
                defaultValue={profile.phone}
                onChange={handleChangeValue} id="" className={cx("form-control", 'input-info')} placeholder="Phone num..." />
              {/* <small id="helpId" className="text-muted">Help text</small> */}
            </div>
          </div>
          <div className={cx('col-12')}>
            <div className={cx("form-group")}>
              <label htmlFor="">Email address:</label>
              <input type="text" name="email"
                defaultValue={profile.email}
                onChange={handleChangeValue} id="" className={cx("form-control", 'input-info')} placeholder="Email..." />
              {/* <small id="helpId" className="text-muted">Help text</small> */}
            </div>
          </div>
          <div className={cx('col-12')}>
            <div className={cx("form-group")}>
              <label htmlFor="">Address:</label>
              <textarea className={cx("form-control", 'input-info')} name="address"
                defaultValue={profile.address}
                onChange={handleChangeValue} id="" rows="3" placeholder='district, city, country...'></textarea>
            </div>
          </div>
          <div className={cx('col-12')}>
            <button type="submit" className={cx("btn btn-outline-success", 'rounded-pill', 'px-3')}><TiTickOutline /> Save</button>
            <button type='button' className={cx("btn btn-outline-secondary", 'rounded-pill', 'px-3', 'mx-3')}><MdOutlineRefresh /> Reset</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Information