import React, { useEffect, useState } from "react";
import ChangePassword from "./ChangePassword";
import * as UserService from "./../../../../../services/UserService";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, selectUserData } from "../../../../../redux/reducers/users";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';


function UserProfile() {
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
  const [profile, setProfile] = useState(initProfileState);
  const [postAvatar, setPostAvatar] = useState();
  const [postData, setPostData] = useState(initPostData);
  const [reload, setReload] = useState(false)
  const [cookies, setCookie, removeCookie] = useCookies(["user_data", "access_token", "refresh_token"]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChangeFile = (e) => {
    setPostAvatar(e.target.files[0]);
  };

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

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
  }, [userData.user.subject, reload]);

  const handlePostData = async (e) => {
    e.preventDefault();
    const formDataa = new FormData();
    formDataa.append(
      "userName",
      postData.userName ? postData.userName : profile.userName
    );
    formDataa.append("avatar", postAvatar ? postAvatar : {});
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

  return (
    <>
      <div className="tab-pane fade" id="personal-information" role="tabpanel">
        <div
          className="tab-pane fade active show"
          id="personal-information"
          role="tabpanel"
        >
          <div className="iq-card">
            <div className="iq-card-header d-flex justify-content-between">
              <div className="iq-header-title">
                <h4 className="card-title">User Profile</h4>
              </div>
              <div className="iq-card-header-toolbar d-flex align-items-center">
                <button className="btn btn-primary" onClick={() => handleLogOut()}>
                  Log Out
                </button>
              </div>
            </div>
            <div className="iq-card-body">
              <form
                method="POST"
                onSubmit={(e) => {
                  handlePostData(e);
                }}
                encType="multipart/form-data"
              >
                <div className="form-group row align-items-center">
                  <div className="col-md-12">
                    <div className="profile-img-edit w-25">
                      {!profile.avatar ? (
                        <img
                          className="card-img"
                          src={postAvatar && URL.createObjectURL(postAvatar)}
                          alt={`Avatar of ${profile.userName}`}
                        />
                      ) : (
                        <img
                          className="card-img"
                          src={profile.avatar}
                          alt={`Avatar of ${profile.userName}`}
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
                    <label htmlFor="uname">Username:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="userNames"
                      name="userName"
                      defaultValue={profile.userName}
                      onChange={handleChangeValue}
                    />
                  </div>
                  <div className="form-group col-sm-6">
                    <label htmlFor="cname">Phone:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      name="phone"
                      defaultValue={profile.phone}
                      onChange={handleChangeValue}
                    />
                  </div>
                  <div className="form-group col-sm-6">
                    <label htmlFor="cname">Email:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      name="email"
                      defaultValue={profile.email}
                      onChange={handleChangeValue}
                    />
                  </div>

                  <div className="form-group col-sm-12">
                    <label>Address:</label>
                    <textarea
                      className="form-control"
                      rows="5"
                      id="address"
                      name="address"
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
          <ChangePassword />
        </div>
      </div>
    </>
  );
}

export default UserProfile;
