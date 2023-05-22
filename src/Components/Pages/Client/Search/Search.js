/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import styles from './search.module.css'
import classNames from 'classnames/bind'
import { Link, useLocation } from 'react-router-dom'
import food1 from '../../../../images/food1.png'
import { HiOutlineBuildingStorefront } from 'react-icons/hi2'
import { BsCartPlus } from 'react-icons/bs'

let cx = classNames.bind(styles)

function Search() {
    const search = useLocation().search
    const keyword = new URLSearchParams(search).get('keyword')

    return (
        <div className={cx('container-fluid', 'px-5', 'py-3')}>
            <div className={cx('row')}>
                <div className={cx('col-lg-3','py-3')}>
                    <p className={cx('h1', 'font-weight-bold')}>"{keyword}"</p>
                    <p className={cx('text-muted')}>320+ result for "{keyword}"</p>
                    <hr />
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
                    <div className={cx('row', 'py-3')}>
                        {/* map items search */}
                        <div className={cx('col-6', 'py-3')}>
                            <div className={cx("media", 'align-items-center', 'border', 'rounded-lg', 'shadow-items')}>
                                <div className="d-flex">
                                    <img src={food1} alt="food1" className={cx('img-search')} />
                                </div>
                                <div className={cx("media-body", 'ml-3')}>
                                    <h5>Vegetarian Burgers <small>(Restaurant name)</small></h5>
                                    <span className={cx('text-muted')}>$5.49 Delivery Fee • 50-65 min</span>
                                    <div className={cx('d-flex', 'mt-3')}>
                                        <Link to='/id_name-restaurant'><button className={cx('btn', 'btn-view-store', 'rounded-pill')}><HiOutlineBuildingStorefront /> View store</button></Link>
                                        <Link to=''><button className={cx('btn', 'btn-add-to-cart', 'mx-2', 'rounded-pill')}><BsCartPlus /> Add to cart</button></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*  */}
                        {/* map items search */}
                        <div className={cx('col-6', 'py-3')}>
                            <div className={cx("media", 'align-items-center', 'border', 'rounded-lg', 'shadow-items')}>
                                <div className="d-flex">
                                    <img src={food1} alt="food1" className={cx('img-search')} />
                                </div>
                                <div className={cx("media-body", 'ml-3')}>
                                    <h5>Vegetarian Burgers <small>(Restaurant name)</small></h5>
                                    <span className={cx('text-muted')}>$5.49 Delivery Fee • 50-65 min</span>
                                    <div className={cx('d-flex', 'mt-3')}>
                                        <Link to='/id_name-restaurant'><button className={cx('btn', 'btn-view-store', 'rounded-pill')}><HiOutlineBuildingStorefront /> View store</button></Link>
                                        <Link to=''><button className={cx('btn', 'btn-add-to-cart', 'mx-2', 'rounded-pill')}><BsCartPlus /> Add to cart</button></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*  */}
                        {/* map items search */}
                        <div className={cx('col-6', 'py-3')}>
                            <div className={cx("media", 'align-items-center', 'border', 'rounded-lg', 'shadow-items')}>
                                <div className="d-flex">
                                    <img src={food1} alt="food1" className={cx('img-search')} />
                                </div>
                                <div className={cx("media-body", 'ml-3')}>
                                    <h5>Vegetarian Burgers <small>(Restaurant name)</small></h5>
                                    <span className={cx('text-muted')}>$5.49 Delivery Fee • 50-65 min</span>
                                    <div className={cx('d-flex', 'mt-3')}>
                                        <Link to='/id_name-restaurant'><button className={cx('btn', 'btn-view-store', 'rounded-pill')}><HiOutlineBuildingStorefront /> View store</button></Link>
                                        <Link to=''><button className={cx('btn', 'btn-add-to-cart', 'mx-2', 'rounded-pill')}><BsCartPlus /> Add to cart</button></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*  */}
                        {/* map items search */}
                        <div className={cx('col-6', 'py-3')}>
                            <div className={cx("media", 'align-items-center', 'border', 'rounded-lg', 'shadow-items')}>
                                <div className="d-flex">
                                    <img src={food1} alt="food1" className={cx('img-search')} />
                                </div>
                                <div className={cx("media-body", 'ml-3')}>
                                    <h5>Vegetarian Burgers <small>(Restaurant name)</small></h5>
                                    <span className={cx('text-muted')}>$5.49 Delivery Fee • 50-65 min</span>
                                    <div className={cx('d-flex', 'mt-3')}>
                                        <Link to='/id_name-restaurant'><button className={cx('btn', 'btn-view-store', 'rounded-pill')}><HiOutlineBuildingStorefront /> View store</button></Link>
                                        <Link to=''><button className={cx('btn', 'btn-add-to-cart', 'mx-2', 'rounded-pill')}><BsCartPlus /> Add to cart</button></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*  */}
                        {/* map items search */}
                        <div className={cx('col-6', 'py-3')}>
                            <div className={cx("media", 'align-items-center', 'border', 'rounded-lg', 'shadow-items')}>
                                <div className="d-flex">
                                    <img src={food1} alt="food1" className={cx('img-search')} />
                                </div>
                                <div className={cx("media-body", 'ml-3')}>
                                    <h5>Vegetarian Burgers <small>(Restaurant name)</small></h5>
                                    <span className={cx('text-muted')}>$5.49 Delivery Fee • 50-65 min</span>
                                    <div className={cx('d-flex', 'mt-3')}>
                                        <Link to='/id_name-restaurant'><button className={cx('btn', 'btn-view-store', 'rounded-pill')}><HiOutlineBuildingStorefront /> View store</button></Link>
                                        <Link to=''><button className={cx('btn', 'btn-add-to-cart', 'mx-2', 'rounded-pill')}><BsCartPlus /> Add to cart</button></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*  */}
                        {/* map items search */}
                        <div className={cx('col-6', 'py-3')}>
                            <div className={cx("media", 'align-items-center', 'border', 'rounded-lg', 'shadow-items')}>
                                <div className="d-flex">
                                    <img src={food1} alt="food1" className={cx('img-search')} />
                                </div>
                                <div className={cx("media-body", 'ml-3')}>
                                    <h5>Vegetarian Burgers <small>(Restaurant name)</small></h5>
                                    <span className={cx('text-muted')}>$5.49 Delivery Fee • 50-65 min</span>
                                    <div className={cx('d-flex', 'mt-3')}>
                                        <Link to='/id_name-restaurant'><button className={cx('btn', 'btn-view-store', 'rounded-pill')}><HiOutlineBuildingStorefront /> View store</button></Link>
                                        <Link to=''><button className={cx('btn', 'btn-add-to-cart', 'mx-2', 'rounded-pill')}><BsCartPlus /> Add to cart</button></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*  */}
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