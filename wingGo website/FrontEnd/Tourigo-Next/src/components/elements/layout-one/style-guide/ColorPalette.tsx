import React from "react";

const ColorPalette = () => {
  return (
    <>
      <div id="colorPalette" className="elements__area">
        <div className="wrapper">
          <h4 className="style__guide-title mb-20">Color Palette</h4>
          <div className="row g-5">
            <div className="col-xl-3 col-lg-4 col-md-6">
              <div className="color-box-inner">
                <div className="color-box bg-theme-primary"></div>
                <div className="content mt-10">
                  <span className="color-box-title">#006CE4</span>
                  <h6 className="title">Primary Color</h6>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6">
              <div className="color-box-inner">
                <div className="color-box bg-theme-secondary"></div>
                <div className="content mt-10">
                  <span className="color-box-title"> #001A3D</span>
                  <h6 className="title">Secondary Color</h6>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6">
              <div className="color-box-inner">
                <div className="color-box bg-theme-tertiary"></div>
                <div className="content mt-10">
                  <span className="color-box-title">#FFB700</span>
                  <h6 className="title">Tertiary Color</h6>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6">
              <div className="color-box-inner">
                <div className="color-box bg-theme-quaternary"></div>
                <div className="content mt-10">
                  <span className="color-box-title">#003B95</span>
                  <h6 className="title">Quaternary Color</h6>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6">
              <div className="color-box-inner">
                <div className="color-box white-bg box-shadow"></div>
                <div className="content mt-10">
                  <span className="color-box-title">#FFFFFF</span>
                  <h6 className="title">white-bg</h6>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6">
              <div className="color-box-inner">
                <div className="color-box dark-bg"></div>
                <div className="content mt-10">
                  <span className="color-box-title">#001229</span>
                  <h6 className="title">dark-bg</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ColorPalette;
