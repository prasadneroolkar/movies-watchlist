import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import dotIcon from "/images/dot.png"; // Importing the image

const AccountMenu = () => {
  const { logout, currentUser } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(false);
  const popupRef = React.useRef(false);

  React.useEffect(() => {
    const outsideClose = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setAnchorEl(false);
        console.log(event.target);
        console.log("popupRef.current", popupRef.current);
      }
    };
    console.log("ahndle", anchorEl);
    if (anchorEl) {
      document.addEventListener("click", outsideClose);
    }
    return () => document.removeEventListener("click", outsideClose);
  }, []);

  const handleClick = () => {
    event.stopPropagation();
    setAnchorEl((prev) => !prev);
  };
  const handleClose = () => {
    setAnchorEl(false);
  };

  const handleProfile = () => {
    handleClose();
    navigate("/userdetail");
  };
  const handleLogout = () => {
    logout();
    handleClose();
    navigate("/");
  };

  const handleLogin = () => {
    handleClose();
    navigate("/login");
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
            <img src={dotIcon} alt="profile" />
          </IconButton>
        </Tooltip>
      </Box>
      {anchorEl === true && (
        <div
          className={`account_setting ${anchorEl === true && "open"}`}
          ref={popupRef}
        >
          <ul>
            {!currentUser ? (
              <li onClick={handleLogin}>Login</li>
            ) : (
              [
                <li key="profile" onClick={handleProfile}>
                  Profile
                </li>,
                <li key="logout" onClick={handleLogout}>
                  Logout
                </li>,
              ]
            )}
          </ul>
        </div>
      )}
    </React.Fragment>
  );
};

export default AccountMenu;
