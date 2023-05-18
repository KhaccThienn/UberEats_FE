import React from 'react'
import styles from './profile.module.css'
import classNames from 'classnames/bind'
import { TiTickOutline } from 'react-icons/ti'
import { MdOutlineRefresh } from 'react-icons/md'

let cx = classNames.bind(styles)

function Password() {
  return (
    <div className={cx('container-fluid', 'py-3')}>
      <form method='POST'>
        <div className={cx('row')}>
          <div className={cx('col-12')}>
            <div className={cx("form-group")}>
              <label htmlFor="">Current password:</label>
              <input type="password" name="" id="" className={cx("form-control", 'input-info')} placeholder="Current password..." />
              {/* <small id="helpId" className="text-muted">Help text</small> */}
            </div>
          </div>
          <div className={cx('col-12')}>
            <div className={cx("form-group")}>
              <label htmlFor="">New password:</label>
              <input type="password" name="" id="" className={cx("form-control", 'input-info')} placeholder="New password..." />
              {/* <small id="helpId" className="text-muted">Help text</small> */}
            </div>
          </div>
          <div className={cx('col-12')}>
            <div className={cx("form-group")}>
              <label htmlFor="">Confirm new password:</label>
              <input type="password" name="" id="" className={cx("form-control", 'input-info')} placeholder="Confirm..." />
              {/* <small id="helpId" className="text-muted">Help text</small> */}
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