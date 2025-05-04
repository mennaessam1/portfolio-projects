"use client";
import { activityData } from "@/data/activity-data";
import Link from "next/link";
import React from "react";
import ImgcardElementOne from "../common/cardElement/ImgcardElementOne";

const ActivityArea = () => {
  return (
    <>
      <section className="bd-activity-area section-space">
        <div className="container">
          <div className="row gy-24 align-items-center justify-content-between section-title-space">
            <div className="col-xl-10 col-lg-9 col-md-9 col-sm-8">
              <div className="section-title-wrapper">
                <span className="section-subtitle mb-10">Our Activity</span>
                <h2 className="section-title">Common Activity</h2>
              </div>
            </div>
            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4">
              <div className="bd-activity-btn text-sm-end">
                <Link
                  href="/destinations-grid-right"
                  className="bd-primary-btn btn-style has-arrow radius-60"
                >
                  <span className="bd-primary-btn-arrow arrow-right">
                    <i className="fa-regular fa-arrow-right"></i>
                  </span>
                  <span className="bd-primary-btn-text">See All</span>
                  <span className="bd-primary-btn-circle"></span>
                  <span className="bd-primary-btn-arrow arrow-left">
                    <i className="fa-regular fa-arrow-right"></i>
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="row gy-24">
            {activityData.length > 0 &&
              activityData
                .slice(0, 4)
                .map((item) => (
                  <ImgcardElementOne key={item?.id} item={item} />
                ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ActivityArea;
