import { imageLoader } from "@/hooks/image-loader";
import useGlobalContext from "@/hooks/use-context";
import Image from "next/image";
import React from "react";
import logoBlack from "../../../../../public/assets/images/logo/logo-black.svg";
import Link from "next/link";
import MobileMenu from "../MobileMenu";

const SidebarMain = () => {
  const { sideMenuOpen, toggleSideMenu } = useGlobalContext();
  return (
    <>
      <div className="fix">
        <div className={`offcanvas-area ${sideMenuOpen ? "info-open" : ""}`}>
          <div className="offcanvas-wrapper">
            <div className="offcanvas-content">
              <div className="offcanvas-top d-flex justify-content-between align-items-center mb-25">
                <div className="offcanvas-logo">
                  <Link href="/home">
                    <Image
                      src={logoBlack}
                      loader={imageLoader}
                      style={{ width: "100%", height: "auto" }}
                      alt="logo not found"
                    />
                  </Link>
                </div>
                <div onClick={toggleSideMenu} className="offcanvas-close">
                  <button className="offcanvas-close-icon animation--flip">
                    <span className="offcanvas-m-lines">
                      <span className="offcanvas-m-line line--1"></span>
                      <span className="offcanvas-m-line line--2"></span>
                      <span className="offcanvas-m-line line--3"></span>
                    </span>
                  </button>
                </div>
              </div>
              <div className="offcanvas-search mb-0">
                <form action="#">
                  <input
                    type="text"
                    name="offcanvasSearch"
                    placeholder="Search here"
                  />
                  <button type="submit">
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </button>
                </form>
              </div>
              <div className="mobile-menu fix mb-25 mean-container">
                <div className="mean-bar">
                  <nav className="mean-nav">
                    <MobileMenu />
                  </nav>
                </div>
              </div>
              <div className="offcanvas-about d-none d-lg-block mb-25">
                <h4 className="offcanvas-title-meta">About Tourigo</h4>
                <p>
                  Explore stunning destinations and create immersive travel
                  experiences that inspire wanderlust and captivate your
                  audience from the start.
                </p>
              </div>
              <div className="offcanvas-contact mb-25">
                <h4 className="offcanvas-title-meta">Contact Info</h4>
                <ul>
                  <li className="d-flex align-items-center gap-10">
                    <div className="offcanvas-contact-icon">
                      <Link target="_blank" href="#">
                        <i className="fal fa-map-marker-alt"></i>
                      </Link>
                    </div>
                    <div className="offcanvas-contact-text">
                      <Link target="_blank" href="#">
                        1426 Center StreetBend, 97702, California, USA
                      </Link>
                    </div>
                  </li>
                  <li className="d-flex align-items-center gap-10">
                    <div className="offcanvas-contact-icon">
                      <Link href="tel:+415864872899">
                        <i className="far fa-phone"></i>
                      </Link>
                    </div>
                    <div className="offcanvas-contact-text">
                      <Link href="tel:+415864872899">+415-864-8728-99</Link>
                    </div>
                  </li>
                  <li className="d-flex align-items-center gap-10">
                    <div className="offcanvas-contact-icon">
                      <Link href="mailto:support@tourigo.com">
                        <i className="fal fa-envelope"></i>
                      </Link>
                    </div>
                    <div className="offcanvas-contact-text">
                      <Link href="mailto:support@tourigo.com">
                        support@tourigo.com
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="offcanvas-btn mb-25">
                <h4 className="offcanvas-title-meta">Account</h4>
                <div className="header-btn-wrap gap-10">
                  <Link className="bd-btn btn-style text-btn" href="/sign-in">
                    Log In
                  </Link>
                  <Link className="bd-btn btn-style text-btn" href="/contact">
                    Get Started
                  </Link>
                </div>
              </div>
              <div className="offcanvas-social">
                <h4 className="offcanvas-title-meta">Subscribe & Follow</h4>
                <ul>
                  <li>
                    <Link href="https://www.facebook.com/">
                      <i className="fab fa-facebook-f"></i>
                    </Link>
                  </li>
                  <li>
                    <Link href="https://www.twitter.com/">
                      <i className="fab fa-twitter"></i>
                    </Link>
                  </li>
                  <li>
                    <Link href="https://www.youtube.com/">
                      <i className="fab fa-youtube"></i>
                    </Link>
                  </li>
                  <li>
                    <Link href="https://www.linkedin.com/">
                      <i className="fab fa-linkedin"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={toggleSideMenu}
        className={`offcanvas-overlay ${sideMenuOpen ? "overlay-open" : ""}`}
      ></div>
      <div className="offcanvas-overlay-white"></div>
    </>
  );
};

export default SidebarMain;
