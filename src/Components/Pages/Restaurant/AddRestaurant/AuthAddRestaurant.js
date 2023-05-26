import React from 'react'
import { useSelector } from 'react-redux';
import { selectUserData } from '../../../../redux/reducers/users';
import * as RestaurantService from "./../../../../services/RestaurantService";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function AuthAddRestaurant() {
     const initProfileState = {
          avatar: "",
          name: "",
          phone: "",
          email: "",
          address: "",
     };
     const initPostData = {
          avatar: {},
          name: "",
          phone: "",
          email: "",
          address: "",
     };
     const userData = useSelector(selectUserData);
     const [profile, setProfile] = useState(initProfileState);
     const [reload, setReload] = useState(false)
     const [postImage, setPostImage] = useState();
     const [postData, setPostData] = useState(initPostData);

     const navigate = useNavigate();

     const handleChangeFile = (e) => {
          setPostImage(e.target.files[0]);
     };

     const handleChangeValue = (e) => {
          const { name, value } = e.target;
          setPostData({ ...postData, [name]: value });
     };


     const handleSubmitForm = async (e) => {
          e.preventDefault();

          const formData = new FormData();
          formData.append("avatar", postImage ? postImage : {});
          formData.append("name", postData.name ? postData.name : profile.name);
          formData.append("phone", postData.phone ? postData.phone : profile.phone);
          formData.append("email", postData.email ? postData.email : profile.email);
          formData.append(
               "address",
               postData.address ? postData.address : profile.address
          );

          const [res, rej] = await RestaurantService.createRestaurant(
               userData.user.subject,
               formData
          );
          if (res) {
               setReload(!reload)
               console.log(res);
               navigate('/');
          }
          if (rej) {
               console.log(rej);
          }
     };
     useEffect(() => {

     }, [reload])
     return (
          <div className="iq-card">
               <div className="iq-card-header d-flex justify-content-between">
                    <div className="iq-header-title">
                         <h4 className="card-title">Restaurant Profile</h4>
                    </div>
               </div>
               <div className="iq-card-body">
                    <form
                         method="POST"
                         onSubmit={(e) => {
                              handleSubmitForm(e);
                         }}
                    >
                         <div className="form-group row align-items-center">
                              <div className="col-md-12">
                                   <div className="profile-img-edit w-25">
                                        {!profile.avatar ? (
                                             <img
                                                  className="card-img"
                                                  src={postImage && URL.createObjectURL(postImage)}
                                                  alt={`Avatar of ${profile.name}`}
                                             />
                                        ) : (
                                             <img
                                                  className="card-img"
                                                  src={profile.avatar}
                                                  alt={`Avatar of ${profile.name}`}
                                             />
                                        )}
                                        <input
                                             onChange={(e) => {
                                                  handleChangeFile(e);
                                             }}
                                             className="form-control"
                                             type="file"
                                             accept="image/*"
                                             name="avatar"
                                        />
                                   </div>
                              </div>
                         </div>
                         <div className=" row align-items-center">
                              <div className="form-group col-sm-12">
                                   <label htmlFor="uname">Company Name:</label>
                                   <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        defaultValue={profile.name}
                                        onChange={handleChangeValue}
                                        name="name"
                                   />
                              </div>
                              <div className="form-group col-sm-6">
                                   <label htmlFor="cname">Phone:</label>
                                   <input
                                        type="text"
                                        className="form-control"
                                        id="address"
                                        defaultValue={profile.phone}
                                        onChange={handleChangeValue}
                                        name="phone"
                                   />
                              </div>
                              <div className="form-group col-sm-6">
                                   <label htmlFor="cname">Email:</label>
                                   <input
                                        type="text"
                                        className="form-control"
                                        id="email"
                                        defaultValue={profile.email}
                                        onChange={handleChangeValue}
                                        name="email"
                                   />
                              </div>

                              <div className="form-group col-sm-12">
                                   <label>Address:</label>
                                   <textarea
                                        className="form-control"
                                        name="address"
                                        rows="5"
                                        defaultValue={profile.address}
                                        onChange={handleChangeValue}
                                   ></textarea>
                              </div>
                         </div>
                         <button type="submit" className="btn btn-primary mr-2">
                              Submit
                         </button>
                         <button type="reset" className="btn iq-bg-danger">
                              Reset
                         </button>
                    </form>
               </div>
          </div>

     )
}

export default AuthAddRestaurant