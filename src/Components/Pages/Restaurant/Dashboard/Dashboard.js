import React from "react";
import { useSelector } from "react-redux";
import { selectUserData } from "../../../../redux/reducers/users";
import * as ProductService from "../../../../services/ProductService";
import * as OrderService from "../../../../services/OrderService";
import * as RestaurantService from "../../../../services/RestaurantService"
import * as UserService from "../../../../services/UserService"
import * as VoucherService from "../../../../services/VoucherService"
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import { BsFillTicketPerforatedFill } from "react-icons/bs"
import { RiShoppingCartLine } from "react-icons/ri"
import { MdOutlineProductionQuantityLimits } from "react-icons/md"
import { MdOutlinePending } from "react-icons/md"


function Dashboard() {
  const userData = useSelector(selectUserData);

  const [restaurants, setRestaurants] = useState([]);
  const [users, setUsers] = useState([]);
  const [allVouchers, setAllVouchers] = useState([]);
  const [allProd, setAllProd] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [pendingOrder, setPendingOrders] = useState([]);

  const getAllOrdersFromAPI = async () => {
    const [data, error] = await OrderService.getAllOrderByResOwner(userData.user.subject);
    if (data) {
      setAllOrders(data);
      const pendingOrds = data.filter((item) => item.status == 0);
      setPendingOrders(pendingOrds)
    }
    if (error) {
      console.log(error);
    }
  };
  const getRestaurantByUserID = async () => {
    const [data, error] = await RestaurantService.getAllRestaurantByUser(userData.user.subject);
    if (data) {
      setRestaurants(data.restaurant);
      console.log(data.restaurant);
    }
    if (error) {
      console.log(error);
    }
  }
  const getAllProductFromAPI = async () => {
    const [data, error] = await ProductService.getAllProduct(userData.user.subject);
    if (data) {
      setAllProd(data)
    }
    if (error) {
      console.log(error);
    }
  };
  const getAllUserClient = async (roleId) => {
    const [data, error] = await UserService.getAllUsersByRole(roleId);
    if (data) {
      setUsers(data)
    }
    if (error) {
      console.log(error);
    }
  }
  const getAllVouchersFromAPI = async () => {
    const [data, error] = await VoucherService.getAllVouchers(userData.user.subject);
    if (data) {
      setAllVouchers(data)
    }
    if (error) {
      console.log(error);
    }
  };
  getAllProductFromAPI();
  useEffect(() => {
    getAllUserClient(1);
    getAllOrdersFromAPI()
    getAllProductFromAPI();
    getRestaurantByUserID();
    getAllVouchersFromAPI();
  }, [userData.user.subject, restaurants.length])
  return (
    <div className="row">
      {
        restaurants.length > 0 ? <>
          <div className="col-md-6 col-lg-3">
            <div className="iq-card iq-card-block iq-card-stretch iq-card-height">
              <div className="iq-card-body">
                <div className="d-flex align-items-center">
                  <div className="rounded-circle iq-card-icon bg-primary">
                    <BsFillTicketPerforatedFill />
                  </div>
                  <div className="text-left ml-3">
                    <h2 className="mb-0">
                      <span className="counter">{allVouchers.length}</span>
                    </h2>
                    <h5 className="">Vouchers</h5>
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
                    <MdOutlineProductionQuantityLimits />
                  </div>
                  <div className="text-left ml-3">
                    <h2 className="mb-0">
                      <span className="counter">{allProd.length}</span>
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
                    <RiShoppingCartLine />
                  </div>
                  <div className="text-left ml-3">
                    <h2 className="mb-0">
                      <span className="counter">{allOrders.length}</span>
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
                    <MdOutlinePending />
                  </div>
                  <div className="text-left ml-3">
                    <h2 className="mb-0">
                      <span className="counter">
                        {
                          pendingOrder.length
                        }
                      </span>
                    </h2>
                    <h5 className="">Orders Pending</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </> :
          <>
            <p>
              You don't have a restaurant yet, <Link to={"/add-restaurant"} className="">create one?</Link>
            </p>
          </>
      }

    </div>
  );
}

export default Dashboard;
