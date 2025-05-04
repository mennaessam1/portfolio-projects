"use client";
import { tourData } from "@/data/tour-data";
import Link from "next/link";
import React from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import TourSingleCardTwo from "../common/tourElements/TourSingleCardTwo";
import BookingFormModal from "@/elements/modals/BookingFormModal";
const TourAreaFour = () => {
  return (
    <>
      <section className="bd-service-area section-space fix">
        <div className="container">
          <div className="row gy-24 align-items-center justify-content-between section-title-space">
            <div className="col-lg-6 col-md-8">
              <div className="section-title-wrapper">
                <span className="section-subtitle mb-10">Our Trips</span>
                <h2 className="section-title">Feature Packages</h2>
              </div>
            </div>
            <div className="col-lg-2 text-md-end">
              <div className="tour-btn">
                <Link
                  href="/tour-grid-right"
                  className="bd-primary-btn btn-style has-arrow radius-60"
                >
                  <span className="bd-primary-btn-arrow arrow-right">
                    <i className="fa-regular fa-arrow-right"></i>
                  </span>
                  <span className="bd-primary-btn-text">View All</span>
                  <span className="bd-primary-btn-circle"></span>
                  <span className="bd-primary-btn-arrow arrow-left">
                    <i className="fa-regular fa-arrow-right"></i>
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div className="tour-slide-wrapper p-relative">
                <div className="swiper tour-four-active">
                  <Swiper
                    modules={[Navigation]}
                    spaceBetween={24}
                    slidesPerView={3}
                    breakpoints={{
                      0: {
                        slidesPerView: 1,
                      },
                      768: {
                        slidesPerView: 2,
                      },
                      1024: {
                        slidesPerView: 3,
                      },
                    }}
                    mousewheel={true}
                    navigation={{
                      nextEl: ".tourigo-navigation-next",
                      prevEl: ".tourigo-navigation-prev",
                    }}
                  >
                    {tourData &&
                      tourData.slice(20, 24).map((item) => (
                        <SwiperSlide
                          key={item.id}
                          className="custom-swiper-slide"
                        >
                          <TourSingleCardTwo
                            key={item?.id}
                            tour={item}
                            className=""
                            tourWrapperClass="tour-wrapper style-four"
                            isparentClass={false}
                          />
                        </SwiperSlide>
                      ))}
                  </Swiper>
                </div>
                <div className="tour-navigation btn-navigation">
                  <button className="tourigo-navigation-prev">
                    <i className="fa-regular fa-angle-left"></i>
                  </button>
                  <button className="tourigo-navigation-next">
                    <i className="fa-regular fa-angle-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <BookingFormModal />
    </>
  );
};

export default TourAreaFour;
