"use client";
import { tourData } from "@/data/tour-data";
import { imageLoader } from "@/hooks/image-loader";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import ModalVideo from "react-modal-video";
import { PhotoProvider, PhotoView } from "react-photo-view";

const TourSingleCardPhotoView = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openVideoModal = () => setIsOpen(!isOpen);
  return (
    <>
      <PhotoProvider
        speed={() => 800}
        easing={(type) =>
          type === 2
            ? "cubic-bezier(0.36, 0, 0.66, -0.56)"
            : "cubic-bezier(0.34, 1.56, 0.64, 1)"
        }
      >
        {tourData.slice(24, 28).map((item) => (
          <div
            key={item.id}
            className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 wow bdFadeInUp"
            data-wow-delay=".3s"
          >
            <div className="tour-wrapper style-five">
              <div className="tour-thumb-wrapper p-relative">
                <div className="tour-thumb image-overly">
                  <Link href="/tour-details-right">
                    <Image
                      src={item.img}
                      loader={imageLoader}
                      style={{ width: "100%", height: "100%" }}
                      alt="image"
                    />
                  </Link>
                </div>
                <div className="tour-top-meta">
                  <div className="tour-badge">
                    {item.status ? (
                      <div className="tour-badge-single">
                        <span className="bd-badge warning fw-5">
                          {item.status}
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                    {item.discount ? (
                      <div className="tour-badge-single mt-5">
                        <span className="bd-badge theme-bg fw-5 white-text">
                          {item.discount}% Off
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <button className="tour-like has-bg">
                    <i className="icon-heart"></i>
                  </button>
                </div>
              </div>
              <div className="tour-content">
                <div className="tour-meta-center mb-15 d-flex align-items-center justify-content-between">
                  <div className="tour-rating-wrap d-flex align-items-center gap-10">
                    <div className="tour-rating-icon fs-14 d-flex rating-color">
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                    </div>
                  </div>
                  <div className="tour-camera-btn-wrapper">
                    <PhotoView src={item.img.src}>
                      <button className="tour-camera-btn tour-image-popup">
                        <i className="fa-light fa-camera"></i>
                        <span>{item.tourImage?.length}</span>
                      </button>
                    </PhotoView>
                    <button
                      onClick={() => {
                        openVideoModal();
                      }}
                      className="tour-camera-btn popup-video"
                    >
                      <i className="fa-regular fa-video"></i>
                    </button>
                  </div>
                </div>
                <h5 className="tour-title fw-5 underline mb-10">
                  <Link href="/tour-details-right">{item.tourTitle}</Link>
                </h5>
                <div className="tour-meta mb-5">
                  <div className="tour-location d-flex gap-10 align-items-center">
                    <i className="fa-regular fa-location-dot"></i>{" "}
                    <Link href="/tour-details-right">{item.tourLocation}</Link>
                  </div>
                </div>
                <div className="tour-price-wrapper">
                  <i className="fa-regular fa-location-dot"></i>
                  <span className="tour-price-text b3">From </span>
                  <h6 className="tour-price-title current">
                    ${item.fromPrice}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        ))}
      </PhotoProvider>

      <ModalVideo
        channel="youtube"
        isOpen={isOpen}
        videoId="eUpwDAnkgSM"
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};

export default TourSingleCardPhotoView;
