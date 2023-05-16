import React from "react";

function ChangePassword() {
  return (
    <div>
      <div className="tab-pane fade active show" id="chang-pwd" role="tabpanel">
        <div className="iq-card">
          <div className="iq-card-header d-flex justify-content-between">
            <div className="iq-header-title">
              <h4 className="card-title">Change Password</h4>
            </div>
          </div>
          <div className="iq-card-body">
            <div>
              <p className="px-3">Change Password </p>
              <div className="form-group col-sm-12">
                <label htmlFor="uname">Old Password:</label>
                <input type="text" className="form-control" id="name" />
              </div>
              <div className="d-flex">
                <div className="form-group col-sm-6">
                  <label htmlFor="cname">New Password:</label>
                  <input type="text" className="form-control" id="address" />
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="cname">Confirm Password:</label>
                  <input type="text" className="form-control" id="email" />
                </div>
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
  );
}

export default ChangePassword;
