import React from "react";
import { Link } from "react-router-dom";
import Home from "/images/Home.png";
import history from "/images/history.png";

const Menu = () => {
  const menuList = [
    {
      name: "Home",
      path: "",
      icon: Home,
    },
    {
      name: "History",
      path: "/history",
      icon: history,
    },
  ];
  return (
    <>
      <div className="menu_list">
        <ul>
          {menuList.map((val, index) => (
            <li
              className="d-flex justify-content-start align-items-center"
              key={index}
            >
              <Link to={val.path}>
                <img src={val.icon} alt={`${val.name} Icon`} />
                {val.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default React.memo(Menu);
