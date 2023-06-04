import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
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
  const [allVouchersName, setAllVouchersName] = useState([])
  const [postData, setPostData] = useState(initState);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Please enter voucher name').min(5, "At Least 5 characters").notOneOf(allVouchersName, "This Voucher Name is already in use"),
    discount: Yup.number().required('Please enter discount percent').min(1, "Discount must be greater than 1").max(100, "Discount must be less than 100"),
    restaurantId: Yup.string().required('Please choose the restaurant'),
  })
  const formik = useFormik({
    initialValues: initState,
    validationSchema,
    onSubmit: async (e) => {
      await handleSubmitForm(e)
    }
  })

  const handleChangeValue = async (e) => {
    const { name, value } = await e.target;
    formik.values[name] = value
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
    const getAllVouchersNameFromAPI = async () => {
      const [data, error] = await VoucherService.getAllVouchersname();
      if (data) {
        console.log(data);
        setAllVouchersName(data);
      }
      if (error) {
        console.log(error);
      }
    }
    getAllVouchersNameFromAPI()
    getRestaurants();
  }, [userData.user.subject]);

  const handleSubmitForm = async (e) => {
    const [result, error] = await VoucherService.createVoucher(postData);
    if (result) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Add Voucher Successfully',
        showConfirmButton: false,
        timer: 1500
      })
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
              <h4 className="card-title">Add New</h4>
            </div>
          </div>
          <div className="iq-card-body">
            <form
              method="POST"
              onSubmit={(e) => {
                formik.handleSubmit(e);
              }}
            >
              <div className="form-group">
                <label>Voucher's Name:</label>
                <input
                  type="text"
                  name="name"
                  onChange={(e) => { handleChangeValue(e); formik.handleChange(e) }}
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
              <button type="submit" className="btn btn-primary rounded-0">
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

export default AddVoucher;
