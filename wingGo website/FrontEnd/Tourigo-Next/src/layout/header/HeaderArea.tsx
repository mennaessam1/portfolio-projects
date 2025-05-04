"use client";
import { imageLoader } from "@/hooks/image-loader";
import Image from "next/image";
import React from "react";
import HeaderLogo from "../../../public/assets/images/logo/logo-black.svg";
import Link from "next/link";
import Menu from "./components/Menu";
import useGlobalContext from "@/hooks/use-context";

const HeaderArea = () => {
  const { toggleSideMenu, scrollDirection } = useGlobalContext();
  return (
    <>
      <header>
        <div
          className={`header-area header-style header-style-two ${
            scrollDirection === "down" ? "bd-sticky" : ""
          }`}
          id="header-sticky"
        >
          <div className="container">
            <div className="header-inner">
              <div className="header-logo">
                <Link href="/">
                  <Image
                    loader={imageLoader}
                    style={{ width: "100%", height: "auto" }}
                    src={HeaderLogo}
                    alt="Logo"
                  />
                </Link>
              </div>
              <div className="header-menu">
                <nav className="main-menu main-menu-two" id="mobile-menu">
                  <Menu />
                </nav>
              </div>
              <div className="header-right d-flex align-items-center gap-24">
                <div className="header-btn d-none d-sm-block">
                  <Link
                    href="/https://themeforest.net/item/tourigo-tour-travel-html5-template/51357906?s_rank=1"
                    className="bd-primary-btn btn-style has-arrow is-bg radius-60"
                  >
                    <span className="bd-primary-btn-arrow arrow-right">
                      <i className="fa-regular fa-arrow-right"></i>
                    </span>
                    <span className="bd-primary-btn-text">Purchase Now</span>
                    <span className="bd-primary-btn-circle"></span>
                    <span className="bd-primary-btn-arrow arrow-left">
                      <i className="fa-regular fa-arrow-right"></i>
                    </span>
                  </Link>
                </div>
                <div
                  onClick={toggleSideMenu}
                  className="header-hamburger ml-20 d-xl-none"
                >
                  <div className="sidebar-toggle">
                    <Link className="bar-icon" href="/#">
                      <span></span>
                      <span></span>
                      <span></span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderArea;
