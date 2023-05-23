/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react'
import styles from './search.module.css'
import classNames from 'classnames/bind'
import { Link, useLocation, useParams } from 'react-router-dom'
import food1 from '../../../../images/food1.png'
import { HiOutlineBuildingStorefront } from 'react-icons/hi2'
import { TfiArrowRight } from 'react-icons/tfi'
import { BsCartPlus } from 'react-icons/bs'
import { useNavigateSearch } from '../../../../hooks/useNavigateSearch'
import * as ProductService from "../../../../services/ProductService";

let cx = classNames.bind(styles)

function Search() {
    const { keyWord } = useParams();
    console.log(keyWord);

    const [allProduct, setAllProduct] = useState([]);
    const [priceRange, setPriceRange] = useState({ min: "", max: "" });
    // init the state of filter values
    const initState = {};
    const [filterValues, setFilterValues] = useState(initState);
    const navigateSearch = useNavigateSearch();
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
        getDataFromAPI();
    }, [queryParams, keyWord]);

    return (
        <div className={cx('container-fluid', 'px-5', 'py-3')}>
            <div className={cx('row')}>
                <div className={cx('col-lg-3', 'py-3')}>
                    {/* <p className={cx('h1', 'font-weight-bold')}>"{keyword}"</p> */}
                    {/* <p className={cx('text-muted')}>320+ result for "{keyword}"</p> */}
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
                                                    {e.sale_price === 0 ? `$${e.price}` : <><del className='text-muted'>${e.price}</del><TfiArrowRight />${e.sale_price}</>}
                                                </p>
                                                <div className={cx('d-flex', 'mt-3')}>
                                                    <Link to={`/restaurant/${e.restaurant.id}-${slugsGenerator(e.restaurant.name)}`}><button className={cx('btn', 'btn-view-store', 'rounded-pill')}><HiOutlineBuildingStorefront /> View store</button></Link>
                                                    <Link to=''><button className={cx('btn', 'btn-add-to-cart', 'mx-2', 'rounded-pill')}><BsCartPlus /> Add to cart</button></Link>
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