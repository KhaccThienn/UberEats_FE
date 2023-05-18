import React from 'react'
import styles from './orderDetails.module.css'
import classNames from 'classnames/bind'
import {GoPrimitiveDot} from 'react-icons/go'

let cx = classNames.bind(styles)

function OrderDetails() {
    
    return (
        <div className={cx('container-fluid', 'px-5')}>
            <div className={cx('row')}>
                <div className={cx("col-12")}>
                    <p className={cx('h1', 'text-head', 'py-3', 'text-center')}>Order <b>Details</b></p>
                </div>
                <table className={cx("table", "table-striped",'table-borderless')}>
                    <thead>
                        <tr>
                            <th scope='col' className={cx('text-black')}>#</th>
                            <th scope='col' className={cx('text-black')}>Customer name</th>
                            <th scope='col' className={cx('text-black')}>Shipper name</th>
                            <th scope='col' className={cx('text-black')}>Location</th>
                            <th scope='col' className={cx('text-black')}>Order date</th>
                            <th scope='col' className={cx('text-black')}>Status</th>
                            <th scope='col' className={cx('text-black')}>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Kim chi chen</td>
                            <td>Thien</td>
                            <td>London, England</td>
                            <td>May 20, 2023</td>
                            <td className={cx('text-warning')}><GoPrimitiveDot/>Pending</td>
                            <td>$00.00</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Lank tran</td>
                            <td>Thien</td>
                            <td>Thanh Xuan, Ha Noi</td>
                            <td>October 31, 2023</td>
                            <td className={cx('text-primary')}><GoPrimitiveDot/>Shipping</td>
                            <td>$00.00</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Sheyy</td>
                            <td>Thien</td>
                            <td>Paris, France</td>
                            <td>June 20, 2023</td>
                            <td className={cx('text-success')}><GoPrimitiveDot/>Delivered</td>
                            <td>$00.00</td>
                        </tr>
                        <tr>
                            <th scope="row">4</th>
                            <td>Thien</td>
                            <td>Thien</td>
                            <td>London, England</td>
                            <td>May 18, 2023</td>
                            <td className={cx('text-danger')}><GoPrimitiveDot/>Cancelled</td>
                            <td>$00.00</td>
                        </tr>
                        <tr>
                            <th scope="row">5</th>
                            <td>Thân Thiện</td>
                            <td>Thien</td>
                            <td>Hai Duong, Viet Nam</td>
                            <td>December 31, 2023</td>
                            <td className={cx('text-info')}><GoPrimitiveDot/>Cooking</td>
                            <td>$00.00</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default OrderDetails