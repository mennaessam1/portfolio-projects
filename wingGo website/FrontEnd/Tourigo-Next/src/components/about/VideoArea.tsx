"use client";
import React, { useState } from "react";
import ModalVideo from "react-modal-video";
import bgImg from "../../../public/assets/images/bg/video-bg.png";

const VideoArea = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openVideoModal = () => setIsOpen(!isOpen);
  return (
    <>
      <div
        className="video-area video-bg p-relative"
        style={{ backgroundImage: `url(${bgImg.src})` }}
      >
        <div className="container">
          <div className="row wow bdFadeInUp" data-wow-delay=".5s">
            <div className="col-lg-12">
              <div className="video-link text-center p-relative">
                <button
                  onClick={() => {
                    openVideoModal();
                  }}
                  className="bd-play-btn popup-video animation-three"
                >
                  <i className="icon-play"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalVideo
        channel="youtube"
        isOpen={isOpen}
        videoId="eUpwDAnkgSM"
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};

export default VideoArea;
