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

// const center = { lat: 21.246090, lng: 105.7818487 }


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
     const [center, setCenter] = useState({ lat: "", lng: "" });

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
               const newListPendingOrdered = data.filter((item) => (item.status === 2 || item.status === 3 || item.status === 4) && ((item.driver && (item.driver.id === userData.user.subject)) || item.driver === null));
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
     socket.on("updateDeliver", (data) => {
          data ? console.log(data) : console.log("hehe");
          getListOrderedFromAPI()
     })

     useEffect(() => {
          let watchId;

          const successCallback = (position) => {
               const { latitude, longitude } = position.coords;
               setCenter({
                    lat: latitude,
                    lng: longitude
               })
          };

          const errorCallback = (error) => {
               console.error(error);
          };

          if (navigator.geolocation) {
               watchId = navigator.geolocation.watchPosition(successCallback, errorCallback);
          } else {
               console.error('Geolocation is not supported by this browser.');
          }

          getListOrderedFromAPI();
          return () => {
               if (navigator.geolocation) {
                    navigator.geolocation.clearWatch(watchId);
               }
          };
     }, [userData.user.subject]);

     if (!isLoaded) {
          return
     }

     return (
          <div className={cx('container-fluid', 'px-5', 'py-5')}>
               <div className={cx('row', 'justify-content-around')}>
                    <div className={cx('col-6')}>

                         <GoogleMap
                              center={center}
                              zoom={20}
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
                                   icon={homeicon}
                                   options={{}}
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
                                   <>
                                        <p className={cx('h1', 'font-weight-bold', 'text-center')}>New cooked order</p>
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
                                                                           (e.status == 2 && e.driver == null) && <button onClick={() => handleAccept(e.id, e.status)} className={cx('btn', 'btn-success', 'rounded-0', 'btn-sm')}>
                                                                                Accept challenge &rarr;
                                                                           </button>
                                                                      }
                                                                      {
                                                                           (e.status == 2 && e.driver !== null) &&
                                                                           <Link to={`/${e.id}`} className={cx('btn', 'btn-success', 'rounded-0', 'btn-sm')}>
                                                                                View Order &rarr;
                                                                           </Link>
                                                                      }
                                                                      {
                                                                           (e.status == 3 && e.driver !== null) &&
                                                                           <Link to={`/${e.id}`} className={cx('btn', 'btn-success', 'rounded-0', 'btn-sm')}>
                                                                                View Order &rarr;
                                                                           </Link>
                                                                      }
                                                                      {
                                                                           (e.status == 4 && e.driver !== null) &&
                                                                           <Link to={`/${e.id}`} className={cx('btn', 'btn-success', 'rounded-0', 'btn-sm')}>
                                                                                View Order &rarr;
                                                                           </Link>
                                                                      }
                                                                 </div>
                                                            </div>
                                                       )
                                                  })
                                             }
                                        </div>
                                   </> :
                                   <p className={cx('text-center', 'display-4', 'font-weight-bold', 'py-5')}>No order yet</p>

                         }
                    </div>
               </div>
          </div>
     )
}
export default Dashboard;
