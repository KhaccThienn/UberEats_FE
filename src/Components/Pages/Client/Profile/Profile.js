import classNames from 'classnames/bind'
import React, { useEffect, useState } from 'react'
import { FiEdit2 } from 'react-icons/fi'
import { TiBackspaceOutline, TiTickOutline } from 'react-icons/ti'
import styles from './profile.module.css'
import { ImProfile } from "react-icons/im"
import { MdOutlinePassword } from "react-icons/md"
import { GrLogout } from "react-icons/gr"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { clearUser, reset, selectUserData } from '../../../../redux/reducers/users'
import * as UserService from "../../../../services/UserService"
import Information from './Information'
import Password from './Password'
import { useCookies } from 'react-cookie'

let cx = classNames.bind(styles)

function Profile() {
    const initProfileState = {
        avatar: "",
        userName: "",
        phone: "",
        email: "",
        address: "",
    };
    const initPostData = {
        avatar: {},
        userName: "",
        phone: "",
        email: "",
        address: "",
    };
    const userData = useSelector(selectUserData);
    const dispatch = useDispatch();
    const [profile, setProfile] = useState(initProfileState);
    const [cookies, setCookie, removeCookie] = useCookies(["user_data", "access_token", "refresh_token"]);
    const [postData, setPostData] = useState(initPostData);
    const [selectedImage, setSelectedImage] = useState();
    const [reload, setReload] = useState(false);
    const [previewImage, setPreviewImage] = useState();
    const [child, setChild] = useState(<Information />);
    const navigate = useNavigate();

    const handleSelectImage = (e) => {
        setPreviewImage(e.target.files[0])
    }
    const handlePostData = async (e) => {
        e.preventDefault();
        const formDataa = new FormData();

        formDataa.append("avatar", previewImage ? previewImage : {});
        formDataa.append(
            "userName",
            postData.userName ? postData.userName : profile.userName
        );
        formDataa.append("phone", postData.phone ? postData.phone : profile.phone);
        formDataa.append("email", postData.email ? postData.email : profile.email);
        formDataa.append(
            "address",
            postData.address ? postData.address : profile.address
        );
        const [res, rej] = await UserService.updateUserData(
            userData.user.subject,
            formDataa
        );
        if (res) {
            console.log(res);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Update Profile Successfully',
                showConfirmButton: false,
                timer: 1500
            })
            navigate("/");
        }
        if (rej) {
            console.log(rej);
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Invalid Account',
                showConfirmButton: false,
                timer: 1500
            })
        }
    };

    const handleLogOut = async () => {
        const choose = await Swal.fire({
            title: "Do You Want To Log Out ?",
            showDenyButton: true,
            confirmButtonText: "Yes",
            denyButtonText: "No",
        });
        if (choose.isConfirmed) {
            const [data, error] = await UserService.logout();
            if (error) {
                console.log(error);
            }
            if (data) {
                removeCookie("user_data");
                removeCookie("access_token");
                removeCookie("refresh_token");
                localStorage.removeItem('access_token');
                dispatch(clearUser());
                navigate('/');
                setReload(!reload);
                Swal.fire({
                    title: "You Logged Out Successfully ?",
                    icon: 'success',
                    timer: 1500,
                    timerProgressBar: true,
                    position: 'top-right'
                })
            }

        }
    }

    useEffect(() => {
        const getProfileData = async (userID) => {
            const [data, error] = await UserService.getUserProfile(userID);
            if (data) {
                console.log("API User Data: ", data);
                setProfile(data);
            }
            if (error) {
                console.log(error);
            }
        };
        getProfileData(userData.user.subject);
    }, [userData.user.subject])


    return (
        <div className={cx('container-fluid', 'px-5')}>
            <div className={cx('row', 'py-3', 'justify-content-center')}>
                <p className={cx('h1', 'text-profile')}>your profile</p>
            </div>
            <div className={cx('row')}>
                <div className={cx('col-3')}>
                    <div className={cx('text-center')}>
                        {previewImage ? (
                            <img
                                className={cx('avatar')}
                                src={previewImage && URL.createObjectURL(previewImage)}
                                alt={`....`}
                            />
                        ) : (
                            <img
                                className={cx('avatar')}
                                src={profile.avatar}
                                alt={`Avatar of ${profile.userName}`}
                            />
                        )}
                        <br />
                        <form onSubmit={(e) => {
                            handlePostData(e);
                        }} method='POST' encType='multipart/form-data'>
                            {previewImage &&
                                <button type='submit' className={cx('btn', 'btn-outline-success', 'rounded-circle', 'border-0', 'mx-1', 'btn-avatar')} ><TiTickOutline /></button>
                            }
                            <label htmlFor='image' className={cx('btn', 'btn-outline-info', 'rounded-pill', 'my-3', 'mx-1')}>Choose avatar <FiEdit2 /></label>
                            <input type='file' name='avatar' id='image' onChange={(e) => handleSelectImage(e)} className={cx('hidden')} />
                            {previewImage &&
                                <button type='button' className={cx('btn', 'btn-outline-danger', 'rounded-circle', 'border-0', 'mx-1', 'btn-avatar')} onClick={(e) => setPreviewImage(undefined)} ><TiBackspaceOutline /></button>
                            }
                        </form>
                    </div>
                    {/* <ul className="list-group">
                        <li className="list-group-item text-muted">Activity</li>
                        <li className="list-group-item text-right"><b className={cx('pull-left')}>Ordered</b>120</li>
                        <li className="list-group-item text-right"><b className={cx('pull-left')}>Not received</b>22</li>
                    </ul> */}
                </div>
                <div className={cx('col-9')}>
                    <ul className={cx("nav nav-tabs")}>
                        <li className={cx('active')}>
                            <button className={cx("nav-link active")} data-toggle='tab' onClick={(e) => setChild(<Information />)} ><span className={cx('text-black')}><b> <ImProfile /> Your infomation</b></span></button>
                        </li>
                        <li>
                            <button className={cx("nav-link")} data-toggle='tab' onClick={(e) => setChild(<Password />)} ><span className={cx('text-black')}><b> <MdOutlinePassword /> Change password</b></span></button>
                        </li>
                        <li>
                            <button className={cx("nav-link")} onClick={() => handleLogOut()}><span className={cx('text-black')}><b><GrLogout /> Log Out</b></span></button>
                        </li>
                    </ul>
                    <div className={cx('tab-content')}>
                        <div className='tab-pane active'>
                            {child}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile