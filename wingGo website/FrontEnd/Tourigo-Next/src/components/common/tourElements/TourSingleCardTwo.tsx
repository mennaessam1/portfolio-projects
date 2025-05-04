"use client";
import GetRatting from "@/hooks/GetRatting";
import { imageLoader } from "@/hooks/image-loader";
import useGlobalContext from "@/hooks/use-context";
import { ITourDataType } from "@/interFace/interFace";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ItourPropsType {
  tour: ITourDataType;
  className: string;
  tourWrapperClass: string;
  isparentClass: boolean;
}

// "col-xxl-4 col-xl-4 col-lg-4 col-md-6" {className} default
// tour-wrapper style-four {tourWrapperClass} default

const TourSingleCardTwo = ({
  tour,
  className,
  tourWrapperClass,
  isparentClass,
}: ItourPropsType) => {
  const { setModalData } = useGlobalContext();
  const ratingString = tour?.tourRating;
  const rating = ratingString ? parseFloat(ratingString) : 1;
  return (
    <>
      {isparentClass === true ? (
        <>
          <div className={className}>
            <div className={tourWrapperClass}>
              <div className="tour-thumb-wrapper p-relative">
                <div className="tour-thumb image-overly">
                  <Link href={`/tour-details/${tour?.id}`}>
                    <Image
                      src={tour.img}
                      loader={imageLoader}
                      style={{ width: "100%", height: "auto" }}
                      alt="image"
                    />
                  </Link>
                </div>

                <div className="tour-badge">
                  {tour.status?.toLowerCase() === "new" ? (
                    <span className="bd-badge success fw-5">{tour.status}</span>
                  ) : tour.status?.toLowerCase() === "featured" ? (
                    <span className="bd-badge warning fw-5">{tour.status}</span>
                  ) : (
                    ""
                  )}

                  {tour.discount ? (
                    <span className="bd-badge danger fw-5">
                      {tour.discount}% off
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="tour-content">
                <div className="tour-meta mb-10">
                  <div className="tour-location">
                    <i className="fa-regular fa-location-dot"></i>{" "}
                    <Link href={`/tour-details/${tour?.id}`}>
                      {tour?.tourLocation}
                    </Link>
                  </div>
                </div>
                <h5 className="tour-title fw-5 underline mb-10">
                  <Link href={`/tour-details/${tour?.id}`}>
                    {tour?.tourTitle}
                  </Link>
                </h5>

                <div className="tour-price-wrapper">
                  <span className="tour-price-text b3">From </span>
                  <h6 className="tour-price-title current">
                    ${tour.currentPrice}
                  </h6>
                  {tour.oldPrice ? (
                    <h6 className="tour-price-title old">${tour.oldPrice}</h6>
                  ) : (
                    ""
                  )}
                </div>

                <div className="tour-rating d-flex align-items-center justify-content-between">
                  <div className="tour-rating-wrap d-flex align-items-center gap-10">
                    <div className="tour-rating-icon fs-14 d-flex rating-color">
                      {<GetRatting averageRating={rating} />}
                    </div>
                    <span>
                      {tour?.tourRating} ({tour?.tourRatingCount})
                    </span>
                  </div>
                  <div className="tour-duration">
                    <span>
                      <i className="fa-light fa-clock"></i>
                    </span>
                    {tour?.days} day
                  </div>
                </div>
                <div className="tour-full-border"></div>
                <div className="btn-wrap d-flex align-items-center justify-content-between">
                  <div className="tour-btn">
                    <button
                      className="bd-text-btn style-two"
                      onClick={() => setModalData(tour)}
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#popUpBookingForm"
                    >
                      Book Now
                      <span className="icon__box">
                        <i className="fa-regular fa-arrow-right-long icon__first"></i>
                        <i className="fa-regular fa-arrow-right-long icon__second"></i>
                      </span>
                    </button>
                  </div>
                  <button className="tour-like has-border">
                    <i className="icon-heart"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={tourWrapperClass}>
            <div className="tour-thumb-wrapper p-relative">
              <div className="tour-thumb image-overly">
                <Link href={`/tour-details/${tour?.id}`}>
                  <Image
                    src={tour.img}
                    loader={imageLoader}
                    style={{ width: "100%", height: "auto" }}
                    alt="image"
                  />
                </Link>
              </div>

              <div className="tour-badge">
                {tour.status?.toLowerCase() === "new" ? (
                  <span className="bd-badge success fw-5">{tour.status}</span>
                ) : tour.status?.toLowerCase() === "featured" ? (
                  <span className="bd-badge warning fw-5">{tour.status}</span>
                ) : (
                  ""
                )}

                {tour.discount ? (
                  <span className="bd-badge danger fw-5">
                    {tour.discount}% off
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="tour-content">
              <div className="tour-meta mb-10">
                <div className="tour-location">
                  <i className="fa-regular fa-location-dot"></i>{" "}
                  <Link href={`/tour-details/${tour?.id}`}>
                    {tour?.tourLocation}
                  </Link>
                </div>
              </div>
              <h5 className="tour-title fw-5 underline mb-10">
                <Link href={`/tour-details/${tour?.id}`}>
                  {tour?.tourTitle}
                </Link>
              </h5>

              <div className="tour-price-wrapper">
                <span className="tour-price-text b3">From </span>
                <h6 className="tour-price-title current">
                  ${tour.currentPrice}
                </h6>
                {tour.oldPrice ? (
                  <h6 className="tour-price-title old">${tour.oldPrice}</h6>
                ) : (
                  ""
                )}
              </div>

              <div className="tour-rating d-flex align-items-center justify-content-between">
                <div className="tour-rating-wrap d-flex align-items-center gap-10">
                  <div className="tour-rating-icon fs-14 d-flex rating-color">
                    {<GetRatting averageRating={rating} />}
                  </div>
                  <span>
                    {tour?.tourRating} ({tour?.tourRatingCount})
                  </span>
                </div>
                <div className="tour-duration">
                  <span>
                    <i className="fa-light fa-clock"></i>
                  </span>
                  {tour?.days} day
                </div>
              </div>
              <div className="tour-full-border"></div>
              <div className="btn-wrap d-flex align-items-center justify-content-between">
                <div className="tour-btn">
                  <button
                    className="bd-text-btn style-two"
                    onClick={() => setModalData(tour)}
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#popUpBookingForm"
                  >
                    Book Now
                    <span className="icon__box">
                      <i className="fa-regular fa-arrow-right-long icon__first"></i>
                      <i className="fa-regular fa-arrow-right-long icon__second"></i>
                    </span>
                  </button>
                </div>
                <button className="tour-like has-border">
                  <i className="icon-heart"></i>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TourSingleCardTwo;
