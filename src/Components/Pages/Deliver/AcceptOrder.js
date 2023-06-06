/* eslint-disable jsx-a11y/iframe-has-title */
import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { io } from 'socket.io-client';
import dateFormat from 'dateformat';
import { DirectionsRenderer, GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useRef } from 'react';

import { selectUserData } from '../../../redux/reducers/users';
import * as OrderService from "../../../services/OrderService";
import * as UserService from "../../../services/UserService";

import styles from './deliver.module.css';

const socket = io(process.env.REACT_APP_URL_API);

let cx = classNames.bind(styles)
const center = { lat: 21.030653, lng: 105.847130 }

const formatPrice = (price) => {
     return price?.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
     });
};
const estimatedDate = (duration_hour, duration_minutes) => {
     const date = new Date();
     const year = date.getFullYear();
     const month = date.getMonth() + 1;
     const day = date.getDate();

     const hour = date.getHours() + 7 + duration_hour;
     const minute = date.getMinutes() + duration_minutes;
     const second = date.getSeconds();

     return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}
const currentTime = () => {
     const date = new Date();
     const year = date.getFullYear();
     const month = date.getMonth() + 1;
     const day = date.getDate();

     const hour = date.getHours() + 7;
     const minute = date.getMinutes();
     const second = date.getSeconds();

     return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}
function AcceptOrder({ orderId }) {

     const date_now = new Date();
     const { isLoaded } = useJsApiLoader({
          googleMapsApiKey: process.env.REACT_APP_API_MAP_KEY,
          libraries: ['places']
     })
     const [map, setMap] = useState(/**  @type google.maps.Map */(null));
     const [directionsResponse, setDirectionsResponse] = useState(null)
     const [distance, setDistance] = useState('')
     const [duration, setDuration] = useState('')

     const [estimated_time, setEstimatedTime] = useState({
          hour: 0,
          minutes: 0,
          seconds: 0,
     })

     const [center, setCenter] = useState({ lat: "", lng: "" });

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
     const [reload, setReload] = useState(false);

     function extractTimeComponents(input) {
          const timeRegex = /(\d+)\s*hour[s]*\s*(\d+)\s*min[s]*/;
          if (!input.toString().match(timeRegex)) {
               input = "0 hour " + input
          }
          console.log(input);
          const matches = input.match(timeRegex);
          console.log(matches);
          if (matches) {
               const hours = parseInt(matches[1]);
               const minutes = parseInt(matches[2]);

               // Tính số giây

               return {
                    hours: hours,
                    minutes: minutes,
               };
          }

          return null; // Trả về null nếu không tìm thấy
     }
     const handlePickedUp = async (orderId, deliverId, currentStatus, duration) => {
          // Hàm trích xuất số giờ, số phút và số giây từ dữ liệu đầu vào
          const estimated_date = extractTimeComponents(duration);
          console.log(estimated_date);
          const orderData = {
               status: currentStatus + 1,
               estimated_time: estimatedDate(estimated_date.hours, estimated_date.minutes)
          }
          console.log(orderData);
          const [data, error] = await OrderService.updateOrderStatus(orderId, orderData);
          if (data) {
               socket.emit("deliverPickupOrder", { orderId, deliverId, orderData, duration });
               setReload(!reload);
               console.log(data);
          }
          if (error) {
               console.log(error);
          }
     }

     const handleUpdateStatus = async (orderId, deliverId, currentStatus) => {
          const orderData = {
               status: currentStatus + 1
          }
          const [data, error] = await OrderService.updateOrderStatus(orderId, orderData);
          if (data) {
               socket.emit("deliverPickupOrder", { orderId, deliverId, orderData });
               setReload(!reload);
               console.log(data);
          }
          if (error) {
               console.log(error);
          }
     }

     const handleShipped = async (orderId, deliverId, currentStatus) => {
          const orderData = {
               status: currentStatus + 1,
               estimated_time: currentTime()
          }
          const [data, error] = await OrderService.updateOrderStatus(orderId, orderData);
          if (data) {
               socket.emit("deliverShipped", { orderId, deliverId, orderData, shippedDate: currentTime() });
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
     }

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

          let watchId;

          const successCallback = async (position) => {
               const { latitude, longitude } = position.coords;
               const currentLocation = {
                    lat: latitude,
                    lng: longitude
               }
               setCenter(currentLocation);
               const orderData = {
                    delivered_from: currentLocation
               }
               const [data, error] = await OrderService.updateOrderStatus(orderId, orderData);
               if (data) {
                    console.log(data);
               }
               if (error) {
                    console.log(error);
               }
          };

          const errorCallback = (error) => {
               console.error(error);
          };

          if (navigator.geolocation) {
               watchId = navigator.geolocation.watchPosition(successCallback, errorCallback);
          } else {
               console.error('Geolocation is not supported by this browser.');
          }


          getProfileData(userData.user.subject);
          getOrderByOrderID();

          return () => {
               if (navigator.geolocation) {
                    navigator.geolocation.clearWatch(watchId);
               }
          };

     }, [orderId, userData.user.subject, desRef, oriRef, reload]);

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
                                   zoomControl: true,
                                   streetViewControl: true,
                                   mapTypeControl: true,
                                   fullscreenControl: true,
                                   panControl: true,
                              }}
                              onLoad={map => { setMap(map) }}

                         >
                              <Marker
                                   position={center}
                                   title='Your Location'
                                   cursor='pointer'
                              /*  eslint-disable-next-line no-undef */
                              />
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
                                        <div className={cx('d-flex', 'justify-content-end')}>
                                             <button className={cx('btn', 'btn-outline-secondary', 'rounded-0')} onClick={calculateRoute}>Calculate Route</button>
                                        </div>
                                   }
                                   {

                                        (duration && orderDetail.status == 2) &&
                                        <div className={cx('d-flex', 'justify-content-between')}>
                                             <button className='btn btn-block btn-success rounded-0' onClick={() => handlePickedUp(orderId, userData.user.subject, orderDetail.status, duration)}>Picked Up</button>
                                        </div>
                                   }
                                   {
                                        orderDetail.status == 3 &&
                                        <div className={cx('d-flex', 'justify-content-between')}>
                                             <button className='btn btn-block btn-success rounded-0' onClick={() => handleUpdateStatus(orderId, userData.user.subject, orderDetail.status, duration)}>Start Shipping</button>
                                        </div>
                                   }
                                   {
                                        orderDetail.status == 4 &&
                                        <div className={cx('d-flex', 'justify-content-between')}>
                                             <button className='btn btn-block btn-success rounded-0' onClick={() => handleShipped(orderId, userData.user.subject, orderDetail.status)}>Shipped</button>
                                        </div>
                                   }
                                   {
                                        orderDetail.status == 5 &&
                                        <div className={cx('d-flex', 'justify-content-between')}>
                                             <Link to={"/"} className='btn btn-block btn-success rounded-0'>Thanks For Using Our Application, Click To View Others Order</Link>
                                        </div>
                                   }
                              </div>
                         </div>
                    </div>
               </div >
          </div>


     )
}

export default AcceptOrder