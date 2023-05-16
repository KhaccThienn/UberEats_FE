import React from "react";
import { Link } from "react-router-dom";

function Order() {
  return (
    <>
      <div className="row">
        <div className="col-sm-12">
          <div className="iq-card">
            <div className="iq-card-header d-flex justify-content-between">
              <div className="iq-header-title">
                <h4 className="card-title">List Ordered</h4>
              </div>
            </div>
            <div className="iq-card-body">
              <div className="table-responsive">
                <div class="row">
                  <div class="form-group col-lg-3 m-0">
                    <label for="">Sort By: </label>
                    <select class="form-control" name="" id="">
                      <option>Name (A-Z)</option>
                      <option>Name (Z-A)</option>
                      <option>Price (Low - High)</option>
                      <option>Price (High - Low)</option>
                    </select>
                  </div>
                </div>

                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>OrderID</th>
                      <th>Customers</th>
                      <th>Delevery Date</th>
                      <th>Delevery Address</th>
                      <th>Delevery Phone</th>
                      <th>Status</th>
                      <th>Voucher</th>
                      <th>Actions</th>
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
                      <td>binding_data</td>
                      <td>
                        <div className="dropdown">
                          <button
                            className="btn btn-primary dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            Actions
                          </button>
                          <div
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuButton"
                          >
                            <Link
                              className="dropdown-item"
                              to={"/order/1"}
                            >
                              View Details
                            </Link>
                            <Link
                              className="dropdown-item"
                              to={""}
                            >
                              {"Update Status"}
                            </Link>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    <li className="page-item">
                      <a className="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only">Previous</span>
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        1
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        2
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only">Next</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Order;
