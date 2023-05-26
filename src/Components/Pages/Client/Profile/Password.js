import React, { useState } from 'react'
import styles from './profile.module.css'
import classNames from 'classnames/bind'
import { TiTickOutline } from 'react-icons/ti'
import { MdOutlineRefresh } from 'react-icons/md'
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux'
import * as UserService from "../../../../services/UserService";
import { selectUserData } from './../../../../redux/reducers/users';

let cx = classNames.bind(styles)

function Password() {
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
    <div className={cx('container-fluid', 'py-3')}>
      <div >
        <div className={cx('row')}>
          <div className={cx('col-12')}>
            <div className={cx("form-group")}>
              <label htmlFor="">Current password:</label>
              <input type="password" name="old_password" onChange={handleChangeInput} id="" className={cx("form-control", 'input-info')} placeholder="Current password..." />
            </div>
          </div>
          <div className={cx('col-12')}>
            <div className={cx("form-group")}>
              <label htmlFor="">New password:</label>
              <input type="password" name="new_password" onChange={handleChangeInput} id="" className={cx("form-control", 'input-info')} placeholder="New password..." />
            </div>
          </div>
          <div className={cx('col-12')}>
            <div className={cx("form-group")}>
              <label htmlFor="">Confirm new password:</label>
              <input type="password" name="confirm_password" onChange={handleChangeInput} id="" className={cx("form-control", 'input-info')} placeholder="Confirm..." />
            </div>
          </div>
          <div className={cx('col-12')}>
            <button onClick={() => handleSubmitForm()} type="submit" className={cx("btn btn-outline-success", 'rounded-pill', 'px-3')}><TiTickOutline /> Save</button>
            <button type='button' className={cx("btn btn-outline-secondary", 'rounded-pill', 'px-3', 'mx-3')}><MdOutlineRefresh /> Reset</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Password