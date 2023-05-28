import React from "react";
import RestaurantProfile from "./Components/RestaurantProfile";
import UserProfile from "./Components/UserProfile";
import ChangePassword from "./Components/ChangePassword";
import { useParams } from "react-router";
import ListRestaurant from "./Components/ListRestaurant";

function Profile() {
  const { id } = useParams();
  return (
    <div>
      <div className="row">
        <div className="col-lg-12">
          <div className="iq-card">
            <div className="iq-card-body p-0">
              <div className="iq-edit-list">
                <ul className="iq-edit-profile d-flex nav nav-pills">
                  <li className="col-md-6 p-0">
                    <a
                      className="nav-link active"
                      data-toggle="pill"
                      href="#restaurant-information"
                    >
                      Restaurant Profile
                    </a>
                  </li>
                  <li className="col-md-6 p-0">
                    <a
                      className="nav-link"
                      data-toggle="pill"
                      href="#personal-information"
                    >
                      User Profile
                    </a>
                  </li>

                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="iq-edit-list-data">
            <div className="tab-content">
              {/* Restaurant Profile */}
              {id ? <RestaurantProfile resID={id} /> : <ListRestaurant />}
              {/* User Profile */}
              <UserProfile />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
