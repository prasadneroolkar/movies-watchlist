import React, { useRef } from "react";
import Siderbar from "./Siderbar";
import { Outlet } from "react-router-dom";
import { store } from "../components/store/store";
import { Provider } from "react-redux";

const Layout = ({ children }) => {
  const boxRef = useRef(null);

  return (
    <>
      <Provider store={store}>
        <section className="main d-flex">
          <Siderbar />
          <div className="right_common" ref={boxRef}>
            <Outlet context={{ boxRef }} />
            {children}
          </div>
        </section>
      </Provider>
    </>
  );
};

export default Layout;
