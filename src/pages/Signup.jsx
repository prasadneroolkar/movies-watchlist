import React from "react";
import FormInput from "../components/Form/FormInput";
import FormLayout from "../components/Form/FormLayout";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import ImageUpload from "../components/Form/ImageUpload";

const Signup = () => {
  return (
    <section className="login_section vh-100">
      <FormLayout formname="Sign up">
        <ImageUpload />

        <div className="form-group d-flex justify-content-start align-items-center">
          <PersonIcon sx={{ fontSize: 22 }} />
          <FormInput placeholder="Enter your name" />
        </div>
        <div className="form-group d-flex justify-content-start align-items-center">
          <EmailIcon sx={{ fontSize: 22 }} />

          <FormInput type="email" placeholder="Enter your email" />
        </div>
        <div className="form-group d-flex justify-content-start align-items-center">
          <LockIcon sx={{ fontSize: 22 }} />

          <FormInput type="password" placeholder="Password" />
        </div>
        <div className="form-group d-flex justify-content-start align-items-center">
          <LockIcon sx={{ fontSize: 22 }} />

          <FormInput type="password" placeholder="Confirm password" />
        </div>
        <Button btnName="Create Profile" />
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
