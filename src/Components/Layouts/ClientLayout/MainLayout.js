import React from "react";
import '../../../global/restaurant/css/typography.css'
import Footer from './Footer/Footer';
import Header from './Header/Header';

function MainLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default MainLayout;
