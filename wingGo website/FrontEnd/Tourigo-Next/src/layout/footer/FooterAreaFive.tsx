"use client";
import Image from "next/image";
import React from "react";
import supportImg from "../../../public/assets/images/shapes/support-img.png";
import supportImgTwo from "../../../public/assets/images/shapes/support-img-two.png";
import logoWhite from "../../../public/assets/images/logo/logo-white.svg";
import paymentOptionWhiteImg from "../../../public/assets/images/icons/payment-option-white.png";
import { imageLoader } from "@/hooks/image-loader";
import Link from "next/link";

const FooterAreaFive = () => {
  return (
    <>
      <footer className="bd-footer-area theme-bg-secondary">
        <div className="footer-top section-space">
          <div className="container">
            <div className="row gy-24 align-items-center justify-content-between">
              <div className="col-xxl-5 col-xl-5 col-lg-6">
                <div className="footer-support-wrapper">
                  <div className="footer-support-thumb">
                    <Image
                      src={supportImg}
                      loader={imageLoader}
                      style={{ width: "auto", height: "auto" }}
                      alt="image"
                    />
                  </div>
                  <h4 className="footer-support-title white-text">
                    Need Support for tour & travels?
                  </h4>
                  <div className="footer-support-btn">
                    <Link
                      className="bd-icon-btn has-big hover-style"
                      href="contact"
                      target="_blank"
                    >
                      <i className="fa-sharp fa-regular fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-xxl-6 col-xl-6 col-lg-6">
                <div className="footer-support-wrapper right-side">
                  <div className="footer-support-thumb">
                    <Image
                      src={supportImgTwo}
                      loader={imageLoader}
                      style={{ width: "auto", height: "auto" }}
                      alt="image"
                    />
                  </div>
                  <h4 className="footer-support-title white-text">
                    Ready to Get Started With Vacations!
                  </h4>
                  <div className="footer-support-btn">
                    <Link
                      className="bd-icon-btn has-big hover-style"
                      href="destinations-details-right"
                      target="_blank"
                    >
                      <i className="fa-sharp fa-regular fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bd-footer section-space">
          <div className="container">
            <div className="row gy-24">
              <div className="col-xxl-3 col-xl-3 col-lg-6 col-md-6">
                <div className="footer-widget footer-4-col-1">
                  <div className="footer-widget-logo mb-25">
                    <Link href="/">
                      <Image
                        src={logoWhite}
                        loader={imageLoader}
                        style={{ width: "auto", height: "auto" }}
                        alt="logo not found"
                      />
                    </Link>
                  </div>
                  <div className="footer-widget-content">
                    <p>
                      Welcome to Tourigo, your gateway to unforgettable
                      adventures and immersive travel experiences. Explore with
                      us and let your journey begin!
                    </p>
                    <div className="theme-social is-white-color">
                      <Link href="https://www.facebook.com/">
                        <i className="icon-facebook"></i>
                      </Link>
                      <Link href="https://www.twitter.com/">
                        <i className="icon-twitter-x"></i>
                      </Link>
                      <Link href="https://www.linkedin.com/">
                        <i className="icon-linkedin"></i>
                      </Link>
                      <Link href="https://www.youtube.com/">
                        <i className="icon-youtube"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xxl-2 col-xl-2 col-lg-6 col-md-6">
                <div className="footer-widget footer-4-col-2">
                  <h5 className="footer-widget-title white-text">Company</h5>
                  <div className="footer-widget-links has-white">
                    <ul>
                      <li className="underline-two">
                        <Link href="/about">About Us</Link>
                      </li>
                      <li className="underline-two">
                        <Link href="/contact">Careers</Link>
                      </li>
                      <li className="underline-two">
                        <Link href="/team">Travel Guides</Link>
                      </li>
                      <li className="underline-two">
                        <Link href="/tour-details">Traveler Review</Link>
                        <span className="bd-badge warning">New</span>
                      </li>
                      <li className="underline-two">
                        <Link href="/contact">Contact Now</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xxl-4 col-xl-4 col-lg-6 col-md-6">
                <div className="footer-widget footer-4-col-3">
                  <h5 className="footer-widget-title white-text">Newsletter</h5>
                  <div className="footer-widget-content">
                    <p>
                      Subscribe our newsletter to get our latest <br /> update &
                      news.
                    </p>
                    <div className="footer-form mb-15">
                      <form action="#">
                        <div className="footer-subscribe">
                          <input type="email" placeholder="Email address" />
                          <button type="submit">
                            {" "}
                            <i className="fa-solid fa-paper-plane"></i>
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="footer-form-check">
                      <label className="footer-form-check-label">
                        <input type="checkbox" />
                        <svg viewBox="0 0 64 64" height="2em" width="2em">
                          <path
                            d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                            pathLength="575.0541381835938"
                            className="path"
                          ></path>
                        </svg>{" "}
                        I agree to all terms and policies
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xxl-3 col-xl-3 col-lg-6 col-md-6">
                <div className="footer-widget footer-4-col-4">
                  <h5 className="footer-widget-title white-text">Contact Us</h5>
                  <div className="footer-widget-list-wrapper">
                    <ul className="footer-widget-list-items">
                      <li className="footer-widget-list-single-item">
                        <span className="footer-widget-list-icon">
                          <i className="icon-call"></i>
                        </span>
                        <span className="footer-widget-list-text">
                          <span className="footer-widget-list-text-top">
                            Call Us
                          </span>
                          <Link href="tel:+00123456889">+00 (123) 456 889</Link>
                        </span>
                      </li>
                      <li className="footer-widget-list-single-item">
                        <span className="footer-widget-list-icon">
                          <i className="icon-envelope"></i>
                        </span>
                        <span className="footer-widget-list-text">
                          <span className="footer-widget-list-text-top">
                            Email Us
                          </span>
                          <Link href="mailto:contact@example.com">
                            contact@example.com
                          </Link>
                        </span>
                      </li>
                      <li className="footer-widget-list-single-item">
                        <span className="footer-widget-list-icon">
                          <i className="icon-location-fill"></i>
                        </span>
                        <span className="footer-widget-list-text">
                          <span className="footer-widget-list-text-top">
                            Our office
                          </span>
                          <Link href="/contact">583 Main Street, NY, USA</Link>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-copyright-area border-two">
          <div className="container">
            <div className="row gy-24 align-items-center justify-content-between align-content-end">
              <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                <div className="footer-copyright has-white">
                  <p>
                    Copyright @ 2024{" "}
                    <Link
                      href="/https://themeforest.net/user/bdevs"
                      target="_blank"
                    >
                      Tourigo
                    </Link>
                    . All Right Reserved
                  </p>
                </div>
              </div>
              <div className="col-xl-3 col-lg-5 col-md-6 col-12">
                <div className="footer-card">
                  <Image
                    src={paymentOptionWhiteImg}
                    loader={imageLoader}
                    style={{ width: "auto", height: "auto" }}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterAreaFive;
