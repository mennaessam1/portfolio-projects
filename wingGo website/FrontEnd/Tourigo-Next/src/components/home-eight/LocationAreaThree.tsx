"use client";
import React from "react";
import SearchFilter from "../shearedComponents/SearchFilter";
const LocationAreaThree = () => {
  return (
    <>
      <div className="bd-location-search-area section-space flash-white fix">
        <div className="container">
          <div className="row gy-24 align-items-center justify-content-center section-title-space">
            <div className="col-xl-6 col-md-8">
              <div className="section-title-wrapper text-center">
                <span className="section-subtitle mb-10">Find your Tour</span>
                <h2 className="section-title">Search you dream tour here.</h2>
              </div>
            </div>
          </div>
          <SearchFilter bgClass="banner-search-box" />
        </div>
      </div>
    </>
  );
};

export default LocationAreaThree;
