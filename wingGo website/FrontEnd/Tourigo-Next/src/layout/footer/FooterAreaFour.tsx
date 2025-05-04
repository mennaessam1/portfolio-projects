"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import logoWhite from "../../../public/assets/images/logo/logo-white.svg";
import blogImgtwelve from "../../../public/assets/images/blog/blog-image-12.png";
import blogImgThirteen from "../../../public/assets/images/blog/blog-image-13.png";
import paymentOptionImg from "../../../public/assets/images/icons/payment-option-white.png";
import { imageLoader } from "@/hooks/image-loader";

const FooterAreaFour = () => {
  return (
    <>
      <footer className="bd-footer-area theme-bg-secondary">
        <div className="section-space">
          <div className="container">
            <div className="row gy-24">
              <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-7">
                <div className="footer-widget footer-3-col-1">
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
                    <div className="footer-social style-two has-white align-items-center gap--5">
                      <span className="footer-social-title">
                        Social Networks:
                      </span>
                      <div className="theme-social">
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
              </div>
              <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-5">
                <div className="footer-widget footer-3-col-2">
                  <h5 className="footer-widget-title has-white">Company</h5>
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
              <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-3">
                <div className="footer-widget footer-3-col-3">
                  <h5 className="footer-widget-title has-white">Service</h5>
                  <div className="footer-widget-links has-white">
                    <ul>
                      <li className="underline-two">
                        <Link href="/destinations-grid-right">
                          Destinations
                        </Link>
                      </li>
                      <li className="underline-two">
                        <Link href="/tour-listing">Tour Listing</Link>
                      </li>
                      <li className="underline-two">
                        <Link href="/booking">Tour Booking </Link>
                      </li>
                      <li className="underline-two">
                        <Link href="/team">Travel Agents</Link>
                      </li>
                      <li className="underline-two">
                        <Link href="/contact">Help</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-12 col-sm-9">
                <div className="footer-widget footer-3-col-4">
                  <h5 className="footer-widget-title has-white">Recent Post</h5>
                  <div className="footer-widget-post mt-30">
                    <article className="blog-wrapper blog-footer has-white mb-30">
                      <div className="footer-blog-thumb image-hover-effect">
                        <Link href="/blog-details">
                          <Image
                            src={blogImgtwelve}
                            loader={imageLoader}
                            style={{ width: "100%", height: "100%" }}
                            alt="Image not found"
                          />
                        </Link>
                      </div>
                      <div className="blog-content">
                        <div className="blog-meta-list mb-10">
                          <div className="blog-meta-item">
                            <span className="meta-icon">
                              <i className="icon-person"></i>
                            </span>
                            <span className="meta-text">
                              By{" "}
                              <Link className="meta-author" href="blog-details">
                                Jon Snow
                              </Link>
                            </span>
                          </div>
                          <div className="blog-meta-item">
                            <span className="meta-icon">
                              <i className="icon-cleander-check"></i>
                            </span>
                            <span className="meta-text">
                              <Link className="meta-date" href="blog-details">
                                Feb 05 2024
                              </Link>
                            </span>
                          </div>
                        </div>
                        <h6 className="blog-title white-text small underline-two">
                          <Link href="/blog-details">{`Trekker's Tales:
                                                    Navigating the World's Wonders`}</Link>
                        </h6>
                      </div>
                    </article>
                    <article className="blog-wrapper blog-footer has-white">
                      <div className="footer-blog-thumb image-hover-effect">
                        <Link href="/blog-details">
                          <Image
                            src={blogImgThirteen}
                            loader={imageLoader}
                            style={{ width: "100%", height: "100%" }}
                            alt="Image not found"
                          />
                        </Link>
                      </div>
                      <div className="blog-content">
                        <div className="blog-meta-list mb-10">
                          <div className="blog-meta-item">
                            <span className="meta-icon">
                              <i className="icon-person"></i>
                            </span>
                            <span className="meta-text">
                              By{" "}
                              <Link className="meta-author" href="blog-details">
                                Daenerys Targaryen
                              </Link>
                            </span>
                          </div>
                          <div className="blog-meta-item">
                            <span className="meta-icon">
                              <i className="icon-cleander-check"></i>
                            </span>
                            <span className="meta-text">
                              <Link className="meta-date" href="blog-details">
                                Feb 01 2024
                              </Link>
                            </span>
                          </div>
                        </div>
                        <h6 className="blog-title white-text small underline-two">
                          <Link href="/blog-details">
                            Exploring the World, One Adventure at a Time
                          </Link>
                        </h6>
                      </div>
                    </article>
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
                <div className="footer-copyright has-white underline-two">
                  <p>
                    Copyright @ 2024{" "}
                    <Link
                      href="/https://themeforest.net/user/bdevs"
                      target="_blank"
                    >
                      Tourigo
                    </Link>{" "}
                    . All Right Reserved
                  </p>
                </div>
              </div>
              <div className="col-xl-3 col-lg-5 col-md-6 col-12">
                <div className="footer-card">
                  <Image
                    src={paymentOptionImg}
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

export default FooterAreaFour;
