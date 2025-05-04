import React from "react";
import SidebarSearchArea from "../shearedComponents/SidebarSearchArea";
import DestinationDetails from "../common/DestinationDetails";
import { idType } from "@/interFace/interFace";

const DestinationDetailsRight = ({ id }: idType) => {
  return (
    <>
      <section className="bd-destinations-details-area section-space">
        <div className="container">
          <div className="row gy-24">
            <div className="col-xxl-8 col-xl-8 col-lg-7">
              <DestinationDetails id={id} />
            </div>
            <div className="col-xxl-4 col-xl-4 col-lg-5">
              <SidebarSearchArea placeHolderTextData="Destination" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DestinationDetailsRight;
