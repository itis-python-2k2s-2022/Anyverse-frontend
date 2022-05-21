import React from "react";
import {Outlet} from "react-router-dom";
import Navbar from "../components/NavbarElement";
const Layout = () => {
  return (
    <>
        <Navbar/>
        <div className="main_page">

        </div>
      <Outlet />
    </>
  );
};

export default Layout;