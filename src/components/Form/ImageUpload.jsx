import React from "react";
import loginpic from "/images/loginpic.png";
import camera from "/images/camera.png";

const ImageUpload = ({ InputRef, onChange }) => {
  return (
    <div className="form_avatar d-flex flex-column justify-content-center align-items-center">
      <label htmlFor="imagepicker">
        <img src={loginpic} alt="profieImage" id="imagepicker" />
        <input
          type="file"
          accept="image/*"
          ref={InputRef}
          style={{ display: "none" }}
          onChange={onChange}
        />
      </label>
      <p className="mt-2 d-flex justify-content-start align-items-center column-gap-2 mb-4">
        <img src={camera} alt="upload_img" />
        <span>Add an avatar</span>
      </p>
    </div>
  );
};

export default ImageUpload;
