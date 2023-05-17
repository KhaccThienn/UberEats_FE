import React from "react";
import "../../../global/restaurant/css/bootstrap.min.css";
import "../../../global/restaurant/css/typography.css";
import "../../../global/restaurant/css/style.css";
import "../../../global/restaurant/css/responsive.css";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import SideBar from "./Sidebar/SideBar";

function ResMainLayout({ child }) {
  return (
    <div className="wrapper">
      <SideBar />
      <Header />
      <div id="content-page" className="content-page">
        <div className="container-fluid">{child}</div>
      </div>
      <Footer />
    </div>
  );
}

export default ResMainLayout;
