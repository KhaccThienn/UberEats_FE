/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import classNames from 'classnames/bind'
import styles from './footer.module.css'
import logo from '../../../../images/logo.png'
import appstore from '../../../../images/appstore.png'
import ggplay from '../../../../images/ggplay.png'
import { Link } from 'react-router-dom'
import { HiLanguage } from 'react-icons/hi2'
import { FiFacebook, FiGithub, FiInstagram } from 'react-icons/fi'
import { AiOutlineCopyrightCircle } from 'react-icons/ai'

let cx = classNames.bind(styles)

function Footer() {
    return (
        <footer className={cx('py-5')}>
            <hr />
            <div className={cx('container-fluid', 'px-5')}>
                <div className={cx('row')}>
                    <div className={cx('col-lg-6')}>
                        <img src={logo} className={cx('logo')} />
                        <div className={cx('download-footer')}>
                            <Link to='https://apps.apple.com/us/app/uber-eats-food-delivery/id1058959277' target='_blank'><img src={appstore} className={cx('app-store')} /></Link>
                            <Link to='https://play.google.com/store/apps/details?id=com.ubercab.eats' target='_blank'><img src={ggplay} className={cx('gg-play')} /></Link>
                        </div>
                    </div>
                    <div className={cx('col-lg-3', 'mt-4')}>
                        <Link to='https://help.uber.com/ubereats?_ga=2.75852501.1382978475.1683775650-1228142278.1683687573' className={cx('link-footer')} target='_blank'><p>Get help</p></Link>
                        <Link to='https://www.uber.com/us/en/gift-cards/?_ga=2.75852501.1382978475.1683775650-1228142278.1683687573' className={cx('link-footer')} target='_blank'><p>Buy gift card</p></Link>
                        <Link to='/register' className={cx('link-footer')}><p>Sign up</p></Link>
                    </div>
                    <div className={cx('col-lg-3', 'mt-4')}>
                        <Link to='https://www.ubereats.com/near-me' className={cx('link-footer')} target='_blank'><p>Restaurant near me</p></Link>
                        <Link to='https://www.ubereats.com/location' className={cx('link-footer')} target='_blank'><p>View all cities</p></Link>
                        <Link to='https://www.ubereats.com/location#all-countries' className={cx('link-footer')} target='_blank'><p>View all countries</p></Link>
                        <Link to='https://www.ubereats.com/pickup/near-me' className={cx('link-footer')} target='_blank'><p>Pick up near me</p></Link>
                        <Link to='https://www.ubereats.com/' className={cx('link-footer')} target='_blank'><p>About Uber Eats</p></Link>
                        <Link to='/' className={cx('link-footer')}><p><span><HiLanguage /></span>English</p></Link>

                    </div>
                </div>
                <hr />
                <div className={cx('row', 'px-3', 'justify-content-between')}>
                    <div>
                        <Link to='https://www.facebook.com/choanhh.munn.3' className={cx('social-footer', 'mr-3')} target='_blank'><FiFacebook /></Link>
                        <Link to='https://github.com/Kimichan08' className={cx('social-footer', 'mr-3')} target='_blank'><FiGithub /></Link>
                        <Link to='https://www.instagram.com/kimichan_03/' className={cx('social-footer', 'mr-3')} target='_blank'><FiInstagram /></Link>
                    </div>
                    <div >
                        <Link to='https://www.uber.com/legal/en/document/?_ga=2.8825461.1382978475.1683775650-1228142278.1683687573&country=united-states&lang=en&name=privacy-notice' className={cx('link-footer', 'ml-4')} target='_blank'>Privacy Policy</Link>
                        <Link to='https://www.uber.com/legal/en/document/?name=general-terms-of-use&country=united-arab-emirates&lang=en' className={cx('link-footer', 'ml-4')} target='_blank'>Terms</Link>
                        <Link to='https://help.uber.com/ubereats/restaurants/article/uber-eats-pricing?nodeId=2adbed88-9822-4690-9529-3061c4821755&_ga=2.8825461.1382978475.1683775650-1228142278.1683687573' className={cx('link-footer', 'ml-4')} target='_blank'>Pricing</Link>
                        <Link to='https://privacy.uber.com/privacy/california/?_ga=2.8825461.1382978475.1683775650-1228142278.1683687573&_csid=Pskc7kK72ymbmJFB4_pD5Q&state=eaiepHCRo32M65z2TAt0xS09ZMftLvo1v-AyP5XxEe4%3D&effect=' className={cx('link-footer', 'ml-4')} target='_blank'>Do not sell or share my personal information</Link>
                    </div>
                </div>
                <div className={cx('pb-5', 'mt-2')}>
                    <span className={cx('font-italic', 'float-right')}><sup><AiOutlineCopyrightCircle /></sup>2023 by KhaccThienn, Kimichan, Sheyy Inc.</span>
                </div>
            </div>
        </footer>
    )
}

export default Footer