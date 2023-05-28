/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useState } from 'react'
import styles from './deliver.module.css'
import classNames from 'classnames/bind'
import * as OrderService from "../../../services/OrderService";
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

let cx = classNames.bind(styles)

function Dashboard() {
     const formatPrice = (price) => {
          return price.toLocaleString('en-US', {
               style: 'currency',
               currency: 'USD',
               minimumFractionDigits: 2,
          });
     };
     const [listOrders, setListOrders] = useState([]);

     const handleAccept = async () => {
          
     }

     useEffect(() => {
          const getListOrderedFromAPI = async () => {
               const [data, error] = await OrderService.getAllOrdersByStatus(2);
               if (data) {
                    console.log(data);
                    setListOrders(data)
               }
               if (error) {
                    console.log(error);
               }
          }
          getListOrderedFromAPI();
     }, []);

     return (
          <div className={cx('container-fluid', 'px-5', 'py-5')}>
               <div className={cx('row', 'justify-content-around')}>
                    <div className={cx('col-6')}>
                         <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83998.7782450228!2d2.264634263777884!3d48.85893843503861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2zUGEgcmksIFBow6Fw!5e0!3m2!1svi!2s!4v1684468304857!5m2!1svi!2s"
                              width="100%" height="450" className={cx('border-0')}
                              allowFullScreen="yes" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                    <div className={cx('col-6')}>
                         {
                              listOrders.length > 0 ?
                                   <div className={cx('text-left')}>
                                        <p className={cx('h1', 'font-weight-bold', 'text-center')}>New cooked order</p>
                                        <div className={cx('row', 'font-weight-bold', 'align-items-center')}>
                                             <div className={cx('text-black', 'col-auto')}>#</div>
                                             <div className={cx('text-black', 'col-3')}>From</div>
                                             <div className={cx('text-black', 'col-3')}>To</div>
                                             <div className={cx('text-black', 'col-2')}>Total</div>
                                             <div className={cx('text-black', 'col')}></div>
                                        </div>

                                        {/* map items order cooked */}
                                        {
                                             listOrders.map((e, i) => {
                                                  return (
                                                       <div className={cx('row', 'align-items-center', 'my-2')} key={i}>
                                                            <div className={cx('col-auto')}>{i + 1}</div>
                                                            <div className={cx('col-3')}>{e.delivered_address}</div>
                                                            <div className={cx('col-3')}>{e.restaurant.address}</div>
                                                            <div className={cx('col-2')}>{formatPrice(e.total_price)}</div>
                                                            <div className={cx('col')}>
                                                                 <Link to={`/${e.id}`} onClick={() => handleAccept} className={cx('btn', 'btn-success', 'rounded-0', 'btn-sm')}>
                                                                      Accept challenge &rarr;
                                                                 </Link>
                                                            </div>
                                                       </div>
                                                  )
                                             })
                                        }
                                        {/*  */}
                                   </div> :
                                   <></>
                         }
                    </div>
               </div>
          </div>
     )
}

export default Dashboard