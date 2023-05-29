/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { selectUserData } from "../../../../redux/reducers/users";
import { useNavigateSearch } from "../../../../hooks/useNavigateSearch";
import * as OrderService from "../../../../services/OrderService";
import { GoPrimitiveDot } from "react-icons/go";
import { io } from "socket.io-client";

const socket = io("http://localhost:8000");


function Order() {
  const statusArr = [
    {
      sttId: 0,
      style: "text-warning",
      text: "Pending"
    },
    {
      sttId: 1,
      style: "text-primary",
      text: "Cooking"
    },
    {
      sttId: 2,
      style: "text-info",
      text: "Cooked"
    },
    {
      sttId: 3,
      style: "text-secondary",
      text: "Shipping"
    },
    {
      sttId: 4,
      style: "text-success",
      text: "Shipped"
    },
  ]
  const userData = useSelector(selectUserData);

  // init the state of all product
  const [allOrders, setAllOrders] = useState([]);

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

  const handleUpdateStatus = async (orderID, currentStatus) => {
    console.log({ orderID, currentStatus });
    const orderData = {
      status: currentStatus + 1
    }
    const [data, error] = await OrderService.updateOrderStatus(orderID, orderData);
    if (data) {
      socket.emit("restaurantAcceptOrder", orderData);
      setLoadPage(!loadPage);
    }
    if (error) {
      console.log(error);
    }
  }
  const getAllProductFromAPI = async () => {
    const [data, error] = await OrderService.getAllOrderByResOwner(userData.user.subject, queryParams);
    if (data) {
      console.log(data);
      setTotalPages(Math.round(data.length / 2));

      queryParams
        ? setAllOrders(data)
        : setAllOrders(data.sort((a, b) => b.id - a.id));
    }
    if (error) {
      console.log(error);
    }
  };

  socket.on("createOrderClient", (data) => {
    data ? console.log(data) : console.log("hehe");
    getAllProductFromAPI()
  })

  socket.on("deliverUpdateOrderStatus", (data) => {
    data ? console.log(data) : console.log("hehe");
    getAllProductFromAPI()
  })

  useEffect(() => {
    getAllProductFromAPI();
  }, [queryParams, loadPage, currentPage, userData.user.subject]);
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
                    <label htmlFor="">Sort By: </label>
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
                      <th>OrderID</th>
                      <th>Customers</th>
                      <th>Delevery Address</th>
                      <th>Delevery Phone</th>
                      <th>Status</th>
                      <th>Voucher</th>
                      <th>Total Price</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      allOrders && allOrders.map((e, i) => {
                        return (
                          <tr key={i}>
                            <td>{e.id}</td>
                            <td>{e.delivered_user}</td>
                            <td>{e.delivered_address}</td>
                            <td>{e.delivered_phone}</td>
                            {
                              statusArr.map((status, index) => {
                                if (status.sttId === e.status) {
                                  return (
                                    <td className={status.style} key={index}>

                                      <GoPrimitiveDot /> {status.text}
                                    </td>
                                  )
                                }
                              })
                            }
                            <td>{e.vouchers ? <>{e.vouchers.name} - {e.vouchers.discount}</> : <>Null</>}</td>
                            <td>{e.total_price}</td>
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
                                    to={`/order/${e.id}`}
                                  >
                                    View Details
                                  </Link>
                                  {
                                    e.status >= 2 ? <></> :
                                      <button
                                        className="dropdown-item"
                                        onClick={() => handleUpdateStatus(e.id, e.status)}
                                      >
                                        Update Status
                                      </button>
                                  }

                                </div>
                              </div>
                            </td>
                          </tr>
                        )
                      })
                    }

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
