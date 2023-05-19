import React from "react";

function RestaurantProfile() {
  return (
    <>
      <div
        className="tab-pane fade active show"
        id="restaurant-information"
        role="tabpanel"
      >
        <div className="iq-card">
          <div className="iq-card-header d-flex justify-content-between">
            <div className="iq-header-title">
              <h4 className="card-title">Restaurant Profile</h4>
            </div>
          </div>
          <div className="iq-card-body">
            <div>
              <div className="form-group row align-items-center">
                <div className="col-md-12">
                  <div className="profile-img-edit">
                    <img
                      className="profile-pic"
                      src="images/user/1.jpg"
                      alt="profile-pic"
                    />
                    <input
                      className="form-control"
                      type="file"
                      accept="image/*"
                    />
                  </div>
                </div>
              </div>
              <div className=" row align-items-center">
                <div className="form-group col-sm-12">
                  <label htmlFor="uname">Company Name:</label>
                  <input type="text" className="form-control" id="name" />
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="cname">Phone:</label>
                  <input type="text" className="form-control" id="address" />
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="cname">Email:</label>
                  <input type="text" className="form-control" id="email" />
                </div>

                <div className="form-group col-sm-12">
                  <label>Address:</label>
                  <textarea
                    className="form-control"
                    name="address"
                    rows="5"
                  ></textarea>
                </div>
              </div>
              <button type="submit" className="btn btn-primary mr-2">
                Submit
              </button>
              <button type="reset" className="btn iq-bg-danger">
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RestaurantProfile;
