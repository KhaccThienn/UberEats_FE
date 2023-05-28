import React from 'react'
import styles from './orderDetails.module.css'
import classNames from 'classnames/bind'
import { GoPrimitiveDot } from 'react-icons/go'
import { useSelector } from 'react-redux'
import { selectUserData } from '../../../../redux/reducers/users'
import * as OrderService from "../../../../services/OrderService"
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

let cx = classNames.bind(styles)

function ListOrdered() {
     const formatPrice = (price) => {
          return price.toLocaleString('en-US', {
               style: 'currency',
               currency: 'USD',
               minimumFractionDigits: 2,
          });
     };
     const statusArr = [
          {
               sttId: 0,
               style: "text-warning",
               text: "Pending"
          },
          {
               sttId: 1,
               style: "text-primary",
               text: "Cooking"
          },
          {
               sttId: 2,
               style: "text-info",
               text: "Cooked"
          },
          {
               sttId: 3,
               style: "text-secondary",
               text: "Shipping"
          },
          {
               sttId: 4,
               style: "text-success",
               text: "Shipped"
          },
     ]
     const userData = useSelector(selectUserData);

     // init the state of all product
     const [allOrders, setAllOrders] = useState([]);
     useEffect(() => {
          const getAllProductFromAPI = async () => {
               const [data, error] = await OrderService.getAllOrderByUserID(userData.user.subject);
               if (data) {
                    console.log(data);
                    setAllOrders(data)
               }
               if (error) {
                    console.log(error);
               }
          };
          getAllProductFromAPI();
     }, [userData.user.subject]);
     return (
          <div className={cx('container-fluid', 'px-5')}>
               <div className={cx('row')}>
                    <div className={cx("col-12")}>
                         <p className={cx('h1', 'text-head', 'py-3', 'text-center')}>List <b>Orders</b></p>
                    </div>
                    <table className={cx("table", "table-striped", 'table-borderless')}>
                         <thead>
                              <tr>
                                   <th scope='col' className={cx('text-black')}>#</th>
                                   <th scope='col' className={cx('text-black')}>Customer name</th>
                                   <th scope='col' className={cx('text-black')}>Restaurant name</th>
                                   <th scope='col' className={cx('text-black')}>Location</th>
                                   <th scope='col' className={cx('text-black')}>Status</th>
                                   <th scope='col' className={cx('text-black')}>Total</th>
                                   <th scope='col' className={cx('text-black')}>View Details</th>
                              </tr>
                         </thead>
                         <tbody>
                              {
                                   allOrders.length > 0 ? allOrders.map((e, i) => {
                                        return (
                                             <tr key={i} >
                                                  <th scope="row">{i + 1}</th>
                                                  <td>{e.delivered_user}</td>
                                                  <td>{e.restaurant.name}</td>
                                                  <td>{e.delivered_address}</td>
                                                  {
                                                       statusArr.map((status, index) => {
                                                            if (status.sttId === e.status) {
                                                                 return (
                                                                      <td className={status.style}>
                                                                           <GoPrimitiveDot /> {status.text}
                                                                      </td>
                                                                 )
                                                            }
                                                       })
                                                  }

                                                  <td>{formatPrice(e.total_price)}</td>
                                                  <td><Link className='btn btn-success rounded-0' to={`/list_orderded/${e.id}`}>View Details</Link></td>
                                             </tr>
                                        )
                                   }) :
                                        <>
                                             <p>Nothing To Show, <Link to={"/"}>Click Here To Continue </Link></p>
                                        </>
                              }

                         </tbody>
                    </table>
               </div>
          </div>
     )
}

export default ListOrdered