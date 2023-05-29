/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useState } from 'react'
import styles from './deliver.module.css'
import classNames from 'classnames/bind'
import * as OrderService from "../../../services/OrderService";
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { DirectionsRenderer, GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

let cx = classNames.bind(styles)
const center = { lat: 21.030653, lng: 105.847130 }


function Dashboard() {
     const formatPrice = (price) => {
          return price.toLocaleString('en-US', {
               style: 'currency',
               currency: 'USD',
               minimumFractionDigits: 2,
          });
     };
     const [listOrders, setListOrders] = useState([]);
     const { isLoaded } = useJsApiLoader({
          googleMapsApiKey: 'AIzaSyDKlrInmKV4Mrnv3m5T-CXXDG0-J7bCFtQ',
          libraries: ['places']
      })
     const [map, setMap] = useState(/**  @type google.maps.Map */(null));

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
                              <Marker position={center} />

                         </GoogleMap>
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
                                                                 <Link to={`/${e.id}`} onClick={handleAccept} className={cx('btn', 'btn-success', 'rounded-0', 'btn-sm')}>
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