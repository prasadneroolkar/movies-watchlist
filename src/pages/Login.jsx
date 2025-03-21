import React, { useState, useContext, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import FormInput from "../components/Form/FormInput";
import FormLayout from "../components/Form/FormLayout";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CustomSnackbar from "../components/Messages/CustomSnackbar";

const Login = () => {
  const { login, validateForm, error, handleErrormsg } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [isVisible, setVisible] = useState(false);

  const emailRef = useRef();
  const passRef = useRef();

  const handleVisibility = () => {
    setVisible(!isVisible);
  };

  const onsubmit = () => {
    event.preventDefault();
    const email = emailRef.current.value.trim();
    const password = passRef.current.value.trim();
    const validateres = validateForm({ email, password });
    if (Object.keys(validateres).length === 0) {
      const loggedIn = login(email, password);
      if (loggedIn === false) {
        return;
      } else {
        navigate("/");
      }
    }

    // login(email, password);
  };

  return (
    <>
      <section className="login_section vh-100">
        <FormLayout formname="Sign in" onAction={onsubmit}>
          <div className="form-group d-flex justify-content-start align-items-center">
            <EmailIcon sx={{ fontSize: 22 }} />
            <FormInput
              type="email"
              Labelname="Email"
              InputRef={emailRef}
              onChange={() => handleErrormsg("email")}
            />
            <span>{error.email}</span>
          </div>
          <div className="form-group d-flex justify-content-start align-items-center">
            <LockIcon sx={{ fontSize: 22 }} />
            <FormInput
              Labelname="Password"
              type={isVisible ? "text" : "password"}
              InputRef={passRef}
              onChange={() => handleErrormsg("password")}
            />
            <p onClick={handleVisibility}>
              {isVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </p>
            <span>{error.password}</span>
          </div>

          <Button btnName="Sign in" type="submit" />
          <p className="text-center mt-4">
            <Link to="">Forgot your password?</Link>
          </p>
          <p className=" mt-3 d-flex flex-column justify-content-center align-items-center">
            Don't have an account?
            <Link to="/signup" className="text-decoration-underline">
              create an account
            </Link>
          </p>
        </FormLayout>
      </section>
      <CustomSnackbar autoHideDuration={5000} />
    </>
  );
};

export default Login;
