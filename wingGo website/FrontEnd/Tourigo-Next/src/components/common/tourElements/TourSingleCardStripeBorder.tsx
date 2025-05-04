import { IDayTourDataType } from "@/interFace/interFace";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface ItourPropsType {
  item: IDayTourDataType;
}
const TourSingleCardStripeBorder = ({ item }: ItourPropsType) => {
  return (
    <>
      <div
        className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 wow bdFadeInUp"
        data-wow-delay=".3s"
      >
        <div className="tour-wrapper style-six">
          <div className="tour-thumb image-overly mb-25">
            <Link href="/tour-details-right">
              <Image src={item.img} alt="image" />
            </Link>
          </div>
          <div className="tour-content-wrapper">
            <h4 className="tour-title medium underline mb-5 fw-5">
              <Link href="/tour-details-right">{item.tourTitle}</Link>
            </h4>
            <div className="tour-meta mb-10">
              <span>
                <i className="icon-location-fill"></i> {item.tourLocation}
              </span>
              <span>
                <i className="fa-regular fa-clock"></i> {item.tourTime} Hours
              </span>
            </div>
            <p>{item.description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TourSingleCardStripeBorder;
