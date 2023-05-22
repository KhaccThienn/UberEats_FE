import React from "react";

function OrderDetails() {
  return (
    <div>
      <div className="row">
        <div className="col-sm-12">
          <div className="iq-card">
            <div className="iq-card-header d-flex justify-content-between">
              <div className="iq-header-title">
                <h4 className="card-title">Order Details</h4>
              </div>
            </div>
            <div className="iq-card-body">
              <div class="row">
                <div className="col-lg-6">
                  <div className="iq-header-title">
                    <h4 className="card-title">Order Information</h4>
                  </div>
                  <div className="iq-card-body p-0">
                    <div className="table-responsive">
                      <table className="table table-striped table-bordered">
                        <tr>
                          <th>No. </th>
                          <td>Binding_data</td>
                        </tr>
                        <tr>
                          <th>Order Date </th>
                          <td>Binding_data</td>
                        </tr>
                        <tr>
                          <th>Total Price </th>
                          <td>Binding_data</td>
                        </tr>
                        <tr>
                          <th>Status </th>
                          <td>Binding_data</td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="iq-header-title">
                    <h4 className="card-title">Shipment Details</h4>
                  </div>
                  <div className="iq-card-body p-0">
                    <div className="table-responsive">
                      <table className="table table-striped table-bordered">
                        <tr>
                          <th>Name. </th>
                          <td>Binding_data</td>
                        </tr>
                        <tr>
                          <th>Email </th>
                          <td>Binding_data</td>
                        </tr>
                        <tr>
                          <th>Phone </th>
                          <td>Binding_data</td>
                        </tr>
                        <tr>
                          <th>Address </th>
                          <td>Binding_data</td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="iq-card">
            <div className="iq-card-header d-flex justify-content-between">
              <div className="iq-header-title">
                <h4 className="card-title">List Products</h4>
              </div>
            </div>
            <div className="iq-card-body">
              <div class="row">
                <div className="col-lg-12">
                  <div className="iq-card-body p-0">
                    <div className="table-responsive">
                      <table className="table table-striped table-bordered">
                        <thead>
                          <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Price</th>
                            <th>Sale Price</th>
                            <th>Status</th>
                            <th>Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>binding_data</td>
                            <td>binding_data</td>
                            <td>binding_data</td>
                            <td>binding_data</td>
                            <td>binding_data</td>
                            <td>binding_data</td>
                            <td>binding_data</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
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

export default OrderDetails;
