import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { signUp, logIn } from "../services/authService";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import FormInput from "../components/Form/FormInput";
import FormLayout from "../components/Form/FormLayout";

const Login = () => {
  const [email, setEmail] = useState("");
  const { user } = useContext(AuthContext);

  const handleSignUp = async () => {
    try {
      await signUp(email);
      alert("Sign-up successful!");
    } catch (error) {
      alert("Error signing up!");
    }
  };

  const handleLogIn = async () => {
    try {
      await logIn(email);
      alert("Login successful!");
    } catch (error) {
      alert("Error logging in!");
    }
  };

  return (
    <section className="login_section vh-100">
      <FormLayout formname="log in">
        <div className="form-group d-flex justify-content-start align-items-center">
          <EmailIcon sx={{ fontSize: 22 }} />
          <FormInput type="email" placeholder="Enter your email" />
        </div>
        <div className="form-group d-flex justify-content-start align-items-center">
          <LockIcon sx={{ fontSize: 22 }} />
          <FormInput placeholder="Enter your password" type="password" />
        </div>

        {/* <input
                  type="password"
                  id="password"

                  // value={password}
                  // onChange={(e) => setEmail(e.target.value)}
                /> */}
        <Button btnName="Log in" className="" />
        <p className="text-center mt-4">
          <Link to="">Forgot your password?</Link>
        </p>
        <p className=" mt-3 d-flex flex-column justify-content-center align-items-center">
          Don't have an account?
          <Link to="" className="text-decoration-underline">
            create an account
          </Link>
        </p>
        {/* <button onClick={handleLogIn}>Log In</button>
          <button onClick={handleSignUp}>Sign Up</button> */}
      </FormLayout>
    </section>
  );
};

export default Login;
