import classNames from 'classnames/bind'
import React, { useEffect, useState } from 'react'
import { FaLocationArrow } from 'react-icons/fa'
import { IoAddCircle } from 'react-icons/io5'
import { AiOutlinePhone } from 'react-icons/ai'
import { useParams } from 'react-router-dom'
import { TfiArrowRight } from 'react-icons/tfi'
import { useNavigateSearch } from '../../../../hooks/useNavigateSearch'
import food1 from '../../../../images/food1.png'
import img_food from '../../../../images/img-food.jpeg'
import * as HomePageService from "../../../../services/HomePageService"
import styles from './food.module.css'

let cx = classNames.bind(styles)

function Food() {
    const { id } = useParams();
    console.log(id.split('-')[0]);

    const [allProduct, setAllProduct] = useState([]);
    const [restaurant, setRestaurant] = useState({});
    const navigateSearch = useNavigateSearch();

    // init the state of filter values
    const initState = {};
    const [filterValues, setFilterValues] = useState(initState);

    const handleChange = async (e) => {
        const { name, value } = await e.target;
        setFilterValues({ ...filterValues, [name]: value });
    };

    const getQueryParams = () => {
        return new URLSearchParams(window.location.search).toString();
    };
    const queryParams = getQueryParams();

    const handleSubmit = () => {
        console.log({ ...filterValues });
        navigateSearch("/", { ...filterValues });
    };
    const clearFilter = () => {
        navigateSearch(`/restaurant/${id}`, initState);
        setFilterValues(initState)
    };
    const slugsGenerator = (string) => {
        return string.replaceAll(" ", "_");
    };

    useEffect(() => {
        const getAllProductFromAPI = async () => {
            const [data, error] = await HomePageService.getProductByRestaurant(id.split('-')[0], queryParams);
            if (data) {
                console.log(data);
                setRestaurant(data);
                // console.log("Data Length: ", data.length);
                // console.log("Total Page: ", Math.round(data.length / 2));
                queryParams
                    ? setAllProduct(data.products)
                    : setAllProduct(data.products.sort((a, b) => b.id - a.id));
            }
            if (error) {
                console.log(error);
            }
        };
        getAllProductFromAPI();
    }, [id, queryParams]);
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
                        <button type='submit' onClick={clearFilter} className='btn btn-outline-warning rounded-0'>Clear Filter</button>
                        <div className={cx("form-group")}>
                            <label htmlFor=""> Sort:</label>
                            <select className={cx("form-control", 'custom-select', 'rounded-0', 'shadow')} name="" id="">
                                <option>Choose option</option>
                                <option value=''>By name (A - Z)</option>
                                <option value=''>By name (Z - A)</option>
                                <option value=''>By cost (Low - Hight)</option>
                                <option value=''>By cost (High - Low)</option>
                            </select>
                        </div>
                        <div className={cx("form-group")}>
                            <label htmlFor="">Search by name:</label>
                            <input type="text" name="" id="" className={cx("form-control", 'rounded-0', 'shadow')} placeholder="Enter food name..." />
                            {/* <small id="helpId" className="text-muted">Help text</small> */}
                        </div>
                        <div className={cx("form-group")}>
                            <label htmlFor="">Search by price:</label>
                            <div className={cx('d-flex', 'align-items-center', 'border', 'shadow', 'px-2')}>
                                <p className={cx('text-muted', 'm-0')}>From:</p>
                                <input type="text" name="" id="" className={cx("form-control", 'rounded-0', 'input-price')} placeholder="..." />
                                <p className={cx('text-muted', 'm-0')}>To:</p>
                                <input type="text" name="" id="" className={cx("form-control", 'rounded-0', 'input-price')} placeholder="..." />
                            </div>
                        </div>
                    </div>
                    <div className={cx('col-lg-9')}>
                        <div className={cx('row')}>
                            {
                                allProduct && allProduct.map((e, i) => {
                                    return (
                                        <div className={cx('col-3', 'my-3')}>
                                            <div className={cx("card", 'card-food')}>
                                                <img className={cx('card-img-top', 'p-1', 'mh-163')} src={e.image} alt="..." />
                                                <div className={cx('card-img-overlay')}>
                                                    <button className={cx('btn', 'add-btn')} title='Add food'>
                                                        <IoAddCircle className={cx('add-icon-size')} />
                                                    </button>
                                                </div>
                                                <div className={cx("card-body")}>
                                                    <p className={cx("card-title", 'm-0')}>${e.price} <TfiArrowRight /> ${e.sale_price}</p>
                                                    <p className={cx("card-text", 'text-muted', 'm-0')}>{e.name}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Food