import React from "react";
import SearchFilterTwo from "../shearedComponents/SearchFilterTwo";

const BreadCrumbAreaFive = () => {
  return (
    <>
      <div className="bd-video-breadcrumb-area p-relative">
        <div className="container">
          <div className="col-xl-12">
            <div className="breadcrumb-video">
              <div className="breadcrumb-video-bg"></div>
              <video
                src="assets/video/testimonial.mp4"
                autoPlay
                loop={true}
                muted={true}
              ></video>
            </div>
            <div className="video-search-box">
              <div className="row justify-content-center">
                <div className="col-xxl-10 col-xl-10 col-lg-12">
                  <div className="banner-search-wrapper style-two w-100">
                    <SearchFilterTwo wrapperClass="box-shadow" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BreadCrumbAreaFive;
