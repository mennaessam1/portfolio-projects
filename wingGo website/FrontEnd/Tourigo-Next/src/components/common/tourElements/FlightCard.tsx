"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { imageLoader } from "@/hooks/image-loader";

interface FlightCardProps {
  flight: {
    heroImage: string; // Flight image URL
    price: { total: string }; // Flight price
    id: string; // Flight ID
    itineraries: { segments: any[] }[]; // Flight itineraries (for segments)
  };
  className: string; // Additional CSS class
  flightWrapperClass: string; // Wrapper class for styling
  isparentClass: boolean; // Parent class toggle
  onBook: (flight: any) => void; // Callback for booking action
}

const formatSegments = (segments: any[]) => {
  if (!segments.length) return "No segments available";

  return segments
    .map((segment) => `${segment.departure.iataCode} → ${segment.arrival.iataCode}`)
    .join(", ");
};

const FlightCard: React.FC<FlightCardProps> = ({
  flight,
  className,
  flightWrapperClass,
  isparentClass,
  onBook,
}) => {
  const transitStops = flight.itineraries[0].segments.length - 1;

  return (
    <>
      {isparentClass ? (
        <div className={className}>
          <div className={flightWrapperClass}>
            <div className="p-relative">
              {/* Flight Image */}
              <div className="tour-thumb image-overly">
                <Link href={`#`}>
                  <Image
                    src={flight.heroImage || "/assets/images/tour/flightPlaceHolderNew.jpg"} // Fallback image
                    loader={imageLoader}
                    width={250}
                    height={250}
                    style={{ objectFit: "cover", width: "100%", height: "auto" }}
                    alt="Flight Image"
                  />
                </Link>
              </div>

              {/* Flight Info */}
              <div className="tour-meta d-flex align-items-center justify-content-between">
                {/* Segments as Location */}
                <div className="tour-location">
                  <span>
                    <Link href={`/flight-details/${flight.id}`}>
                      <i className="fa-regular fa-location-dot"></i>{" "}
                      {formatSegments(flight.itineraries[0].segments)}
                    </Link>
                  </span>
                </div>
              </div>
            </div>

            {/* Flight Content */}
            <div className="tour-content">
              {/* Transit Info */}
              <div className="trip-number">
                <span>
                  <Link href={`/flight-details/${flight.id}`}>
                    {transitStops === 0
                      ? "Direct Flight"
                      : `${transitStops} Transit Stops`}
                  </Link>
                </span>
              </div>

              {/* Flight Price */}
              <span className="tour-price b3">${flight.price.total}</span>

              {/* Book Now Button */}
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="tour-title fw-5 underline custom_mb-5"> </h5>
                <div className="bookmark-container">
                  <button
                    className="bd-text-btn style-two"
                    type="button"
                    onClick={() => onBook(flight)}
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
        <div className={flightWrapperClass}>
          {/* Add any non-parent layout logic here if needed */}
        </div>
      )}
    </>
  );
};

export default FlightCard;
