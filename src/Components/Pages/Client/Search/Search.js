/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import classNames from 'classnames/bind'
import React, { useEffect, useState } from 'react'
import { BsCartPlus } from 'react-icons/bs'
import { HiOutlineBuildingStorefront } from 'react-icons/hi2'
import { TfiArrowRight } from 'react-icons/tfi'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useNavigateSearch } from '../../../../hooks/useNavigateSearch'
import { selectUserData } from '../../../../redux/reducers/users'
import * as CartService from "../../../../services/CartService"
import * as ProductService from "../../../../services/ProductService"
import styles from './search.module.css'

let cx = classNames.bind(styles)

function Search() {
    const formatPrice = (price) => {
        return price.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
        });
    };
    const userData = useSelector(selectUserData);
    const { keyWord } = useParams();
    const [reload, setReload] = useState(false)
    const [carts, setCarts] = useState([]);
    const [allProduct, setAllProduct] = useState([]);
    const [priceRange, setPriceRange] = useState({ min: "", max: "" });
    // init the state of filter values
    const initState = {};
    const [filterValues, setFilterValues] = useState(initState);

    const navigateSearch = useNavigateSearch();
    const navigate = useNavigate();
    const getQueryParams = () => {
        return new URLSearchParams(window.location.search).toString();
    };
    const queryParams = getQueryParams();

    const handleSubmit = () => {
        console.log({ ...filterValues });
        navigateSearch(`/search/${keyWord}`, { ...filterValues, price: priceRange.min + '-' + priceRange.max });
    };

    const handleChange = async (e) => {
        const { name, value } = await e.target;
        setFilterValues({ ...filterValues, [name]: value });
    };

    const slugsGenerator = (string) => {
        return string.replaceAll(" ", "_");
    };

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

    const handleAddToCart = async (items) => {
        if (carts.length > 0) {
            const restaurant_existed = carts.find((item) => item.product.restaurant.id == items.restaurant.id);
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

    useEffect(() => {
        const getDataFromAPI = async () => {
            const [data, error] = await ProductService.getProductByName(keyWord, queryParams);
            if (data) {
                console.log(data);
                setAllProduct(data)
            }
            if (error) {
                console.log(error);
                setAllProduct([]);
            }
        }
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
        getDataFromAPI();
    }, [queryParams, keyWord, userData.user.subject, reload]);

    return (
        <div className={cx('container-fluid', 'px-5', 'py-3')}>
            <div className={cx('row')}>
                <div className={cx('col-lg-3', 'py-3')}>
                    <p className={cx('h1', 'font-weight-bold')}>"{keyWord}"</p>
                    <p className={cx('text-muted')}>{allProduct.length} result for "{keyWord}"</p>
                    <hr />
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
                    <div className={cx('row', 'py-3')}>
                        {/* map items search */}
                        {
                            allProduct && allProduct.length > 0 ? allProduct.map((e, i) => {
                                return (
                                    <div className={cx('col-6', 'py-3')} key={i}>
                                        <div className={cx("media", 'align-items-center', 'border', 'rounded-lg', 'shadow-items')}>
                                            <div className="d-flex">
                                                <img src={e.image} alt="food1" className={cx('img-search')} />
                                            </div>
                                            <div className={cx("media-body", 'ml-3')}>
                                                <h5>{e.name} <small>({e.restaurant.name})</small></h5>
                                                <p className={cx("card-title", 'm-0')}>
                                                    {e.sale_price === 0 ? `${formatPrice(e.price)}` : <><del className='text-muted'>{formatPrice(e.price)}</del><TfiArrowRight />{formatPrice(e.sale_price)}</>}
                                                </p>
                                                <div className={cx('d-flex', 'mt-3')}>
                                                    <Link to={`/restaurant/${e.restaurant.id}-${slugsGenerator(e.restaurant.name)}`}><button className={cx('btn', 'btn-view-store', 'rounded-pill')}><HiOutlineBuildingStorefront /> View store</button></Link>
                                                    <button className={cx('btn', 'btn-add-to-cart', 'mx-2', 'rounded-pill')} onClick={() => { handleAddToCart(e) }}>
                                                        <BsCartPlus /> Add to cart
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) :
                                <p>Nothing To Show</p>
                        }

                    </div>
                    <div className={cx('row', 'px-3')}>
                        <nav aria-label="Page navigation example">
                            <ul className={cx("pagination")}>
                                <li className={cx('page-item')}>
                                    <Link to='' className={cx("page-link", 'text-black')} aria-label="Previous">
                                        <span aria-hidden="true">&laquo;</span>
                                        <span className={cx('sr-only')}>Previous</span>
                                    </Link>
                                </li>
                                <li className={cx('page-item')}><Link to='' className={cx("page-link", 'text-black')} >1</Link></li>
                                <li className={cx('page-item')}><Link to='' className={cx("page-link", 'text-black')} >2</Link></li>
                                <li className={cx('page-item')}><Link to='' className={cx("page-link", 'text-black')} >3</Link></li>
                                <li className={cx('page-item')}>
                                    <Link to='' className={cx("page-link", 'text-black')} aria-label="Next">
                                        <span aria-hidden="true">&raquo;</span>
                                        <span className={cx('sr-only')}>Next</span>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Search