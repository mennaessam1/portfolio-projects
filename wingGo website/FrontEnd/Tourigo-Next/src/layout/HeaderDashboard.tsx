import Image from "next/image";
import React from "react";
import logoBlack from "../../public/assets/images/logo/logo-black.svg";
import { imageLoader } from "@/hooks/image-loader";
import Link from "next/link";
import Menu from "./header/components/Menu";
const HeaderDashboard = () => {
  return (
    <>
      <header>
        <div
          className="header-area header-style header-style-two header-transparent"
          id="header-sticky"
        >
          <div className="container">
            <div className="header-inner">
              <div className="header-logo">
                <Link href="/">
                  <Image
                    src={logoBlack}
                    loader={imageLoader}
                    style={{ width: "100%", height: "auto" }}
                    alt="Logo"
                  />
                </Link>
              </div>
              <div className="header-menu">
                <nav className="main-menu main-menu-two" id="mobile-menu">
                  <Menu />
                </nav>
              </div>
              <div className="header-right">
                <div className="header-action d-flex align-items-center">
                  <div className="header-btn-wrap">
                    <div className="d-none d-sm-inline-flex h-gap-55">
                      <div className="header-currency-item header-currency">
                        <span
                          className="header-currency-toggle"
                          id="header-currency-toggle"
                        >
                          USD
                        </span>
                        <ul>
                          <li>
                            <Link href="#">KWD</Link>
                          </li>
                          <li>
                            <Link href="#">GBP</Link>
                          </li>
                          <li>
                            <Link href="#">EUR</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="d-flex h-gap-55">
                      <div className="">
                        {/* <Link
                          className="bd-btn btn-style text-btn"
                          href="contact"
                        >
                          Log out
                        </Link> */}
                       
                        {/* <Link
                          className="bd-btn btn-style text-btn"
                          href="sign-in"
                        >
                         My Profile
                        </Link> */}
                      </div>
                    </div>
                  </div>
                  <div className="header-hamburger">
                    <div className="sidebar-toggle">
                      <Link className="bar-icon" href="#">
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
      </header>
    </>
  );
};

export default HeaderDashboard;
