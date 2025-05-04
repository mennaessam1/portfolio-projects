import { chooseData } from "@/data/homeTwo/choose-data";
import React from "react";

const WhyChoseElementTwo = () => {
  return (
    <>
      {chooseData &&
        chooseData.map((item) => (
          <div
            key={item.id}
            className="col-xxl-3 col-xl-3 col-lg-6 col-md-6 wow bdFadeInUp"
            data-wow-delay={item.delay}
          >
            <div className="chose-wrapper">
              <div className="chose-item">
                <div className="chose-icon">
                  <span>
                    <i className={item.choseIcon}></i>
                  </span>
                </div>
                <h6 className="chose-title">{item.chooseTitle}</h6>
                <p className="chose-desc">{item.chooseDesc}</p>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default WhyChoseElementTwo;
