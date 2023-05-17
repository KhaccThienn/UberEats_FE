import React from "react";

function UpdateVoucher() {
  return (
    <div>
      <div className="col-sm-12">
        <div className="iq-card">
          <div className="iq-card-header d-flex justify-content-between">
            <div className="iq-header-title">
              <h4 className="card-title">Update</h4>
            </div>
          </div>
          <div className="iq-card-body">
            <div>
              <div className="form-group">
                <label>Voucher's Name:</label>
                <input type="text" className="form-control" />
              </div>

              <div className="form-group">
                <label>Product's Discount (Percent):</label>
                <input type="text" className="form-control" />
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              <button type="reset" className="btn btn-danger">
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateVoucher;
