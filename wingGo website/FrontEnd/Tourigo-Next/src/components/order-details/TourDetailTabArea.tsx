// TourDetailTabArea.tsx
"use client";
import { imageLoader } from "@/hooks/image-loader";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import tourImgNine from "../../../public/assets/images/tour/tour-img-9.png";
import tourImgTwentyOne from "../../../public/assets/images/tour/tour-img-21.png";
import tourImgTwentyTwo from "../../../public/assets/images/tour/tour-img-22.png";
import { clientReviewData } from "@/data/client-review-data";
import TourDetailsPostForm from "./TourDetailsPostFrom/TourDetailsPostForm";
import { Order } from '@/interFace/interFace';


interface TourDetailTabAreaProps {
  OrderData: Order;
}

const TourDetailTabArea: React.FC<TourDetailTabAreaProps> = ({ OrderData }) => {
  return (
    <>
      <div className="tour-details-nav-tabs mb-35">
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <button
              className="nav-link active"
              id="nav-overview-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-overview"
              type="button"
              role="tab"
              aria-controls="nav-overview"
              aria-selected="true"
            >
              Overview
            </button>
           
          </div>
        </nav>
        <div className="tab-content mt-25" id="nav-tabContent">
          {/* Overview Tab */}
          <div
            className="tab-pane fade active show"
            id="nav-overview"
            role="tabpanel"
            aria-labelledby="nav-overview-tab"
            tabIndex={0}
          >
            <p className="mb-15">
              <strong>Title:</strong> {OrderData.orderStatus}
            </p>
            <p className="mb-15">
              <strong>Body:</strong> {OrderData.paymentStatus}
            </p>
            <p className="mb-15">
              <strong>State:</strong> {OrderData.totalPrice}
            </p>
            
          </div>
          
          {/* Feedback Tab */}
          <div
            className="tab-pane fade"
            id="nav-feedback"
            role="tabpanel"
            aria-labelledby="nav-feedback-tab"
            tabIndex={0}
          >
          </div>
        </div>
      </div>
    </>
  );
};

export default TourDetailTabArea;
