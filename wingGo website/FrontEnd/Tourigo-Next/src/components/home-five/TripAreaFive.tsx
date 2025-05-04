"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { imageLoader } from "@/hooks/image-loader";
import { tripData } from "@/data/homeOne/trip-data";

const TripAreaFive = () => {
  return (
    <>
      <section className="bd-trip section-space fix">
        <div className="container">
          <div className="row gy-24 text-center justify-content-center section-title-space">
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-10">
              <div className="section-title-wrapper">
                <span className="section-subtitle mb-10">Our Trip</span>
                <h2 className="section-title">
                  Experience the Extraordinary Everywhere you Go
                </h2>
              </div>
            </div>
          </div>
          <div className="row gy-24">
            <div className="col-xl-3 col-lg-4 col-md-12">
              <div className="trip-row-col">
                {tripData &&
                  tripData.slice(6, 8).map((item) => (
                    <div
                      key={item.id}
                      className="trip-wrapper trip-style-one border-tag p-relative"
                    >
                      <div className="trip-thumb image-overly">
                        <Link href={`/destinations-details/${item?.id}`}>
                          <Image
                            src={item.img}
                            loader={imageLoader}
                            style={{ width: "100%", height: "100%" }}
                            alt="image"
                          />
                        </Link>
                      </div>
                      <div className="trip-tag">
                        <Link
                          className="trip-tag-border"
                          href="destinations-details-right"
                        >
                          {item.tripCount} Tour
                        </Link>
                      </div>
                      <div className="trip-content">
                        <h5 className="trip-title white-text underline-two">
                          <Link href={`/destinations-details/${item?.id}`}>
                            {item.tripLocation}
                          </Link>
                        </h5>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="col-xl-6 col-lg-8 col-md-12">
              {tripData &&
                tripData.slice(8, 9).map((item) => (
                  <div
                    key={item.id}
                    className="trip-wrapper trip-style-one border-tag p-relative"
                  >
                    <div className="trip-thumb image-overly">
                      <Link href={`/destinations-details/${item?.id}`}>
                        <Image
                          src={item.img}
                          loader={imageLoader}
                          style={{ width: "100%", height: "100%" }}
                          alt="image"
                        />
                      </Link>
                    </div>
                    <div className="trip-tag">
                      <Link
                        className="trip-tag-border"
                        href="destinations-details-right"
                      >
                        {item.tripCount} Tour
                      </Link>
                    </div>
                    <div className="trip-content">
                      <h5 className="trip-title white-text underline-two">
                        <Link href={`/destinations-details/${item?.id}`}>
                          {item.tripLocation}
                        </Link>
                      </h5>
                    </div>
                  </div>
                ))}
              <div className="row gy-24">
                {tripData &&
                  tripData.slice(9, 11).map((item) => (
                    <div key={item.id} className="col-md-6">
                      <div className="trip-wrapper trip-style-one border-tag p-relative">
                        <div className="trip-thumb image-overly">
                          <Link href={`/destinations-details/${item?.id}`}>
                            <Image
                              src={item.img}
                              loader={imageLoader}
                              style={{ width: "100%", height: "100%" }}
                              alt="image"
                            />
                          </Link>
                        </div>
                        <div className="trip-tag">
                          <Link
                            className="trip-tag-border"
                            href="destinations-details-right"
                          >
                            {item.tripCount} Tour
                          </Link>
                        </div>
                        <div className="trip-content">
                          <h5 className="trip-title white-text underline-two">
                            <Link href={`/destinations-details/${item?.id}`}>
                              {item.tripLocation}
                            </Link>
                          </h5>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="col-xl-3 col-lg-12 col-md-12">
              <div className="trip-flex">
                {tripData &&
                  tripData.slice(11, 12).map((item) => (
                    <div
                      key={item.id}
                      className="trip-wrapper trip-style-one border-tag p-relative"
                    >
                      <div className="trip-thumb image-overly">
                        <Link href={`/destinations-details/${item?.id}`}>
                          <Image
                            src={item.img}
                            loader={imageLoader}
                            style={{ width: "100%", height: "100%" }}
                            alt="image"
                          />
                        </Link>
                      </div>
                      <div className="trip-tag">
                        <Link
                          className="trip-tag-border"
                          href="destinations-details-right"
                        >
                          {item.tripCount} Tour
                        </Link>
                      </div>
                      <div className="trip-content">
                        <h5 className="trip-title white-text underline-two">
                          <Link href={`/destinations-details/${item?.id}`}>
                            {item.tripLocation}
                          </Link>
                        </h5>
                      </div>
                    </div>
                  ))}
                {tripData &&
                  tripData.slice(11, 12).map((item) => (
                    <div
                      key={item.id}
                      className="offer-wrapper offer-style-five mt-24"
                    >
                      <div className="offer-thumb">
                        <Image
                          src={item.img}
                          loader={imageLoader}
                          style={{ width: "100%", height: "100%" }}
                          alt="image"
                        />
                      </div>
                      <div className="offer-content">
                        <p className="title-font mb-20">
                          Enjoy Up to Half Off!
                        </p>
                        <h4 className="white-text offer-mb">
                          Members Saving up to 50%
                        </h4>
                        <div className="offer-btn">
                          <Link
                            href="/booking"
                            className="bd-primary-btn btn-style has-arrow is-bg btn-tertiary is-white radius-60"
                          >
                            <span className="bd-primary-btn-arrow arrow-right">
                              <i className="fa-regular fa-arrow-right"></i>
                            </span>
                            <span className="bd-primary-btn-text">
                              Book Now
                            </span>
                            <span className="bd-primary-btn-circle"></span>
                            <span className="bd-primary-btn-arrow arrow-left">
                              <i className="fa-regular fa-arrow-right"></i>
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TripAreaFive;
