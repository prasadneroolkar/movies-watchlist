import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setcurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser) setcurrentUser(storedUser);
    console.log(storedUser);
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
    console.log(newUser);
    localStorage.setItem("currentUser", JSON.stringify(newUser));
  };

  return (
    <AuthContext.Provider value={{ currentUser, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
