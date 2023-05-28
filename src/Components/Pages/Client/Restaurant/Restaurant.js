import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { CiLocationOn } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { useNavigateSearch } from '../../../../hooks/useNavigateSearch';
import * as HomePageService from "../../../../services/HomePageService";
import styles from './restaurant.module.css';
import Swal from 'sweetalert2';
let cx = classNames.bind(styles)

function Restaurant() {
    const [allRestaurant, setAllRestaurant] = useState([]);
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

    const clearFilter = () => {
        navigateSearch("/", initState);
        setFilterValues(initState);
    };
    const handleSubmit = () => {
        console.log({ ...filterValues });
        navigateSearch("/", { ...filterValues });
    };

    const slugsGenerator = (string) => {
        return string.replaceAll(" ", "_");
    };

    useEffect(() => {
        const getAllProductFromAPI = async () => {
            const [data, error] = await HomePageService.getAllRestaurant(queryParams);
            if (data) {
                console.log(data);
                // console.log("Data Length: ", data.length);
                // console.log("Total Page: ", Math.round(data.length / 2));
                queryParams
                    ? setAllRestaurant(data)
                    : setAllRestaurant(data.sort((a, b) => b.id - a.id));
            }
            if (error) {
                console.log(error);
            }
        };
        getAllProductFromAPI();
    }, [queryParams]);
    return (
        <div className={cx('container-fluid', 'px-5', 'py-5')}>
            <p className={cx('h1', 'font-weight-bold', 'text-black')}>Choose the restaurant</p>
            <hr />
            <div className={cx('row', 'py-3', 'text-black')}>
                <div className={cx('col-lg-3')}>
                    <p className={cx('h3', 'font-weight-bold')}>{allRestaurant.length} {allRestaurant.length === 1 ? "Store" : "Stores"}</p>
                    <hr />
                    {
                        queryParams &&
                        <button type='submit' onClick={clearFilter} className='btn btn-outline-warning rounded-0'>Clear Filter</button>
                    }

                    <div className={cx("form-group")}>
                        <label htmlFor="">Search by name:</label>
                        <input type="text" name="keyWord" onChange={handleChange} id="" className={cx("form-control", 'rounded-0', 'shadow')} placeholder="Enter restaurant name..." />
                        {/* <small id="helpId" className="text-muted">Help text</small> */}
                    </div>
                    <p>Or</p>
                    <div className={cx("form-group")}>
                        <label htmlFor=""> Sort:</label>
                        <select className={cx("form-control", 'custom-select', 'rounded-0', 'shadow')} name="sort" onChange={(e) => handleChange(e)} id="">
                            <option value=''>Choose option filter:</option>
                            <option value='name-ASC'>By name (A - Z)</option>
                            <option value='name-DESC'>By name (Z - A)</option>
                        </select>
                    </div>
                    <button type='submit' onClick={handleSubmit} className='btn btn-outline-secondary btn-block rounded-0'>Filter</button>
                </div>
                <div className={cx('col-lg-9', 'px-5')}>
                    <div className={cx('row')}>
                        {
                            allRestaurant.length === 0 ? <p>Nothing To Show</p> :
                                allRestaurant.map((e, i) => {
                                    return (
                                        <div className={cx('col-4')} key={i}>
                                            <Link to={`/restaurant/${e.id}-${slugsGenerator(e.name)}`}>
                                                <div className={cx("card", 'border-0', 'text-black')}>
                                                    <img className={cx("card-img-top", 'img-store')} src={e.avatar} alt="" />
                                                    <div className="card-body p-0 py-3">
                                                        <p className={cx("card-title", 'm-0', 'font-weight-bold')}>
                                                            {e.name}
                                                        </p>
                                                        <p className='card-text'>
                                                            <CiLocationOn /> {e.address}
                                                        </p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                })
                        }

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Restaurant