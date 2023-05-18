import React from 'react'
import styles from './order.module.css'
import classNames from 'classnames/bind'
import food1 from '../../../../images/food1.png'
import { AiOutlineCreditCard } from 'react-icons/ai'

let cx = classNames.bind(styles);

function Order() {
    return (
        <div className={cx('container-fluid', 'px-5')}>
            <div className={cx('row', 'justify-content-center')}>
                <div className={cx('col-lg-10')}>
                    <p className={cx('h1', 'font-weight-bold', 'text-center', 'text-uppercase', 'my-2', 'text-shadow')}>
                        checkout
                    </p>
                    <div className={cx('row')}>
                        <div className={cx('col-6')}>
                            <form method='POST'>
                                <div className={cx("card border-0", 'px-5')}>
                                    <div className={cx("card-header bg-transparent pl-0")}>
                                        <p className={cx("card-text", "text-black", "mb-2 text-uppercase h3", 'font-weight-bold')}>
                                            payment details
                                        </p>
                                    </div>
                                    <div className={cx("card-body p-0 pt-3")}>
                                        <div className={cx("form-group")}>
                                            <label htmlFor="" className={cx("h5 text-black mb-1")}>Name: </label>
                                            <input type="text"
                                                className={cx("form-control rounded-0 mt-1")}
                                                name="" placeholder="Enter name..." />
                                        </div>
                                        <div className={cx("form-group")}>
                                            <label htmlFor="" className={cx("h5 text-black mb-1")}>Address: </label>
                                            <input type="text"
                                                className={cx("form-control rounded-0 mt-1")}
                                                name="" placeholder="Enter address..." />
                                        </div>
                                        <div className={cx("form-group")}>
                                            <label htmlFor="" className={cx("h5 text-black mb-1")}>Phone number: </label>
                                            <input type="text"
                                                className={cx("form-control rounded-0 mt-1")}
                                                name="" placeholder="Enter phone number..." />
                                        </div>
                                        <div className={cx("form-group")}>
                                            <label htmlFor="" className={cx("h5 text-black mb-1")}>Note:</label>
                                            <textarea className={cx("form-control rounded-0 mt-1")} name="" rows="3" placeholder='note'></textarea>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className={cx('col-6')}>
                            <div className={cx("card border-0", 'px-5')}>
                                <div className={cx("card-header bg-transparent")}>
                                    <p className={cx("card-text text-black mb-2 pl-0 text-uppercase h3")}>
                                        <b>your order</b>
                                    </p>
                                </div>
                                <div className={cx("card-body pt-0")}>
                                    {/* map items order */}
                                    <div className={cx("row justify-content-between align-items-center border-bottom py-2")}>
                                        <div className={cx("col-7")}>
                                            <div className={cx("media flex-column flex-sm-row")}>
                                                <img className={cx('img-order')}
                                                    src={food1} alt='hehe' />
                                                <div className={cx("media-body my-auto")}>
                                                    <div className={cx("row")}>
                                                        <div className={cx("col-auto")}>
                                                            <p className={cx("mb-0 ml-2")}><b>food name</b></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx(" pl-0 col-auto my-auto pt-3")}>
                                            <p className="">1</p>
                                        </div>
                                        <div className={cx(" pl-0 col-auto my-auto pt-3")}>
                                            <p className="">
                                                $00.00
                                            </p>
                                        </div>
                                    </div>
                                    {/*  */}
                                    {/* map items order */}
                                    <div className={cx("row justify-content-between align-items-center border-bottom py-2")}>
                                        <div className={cx("col-7")}>
                                            <div className={cx("media flex-column flex-sm-row")}>
                                                <img className={cx('img-order')}
                                                    src={food1} alt='hehe' />
                                                <div className={cx("media-body my-auto")}>
                                                    <div className={cx("row")}>
                                                        <div className={cx("col-auto")}>
                                                            <p className={cx("mb-0 ml-2")}><b>food name</b></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx(" pl-0 col-auto my-auto pt-3")}>
                                            <p className="">1</p>
                                        </div>
                                        <div className={cx(" pl-0 col-auto my-auto pt-3")}>
                                            <p className="">
                                                $00.00
                                            </p>
                                        </div>
                                    </div>
                                    {/*  */}
                                    {/* map items order */}
                                    <div className={cx("row justify-content-between align-items-center border-bottom py-2")}>
                                        <div className={cx("col-7")}>
                                            <div className={cx("media flex-column flex-sm-row")}>
                                                <img className={cx('img-order')}
                                                    src={food1} alt='hehe' />
                                                <div className={cx("media-body my-auto")}>
                                                    <div className={cx("row")}>
                                                        <div className={cx("col-auto")}>
                                                            <p className={cx("mb-0 ml-2")}><b>food name</b></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx(" pl-0 col-auto my-auto pt-3")}>
                                            <p className="">1</p>
                                        </div>
                                        <div className={cx(" pl-0 col-auto my-auto pt-3")}>
                                            <p className="">
                                                $00.00
                                            </p>
                                        </div>
                                    </div>
                                    {/*  */}
                                    <div className={cx("row")}>
                                        <div className={cx("col border-bottom")}>
                                            <div className={cx("row justify-content-between align-items-center my-3")}>
                                                <div className={cx("col-4")}>
                                                    <p className={cx("h5")}><b>Total</b></p>
                                                </div>
                                                <div className={cx("col-auto")}>
                                                    <p className={cx("h5")}>
                                                        $00.00
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('row', 'px-5', 'my-3')}>
                        <div className={cx('col-12')}>
                            <button className={cx('btn btn-block', 'btn-lg', 'btn-order', 'rounded-0')}>
                                <b>
                                    <AiOutlineCreditCard />&nbsp;Order instantly
                                </b>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Order