import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import { closeMsg } from "../store/snackbar";
import { useDispatch, useSelector } from "react-redux";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

const CustomSnackbar = () => {
  const dispatch = useDispatch();
  const { open, message, type } = useSelector((state) => state.snackbarMsg);

  const handleClose = () => {
    dispatch(closeMsg());
  };

  return (
    <>
      <Snackbar
        autoHideDuration={1000}
        open={open}
        onClose={handleClose}
        TransitionComponent={SlideTransition}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={type}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CustomSnackbar;
