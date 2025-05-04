import React from "react";
import TripAreaTwo from "../shearedComponents/TripAreaTwo";
import SidebarSearchArea from "../shearedComponents/SidebarSearchArea";
import PaginationWrapperTwo from "../shearedComponents/PaginationWrapperTwo";

const DestinationGridRight = () => {
  return (
    <>
      <div className="bd-blog-grid-area section-space">
        <div className="container">
          <div className="row gy-24">
            <div className="col-xxl-8 col-xl-8 col-lg-7">
              {/*trip area*/}
              <TripAreaTwo />
              {/*pagination area*/}
            </div>
            <div className="col-xxl-4 col-xl-4 col-lg-5">
              <SidebarSearchArea placeHolderTextData="Destination" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DestinationGridRight;
