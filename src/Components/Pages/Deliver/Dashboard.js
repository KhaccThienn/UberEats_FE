/* eslint-disable jsx-a11y/iframe-has-title */
import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { io } from "socket.io-client";
import Swal from 'sweetalert2';
import { selectUserData } from '../../../redux/reducers/users';
import * as OrderService from "../../../services/OrderService";
import styles from './deliver.module.css';

const socket = io("http://localhost:8000");
let cx = classNames.bind(styles)

function Dashboard() {
     const formatPrice = (price) => {
          return price.toLocaleString('en-US', {
               style: 'currency',
               currency: 'USD',
               minimumFractionDigits: 2,
          });
     };
     const userData = useSelector(selectUserData);
     const [listPendingOrders, setListPendingOrders] = useState([]);
     const navigate = useNavigate();

     const handleAccept = async (orderId, status) => {
          const choose = await Swal.fire({
               title: "Do You Want Accepting This Order ?",
               showDenyButton: true,
               confirmButtonText: "Yes",
               denyButtonText: "No",
          });
          if (choose.isConfirmed) {
               const orderData = {
                    status: status + 1
               }
               const [data, error] = await OrderService.updateOrderDelivery(orderId, userData.user.subject, orderData);
               console.log(data);
               socket.emit("deliverAcceptOrder", orderData);
               navigate(`/${orderId}`)
               if (data) {
               }
               if (error) {
                    console.log(error);
               }
          }
     }
     const getListOrderedFromAPI = async () => {
          const [data, error] = await OrderService.getAllOrdersByStatus(2);
          if (data) {

               console.log(data);
               const newListPendingOrdered = data.filter((item) => item.status === 2 || item.status === 3);
               console.log(newListPendingOrdered);
               setListPendingOrders(newListPendingOrdered);
          }
          if (error) {
               console.log(error);
          }
     }
     socket.on("updateOrderStatusDeliver", (data) => {
          data ? console.log(data) : console.log("hehe");
          getListOrderedFromAPI()
     })
     useEffect(() => {

          getListOrderedFromAPI();
     }, [userData.user.subject]);

     return (
          <div className={cx('container-fluid', 'px-5', 'py-5')}>
               <div className={cx('row', 'justify-content-around')}>
                    <div className={cx('col-6')}>
                         <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83998.7782450228!2d2.264634263777884!3d48.85893843503861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2zUGEgcmksIFBow6Fw!5e0!3m2!1svi!2s!4v1684468304857!5m2!1svi!2s"
                              width="100%" height="450" className={cx('border-0')}
                              allowFullScreen="yes" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                    <div className={cx('col-6')}>
                         <p className={cx('h1', 'font-weight-bold', 'text-center')}>New cooked order</p>
                         {
                              listPendingOrders.length > 0 ?
                                   <div className={cx('text-left')}>
                                        <div className={cx('row', 'font-weight-bold', 'align-items-center')}>
                                             <div className={cx('text-black', 'col-auto')}>#</div>
                                             <div className={cx('text-black', 'col-3')}>From</div>
                                             <div className={cx('text-black', 'col-3')}>To</div>
                                             <div className={cx('text-black', 'col-2')}>Total</div>
                                             <div className={cx('text-black', 'col')}></div>
                                        </div>
                                        {
                                             listPendingOrders.map((e, i) => {
                                                  return (
                                                       <div className={cx('row', 'align-items-center', 'my-2')} key={i}>
                                                            <div className={cx('col-auto')}>{i + 1}</div>
                                                            <div className={cx('col-3')}>{e.restaurant.address}</div>
                                                            <div className={cx('col-3')}>{e.delivered_address}</div>
                                                            <div className={cx('col-2')}>{formatPrice(e.total_price)}</div>
                                                            <div className={cx('col')}>
                                                                 {
                                                                      e.status === 2 && <button onClick={() => handleAccept(e.id, e.status)} className={cx('btn', 'btn-success', 'rounded-0', 'btn-sm')}>
                                                                           Accept challenge &rarr;
                                                                      </button>
                                                                 }
                                                                 {
                                                                      e.status === 3 &&
                                                                      <Link to={`/${e.id}`} className={cx('btn', 'btn-success', 'rounded-0', 'btn-sm')}>
                                                                           View Order &rarr;
                                                                      </Link>
                                                                 }
                                                            </div>
                                                       </div>
                                                  )
                                             })
                                        }
                                   </div> :
                                   <>Nothing to show</>
                         }
                    </div>
               </div>
          </div>
     )
}

export default Dashboard