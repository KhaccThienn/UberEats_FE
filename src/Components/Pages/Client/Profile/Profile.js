import React, { useEffect, useState } from 'react'
import styles from './profile.module.css'
import classNames from 'classnames/bind'
import avatar2x from '../../../../images/avatar_2x.png'
import { TiBackspaceOutline, TiTickOutline } from 'react-icons/ti'
import { FiEdit2 } from 'react-icons/fi'
// import { Link } from 'react-router-dom'
import Information from './Information'
import Password from './Password'

let cx = classNames.bind(styles)

function Profile() {
    const [selectedImage, setSelectedImage] = useState();
    const [previewImage, setPreviewImage] = useState();
    const [child, setChild] = useState(<Information />);
    useEffect(() => {
        if (!selectedImage) {
            setPreviewImage(undefined);
            return
        }
        const objectUrlImage = URL.createObjectURL(selectedImage);
        setPreviewImage(objectUrlImage);
        return () => URL.revokeObjectURL(objectUrlImage);
    }, [selectedImage])
    const handleSelectImage = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedImage(undefined)
            return
        }
        setSelectedImage(e.target.files[0])
    }

    return (
        <div className={cx('container-fluid', 'px-5')}>
            <div className={cx('row', 'py-3', 'justify-content-center')}>
                <p className={cx('h1', 'text-profile')}>your profile</p>
            </div>
            <div className={cx('row')}>
                <div className={cx('col-3')}>
                    <div className={cx('text-center')}>
                        <img src={previewImage ? previewImage : avatar2x} alt='avatar' className={cx('avatar')} />
                        <br />
                        <form action="" method='POST' encType='multipart/form-data'>
                            {previewImage &&
                                <button type='submit' className={cx('btn', 'btn-outline-success', 'rounded-circle', 'border-0', 'mx-1', 'btn-avatar')} ><TiTickOutline /></button>
                            }
                            <label htmlFor='image' className={cx('btn', 'btn-outline-info', 'rounded-pill', 'my-3', 'mx-1')}>Choose avatar <FiEdit2 /></label>
                            <input type='file' name='' id='image' onChange={(e) => handleSelectImage(e)} className={cx('hidden')} />
                            {previewImage &&
                                <button type='button' className={cx('btn', 'btn-outline-danger', 'rounded-circle', 'border-0', 'mx-1', 'btn-avatar')} onClick={(e) => setSelectedImage(undefined)} ><TiBackspaceOutline /></button>
                            }
                        </form>
                    </div>
                    <ul className="list-group">
                        <li className="list-group-item text-muted">Activity</li>
                        <li className="list-group-item text-right"><b className={cx('pull-left')}>Ordered</b>120</li>
                        <li className="list-group-item text-right"><b className={cx('pull-left')}>Not received</b>22</li>
                    </ul>
                </div>
                <div className={cx('col-9')}>
                    <ul className={cx("nav nav-tabs")}>
                        <li className={cx('active')}>
                            <button className={cx("nav-link active")} data-toggle='tab' onClick={(e) => setChild(<Information />)} ><span className={cx('text-black')}><b>Your infomation</b></span></button>
                        </li>
                        <li>
                            <button className={cx("nav-link")} data-toggle='tab' onClick={(e) => setChild(<Password />)} ><span className={cx('text-black')}><b>Change password</b></span></button>
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