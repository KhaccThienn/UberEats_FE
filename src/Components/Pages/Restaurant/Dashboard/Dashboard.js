import React from "react";

function Dashboard() {
  return (
    <div className="row">
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
    </div>
  );
}

export default Dashboard;
