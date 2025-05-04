"use client";
import Image from "next/image";
import React from "react";
import { testimonialData } from "@/data/testimonial-data";
import { imageLoader } from "@/hooks/image-loader";
import quoteImg from "../../../public/assets/images/testimonial/quot-shape-2.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

const TestimonialAreaThree = () => {
  return (
    <>
      <section className="bd-testimonial-area section--space position-relative fix">
        <div className="testimonial-video">
          <video
            src="/assets/video/testimonial.mp4"
            autoPlay
            loop
            playsInline
            muted
          ></video>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xxl-6 col-xl-7 col-lg-7 order-xl-0 order-1">
              <div className="swiper testimonial-active-three">
                <Swiper
                  modules={[Autoplay, Pagination]}
                  spaceBetween={30}
                  slidesPerView={1}
                  loop={true}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: true,
                  }}
                  pagination={{
                    el: ".bd-pagination",
                    clickable: true,
                  }}
                >
                  {testimonialData &&
                    testimonialData.slice(8, 12).map((item) => (
                      <SwiperSlide
                        key={item.id}
                        className="custom-swiper-slide"
                      >
                        <div className="testimonial-wrapper testimonial-style-two">
                          <div className="testimonial-content p-relative">
                            <div className="testimonial-avatar flex-wrap mb-10">
                              <div className="testimonial-avatar-wrap">
                                <div className="avatar-thumb border-thumb">
                                  <Image
                                    src={item.avatarImg}
                                    loader={imageLoader}
                                    style={{ width: "100%", height: "100%" }}
                                    alt="image"
                                  />
                                </div>
                                <div className="avatar-meta">
                                  <h6 className="avatar-meta-title">
                                    {item.avatarTitle}
                                  </h6>
                                  <p>{item.info}</p>
                                </div>
                              </div>
                              <div className="avatar-rating p-relative">
                                <div className="fs-14 d-flex rating-color">
                                  <i className="fa-solid fa-star"></i>
                                  <i className="fa-solid fa-star"></i>
                                  <i className="fa-solid fa-star"></i>
                                  <i className="fa-solid fa-star"></i>
                                  <i className="fa-solid fa-star"></i>
                                </div>
                                <div className="testimonial-quot">
                                  <Image
                                    src={quoteImg}
                                    loader={imageLoader}
                                    style={{ width: "100%", height: "100%" }}
                                    alt="shape"
                                  />
                                </div>
                              </div>
                            </div>
                            <p className="testimonial-desc">
                              Visiting Machu Picchu was an absolute dream come
                              true! The ancient ruins are truly mesmerizing, and
                              the views are breathtaking.
                            </p>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  <div className="slider-pagination-wrapper">
                    <div className="slider-pagination bd-pagination mt-50 justify-content-center"></div>
                  </div>
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TestimonialAreaThree;
