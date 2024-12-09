import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setcurrentUser] = useState(null);
  const [error, setError] = useState({});

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser")) || null;
    if (storedUser) setcurrentUser(storedUser);
    // console.log(storedUser);
  }, []);

  const signUp = (username, email, password) => {
    const users = JSON.parse(localStorage.getItem("userDetails")) || [];
    // console.log(users);
    if (users.find((user) => user.email === email)) {
      alert("user already existing");
      return false;
    }

    const newUser = { username, email, password };
    users.push(newUser);
    localStorage.setItem("userDetails", JSON.stringify(users));
    // console.log(newUser);
    setcurrentUser(newUser);
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    return true;
  };

  const login = (email, password) => {
    const user = JSON.parse(localStorage.getItem("userDetails"));
    // console.log(user);
    const matchedUser = user.find(
      (user) => user.email === email && user.password === password
    );
    // console.log(matchedUser);
    if (matchedUser) {
      // alert("matched");
      localStorage.setItem("currentUser", JSON.stringify(matchedUser));
      setcurrentUser(matchedUser);
    }
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setcurrentUser(null);
  };

  const validateForm = (username, email, password, confpass) => {
    const errordata = {};

    if (!username) {
      errordata.username = "Please enter name";
    }

    if (!email) {
      errordata.email = "Please enter valid email";
    }

    if (!password) {
      errordata.password = "Please enter password";
    }

    if (!confpass) {
      errordata.confpass = "Please enter password";
    } else {
      if (password !== confpass) {
        errordata.confpass = " Password is donot match";
      }
    }

    setError(errordata);
    return errordata;
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signUp,
        login,
        logout,
        validateForm,
        error,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
