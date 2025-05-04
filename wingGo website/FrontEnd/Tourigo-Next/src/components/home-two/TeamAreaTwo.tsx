"use client";
import { teamData } from "@/data/team-data";
import { imageLoader } from "@/hooks/image-loader";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import TeamElementOne from "../common/teamElement/TeamElementOne";

const TeamAreaTwo = () => {
  return (
    <section className="bd-team-area section-space flash-white">
      <div className="container">
        <div className="row gy-24 align-items-center text-center justify-content-center section-title-space">
          <div className="col-xl-6">
            <div className="section-title-wrapper">
              <span className="section-subtitle mb-10">Our Team</span>
              <h2 className="section-title">Tour Guider</h2>
            </div>
          </div>
        </div>
        <div className="row gy-24">
          {teamData &&
            teamData
              .slice(0, 3)
              .map((item) => (
                <TeamElementOne
                  key={item?.id}
                  item={item}
                  className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 wow bdFadeInUp"
                  isparentClass={true}
                />
              ))}
        </div>
      </div>
    </section>
  );
};

export default TeamAreaTwo;
