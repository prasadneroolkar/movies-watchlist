import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const logout = () => {
    const User = JSON.parse(localStorage.getItem("currentUser"));
    if (User) {
      localStorage.removeItem(User);
      navigate("/login");
    } else {
      return;
    }
  };

  return (
    <>
      <button onClick={logout}>logout</button>
    </>
  );
};

export default Logout;
