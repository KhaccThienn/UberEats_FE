/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useState } from 'react'
import styles from './deliver.module.css'
import classNames from 'classnames/bind'
import * as OrderService from "../../../services/OrderService";
import * as UserService from "../../../services/UserService";
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../../redux/reducers/users';

let cx = classNames.bind(styles)
const formatPrice = (price) => {
     return price?.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
     });
};
function AcceptOrder({ orderId }) {
     const userData = useSelector(selectUserData);
     const initProfileState = {
          avatar: "",
          userName: "",
          phone: "",
          email: "",
          address: "",
     };
     const [profile, setProfile] = useState(initProfileState);
     console.log("OrderId: ", orderId);
     const [orderDetail, setOrderDetail] = useState({});
     useEffect(() => {
          const getOrderByOrderID = async () => {
               const [data, error] = await OrderService.getOrderByOrderId(orderId)
               if (data) {
                    console.log(data[0]);
                    setOrderDetail(data[0]);
               }
               if (error) {
                    console.log(error);
               }
          }
          const getProfileData = async (userID) => {
               const [data, error] = await UserService.getUserProfile(userID);
               if (data) {
                    console.log("API User Data: ", data);
                    setProfile(data);
               }
               if (error) {
                    console.log(error);
               }
          };
          getProfileData(userData.user.subject);
          getOrderByOrderID();
     }, [orderId, userData.user.subject]);

     return (
          <div className={cx('container-fluid', 'px-5', 'py-5')}>
               <div className={cx('row', 'justify-content-around')}>
                    <div className={cx('col-6')}>
                         <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83998.7782450228!2d2.264634263777884!3d48.85893843503861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2zUGEgcmksIFBow6Fw!5e0!3m2!1svi!2s!4v1684468304857!5m2!1svi!2s"
                              width="100%" height="450" className={cx('border-0')}
                              allowFullScreen="yes" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                    <div className={cx('col-6')}>

                         <div className={cx('row', 'py-3')}>
                              <div className={cx('col-12', 'text-center', 'bg-order')}>
                                   <p className={cx('h2', 'font-weight-bold', 'm-0', 'py-2')}>Order #{orderId}</p>
                              </div>
                              <div className={cx('col-12', 'text-center', 'py-4')}>
                                   <p className={cx('h2')}>{formatPrice(orderDetail.total_price)}</p>
                                   <hr />
                              </div>
                              <div className={cx('col-12', 'text-left')}>
                                   <p className={cx('h5')}>Prepare by: {orderDetail.restaurant?.name}</p>
                                   <hr />
                                   <div className={cx('d-flex', 'justify-content-between')}>
                                        <p className={cx('h5')}>Deliver to: {orderDetail.delivered_user}</p>
                                        <p className={cx('h5')}>Phone: {orderDetail.delivered_phone}</p>
                                   </div>
                                   <hr />
                                   <div className={cx('d-flex', 'justify-content-between')}>
                                        <p className={cx('h5')}>Deliver by: {profile.userName}</p>
                                        <p className={cx('h5')}>Phone: {profile.phone}</p>
                                   </div>
                                   <hr />
                                   <div className={cx('d-flex', 'justify-content-between')}>
                                        <p className={cx('h5')}>From: {orderDetail.restaurant?.address}</p>
                                        <p className={cx('h5')}>To: {orderDetail.delivered_address}</p>
                                   </div>
                                   <hr />

                              </div>
                         </div>
                    </div>
               </div>
          </div>
     )
}

export default AcceptOrder