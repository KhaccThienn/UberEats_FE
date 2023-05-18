import React from 'react'
import styles from './profile.module.css'
import classNames from 'classnames/bind'
import { TiTickOutline } from 'react-icons/ti'
import { MdOutlineRefresh } from 'react-icons/md'

let cx = classNames.bind(styles)

function Information() {
  return (
    <div className={cx('container-fluid', 'py-3')}>
      <form method='POST'>
        <div className={cx("row")}>
          <div className={cx('col-6')}>
            <div className={cx("form-group")}>
              <label htmlFor="">User name:</label>
              <input type="text" name="" id="" className={cx("form-control", 'input-info')} placeholder="User name..." />
              {/* <small id="helpId" className="text-muted">Help text</small> */}
            </div>
          </div>
          <div className={cx('col-6')}>
            <div className={cx("form-group")}>
              <label htmlFor="">Phone number:</label>
              <input type="text" name="" id="" className={cx("form-control", 'input-info')} placeholder="Phone num..." />
              {/* <small id="helpId" className="text-muted">Help text</small> */}
            </div>
          </div>
          <div className={cx('col-12')}>
            <div className={cx("form-group")}>
              <label htmlFor="">Email address:</label>
              <input type="text" name="" id="" className={cx("form-control", 'input-info')} placeholder="Email..." />
              {/* <small id="helpId" className="text-muted">Help text</small> */}
            </div>
          </div>
          <div className={cx('col-12')}>
            <div className={cx("form-group")}>
              <label htmlFor="">Address:</label>
              <textarea className={cx("form-control", 'input-info')} name="" id="" rows="3" placeholder='district, city, country...'></textarea>
            </div>
          </div>
          <div className={cx('col-12')}>
            <button type="submit" className={cx("btn btn-outline-success", 'rounded-pill', 'px-3')}><TiTickOutline /> Save</button>
            <button type='button' className={cx("btn btn-outline-secondary", 'rounded-pill', 'px-3','mx-3')}><MdOutlineRefresh /> Reset</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Information