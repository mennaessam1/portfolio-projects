import React from "react";
import Link from "next/link";
import SignUpForm from "@/forms/SignUpForm";
import Breadcrumb from "../common/breadcrumb/BreadCrumb";
const RegisterMain = () => {
  return (
    <>
    <Breadcrumb titleOne="Sign-up" titleTwo="Sign-up" />
      <section className="bd-sign-area section-space">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xxl-5">
              <div className="sign-form-wrapper text-center">
                <h4 className="title mb-30">Sign Up your account</h4>
                <SignUpForm />
                <div className="sign-meta-divider-wrapper">
                  <div className="sign-meta-divider-line left-line"></div>
                  <span className="sign-meta-divider-title">or</span>
                  <div className="sign-meta-divider-line right-line"></div>
                </div>
                {/* <div className="sign-up-wrapper mt-30 mb-20">
                  <div className="social-menu d-flex justify-content-center text-center">
                    <ul>
                      <li>
                        <Link
                          className="facebook"
                          href="https://facebook.com/"
                          target="blank"
                        >
                          <i className="icon-facebook"></i>
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="twitter"
                          href="https://twitter.com/"
                          target="blank"
                        >
                          <i className="icon-twitter-x"></i>
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="instagram"
                          href="https://www.instagram.com"
                          target="blank"
                        >
                          <i className="icon-instagram"></i>
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="linkedin"
                          href="https://www.linkedin.com"
                          target="blank"
                        >
                          <i className="icon-linkedin"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div> */}
                <div className="sign-up-label text-center">
                  Already have an account?
                  <Link href="/sign-in" className="sign-link">
                    {" "}
                    Sign In
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterMain;
