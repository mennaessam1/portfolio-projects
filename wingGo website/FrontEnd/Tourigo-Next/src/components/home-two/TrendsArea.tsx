"use client";
import Image from "next/image";
import React from "react";
import ctaImgFour from "../../../public/assets/images/cta/cta-img-4.jpg";
import { imageLoader } from "@/hooks/image-loader";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { tourData } from "@/data/tour-data";
import Link from "next/link";
import TourSingleCard from "../common/tourElements/TourSingleCard";
import BookingFormModal from "@/elements/modals/BookingFormModal";

const TrendsArea = () => {
  return (
    <>
      <section className="bd-tour-area section-space">
        <div className="container">
          <div className="row gy-24 align-items-center justify-content-between section-title-space">
            <div className="col-lg-6 col-md-8">
              <div className="section-title-wrapper">
                <span className="section-subtitle mb-10">Most Trending</span>
                <h2 className="section-title">Top Trending Place</h2>
              </div>
            </div>
            <div className="col-xl-3 col-md-3 col-sm-3">
              <div className="tour-navigation btn-navigation p-relative style-three d-flex justify-content-md-end">
                <button className="tourigo-navigation-prev">
                  <i className="fa-regular fa-angle-left"></i>
                </button>
                <button className="tourigo-navigation-next">
                  <i className="fa-regular fa-angle-right"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="row gy-24">
            <div className="col-xxl-3 col-xl-3 col-lg-4 order-lg-0 order-1">
              <div className="cta-wrapper cta-style-four">
                <div className="cta-thumb-four">
                  <Image
                    src={ctaImgFour}
                    loader={imageLoader}
                    style={{ width: "100%", height: "auto" }}
                    alt="image"
                  />
                </div>
                <div className="cta-content">
                  <span className="cta-subtitle">Get Dubai Desert Deal</span>
                  <h3 className="cta-title white-text mb-25">
                    Book Your Tickets Now
                  </h3>
                  <div className="cta-button">
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
            <div className="col-xxl-9 col-xl-9 col-lg-8 order-lg-1 order-0">
              <div className="tour-slide-wrapper p-relative">
                <div className="swiper tour__active_two">
                  <Swiper
                    spaceBetween={24}
                    slidesPerView={3}
                    breakpoints={{
                      0: {
                        slidesPerView: 1,
                      },

                      651: {
                        slidesPerView: 2,
                      },

                      950: {
                        slidesPerView: 2,
                      },
                      1280: {
                        slidesPerView: 3,
                      },
                      1400: {
                        slidesPerView: 3,
                      },
                    }}
                    navigation={{
                      nextEl: ".tourigo-navigation-next",
                      prevEl: ".tourigo-navigation-prev",
                    }}
                    modules={[Navigation]}
                    className="d-flex overflow-hidden custom-swiper"
                  >
                    {tourData &&
                      tourData.slice(0, 4).map((item) => (
                        <SwiperSlide
                          key={item.id}
                          className="custom-swiper-slide"
                        >
                          <TourSingleCard
                            tour={item}
                            className=""
                            tourWrapperClass="tour-wrapper style-one"
                            isparentClass={false}
                          />
                        </SwiperSlide>
                      ))}
                  </Swiper>
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

export default TrendsArea;
