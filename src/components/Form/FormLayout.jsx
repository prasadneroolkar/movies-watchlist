import React from "react";

const FormLayout = ({ children, formname, onAction }) => {
  return (
    <div className="container ">
      <div className="row  d-flex justify-content-center align-items-center">
        <div className="col-lg-5 col-12 ">
          <div className="formDiv">
            <h1 className="text-center">{formname}</h1>
            <form
              action=""
              onSubmit={onAction}
              className="d-flex justify-content-start flex-column"
            >
              {children}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormLayout;
