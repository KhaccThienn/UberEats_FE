/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import dateFormat from "dateformat";
import { GoPrimitiveDot } from "react-icons/go";
import { TiTickOutline } from "react-icons/ti";
import { FaEye } from "react-icons/fa";
import { FcAcceptDatabase } from "react-icons/fc";
import { io } from "socket.io-client";
import { selectUserData } from "../../../../redux/reducers/users";
import { useNavigateSearch } from "../../../../hooks/useNavigateSearch";
import * as OrderService from "../../../../services/OrderService";

const socket = io(process.env.REACT_APP_URL_API);


function Order() {
  const formatPrice = (price) => {
    return price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    });
  };
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
      style: "text-dark",
      text: "Picked"
    },
    {
      sttId: 4,
      style: "text-secondary",
      text: "Shipping"
    },
    {
      sttId: 5,
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
    navigateSearch("/order", { ...filterValues });
  };

  const clearFilter = () => {
    navigateSearch("/order", initState);
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
      socket.emit("restaurantAcceptOrder", { orderID, orderData });
      setLoadPage(!loadPage);
    }
    if (error) {
      console.log(error);
    }
  }
  const getAllOrdersFromAPI = async () => {
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
  socket.on("handleCanceledOrder", (data) => {
    data ? console.log(data) : console.log("hehe");
    getAllOrdersFromAPI()
  })

  socket.on("createOrderClient", (data) => {
    data ? console.log(data) : console.log("hehe");
    getAllOrdersFromAPI()
  })

  socket.on("deliverUpdateOrderStatus", (data) => {
    data ? console.log(data) : console.log("hehe");
    getAllOrdersFromAPI()
  })
  socket.on("deliverShippingOrder", (data) => {
    data ? console.log(data) : console.log("hehe");
    getAllOrdersFromAPI()
  })
  socket.on("deliverShippedOrder", (data) => {
    data ? console.log(data) : console.log("hehe");
    getAllOrdersFromAPI()
  })

  useEffect(() => {
    getAllOrdersFromAPI();
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
                <div class="row align-items-center my-2">
                  <div class="form-group col-lg-3 m-0">
                    <select class="form-control rounded-0" name="sort" id="" onChange={(e) => handleChange(e)}>
                      <option>Choose One</option>
                      <option value="status-ASC">Status (Low - High)</option>
                      <option value="status-DESC">Status (High - Low)</option>
                      <option value="created_at-ASC">Date Created (Low - High)</option>
                      <option value="created_at-DESC">Date Created (High - Low)</option>
                    </select>
                  </div>
                  <div className="col-lg-3">
                    <button className="btn btn-primary rounded-0" onClick={handleSubmit}>
                      {" "}
                      Submit
                    </button>
                  </div>
                </div>

                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Customers</th>
                      <th>Delevery Address</th>
                      <th>Delevery Phone</th>
                      <th>Status</th>
                      <th>Created At</th>
                      <th>Voucher</th>
                      <th>Total Price</th>
                      <th></th>
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
                              statusArr && statusArr.map((status, index) => {
                                if (status.sttId === e.status) {
                                  return (
                                    <td className={status.style} key={index}>

                                      <GoPrimitiveDot /> {status.text}
                                    </td>
                                  )
                                }
                              })
                            }
                            <td>{dateFormat(e.created_at)}</td>
                            <td>{e.vouchers ? <>{e.vouchers.name} - {e.vouchers.discount}</> : <>No voucher added yet</>}</td>
                            <td>{formatPrice(e.total_price)}</td>
                            <td className="text-right">
                              <div className="d-flex">
                                <Link
                                  className="btn btn-info rounded-0 mr-2"
                                  to={`/order/${e.id}`}
                                >
                                  <FaEye />View
                                </Link>
                                {
                                  e.status == 0 && <button
                                    className="btn btn-success rounded-0"
                                    onClick={() => handleUpdateStatus(e.id, e.status)}
                                  >
                                    <FcAcceptDatabase /> Accept
                                  </button>
                                }
                                {
                                  e.status == 1 && <button
                                    className="btn btn-success rounded-0"
                                    onClick={() => handleUpdateStatus(e.id, e.status)}
                                  >
                                    <TiTickOutline /> Cooked
                                  </button>
                                }
                              </div>
                            </td>
                          </tr>
                        )
                      })
                    }

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Order;
