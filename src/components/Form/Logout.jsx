import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <button onClick={handleLogout}>logout</button>
    </>
  );
};

export default Logout;
