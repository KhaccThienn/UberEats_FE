import React from "react";

import ChangePassword from "./ChangePassword";

function UserProfile() {
  return (
    <>
      <div className="tab-pane fade" id="personal-information" role="tabpanel">
        <div
          className="tab-pane fade active show"
          id="personal-information"
          role="tabpanel"
        >
          <div className="iq-card">
            <div className="iq-card-header d-flex justify-content-between">
              <div className="iq-header-title">
                <h4 className="card-title">User Profile</h4>
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
                      <div className="p-image">
                        <i className="ri-pencil-line upload-button"></i>
                        <input
                          className="file-upload"
                          type="file"
                          accept="image/*"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" row align-items-center">
                  <div className="form-group col-sm-12">
                    <label htmlFor="uname">Username:</label>
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
          <ChangePassword />
        </div>
      </div>
    </>
  );
}

export default UserProfile;
