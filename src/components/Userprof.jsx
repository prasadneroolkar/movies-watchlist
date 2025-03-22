import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import avatar from "/images/avatar.png";
import { Link } from "react-router-dom";
import AccountMenu from "../components/AccountMenu";

const Userprof = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="profile_status d-flex justify-content-between align-items-center">
      <p className="d-flex column-gap-2 justify-content-start align-items-center">
        <img src={currentUser?.userPic || avatar} alt="profile" />
        <span>{currentUser?.username || "Guest"} </span>
      </p>
      <AccountMenu />
    </div>
  );
};

export default Userprof;
