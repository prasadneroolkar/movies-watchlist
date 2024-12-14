import React, { useRef } from "react";
import Siderbar from "./Siderbar";
import { Outlet } from "react-router-dom";

const Layout = ({ children }) => {
  const boxRef = useRef(null);

  return (
    <>
      <section className="main d-flex">
        <Siderbar />
        <div className="right_common" ref={boxRef}>
          <Outlet context={{ boxRef }} />
          {children}
        </div>
      </section>
    </>
  );
};

export default Layout;
