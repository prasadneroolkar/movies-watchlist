import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { signUp, logIn } from "../services/authService";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import FormInput from "../components/FormInput";

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
      <div className="container ">
        <div className="row  d-flex justify-content-center align-items-center">
          <div className="col-5 ">
            <div className="formDiv">
              <h1 className="text-center">Log In</h1>
              <form
                action=""
                className="d-flex justify-content-start flex-column"
              >
                <div className="form-group d-flex justify-content-start align-items-center">
                  <EmailIcon sx={{ fontSize: 22 }} />
                  <FormInput placeholder="Enter your email" />
                </div>
                <div className="form-group d-flex justify-content-start align-items-center">
                  <LockIcon sx={{ fontSize: 22 }} />
                  <FormInput placeholder="Enter your password" />
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
                  Don't have an account?<Link to="">create an account</Link>
                </p>
                {/* <button onClick={handleLogIn}>Log In</button>
          <button onClick={handleSignUp}>Sign Up</button> */}
              </form>
            </div>
            {user && <p>Welcome, {user.email}!</p>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
