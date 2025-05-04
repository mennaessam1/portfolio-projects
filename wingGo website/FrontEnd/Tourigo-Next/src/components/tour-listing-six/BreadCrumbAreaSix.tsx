import React from "react";
import breadcrumbBg from "../../../public/assets/images/bg/breadcrumb-banner-1.png";
import SearchFilterTwo from "../shearedComponents/SearchFilterTwo";

const BreadCrumbAreaSix = () => {
  return (
    <>
      <section
        className="bd-breadcrumb-banner-area breadcrumb-banner-bg d-flex align-items-center p-relative image-bg fix"
        style={{ backgroundImage: `url(${breadcrumbBg.src})` }}
      >
        <div className="container">
          <div className="row align-items-center justify-content-center align-content-center m-auto">
            <div className="col-xxl-8 col-xl-10 col-lg-12">
              <div className="breadcrumb-banner-content position-relative z-3">
                <h1 className="white-text text-center">Find Your Dream Tour</h1>
                <div className="banner-search-wrapper mt-45 w-100">
                  <SearchFilterTwo />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BreadCrumbAreaSix;
