"use client";
import React from "react";
import googleStore from "../../../../../public/assets/images/app/google-store-icon.png";
import appStore from "../../../../../public/assets/images/app/app-store-icon.png";
import gallayImg from "../../../../../public/assets/images/app/app-gallery-icon.png";
import { imageLoader } from "@/hooks/image-loader";
import Image from "next/image";
import Link from "next/link";
const AppButtonWithBg = () => {
  return (
    <>
      <section className="element-button section-space theme-bg fix">
        <div className="container">
          <div
            className="row align-items-center justify-content-center wow bdFadeInUp"
            data-wow-delay=".3s"
          >
            <div className="col-lg-12">
              <div className="section-title-wrapper section-title-space text-center">
                <div className="elements-section__wrapper elements-line">
                  <div className="separator__line line-left"></div>
                  <div className="elements-title__wrapper">
                    <h2 className="section__title elements__title white-text">
                      App Button with BG
                    </h2>
                  </div>
                  <div className="separator__line line-right"></div>
                </div>
                <p className="muted-text"></p>
              </div>
            </div>
          </div>
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-3">
              <div className="googple-play-btn">
                <Link
                  href="https://codecanyon.net/item/eduman-react-native-android-ios-education-template/48934019?s_rank=3"
                  target="_blank"
                  className="app-btn has-bg"
                >
                  <div className="app-thumb">
                    <Image
                      src={googleStore}
                      loader={imageLoader}
                      style={{ width: "100%", height: "auto" }}
                      alt="shape"
                    />
                  </div>
                  <div className="content">
                    <span>get it on</span>
                    <h6>Google Play</h6>
                  </div>
                </Link>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="apple-app-btn">
                <Link
                  href="https://codecanyon.net/item/eduman-react-native-android-ios-education-template/48934019?s_rank=3"
                  target="_blank"
                  className="app-btn has-bg"
                >
                  <div className="app-thumb">
                    <Image
                      src={appStore}
                      loader={imageLoader}
                      style={{ width: "100%", height: "auto" }}
                      alt="shape"
                    />
                  </div>
                  <div className="content">
                    <span>Download on the</span>
                    <h6>App Store</h6>
                  </div>
                </Link>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="apple-gallery-btn">
                <Link
                  href="https://codecanyon.net/item/eduman-react-native-android-ios-education-template/48934019?s_rank=3"
                  target="_blank"
                  className="app-btn has-bg"
                >
                  <div className="app-thumb">
                    <Image
                      src={gallayImg}
                      loader={imageLoader}
                      style={{ width: "100%", height: "auto" }}
                      alt="shape"
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
      </section>
    </>
  );
};

export default AppButtonWithBg;
