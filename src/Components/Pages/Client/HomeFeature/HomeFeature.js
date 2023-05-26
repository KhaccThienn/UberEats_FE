import React from 'react'
import classNames from 'classnames/bind'
import styles from './../Home/home.module.css'
import news1 from '../../../../images/news1.png'
import news2 from '../../../../images/news2.png'
import news3 from '../../../../images/news3.png'
import { Link } from 'react-router-dom'


let cx = classNames.bind(styles);

function HomeFeature() {
    return (
        <div className={cx('container-fluid', 'my-5', 'px-5')}>
            <div className={cx('row')} >
                <div className={cx('col-lg-4')}>
                    <div className={cx("card", 'border-0', 'rounded-0')} title='Feed your employees'>
                        <img className={cx("card-img-top", 'rounded-0')} src={news1} alt="" />
                        <div className={cx("card-body")}>
                            <h3 className={cx("card-title", 'font-weight-bold')}>Feed your employees</h3>
                            <Link to="/register" className={cx("card-text", 'link-card')}>Create a buisiness account</Link>
                        </div>
                    </div>
                </div>
                <div className={cx('col-lg-4')}>
                    <div className={cx("card", 'border-0', 'rounded-0')} title='Your restaurant, delivered'>
                        <img className={cx("card-img-top", 'rounded-0')} src={news2} alt="" />
                        <div className={cx("card-body")}>
                            <h3 className={cx("card-title", 'font-weight-bold')}>Your restaurant, delivered</h3>
                            <Link to='/register' className={cx("card-text", 'link-card')}>Add your restaurant</Link>
                        </div>
                    </div>
                </div>
                <div className={cx('col-lg-4')}>
                    <div className={cx("card", 'border-0', 'rounded-0')} title='Deliver with Uber Eat'>
                        <img className={cx("card-img-top", 'rounded-0')} src={news3} alt="" />
                        <div className={cx("card-body")}>
                            <h3 className={cx("card-title", 'font-weight-bold')}>Deliver with Uber Eat</h3>
                            <Link to='/register' className={cx("card-text", 'link-card')}>Sign up to deliver</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeFeature