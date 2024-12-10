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
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Signup = () => {
  const { signUp, validateForm, error, setError, handleErrormsg } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const cnfpassRef = useRef();

  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isConfpassVisible, setConfpassVisible] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    const username = usernameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    const confirm = cnfpassRef.current.value.trim();

    const validateRes = validateForm({ username, email, password, confirm });
    console.log(Object.keys(validateRes).length);
    if (Object.keys(validateRes).length === 0) {
      const signupRes = signUp(username, email, password);
      console.log(signupRes);
      if (signupRes === false) {
        alert("Signup failed, please try again.");
        return;
      }
      usernameRef.current.value = "";
      emailRef.current.value = "";
      passwordRef.current.value = "";
      cnfpassRef.current.value = "";
      navigate("/");
    }
  };

  return (
    <section className="login_section vh-100">
      <FormLayout formname="Sign up" onAction={onSubmit}>
        <ImageUpload />
        <div className="form-group d-flex justify-content-start align-items-center">
          <PersonIcon sx={{ fontSize: 22 }} />
          <FormInput
            InputRef={usernameRef}
            placeholder="Name"
            onChange={() => handleErrormsg("username")}
          />

          <span>{error.username}</span>
        </div>
        <div className="form-group d-flex justify-content-start align-items-center">
          <EmailIcon sx={{ fontSize: 22 }} />

          <FormInput
            type="email"
            placeholder="Email"
            InputRef={emailRef}
            onChange={() => handleErrormsg("email")}
          />
          <span>{error.email}</span>
        </div>
        <div className="form-group d-flex justify-content-start align-items-center">
          <LockIcon sx={{ fontSize: 22 }} />

          <FormInput
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Password"
            InputRef={passwordRef}
            onChange={() => handleErrormsg("password")}
          />
          <p onClick={() => setPasswordVisible(!isPasswordVisible)}>
            {isPasswordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </p>
          <span>{error.password}</span>
        </div>
        <div className="form-group d-flex justify-content-start align-items-center">
          <LockIcon sx={{ fontSize: 22 }} />

          <FormInput
            type={isConfpassVisible ? "text" : "password"}
            placeholder="Confirm password"
            InputRef={cnfpassRef}
            onChange={() => handleErrormsg("confpass")}
          />
          <p onClick={() => setConfpassVisible(!isConfpassVisible)}>
            {isConfpassVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </p>
          <span>{error.confpass}</span>
        </div>
        <Button btnName="Create Profile" type="submit" />
        <p className=" mt-3 d-flex flex-column justify-content-center align-items-center">
          Already have an account?{" "}
          <Link to="/login" className="text-decoration-underline">
            Sign in here.
          </Link>
        </p>
      </FormLayout>
    </section>
  );
};

export default Signup;
