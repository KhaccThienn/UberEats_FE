import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup"
import { selectUserData } from "../../../../redux/reducers/users";
import * as VoucherService from "../../../../services/VoucherService";

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
  const [allVouchersName, setAllVouchersName] = useState([])
  const [postData, setPostData] = useState(initPostDataState);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Please enter voucher name').min(5, "At Least 5 characters").notOneOf(allVouchersName, "This Voucher Name is already in use"),
    discount: Yup.number().required('Please enter discount percent').min(1, "Discount must be greater than 1").max(100, "Discount must be less than 100"),

  })

  const formik = useFormik({
    initialValues: initPostDataState,
    validationSchema,
    onSubmit: async (e) => {
      await handleSubmitForm(e)
    }
  })

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    console.log({ name, value });
    formik.values[name] = value;
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
        setVoucher(data);
        formik.setValues(data);
      }
      if (error) {
        console.log(error);
      }
    };

    const getAllVouchersExceptOneID = async (id) => {
      const [data, error] = await VoucherService.getAllVouchersExceptOne(id);
      if (data) {
        setAllVouchersName(data)
      }
      if (error) {
        console.log(error);
      }
    }
    getAllVouchersExceptOneID(id)
    getRestaurants();
    getVoucher();
  }, [id, userData.user.subject]);

  const handleSubmitForm = async (e) => {
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
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Voucher updated successfully',
        showConfirmButton: false,
      })
      navigate("/voucher");
    }
    if (error) {
      console.log(error);

    };
  }
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
            <form method="POST" onSubmit={(e) => {
              formik.handleSubmit(e);
            }}>
              <div className="form-group">
                <label>Voucher's Name:</label>
                <input
                  type="text"
                  name="name"
                  onChange={(e) => { handleChangeValue(e); formik.handleChange(e) }}
                  defaultValue={voucher.name}
                  className={formik.errors.name ? "form-control is-invalid" : "form-control"}
                />
                {
                  formik.errors.name &&
                  <small id="helpId" className="text-danger">{formik.errors.name}</small>
                }
              </div>

              <div className="form-group">
                <label>Product's Discount (Percent):</label>
                <input
                  type="text"
                  name="discount"
                  onChange={(e) => { handleChangeValue(e); formik.handleChange(e) }}
                  defaultValue={voucher.discount}
                  className={formik.errors.discount ? "form-control is-invalid" : "form-control"}
                />
                {
                  formik.errors.discount &&
                  <small id="helpId" className="text-danger">{formik.errors.discount}</small>
                }
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
                        selected={e.id === voucher.restaurant.id}
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
              <button
                type="submit"
                className="btn btn-primary rounded-0"
              >
                Submit
              </button>
              <button type="reset" className="btn btn-danger rounded-0">
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
