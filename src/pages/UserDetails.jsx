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

  const onSubmit = (e) => {
    e.preventDefault();
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
          // InputRef={profilePic}
          // onChange={handleFileChange}
          // Image={selectedImage}
          />
          <div className="form-group d-flex justify-content-start align-items-center">
            <PersonIcon sx={{ fontSize: 22 }} />
            <FormInput
              // InputRef={usernameRef}
              Labelname="Name"
              onChange={() => handleErrormsg("username")}
            />

            <span>{error.username}</span>
          </div>
          <div className="form-group d-flex justify-content-start align-items-center">
            <EmailIcon sx={{ fontSize: 22 }} />

            <FormInput
              type="email"
              Labelname="Email"
              // InputRef={emailRef}
              onChange={() => handleErrormsg("email")}
            />
            <span>{error.email}</span>
          </div>
          <div className="form-group d-flex justify-content-start align-items-center">
            <LockIcon sx={{ fontSize: 22 }} />

            <FormInput
              // type={isPasswordVisible ? "text" : "password"}
              Labelname="Password"
              // InputRef={passwordRef}
              onChange={() => handleErrormsg("password")}
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
