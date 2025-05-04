"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { imageLoader } from "@/hooks/image-loader";

interface HotelCardProps {
  hotel: {
    heroImage: string; // Hotel image URL
    name: string; // Hotel name
    price: number; // Hotel price
    rawPrice: number; // Hotel raw price
    id: string; // Hotel ID
    location: string; // Hotel location
    distance: string; // Hotel distance
  };
  className: string; // Additional CSS class
  hotelWrapperClass: string; // Wrapper class for styling
  isparentClass: boolean; // Parent class toggle
  onBook: (hotel: any) => void; // Callback for booking action
    adults: number; // Number of adults
}

const HotelCard: React.FC<HotelCardProps> = ({
  hotel,
  className,
  hotelWrapperClass,
  isparentClass,
  onBook,
    adults,
}) => {
  return (
    <>
      {isparentClass ? (
        <div className={className}>
          <div className={hotelWrapperClass}>
            <div className="p-relative">
              {/* Hotel Image */}
              <div className="tour-thumb image-overly">
                <Link href={`#`}>
                  <Image
                    src={hotel.heroImage || "/assets/images/tour/tour-img-5.png"} // Fallback image
                    loader={imageLoader}
                    width={250}
                    height={250}
                    style={{ objectFit: "cover", width: "auto", height: "auto" }}
                    alt="Hotel Image"
                  />
                </Link>
              </div>

              {/* Hotel Location */}
              <div className="tour-meta d-flex align-items-center justify-content-between">
                <div className="tour-location">
                  <span>
                    <Link href={`/hotel-details/${hotel.id}`}>
                      <i className="fa-regular fa-location-dot"></i>{" "}
                      {hotel.distance || "Location not available"}
                    </Link>
                  </span>
                </div>
              </div>
            </div>

            {/* Hotel Content */}
            <div className="tour-content">
              {/* Hotel Name */}
              <h5 className="tour-title fw-5 underline custom_mb-5">
                <Link href={`/hotel-details/${hotel.id}`}>{hotel.name}</Link>
              </h5>

              {/* Hotel Price */}
              <span className="tour-price b3">${hotel.rawPrice * adults}</span>

              {/* Book Now Button */}
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="tour-title fw-5 underline custom_mb-5"> </h5>
                <div className="bookmark-container">
                  <button
                    className="bd-text-btn style-two"
                    type="button"
                    onClick={() => onBook(hotel)}
                  >
                    Book Now
                    <span className="icon__box">
                      <i className="fa-regular fa-arrow-right-long icon__first"></i>
                      <i className="fa-regular fa-arrow-right-long icon__second"></i>
                    </span>
                  </button>
                </div>
              </div>

              <div className="tour-divider"></div>
            </div>
          </div>
        </div>
      ) : (
        // Non-parent layout
        <div className={hotelWrapperClass}>
          {/* Add any non-parent layout logic here if needed */}
        </div>
      )}
    </>
  );
};

export default HotelCard;
