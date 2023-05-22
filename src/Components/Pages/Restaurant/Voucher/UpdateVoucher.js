import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as VoucherService from "../../../../services/VoucherService";
import { selectUserData } from "../../../../redux/reducers/users";
import { useNavigate, useParams } from "react-router-dom";

function UpdateVoucher() {
  const { id } = useParams();
  const initVoucherState = {
    name: "",
    discount: "",
    restaurant: {},
  };
  const initPostDataState = {
    name: "",
    discount: "",
    restaurantId: "",
  };
  // console.log(id);
  const userData = useSelector(selectUserData);
  const [restaurants, setRestaurants] = useState([]);
  const [voucher, setVoucher] = useState(initVoucherState);
  const [postData, setPostData] = useState(initPostDataState);
  const navigate = useNavigate();

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    console.log({ name, value });
    setVoucher({ ...voucher, [name]: value });
    setPostData({ ...postData, [name]: value });
  };
  // console.log(userData);
  useEffect(() => {
    const getRestaurants = async () => {
      const [data, error] = await VoucherService.getAllRestaurantByUser(
        userData.user.subject
      );
      if (data) {
        setRestaurants(data.restaurant);
      }
      if (error) {
        console.log(error);
      }
    };

    const getVoucher = async () => {
      const [data, error] = await VoucherService.getVoucherByID(id);
      if (data) {
        // console.log(data);
        setVoucher(data);
      }
      if (error) {
        console.log(error);
      }
    };

    getRestaurants();
    getVoucher();
  }, [id, userData.user.subject]);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    console.log({ postData, voucher });
    const newVoucher = {
      name: postData.name ? postData.name : voucher.name,
      discount: postData.discount ? postData.discount : voucher.discount,
      restaurantId: postData.restaurantId
        ? postData.restaurantId
        : voucher.restaurant.id,
    };
    const [result, error] = await VoucherService.updateVoucher(id, newVoucher);
    if (result) {
      navigate("/voucher");
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
              <h4 className="card-title">Update Voucher</h4>
            </div>
          </div>
          <div className="iq-card-body">
            <form method="POST">
              <div className="form-group">
                <label>Voucher's Name:</label>
                <input
                  type="text"
                  name="name"
                  onChange={handleChangeValue}
                  defaultValue={voucher.name}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label>Product's Discount (Percent):</label>
                <input
                  type="text"
                  name="discount"
                  onChange={handleChangeValue}
                  defaultValue={voucher.discount}
                  className="form-control"
                />
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
                        selected={e.id === voucher.restaurant.id}
                      >
                        {e.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <button
                type="submit"
                onClick={(e) => handleSubmitForm(e)}
                className="btn btn-primary"
              >
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

export default UpdateVoucher;
