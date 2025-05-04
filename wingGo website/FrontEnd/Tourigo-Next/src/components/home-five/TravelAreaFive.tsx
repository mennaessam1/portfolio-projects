"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import planeShape from "../../../public/assets/images/shapes/plane-4.png";
import cameraShape from "../../../public/assets/images/shapes/camera-2.png";
import coconutTree from "../../../public/assets/images/shapes/coconut-tree.png";
import { imageLoader } from "@/hooks/image-loader";
import { travelData } from "@/data/travel-data";

const TravelAreaFive = () => {
  return (
    <>
      <section className="bd-travel-area section-space p-relative fix">
        <div className="container">
          <div className="travel-shape">
            <div className="travel-shape-seven">
              <Image
                src={planeShape}
                loader={imageLoader}
                style={{ width: "100%", height: "100%" }}
                alt="shape"
              />
            </div>
            <div className="travel-shape-eight">
              <svg
                className="line-dash"
                width="173"
                height="145"
                viewBox="0 0 173 145"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.3"
                  d="M171.216 1.0094C155.511 18.8374 132.358 19.2619 132.358 46.5615C132.358 73.2973 167.172 86.1913 154.239 119.439C136.405 165.282 33.6853 104.157 1.42519 143.209"
                  stroke="#006CE4"
                  strokeWidth="2"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="3 3"
                />
              </svg>
            </div>
            <div className="travel-shape-three">
              <Image
                src={cameraShape}
                loader={imageLoader}
                style={{ width: "100%", height: "100%" }}
                alt="shape"
              />
            </div>
            <div className="travel-shape-nine">
              <Image
                src={coconutTree}
                loader={imageLoader}
                style={{ width: "100%", height: "100%" }}
                alt="shape"
              />
            </div>
          </div>
          <div className="row gy-24 justify-content-between">
            <div className="col-xl-6 col-lg-6">
              <div className="travel-section">
                <div className="section-title-wrapper mb-35">
                  <span className="section-subtitle mb-10">
                    Are you ready to travel?
                  </span>
                  <h3 className="section-title mb-15">
                    Prepared for Real Adventure & Natural Delights
                  </h3>
                  <p>
                    Share the core values and principles that drive your company
                    Emphasize a commitment to customer satisfaction
                  </p>
                </div>
                
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="row gy-24">
                {travelData &&
                  travelData.map((item) => (
                    <div key={item.id} className="col-lg-6 col-sm-6">
                      <div className="travel-wrapper style-two">
                        <div className="travel-item">
                          <div className="travel-icon">
                            <span>
                              <i className={item.travelIcon}></i>
                            </span>
                          </div>
                          <h5 className="travel-title underline-two">
                            
                              {item.travelTitle}
                              Tours
                          
                          </h5>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TravelAreaFive;
