import React from "react";

const ColorGradient = () => {
  return (
    <>
      <div id="gradient" className="elements__area">
        <div className="wrapper">
          <h4 className="style__guide-title mb-20">Color Gradient</h4>
          <div className="row g-5">
            <div className="col-xl-3 col-lg-4 col-md-6">
              <div className="color-box-inner">
                <div className="color-box gradient-bg-1"></div>
                <div className="content mt-10">
                  <h6 className="title">gradient-bg-1</h6>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6">
              <div className="color-box-inner">
                <div className="color-box gradient-bg-2"></div>
                <div className="content mt-10">
                  <h6 className="title">gradient-bg-2</h6>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6">
              <div className="color-box-inner">
                <div className="color-box gradient-bg-3"></div>
                <div className="content mt-10">
                  <h6 className="title">gradient-bg-3</h6>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6">
              <div className="color-box-inner">
                <div className="color-box gradient-bg-4"></div>
                <div className="content mt-10">
                  <h6 className="title">gradient-bg-4</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ColorGradient;
