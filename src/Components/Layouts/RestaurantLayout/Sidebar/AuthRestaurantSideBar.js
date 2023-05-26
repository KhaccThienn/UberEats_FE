import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineHome } from "react-icons/ai";

function AuthRestaurantSideBar() {
     return (
          <div><div>
               <div className="iq-sidebar">
                    <div className="iq-sidebar-logo d-flex justify-content-between">
                         <Link to="" className="header-logo">
                              <img
                                   src="images/logo.png"
                                   className="img-fluid rounded-normal"
                                   alt=""
                              />
                              <div className="logo-title">
                                   <span className="text-primary text-uppercase">
                                        Uber Eats - Restaurant
                                   </span>
                              </div>
                         </Link>
                    </div>
                    <div id="sidebar-scrollbar">
                         <nav className="iq-sidebar-menu">
                              <ul id="iq-sidebar-toggle" className="iq-menu">
                                   <li>
                                        <Link to={"/add-restaurant"}>
                                             <AiOutlineHome />
                                             &nbsp; Add Restaurant
                                        </Link>
                                   </li>
                              </ul>
                         </nav>
                    </div>
               </div>
          </div></div>
     )
}

export default AuthRestaurantSideBar