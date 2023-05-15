import React from 'react'
import styles from './food.module.css'
import classNames from 'classnames/bind'
import img_food from '../../../../images/img-food.jpeg'
import { AiFillStar } from 'react-icons/ai'
import { TbTruckDelivery } from 'react-icons/tb'
import { IoAddCircle } from 'react-icons/io5'
import food1 from '../../../../images/food1.png'

let cx = classNames.bind(styles)

function Food() {
    return (
        <>
            <div>
                <img className={cx('img-food')} src={img_food} alt='img-food' ></img>
            </div>
            <div className={cx('container-fluid', 'px-5')} >
                <p className={cx('h2', 'font-weight-bold', 'text-black', 'm-0', 'mt-3', 'text-uppercase')}>burger king (2000 5th st ne)</p>
                <p className={cx('m-0', 'text-black', 'font-weight-bold')}><AiFillStar /> 4.1 (200+ rating) &bull; American &bull; $ &bull; <TbTruckDelivery /></p>
                <p className={cx('text-muted', 'm-0')}>Open until 12:50 AM</p>
                <hr />
                <div className={cx('row', 'py-3', 'text-black')}>
                    <div className={cx('col-lg-3')}>
                        <p className={cx('h4', 'font-weight-bold')}>Picked for you</p>
                        <hr />
                        <div className={cx("form-group")}>
                            <label htmlFor=""> Sort:</label>
                            <select className={cx("form-control", 'custom-select', 'rounded-0', 'shadow')} name="" id="">
                                <option>Choose option</option>
                                <option value=''>By name (A - Z)</option>
                                <option value=''>By name (Z - A)</option>
                                <option value=''>By cost (Low - Hight)</option>
                                <option value=''>By cost (High - Low)</option>
                            </select>
                        </div>
                        <div className={cx("form-group")}>
                            <label htmlFor="">Search by name:</label>
                            <input type="text" name="" id="" className={cx("form-control", 'rounded-0', 'shadow')} placeholder="Enter food name..." />
                            {/* <small id="helpId" className="text-muted">Help text</small> */}
                        </div>
                        <div className={cx("form-group")}>
                            <label htmlFor="">Search by price:</label>
                            <div className={cx('d-flex', 'align-items-center', 'border', 'shadow', 'px-2')}>
                                <p className={cx('text-muted', 'm-0')}>From:</p>
                                <input type="text" name="" id="" className={cx("form-control", 'rounded-0', 'input-price')} placeholder="..." />
                                <p className={cx('text-muted', 'm-0')}>To:</p>
                                <input type="text" name="" id="" className={cx("form-control", 'rounded-0', 'input-price')} placeholder="..." />
                            </div>
                        </div>
                    </div>
                    <div className={cx('col-lg-9')}>
                        <div className={cx('row')}>
                            <div className={cx('col-3','my-3')}>
                                <div className={cx("card", 'card-food')}>
                                    <img className={cx('card-img-top','p-1','mh-163')} src={food1} alt="..." />
                                    <div className={cx('card-img-overlay')}>
                                        <button className={cx('btn', 'add-btn')} title='Add food'>
                                            <IoAddCircle className={cx('add-icon-size')} />
                                        </button>
                                    </div>
                                    <div className={cx("card-body")}>
                                        <p className={cx("card-title", 'm-0')}>$5.49</p>
                                        <p className={cx("card-text", 'text-muted', 'm-0')}>Oven Roasted Turkey</p>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('col-3','my-3')}>
                                <div className={cx("card", 'card-food')}>
                                    <img className={cx('card-img-top','p-1','mh-163')} src={img_food} alt="..." />
                                    <div className={cx('card-img-overlay')}>
                                        <button className={cx('btn', 'add-btn')} title='Add food'>
                                            <IoAddCircle className={cx('add-icon-size')} />
                                        </button>
                                    </div>
                                    <div className={cx("card-body")}>
                                        <p className={cx("card-title", 'm-0')}>$6.88</p>
                                        <p className={cx("card-text", 'text-muted', 'm-0')}>Beef Burger D.C</p>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('col-3','my-3')}>
                                <div className={cx("card", 'card-food')}>
                                    <img className={cx('card-img-top','p-1','mh-163')} src={food1} alt="..." />
                                    <div className={cx('card-img-overlay')}>
                                        <button className={cx('btn', 'add-btn')} title='Add food'>
                                            <IoAddCircle className={cx('add-icon-size')} />
                                        </button>
                                    </div>
                                    <div className={cx("card-body")}>
                                        <p className={cx("card-title", 'm-0')}>$5.49</p>
                                        <p className={cx("card-text", 'text-muted', 'm-0')}>Oven Roasted Turkey</p>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('col-3','my-3')}>
                                <div className={cx("card", 'card-food')}>
                                    <img className={cx('card-img-top','p-1','mh-163')} src={food1} alt="..." />
                                    <div className={cx('card-img-overlay')}>
                                        <button className={cx('btn', 'add-btn')} title='Add food'>
                                            <IoAddCircle className={cx('add-icon-size')} />
                                        </button>
                                    </div>
                                    <div className={cx("card-body")}>
                                        <p className={cx("card-title", 'm-0')}>$5.49</p>
                                        <p className={cx("card-text", 'text-muted', 'm-0')}>Oven Roasted Turkey</p>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('col-3','my-3')}>
                                <div className={cx("card", 'card-food')}>
                                    <img className={cx('card-img-top','p-1','mh-163')} src={food1} alt="..." />
                                    <div className={cx('card-img-overlay')}>
                                        <button className={cx('btn', 'add-btn')} title='Add food'>
                                            <IoAddCircle className={cx('add-icon-size')} />
                                        </button>
                                    </div>
                                    <div className={cx("card-body")}>
                                        <p className={cx("card-title", 'm-0')}>$5.49</p>
                                        <p className={cx("card-text", 'text-muted', 'm-0')}>Oven Roasted Turkey</p>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('col-3','my-3')}>
                                <div className={cx("card", 'card-food')}>
                                    <img className={cx('card-img-top','p-1','mh-163')} src={food1} alt="..." />
                                    <div className={cx('card-img-overlay')}>
                                        <button className={cx('btn', 'add-btn')} title='Add food'>
                                            <IoAddCircle className={cx('add-icon-size')} />
                                        </button>
                                    </div>
                                    <div className={cx("card-body")}>
                                        <p className={cx("card-title", 'm-0')}>$5.49</p>
                                        <p className={cx("card-text", 'text-muted', 'm-0')}>Oven Roasted Turkey</p>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('col-3','my-3')}>
                                <div className={cx("card", 'card-food')}>
                                    <img className={cx('card-img-top','p-1','mh-163')} src={food1} alt="..." />
                                    <div className={cx('card-img-overlay')}>
                                        <button className={cx('btn', 'add-btn')} title='Add food'>
                                            <IoAddCircle className={cx('add-icon-size')} />
                                        </button>
                                    </div>
                                    <div className={cx("card-body")}>
                                        <p className={cx("card-title", 'm-0')}>$5.49</p>
                                        <p className={cx("card-text", 'text-muted', 'm-0')}>Oven Roasted Turkey</p>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('col-3','my-3')}>
                                <div className={cx("card", 'card-food')}>
                                    <img className={cx('card-img-top','p-1','mh-163')} src={food1} alt="..." />
                                    <div className={cx('card-img-overlay')}>
                                        <button className={cx('btn', 'add-btn')} title='Add food'>
                                            <IoAddCircle className={cx('add-icon-size')} />
                                        </button>
                                    </div>
                                    <div className={cx("card-body")}>
                                        <p className={cx("card-title", 'm-0')}>$5.49</p>
                                        <p className={cx("card-text", 'text-muted', 'm-0')}>Oven Roasted Turkey</p>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('col-3','my-3')}>
                                <div className={cx("card", 'card-food')}>
                                    <img className={cx('card-img-top','p-1','mh-163')} src={food1} alt="..." />
                                    <div className={cx('card-img-overlay')}>
                                        <button className={cx('btn', 'add-btn')} title='Add food'>
                                            <IoAddCircle className={cx('add-icon-size')} />
                                        </button>
                                    </div>
                                    <div className={cx("card-body")}>
                                        <p className={cx("card-title", 'm-0')}>$5.49</p>
                                        <p className={cx("card-text", 'text-muted', 'm-0')}>Oven Roasted Turkey</p>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('col-3','my-3')}>
                                <div className={cx("card", 'card-food')}>
                                    <img className={cx('card-img-top','p-1','mh-163')} src={food1} alt="..." />
                                    <div className={cx('card-img-overlay')}>
                                        <button className={cx('btn', 'add-btn')} title='Add food'>
                                            <IoAddCircle className={cx('add-icon-size')} />
                                        </button>
                                    </div>
                                    <div className={cx("card-body")}>
                                        <p className={cx("card-title", 'm-0')}>$5.49</p>
                                        <p className={cx("card-text", 'text-muted', 'm-0')}>Oven Roasted Turkey</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Food