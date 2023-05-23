/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useState } from 'react'
import classNames from 'classnames/bind'
import styles from './home.module.css'
import { Link, useNavigate } from 'react-router-dom'
import Restaurant from '../Restaurant/Restaurant'
import HomeFeature from '../HomeFeature/HomeFeature'
import { useSelector } from 'react-redux'
import { selectUserData } from '../../../../redux/reducers/users'
import { useNavigateSearch } from './../../../../hooks/useNavigateSearch';
import Swal from 'sweetalert2'

let cx = classNames.bind(styles);

function Home() {
    const userData = useSelector(selectUserData);
    const [keyWord, setKeyWord] = useState('');
    const [filterValue, setFilterValue] = useState({});

    const navigate = useNavigate();
    const navigateSearch = useNavigateSearch();

    const handleChangeValue = async (e) => {
        const { name, value } = e.target;
        setKeyWord({ [name]: value });
        setFilterValue({ ...filterValue, [name]: value });
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        if (!keyWord) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Please enter a name or keyword',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true
            })
            return;
        }
        console.log(keyWord);
        navigateSearch(`/search/${keyWord.keyWord}`);
    }

    return (
        <>
            <div className={cx('bg-image', 'container-fluid px-5')}>
                <div className={cx('d-flex', 'flex-column', 'form-banner')}>
                    <div className={cx('fz-60', 'font-weight-bold', 'text-black')}>Order food to your door</div>
                    <div>
                        <form className={cx('form-inline')} method='GET' onSubmit={(e) => { handleSubmitForm(e) }}>
                            <div className={cx("form-group")}>
                                <input type="text" name="keyWord" onChange={handleChangeValue} id="keyWord" className={cx("form-control", 'rounded-0', 'input-banner')} placeholder={'Enter food you wanna find...'} />
                            </div>
                            <button type="submit" className={cx("btn btn-dark", 'btn-banner')}>Find food</button>
                        </form>
                    </div>
                </div>
            </div>
            {
                userData.user.subject && <HomeFeature />
            }
            {
                !userData.user.subject && <Restaurant />
            }
            <div className={cx('container-fluid', 'px-5')}>
                <p className={cx('h1', 'font-weight-bold', 'text-black')}>Cities near me</p>
                <hr />
                <div>
                    <iframe className={cx('border-0')} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6511991.84461928!2d-124.59543491876644!3d37.16022415957861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb9fe5f285e3d%3A0x8b5109a227086f55!2zQ2FsaWZvcm5pYSwgSG9hIEvhu7M!5e0!3m2!1svi!2s!4v1683791333511!5m2!1svi!2s" width='100%' height='450px' allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </>
    )
}

export default Home