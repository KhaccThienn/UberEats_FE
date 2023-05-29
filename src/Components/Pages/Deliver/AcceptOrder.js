/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useState } from 'react'
import styles from './deliver.module.css'
import classNames from 'classnames/bind'
import * as OrderService from "../../../services/OrderService";
import * as UserService from "../../../services/UserService";
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../../redux/reducers/users';
import { Link } from 'react-router-dom';
import { io } from 'socket.io-client';

const socket = io("http://localhost:8000");

import { useRef } from 'react';
import { DirectionsRenderer, GoogleMap, useJsApiLoader } from '@react-google-maps/api';

let cx = classNames.bind(styles)
const center = { lat: 21.030653, lng: 105.847130 }

const formatPrice = (price) => {
     return price?.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
     });
};
function AcceptOrder({ orderId }) {

     const { isLoaded } = useJsApiLoader({
          googleMapsApiKey: 'AIzaSyDKlrInmKV4Mrnv3m5T-CXXDG0-J7bCFtQ',
          libraries: ['places']
     })
     const [map, setMap] = useState(/**  @type google.maps.Map */(null));
     const [directionsResponse, setDirectionsResponse] = useState(null)
     const [distance, setDistance] = useState('')
     const [duration, setDuration] = useState('')
     /** @type React.MultableRefObject<HTMLInputElement> */
     const oriRef = useRef()

     /** @type React.MultableRefObject<HTMLInputElement> */
     const desRef = useRef()
     const userData = useSelector(selectUserData);
     const initProfileState = {
          avatar: "",
          userName: "",
          phone: "",
          email: "",
          address: "",
     };
     const [profile, setProfile] = useState(initProfileState);

     const [orderDetail, setOrderDetail] = useState({});
     const [reload, setReload] = useState(false)

     const handleUpdateStatus = async (orderId) => {
          const orderData = {
               status: 4
          }
          const [data, error] = await OrderService.updateOrderStatus(orderId, orderData);
          if (data) {
               socket.emit("deliverAcceptOrder", orderData);
               setReload(!reload);
               console.log(data);
          }
          if (error) {
               console.log(error);
          }
     }

     console.log("OrderId: ", orderId);
     const calculateRoute = async (e) => {

          if (oriRef.current.value === '' || desRef.current.value === '') {
               return
          }
          // eslint-disable-next-line no-undef
          const directionService = new google.maps.DirectionsService()
          const results = await directionService.route({
               origin: oriRef.current.value,
               destination: desRef.current.value,
               // eslint-disable-next-line no-undef
               travelMode: google.maps.TravelMode.DRIVING
          })
          setDirectionsResponse(results)
          setDistance(results.routes[0].legs[0].distance.text)
          setDuration(results.routes[0].legs[0].duration.text)

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


     }, [orderId, userData.user.subject, desRef, oriRef]);
     if (!isLoaded) {
          return
     }

     return (
          <div className={cx('container-fluid', 'px-5', 'py-5')}>
               <div className={cx('row', 'justify-content-around')}>
                    <div className={cx('col-6')}>
                         <GoogleMap
                              center={center}
                              zoom={12}
                              mapContainerStyle={{ width: '100%', height: '85vh' }}
                              options={{
                                   zoomControl: false,
                                   streetViewControl: false,
                                   mapTypeControl: false,
                                   fullscreenControl: false,
                              }}
                              onLoad={map => { setMap(map) }}

                         >
                              {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
                         </GoogleMap>
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
                                   <div className={cx('d-flex')}>
                                        <p className={cx('h5', 'mr-5')}>From: {orderDetail.restaurant?.address}</p>
                                        <input type='hidden' defaultValue={orderDetail.restaurant?.address} ref={oriRef} />
                                        <p className={cx('h5', 'ml-5')}>To: {orderDetail.delivered_address}</p>
                                        <input type='hidden' defaultValue={orderDetail.delivered_address} ref={desRef} />
                                   </div>
                                   <hr />
                                   {distance && duration ?
                                        <div className={cx('d-flex')}>
                                             <p className={cx('h5', 'mr-5')}>Distance: {distance}</p>
                                             <p className={cx('h5', 'ml-5')}>Duration: {duration}</p>
                                        </div>

                                        :
                                        <div className={cx('d-flex','justify-content-end')}>
                                             <button className={cx('btn', 'btn-outline-secondary','rounded-0')} onClick={calculateRoute}>Calculate Route</button>
                                        </div>
                                   }
                                   {
                                        orderDetail.status === 3 ?
                                             <div className={cx('d-flex', 'justify-content-between')}>
                                                  <button className='btn btn-block btn-success rounded-0' onClick={() => handleUpdateStatus(orderId)}>Order Shipped</button>
                                             </div>
                                             :
                                             <div className={cx('d-flex', 'justify-content-between')}>
                                                  <Link to={"/"} className='btn btn-block btn-success rounded-0'>Thanks For Our Application, Click Here To Return</Link>
                                   }
                              </div>
                         </div>
                    </div>
               </div>
          </div >

     )
}

export default AcceptOrder