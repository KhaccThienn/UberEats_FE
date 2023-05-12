/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import classNames from 'classnames/bind'
import styles from './error.module.css'
import logo from '../../../images/logo.png'
import { Link } from 'react-router-dom'

let cx = classNames.bind(styles)

function Error() {
    return (
        <div className={cx('bg-err')}>
            <div className={cx('container-fluid','px-5')}>
                <div className={cx('row','align-items-center','justify-content-center','full-height')}>
                    <div className={cx('col-lg-6','pr-5')}>
                        <img src={logo} className={cx('logo-err','float-right')}  />
                    </div>
                    <div className={cx('col-lg-4','border','py-3')}>
                        <h1 className={cx('font-weight-bold')}>Sorry... </h1>
                        <p>Something is wrong here. That was definitely not Uber Eats of us!</p>
                        <p>This page was not found.&nbsp;<Link to='/' className={cx('back-to-home')} >Back to home</Link></p>
                    </div>
                    <div className={cx('col-lg-2')}></div>
                </div>
            </div>
        </div>
    )
}

export default Error