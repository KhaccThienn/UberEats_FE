import React, { useEffect, useRef, useState } from "react";
import { useParams } from 'react-router-dom';
import * as OrderDetailsService from "../../../../services/OrderDetailsService";

import { DirectionsRenderer, GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import classNames from "classnames/bind";
import geocode from 'react-geocode';
import styles from './order.module.css';
import { GoPrimitiveDot } from "react-icons/go";

const cx = classNames.bind(styles);

function OrderDetails() {
    const formatPrice = (price) => {
        return price.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
        });
    };
    const { id } = useParams();
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
    const initOrderInfo = {
        delivered_address: '',
        delivered_phone: '',
        delivered_user: '',
        delivered_from: {},
        id: '',
        note: '',
        status: '',
        total_price: '',
    }

    const [orderInfo, setOrderInfo] = useState(initOrderInfo);
    const [products, setProducts] = useState([]);
    const [showMap, setShowMap] = useState(false);

    geocode.setApiKey(process.env.REACT_APP_API_MAP_KEY);
    geocode.enableDebug()

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_API_MAP_KEY,
        libraries: ['places']
    })

    const [map, setMap] = useState(/**  @type google.maps.Map */(null));
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')

    const [userAddress, setUserAddress] = useState(null)

    /** @type React.MultableRefObject<HTMLInputElement> */
    const oriRef = useRef()

    /** @type React.MultableRefObject<HTMLInputElement> */
    const desRef = useRef()

    const calculateRoute = async (e) => {
        setShowMap(!showMap)
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

    const convertCoordinatesToLocation = async (lat, lng) => {

        try {
            const response = await geocode.fromLatLng(lat, lng);
            console.log(response)
            console.log(response.plus_code.compound_code.split(' ').slice(1).join(" "));
            return [response.plus_code.compound_code, null]
        } catch (error) {
            return [null, error]
        }
    };

    const getAddressData = async () => {
        const [address, error] = await convertCoordinatesToLocation(orderInfo.delivered_from.lat, orderInfo.delivered_from.lng);
        if (address) {
            setUserAddress(address)
            console.log(address);
        }
        if (error) {
            console.log(error);
        }
    }
    console.log(orderInfo.delivered_from);
    if (orderInfo.delivered_from?.lat) {
        getAddressData()
    }


    useEffect(() => {

        const getOrderInfoByID = async () => {
            const [data, error] = await OrderDetailsService.getOrderInfoByID(id);
            if (data) {
                console.log("OrderInfoByID", data);
                setOrderInfo(data)
            }
            if (error) {
                console.log(error);
            }
        }
        const getListProducts = async () => {
            const [data, error] = await OrderDetailsService.getAllOrderDTByOrder(id);
            if (data) {
                setProducts(data);
            }
            if (error) {
                console.log(error);
            }
        }
        getOrderInfoByID();
        getListProducts();
    }, [id]);

    if (!isLoaded) {
        return
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-12">
                    <div className="iq-card">
                        <div className="iq-card-header d-flex justify-content-between">
                            <div className="iq-header-title">
                                <h4 className="card-title">Order Details</h4>
                            </div>
                        </div>
                        <div className="iq-card-body">
                            {
                                (orderInfo.status >= 2 && orderInfo.status <= 4) &&
                                <div className="mb-5">
                                    {distance && duration ?
                                        <div className={cx('d-flex')}>
                                            <p className={cx('h5', 'mr-5')}>Distance: {distance}</p>
                                            <p className={cx('h5', 'ml-5')}>Duration: {duration}</p>
                                        </div>
                                        :
                                        <div className={cx('d-flex')}>
                                            <button className={cx('btn', 'btn-outline-secondary', 'rounded-0')} onClick={calculateRoute}>Show Map</button>
                                        </div>
                                    }
                                    <div className={cx('d-flex')}>
                                        <input type='hidden' defaultValue={userAddress} ref={oriRef} />
                                        <input type='hidden' defaultValue={orderInfo.delivered_address} ref={desRef} />
                                    </div>
                                    {
                                        (orderInfo.delivered_from && showMap) &&
                                        <GoogleMap
                                            zoom={12}
                                            mapContainerStyle={{ width: '100%', height: '80vh' }}
                                            options={{
                                                zoomControl: true,
                                                streetViewControl: true,
                                                mapTypeControl: true,
                                                fullscreenControl: true,
                                                panControl: true,
                                            }}
                                            onLoad={map => { setMap(map) }}

                                        >
                                            {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
                                        </GoogleMap>
                                    }
                                </div>

                            }

                            <div className="row">
                                <div className="col-lg-6">

                                    <div className="iq-header-title">
                                        <h4 className="card-title">Order Information</h4>
                                    </div>

                                    <div className="iq-card-body p-0">
                                        <div className="table-responsive">
                                            <table className="table table-striped table-bordered">
                                                <tr>
                                                    <th>ID. </th>
                                                    <td>{orderInfo.id}</td>
                                                </tr>

                                                <tr>
                                                    <th>Total Price </th>
                                                    <td>{formatPrice(orderInfo.total_price)}</td>
                                                </tr>
                                                <tr>
                                                    <th>Status </th>
                                                    {
                                                        statusArr.map((status, index) => {
                                                            if (status.sttId === orderInfo.status) {
                                                                return (
                                                                    <td className={status.style} key={index}>
                                                                        <GoPrimitiveDot /> {status.text}
                                                                    </td>
                                                                )
                                                            }
                                                        })
                                                    }
                                                </tr>
                                                <tr>
                                                    <th>Shipper Information: </th>
                                                    <td>{orderInfo.driver ? `${orderInfo.driver.userName} (${orderInfo.driver.phone})` : 'Not Have Yet'}</td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="iq-header-title">
                                        <h4 className="card-title">Customer information</h4>
                                    </div>
                                    <div className="iq-card-body p-0">
                                        <div className="table-responsive">
                                            <table className="table table-striped table-bordered">
                                                <tr>
                                                    <th>Name. </th>
                                                    <td>{orderInfo.delivered_user}</td>
                                                </tr>
                                                <tr>
                                                    <th>Phone </th>
                                                    <td>{orderInfo.delivered_phone}</td>
                                                </tr>
                                                <tr>
                                                    <th>Address </th>
                                                    <td>{orderInfo.delivered_address}</td>
                                                </tr>
                                                <tr>
                                                    <th>Note </th>
                                                    <td>{orderInfo.note}</td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="iq-card">
                        <div className="iq-card-header d-flex justify-content-between">
                            <div className="iq-header-title">
                                <h4 className="card-title">List Products In This Order</h4>
                            </div>
                        </div>
                        <div className="iq-card-body">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="iq-card-body p-0">
                                        <div className="table-responsive">
                                            <table className="table table-striped table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>ID.</th>
                                                        <th>Name</th>
                                                        <th>Image</th>
                                                        <th>Price</th>
                                                        <th>Sale Price</th>
                                                        <th>Quantity</th>
                                                        <th>Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        products && products.map((e, i) => {
                                                            return (
                                                                <tr key={i}>
                                                                    <td>{e.product.id}</td>
                                                                    <td>{e.product.name}</td>
                                                                    <td className={cx('w-15')}>
                                                                        <img src={e.product.image} alt={e.product.name} className={cx('card-img')} />
                                                                    </td>
                                                                    <td> {formatPrice(e.product.price)}</td>
                                                                    <td> {formatPrice(e.product.sale_price)}</td>
                                                                    <td>{e.quantity}</td>
                                                                    <td> {formatPrice(e.total)}</td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderDetails;
