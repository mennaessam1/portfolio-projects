"use client";
import { pricingData } from "@/data/pricing-data";
import { imageLoader } from "@/hooks/image-loader";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const PricingCard = () => {
  return (
    <>
      <section className="bd-pricing-area section-space">
        <div className="container">
          <div className="row gy-24">
            {pricingData &&
              pricingData.map((item) => (
                <div
                  key={item.id}
                  className="col-xxl-4 col-xl-4 col-lg-4 col-md-12"
                >
                  <div
                    className={`pricing-wrapper pricing-style ${item.class}`}
                  >
                    <div className="pricing-thumb-wrapper position-relative">
                      <div className="pricing-thumb">
                        <Image
                          src={item.img}
                          loader={imageLoader}
                          style={{ width: "100%", height: "auto" }}
                          alt="image"
                        />
                      </div>
                      <span className="pricing-tag">{item.plan}</span>
                      <h3 className="pricing-package-price white-text">
                        $ {item.price}
                      </h3>
                    </div>
                    <div className="pricing-content">
                      <div className="pricing-content-list">
                        <ul>
                          <li>{item.pricingContent.person} Person</li>
                          <li>{item.pricingContent.duration}</li>
                          <li>{item.pricingContent.lunch}</li>
                          <li>{item.pricingContent.travelSpot} Travel Spots</li>
                          <li>{item.pricingContent.dinner}</li>
                        </ul>
                      </div>
                      <div className="pricing-btn">
                        <Link
                          className="bd-btn btn-style radius-60 w-100"
                          href="/booking"
                        >
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default PricingCard;
