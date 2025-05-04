"use client";
import React from "react";
import SearchFilterTwo from "../shearedComponents/SearchFilterTwo";

const BannerListingArea = () => {
  return (
    <>
      <div className="bd-tour-search-wrapper tour-search-top">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xxl-10 col-xl-10 col-lg-11">
              <div className="banner-search-wrapper style-two w-100">
                <SearchFilterTwo wrapperClass="box-shadow" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BannerListingArea;
