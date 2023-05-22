import React from "react";
import Footer from "../ClientLayout/Footer/Footer";
import '../../../global/restaurant/css/typography.css'
import DeliverHeader from "./DeliverHeader/DeliverHeader";

function DeliverLayout({ children }) {
  return (
    <div>
      <DeliverHeader />
      {children}
      <Footer />
    </div>
  );
}

export default DeliverLayout;
