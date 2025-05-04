"use client";
import { imageLoader } from "@/hooks/image-loader";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import activitySix from "../../../public/assets/images/activity/activity-img-10.png";
import { activityData } from "@/data/activity-data";

const ActivityTwoArea = () => {
  return (
    <>
      <section className="bd-activities-area section-space flash-white p-relative">
        <div className="container">
          <div className="row gy-24 align-items-center justify-content-between section-title-space">
            <div className="col-xl-6 col-md-8">
              <div className="section-title-wrapper">
                <span className="section-subtitle mb-10">Activities</span>
                <h2 className="section-title">Popular Things To Do</h2>
              </div>
            </div>
            <div className="col-xl-2 col-md-4">
              <div className="destination-btn text-md-end">
                <Link
                  href="/booking"
                  className="bd-primary-btn btn-style has-arrow radius-60"
                >
                  <span className="bd-primary-btn-arrow arrow-right">
                    <i className="fa-regular fa-arrow-right"></i>
                  </span>
                  <span className="bd-primary-btn-text">View More</span>
                  <span className="bd-primary-btn-circle"></span>
                  <span className="bd-primary-btn-arrow arrow-left">
                    <i className="fa-regular fa-arrow-right"></i>
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="row gy-24">
            <div className="col-xl-3 col-lg-4 col-md-4">
              {activityData &&
                activityData.slice(4, 6).map((item) => (
                  <div
                    key={item.id}
                    className="activity-wrapper activity-style-two"
                  >
                    <div className="activity-thumb image-overly">
                      <Link href="#">
                        <Image
                          src={item.img}
                          loader={imageLoader}
                          style={{ width: "100%", height: "auto" }}
                          alt="image"
                        />
                      </Link>
                    </div>
                    <div className="activity-content">
                      <div className="activity-title-wrap">
                        <h5 className="activity-title underline-two">
                          <Link href="#">{item.title}</Link>
                        </h5>
                        <p>{item.count}+ Tours</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="col-xl-6 col-lg-8 col-md-8">
              {activityData &&
                activityData.slice(6, 7).map((item) => (
                  <div
                    key={item.id}
                    className="activity-wrapper activity-style-two"
                  >
                    <div className="activity-thumb image-overly">
                      <Link href="#">
                        <Image
                          src={item.img}
                          loader={imageLoader}
                          style={{ width: "100%", height: "auto" }}
                          alt="image"
                        />
                      </Link>
                    </div>
                    <div className="activity-content">
                      <div className="activity-title-wrap">
                        <h5 className="activity-title underline-two">
                          <Link href="#">{item.title}</Link>
                        </h5>
                        <p>{item.count}+ Tours</p>
                      </div>
                    </div>
                  </div>
                ))}
              <div className="row gy-24">
                {activityData &&
                  activityData.slice(3, 5).map((item) => (
                    <div key={item.id} className="col-xl-6 col-lg-6 col-md-6">
                      <div className="activity-wrapper activity-style-two">
                        <div className="activity-thumb image-overly">
                          <Link href="#">
                            <Image
                              src={item.img}
                              loader={imageLoader}
                              style={{ width: "100%", height: "auto" }}
                              alt="image"
                            />
                          </Link>
                        </div>
                        <div className="activity-content">
                          <div className="activity-title-wrap">
                            <h5 className="activity-title underline-two">
                              <Link href="#">{item.title}</Link>
                            </h5>
                            <p>{item.count}+ Tours</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-12">
              <div className="offer-wrapper offer-style-five">
                <div className="offer-thumb">
                  <Image
                    src={activitySix}
                    loader={imageLoader}
                    style={{ width: "100%", height: "auto" }}
                    alt="image"
                  />
                </div>
                <div className="offer-content">
                  <p className="title-font mb-20">Enjoy Up to Half Off!</p>
                  <h4 className="offer-title white-text mb-40">
                    Unlock Special Savings: Up to 50% Off Your Next Adventure!
                  </h4>
                  <div className="offer-btn">
                    <Link
                      href="/booking"
                      className="bd-primary-btn btn-style has-arrow is-bg btn-tertiary is-white radius-60"
                    >
                      <span className="bd-primary-btn-arrow arrow-right">
                        <i className="fa-regular fa-arrow-right"></i>
                      </span>
                      <span className="bd-primary-btn-text">Book Now</span>
                      <span className="bd-primary-btn-circle"></span>
                      <span className="bd-primary-btn-arrow arrow-left">
                        <i className="fa-regular fa-arrow-right"></i>
                      </span>
                    </Link>
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

export default ActivityTwoArea;
