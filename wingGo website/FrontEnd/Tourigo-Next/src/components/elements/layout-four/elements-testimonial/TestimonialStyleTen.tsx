"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import { imageLoader } from "@/hooks/image-loader";
import { testimonialData } from "@/data/testimonial-data";
import QuoteIcon from "@/svg/QuoteIcon";
const TestimonialStyleTen = () => {
  return (
    <>
      <section className="feedback__area section-space-bottom fix">
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
                      Testimonial Style 10
                    </h2>
                  </div>
                  <div className="separator__line line-right"></div>
                </div>
                <p className="muted-text"></p>
              </div>
            </div>
          </div>
          <div className="col-xxl-12">
            <div className="feedback__inner p-relative">
              <div className="swiper feedback__active">
                <div className="swiper-wrapper">
                  <Swiper
                    modules={[Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: true,
                    }}
                  >
                    {testimonialData &&
                      testimonialData.slice(10, 15).map((item) => (
                        <SwiperSlide key={item.id}>
                          <div className="swiper-slide">
                            <div className="feedback__grid">
                              <div className="feedback__thumb-wrapper p-relative">
                                <div className="feedback__thumb">
                                  <Image
                                    src={item?.avatarImg}
                                    alt=""
                                    loader={imageLoader}
                                    style={{
                                      width: "100%",
                                      height: "auto",
                                    }}
                                  />
                                </div>
                                <div className="feedback__quote">
                                  <span>
                                    <QuoteIcon />
                                  </span>
                                </div>
                              </div>
                              <div className="divider__line"></div>
                              <div className="feedback__item">
                                <div className="feedback__rating-2 mb-25">
                                  <span>
                                    <i className="fa-solid fa-star"></i>
                                  </span>
                                  <span>
                                    <i className="fa-solid fa-star"></i>
                                  </span>
                                  <span>
                                    <i className="fa-solid fa-star"></i>
                                  </span>
                                  <span>
                                    <i className="fa-solid fa-star"></i>
                                  </span>
                                  <span>
                                    <i className="fa-solid fa-star"></i>
                                  </span>
                                </div>
                                <div className="feedback__content">
                                  <p>{item?.description}</p>
                                </div>
                                <div className="avatar__title">
                                  <h4>{item?.avatarTitle}</h4>
                                  <span>{item?.info}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TestimonialStyleTen;
