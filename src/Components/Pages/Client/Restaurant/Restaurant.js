import React from 'react'
import classNames from 'classnames/bind'
import styles from './restaurant.module.css'
import store1 from '../../../../images/store1.png'
import { TbTruckDelivery } from 'react-icons/tb'
import { Link } from 'react-router-dom'

let cx = classNames.bind(styles)

function Restaurant() {
    return (
        <div className={cx('container-fluid', 'px-5')}>
            <p className={cx('h1', 'font-weight-bold', 'text-black')}>Choose the restaurant</p>
            <hr />
            <div className={cx('row', 'py-3')}>
                <div className={cx('col-lg-3')}>
                    <p className={cx('h3', 'font-weight-bold')}>9 stores</p>
                    <hr />
                    <div className={cx("form-group")}>
                        <label htmlFor=""> Sort:</label>
                        <select className={cx("form-control", 'custom-select', 'rounded-0', 'shadow')} name="" id="">
                            <option value=''>By name (A-Z)</option>
                            <option value=''>By name (Z-A)</option>
                        </select>
                    </div>
                    <div className={cx("form-group")}>
                        <label htmlFor="">Search by name:</label>
                        <input type="text" name="" id="" className={cx("form-control", 'rounded-0', 'shadow')} placeholder="Enter restaurant name..." aria-describedby="helpId" />
                        {/* <small id="helpId" className="text-muted">Help text</small> */}
                    </div>
                </div>
                <div className={cx('col-lg-9', 'px-5')}>
                    <div className={cx('row')}>
                        <div className={cx('col-lg-4')}>
                            <div className={cx("card", 'border-0')}>
                                <img className={cx("card-img-top", 'img-store')} src={store1} alt="" />
                                <div className="card-body">
                                    <p className={cx("card-title", 'm-0', 'font-weight-bold')}>
                                        Bob & Edith's Diner
                                        <span className={cx('float-right', 'badge badge-warning', 'rounded-circle')}>
                                            4.6
                                        </span>
                                    </p>
                                    <small className={cx("card-text", 'text-muted')}><TbTruckDelivery />&nbsp;$0 Delivery Fee&bull;15-30 min</small>
                                </div>
                            </div>
                        </div>
                        <div className={cx('col-lg-4')}>
                            <div className={cx("card", 'border-0')}>
                                <img className={cx("card-img-top", 'img-store')} src={store1} alt="" />
                                <div className="card-body">
                                    <p className={cx("card-title", 'm-0', 'font-weight-bold')}>
                                        Bob & Edith's Diner
                                        <span className={cx('float-right', 'badge badge-warning', 'rounded-circle')}>
                                            4.6
                                        </span>
                                    </p>
                                    <small className={cx("card-text", 'text-muted')}><TbTruckDelivery />&nbsp;$0 Delivery Fee&bull;15-30 min</small>
                                </div>
                            </div>
                        </div>
                        <div className={cx('col-lg-4')}>
                            <div className={cx("card", 'border-0')}>
                                <img className={cx("card-img-top", 'img-store')} src={store1} alt="" />
                                <div className="card-body">
                                    <p className={cx("card-title", 'm-0', 'font-weight-bold')}>
                                        Bob & Edith's Diner
                                        <span className={cx('float-right', 'badge badge-warning', 'rounded-circle')}>
                                            4.6
                                        </span>
                                    </p>
                                    <small className={cx("card-text", 'text-muted')}><TbTruckDelivery />&nbsp;$0 Delivery Fee&bull;15-30 min</small>
                                </div>
                            </div>
                        </div>
                        <div className={cx('col-lg-4')}>
                            <div className={cx("card", 'border-0')}>
                                <img className={cx("card-img-top", 'img-store')} src={store1} alt="" />
                                <div className="card-body">
                                    <p className={cx("card-title", 'm-0', 'font-weight-bold')}>
                                        Bob & Edith's Diner
                                        <span className={cx('float-right', 'badge badge-warning', 'rounded-circle')}>
                                            4.6
                                        </span>
                                    </p>
                                    <small className={cx("card-text", 'text-muted')}><TbTruckDelivery />&nbsp;$0 Delivery Fee&bull;15-30 min</small>
                                </div>
                            </div>
                        </div>
                        <div className={cx('col-lg-4')}>
                            <div className={cx("card", 'border-0')}>
                                <img className={cx("card-img-top", 'img-store')} src={store1} alt="" />
                                <div className="card-body">
                                    <p className={cx("card-title", 'm-0', 'font-weight-bold')}>
                                        Bob & Edith's Diner
                                        <span className={cx('float-right', 'badge badge-warning', 'rounded-circle')}>
                                            4.6
                                        </span>
                                    </p>
                                    <small className={cx("card-text", 'text-muted')}><TbTruckDelivery />&nbsp;$0 Delivery Fee&bull;15-30 min</small>
                                </div>
                            </div>
                        </div>
                        <div className={cx('col-lg-4')}>
                            <div className={cx("card", 'border-0')}>
                                <img className={cx("card-img-top", 'img-store')} src={store1} alt="" />
                                <div className="card-body">
                                    <p className={cx("card-title", 'm-0', 'font-weight-bold')}>
                                        Bob & Edith's Diner
                                        <span className={cx('float-right', 'badge badge-warning', 'rounded-circle')}>
                                            4.6
                                        </span>
                                    </p>
                                    <small className={cx("card-text", 'text-muted')}><TbTruckDelivery />&nbsp;$0 Delivery Fee&bull;15-30 min</small>
                                </div>
                            </div>
                        </div>
                        <div className={cx('col-lg-4')}>
                            <div className={cx("card", 'border-0')}>
                                <img className={cx("card-img-top", 'img-store')} src={store1} alt="" />
                                <div className="card-body">
                                    <p className={cx("card-title", 'm-0', 'font-weight-bold')}>
                                        Bob & Edith's Diner
                                        <span className={cx('float-right', 'badge badge-warning', 'rounded-circle')}>
                                            4.6
                                        </span>
                                    </p>
                                    <small className={cx("card-text", 'text-muted')}><TbTruckDelivery />&nbsp;$0 Delivery Fee&bull;15-30 min</small>
                                </div>
                            </div>
                        </div>
                        <div className={cx('col-lg-4')}>
                            <div className={cx("card", 'border-0')}>
                                <img className={cx("card-img-top", 'img-store')} src={store1} alt="" />
                                <div className="card-body">
                                    <p className={cx("card-title", 'm-0', 'font-weight-bold')}>
                                        Bob & Edith's Diner
                                        <span className={cx('float-right', 'badge badge-warning', 'rounded-circle')}>
                                            4.6
                                        </span>
                                    </p>
                                    <small className={cx("card-text", 'text-muted')}><TbTruckDelivery />&nbsp;$0 Delivery Fee&bull;15-30 min</small>
                                </div>
                            </div>
                        </div>
                        <div className={cx('col-lg-4')}>
                            <div className={cx("card", 'border-0')}>
                                <img className={cx("card-img-top", 'img-store')} src={store1} alt="" />
                                <div className="card-body">
                                    <p className={cx("card-title", 'm-0', 'font-weight-bold')}>
                                        Bob & Edith's Diner
                                        <span className={cx('float-right', 'badge badge-warning', 'rounded-circle')}>
                                            4.6
                                        </span>
                                    </p>
                                    <small className={cx("card-text", 'text-muted')}><TbTruckDelivery />&nbsp;$0 Delivery Fee&bull;15-30 min</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className="page-item">
                                <Link to='' className={cx("page-link",'text-black')}  aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                    <span className="sr-only">Previous</span>
                                </Link>
                            </li>
                            <li className="page-item"><Link to='' className={cx("page-link",'text-black')} >1</Link></li>
                            <li className="page-item"><Link to='' className={cx("page-link",'text-black')} >2</Link></li>
                            <li className="page-item"><Link to='' className={cx("page-link",'text-black')} >3</Link></li>
                            <li className="page-item">
                                <Link to='' className={cx("page-link",'text-black')}  aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                    <span className="sr-only">Next</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Restaurant