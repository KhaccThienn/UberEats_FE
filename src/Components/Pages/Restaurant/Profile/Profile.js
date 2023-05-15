import React from "react";

function Profile() {
  return (
    <div>
      <div className="row">
        <div className="col-lg-12">
          <div className="iq-card">
            <div className="iq-card-body p-0">
              <div className="iq-edit-list">
                <ul className="iq-edit-profile d-flex nav nav-pills">
                  <li className="col-md-3 p-0">
                    <a
                      className="nav-link active"
                      data-toggle="pill"
                      href="#personal-information"
                    >
                      Profile
                    </a>
                  </li>
                  <li className="col-md-3 p-0">
                    <a
                      className="nav-link"
                      data-toggle="pill"
                      href="#chang-pwd"
                    >
                      Change Password
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
              <div
                className="tab-pane fade active show"
                id="personal-information"
                role="tabpanel"
              >
                <div className="iq-card">
                  <div className="iq-card-header d-flex justify-content-between">
                    <div className="iq-header-title">
                      <h4 className="card-title">Profile</h4>
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
                          <label htmlFor="uname">Company Name:</label>
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                          />
                        </div>
                        <div className="form-group col-sm-6">
                          <label htmlFor="cname">Phone:</label>
                          <input
                            type="text"
                            className="form-control"
                            id="address"
                          />
                        </div>
                        <div className="form-group col-sm-6">
                          <label htmlFor="cname">Email:</label>
                          <input
                            type="text"
                            className="form-control"
                            id="email"
                          />
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
              <div className="tab-pane fade" id="chang-pwd" role="tabpanel">
                <div className="iq-card">
                  <div className="iq-card-header d-flex justify-content-between">
                    <div className="iq-header-title">
                      <h4 className="card-title">Đổi mật khẩu</h4>
                    </div>
                  </div>
                  <div className="iq-card-body">
                    <form>
                      <div className="form-group">
                        <label htmlFor="cpass">Mật khẩu hiện tại:</label>
                        <a href="javascripe:void();" className="float-right">
                          Quên mật khẩu
                        </a>
                        <input
                          type="Password"
                          className="form-control"
                          id="cpass"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="npass">Mật khẩu mới:</label>
                        <input
                          type="Password"
                          className="form-control"
                          id="npass"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="vpass">Xác nhận lại mật khẩu:</label>
                        <input
                          type="Password"
                          className="form-control"
                          id="vpass"
                        />
                      </div>
                      <button type="submit" className="btn btn-primary mr-2">
                        Gửi
                      </button>
                      <button type="reset" className="btn iq-bg-danger">
                        Hủy bỏ
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
