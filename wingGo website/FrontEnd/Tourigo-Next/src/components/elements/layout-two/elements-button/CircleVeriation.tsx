"use client";
import Link from "next/link";
import React, { useState } from "react";
import ModalVideo from "react-modal-video";

const CircleVeriation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openVideoModal = () => setIsOpen(!isOpen);
  return (
    <>
      <section className="element-button section-space-bottom fix">
        <div className="container">
          <div
            className="row align-items-center justify-content-center wow bdFadeInUp"
            data-wow-delay=".3s"
          >
            <div className="col-lg-12">
              <div className="section-title-wrapper section-title-space text-center">
                <div className="elements-section__wrapper elements-line">
                  <div className="separator__line line-left"></div>
                  <div className="elements-title__wrapper">
                    <h2 className="section__title elements__title">
                      Circle Variation
                    </h2>
                  </div>
                  <div className="separator__line line-right"></div>
                </div>
                <p className="muted-text">
                  If you want to add different color button variations, add the
                  class name to your HTML. Below the button is the name of the
                  class.
                </p>
              </div>
            </div>
          </div>
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-3 text-center">
              <Link href="/home" className="circle-btn">
                <i className="fa-regular fa-arrow-right-long"></i>
              </Link>
            </div>
            <div className="col-lg-3 text-center">
              <button
                className="bd-play-btn popup-video animation-one"
                onClick={() => {
                  openVideoModal();
                }}
              >
                <i className="icon-play"></i>
              </button>
            </div>
            <div className="col-lg-3 text-center">
              <button
                className="bd-play-btn popup-video animation-two theme-bg"
                onClick={() => {
                  openVideoModal();
                }}
              >
                <i className="icon-play"></i>
              </button>
            </div>
          </div>
        </div>
      </section>
      <ModalVideo
        channel="youtube"
        isOpen={isOpen}
        videoId="eUpwDAnkgSM"
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};

export default CircleVeriation;
