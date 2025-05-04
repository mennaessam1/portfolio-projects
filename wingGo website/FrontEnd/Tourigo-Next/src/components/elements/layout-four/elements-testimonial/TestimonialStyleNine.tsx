"use client";
import React from "react";
import client1 from "../../../../../public/assets/images/client/01.png";
import client2 from "../../../../../public/assets/images/client/02.png";
import client3 from "../../../../../public/assets/images/client/03.png";
import client4 from "../../../../../public/assets/images/client/04.png";
import client5 from "../../../../../public/assets/images/client/05.png";
import client6 from "../../../../../public/assets/images/client/06.png";
import quoteImg from "../../../../../public/assets/images/icons/quote.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import Image from "next/image";
import { imageLoader } from "@/hooks/image-loader";
import { testimonialData } from "@/data/testimonial-data";
const TestimonialStyleNine = () => {
  return (
    <>
      <section className="feedback__area section-space fix">
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
                      Testimonial Style 09
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
              <div className="feedback__all-user d-none d-lg-block">
                <span className="user-1">
                  <Image
                    src={client1}
                    alt=""
                    loader={imageLoader}
                    style={{ width: "100%", height: "auto" }}
                  />
                </span>
                <span className="user-2">
                  <Image
                    src={client2}
                    alt=""
                    loader={imageLoader}
                    style={{ width: "100%", height: "auto" }}
                  />
                </span>
                <span className="user-3">
                  <Image
                    src={client3}
                    alt=""
                    loader={imageLoader}
                    style={{ width: "100%", height: "auto" }}
                  />
                </span>
                <span className="user-4">
                  <Image
                    src={client4}
                    alt=""
                    loader={imageLoader}
                    style={{ width: "100%", height: "auto" }}
                  />
                </span>
                <span className="user-5">
                  <Image
                    src={client5}
                    alt=""
                    loader={imageLoader}
                    style={{ width: "100%", height: "auto" }}
                  />
                </span>
                <span className="user-6">
                  <Image
                    src={client6}
                    alt=""
                    loader={imageLoader}
                    style={{ width: "100%", height: "auto" }}
                  />
                </span>
              </div>

              <div className="feedback__navigation d-none d-sm-block">
                <button className="feedback__button-prev">
                  <i className="fa-regular fa-angle-left"></i>
                </button>
                <button className="feedback__button-next">
                  <i className="fa-regular fa-angle-right"></i>
                </button>
              </div>
              <div className="row justify-content-center">
                <div className="col-xxl-7 col-xl-10 col-lg-10">
                  <div className="swiper feedback__active">
                    <div className="swiper-wrapper">
                      <Swiper
                        modules={[Autoplay, Navigation]}
                        spaceBetween={30}
                        slidesPerView={1}
                        loop={true}
                        navigation={{
                          nextEl: ".feedback__button-next",
                          prevEl: ".feedback__button-prev",
                        }}
                        autoplay={{
                          delay: 2500,
                          disableOnInteraction: true,
                        }}
                      >
                        {testimonialData &&
                          testimonialData.slice(10, 15).map((item) => (
                            <SwiperSlide key={item.id}>
                              <div className="swiper-slide">
                                <div className="feedback__item text-center">
                                  <div className="feedback__qote-inner p-relative mb-20">
                                    <div className="feedback__qote">
                                      <Image src={quoteImg} alt="" />
                                    </div>
                                    <div className="feedback__rating">
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
                                  </div>
                                  <div className="feedback__content">
                                    <p>{item?.description}</p>
                                  </div>
                                  <div className="feedback__avatar">
                                    <div className="avatar__thumb">
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

                    <div className="pagination__wrapper">
                      <div className="bd-swiper-dot is-white text-center"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TestimonialStyleNine;
