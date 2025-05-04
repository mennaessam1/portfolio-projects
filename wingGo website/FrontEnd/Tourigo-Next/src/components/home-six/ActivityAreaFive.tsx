"use client";
import { activityData } from "@/data/activity-data";
import { imageLoader } from "@/hooks/image-loader";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ImgcardElementOne from "../common/cardElement/ImgcardElementOne";

const ActivityAreaFive = () => {
  return (
    <>
      <section className="bd-activity-area section-space fix">
        <div className="container">
          <div className="row gy-24 text-center align-items-center justify-content-center section-title-space">
            <div className="col-xl-4">
              <div className="section-title-wrapper">
                <span className="section-subtitle mb-10">Our Activity</span>
                <h2 className="section-title">Common Activity</h2>
              </div>
            </div>
          </div>
          <div className="row gy-24">
            {activityData.length &&
              activityData
                .slice(14, 18)
                .map((item) => (
                  <ImgcardElementOne
                    key={item?.id}
                    wrapperClass="col-xxl-3 col-xl-3 col-lg-6 col-md-6 wow bdFadeInUp"
                    activityStyleClass="activity-wrapper activity-style activity-style-six"
                    item={item}
                  />
                ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ActivityAreaFive;
