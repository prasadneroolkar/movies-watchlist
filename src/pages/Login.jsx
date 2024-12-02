import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { signUp, logIn } from "../services/authService";
import Button from "../components/Button";
import { Link } from "react-router-dom";

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
    <div className="container vh-100">
      <div className="row  d-flex justify-content-center align-items-center">
        <div className="col-auto ">
          <form action="" className="d-flex justify-content-start flex-column">
            <label htmlFor="email"> Email*</label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password *</label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              // value={password}
              // onChange={(e) => setEmail(e.target.value)}
            />
            <Button btnName="Login" className="" />
            <p>
              or<Link to="">create an account</Link>
            </p>
            {/* <button onClick={handleLogIn}>Log In</button>
          <button onClick={handleSignUp}>Sign Up</button> */}
          </form>
          {user && <p>Welcome, {user.email}!</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
