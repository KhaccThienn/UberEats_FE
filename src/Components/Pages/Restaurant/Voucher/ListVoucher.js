import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigateSearch } from "../../../../hooks/useNavigateSearch";
import * as VoucherService from "../../../../services/VoucherService";

function ListVoucher() {
  // init the state of all product
  const [allVouchers, setAllVouchers] = useState([]);

  // init the state of filter values
  const initState = {};
  const [filterValues, setFilterValues] = useState(initState);

  // init state for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // init state for search
  const [keySearch, setKeySearch] = useState("");

  const navigateSearch = useNavigateSearch();

  const handleSubmit = () => {
    console.log({ ...filterValues });
    navigateSearch("/product", { ...filterValues });
  };

  const clearFilter = () => {
    navigateSearch("/product", initState);
    setKeySearch("");
  };

  const queryParams = new URLSearchParams(window.location.search).toString();

  const handleChange = async (e) => {
    const { name, value } = await e.target;
    setFilterValues({ ...filterValues, [name]: value });
  };

  useEffect(() => {
    const getAllProductFromAPI = async () => {
      const [data, error] = await VoucherService.getAllVouchers(queryParams);
      if (data) {
        console.log(data);
        setTotalPages(Math.round(data.length / 2));
        queryParams
          ? setAllVouchers(data)
          : setAllVouchers(data.sort((a, b) => b.id - a.id));
      }
      if (error) {
        console.log(error);
      }
    };
    getAllProductFromAPI();
  }, [queryParams]);
  return (
    <div>
      <div className="row">
        <div className="col-sm-12">
          <div className="iq-card">
            <div className="iq-card-header d-flex justify-content-between">
              <div className="iq-header-title">
                <h4 className="card-title">List Vouchers</h4>
              </div>
              <div className="iq-card-header-toolbar d-flex align-items-center">
                <Link to={"/voucher/add"} className="btn btn-primary">
                  Add Voucher
                </Link>
              </div>
            </div>
            <div className="iq-card-body">
              <div className="table-responsive">
                <div className="row align-items-center">
                  <div className="form-group col-lg-3 m-0">
                    <select
                      className="form-control"
                      name="sort"
                      id=""
                      onChange={(e) => handleChange(e)}
                    >
                      <option value="">Select One...</option>
                      <option value="name-ASC">Name (A-Z)</option>
                      <option value="name-DESC">Name (Z-A)</option>
                      <option value="discount-ASC">
                        Discount (Low - High)
                      </option>
                      <option value="discount-DESC">
                        Discount (High - Low)
                      </option>
                    </select>
                  </div>
                  <div className="col-lg-3">
                    <button className="btn btn-primary" onClick={handleSubmit}>
                      {" "}
                      Submit
                    </button>
                  </div>
                </div>

                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Name</th>
                      <th>Discount</th>
                      <th>Restaurant ?</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allVouchers &&
                      allVouchers.map((e, i) => {
                        return (
                          <tr>
                            <td>{e.id}</td>
                            <td>{e.name}</td>
                            <td>{e.discount} %</td>
                            <td>{e.restaurant.name}</td>
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
                                    to={`/voucher/update/${e.id}`}
                                  >
                                    Update
                                  </Link>
                                  <Link className="dropdown-item" to={"#"}>
                                    Delete
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
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
    </div>
  );
}

export default ListVoucher;
