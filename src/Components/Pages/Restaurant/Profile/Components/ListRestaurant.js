import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as RestaurantService from "./../../../../../services/RestaurantService";

import { Link } from "react-router-dom";
import { selectUserData } from "../../../../../redux/reducers/users";

function ListRestaurant() {
  const userData = useSelector(selectUserData);
  const [restaurants, setRestaurant] = useState([]);

  useEffect(() => {
    const getAPIData = async () => {
      const [data, error] = await RestaurantService.getAllRestaurantByUser(
        userData.user.subject
      );
      if (data) {
        setRestaurant(data.restaurant);
      }
      if (error) {
        console.log(error.response.data.message);
      }
    };
    getAPIData();
  }, [userData.user.subject]);

  return (
    <div
      className="tab-pane fade active show"
      id="restaurant-information"
      role="tabpanel"
    >
      <div className="iq-card">
        <div className="iq-card-header d-flex justify-content-between">
          <div className="iq-header-title">
            <h4 className="card-title">Your List Restaurant</h4>
          </div>
        </div>
        <div className="iq-card-body">
          {restaurants.length === 0 ? (
            <div>Nothing To Show</div>
          ) : (
            restaurants.map((e, i) => {
              return (
                <Link
                  className="media mt-5 align-items-center"
                  key={i}
                  to={`/profile/${e.id}`}
                >
                  {e.avatar ? (
                    <img
                      className="align-self-center mr-3 w-25"
                      src={e.avatar}
                      alt={e.name}
                    />
                  ) : (
                    <img
                      className="align-self-center mr-3"
                      src="..."
                      alt="Your Logo Here"
                    />
                  )}

                  <div className="media-body">
                    <h5 className="mt-0">{e.name}</h5>
                    <p className="mb-0 text-black">Address: {e.address}</p>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default ListRestaurant;
