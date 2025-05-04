"use client";
import { teamData } from "@/data/team-data";
import { imageLoader } from "@/hooks/image-loader";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AboutTeamArea = () => {
  return (
    <>
      <section className="bd-team-area section-space-bottom">
        <div className="container">
          <div className="row gy-24 align-items-center justify-content-center section-title-space">
            <div className="col-lg-6 col-md-8">
              <div className="section-title-wrapper text-center">
                <span className="section-subtitle mb-10">Our Team</span>
                <h2 className="section-title">Our Expert Team Members</h2>
              </div>
            </div>
          </div>
          <div className="row gy-24">
            {teamData &&
              teamData.slice(8, 11).map((item) => (
                <div
                  key={item.id}
                  className="col-xxl-4col-xl-4 col-lg-4 col-md-6"
                >
                  <div className="team-wrapper team-style-three position-relative">
                    <div className="team-content-wrap position-relative">
                      <div className="team-thumb-wrap">
                        <div className="team-thumb image-overly radius-8">
                          <Link href={`/team-details/${item?.id}`}>
                            <Image
                              src={item.img}
                              loader={imageLoader}
                              style={{ width: "100%", height: "100%" }}
                              alt="image"
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="team-meta d-flex align-content-center align-items-center justify-content-between">
                        <div className="team-content">
                          <h6 className="team-member-name white-text underline-two">
                            <Link href={`/team-details/${item?.id}`}>
                              {item.name}
                            </Link>
                          </h6>
                          <span>{item.title}</span>
                        </div>
                        <div className="team-social-wrap">
                          <span>
                            <i className="icon-share"></i>
                          </span>
                          <div className="theme-social team-social style-two">
                            <Link target="#" href="https://www.facebook.com/">
                              <i className="icon-facebook"></i>
                            </Link>
                            <Link target="#" href="https://twitter.com/">
                              <i className="icon-twitter-x"></i>
                            </Link>
                            <Link target="#" href="https://www.instagram.com/">
                              <i className="icon-instagram"></i>
                            </Link>
                            <Link target="#" href="https://bd.linkedin.com/">
                              <i className="icon-linkedin"></i>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutTeamArea;
