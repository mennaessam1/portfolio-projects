import ElementBreadcrumb from "@/elements/ElementPages/ElementBreadcrumb";
import React from "react";
import OfferStyleOne from "./OfferStyleOne";
import OfferStyleTwo from "./OfferStyleTwo";
import OfferStyleThree from "./OfferStyleThree";
import OfferStyleFour from "./OfferStyleFour";
import OfferStyleFive from "./OfferStyleFive";
import OfferStyleSix from "./OfferStyleSix";
import OfferStyleSeven from "./OfferStyleSeven";

const ElementsOurOffersMain = () => {
  return (
    <>
      <div className="section-space-top"></div>
      <ElementBreadcrumb titleOne="Offer Elements" titleTwo="Offers" />
      <OfferStyleOne />
      <OfferStyleTwo />
      <OfferStyleThree />
      <OfferStyleFour />
      <OfferStyleFive />
      <OfferStyleSix />
      <OfferStyleSeven />
    </>
  );
};

export default ElementsOurOffersMain;
