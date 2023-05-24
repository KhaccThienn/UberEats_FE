import React, { useEffect, useState } from 'react'
import styles from './order.module.css'
import classNames from 'classnames/bind'
import food1 from '../../../../images/food1.png'
import { AiOutlineCreditCard } from 'react-icons/ai'
import { selectUserData } from '../../../../redux/reducers/users'
import { useSelector } from 'react-redux'
import * as CartService from '../../../../services/CartService'
import * as UserService from '../../../../services/UserService'


let cx = classNames.bind(styles);

function Order() {
    const initProfileState = {
        userName: "",
        phone: "",
        address: "",
    };
    const userData = useSelector(selectUserData);
    const [total, setTotal] = useState(0);
    const [products, setProducts] = useState([]);
    const [userProfile, setUserProfile] = useState(initProfileState);
    console.log("User Data in redux", userData);

    useEffect(() => {
        const getCartFromAPI = async () => {
            const [data, error] = await CartService.getAllCartByUser(userData.user.subject);
            if (data) {
                console.log("Cart Data:", data);
                setProducts(data.carts);
                setTotal(data.result.total)
            }
            if (error) {
                console.log(error);
            }
        }
        const getClientData = async () => {
            const [data, error] = await UserService.getUserProfile(userData.user.subject);
            if (data) {
                console.log("User Data", data);
                setUserProfile(data)
            }
            if (error) {
                console.log(error);
            }
        }
        getClientData();
        getCartFromAPI();
    }, [userData.user.subject]);


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
                                                className={cx("form-control rounded-0 mt-1")}
                                                name="" placeholder="Enter name..." />
                                        </div>
                                        <div className={cx("form-group")}>
                                            <label htmlFor="" className={cx("h5 text-black mb-1")}>Address: </label>
                                            <input type="text"
                                                defaultValue={userProfile.address}
                                                className={cx("form-control rounded-0 mt-1")}
                                                name="" placeholder="Enter address..." />
                                        </div>
                                        <div className={cx("form-group")}>
                                            <label htmlFor="" className={cx("h5 text-black mb-1")}>Phone number: </label>
                                            <input type="text"
                                                defaultValue={userProfile.phone}
                                                className={cx("form-control rounded-0 mt-1")}
                                                name="" placeholder="Enter phone number..." />
                                        </div>
                                        <div className={cx("form-group")}>
                                            <label htmlFor="" className={cx("h5 text-black mb-1")}>Note:</label>
                                            <textarea className={cx("form-control rounded-0 mt-1")} name="" rows="3" placeholder='note'></textarea>
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
                                    {/* map items order */}
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

                                    {/*  */}


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
                            <button className={cx('btn btn-block', 'btn-lg', 'btn-order', 'rounded-0')}>
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