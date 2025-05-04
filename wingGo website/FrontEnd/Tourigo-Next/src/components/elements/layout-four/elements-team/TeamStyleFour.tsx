"use client";
import React from "react";
import teamImg5 from "../../../../../public/assets/images/team/team-img-5.png";
import teamImg6 from "../../../../../public/assets/images/team/team-img-6.png";
import teamImg7 from "../../../../../public/assets/images/team/team-img-7.png";
import Image from "next/image";
import { imageLoader } from "@/hooks/image-loader";
import Link from "next/link";
const TeamStyleFour = () => {
  return (
    <>
      <div className="element-team-area section-space-bottom">
        <div className="container">
          <div
            className="row align-items-center justify-content-center wow bdFadeInUp"
            data-wow-delay=".3s"
          >
            <div className="col-lg-12">
              <div className="section-title-wrapper section-title-space text-center fix">
                <div className="elements-section__wrapper elements-line">
                  <div className="separator__line line-left"></div>
                  <div className="elements-title__wrapper">
                    <h2 className="section__title elements__title">
                      Team Style 04
                    </h2>
                  </div>
                  <div className="separator__line line-right"></div>
                </div>
                <p className="muted-text"></p>
              </div>
            </div>
          </div>
          <div className="row gy-24">
            <div className="col-xxl-4col-xl-4 col-lg-4 col-md-6 col-sm-6">
              <div className="team-wrapper team-style-three position-relative">
                <div className="team-content-wrap position-relative">
                  <div className="team-thumb-wrap">
                    <div className="team-thumb image-overly radius-8">
                      <Link href={`/team-details`}>
                        <Image
                          src={teamImg5}
                          alt="image"
                          loader={imageLoader}
                          style={{ width: "100%", height: "auto" }}
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="team-meta d-flex align-content-center align-items-center justify-content-between">
                    <div className="team-content">
                      <h6 className="team-member-name white-text underline-two">
                        <Link href={`/team-details`}>Jude Bellingham</Link>
                      </h6>
                      <span>Financial Manager</span>
                    </div>
                    <div className="team-social-wrap">
                      <span>
                        <i className="icon-share"></i>
                      </span>
                      <div className="theme-social team-social style-two">
                        <Link target="_blank" href="https://www.facebook.com/">
                          <i className="icon-facebook"></i>
                        </Link>
                        <Link target="_blank" href="https://twitter.com/">
                          <i className="icon-twitter-x"></i>
                        </Link>
                        <Link target="_blank" href="https://www.instagram.com/">
                          <i className="icon-instagram"></i>
                        </Link>
                        <Link target="_blank" href="https://bd.linkedin.com/">
                          <i className="icon-linkedin"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-4col-xl-4 col-lg-4 col-md-6 col-sm-6">
              <div className="team-wrapper team-style-three position-relative">
                <div className="team-content-wrap position-relative">
                  <div className="team-thumb-wrap">
                    <div className="team-thumb image-overly radius-8">
                      <Link href={`/team-details`}>
                        <Image
                          src={teamImg6}
                          alt="image"
                          loader={imageLoader}
                          style={{ width: "100%", height: "auto" }}
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="team-meta d-flex align-content-center align-items-center justify-content-between">
                    <div className="team-content">
                      <h6 className="team-member-name white-text underline-two">
                        <Link href={`/team-details`}>Sophia Miller</Link>
                      </h6>
                      <span>Marketing Head</span>
                    </div>
                    <div className="team-social-wrap">
                      <span>
                        <i className="icon-share"></i>
                      </span>
                      <div className="theme-social team-social style-two">
                        <Link target="_blank" href="https://www.facebook.com/">
                          <i className="icon-facebook"></i>
                        </Link>
                        <Link target="_blank" href="https://twitter.com/">
                          <i className="icon-twitter-x"></i>
                        </Link>
                        <Link target="_blank" href="https://www.instagram.com/">
                          <i className="icon-instagram"></i>
                        </Link>
                        <Link target="_blank" href="https://bd.linkedin.com/">
                          <i className="icon-linkedin"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-4col-xl-4 col-lg-4 col-md-6 col-sm-6">
              <div className="team-wrapper team-style-three position-relative">
                <div className="team-content-wrap position-relative">
                  <div className="team-thumb-wrap">
                    <div className="team-thumb image-overly radius-8">
                      <Link href={`/team-details`}>
                        <Image
                          src={teamImg7}
                          alt="image"
                          loader={imageLoader}
                          style={{ width: "100%", height: "auto" }}
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="team-meta d-flex align-content-center align-items-center justify-content-between">
                    <div className="team-content">
                      <h6 className="team-member-name white-text underline-two">
                        <Link href={`/team-details`}>Leonardo Martin</Link>
                      </h6>
                      <span>Customer Officer</span>
                    </div>
                    <div className="team-social-wrap">
                      <span>
                        <i className="icon-share"></i>
                      </span>
                      <div className="theme-social team-social style-two">
                        <Link target="_blank" href="https://www.facebook.com/">
                          <i className="icon-facebook"></i>
                        </Link>
                        <Link target="_blank" href="https://twitter.com/">
                          <i className="icon-twitter-x"></i>
                        </Link>
                        <Link target="_blank" href="https://www.instagram.com/">
                          <i className="icon-instagram"></i>
                        </Link>
                        <Link target="_blank" href="https://bd.linkedin.com/">
                          <i className="icon-linkedin"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamStyleFour;
