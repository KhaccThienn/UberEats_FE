/* eslint-disable jsx-a11y/iframe-has-title */
import React from 'react'
import classNames from 'classnames/bind'
import styles from './home.module.css'
import news1 from '../../../../images/news1.png'
import news2 from '../../../../images/news2.png'
import news3 from '../../../../images/news3.png'
import { Link } from 'react-router-dom'
import Restaurant from '../Restaurant/Restaurant'
import HomeFeature from '../HomeFeature/HomeFeature'


let cx = classNames.bind(styles);

function Home() {
    return (
        <>
            <div className={cx('bg-image', 'container-fluid px-5')}>
                <div className={cx('d-flex', 'flex-column', 'form-banner')}>
                    <div className={cx('fz-60', 'font-weight-bold', 'text-black')}>Order food to your door</div>
                    <div>
                        <form className={cx('form-inline')} method='GET'>
                            <div className={cx("form-group")}>
                                <label htmlFor=""></label>
                                <input type="text" name="keyword" id="keyword" className={cx("form-control", 'rounded-0', 'input-banner')} placeholder={'Enter food you wanna find...'} />
                            </div>
                            <button type="submit" className={cx("btn btn-dark", 'btn-banner')}>Find food</button>
                        </form>
                    </div>
                </div>
            </div>
            <HomeFeature />
            <Restaurant />
            <div className={cx('container-fluid', 'px-5')}>
                <p className={cx('h1', 'font-weight-bold', 'text-black')}>Cities near me</p>
                <hr />
                <div>
                    <iframe className={cx('border-0')} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6511991.84461928!2d-124.59543491876644!3d37.16022415957861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb9fe5f285e3d%3A0x8b5109a227086f55!2zQ2FsaWZvcm5pYSwgSG9hIEvhu7M!5e0!3m2!1svi!2s!4v1683791333511!5m2!1svi!2s" width='100%' height='450px' allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </>
    )
}

export default Home