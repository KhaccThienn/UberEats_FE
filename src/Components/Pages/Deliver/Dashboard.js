/* eslint-disable jsx-a11y/iframe-has-title */
import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { io } from "socket.io-client";
import Swal from 'sweetalert2';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { selectUserData } from '../../../redux/reducers/users';
import * as OrderService from "../../../services/OrderService";
import styles from './deliver.module.css';
import GetMarker from './GetMarker';
import homeicon from '../../../images/homeicon.png'


const socket = io(process.env.REACT_APP_URL_API);
let cx = classNames.bind(styles)

const defaultPlace = { lat: 21.246097, lng: 105.781977 }

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
                    status: status
               }
               const [data, error] = await OrderService.updateOrderDelivery(orderId, userData.user.subject, orderData);
               console.log(data);
               socket.emit("deliverAcceptOrder", { orderId, userData, orderData });
               navigate(`/${orderId}`)
               if (data) { }
               if (error) {
                    console.log(error);
               }
          }
     }


     const { isLoaded } = useJsApiLoader({
          googleMapsApiKey: process.env.REACT_APP_API_MAP_KEY,
          libraries: ['places']
     })
     const [map, setMap] = useState(/**  @type google.maps.Map */(null));
     // eslint-disable-next-line react-hooks/exhaustive-deps
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

     if (!isLoaded) {
          return
     }

     return (
          <div className={cx('container-fluid', 'px-5', 'py-5')}>
               <div className={cx('row', 'justify-content-around')}>
                    <div className={cx('col-6')}>

                         <GoogleMap
                              center={defaultPlace}
                              zoom={11}
                              mapContainerStyle={{ width: '100%', height: '85vh' }}
                              options={{
                                   // zoomControl: false,
                                   // streetViewControl: false,
                                   // mapTypeControl: false,
                                   // fullscreenControl: false,

                              }}
                              onLoad={map => { setMap(map) }}
                         >
                              <Marker
                                   position={defaultPlace}
                                   title='Sieu thi nao do?'
                                   /*  eslint-disable-next-line no-undef */
                                   icon={homeicon}
                              />
                              {listPendingOrders.map((e, i) => {
                                   return (
                                        <GetMarker key={i} address={e.restaurant.address} name={e.restaurant.name} />
                                   )
                              })}
                         </GoogleMap>
                    </div>
                    <div className={cx('col-6')}>
                         {
                              listPendingOrders.length > 0 ?
                                   <div className={cx('text-left')}>
                                        <p className={cx('h1', 'font-weight-bold', 'text-center')}>New cooked order</p>
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
                                   <p className={cx('text-center', 'display-4', 'font-weight-bold', 'py-5')}>No order yet</p>

                         }
                    </div>
               </div>
          </div>
     )
}
export default Dashboard;
