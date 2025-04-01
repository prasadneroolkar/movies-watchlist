import React, { useState, useContext, useRef, useEffect } from "react";
import FormInput from "../components/Form/FormInput";
import FormLayout from "../components/Form/FormLayout";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import ImageUpload from "../components/Form/ImageUpload";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { showMsg } from "../components/store/snackbar";
import { useDispatch } from "react-redux";

const Signup = () => {
  const {
    signUp,
    validateForm,
    error,
    setError,
    handleErrormsg,
    isPasswordVisible,
    setPasswordVisible,
  } = useContext(AuthContext);
  const [selectedImage, setSelectedImage] = useState();
  const navigate = useNavigate();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const cnfpassRef = useRef();
  const profilePic = useRef(null);

  const id = Date.now();

  const dispatch = useDispatch();

  const [isConfpassVisible, setConfpassVisible] = useState(false);

  const handleFileChange = () => {
    const file = profilePic.current.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const username = usernameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    const confirm = cnfpassRef.current.value.trim();
    const userPic = profilePic.current.files[0];

    const validateRes = validateForm({
      username,
      email,
      password,
      confpass: confirm,
    });
    if (Object.keys(validateRes).length === 0) {
      const signupRes = signUp(id, selectedImage, username, email, password);
      if (signupRes === false) {
        dispatch(
          showMsg({
            message: "Something went wrong! try again",
            type: "error",
          })
        );
        return;
      }
      profilePic.current.value;
      usernameRef.current.value = "";
      emailRef.current.value = "";
      passwordRef.current.value = "";
      cnfpassRef.current.value = "";
      navigate("/");
    }
  };

  return (
    <section className="login_section vh-100">
      <FormLayout formname="Sign up" onAction={onSubmit}>
        <ImageUpload
          InputRef={profilePic}
          onChange={handleFileChange}
          Image={selectedImage}
        />
        <div className="form-group d-flex justify-content-start align-items-center">
          <PersonIcon sx={{ fontSize: 22 }} />
          <FormInput
            InputRef={usernameRef}
            Labelname="Name"
            onChange={() => handleErrormsg("username")}
          />

          <span>{error.username}</span>
        </div>
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
            type={isPasswordVisible ? "text" : "password"}
            Labelname="Password"
            InputRef={passwordRef}
            onChange={() => handleErrormsg("password")}
          />
          <p onClick={() => setPasswordVisible(!isPasswordVisible)}>
            {isPasswordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </p>
          <span>{error.password}</span>
        </div>
        <div className="form-group d-flex justify-content-start align-items-center">
          <LockIcon sx={{ fontSize: 22 }} />

          <FormInput
            type={isConfpassVisible ? "text" : "password"}
            Labelname="Confirm password"
            InputRef={cnfpassRef}
            onChange={() => handleErrormsg("confpass")}
          />
          <p onClick={() => setConfpassVisible(!isConfpassVisible)}>
            {isConfpassVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </p>
          <span>{error.confpass}</span>
        </div>
        <Button btnName="Create Profile" type="submit" className="logBtn" />
        <p className=" mt-3 d-flex flex-column justify-content-center align-items-center">
          Already have an account?{" "}
          <Link to="/login" className="text-decoration-underline">
            Sign in here.
          </Link>
        </p>
      </FormLayout>
    </section>
  );
};

export default Signup;
