"use client";
import { testimonialData } from "@/data/testimonial-data";
import Image from "next/image";
import React from "react";
import testimonialShapeFour from "../../../public/assets/images/shapes/testimonial-shape-four.png";
import testimonialImageTwo from "../../../public/assets/images/testimonial/testimonial-img-2.png";
import { imageLoader } from "@/hooks/image-loader";
import GetRatting from "@/hooks/GetRatting";

const TestimonialAreaFour = () => {
  return (
    <>
      <section className="bd-testimonial-area section-space-bottom">
        <div className="container">
          <div className="row gy-24 align-items-center align-content-center justify-content-between">
            <div className="col-xxl-6 col-xl-6 col-lg-12">
              <div className="section-title-wrapper section-title-space">
                <span className="section-subtitle mb-10">Testimonials</span>
                <h2 className="section-title">Customers Feedback</h2>
              </div>
              <div className="thumb-left position-relative">
                <div className="testimonial-thumb-shape">
                  <Image
                    src={testimonialShapeFour}
                    loader={imageLoader}
                    style={{ width: "100%", height: "auto" }}
                    alt="image"
                  />
                </div>
                <div className="testimonial-thumb">
                  <Image
                    src={testimonialImageTwo}
                    loader={imageLoader}
                    style={{ width: "100%", height: "auto" }}
                    alt="image"
                  />
                </div>
              </div>
            </div>
            <div className="col-xxl-6 col-xl-6 col-xl-6 col-lg-12">
              {testimonialData &&
                testimonialData.slice(12, 15).map((item) => (
                  <div
                    key={item.id}
                    className="testimonial-wrapper testimonial-style-four wow bdFadeInUp"
                    data-wow-delay=".3s"
                  >
                    <div className="testimonial-content p-relative">
                      <p>{item.description}</p>
                      <div className="testimonial-avatar">
                        <div className="testimonial-avatar-wrap">
                          <div className="avatar-thumb">
                            <Image
                              src={item.avatarImg}
                              loader={imageLoader}
                              style={{ width: "100%", height: "auto" }}
                              alt=""
                            />
                          </div>
                          <div className="avatar-meta">
                            <h6 className="avatar-meta-title">
                              {item.avatarTitle}
                            </h6>
                            <span>{item.info}</span>
                          </div>
                        </div>
                        <div className="avatar-rating">
                          <div className="fs-14 d-flex rating-color">
                            {item?.rating && (
                              <GetRatting averageRating={item?.rating} />
                            )}
                          </div>
                        </div>
                      </div>
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

export default TestimonialAreaFour;
