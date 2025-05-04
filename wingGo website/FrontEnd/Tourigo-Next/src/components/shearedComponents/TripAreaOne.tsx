"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { imageLoader } from "@/hooks/image-loader";
import { tripData } from "@/data/homeOne/trip-data";

const TripAreaOne = () => {
  const columnOneData = tripData.slice(0, 1);
  const columnTwoData = tripData.slice(1, 3);
  const columnThreeData = tripData.slice(3, 4);
  const columnFourData = tripData.slice(4, 6);
  return (
    <>
      <div className="row gy-24">
        <div className="col-xl-4 col-lg-4 col-md-4">
          {columnOneData &&
            columnOneData.map((item) => (
              <div
                key={item.id}
                className="trip-wrapper trip-style-one p-relative"
              >
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
            ))}
        </div>
        <div className="col-xl-3 col-lg-3 col-md-3">
          {columnTwoData &&
            columnTwoData.map((item) => (
              <div
                key={item.id}
                className="trip-wrapper trip-style-one p-relative"
              >
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
            ))}
        </div>
        <div className="col-xl-5 col-lg-5 col-md-5">
          {columnThreeData &&
            columnThreeData.map((item) => (
              <div
                key={item.id}
                className="trip-wrapper trip-style-one p-relative"
              >
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
            ))}
          <div className="row gy-24">
            {columnFourData &&
              columnFourData.map((item) => (
                <div key={item.id} className="col-md-6">
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
        </div>
      </div>
    </>
  );
};

export default TripAreaOne;
