import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import { selectUserData } from "../../../../../redux/reducers/users";
import * as RestaurantService from "./../../../../../services/RestaurantService";
import * as UserService from "./../../../../../services/UserService";

function RestaurantProfile({ resID }) {
  console.log("Restaurant ID: ", resID);
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
  const [allRestaurantNames, setAllRestaurantNames] = useState([])
  const [allRestaurantEmails, setAllRestaurantEmails] = useState([])
  const [allRestaurantPhones, setAllRestaurantPhones] = useState([])
  const [allRestaurantAddress, setAllRestaurantAddress] = useState([])
  const [postImage, setPostImage] = useState();
  const [postData, setPostData] = useState(initPostData);

  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Please enter your restaurant name').notOneOf(allRestaurantNames, "This name is already in use"),
    email: Yup.string().required('Please enter your email').email('Invalid type of email').notOneOf(allRestaurantEmails, "This email is already in use"),
    phone: Yup.string().required('Please enter your phone number').matches((/(84|0[3|5|7|8|9])+([0-9]{8})\b/g), 'Invalid phone number').notOneOf(allRestaurantPhones, "This phone is already in use"),
    avatar: Yup.mixed()
      .required('Please upload a file')
      .test('fileType', 'Invalid file format', (value) => {
        // Ensure the file is not null
        if (!value) {
          return false;
        }
        // Get the file extension
        const fileExtension = value.toString().split('.').pop().toLowerCase();
        console.log(fileExtension);
        // Define the allowed file extensions
        const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
        // Check if the file extension is in the allowed extensions list
        return allowedExtensions.includes(fileExtension);
      }),
    address: Yup.string().optional().min(10, "At Least 10 characters").notOneOf(allRestaurantAddress, "This address is already in use")
  })

  const formik = useFormik({
    initialValues: initPostData,
    validationSchema,
    onSubmit: async (e) => {
      await handleSubmitForm(e)
    }
  })

  const handleChangeFile = (e) => {
    setPostImage(e.target.files[0]);
  };

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    formik.values[name] = value;
    setPostData({ ...postData, [name]: value });
  };

  useEffect(() => {
    const getRestaurantData = async (id) => {
      const [data, err] = await RestaurantService.getRestaurantByID(id);
      if (data) {
        console.log("Restaurant Data: ", data);
        formik.setValues(data);
        setProfile(data);
      }
      if (err) {
        console.log(err);
      }
    };
    const getAllRestaurantsNamesExeptedOne = async (resID) => {
      const [data, error] = await RestaurantService.getAllRestaurantEmailsExeptedOne(resID);
      if (data) {
        setAllRestaurantNames(data);
      }
      if (error) {
        console.log(error);
      }
    }
    const getAllRestaurantsEmailsExeptedOne = async (resID) => {
      const [data, error] = await RestaurantService.getAllRestaurantEmailsExeptedOne(resID);
      if (data) {
        setAllRestaurantEmails(data);
      }
      if (error) {
        console.log(error);
      }
    }
    const getAllRestaurantsPhonesExeptedOne = async (resID) => {
      const [data, error] = await RestaurantService.getAllRestaurantPhonesExeptedOne(resID);
      if (data) {
        setAllRestaurantPhones(data);
      }
      if (error) {
        console.log(error);
      }
    }
    const getAllRestaurantsAddressExeptedOne = async (resID) => {
      const [data, error] = await RestaurantService.getAllRestaurantAddressExeptedOne(resID);
      if (data) {
        setAllRestaurantAddress(data);
      }
      if (error) {
        console.log(error);
      }
    }
    getAllRestaurantsNamesExeptedOne(resID);
    getAllRestaurantsEmailsExeptedOne(resID);
    getAllRestaurantsPhonesExeptedOne(resID);
    getAllRestaurantsAddressExeptedOne(resID);
    getRestaurantData(resID);
  }, [resID, userData.user.subject]);

  const handleSubmitForm = async (e) => {

    const formData = new FormData();
    formData.append("avatar", postImage ? postImage : {});
    formData.append("name", postData.name ? postData.name : profile.name);
    formData.append("phone", postData.phone ? postData.phone : profile.phone);
    formData.append("email", postData.email ? postData.email : profile.email);
    formData.append(
      "address",
      postData.address ? postData.address : profile.address
    );

    const [res, rej] = await RestaurantService.updateRestaurantData(
      userData.user.subject,
      resID,
      formData
    );
    if (res) {
      console.log(res);
      navigate('/profile');
    }
    if (rej) {
      console.log(rej);
    }
  };

  return (
    <>
      <div
        className="tab-pane fade active show"
        id="restaurant-information"
        role="tabpanel"
      >
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
                formik.handleSubmit(e);
              }}
            >
              <div className="form-group row align-items-center">
                <div className="col-md-12">
                  <div className="profile-img-edit w-25">
                    {postImage ? (
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
                        formik.handleChange(e)
                      }}
                      className={formik.errors.avatar ? "form-control is-invalid" : "form-control"}
                      type="file"
                      accept="image/*"
                      name="avatar"
                    />
                    {formik.errors.avatar && <small id="helpId" className="text-danger">{formik.errors.avatar}</small>}
                  </div>
                </div>
              </div>
              <div className=" row align-items-center">
                <div className="form-group col-sm-12">
                  <label htmlFor="uname">Company Name:</label>
                  <input
                    type="text"
                    className={formik.errors.name ? "form-control is-invalid" : "form-control"}
                    id="name"
                    defaultValue={profile.name}
                    onChange={(e) => { handleChangeValue(e); formik.handleChange(e) }}
                    name="name"
                  />
                  {formik.errors.name && <small id="helpId" className="text-danger">{formik.errors.name}</small>}
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="cname">Phone:</label>
                  <input
                    type="text"
                    className={formik.errors.phone ? "form-control is-invalid" : "form-control"}
                    id="address"
                    defaultValue={profile.phone}
                    onChange={(e) => { handleChangeValue(e); formik.handleChange(e) }}
                    name="phone"
                  />
                  {formik.errors.phone && <small id="helpId" className="text-danger">{formik.errors.phone}</small>}
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="cname">Email:</label>
                  <input
                    type="text"
                    className={formik.errors.email ? "form-control is-invalid" : "form-control"}
                    id="email"
                    defaultValue={profile.email}
                    onChange={(e) => { handleChangeValue(e); formik.handleChange(e) }}
                    name="email"
                  />
                  {formik.errors.email && <small id="helpId" className="text-danger">{formik.errors.email}</small>}
                </div>

                <div className="form-group col-sm-12">
                  <label>Address:</label>
                  <textarea
                    className={formik.errors.address ? "form-control is-invalid" : "form-control"}
                    name="address"
                    rows="5"
                    defaultValue={profile.address}
                    onChange={(e) => { handleChangeValue(e); formik.handleChange(e) }}
                  ></textarea>
                  {formik.errors.address && <small id="helpId" className="text-danger">{formik.errors.address}</small>}
                </div>
              </div>
              <button type="submit" className="btn btn-primary mr-2">
                Submit
              </button>
              <button type="reset" className="btn btn-danger">
                Reset
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default RestaurantProfile;
