import React, { useRef, useContext } from "react";
import Siderbar from "./Siderbar";
import { Outlet } from "react-router-dom";
import { store } from "../components/store/store";
import { Provider } from "react-redux";
import { AuthContext } from "../context/AuthContext";

const Layout = ({ children, status }) => {
  const boxRef = useRef(null);
  const { popup } = useContext(AuthContext);
  return (
    <>
      <Provider store={store}>
        <section className={`main d-flex  ${popup === true ? "modalup" : ""}`}>
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
