import React, { useState } from 'react'
import styles from './profile.module.css'
import classNames from 'classnames/bind'
import { TiTickOutline } from 'react-icons/ti'
import { MdOutlineRefresh } from 'react-icons/md'
import Swal from 'sweetalert2'
import * as Yup from "yup"
import { useSelector } from 'react-redux'
import * as UserService from "../../../../services/UserService";
import { selectUserData } from './../../../../redux/reducers/users';
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useFormik } from 'formik'
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

  const validationSchema = Yup.object().shape({
    userName: Yup.string().required("Please enter your user name"),
    address: Yup.string(),
    email: Yup.string().required('Please enter your email').email('Invalid type of email'),
    phone: Yup.string().required('Please enter your phone number').matches((/(84|0[3|5|7|8|9])+([0-9]{8})\b/g), 'Invalid phone number')
  })
  const formik = useFormik({
    initialValues: initProfileState,
    validationSchema,
    onSubmit: async (e) => {
      await handlePostData(e)
    },
  })

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    formik.values[name] = value
    setPostData({ ...postData, [name]: value });
  };

  const handlePostData = async (e) => {
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

  useEffect(() => {
    const getProfileData = async (userID) => {
      const [data, error] = await UserService.getUserProfile(userID);
      if (data) {
        console.log("API User Data: ", data);
        formik.setValues(data)
        setProfile(data);
      }
      if (error) {
        console.log(error);
      }
    };
    getProfileData(userData.user.subject);
  }, [userData.user.subject]);


  return (
    <div className={cx('container-fluid', 'py-3')}>
      <form method="POST"
        onSubmit={(e) => {
          formik.handleSubmit(e);
        }}>
        <div className={cx("row")}>
          <div className={cx('col-6')}>
            <div className={cx("form-group")}>
              <label htmlFor="">User name:</label>
              <input type="text" name="userName"
                defaultValue={profile.userName}
                onChange={(e) => { handleChangeValue(e) }} id="" className={cx("form-control", 'input-info')} placeholder="User name..." />
              {formik.errors.userName && <small id="helpId" className="text-danger">{formik.errors.userName}</small>}
              {/* <small id="helpId" className="text-muted">Help text</small> */}
            </div>
          </div>
          <div className={cx('col-6')}>
            <div className={cx("form-group")}>
              <label htmlFor="">Phone number:</label>
              <input type="text" name="phone"
                defaultValue={profile.phone}
                onChange={(e) => { handleChangeValue(e) }} id="" className={cx("form-control", 'input-info')} placeholder="Phone num..." />
              {formik.errors.phone && <small id="helpId" className="text-danger">{formik.errors.phone}</small>}
              {/* <small id="helpId" className="text-muted">Help text</small> */}
            </div>
          </div>
          <div className={cx('col-12')}>
            <div className={cx("form-group")}>
              <label htmlFor="">Email address:</label>
              <input type="text" name="email"
                defaultValue={profile.email}
                onChange={(e) => { handleChangeValue(e) }} id="" className={cx("form-control", 'input-info')} placeholder="Email..." />
              {formik.errors.email && <small id="helpId" className="text-danger">{formik.errors.email}</small>}
              {/* <small id="helpId" className="text-muted">Help text</small> */}
            </div>
          </div>
          <div className={cx('col-12')}>
            <div className={cx("form-group")}>
              <label htmlFor="">Address:</label>
              <textarea className={cx("form-control", 'input-info')} name="address"
                defaultValue={profile.address}
                onChange={(e) => { handleChangeValue(e) }} id="" rows="3" placeholder='district, city, country...'></textarea>
              {formik.errors.address && <small id="helpId" className="text-danger">{formik.errors.address}</small>}
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