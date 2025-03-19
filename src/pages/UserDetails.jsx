import React, { useState, useContext, useRef, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import WatchlistForm from "../components/watchlist/WatchlistForm";
import FormInput from "../components/Form/FormInput";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import Button from "../components/Button";
import ImageUpload from "../components/Form/ImageUpload";
import PageTitle from "../components/watchlist/PageTitle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import { loggedinUsers, updateUser } from "../components/store/userSlice.js";

const UserDetails = () => {
  const {
    signUp,
    validateForm,
    error,
    setError,
    handleErrormsg,
    isPasswordVisible,
    setPasswordVisible,
  } = useContext(AuthContext);

  const dispatch = useDispatch();
  const currentStateUser = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(loggedinUsers());
  }, [dispatch]);

  const [editDetails, seteditDetails] = useState({
    userPic: "",
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (currentStateUser) {
      seteditDetails({
        userPic: currentStateUser?.userPic || "",
        username: currentStateUser?.username || "",
        email: currentStateUser?.email || "",
        password: currentStateUser?.password || "",
      });
    }
  }, [currentStateUser]);

  const handleEdit = (e) => {
    seteditDetails((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
    handleErrormsg("[e.target.name]");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        seteditDetails({ userPic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(
        updateUser({
          profilepic: editDetails.userPic,
          username: editDetails.username,
          email: editDetails.email,
          password: editDetails.password,
        })
      );
    } catch (error) {
      console.log("error update", error);
    }
  };
  return (
    <>
      <section className="editpage_title d-flex justify-content-between align-items-center">
        <PageTitle className="create_watchlist mt-0" Title="Edit profile" />
        <button className="delete_link">Log out</button>
      </section>
      <section className="editprofile_form">
        <WatchlistForm onSubmit={onSubmit} className="formDiv">
          <ImageUpload
            name="userPic"
            // InputRef={currentStateUser?.userPic}
            onChange={handleFileChange}
            Image={editDetails?.userPic}
          />
          <div className="form-group d-flex justify-content-start align-items-center">
            <PersonIcon sx={{ fontSize: 22 }} />
            <FormInput
              value={editDetails?.username}
              Labelname="Name"
              name="username"
              // onChange={() => handleErrormsg("username")}
              onChange={handleEdit}
            />

            <span>{error.username}</span>
          </div>
          <div className="form-group d-flex justify-content-start align-items-center">
            <EmailIcon sx={{ fontSize: 22 }} />

            <FormInput
              value={editDetails?.email}
              type="email"
              Labelname="Email"
              name="email"
              onChange={handleEdit}
            />
            <span>{error.email}</span>
          </div>
          <div className="form-group d-flex justify-content-start align-items-center">
            <LockIcon sx={{ fontSize: 22 }} />

            <FormInput
              type={isPasswordVisible ? "text" : "password"}
              Labelname="Password"
              name="password"
              value={editDetails?.password}
              // InputRef={passwordRef}
              onChange={handleEdit}
            />
            <p onClick={() => setPasswordVisible(!isPasswordVisible)}>
              {isPasswordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </p>
            <span>{error.password}</span>
          </div>
          <div className="d-flex justify-content-center align-items-center column-gap-4">
            <Button btnName="Update" type="submit" className="button_2" />
            <Button btnName="cancel" type="cancel" className="button_2" />
          </div>
        </WatchlistForm>
      </section>
    </>
  );
};

export default UserDetails;
