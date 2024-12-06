import React, { useState, useContext } from "react";
import FormInput from "../components/Form/FormInput";
import FormLayout from "../components/Form/FormLayout";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import ImageUpload from "../components/Form/ImageUpload";
import { AuthContext } from "../context/AuthContext";

const Signup = () => {
  const { currentUser } = useContext(AuthContext);
  const [username, setName] = useState("");
  const [Details, setDetails] = useState([]);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");
  const [confirm, setCnfPass] = useState("");

  const inputChange = (e) => {
    setName(e.target.value);
  };

  const addUser = (username, email, password) => {
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
    setDetails(newUser);
    localStorage.setItem("currentUser", JSON.stringify(newUser));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addUser(username, email, password);
  };

  return (
    <section className="login_section vh-100">
      <FormLayout formname="Sign up" onAction={onSubmit}>
        <ImageUpload />
        <div className="form-group d-flex justify-content-start align-items-center">
          <PersonIcon sx={{ fontSize: 22 }} />
          <FormInput
            placeholder="Enter your name"
            onChange={inputChange}
            value={username}
          />
        </div>
        <div className="form-group d-flex justify-content-start align-items-center">
          <EmailIcon sx={{ fontSize: 22 }} />

          <FormInput type="email" placeholder="Enter your email" />
        </div>
        <div className="form-group d-flex justify-content-start align-items-center">
          <LockIcon sx={{ fontSize: 22 }} />

          <FormInput type="password" placeholder="Password" />
        </div>
        <div className="form-group d-flex justify-content-start align-items-center">
          <LockIcon sx={{ fontSize: 22 }} />

          <FormInput type="password" placeholder="Confirm password" />
        </div>
        <Button btnName="Create Profile" type="submit" />
        <p className=" mt-3 d-flex flex-column justify-content-center align-items-center">
          Already have an account?{" "}
          <Link to="" className="text-decoration-underline">
            Log in here.
          </Link>
        </p>
      </FormLayout>
    </section>
  );
};

export default Signup;
