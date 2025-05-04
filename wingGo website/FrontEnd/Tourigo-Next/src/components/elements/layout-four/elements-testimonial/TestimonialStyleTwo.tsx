"use client";
import { testimonialData } from "@/data/testimonial-data";
import GetRatting from "@/hooks/GetRatting";
import { imageLoader } from "@/hooks/image-loader";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import quoteShpae from "../../../../../public/assets/images/testimonial/quot-shape.png";
import bgImg from "../../../../../public/assets/images/testimonial/testimonial-bg.png";
const TestimonialStyleTwo = () => {
  return (
    <>
      <div className="bd-testimonial-area section-space-bottom fix">
        <div className="container">
          <div
            className="row align-items-center justify-content-center wow bdFadeInUp"
            data-wow-delay=".3s"
          >
            <div className="col-lg-12">
              <div className="section-title-wrapper section-title-space text-center">
                <div className="elements-section__wrapper elements-line">
                  <div className="separator__line line-left"></div>
                  <div className="elements-title__wrapper">
                    <h2 className="section__title elements__title">
                      Testimonial Style 02
                    </h2>
                  </div>
                  <div className="separator__line line-right"></div>
                </div>
                <p className="muted-text"></p>
              </div>
            </div>
          </div>
        </div>

        <div className="bd-testimonial-area section-space p-relative fix">
          <div
            className="testimonial-bg"
            style={{ backgroundImage: `url(${bgImg.src})` }}
          ></div>
          <div className="container">
            <div className="row gy-24 justify-content-between">
              <div className="col-xxl-7 col-xl-7 col-lg-12 order-xl-0 order-1">
                <div className="testimonial-slider-wrap">
                  <div className="testimonial-slider p-relative">
                    <div className="swiper testimonial_active position-relative">
                      <div className="swiper-wrapper">
                        <Swiper
                          modules={[Navigation, Pagination]}
                          spaceBetween={24}
                          slidesPerView={2}
                          breakpoints={{
                            0: {
                              slidesPerView: 1,
                            },
                            768: {
                              slidesPerView: 2,
                            },
                            1024: {
                              slidesPerView: 2,
                            },
                          }}
                          navigation={{
                            nextEl: ".tourigo-navigation-next",
                            prevEl: ".tourigo-navigation-prev",
                          }}
                          pagination={{
                            el: ".bd-pagination",
                            clickable: true,
                          }}
                        >
                          {testimonialData &&
                            testimonialData.slice(3, 7).map((item) => (
                              <SwiperSlide
                                key={item.id}
                                className="custom-swiper-slide"
                              >
                                <div className="swiper-slide">
                                  <div className="testimonial-wrapper">
                                    <div className="testimonial-content p-relative">
                                      <p>{item?.description}</p>
                                      <div className="testimonial-avatar">
                                        <div className="testimonial-avatar-wrap">
                                          <div className="avatar-thumb">
                                            <Image
                                              src={item?.avatarImg}
                                              loader={imageLoader}
                                              style={{
                                                width: "100%",
                                                height: "auto",
                                              }}
                                              alt="image"
                                            />
                                          </div>
                                          <div className="avatar-meta">
                                            <h6 className="avatar-meta-title">
                                              {item?.avatarTitle}
                                            </h6>
                                            <p>{item?.info}</p>
                                          </div>
                                        </div>
                                        <div className="avatar-rating">
                                          <div className="fs-14 d-flex rating-color">
                                            <GetRatting averageRating={5} />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="testimonial-quot">
                                        <Image
                                          src={quoteShpae}
                                          loader={imageLoader}
                                          style={{
                                            width: "100%",
                                            height: "auto",
                                          }}
                                          alt="image"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </SwiperSlide>
                            ))}
                        </Swiper>
                      </div>
                    </div>

                    <div className="pagination-wrapper">
                      <div className="slider-pagination bd-pagination mt-50 justify-content-center"></div>
                    </div>

                    <div className="testimonial-navigation btn-navigation style-two">
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
              <div className="col-xxl-5 col-xl-5 col-lg-6 order-xl-1 order-0">
                <div className="testimonial-left">
                  <div className="section-title-wrapper mb-35">
                    <span className="section-subtitle text-warning mb-10">
                      Testimonials
                    </span>
                    <h2 className="section-title white-text mb-15">
                      Customer Review
                    </h2>
                    <p className="white-text">
                      Making your enjoyable travels Journey joy A {`traveler's`}
                      Manual for Maximum Enjoyment
                    </p>
                  </div>
                  <div className="travel-btn">
                    <Link
                      href="/booking"
                      className="bd-primary-btn btn-style has-arrow is-bg radius-60"
                    >
                      <span className="bd-primary-btn-arrow arrow-right">
                        <i className="fa-regular fa-arrow-right"></i>
                      </span>
                      <span className="bd-primary-btn-text">
                        Are you looking a Travel?
                      </span>
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
      </div>
    </>
  );
};

export default TestimonialStyleTwo;
