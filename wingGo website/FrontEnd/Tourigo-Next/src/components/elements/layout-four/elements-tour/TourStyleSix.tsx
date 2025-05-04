import TourSingleCardStripeBorder from "@/components/common/tourElements/TourSingleCardStripeBorder";
import { dayTourData } from "@/data/homeFour/day-tour-data";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const TourStyleSix = () => {
  return (
    <>
      <section className="element-Tour-area section-space-bottom">
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
                      Tour Style 06
                    </h2>
                  </div>
                  <div className="separator__line line-right"></div>
                </div>
                <p className="muted-text"></p>
              </div>
            </div>
          </div>
          <div className="row gy-24">
            {dayTourData &&
              dayTourData.map((item) => (
                <TourSingleCardStripeBorder key={item?.id} item={item} />
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default TourStyleSix;
