"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { tripData } from "@/data/homeOne/trip-data";
import { imageLoader } from "@/hooks/image-loader";

const TripAreaTwo = () => {
  return (
    <>
      <div className="row gy-24">
        {tripData &&
          tripData.slice(12, 16).map((item) => (
            <div key={item.id} className="col-xl-6 col-lg-6 col-md-6">
              <div className="trip-wrapper trip-style-one p-relative">
                <div className="trip-thumb image-overly">
                  <Link href={`/destinations-details/${item?.id}`}>
                    <Image
                      src={item.img}
                      loader={imageLoader}
                      style={{ width: "100%", height: "auto" }}
                      alt="image"
                    />
                  </Link>
                </div>
                <div className="trip-tag">
                  <div className="trip-number">
                    <span>
                      <Link href={`/destinations-details/${item?.id}`}>
                        {item.tripCount} Tour
                      </Link>
                    </span>
                  </div>
                  <div className="trip-location">
                    <span>
                      <Link href={`/destinations-details/${item?.id}`}>
                        {item.tripLocation}
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        {tripData &&
          tripData.slice(16, 17).map((item) => (
            <div key={item.id} className="col-xl-12 col-lg-12 col-md-12">
              <div className="trip-wrapper trip-style-one p-relative">
                <div className="trip-thumb image-overly">
                  <Link href={`/destinations-details/${item?.id}`}>
                    <Image
                      src={item.img}
                      loader={imageLoader}
                      style={{ width: "100%", height: "auto" }}
                      alt="image"
                    />
                  </Link>
                </div>
                <div className="trip-tag">
                  <div className="trip-number">
                    <span>
                      <Link href={`/destinations-details/${item?.id}`}>
                        {item.tripCount} Tour
                      </Link>
                    </span>
                  </div>
                  <div className="trip-location">
                    <span>
                      <Link href={`/destinations-details/${item?.id}`}>
                        {item.tripLocation}
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        {tripData &&
          tripData.slice(17, 19).map((item) => (
            <div key={item.id} className="col-xl-6 col-lg-6 col-md-6">
              <div className="trip-wrapper trip-style-one p-relative">
                <div className="trip-thumb image-overly">
                  <Link href={`/destinations-details/${item?.id}`}>
                    <Image
                      src={item.img}
                      loader={imageLoader}
                      style={{ width: "100%", height: "auto" }}
                      alt="image"
                    />
                  </Link>
                </div>
                <div className="trip-tag">
                  <div className="trip-number">
                    <span>
                      <Link href={`/destinations-details/${item?.id}`}>
                        {item.tripCount} Tour
                      </Link>
                    </span>
                  </div>
                  <div className="trip-location">
                    <span>
                      <Link href={`/destinations-details/${item?.id}`}>
                        {item.tripLocation}
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default TripAreaTwo;
