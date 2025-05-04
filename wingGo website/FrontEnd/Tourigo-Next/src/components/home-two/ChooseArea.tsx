import React from "react";
import WhyChoseElementTwo from "../common/whyChoseElement/WhyChoseElementTwo";

const ChooseArea = () => {
  return (
    <>
      <section className="bd-chose-area section-space">
        <div className="container">
          <div className="row align-items-center justify-content-center section-title-space">
            <div className="col-xl-6">
              <div className="section-title-wrapper text-center">
                <span className="section-subtitle mb-10">Why chose us</span>
                <h2 className="section-title">Our Unique Offerings</h2>
              </div>
            </div>
          </div>
          <div className="row gy-24">
            <WhyChoseElementTwo />
          </div>
        </div>
      </section>
    </>
  );
};

export default ChooseArea;
