import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { signUp, logIn } from "../services/authService";

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
    <div>
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSignUp}>Sign Up</button>
      <button onClick={handleLogIn}>Log In</button>
      {user && <p>Welcome, {user.email}!</p>}
    </div>
  );
};

export default Login;
