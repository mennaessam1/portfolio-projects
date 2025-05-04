import GetRatting from "@/hooks/GetRatting";
import { imageLoader } from "@/hooks/image-loader";
import { ITourDataType } from "@/interFace/interFace";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface ItourPropsType {
  item: ITourDataType;
  className: string;
  tourWrapperClass: string;
  isparentClass: boolean;
}
// tour-wrapper style-three
const TourSingleCardThree = ({
  item,
  className,
  tourWrapperClass,
  isparentClass,
}: ItourPropsType) => {
  const ratingString = item?.tourRating;
  const rating = ratingString ? parseFloat(ratingString) : 1;

  return (
    <>
      {isparentClass === true ? (
        <>
          <div className={className}>
            <div className={tourWrapperClass}>
              <div className="tour-thumb-wrapper p-relative">
                <div className="tour-thumb image-overly">
                  <Link href={`/tour-details/${item?.id}`}>
                    <Image
                      src={item.img}
                      loader={imageLoader}
                      style={{ width: "100%", height: "auto" }}
                      alt="image"
                    />
                  </Link>
                </div>
                <div className="tour-meta d-flex align-items-center justify-content-between">
                  <button className="tour-favorite tour-like">
                    <i className="icon-heart"></i>
                  </button>
                </div>
              </div>
              <div className="tour-content">
                <div className="tour-meta mb-10 d-flex align-items-center justify-content-between">
                  <div className="tour-location underline">
                    <i className="fa-regular fa-location-dot"></i>{" "}
                    <Link href={`/tour-details/${item?.id}`}>
                      {item.tourLocation}
                    </Link>
                  </div>
                  <h6 className="tour-price b3">
                    ${item.tourPrice}/{" "}
                    <span className="tour-price-tag">{item.days}d</span>
                  </h6>
                </div>
                <h5 className="tour-title fw-5 underline mb-5">
                  <Link href={`/tour-details/${item?.id}`}>
                    {item.tourTitle}
                  </Link>
                </h5>
                <div className="tour-divider"></div>
                <div className="tour-rating d-flex align-items-center justify-content-between">
                  <div className="tour-rating-wrap d-flex align-items-center gap-10">
                    <div className="tour-rating-icon fs-14 d-flex rating-color">
                      <GetRatting averageRating={rating} />
                    </div>
                    <span>{item.tourRating}</span>
                  </div>
                  <div className="tour-rating-text">
                    <span>
                      <Link href="#">{item.tourRatingCount} Review</Link>
                    </span>
                  </div>
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
                <Link href={`/tour-details/${item?.id}`}>
                  <Image
                    src={item.img}
                    loader={imageLoader}
                    style={{ width: "100%", height: "auto" }}
                    alt="image"
                  />
                </Link>
              </div>
              <div className="tour-meta d-flex align-items-center justify-content-between">
                <button className="tour-favorite tour-like">
                  <i className="icon-heart"></i>
                </button>
              </div>
            </div>
            <div className="tour-content">
              <div className="tour-meta mb-10 d-flex align-items-center justify-content-between">
                <div className="tour-location underline">
                  <i className="fa-regular fa-location-dot"></i>{" "}
                  <Link href={`/tour-details/${item?.id}`}>
                    {item.tourLocation}
                  </Link>
                </div>
                <h6 className="tour-price b3">
                  ${item.tourPrice}/{" "}
                  <span className="tour-price-tag">{item.days}d</span>
                </h6>
              </div>
              <h5 className="tour-title fw-5 underline mb-5">
                <Link href={`/tour-details/${item?.id}`}>{item.tourTitle}</Link>
              </h5>
              <div className="tour-divider"></div>
              <div className="tour-rating d-flex align-items-center justify-content-between">
                <div className="tour-rating-wrap d-flex align-items-center gap-10">
                  <div className="tour-rating-icon fs-14 d-flex rating-color">
                    <GetRatting averageRating={rating} />
                  </div>
                  <span>{item.tourRating}</span>
                </div>
                <div className="tour-rating-text">
                  <span>
                    <Link href="#">{item.tourRatingCount} Review</Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TourSingleCardThree;
