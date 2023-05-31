import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as VoucherService from "../../../../services/VoucherService";
import { selectUserData } from "../../../../redux/reducers/users";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function AddVoucher() {
  const initState = {
    name: "",
    discount: 0,
    restaurantId: "",
  };

  const userData = useSelector(selectUserData);
  const [restaurants, setRestaurants] = useState([]);
  const [postData, setPostData] = useState(initState);
  const navigate = useNavigate();

  const handleChangeValue = async (e) => {
    const { name, value } = await e.target;
    console.log({ name, value });
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
    getRestaurants();
  }, [userData.user.subject]);

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const [result, error] = await VoucherService.createVoucher(postData);
    if (result) {
      console.log(result);
      navigate("/voucher");
    }
    if (error) {
      console.log(error);
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'All Fields Are Required',
        showConfirmButton: false,
        timer: 1500
      })
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
            >
              <div className="form-group">
                <label>Voucher's Name:</label>
                <input
                  type="text"
                  name="name"
                  onChange={handleChangeValue}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label>Product's Discount (Percent):</label>
                <input
                  type="text"
                  name="discount"
                  onChange={handleChangeValue}
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
                      <option key={i} value={e.id}>
                        {e.name}
                      </option>
                    );
                  })}
                </select>
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

export default AddVoucher;
