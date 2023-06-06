import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import { selectUserData } from "../../../../redux/reducers/users";
import * as ProductService from "../../../../services/ProductService";
import style from "./AddProduct.module.css";
import classNames from "classnames/bind";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const cx = classNames.bind(style);

function UpdateProduct() {
  const { id } = useParams();

  const initState = {
    name: "",
    price: "",
    image: {},
    sale_price: "",
    status: "",
    description: "",
    restaurantId: "",
  };

  const initProductState = {
    name: "",
    price: "",
    image: "",
    sale_price: "",
    status: "",
    description: "",
    restaurant: {},
  };

  const userData = useSelector(selectUserData);
  const [restaurants, setRestaurant] = useState([]);
  const [prodNames, setProdNames] = useState([])
  const [product, setProduct] = useState(initProductState);
  const [postImage, setPostImage] = useState();
  const [postData, setPostData] = useState(initState);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Please enter name').min(5, "At Least 5 characters").notOneOf(prodNames, "This Prod Name is already in use"),
    price: Yup.number().required('Please enter price').min(1, "Price must be greater than 1"),
    sale_price: Yup.number().lessThan(Yup.ref("price"), "Sale Price must be less than sale price").optional(),
    // restaurantId: Yup.string().required('Please choose the restaurant'),
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
    setPostImage(e.target.files[0]);
  };

  useEffect(() => {
    const getRestaurantData = async () => {
      const [res, error] = await ProductService.getAllRestaurantByUser(
        userData.user.subject
      );
      setRestaurant(res.restaurant);
      if (error) {
        console.log(error);
      }
    };
    const getAPIData = async (id) => {
      const [data, err] = await ProductService.getProductByID(
        id.split("-")[0],
        id.split("-")[1]
      );
      setProduct(data);
      formik.setValues(data)
      setPostData(data);
      if (err) {
      }
    };
    const getAllProdNameExcepted = async (id) => {
      const [res, error] = await ProductService.getAllProductsExceptOne(
        id
      );
      console.log(res);
      setProdNames(res);
      if (error) {
        console.log(error);
      }
    }
    getRestaurantData();
    getAPIData(id);
    getAllProdNameExcepted(id)
  }, [userData.user.subject, id]);

  const handleSubmitForm = async (e) => {
    const formData = new FormData();
    formData.append("name", postData.name ? postData.name : product.name);
    formData.append("image", postImage ? postImage : {});
    formData.append("price", postData.price ? postData.price : product.price);
    formData.append(
      "sale_price",
      postData.sale_price ? postData.sale_price : product.sale_price
    );
    formData.append(
      "status",
      postData.status ? postData.status : product.status
    );
    formData.append(
      "description",
      postData.description ? postData.description : product.description
    );
    formData.append(
      "restaurantId",
      postData.restaurantId ? postData.restaurantId : product.restaurant.id
    );

    console.log(formData);

    const [result, error] = await ProductService.updateProduct(
      id.split("-")[0],
      formData
    );
    if (result) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Update Product Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/product");
    }
    if (error) {
      console.log(error);
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'All Fields Are Required',
        showConfirmButton: false,
      })
    }
  };

  return (
    <div>
      <div className="col-sm-12">
        <div className="iq-card">
          <div className="iq-card-header d-flex justify-content-between">
            <div className="iq-header-title">
              <h4 className="card-title">Update</h4>
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
                  defaultValue={product.name}
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
                    {!postImage && (
                      <img
                        className={cx("preview")}
                        alt={product.name}
                        src={product.image}
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
                  defaultValue={product.price}
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
                  className={formik.errors.sale_price ? "form-control is-invalid" : "form-control"}
                  onChange={(e) => { handleChangeValue(e); formik.handleChange(e) }}
                  defaultValue={product.sale_price}
                  name="sale_price"
                />
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
                      onChange={(e) => handleChangeValue(e)}
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
                      onChange={(e) => handleChangeValue(e)}
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
                      <option
                        key={i}
                        value={e.id}
                        selected={e.id === product.restaurant.id}
                      >
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
                  value={product.description}
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

export default UpdateProduct;
