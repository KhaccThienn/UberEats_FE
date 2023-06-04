/* eslint-disable jsx-a11y/iframe-has-title */
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import classNames from 'classnames/bind'
import geolocation from 'geolocation'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { selectUserData } from '../../../../redux/reducers/users'
import HomeFeature from '../HomeFeature/HomeFeature'
import Restaurant from '../Restaurant/Restaurant'
import { useNavigateSearch } from './../../../../hooks/useNavigateSearch'
import styles from './home.module.css'
import homeicon from "../../../../images/homeicon.png"


let cx = classNames.bind(styles);

function Home() {
    const userData = useSelector(selectUserData);
    const [keyWord, setKeyWord] = useState('');
    const [filterValue, setFilterValue] = useState({});
    const [center, setCenter] = useState({ lat: "", lng: "" });
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
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_API_MAP_KEY,
        libraries: ['places']
    })

    const [map, setMap] = useState(/**  @type google.maps.Map */(null));

    useEffect(() => {
        geolocation.getCurrentPosition((err, position) => {
            if (err) {
                console.error('Error retrieving location', err);
            } else {
                const { latitude, longitude } = position.coords;
                setCenter({
                    lat: latitude,
                    lng: longitude
                })
                console.log('Current latitude:', latitude);
                console.log('Current longitude:', longitude);
                // Do something with the latitude and longitude values
            }
        });
    }, [])

    if (!isLoaded) {
        return
    }

    return (
        <>
            <div className={cx('bg-image', 'container-fluid px-5')}>
                <div className={cx('d-flex', 'flex-column', 'form-banner')}>
                    <div className={cx('fz-60', 'font-weight-bold', 'text-black')}>Order food to your door</div>
                    {
                        userData.user.subject &&
                        <div>
                            <form className={cx('form-inline')} method='GET' onSubmit={(e) => { handleSubmitForm(e) }}>
                                <div className={cx("form-group")}>
                                    <input type="text" name="keyWord" onChange={handleChangeValue} id="keyWord" className={cx("form-control", 'rounded-0', 'input-banner')} placeholder={'Enter food you wanna find...'} />
                                </div>
                                <button type="submit" className={cx("btn btn-dark", 'btn-banner')}>Find food</button>
                            </form>
                        </div>
                    }
                </div>
            </div>
            {
                !userData.user.subject && <HomeFeature />
            }
            {
                userData.user.subject && <Restaurant />
            }
            <div className={cx('container-fluid', 'px-5')}>
                <p className={cx('h1', 'font-weight-bold', 'text-black')}>Cities near me</p>
                <hr />
                <div>
                    <GoogleMap
                        center={center}
                        zoom={20}
                        mapContainerStyle={{ width: '100%', height: '85vh' }}
                        options={{
                            zoomControl: true,
                            streetViewControl: true,
                            mapTypeControl: true,
                            fullscreenControl: true,

                        }}
                        onLoad={map => { setMap(map) }}
                    >
                        <Marker
                            position={center}
                            title='Your Current Location'
                            cursor='pointer'
                            /*  eslint-disable-next-line no-undef */
                            icon={homeicon}
                        />
                    </GoogleMap>

                </div>
            </div>
        </>
    )
}

export default Home