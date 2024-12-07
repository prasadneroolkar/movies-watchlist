import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const logout = () => {
    if (localStorage.getItem("currentUser")) {
      setTimeout(() => {
        localStorage.removeItem("currentUser");
        navigate("/login");
      }, 2000);
    }
  };

  return (
    <>
      <button onClick={logout}>logout</button>
    </>
  );
};

export default Logout;
