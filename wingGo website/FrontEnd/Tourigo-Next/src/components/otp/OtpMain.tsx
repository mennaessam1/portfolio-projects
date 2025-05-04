import OtpForm from "@/forms/OtpForm";
import React from "react";

const OtpMain = () => {
  return (
    <>
      <section className="bd-otp-area section-space">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xxl-5">
              <div className="sign-form-wrapper text-center">
                <h4 className="title mb-30">OTP Verification</h4>
                {/* otp */}
                <OtpForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OtpMain;
