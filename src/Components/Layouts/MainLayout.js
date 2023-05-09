import React from "react";
import Header from "./Header/Header";

function MainLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default MainLayout;
