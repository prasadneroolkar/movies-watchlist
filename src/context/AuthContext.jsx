import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [popup, setPopup] = useState(false);
  const [currentUser, setcurrentUser] = useState(null);
  const [error, setError] = useState({});

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser")) || null;
    if (storedUser) setcurrentUser(storedUser);
    // console.log(storedUser);
  }, []);

  const signUp = (userPic, username, email, password) => {
    const users = JSON.parse(localStorage.getItem("userDetails")) || [];
    console.log(users);
    if (users.find((user) => user.email === email)) {
      alert("user already existing");
      return false;
    }

    const newUser = { userPic, username, email, password };
    console.log(newUser);
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
    } else {
      alert("Incorrect email and login password");
      return false;
    }
    return true;
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setcurrentUser(null);
  };

  const validateForm = (fields) => {
    const errordata = {};
    if (fields.username !== undefined && !fields.username.trim()) {
      errordata.username = "Please enter name";
    }

    if (fields.email !== undefined && !fields.email.trim()) {
      errordata.email = "Please enter valid email";
    }

    if (fields.password !== undefined && !fields.password.trim()) {
      errordata.password = "Please enter password";
    }
    if (fields.confpass !== undefined) {
      if (!fields.confpass.trim()) {
        errordata.confpass = "Please confirm your password";
      } else if (fields.password && fields.password !== fields.confpass) {
        errordata.confpass = "Passwords do not match";
      }
    }

    setError(errordata);
    return errordata;
  };

  const handleErrormsg = (field) => {
    setError((prevError) => ({
      ...prevError,
      [field]: "",
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        popup,
        setPopup,
        currentUser,
        signUp,
        login,
        logout,
        validateForm,
        error,
        setError,
        handleErrormsg,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
