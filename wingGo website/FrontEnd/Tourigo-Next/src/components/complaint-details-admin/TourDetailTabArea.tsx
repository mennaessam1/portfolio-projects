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
import { Complaint } from '@/interFace/interFace';

interface TourDetailTabAreaProps {
  ComplaintData: Complaint;
  onReplyPosted: (reply: string) => void;
}


// Function to format date into readable string
// Function to format date into a readable string
const formatDate = (date: string | Date) => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
  return dateObj.toLocaleDateString(undefined, options);
};





const TourDetailTabArea: React.FC<TourDetailTabAreaProps> = ({ ComplaintData , onReplyPosted }) => {
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
            <button
              className="nav-link"
              id="nav-feedback-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-feedback"
              type="button"
              role="tab"
              aria-controls="nav-feedback"
              aria-selected="false"
              tabIndex={-1}
            >
              Feedback
            </button>
          </div>
        </nav>
        <div className="tab-content mt-25" id="nav-tabContent">
          <div
            className="tab-pane fade active show"
            id="nav-overview"
            role="tabpanel"
            aria-labelledby="nav-overview-tab"
            tabIndex={0}
          >
            <p className="mb-15">
              <strong>Title:</strong> {ComplaintData.title}
            </p>
            <p className="mb-15">
              <strong>Body:</strong> {ComplaintData.body}
            </p>
            <p className="mb-15">
              <strong>State:</strong> {ComplaintData.state}
            </p>
            <p className="mb-15">
              <strong>Date:</strong> {formatDate(ComplaintData.date)}
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
            <TourDetailsPostForm complaintId={ComplaintData._id || ''} onReplyPosted={onReplyPosted}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default TourDetailTabArea;