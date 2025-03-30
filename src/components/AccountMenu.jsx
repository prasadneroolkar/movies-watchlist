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
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    // setAnchorEl(event.currentTarget);
    setAnchorEl(!anchorEl);
    console.log("anchorEl", anchorEl);
  };
  const handleClose = () => {
    setAnchorEl(false);
  };

  const handleProfile = () => {
    setAnchorEl(false);
    navigate("/userdetail");
  };
  const handleLogout = () => {
    logout();
    navigate("/");
    setAnchorEl(false);
  };

  const handleLogin = () => {
    navigate("/login");
    setAnchorEl(false);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <img src={dotIcon} alt="profile" />
          </IconButton>
        </Tooltip>
      </Box>

      <div className={`account_setting ${anchorEl && "open"}`}>
        <ul>
          <li>login</li>
          <li>edit profile</li>
        </ul>
      </div>

      {/* <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              // position: "fixed",
              bgcolor: "#191919",
              color: "#E1E1E1",
              // left: "41px !important",
              minWidth: "240px",
              // top: "528px  !important",
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },

              "& .MuiMenuItem-root": {
                fontSize: "16px",
                lineHeight: "19px",
                fontFamily: "lato, sans-serif",
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                bottom: -10,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "#191919",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {!currentUser ? (
          <MenuItem onClick={handleLogin}>Login</MenuItem>
        ) : (
          [
            <MenuItem key="profile" onClick={handleProfile}>
              Profile
            </MenuItem>,
            <MenuItem key="logout" onClick={handleLogout}>
              Logout
            </MenuItem>,
          ]
        )}
      </Menu> */}
    </React.Fragment>
  );
};

export default AccountMenu;
