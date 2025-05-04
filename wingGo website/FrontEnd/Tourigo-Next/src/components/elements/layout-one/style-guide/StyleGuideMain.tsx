import React from "react";
import ColorPalette from "./ColorPalette";
import ColorGradient from "./ColorGradient";
import Typography from "./Typography";
import FormElements from "./FormElements";
import Pagination from "./Pagination";
import Tooltips from "./Tooltips";
import Avatar from "./Avatar";
import Sidebar from "./Sidebar";
const StyleGuideMain = () => {
  return (
    <>
      <div className="style-guide__area section-space">
        <div className="container">
          <div className="row g-5">
            <div className="col-xl-3 col-lg-4">
              <div className="widget-sidebar bd-sticky__top">
                <div className="content-item-content">
                  <div className="widget-details">
                    <Sidebar />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-8 col-lg-8">
              <div className="guide__widget-box">
                <ColorPalette />
                <div className="elements__divider">
                  <hr />
                </div>
                <ColorGradient />
                <div className="elements__divider">
                  <hr />
                </div>
                <Typography />
                <div className="elements__divider">
                  <hr />
                </div>
                <FormElements />
                <div className="elements__divider">
                  <hr />
                </div>
                <div className="elements__divider">
                  <hr />
                </div>
                <Tooltips />
                <div className="elements__divider">
                  <hr />
                </div>
                <Avatar />
                <div className="elements__divider">
                  <hr />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StyleGuideMain;
