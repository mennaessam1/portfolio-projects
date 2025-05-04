"use client";
import { teamData } from "@/data/team-data";
import { imageLoader } from "@/hooks/image-loader";
import Image from "next/image";
import Link from "next/link";
import React from "react";
const TeamStyleSeven = () => {
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
                      Team Style 07
                    </h2>
                  </div>
                  <div className="separator__line line-right"></div>
                </div>
                <p className="muted-text"></p>
              </div>
            </div>
          </div>
          <div className="row justify-content-between gy-24">
            {teamData &&
              teamData.slice(3, 7).map((item) => (
                <div
                  key={item?.id}
                  className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6"
                >
                  <div className="team-wrapper team-style-five">
                    <div className="team-thumb image-overly radius-8 mb-15">
                      <Link href={`/team-details/${item?.id}`}>
                        {" "}
                        <Image
                          src={item.img}
                          loader={imageLoader}
                          style={{ width: "100%", height: "auto" }}
                          alt="image"
                        />
                      </Link>
                    </div>
                    <div className="team-content mb-10">
                      <span className="team-member-designation">
                        {item?.title}
                      </span>
                      <h5 className="team-member-name underline">
                        <Link href={`/team-details/${item?.id}`}>
                          {item?.name}
                        </Link>
                      </h5>
                    </div>
                    <div className="theme-social team-social">
                      <Link
                        className="icon-1"
                        target="_blank"
                        href="https://www.facebook.com/"
                      >
                        <i className="icon-facebook"></i>
                      </Link>
                      <Link
                        className="icon-2"
                        target="_blank"
                        href="https://twitter.com/"
                      >
                        <i className="icon-twitter-x"></i>
                      </Link>
                      <Link
                        className="icon-3"
                        target="_blank"
                        href="https://www.instagram.com/"
                      >
                        <i className="icon-instagram"></i>
                      </Link>
                      <Link
                        className="icon-4"
                        target="_blank"
                        href="https://bd.linkedin.com/"
                      >
                        <i className="icon-linkedin"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamStyleSeven;
