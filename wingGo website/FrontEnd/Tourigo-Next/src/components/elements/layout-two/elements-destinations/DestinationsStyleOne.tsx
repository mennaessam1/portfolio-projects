import React from "react";
import ImgcardElementOne from "@/components/common/cardElement/ImgcardElementOne";
import { activityData } from "@/data/activity-data";
const DestinationsStyleOne = () => {
  return (
    <>
      <section className="element-Destinations-area section-space">
        <div className="container">
          <div
            className="row align-items-center justify-content-center wow bdFadeInUp"
            data-wow-delay=".3s"
          >
            <div className="col-lg-12">
              <div className="section-title-wrapper section-title-space text-center fix">
                <div className="elements-section__wrapper elements-line">
                  <div className="separator__line line-left"></div>
                  <div className="elements-title__wrapper">
                    <h2 className="section__title elements__title">
                      Destinations Style 01
                    </h2>
                  </div>
                  <div className="separator__line line-right"></div>
                </div>
                <p className="muted-text"></p>
              </div>
            </div>
          </div>
          <div className="row gy-24">
            {activityData.length > 0 &&
              activityData
                .slice(0, 4)
                .map((item) => (
                  <ImgcardElementOne key={item?.id} item={item} />
                ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default DestinationsStyleOne;
