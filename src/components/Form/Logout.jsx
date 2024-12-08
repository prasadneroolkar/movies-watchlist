import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Logout = () => {
  const { logout } = useContext(AuthContext);

  return (
    <>
      <button onClick={logout}>logout</button>
    </>
  );
};

export default Logout;
