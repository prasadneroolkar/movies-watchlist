import React from "react";
import Siderbar from "./Siderbar";
import { Outlet } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <>
      <section className="main d-flex">
        <Siderbar />
        <div className="right_common">
          <Outlet />
          {children}
        </div>
      </section>
    </>
  );
};

export default Layout;
