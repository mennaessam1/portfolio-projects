import React from "react";
import TripAreaTwo from "../shearedComponents/TripAreaTwo";
import SidebarSearchArea from "../shearedComponents/SidebarSearchArea";
import PaginationWrapperTwo from "../shearedComponents/PaginationWrapperTwo";

const DestinationGridLeft = () => {
  return (
    <>
      <div className="bd-blog-grid-area section-space">
        <div className="container">
          <div className="row gy-24">
            <div className="col-xxl-4 col-xl-4 col-lg-5 order-lg-0 order-1">
              <SidebarSearchArea placeHolderTextData="Destination" />
            </div>
            <div className="col-xxl-8 col-xl-8 col-lg-7 order-lg-1 order-0">
              {/*trip area*/}
              <TripAreaTwo />
              {/*pagination area*/}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DestinationGridLeft;
