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
}

const TourDetailTabArea: React.FC<TourDetailTabAreaProps> = ({ ComplaintData }) => {
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
          {/* Overview Tab */}
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
              <strong>Date:</strong> {new Date(ComplaintData.date).toLocaleDateString()}
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
            {/* Admin Replies Section */}
            <div className="tour-details-rating-wrapper">
              <div className="review-content">
                {ComplaintData.reply && ComplaintData.reply.length > 0 ? (
                  ComplaintData.reply.map((reply, index) => (
                    <div key={index} className="tour-review-wrapper">
                      <div className="media">
                        <div className="thumbnail">
                          <Link href="#">
                            <Image
                              src="/path/to/default-avatar.png" // Replace with a real image if available
                              loader={imageLoader}
                              style={{ width: "100%", height: "auto" }}
                              alt="Admin Avatar"
                            />
                          </Link>
                        </div>
                        <div className="media-body">
                          <div className="author-info">
                            <h5 className="title">
                              <Link className="hover-flip-item-wrapper" href="#">
                                Admin
                              </Link>
                              <Link href="#">
                                <i className="fa-solid fa-thumbs-up"></i>
                              </Link>
                            </h5>
                            <ul className="bd-meta">
                              <li className="has-seperator">
                                On: <span>{new Date().toLocaleDateString()}</span> {/* You can replace this with the actual date */}
                              </li>
                              <li>
                                <div className="rating">
                                  <Link href="#">
                                    <i className="fa fa-star"></i>
                                  </Link>
                                  <Link href="#">
                                    <i className="fa fa-star"></i>
                                  </Link>
                                  <Link href="#">
                                    <i className="fa fa-star"></i>
                                  </Link>
                                  <Link href="#">
                                    <i className="fa fa-star"></i>
                                  </Link>
                                  <Link href="#">
                                    <i className="fa fa-star"></i>
                                  </Link>
                                </div>
                              </li>
                            </ul>
                          </div>
                          <div className="content">
                            <p className="description">{reply}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No replies yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TourDetailTabArea;
