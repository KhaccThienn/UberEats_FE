import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUserData } from "../../../../redux/reducers/users";
import * as ProductService from "../../../../services/ProductService";
import style from "./AddProduct.module.css";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(style);

function AddProduct() {
  const initState = {
    name: "",
    price: "",
    image: {},
    sale_price: 0,
    status: 1,
    description: "",
    restaurantId: "",
  };

  const userData = useSelector(selectUserData);
  const [restaurants, setRestaurant] = useState([]);
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
    const getAPIData = async () => {
      const [data, error] = await ProductService.getAllRestaurantByUser(
        userData.user.subject
      );
      if (data) {
        setRestaurant(data.restaurant);
      }
      if (error) {
      }
    };
    getAPIData();
  }, [userData.user.subject]);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", postData.name);
    formData.append("image", postImage);
    formData.append("price", postData.price);
    formData.append("sale_price", postData.sale_price);
    formData.append("status", postData.status);
    formData.append("description", postData.description);

    const [result, error] = await ProductService.createProduct(
      postData.restaurantId,
      formData
    );
    if (result) {
      navigate("/product");
    }
    if (error) {
      console.log(error);
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
                handleSubmitForm(e);
              }}
              encType="multipart/form-data"
            >
              <div className="form-group">
                <label>Product's Name:</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={handleChangeValue}
                  name="name"
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
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Product's Price:</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={handleChangeValue}
                  name="price"
                />
              </div>

              <div className="form-group">
                <label>Product's Sale Price:</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={handleChangeValue}
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
                  className="form-control"
                  name="restaurantId"
                  id=""
                  onChange={(e) => handleChangeValue(e)}
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
              </div>
              <div className="form-group">
                <label>Product's Description:</label>

                <textarea
                  name="description"
                  id="inputdescription"
                  className="form-control"
                  rows="3"
                  onChange={handleChangeValue}
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

export default AddProduct;
