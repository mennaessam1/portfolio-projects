"use client";
import { tourData } from "@/data/tour-data";
import React from "react";
import { Swiper as SwiperReact, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import TourSingleCardThree from "../common/tourElements/TourSingleCardThree";

const TourAreaThree = () => {
  return (
    <>
      <section className="bd-service-area section-space flash-white fix">
        <div className="container">
          <div className="row gy-24 align-items-center justify-content-center section-title-space">
            <div className="col-lg-6 col-md-8">
              <div className="section-title-wrapper text-center">
                <span className="section-subtitle mb-10">Our Trips</span>
                <h2 className="section-title">Find Popular Trip</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div className="tour-slide-wrapper p-relative">
                <div className="swiper tour-three-active">
                  <SwiperReact
                    modules={[Navigation]}
                    spaceBetween={24}
                    slidesPerView={4}
                    breakpoints={{
                      0: {
                        slidesPerView: 1,
                      },

                      768: {
                        slidesPerView: 2,
                      },

                      950: {
                        slidesPerView: 3,
                      },
                      1280: {
                        slidesPerView: 4,
                      },
                      1400: {
                        slidesPerView: 4,
                      },
                    }}
                    navigation={{
                      nextEl: ".tourigo-navigation-next",
                      prevEl: ".tourigo-navigation-prev",
                    }}
                    className="d-flex overflow-hidden custom-swiper"
                  >
                    {tourData &&
                      tourData.slice(14, 20).map((item) => (
                        <SwiperSlide
                          key={item.id}
                          className="custom-swiper-slide"
                        >
                          <TourSingleCardThree
                            item={item}
                            className=""
                            tourWrapperClass="tour-wrapper style-three"
                            isparentClass={false}
                          />
                        </SwiperSlide>
                      ))}
                  </SwiperReact>
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
    </>
  );
};

export default TourAreaThree;
