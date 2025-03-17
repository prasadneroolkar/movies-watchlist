import React from "react";
import loginpic from "/images/loginpic.png";
import camera from "/images/camera.png";

const ImageUpload = ({ InputRef, onChange, Image }) => {
  return (
    <div className="form_avatar d-flex flex-column justify-content-center align-items-center">
      <label
        htmlFor="imagepicker"
        style={{ cursor: "pointer" }}
        className="d-flex flex-column justify-content-center align-items-center"
      >
        <img
          className="profile_pic"
          src={Image || loginpic}
          alt="profieImage"
          width={100}
          height={100}
        />

        <input
          id="imagepicker"
          type="file"
          accept="image/*"
          ref={InputRef}
          style={{ display: "none" }}
          onChange={onChange}
        />
        <p className="mt-2 d-flex justify-content-start align-items-center column-gap-2 mb-4">
          <img src={camera} alt="upload_img" id="imagepicker" />
          <span>Add an avatar</span>
        </p>
      </label>
    </div>
  );
};

export default ImageUpload;
