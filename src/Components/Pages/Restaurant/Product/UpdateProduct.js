import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
  const [product, setProduct] = useState(initProductState);
  const [postImage, setPostImage] = useState();
  const [postData, setPostData] = useState(initState);
  const navigate = useNavigate();

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  const handleChangeFile = (e) => {
    console.log(e.target.files[0]);
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

      console.log(data);
      setProduct(data);
      setPostData(data);

      if (err) {
      }
    };
    getRestaurantData();
    getAPIData(id);
  }, [userData.user.subject, id]);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
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
                handleSubmitForm(e);
              }}
              encType="multipart/form-data"
            >
              <div className="form-group">
                <label>Product's Name:</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => handleChangeValue(e)}
                  name="name"
                  defaultValue={product.name}
                />
              </div>
              <div className="form-group">
                <label>Product's Image:</label>
                <div className="">
                  <input
                    type="file"
                    className="form-control"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={(e) => handleChangeFile(e)}
                  />
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
                  className="form-control"
                  onChange={(e) => handleChangeValue(e)}
                  name="price"
                  defaultValue={product.price}
                />
              </div>

              <div className="form-group">
                <label>Product's Sale Price:</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => handleChangeValue(e)}
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
                  className="form-control"
                  name="restaurantId"
                  id=""
                  onChange={(e) => handleChangeValue(e)}
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
              </div>
              <div className="form-group">
                <label>Product's Description:</label>

                <textarea
                  name="description"
                  id="inputdescription"
                  className="form-control"
                  rows="3"
                  onChange={(e) => handleChangeValue(e)}
                  value={product.description}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary">
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
