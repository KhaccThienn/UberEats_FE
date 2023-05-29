import classNames from 'classnames/bind'
import React, { useEffect, useState } from 'react'
import { AiOutlinePhone } from 'react-icons/ai'
import { FaLocationArrow } from 'react-icons/fa'
import { IoAddCircle } from 'react-icons/io5'
import { TfiArrowRight } from 'react-icons/tfi'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useNavigateSearch } from '../../../../hooks/useNavigateSearch'
import img_food from '../../../../images/img-food.jpeg'
import { selectUserData } from '../../../../redux/reducers/users'
import * as CartService from "../../../../services/CartService"
import * as HomePageService from "../../../../services/HomePageService"
import styles from './food.module.css'
import { addToCart } from '../../../../redux/reducers/cart'

let cx = classNames.bind(styles)

function Food() {
    const formatPrice = (price) => {
        return price.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
        });
    };
    const userData = useSelector(selectUserData);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const [allProduct, setAllProduct] = useState([]);
    const [restaurant, setRestaurant] = useState({});
    const [carts, setCarts] = useState([]);
    const [reload, setReload] = useState(false)

    const navigateSearch = useNavigateSearch();
    const [priceRange, setPriceRange] = useState({ min: "", max: "" });
    // init the state of filter values
    const initState = {};
    const [filterValues, setFilterValues] = useState(initState);

    const handleSubmit = () => {
        console.log({ ...filterValues });
        navigateSearch(`/restaurant/${id}`, { ...filterValues, price: priceRange.min + '-' + priceRange.max });
    };

    const handleChange = async (e) => {
        const { name, value } = await e.target;
        setFilterValues({ ...filterValues, [name]: value });
    };

    const handleAddToCart = async (items) => {
        if (carts.length > 0) {
            const restaurant_existed = carts.find((item) => item.product.restaurant.id == id.split('-')[0]);
            if (!restaurant_existed) {
                const choose = await Swal.fire({
                    title: "You are adding a product to another restaurant's cart, you want to delete the old order?",
                    showDenyButton: true,
                    confirmButtonText: "Yes",
                    denyButtonText: "No",
                });
                if (choose.isConfirmed) {
                    const [res, rej] = await CartService.removeAllDataCartByUserID(userData.user.subject);
                    if (res) {
                        setReload(!reload);
                        const [data, error] = await CartService.saveDataToCart({
                            userId: userData.user.subject,
                            productId: items.id,
                            quantity: 1
                        });
                        if (data) {
                            navigate('/cart');
                        }
                        if (error) {
                            console.log(error)
                        }
                    }
                    if (rej) {
                        console.log(rej)
                    }
                }
            } else {
                const [data, error] = await CartService.saveDataToCart({
                    userId: userData.user.subject,
                    productId: items.id,
                    quantity: 1
                });
                if (data) {
                    navigate('/cart');
                }
                if (error) {
                    console.log(error)
                }
            }
        } else {
            const [data, error] = await CartService.saveDataToCart({
                userId: userData.user.subject,
                productId: items.id,
                quantity: 1
            });
            if (data) {
                navigate('/cart');
            }
            if (error) {
                Swal.fire({
                    title: "Having Some Errors When Add To Cart",
                    position: 'top-left',
                    timer: 1500,
                    timerProgressBar: true
                })
            }
        }


    }

    const handleChangePrice = async (e) => {
        var { name, value } = await e.target;
        console.log({ name, value });
        if (name === "min") {
            setPriceRange((priceRange) => ({
                ...priceRange,
                min: value > 0 ? value : 0,
            }));
        }
        if (name === "max") {
            setPriceRange((priceRange) => ({
                ...priceRange,
                max: value > 0 ? value : 1000000000,
            }));
        }
    };

    const getQueryParams = () => {
        return new URLSearchParams(window.location.search).toString();
    };
    const queryParams = getQueryParams();


    const clearFilter = () => {
        navigateSearch(`/restaurant/${id}`, initState);
        setFilterValues(initState)
    };

    const slugsGenerator = (string) => {
        return string.replaceAll(" ", "_");
    };

    useEffect(() => {
        const getAllProductFromAPI = async () => {
            const [data, error] = await HomePageService.getProductByRestaurant(id.split('-')[0], id.split('-')[1], 1, queryParams);
            if (data) {
                console.log(data.products);
                setRestaurant(data);
                setAllProduct(data.products)
            }
            if (error) {
                console.log(error);
            }
        };
        const getCartFromAPI = async () => {
            const [data, error] = await CartService.getAllCartByUser(userData.user.subject);
            if (data) {
                console.log("Cart Data:", data);
                setCarts(data.carts);
            }
            if (error) {
                console.log(error);
            }
        }
        getCartFromAPI();
        getAllProductFromAPI();
    }, [id, queryParams, userData.user.subject, reload]);
    return (
        <>
            <div>
                <img className={cx('img-food')} src={img_food} alt='img-food' />
            </div>
            <div className={cx('container-fluid', 'px-5')} >
                <p className={cx('h2', 'font-weight-bold', 'text-black', 'm-0', 'mt-3', 'text-uppercase')}>{restaurant.name}</p>
                <p className={cx('text-muted', 'm-0')}> <FaLocationArrow /> Location: {restaurant.address}</p>
                <p className={cx('text-muted', 'm-0')}> <AiOutlinePhone /> Phone: {restaurant.phone}</p>
                <hr />
                <div className={cx('row', 'py-3', 'text-black')}>
                    <div className={cx('col-lg-3')}>
                        <p className={cx('h4', 'font-weight-bold')}>Picked for you</p>
                        <hr />
                        {
                            queryParams &&
                            <button type='submit' onClick={clearFilter} className='btn btn-outline-warning rounded-0'>Clear Filter</button>
                        }
                        <div className={cx("form-group")}>
                            <label htmlFor=""> Sort:</label>
                            <select className={cx("form-control", 'custom-select', 'rounded-0', 'shadow')} name="sort" id="" onChange={handleChange}>
                                <option>Choose option</option>
                                <option value='name-ASC'>By name (A - Z)</option>
                                <option value='name-DESC'>By name (Z - A)</option>
                                <option value='sale_price-ASC'>By cost (Low - High)</option>
                                <option value='sale_price-DESC'>By cost (High - Low)</option>
                            </select>
                        </div>
                        <div className={cx("form-group")}>
                            <label htmlFor="">Search by name:</label>
                            <input type="text" name="keyWord" id="" className={cx("form-control", 'rounded-0', 'shadow')} onChange={handleChange} placeholder="Enter food name..." />
                            {/* <small id="helpId" className="text-muted">Help text</small> */}
                        </div>
                        <div className={cx("form-group")}>
                            <label htmlFor="">Search by price:</label>
                            <div className={cx('d-flex', 'align-items-center', 'border', 'shadow', 'px-2')}>
                                <p className={cx('text-muted', 'm-0')}>From:</p>
                                <input type="number" name="min" id="" onChange={handleChangePrice} className={cx("form-control", 'rounded-0', 'input-price')} placeholder="..." />
                                <p className={cx('text-muted', 'm-0')}>To:</p>
                                <input type="number" name="max" id="" onChange={handleChangePrice} className={cx("form-control", 'rounded-0', 'input-price')} placeholder="..." />
                            </div>
                        </div>
                        <div className="form-group">
                            <button className='btn btn-block btn-outline-success rounded-0' onClick={(e) => handleSubmit(e)}>Submit</button>
                        </div>
                    </div>
                    <div className={cx('col-lg-9')}>
                        <div className={cx('row')}>
                            {
                                allProduct && allProduct.length > 0 ? allProduct.map((e, i) => {
                                    return (
                                        <div className={cx('col-3', 'my-3')} key={i}>
                                            <div className={cx("card", 'card-food')}>
                                                <img className={cx('card-img-top', 'p-1', 'mh-163')} src={e.image} alt="..." />

                                                <div className={cx("card-body", "d-flex", "align-items-center", "justify-content-between")}>
                                                    <div>
                                                        <h5 className={cx("card-text", 'm-0')}>{e.name}</h5>
                                                        <p className={cx("card-title", 'm-0')}>
                                                            {e.sale_price === 0 ? `${formatPrice(e.price)}` : <><del className='text-muted'>{formatPrice(e.price)}</del><TfiArrowRight />{formatPrice(e.sale_price)}</>}
                                                        </p>
                                                    </div>
                                                    <button className={cx('btn', 'add-btn', "p-0")}
                                                        onClick={() => handleAddToCart(e)} title='Add food'>
                                                        <IoAddCircle className={cx('add-icon-size')} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }) : <p>Nothing To Show</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Food