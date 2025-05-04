import React from "react";
import SearchFilter from "../shearedComponents/SearchFilter";
const LocationAreaFour = () => {
  return (
    <>
      <div className="bd-location-search-area">
        <div className="container">
          <div className="row gy-24 align-items-center justify-content-center section-title-space">
            <div className="col-xl-6 col-md-8">
              <div className="section-title-wrapper text-center">
                <span className="section-subtitle mb-10">
                  Explore Perfect Tour
                </span>
                <h2 className="section-title">Find Your Dream Tour</h2>
              </div>
            </div>
          </div>
          <SearchFilter bgClass="banner-search-box has-bg" />
        </div>
      </div>
    </>
  );
};

export default LocationAreaFour;
