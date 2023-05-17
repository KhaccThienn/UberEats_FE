import React from "react";

function AddProduct() {
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
            <div>
              <div className="form-group">
                <label>Product's Name:</label>
                <input type="text" className="form-control" />
              </div>

              <div className="form-group">
                <label>Product's Image:</label>
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    accept="image/png, image/jpeg"
                  />
                  <label className="custom-file-label">Choose file</label>
                </div>
              </div>

              <div className="form-group">
                <label>Product's Price:</label>
                <input type="text" className="form-control" />
              </div>

              <div className="form-group">
                <label>Product's Sale Price:</label>
                <input type="text" className="form-control" />
              </div>
              <div className="form-group">
                <label>Product's Status:</label>
                <div className="form-check">
                  <label className="form-check-label">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="status"
                      id=""
                      value="1"
                      checked
                    />{" "}
                    In Stock
                  </label>
                </div>
                <div className="form-check">
                  <label className="form-check-label">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="status"
                      id=""
                      value="0"
                    />{" "}
                    Out Of Stock
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="">Restaurant ?</label>
                <select className="form-control" name="restaurantId" id="">
                  <option></option>
                  <option></option>
                  <option></option>
                </select>
              </div>
              <div className="form-group">
                <label>Product's Description:</label>

                <textarea
                  name="description"
                  id="inputdescription"
                  className="form-control"
                  rows="3"
                  required="required"
                ></textarea>
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

export default AddProduct;
