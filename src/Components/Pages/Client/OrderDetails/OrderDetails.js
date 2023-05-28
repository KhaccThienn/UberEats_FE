import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import * as OrderDetailsService from "../../../../services/OrderDetailsService"

import classNames from "classnames/bind";
import styles from './order.module.css'

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
    const initOrderInfo = {
        delivered_address: '',
        delivered_phone: '',
        delivered_user: '',
        id: '',
        note: '',
        status: '',
        total_price: '',
    }

    const [orderInfo, setOrderInfo] = useState(initOrderInfo);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getOrderInfoByID = async () => {
            const [data, error] = await OrderDetailsService.getOrderInfoByID(id);
            if (data) {
                setOrderInfo(data)
            }
            if (error) {
                console.log(error);
            }
        }
        const getListProducts = async () => {
            const [data, error] = await OrderDetailsService.getAllOrderDTByOrder(id);
            if (data) {
                console.log(data);
                setProducts(data);
            }
            if (error) {
                console.log(error);
            }
        }
        getOrderInfoByID();
        getListProducts();
    }, [id])

    return (
        <div>
            <div className="row">
                <div className="col-sm-12">
                    <div className="iq-card">
                        <div className="iq-card-header d-flex justify-content-between">
                            <div className="iq-header-title">
                                <h4 className="card-title">Order Details</h4>
                            </div>
                        </div>
                        <div className="iq-card-body">
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
                                                    <td>{orderInfo.total_price}</td>
                                                </tr>
                                                <tr>
                                                    <th>Status </th>
                                                    <td>{orderInfo.status}</td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="iq-header-title">
                                        <h4 className="card-title">Shipment Details</h4>
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
                                <h4 className="card-title">List Products</h4>
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
