"use client";
import { counterData } from "@/data/counter-data";
import { destinatoinData } from "@/data/destination-data";
import CountUpContent from "@/elements/counter/CountUpContent";
import { imageLoader } from "@/hooks/image-loader";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const DestinationAreaFour = () => {
  return (
    <>
      <section className="bd-activity-area section-space flash-white">
        <div className="container">
          <div className="row gy-24 align-items-center justify-content-between section-title-space">
            <div className="col-xl-6 col-md-8">
              <div className="section-title-wrapper">
                <span className="section-subtitle mb-10">Destinations</span>
                <h2 className="section-title">Popular Places</h2>
              </div>
            </div>
            <div className="col-xl-2 col-md-3">
              <div className="bd-activity-btn text-md-end">
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
            {destinatoinData &&
              destinatoinData.slice(15, 19).map((item) => (
                <div
                  key={item.id}
                  className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 wow bdFadeInUp"
                  data-wow-delay={item.delay}
                >
                  <div className="activity-wrapper activity-style-five">
                    <div className="activity-thumb image-overly">
                      <Link href={`/destinations-details/${item?.id}`}>
                        <Image
                          src={item.img}
                          loader={imageLoader}
                          style={{ width: "100%", height: "auto" }}
                          alt="image"
                        />
                      </Link>
                    </div>
                    <div className="activity-content-wrap">
                      <h6 className="activity-title white-text underline-two mb-10">
                        <Link href={`/destinations-details/${item?.id}`}>
                          {item.title}
                        </Link>
                      </h6>
                      <p className="activity-location">
                        <span>
                          <i className="icon-location-fill"></i>
                        </span>
                        {item.destination}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="row">
            <div className="counter-wrapper counter-style-three has-transparent section-space-top">
              {counterData &&
                counterData.slice(4, 8).map((item) => (
                  <div key={item.id} className="counter-item">
                    <div className="counter-content">
                      <span className="counter-icon">
                        <i className="icon-location-crosshairs"></i>
                      </span>
                      <h2>
                        <span>
                          <CountUpContent
                            number={item.counterNumber}
                            text={`${
                              item.counterTitle === "+"
                                ? "+"
                                : item.counterTitle === "K+"
                                ? "K+"
                                : "M+"
                            }`}
                          />
                        </span>
                      </h2>
                      <p>{item.description}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DestinationAreaFour;
