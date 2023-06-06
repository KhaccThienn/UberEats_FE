import React from 'react'
import classNames from 'classnames/bind'
import dateFormat from 'dateformat'
import { GoPrimitiveDot } from 'react-icons/go'
import { FaEye } from 'react-icons/fa'
import { MdOutlineCancel } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { io } from "socket.io-client";
import Swal from 'sweetalert2'
import styles from './orderDetails.module.css'
import { selectUserData } from '../../../../redux/reducers/users'
import * as OrderService from "../../../../services/OrderService"

const socket = io(process.env.REACT_APP_URL_API);
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
               style: "text-dark",
               text: "Picked"
          },
          {
               sttId: 4,
               style: "text-secondary",
               text: "Shipping"
          },
          {
               sttId: 5,
               style: "text-success",
               text: "Shipped"
          },
     ]
     const [reload, setReload] = useState(false)
     const userData = useSelector(selectUserData);

     const handleCancelOrdered = async (orderId) => {
          const choose = await Swal.fire({
               title: "Do You Want Cancel This Order ?",
               showDenyButton: true,
               confirmButtonText: "Yes",
               denyButtonText: "No",
          });
          if (choose.isConfirmed) {
               const [data, error] = await OrderService.deleteOrder(orderId);
               if (data) {
                    socket.emit("canceledOrder", { orderId, userData })
                    Swal.fire({
                         position: 'top-end',
                         icon: 'success',
                         title: 'You are already cancelled this order',
                         showConfirmButton: false,
                         timer: 1500
                    })
                    setReload(!reload)
               }
               if (error) {
                    Swal.fire({
                         position: 'top-end',
                         icon: 'error',
                         title: 'Having Some Errors When Calling API',
                         showConfirmButton: false,
                         timer: 1500
                    })
               }
          }

     }

     const getAllProductFromAPI = async () => {
          const [data, error] = await OrderService.getAllOrderByUserID(userData.user.subject);
          if (data) {
               console.log(data);
               setAllOrders(data.sort((a, b) => b.id - a.id))
          }
          if (error) {
               console.log(error);
          }
     };
     socket.on("updateOrderStatusClient", (data) => {
          data ? console.log(data) : console.log("hehe");
          getAllProductFromAPI()
     })

     socket.on("updateOrderStatusDeliver", (data) => {
          data ? console.log(data) : console.log("hehe");
          getAllProductFromAPI()
     })

     socket.on("deliverUpdateOrderStatus", (data) => {
          data ? console.log(data) : console.log("hehe");
          getAllProductFromAPI()
     })

     socket.on("updateDeliver", (data) => {
          data ? console.log(data) : console.log("hehe");
          getAllProductFromAPI()
     })
     socket.on("deliverShippingOrder", (data) => {
          data ? console.log(data) : console.log("hehe");
          getAllProductFromAPI()
     })
     socket.on("deliverShippedOrder", (data) => {
          data ? console.log(data) : console.log("hehe");
          getAllProductFromAPI()
     })

     // init the state of all product
     const [allOrders, setAllOrders] = useState([]);
     useEffect(() => {
          getAllProductFromAPI();
     }, [userData.user.subject, reload]);
     return (
          <div className={cx('container-fluid', 'px-5')}>
               <div className={cx('row')}>
                    {
                         allOrders.length == 0 ?
                              <div className='text-center p-5'>
                                   <Link to={"/"} className='btn rounded-0 btn-outline-success'>&lt; Nothing to show, Click here to continue shopping</Link>
                              </div> :
                              <>
                                   <div className={cx("col-12")}>
                                        <p className={cx('h1', 'text-head', 'py-3', 'text-center')}>List <b>Orders</b></p>
                                   </div>
                                   <table className={cx("table", "table-striped", 'table-borderless')}>
                                        <thead>
                                             <tr>
                                                  <th scope='col' className={cx('text-black')}>#</th>
                                                  <th scope='col' className={cx('text-black')}>OrderID</th>
                                                  <th scope='col' className={cx('text-black')}>Customer name</th>
                                                  <th scope='col' className={cx('text-black')}>Restaurant name</th>
                                                  <th scope='col' className={cx('text-black')}>Location</th>
                                                  <th scope='col' className={cx('text-black')}>Status</th>
                                                  <th scope='col' className={cx('text-black')}>Date Created</th>
                                                  <th scope='col' className={cx('text-black')}>Estimated Date</th>
                                                  <th scope='col' className={cx('text-black')}>Shipper</th>
                                                  <th scope='col' className={cx('text-black')}>Total</th>
                                                  <th scope='col' className={cx('text-black')}></th>
                                             </tr>
                                        </thead>
                                        <tbody>
                                             {
                                                  allOrders.map((e, i) => {
                                                       return (
                                                            <tr key={i} >
                                                                 <th scope="row">{i + 1}</th>
                                                                 <td>{e.id}</td>
                                                                 <td>{e.delivered_user}</td>
                                                                 <td>{e.restaurant.name}</td>
                                                                 <td>{e.delivered_address}</td>
                                                                 {
                                                                      statusArr.map((status, index) => {
                                                                           if (status.sttId === e.status) {
                                                                                return (
                                                                                     <td className={status.style} key={index}>
                                                                                          <GoPrimitiveDot /> {status.text}
                                                                                     </td>
                                                                                )
                                                                           }
                                                                      })
                                                                 }
                                                                 {/* unavailable */}
                                                                 <td>{dateFormat(e.created_at)}</td>
                                                                 {
                                                                      e.status < 5 &&
                                                                      <td>
                                                                           {e.estimated_time ? dateFormat(e.estimated_time) : "Unavailable"}
                                                                      </td>
                                                                 }

                                                                 {
                                                                      e.status === 5 &&
                                                                      <td>
                                                                           Shipped At: {dateFormat(e.estimated_time)}
                                                                      </td>
                                                                 }

                                                                 <td>{e.driver ? e.driver?.userName : "Unavailable"}</td>

                                                                 <td>{formatPrice(e.total_price)}</td>
                                                                 <td className={cx('text-right','w-15')}>
                                                                      <div className='d-flex justify-content-end'>
                                                                           <Link className='btn btn-success rounded-0 mr-2' to={`/list_orderded/${e.id}`}><FaEye /> View</Link>
                                                                           <button
                                                                                onClick={() => handleCancelOrdered(e.id)}
                                                                                disabled={e.status !== 0}
                                                                                className={e.status !== 0 ? cx('btn btn-danger rounded-0', "cursor-disabled") : cx('btn btn-danger rounded-0')}
                                                                           >
                                                                                <MdOutlineCancel /> Cancel
                                                                           </button>
                                                                      </div>
                                                                 </td>

                                                            </tr>
                                                       )
                                                  })
                                             }

                                        </tbody>
                                   </table>
                              </>
                    }

               </div>
          </div >
     )
}

export default ListOrdered