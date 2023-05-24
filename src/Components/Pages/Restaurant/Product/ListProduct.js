/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigateSearch } from "./../../../../hooks/useNavigateSearch";
import * as ProductService from "../../../../services/ProductService";
import Swal from "sweetalert2";

function ListProduct() {
  // init the state of all product
  const [allProd, setAllProd] = useState([]);

  const [loadPage, setLoadPage] = useState(false);

  // init the state of filter values
  const initState = {};
  const [filterValues, setFilterValues] = useState(initState);

  // init state for pagination
  const [currentPage, setCurrentPage] = useState(2);
  const [totalPages, setTotalPages] = useState(10);

  // init state for search
  const [keySearch, setKeySearch] = useState("");

  // useNavigate search
  const navigateSearch = useNavigateSearch();

  const handleSubmit = () => {
    console.log({ ...filterValues });
    navigateSearch("/product", { ...filterValues });
  };

  const clearFilter = () => {
    navigateSearch("/product", initState);
    setKeySearch("");
  };

  const getQueryParams = () => {
    return new URLSearchParams(window.location.search).toString();
  };

  const queryParams = getQueryParams();

  const handleChange = async (e) => {
    const { name, value } = await e.target;
    setFilterValues({ ...filterValues, [name]: value });
  };

  // generate slugs string
  const slugsGenerator = (string) => {
    return string.replaceAll(" ", "_");
  };

  const handleDelete = async (id) => {
    const choose = await Swal.fire({
      title: "Do you want to delete this product ?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
    });
    console.log(choose.isConfirmed);
    if (choose.isConfirmed) {
      const [data, error] = await ProductService.deleteProduct(id);
      if (error) {
        Swal.fire("Having Error !", "", "error");
      }
      if (data) {
        setLoadPage(!loadPage);
        console.log(data);
        Swal.fire("Delete Successfully!", "", "success");
      }
    }

    console.log(id);
  };

  // const handleChangePage = async (e) => {
  //   const name = e.target.name;
  //   if (name === "next") {
  //     setCurrentPage(currentPage + 1);
  //     setFilterValues({ ...filterValues, page: currentPage });
  //     console.log(filterValues);
  //     setLoadPage(true);
  //     navigateSearch("/product", { ...filterValues });
  //   }
  //   if (name === "previous") {
  //     setCurrentPage(currentPage - 1);
  //     setFilterValues({ ...filterValues, page: currentPage });
  //     console.log(filterValues);
  //     setLoadPage(true);
  //     navigateSearch("/product", { ...filterValues });
  //   }
  // };

  useEffect(() => {
    const getAllProductFromAPI = async () => {
      const [data, error] = await ProductService.getAllProduct(queryParams);
      if (data) {
        // console.log(data);
        setTotalPages(Math.round(data.length / 2));
        console.log("Data Length: ", data.length);
        console.log("Total Page: ", Math.round(data.length / 2));
        queryParams
          ? setAllProd(data)
          : setAllProd(data.sort((a, b) => b.id - a.id));
      }
      if (error) {
        console.log(error);
      }
    };
    getAllProductFromAPI();
  }, [queryParams, loadPage, currentPage]);

  return (
    <div>
      <div className="row">
        <div className="col-sm-12">
          <div className="iq-card">
            <div className="iq-card-header d-flex justify-content-between">
              <div className="iq-header-title">
                <h4 className="card-title">List Products</h4>
              </div>
              <div className="iq-card-header-toolbar d-flex align-items-center">
                <Link to={"/product/add"} className="btn btn-primary">
                  Add Product
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
                      <option value="price-ASC">Price (Low - High)</option>
                      <option value="price-DESC">Price (High - Low)</option>
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
                      <th>Image</th>
                      <th>Price</th>
                      <th>Sale Price</th>
                      <th>Status</th>
                      <th>Description</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allProd.map((e, i) => {
                      return (
                        <tr key={i}>
                          <td>{e.id}</td>
                          <td>{e.name}</td>
                          <td className="w-25">
                            <img
                              src={e.image}
                              alt={e.name}
                              className="card-img"
                            />
                          </td>
                          <td>{e.price}</td>
                          <td>{e.sale_price}</td>
                          <td>{e.status === 1 ? "Show" : "Hide"}</td>
                          <td>{e.description}</td>
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
                                  to={`/product/update/${e.id}-${slugsGenerator(
                                    e.name
                                  )}`}
                                >
                                  Update
                                </Link>
                                <button
                                  className="dropdown-item"
                                  onClick={() => handleDelete(e.id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-center">
                    <li className="page-item">
                      <button
                        className="page-link"
                        aria-label="Previous"
                        // onClick={(e) => handleChangePage(e)}
                        name="previous"
                      // disabled={currentPage === 1}
                      >
                        &laquo; Previous
                      </button>
                    </li>

                    <li className="page-item">
                      <button
                        className="page-link"
                        href="#"
                        aria-label="Next"
                        // onClick={(e) => handleChangePage(e)}
                        name="next"
                      // disabled={currentPage === totalPages}
                      >
                        Next &raquo;
                      </button>
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

export default ListProduct;
