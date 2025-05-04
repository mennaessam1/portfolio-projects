"use client";
import Image from "next/image";
import React from "react";
import destImgOne from "../../../public/assets/images/destination/destination-img-1.png";
import destImgTwo from "../../../public/assets/images/destination/destination-img-2.png";
import destImgThree from "../../../public/assets/images/destination/destination-img-3.png";
import { imageLoader } from "@/hooks/image-loader";
import Link from "next/link";
import TourDetailsRating from "../shearedComponents/TourDetailsRating";
import PostCommentForm from "../shearedComponents/PostCommentForm";
import { idType } from "@/interFace/interFace";
import { tripData } from "@/data/homeOne/trip-data";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
const DestinationDetails = ({ id }: idType) => {
  const filterData = tripData?.find((item) => item.id == id);

  const destinationSliderData = [
    {
      id: 1,
      img: destImgOne,
    },
    {
      id: 2,
      img: destImgTwo,
    },
    {
      id: 3,
      img: destImgThree,
    },
    {
      id: 3,
      img: destImgOne,
    },
  ];

  return (
    <>
      <div className="destinations-details-wrapper">
        <div className="destinations-details mb-25">
          <div className="destinations-details-slider details-slide p-relative mb-30">
            <div className="swiper details-slide-activation">
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={24}
                slidesPerView={1}
                navigation={{
                  nextEl: ".tourigo-navigation-next",
                  prevEl: ".tourigo-navigation-prev",
                }}
                pagination={{
                  el: ".bd-pagination",
                  clickable: true,
                }}
              >
                {destinationSliderData &&
                  destinationSliderData.map((item, index) => (
                    <SwiperSlide key={index} className="custom-swiper-slide">
                      <div className="swiper-slide">
                        <Image
                          src={item?.img}
                          loader={imageLoader}
                          style={{ width: "100%", height: "auto" }}
                          alt="image"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                <div className="slider-pagination-wrapper">
                  <div className="slider-pagination bd-pagination mt-50 justify-content-center"></div>
                </div>
              </Swiper>
            </div>
            <div className="details-slide-navigation btn-navigation">
              <button className="tourigo-navigation-prev">
                <i className="fa-regular fa-angle-left"></i>
              </button>
              <button className="tourigo-navigation-next">
                <i className="fa-regular fa-angle-right"></i>
              </button>
            </div>
          </div>
          <div className="destinations-details-content">
            <h3 className="destinations-details-title mb-15">
              {filterData?.title}
            </h3>
            <p className="mb-15">{filterData?.description}</p>
            <div className="tour-details-list-box mb-35">
              <div className="tour-details-list-include">
                <ul>
                  <li>
                    <span className="list-icon has-big secondary">
                      <i className="icon-flag"></i>
                    </span>
                    Country: {filterData?.tripLocation}
                  </li>
                  <li>
                    <span className="list-icon has-big secondary">
                      <i className="icon-globe"></i>
                    </span>
                    Language Spoken: Spanish
                  </li>
                  <li>
                    <span className="list-icon has-big secondary">
                      <i className="fa-light fa-location-dot"></i>
                    </span>
                    Area (Km): 890Km
                  </li>
                </ul>
              </div>
              <div className="tour-details-list-exclude">
                <ul>
                  <li>
                    <span className="list-icon has-big secondary">
                      <i className="icon-doc"></i>
                    </span>
                    Visa Requirement: Yes
                  </li>
                  <li>
                    <span className="list-icon has-big secondary">
                      <i className="icon-pin"></i>
                    </span>
                    Per Person: $2340
                  </li>
                  <li>
                    <span className="list-icon has-big secondary">
                      <i className="fa-sharp fa-regular fa-buildings"></i>
                    </span>
                    Destination: 04 Tour
                  </li>
                </ul>
              </div>
            </div>
            <p className="mb-35">
              Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa
              mi. Aliquam hendrerit urna. Pellentesque sit amet sapien
              fringilla, mattis ligula consectetur, ultrices Maecenas
            </p>
            <div className="post-details-blockquote mb-30">
              <blockquote>
                <h4 className="blockquote-title">
                  The purpose of the patent system is to foster and encourage
                  new inventions of usefulness.
                </h4>
                <p className="d-flex justify-content-end">
                  <span>Thomas Jefferson</span>
                </p>
              </blockquote>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa
              mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien
              fringilla, mattis ligula consectetur, ultrices mauris. Maecenas
              vitae mattis tellus. Nullam quis imperdiet aug Vestibulum auctor
              ornare leo, non suscipit magna interdum eu. Curabitur pellentesque
              nibh nibh, at maximus ante fermentum sit amet. Pellentesque
              commodo lacus at sodales sodales.
            </p>
            <div className="destinations-details-gallery">
              <div className="row gy-24">
                <div className="col-md-6">
                  <div className="destinations-details-thumb image-hover-effect-two position-relative">
                    <Image
                      src={destImgTwo}
                      loader={imageLoader}
                      style={{ width: "100%", height: "100%" }}
                      alt="image"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="destinations-details-thumb image-hover-effect-two position-relative">
                    <Image
                      src={destImgThree}
                      loader={imageLoader}
                      style={{ width: "100%", height: "100%" }}
                      alt="image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="section-divider mt-30 mb-25"></div>
          <div className="destinations-details-tag d-flex flex-wrap gap-10 align-items-center justify-content-between">
            <div className="tagcloud">
              <Link href="/blog-details">Travel</Link>
              <Link href="/blog-details">TravelTips</Link>
              <Link href="/blog-details">Foodie</Link>
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
        {/*tour details rating wrapper area*/}
        <TourDetailsRating />
        {/*tour details comment area*/}
        <PostCommentForm />
      </div>
    </>
  );
};

export default DestinationDetails;
