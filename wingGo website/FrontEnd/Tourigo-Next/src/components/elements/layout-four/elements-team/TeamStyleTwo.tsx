"use client";
import React from "react";
import { teamData } from "@/data/team-data";
import TeamElementTwo from "@/components/common/teamElement/TeamElementTwo";
const TeamStyleTwo = () => {
  return (
    <>
      <div className="element-team-area section-space-bottom">
        <div className="container">
          <div
            className="row align-items-center justify-content-center wow bdFadeInUp"
            data-wow-delay=".3s"
          >
            <div className="col-lg-12">
              <div className="section-title-wrapper section-title-space text-center fix">
                <div className="elements-section__wrapper elements-line">
                  <div className="separator__line line-left"></div>
                  <div className="elements-title__wrapper">
                    <h2 className="section__title elements__title">
                      Team Style 02
                    </h2>
                  </div>
                  <div className="separator__line line-right"></div>
                </div>
                <p className="muted-text"></p>
              </div>
            </div>
          </div>
          <div className="row gy-24">
            {teamData &&
              teamData
                .slice(4, 8)
                .map((item) => (
                  <TeamElementTwo
                    key={item?.id}
                    item={item}
                    isparentClass={true}
                  />
                ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamStyleTwo;
