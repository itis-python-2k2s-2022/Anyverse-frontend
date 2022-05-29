import React from "react";
import {Outlet} from "react-router-dom";


const Layout = () => {
  return (
    <>
        <div className="main_page">
        </div>
      <Outlet />
    </>
  );
};

export default Layout;