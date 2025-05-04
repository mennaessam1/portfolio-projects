import Image from "next/image";
import React from "react";
import logoWhite from "../../../public/assets/images/logo/logo-white.svg";
import logoBlack from "../../../public/assets/images/logo/logo-black.svg";
import Link from "next/link";
import { imageLoader } from "@/hooks/image-loader";
import Menu from "./components/Menu";
import useGlobalContext from "@/hooks/use-context";

const TourListingHeader = () => {
  const { toggleSideMenu, scrollDirection } = useGlobalContext();
  return (
    <>
      <header>
        <div
          id="header-sticky"
          className={`header-area header-style header-style-one has-border ${
            scrollDirection === "down" ? "bd-sticky" : ""
          }`}
        >
          <div className="container">
            <div className="mega-menu-wrapper p-relative">
              <div className="header-main">
                <div className="header-left">
                  <div className="header-logo">
                    <Link href="/" className="logo-primary">
                      <Image
                        src={logoWhite}
                        loader={imageLoader}
                        style={{ width: "100%", height: "auto" }}
                        alt="logo not found"
                      />
                    </Link>
                    <Link href="/" className="logo-secondary">
                      <Image
                        src={logoBlack}
                        loader={imageLoader}
                        style={{ width: "100%", height: "auto" }}
                        alt="logo not found"
                      />
                    </Link>
                  </div>
                  <div className="header-menu">
                    <nav className="main-menu" id="mobile-menu">
                      <Menu />
                    </nav>
                  </div>
                </div>
                <div className="header-right">
                  <div className="header-action d-flex align-items-center">
                    <div className="header-btn-wrap d-flex align-items-center h-gap-55">
                      <div className="d-none d-sm-inline-flex h-gap-55">
                     
                      </div>
                      <div className="d-flex h-gap-55">
                        <div className="d-xxs-none">
                          {/* <Link
                            className="bd-btn btn-style text-btn color-white"
                            href="/contact"
                          >
                            Log out
                          </Link> */}
                         
                        </div>
                      </div>
                    </div>
                    <div
                      onClick={toggleSideMenu}
                      className="header-hamburger ml-20 d-xl-none"
                    >
                      <div className="sidebar-toggle">
                        <Link className="bar-icon" href="">
                          <span></span>
                          <span></span>
                          <span></span>
                        </Link>
                      </div>
                    </div>
                    {/*for wp*/}
                    <div className="header-hamburger ml-20 d-none">
                      <button
                        type="button"
                        className="hamburger-btn offcanvas-open-btn"
                      >
                        <span>01</span>
                        <span>01</span>
                        <span>01</span>
                      </button>
                    </div>
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

export default TourListingHeader;
