"use client";

import React from "react";
import { Transport } from "@/interFace/interFace";

interface TourDetailTabAreaProps {
  transport: Transport;
}

// Function to format the duration
const formatDuration = (duration: string) => {
  return duration;
};

const TourDetailTabArea: React.FC<TourDetailTabAreaProps> = ({ transport }) => {
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
          <div
            className="tab-pane fade active show"
            id="nav-overview"
            role="tabpanel"
            aria-labelledby="nav-overview-tab"
          >
            <p className="mb-15">
              <strong>Type:</strong> {transport.type}
            </p>
            <p className="mb-15">
              <strong>City:</strong> {transport.city}
            </p>
            <p className="mb-15">
              <strong>Duration:</strong> {formatDuration(transport.duration)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TourDetailTabArea;
