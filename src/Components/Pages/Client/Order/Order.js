import React, { useEffect, useState } from 'react'
import styles from './order.module.css'
import classNames from 'classnames/bind'
import food1 from '../../../../images/food1.png'
import { AiOutlineCreditCard } from 'react-icons/ai'
import { selectUserData, setUser } from '../../../../redux/reducers/users'
import { useSelector } from 'react-redux'
import * as CartService from '../../../../services/CartService'
import * as UserService from '../../../../services/UserService'
import * as OrderService from '../../../../services/OrderService'
import * as VoucherService from '../../../../services/VoucherService'
import Swal from 'sweetalert2'


let cx = classNames.bind(styles);

function Order() {
    const initProfileState = {
        userName: "",
        phone: "",
        address: "",
    };
    const initPostCheckout = {
        userName: "",
        address: "",
        phone: "",
        note: ''
    }
    const userData = useSelector(selectUserData);
    const [total, setTotal] = useState(0);
    const [products, setProducts] = useState([]);
    const [userProfile, setUserProfile] = useState(initProfileState);
    const [resId, setResId] = useState(0);
    const [vouchers, setVouchers] = useState([]);
    const [postData, setPostData] = useState(initPostCheckout)

    const handlePostCheckout = async () => {

        const createOrder = {
            delivered_user: postData.userName ? postData.userName : userProfile.userName,
            delivered_address: postData.address ? postData.address : userProfile.address,
            delivered_phone: postData.phone ? postData.phone : userProfile.phone,
            note: postData.note,
            status: 0,
            carts: products,
            userId: userData.user.subject
        }

        const [data, error] = await OrderService.postCheckoutData(createOrder);
        if (data) {
            console.log("Checkout Success", data);
        }
        if (error) {
           
        }
    }

    const handleChangeProfile = (e) => {
        const { name, value } = e.target;
        setPostData({ ...postData, [name]: value })
    }

    useEffect(() => {
        const getCartFromAPI = async () => {
            const [data, error] = await CartService.getAllCartByUser(userData.user.subject);
            if (data) {
                setProducts(data.carts);
                setTotal(data.result.total);
                setResId(data.carts[0].product.restaurant.id);
            }
            if (error) {
                console.log(error);
            }
        }
        const getClientData = async () => {
            const [data, error] = await UserService.getUserProfile(userData.user.subject);
            if (data) {
                setUserProfile(data)
            }
            if (error) {
                console.log(error);
            }
        }
        const getListVouchers = async (resId) => {
            const [data, error] = await VoucherService.getVoucherByRestaurantId(resId);
            if (data) {
                setVouchers(data)
            }
            if (error) {
                console.log(error);
            }
        }
        getClientData();
        getCartFromAPI();
        getListVouchers(resId)
    }, [userData.user.subject, resId]);


    return (
        <div className={cx('container-fluid', 'px-5')}>
            <div className={cx('row', 'justify-content-center')}>
                <div className={cx('col-lg-10')}>
                    <p className={cx('h1', 'font-weight-bold', 'text-center', 'text-uppercase', 'my-2', 'text-shadow')}>
                        checkout
                    </p>
                    <div className={cx('row')}>
                        <div className={cx('col-6')}>
                            <form method='POST'>
                                <div className={cx("card border-0", 'px-5')}>
                                    <div className={cx("card-header bg-transparent pl-0")}>
                                        <p className={cx("card-text", "text-black", "mb-2 text-uppercase h3", 'font-weight-bold')}>
                                            payment details
                                        </p>
                                    </div>
                                    <div className={cx("card-body p-0 pt-3")}>
                                        <div className={cx("form-group")}>
                                            <label htmlFor="" className={cx("h5 text-black mb-1")}>Name: </label>
                                            <input type="text"
                                                defaultValue={userProfile.userName}
                                                onChange={handleChangeProfile}
                                                className={cx("form-control rounded-0 mt-1")}
                                                name="userName" placeholder="Enter name..." />
                                        </div>
                                        <div className={cx("form-group")}>
                                            <label htmlFor="" className={cx("h5 text-black mb-1")}>Address: </label>
                                            <input type="text"
                                                onChange={handleChangeProfile}
                                                defaultValue={userProfile.address}
                                                className={cx("form-control rounded-0 mt-1")}
                                                name="address" placeholder="Enter address..." />
                                        </div>
                                        <div className={cx("form-group")}>
                                            <label htmlFor="" className={cx("h5 text-black mb-1")}>Phone number: </label>
                                            <input type="text"
                                                onChange={handleChangeProfile}
                                                defaultValue={userProfile.phone}
                                                className={cx("form-control rounded-0 mt-1")}
                                                name="phone" placeholder="Enter phone number..." />
                                        </div>
                                        <div className={cx("form-group")}>
                                            <label htmlFor="" className={cx("h5 text-black mb-1")}>Note:</label>
                                            <textarea className={cx("form-control rounded-0 mt-1")} onChange={handleChangeProfile} name="note" rows="3" placeholder='note'></textarea>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className={cx('col-6')}>
                            <div className={cx("card border-0", 'px-5')}>
                                <div className={cx("card-header bg-transparent")}>
                                    <p className={cx("card-text text-black mb-2 pl-0 text-uppercase h3")}>
                                        <b>your order</b>
                                    </p>
                                </div>
                                <div className={cx("card-body pt-0")}>
                                    {
                                        products.length > 0 ? products.map((e, i) => {
                                            return (
                                                <div className={cx("row justify-content-between align-items-center border-bottom py-2")} key={i}>
                                                    <div className={cx("col-7")}>
                                                        <div className={cx("media flex-column flex-sm-row")}>
                                                            <img className={cx('img-order')}
                                                                src={food1} alt='hehe' />
                                                            <div className={cx("media-body my-auto")}>
                                                                <div className={cx("row")}>
                                                                    <div className={cx("col-auto")}>
                                                                        <p className={cx("mb-0 ml-2")}>
                                                                            <b>{e.product.name}</b>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={cx(" pl-0 col-auto my-auto pt-3")}>
                                                        <p className="">{e.quantity}</p>
                                                    </div>
                                                    <div className={cx(" pl-0 col-auto my-auto pt-3")}>
                                                        <p className="">
                                                            ${e.total}
                                                        </p>
                                                    </div>
                                                </div>
                                            )
                                        }) : <>Nothing To Show</>
                                    }

                                    <div className={cx("row")}>
                                        <div className={cx("col border-bottom")}>
                                            <div className={cx("row justify-content-between align-items-center my-3")}>
                                                <div className={cx("col-4")}>
                                                    <p className={cx("h5")}><b>Total</b></p>
                                                </div>
                                                <div className={cx("col-auto")}>
                                                    <p className={cx("h5")}>
                                                        ${total}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('row', 'px-5', 'my-3')}>
                        <div className={cx('col-12')}>
                            <button className={cx('btn btn-block', 'btn-lg', 'btn-order', 'rounded-0')} onClick={() => handlePostCheckout()}>
                                <b>
                                    <AiOutlineCreditCard />&nbsp;Order instantly
                                </b>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Order