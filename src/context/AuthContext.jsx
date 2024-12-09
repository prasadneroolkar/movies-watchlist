import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setcurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser")) || null;
    if (storedUser) setcurrentUser(storedUser);
    // console.log(storedUser);
  }, []);

  const signUp = (username, email, password) => {
    const users = JSON.parse(localStorage.getItem("userDetails")) || [];
    console.log(users);
    if (users.find((user) => user.email === email)) {
      alert("user already existing");
      return;
    }

    const newUser = { username, email, password };
    users.push(newUser);
    localStorage.setItem("userDetails", JSON.stringify(users));
    // console.log(newUser);
    setcurrentUser(newUser);
    localStorage.setItem("currentUser", JSON.stringify(newUser));
  };

  const login = (email, password) => {
    const user = JSON.parse(localStorage.getItem("userDetails"));
    console.log(user);
    const matchedUser = user.find(
      (user) => user.email === email && user.password === password
    );
    console.log(matchedUser);
    if (matchedUser) {
      alert("matched");
      localStorage.setItem("currentUser", JSON.stringify(matchedUser));
      setcurrentUser(matchedUser);
      navigate("/");
    }
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setcurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, signUp, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
