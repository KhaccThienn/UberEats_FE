import classNames from 'classnames/bind'
import React, { useState } from 'react'
import { MdOutlineRefresh } from 'react-icons/md'
import { TiTickOutline } from 'react-icons/ti'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import * as Yup from "yup"
import * as UserService from "../../../../services/UserService"
import { selectUserData } from './../../../../redux/reducers/users'
import styles from './profile.module.css'
import { useFormik } from 'formik'

let cx = classNames.bind(styles)

function Password() {
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
      await handleSubmitForm()
    }
  })

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
      switch (rej.response.status) {
        case 401:
          setErrMsg(rej.response.data.error)
          break;
        default:
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Having Some Error When Updating Account Information',
            showConfirmButton: false,
            timer: 1500
          })

          break;
      }
    }
  }
  return (
    <div className={cx('container-fluid', 'py-3')}>
      <form method='POST' onSubmit={(e) => formik.handleSubmit(e)}>
        <div className={cx('row')}>
          <div className={cx('col-12')}>
            <div className={cx("form-group")}>
              <label htmlFor="">Current password:</label>
              <input type="password" name="old_password" onChange={(e) => { handleChangeInput(e); formik.handleChange(e) }} id="" className={(errMsg || formik.errors.old_password) ? cx("form-control", "is-invalid") : cx("form-control")} placeholder="Current password..." />
              {
                errMsg && <small id="helpId" className="text-danger">{errMsg}</small>
              }
              {formik.errors.old_password && <small id="helpId" className="text-danger">{formik.errors.old_password}</small>}
            </div>
          </div>
          <div className={cx('col-12')}>
            <div className={cx("form-group")}>
              <label htmlFor="">New password:</label>
              <input type="password" name="new_password" onChange={(e) => { handleChangeInput(e); formik.handleChange(e) }} id="" className={formik.errors.new_password ? cx("form-control", "is-invalid") : cx("form-control")} placeholder="New password..." />
              {formik.errors.new_password && <small id="helpId" className="text-danger">{formik.errors.new_password}</small>}
            </div>
          </div>
          <div className={cx('col-12')}>
            <div className={cx("form-group")}>
              <label htmlFor="">Confirm new password:</label>
              <input type="password" name="confirm_password" onChange={(e) => { handleChangeInput(e); formik.handleChange(e) }} id="" className={formik.errors.confirm_password ? cx("form-control", "is-invalid") : cx("form-control")} placeholder="Confirm..." />
              {formik.errors.confirm_password && <small id="helpId" className="text-danger">{formik.errors.confirm_password}</small>}
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

export default Password