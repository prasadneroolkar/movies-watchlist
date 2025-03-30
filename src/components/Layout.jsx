import React, { useRef, useContext } from "react";
import Siderbar from "./Siderbar";
import { Outlet } from "react-router-dom";
import { store } from "../components/store/store";
import { Provider } from "react-redux";
import { AuthContext } from "../context/AuthContext";
import MobileHeader from "../components/MobileHeader";

const Layout = ({ children }) => {
  const boxRef = useRef(null);
  const { popup, open } = useContext(AuthContext);
  return (
    <>
      <Provider store={store}>
        <MobileHeader />
        <section className={`main d-flex  `}>
          <Siderbar open={open} />
          <div className="right_common" ref={boxRef}>
            <div className="bodyColor"></div>
            <Outlet context={{ boxRef }} />
            {children}
          </div>
        </section>
      </Provider>
    </>
  );
};

export default Layout;
