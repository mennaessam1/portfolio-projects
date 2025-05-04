"use client";
import { imageLoader } from "@/hooks/image-loader";
import Image from "next/image";
import React from "react";
import tourImgNine from "../../../public/assets/images/tour/tour-img-9.png";
import TourDetailsRightTabArea from "./TourDetailsRightTabArea";
import { tourData } from "@/data/tour-data";
import SidebarSearchArea from "../shearedComponents/SidebarSearchArea";
import TourSingleCard from "../common/tourElements/TourSingleCard";
import BookingFormModal from "@/elements/modals/BookingFormModal";
import Link from "next/link";

const TourDetailsRight = () => {
  const tourDetailsRightData = tourData && tourData.slice(40, 42);
  return (
    <>
      <section className="bd-tour-details-area section-space">
        <div className="container">
          <div className="row gy-24">
            <div className="col-xxl-8 col-xl-8 col-lg-7">
              <div className="tour-details-wrapper">
                <div className="tour-details mb-25">
                  <div className="tour-details-thumb details-slide-full mb-30">
                    <Image
                      src={tourImgNine}
                      loader={imageLoader}
                      style={{ width: "100%", height: "auto" }}
                      alt="image"
                    />
                  </div>
                  <div className="tour-details-content">
                    <div className="tour-details-badge d-flex gap--5 mb-10">
                      <span className="bd-badge warning fw-5">Featured</span>
                      <span className="bd-badge danger fw-5">15% Off</span>
                    </div>
                    <h3 className="tour-details-title mb-15">{`Ultimate Adventure Exploring Nature's
                                            Wonders`}</h3>
                    <div className="tour-details-meta d-flex flex-wrap gap-10 align-items-center justify-content-between mb-20">
                      <div className="tour-details-price">
                        <h4 className="price-title">
                          $189,25<span>/Per Person</span>
                        </h4>
                      </div>
                      <div className="tour-details-meta-right d-flex flex-wrap gap-10 align-items-center justify-content-between">
                        <div className="rating-badge border-badge">
                          <span>
                            <i className="icon-star"></i>4.4
                          </span>
                        </div>
                        <div className="theme-social">
                          <Link href="#">
                            <i className="icon-facebook"></i>
                          </Link>
                          <Link href="#">
                            <i className="icon-twitter-x"></i>
                          </Link>
                          <Link href="#">
                            <i className="icon-linkedin"></i>
                          </Link>
                          <Link href="#">
                            <i className="icon-youtube"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="tour-details-destination-wrapper">
                      <div className="tour-details-destination-info">
                        <div className="search-icon-bg is-big">
                          <span>
                            <i className="fa-light fa-clock"></i>
                          </span>
                        </div>
                        <div className="tour-details-destination-info-title">
                          <p className="tour-details-destination-info-top mb-0">
                            Duration
                          </p>
                          <span className="tour-details-destination-info-bottom small">
                            3 Days 2 Night
                          </span>
                        </div>
                      </div>
                      <div className="tour-details-destination-info">
                        <div className="search-icon-bg is-big">
                          <span>
                            <i className="icon-hourglass"></i>
                          </span>
                        </div>
                        <div className="tour-details-destination-info-title">
                          <p className="tour-details-destination-info-top mb-0">
                            Min Age
                          </p>
                          <span className="tour-details-destination-info-bottom small">
                            10 Years+
                          </span>
                        </div>
                      </div>
                      <div className="tour-details-destination-info">
                        <div className="search-icon-bg is-big">
                          <span>
                            <i className="fa-sharp fa-light fa-moped"></i>
                          </span>
                        </div>
                        <div className="tour-details-destination-info-title">
                          <p className="tour-details-destination-info-top mb-0">
                            Tour Type
                          </p>
                          <span className="tour-details-destination-info-bottom small">
                            Adventure, Foodie
                          </span>
                        </div>
                      </div>
                      <div className="tour-details-destination-info">
                        <div className="search-icon-bg is-big">
                          <span>
                            <i className="fa-light fa-location-dot"></i>
                          </span>
                        </div>
                        <div className="tour-details-destination-info-title">
                          <p className="tour-details-destination-info-top mb-0">
                            Location
                          </p>
                          <span className="tour-details-destination-info-bottom">
                            Brasov, Romania
                          </span>
                        </div>
                      </div>
                    </div>
                    {/*tab area start*/}
                    <TourDetailsRightTabArea />
                    {/*tab area end*/}
                    {/*tour area start*/}
                    <div className="tour-details-related-tour mb-35">
                      <h4 className="mb-20">Related Tour</h4>
                      <div className="row gy-24">
                        {tourDetailsRightData?.map((item) => (
                          <TourSingleCard
                            key={item?.id}
                            tour={item}
                            className="col-xxl-6 col-xl-6 col-md-6"
                            tourWrapperClass="tour-wrapper style-one"
                            isparentClass={true}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-4 col-xl-4 col-lg-5">
              <SidebarSearchArea placeHolderTextData="" />
            </div>
          </div>
        </div>
      </section>
      <BookingFormModal />
    </>
  );
};

export default TourDetailsRight;
