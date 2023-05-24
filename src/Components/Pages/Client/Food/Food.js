import classNames from 'classnames/bind'
import React, { useEffect, useState } from 'react'
import { AiOutlinePhone } from 'react-icons/ai'
import { FaLocationArrow } from 'react-icons/fa'
import { IoAddCircle } from 'react-icons/io5'
import { TfiArrowRight } from 'react-icons/tfi'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useNavigateSearch } from '../../../../hooks/useNavigateSearch'
import img_food from '../../../../images/img-food.jpeg'
import { selectUserData } from '../../../../redux/reducers/users'
import * as CartService from "../../../../services/CartService"
import * as HomePageService from "../../../../services/HomePageService"
import styles from './food.module.css'

let cx = classNames.bind(styles)

function Food() {
    const userData = useSelector(selectUserData);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const [allProduct, setAllProduct] = useState([]);
    const [restaurant, setRestaurant] = useState({});
    const [carts, setCarts] = useState([]);
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
        console.log("Post Items To Cart", items);
        console.log("In Id", id.split('-')[0]);
        const restaurant_existed = carts.find((item) => item.product.restaurant.id === id.split('-')[0]);
        console.log(carts.find((item) => item.product.restaurant.id === id.split('-')[0]));
        console.log(carts.filter((item) => console.log(item.product.restaurant.id === id.split('-')[0])));
        // const [data, error] = await CartService.saveDataToCart({
        //     userId: userData.user.subject,
        //     productId: items.id,
        //     quantity: 1
        // });
        // if (data) {
        //     console.log("Cart Data", data);
        //     navigate('/cart');
        // }
        // if (error) {
        //     console.log(error)
        // }
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
            const [data, error] = await HomePageService.getProductByRestaurant(id.split('-')[0], id.split('-')[1], queryParams);
            if (data) {
                console.log(data);
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
    }, [id, queryParams, userData.user.subject]);
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
                                                            {e.sale_price === 0 ? `$${e.price}` : <><del className='text-muted'>${e.price}</del><TfiArrowRight />${e.sale_price}</>}
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