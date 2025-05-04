"use client";
import Image, { StaticImageData } from "next/image";
import React from "react";
import { imageLoader } from "@/hooks/image-loader";
import Link from "next/link";
import { idType } from "@/interFace/interFace";
import { teamData } from "@/data/team-data";

const TeamDetails = ({ id }: idType) => {
  const filterData = teamData.find((item) => item?.id == id);
  return (
    <>
      <section className="bd-team-details-area section-space position-relative">
        <div className="container">
          <div className="row justify-content-between gy-24">
            <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-5">
              <div className="team-details-thumb sidebar-sticky">
                <Image
                  src={filterData?.img as StaticImageData}
                  loader={imageLoader}
                  style={{ width: "100%", height: "auto" }}
                  alt="image"
                />
              </div>
            </div>
            <div className="col-xxl-7 col-xl-7 col-lg-7 col-md-7">
              <div className="team-single-wrapper">
                <div className="team-contents mb-30">
                  <div className="team-heading mb-15">
                    <h2 className="team-single-title">{filterData?.name}</h2>
                    <h6 className="designation theme-text">
                      {filterData?.title}
                    </h6>
                  </div>
                  <p>
                    {filterData?.name}, renowned actor of the silver screen, has
                    taken on a new role as a {filterData?.title}, leveraging his
                    passion for adventure and storytelling to offer travelers an
                    unforgettable experience.
                  </p>
                  <p>{`Brendan's tours are characterized by their dynamic nature, combining elements of education, entertainment, and adventure. While Brendan's expertise spans across various destinations, he may have a particular fondness for historical sites or locations with a sense of mystery and intrigue. One of Brendan's greatest strengths as a tour guide is his ability to connect with people from all walks of life.`}</p>
                  <div className="team-info mb-20">
                    <h4 className="mb-15">Information:</h4>
                    <ul>
                      <li>
                        <span className="team-label">Phone : </span>
                        <Link href="tel:+415864872899">+415-864-8728-99</Link>
                      </li>
                      <li>
                        <span className="team-label">Website : </span>
                        <Link href="#">www.tourigo.com</Link>
                      </li>
                      <li>
                        <span className="team-label">Email : </span>
                        <Link href="mailto:support@tourigo.com">
                          support@tourigo.com
                        </Link>
                      </li>
                      <li>
                        <span className="team-label">Address : </span>
                        <Link href="#">1426 California, USA</Link>
                      </li>
                    </ul>
                  </div>
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
                <div className="team-single-skills">
                  <h4 className="mb-15">Professional Skills</h4>
                  <ul>
                    <li>Exceptional storytelling abilities</li>
                    <li>
                      In-depth knowledge of historical and cultural landmarks
                    </li>
                    <li>Strong communication and interpersonal skills</li>
                    <li>Ability to adapt to diverse group dynamics</li>
                    <li>
                      Skilled in managing logistics and ensuring tour safety
                    </li>
                  </ul>
                  <div className="team-progress-bar">
                    <div className="team-progress">
                      <div className="team-progress-wrapper">
                        <div className="team-progress-head">
                          <span className="team-progress-title">
                            Communication Skills
                          </span>
                          <span className="team-progress-percentage">
                            <span
                              data-purecounter-duration=".7"
                              data-purecounter-end="85"
                              className="purecounter"
                            >
                              85
                            </span>
                            %
                          </span>
                        </div>
                        <div className="progress">
                          <div
                            className="progress-bar wow slideInLeft"
                            role="progressbar"
                            style={{ width: "85%" }}
                            aria-valuenow={25}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          ></div>
                        </div>
                      </div>
                      <div className="team-progress-wrapper">
                        <div className="team-progress-head">
                          <span className="team-progress-title">
                            Success Ratio
                          </span>
                          <span className="team-progress-percentage">
                            <span
                              data-purecounter-duration=".7"
                              data-purecounter-end="75"
                              className="purecounter"
                            >
                              75
                            </span>
                            %
                          </span>
                        </div>
                        <div className="progress">
                          <div
                            className="progress-bar wow slideInLeft"
                            role="progressbar"
                            style={{ width: "75%" }}
                            aria-valuenow={25}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          ></div>
                        </div>
                      </div>
                      <div className="team-progress-wrapper">
                        <div className="team-progress-head">
                          <span className="team-progress-title">
                            Client Happiness
                          </span>
                          <span className="team-progress-percentage">
                            <span
                              data-purecounter-duration=".7"
                              data-purecounter-end="95"
                              className="purecounter"
                            >
                              95
                            </span>
                            %
                          </span>
                        </div>
                        <div className="progress">
                          <div
                            className="progress-bar wow slideInLeft"
                            role="progressbar"
                            style={{ width: "95%" }}
                            aria-valuenow={25}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TeamDetails;
