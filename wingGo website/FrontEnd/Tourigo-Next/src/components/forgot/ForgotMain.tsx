import ResetPassword from "@/forms/ResetPassword";
import React from "react";
const ForgotMain = () => {
  return (
    <>
      <section className="bd-forgot-area section-space">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xxl-5">
              <div className="sign-form-wrapper text-center">
                <h4 className="title">Reset Password</h4>
                <p>Enter your email address to request password reset</p>
                <ResetPassword />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgotMain;
