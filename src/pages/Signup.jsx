import React, { useState, useContext, useRef, useEffect } from "react";
import FormInput from "../components/Form/FormInput";
import FormLayout from "../components/Form/FormLayout";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import ImageUpload from "../components/Form/ImageUpload";
import { AuthContext } from "../context/AuthContext";

const Signup = () => {
  const { signUp } = useContext(AuthContext);

  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const cnfpassRef = useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    const username = usernameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value;
    const confirm = cnfpassRef.current.value;
    if (password != confirm) {
      alert("password doesnt match");
      return;
    }

    signUp(username, email, password);
    usernameRef.current.value = "";
    emailRef.current.value = "";
    passwordRef.current.value = "";
    cnfpassRef.current.value = "";
  };

  return (
    <section className="login_section vh-100">
      <FormLayout formname="Sign up" onAction={onSubmit}>
        <ImageUpload />
        <div className="form-group d-flex justify-content-start align-items-center">
          <PersonIcon sx={{ fontSize: 22 }} />
          <FormInput placeholder="Enter your name" InputRef={usernameRef} />
        </div>
        <div className="form-group d-flex justify-content-start align-items-center">
          <EmailIcon sx={{ fontSize: 22 }} />

          <FormInput
            type="email"
            placeholder="Enter your email"
            InputRef={emailRef}
          />
        </div>
        <div className="form-group d-flex justify-content-start align-items-center">
          <LockIcon sx={{ fontSize: 22 }} />

          <FormInput
            type="password"
            placeholder="Password"
            InputRef={passwordRef}
          />
        </div>
        <div className="form-group d-flex justify-content-start align-items-center">
          <LockIcon sx={{ fontSize: 22 }} />

          <FormInput
            type="password"
            placeholder="Confirm password"
            InputRef={cnfpassRef}
          />
        </div>
        <Button btnName="Create Profile" type="submit" />
        <p className=" mt-3 d-flex flex-column justify-content-center align-items-center">
          Already have an account?{" "}
          <Link to="" className="text-decoration-underline">
            Log in here.
          </Link>
        </p>
      </FormLayout>
    </section>
  );
};

export default Signup;
