import Image from "next/image";
import Link from "next/link";
import React from "react";
import logoBlack from "../../../public/assets/images/logo/logo-black.svg";
import googleStore from "../../../public/assets/images/app/google-store-icon.png";
import appStore from "../../../public/assets/images/app/app-store-icon.png";
import appGalleryIcon from "../../../public/assets/images/app/app-gallery-icon.png";
import paymentOption from "../../../public/assets/images/icons/payment-option-black.png";
import { imageLoader } from "@/hooks/image-loader";
const FooterOne = () => {
  return (
    <>
      <footer className="bd-footer-area footer-bg image-bg fix">
        <div className="section-space">
          <div className="container">
            <div className="row justify-content-between">
              <div className="footer-grid">
                <div className="footer-1-col-1">
                  <div className="footer-widget">
                    <div className="footer-widget-logo mb-40">
                      <Link href="/">
                        <Image
                          src={logoBlack}
                          loader={imageLoader}
                          style={{ width: "auto", height: "auto" }}
                          alt="logo not found"
                        />
                      </Link>
                    </div>
                    <div className="footer-widget-content">
                      <p>
                        Welcome to Tourigo, your gateway to unforgettable
                        adventures and immersive travel experiences. Explore
                        with us and let your journey begin!
                      </p>
                      <div className="d-flex flex-wrap align-items-center gap--5">
                        <span className="b6">Follow Us:</span>
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
                <div className="footer-1-col-2">
                  <div className="footer-widget">
                    <h5 className="footer-widget-title">Company</h5>
                    <div className="footer-widget-links">
                      <ul>
                        <li className="underline">
                          <Link href="/about">About Us</Link>
                        </li>
                        <li className="underline">
                          <Link href="/contact">Careers</Link>
                        </li>
                        <li className="underline">
                          <Link href="/team">Travel Guides</Link>
                        </li>
                        <li className="underline">
                          <Link href="/destinations-right">Destinations</Link>
                        </li>
                        <li className="underline">
                          <Link href="/contact">Contact Now</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="footer-1-col-3">
                  <div className="footer-widget">
                    <h5 className="footer-widget-title">Service</h5>
                    <div className="footer-widget-links">
                      <ul>
                        <li className="underline">
                          <Link href="/tour-listing">Tour Listing</Link>
                        </li>
                        <li className="underline">
                          <Link href="/booking">Tour Booking </Link>
                        </li>
                        <li className="underline">
                          <Link href="/tour-details-right">
                            Traveler Review
                          </Link>
                          <span className="bd-badge warning">New</span>
                        </li>
                        <li className="underline">
                          <Link href="/team">Travel Agents</Link>
                        </li>
                        <li className="underline">
                          <Link href="/contact">Help</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="footer-1-col-4">
                  <div className="footer-widget">
                    <h5 className="footer-widget-title">Quick links</h5>
                    <div className="footer-widget-links">
                      <ul>
                        <li className="underline">
                          <Link href="/terms-conditions">
                            Terms and Conditions
                          </Link>
                        </li>
                        <li className="underline">
                          <Link href="/privacy-policy">Privacy Policy</Link>
                        </li>
                        <li className="underline">
                          <Link href="/contact">Sitemap</Link>
                        </li>
                        <li className="underline">
                          <Link href="/contact">Legal Notice</Link>
                        </li>
                        <li className="underline">
                          <Link href="/contact">Promotions</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="footer-1-col-5">
                  <div className="footer-widget">
                    <h5 className="footer-widget-title  mb-15">Mobile Apps</h5>
                    <div className="footer-btn pt-5">
                      <div className="googple-play-btn mb-15">
                        <Link
                          href="https://codecanyon.net/item/eduman-react-native-android-ios-education-template/48934019?s_rank=3"
                          target="_blank"
                          className="app-btn google-play-store"
                        >
                          <div className="app-thumb">
                            <Image
                              src={googleStore}
                              loader={imageLoader}
                              style={{ width: "100%", height: "auto" }}
                              alt="app"
                            />
                          </div>
                          <div className="content">
                            <span>get it on</span>
                            <h6>Google Play</h6>
                          </div>
                        </Link>
                      </div>
                      <div className="apple-app-btn mb-15">
                        <Link
                          href="https://codecanyon.net/item/eduman-react-native-android-ios-education-template/48934019?s_rank=3"
                          target="_blank"
                          className="app-btn"
                        >
                          <div className="app-thumb">
                            <Image
                              src={appStore}
                              loader={imageLoader}
                              style={{ width: "100%", height: "auto" }}
                              alt="app"
                            />
                          </div>
                          <div className="content">
                            <span>Download on the</span>
                            <h6>App Store</h6>
                          </div>
                        </Link>
                      </div>
                      <div className="apple-gallery-btn">
                        <Link
                          href="https://codecanyon.net/item/eduman-react-native-android-ios-education-template/48934019?s_rank=3"
                          target="_blank"
                          className="app-btn"
                        >
                          <div className="app-thumb">
                            <Image
                              src={appGalleryIcon}
                              loader={imageLoader}
                              style={{ width: "100%", height: "auto" }}
                              alt="app"
                            />
                          </div>
                          <div className="content">
                            <span>Explore it on</span>
                            <h6>AppGallery</h6>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-copyright-area">
          <div className="container">
            <div className="row gy-24 align-items-center justify-content-between align-content-end">
              <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                <div className="footer-copyright underline">
                  <p>
                    Copyright @ 2024{" "}
                    <Link
                      href="https://themeforest.net/user/bdevs"
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
                    src={paymentOption}
                    loader={imageLoader}
                    style={{ width: "100%", height: "auto" }}
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

export default FooterOne;
