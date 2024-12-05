import React from "react";
import loginpic from "/images/loginpic.png";
import camera from "/images/camera.png";

const ImageUpload = () => {
  return (
    <div className="form_avatar d-flex flex-column justify-content-center align-items-center">
      <img src={loginpic} alt="profieImage" />
      <p className="mt-2 d-flex justify-content-start align-items-center column-gap-2 mb-4">
        <img src={camera} alt="upload_img" />
        <span>Add an avatar</span>
      </p>
    </div>
  );
};

export default ImageUpload;
