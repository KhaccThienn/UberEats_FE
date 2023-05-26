import React from "react";
import { useSelector } from "react-redux";
import { selectUserData } from "../../../../redux/reducers/users";
import * as RestaurantService from "../../../../services/RestaurantService"
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const userData = useSelector(selectUserData);

  const [restaurants, setRestaurants] = useState([]);
  console.log(userData);

  useEffect(() => {
    const getRestaurantByUserID = async () => {
      const [data, error] = await RestaurantService.getAllRestaurantByUser(userData.user.subject);
      if (data) {
        setRestaurants(data.restaurant);
        console.log(data.restaurant);
      }
      if (error) {
        console.log(error);
      }
    }
    getRestaurantByUserID()
  }, [userData.user.subject, restaurants.length])
  return (
    <div className="row">
      {
        restaurants.length > 0 ? <>
          <div className="col-md-6 col-lg-3">
            <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
              <div className="iq-card-body">
                <div className="d-flex align-items-center">
                  <div className="rounded-circle iq-card-icon bg-primary">
                    <i className="ri-user-line"></i>
                  </div>
                  <div className="text-left ml-3">
                    <h2 className="mb-0">
                      <span className="counter">7</span>
                    </h2>
                    <h5 className="">Users</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
              <div className="iq-card-body">
                <div className="d-flex align-items-center">
                  <div className="rounded-circle iq-card-icon bg-danger">
                    <i className="ri-book-line"></i>
                  </div>
                  <div className="text-left ml-3">
                    <h2 className="mb-0">
                      <span className="counter">4</span>
                    </h2>
                    <h5 className="">Products</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
              <div className="iq-card-body">
                <div className="d-flex align-items-center">
                  <div className="rounded-circle iq-card-icon bg-warning">
                    <i className="ri-shopping-cart-2-line"></i>
                  </div>
                  <div className="text-left ml-3">
                    <h2 className="mb-0">
                      <span className="counter">1</span>
                    </h2>
                    <h5 className="">Orders</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
              <div className="iq-card-body">
                <div className="d-flex align-items-center">
                  <div className="rounded-circle iq-card-icon bg-info">
                    <i className="ri-radar-line"></i>
                  </div>
                  <div className="text-left ml-3">
                    <h2 className="mb-0">
                      <span className="counter">690</span>
                    </h2>
                    <h5 className="">Pending</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </> :
          <>
            <p>
              You don't have a restaurant yet, <Link to={"/add-restaurant"} className="">create one?</Link>
            </p>
          </>
      }

    </div>
  );
}

export default Dashboard;
