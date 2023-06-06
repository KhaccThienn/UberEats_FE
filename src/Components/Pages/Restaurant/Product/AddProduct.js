import classNames from "classnames/bind";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { selectUserData } from "../../../../redux/reducers/users";
import * as ProductService from "../../../../services/ProductService";
import style from "./AddProduct.module.css";
import Swal from "sweetalert2";

const cx = classNames.bind(style);

function AddProduct() {
  const initState = {
    name: "",
    image: {},
    price: "",
    sale_price: 0,
    status: 1,
    description: "",
    restaurantId: "",
  };

  const userData = useSelector(selectUserData);
  const [restaurants, setRestaurant] = useState([]);
  const [prodNames, setProdNames] = useState([])
  const [postImage, setPostImage] = useState();
  const [postData, setPostData] = useState(initState);
  const navigate = useNavigate();

  const [errData, setErrData] = useState([]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Please enter name').min(5, "At Least 5 characters").notOneOf(prodNames, "This Prod Name is already in use"),
    price: Yup.number().required('Please enter price').min(1, "Price must be greater than 1"),
    sale_price: Yup.number().lessThan(Yup.ref("price"), "Sale Price must be less than sale price").optional(),
    restaurantId: Yup.string().required('Please choose the restaurant'),
    description: Yup.string().required('Please enter description'),
    image: Yup.mixed()
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
  })

  const formik = useFormik({
    initialValues: initState,
    validationSchema,
    onSubmit: async (e) => {
      await handleSubmitForm(e)
    }
  })
  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    formik.values[name] = value
    setPostData({ ...postData, [name]: value });
  };

  const handleChangeFile = (e) => {
    // console.log(e.target.files[0]);
    setPostImage(e.target.files[0]);
  };

  useEffect(() => {
    const getAPIData = async () => {
      const [data, error] = await ProductService.getAllRestaurantByUser(
        userData.user.subject
      );
      if (data) {
        setRestaurant(data.restaurant);
      }
      if (error) {
        console.log(error.response.data.message);
      }
    };
    const getAllProdsName = async () => {
      const [data, error] = await ProductService.getAllProductsName();
      if (data) {
        console.log(data);
        setProdNames(data);
      }
      if (error) {
        console.log(error.response.data.message);
      }
    }
    getAllProdsName()
    getAPIData();
  }, [userData.user.subject]);

  const handleSubmitForm = async (e) => {
    const formData = new FormData();
    formData.append("name", postData.name);
    formData.append("image", postImage);
    formData.append("price", postData.price);
    formData.append("sale_price", postData.sale_price);
    formData.append("status", postData.status);
    formData.append("description", postData.description);
    formData.append("restaurantId", postData.restaurantId);

    const [result, error] = await ProductService.createProduct(formData);
    if (result) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Add Product Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/product");
    }
    if (error) {
      console.log(error.response.data.message);
    }
  };
  return (
    <div>
      <div className="col-sm-12">
        <div className="iq-card">
          <div className="iq-card-header d-flex justify-content-between">
            <div className="iq-header-title">
              <h4 className="card-title">Add New</h4>
            </div>
          </div>
          <div className="iq-card-body">
            <form
              method="POST"
              onSubmit={(e) => {
                formik.handleSubmit(e);
              }}
              encType="multipart/form-data"
            >
              <div className="form-group">
                <label>Product's Name:</label>
                <input
                  type="text"
                  className={formik.errors.name ? "form-control is-invalid" : "form-control"}
                  onChange={(e) => { handleChangeValue(e); formik.handleChange(e) }}
                  name="name"
                />
                {
                  formik.errors.name &&
                  <small id="helpId" className="text-danger">{formik.errors.name}</small>
                }
              </div>

              <div className="form-group">
                <label>Product's Image:</label>
                <div className="">
                  <input
                    type="file"
                    className={formik.errors.image ? "form-control is-invalid" : "form-control"}
                    accept="image/png, image/jpeg, image/jpg"
                    name="image"
                    onChange={(e) => { handleChangeFile(e); formik.handleChange(e) }}
                  />
                  {
                    formik.errors.image &&
                    <small id="helpId" className="text-danger">{formik.errors.image}</small>
                  }
                  <div className="w-25">
                    {postImage && (
                      <img
                        className={cx("preview")}
                        alt={postImage.name}
                        src={URL.createObjectURL(postImage)}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Product's Price:</label>
                <input
                  type="text"
                  className={formik.errors.price ? "form-control is-invalid" : "form-control"}
                  onChange={(e) => { handleChangeValue(e); formik.handleChange(e) }}
                  name="price"
                />
                {
                  formik.errors.price &&
                  <small id="helpId" className="text-danger">{formik.errors.price}</small>
                }
              </div>

              <div className="form-group">
                <label>Product's Sale Price:</label>
                <input
                  type="text"
                  defaultValue={0}
                  className={formik.errors.sale_price ? "form-control is-invalid" : "form-control"}
                  onChange={(e) => { handleChangeValue(e); formik.handleChange(e) }}
                  name="sale_price"
                />
                {
                  formik.errors.sale_price &&
                  <small id="helpId" className="text-danger">{formik.errors.sale_price}</small>
                }
              </div>
              <div className="form-group">
                <label>Product's Status:</label>
                <div className="form-check">
                  <label className="form-check-label">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="status"
                      id=""
                      value="1"
                      onChange={handleChangeValue}
                      defaultChecked
                    />{" "}
                    In Stock
                  </label>
                </div>
                <div className="form-check">
                  <label className="form-check-label">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="status"
                      onChange={handleChangeValue}
                      id=""
                      value="0"
                    />{" "}
                    Out Of Stock
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="">Restaurant ?</label>
                <select
                  className={formik.errors.restaurantId ? "form-control is-invalid" : "form-control"}
                  name="restaurantId"
                  id=""
                  onChange={(e) => { handleChangeValue(e); formik.handleChange(e) }}
                >
                  <option>Choose Restaurant...</option>
                  {restaurants.map((e, i) => {
                    return (
                      <option key={i} value={e.id}>
                        {e.name}
                      </option>
                    );
                  })}
                </select>
                {
                  formik.errors.restaurantId &&
                  <small id="helpId" className="text-danger">{formik.errors.restaurantId}</small>
                }
              </div>
              <div className="form-group">
                <label>Product's Description:</label>

                <textarea
                  name="description"
                  id="inputdescription"
                  className={formik.errors.description ? "form-control is-invalid" : "form-control"}
                  rows="3"
                  onChange={(e) => { handleChangeValue(e); formik.handleChange(e) }}
                ></textarea>
                {
                  formik.errors.description &&
                  <small id="helpId" className="text-danger">{formik.errors.description}</small>
                }
              </div>

              <button type="submit" className="btn btn-primary mr-2">
                Submit
              </button>
              <button type="reset" className="btn btn-danger">
                Back
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
