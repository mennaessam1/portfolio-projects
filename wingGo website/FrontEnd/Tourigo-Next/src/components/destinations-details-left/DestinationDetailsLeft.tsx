import React from "react";
import SidebarSearchArea from "../shearedComponents/SidebarSearchArea";
import DestinationDetails from "../common/DestinationDetails";
import { idType } from "@/interFace/interFace";

const DestinationDetailsLeft = ({ id }: idType) => {
  return (
    <>
      <section className="bd-destinations-details-area section-space">
        <div className="container">
          <div className="row gy-24">
            <div className="col-xxl-4 col-xl-4 col-lg-5 order-lg-0 order-1">
              <SidebarSearchArea placeHolderTextData="Destination" />
            </div>
            <div className="col-xxl-8 col-xl-8 col-lg-7 order-lg-1 order-0">
              <DestinationDetails id={id} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DestinationDetailsLeft;
