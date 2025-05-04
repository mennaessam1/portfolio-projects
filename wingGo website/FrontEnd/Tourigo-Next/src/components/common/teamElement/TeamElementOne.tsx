"use client";
import { imageLoader } from "@/hooks/image-loader";
import { ITeamDataType } from "@/interFace/interFace";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface IteamPropsType {
  item: ITeamDataType;
  className?: string;
  teamWrapperClass?: string;
  isparentClass: boolean;
}

const TeamElementOne = ({
  item,
  className,
  teamWrapperClass,
  isparentClass,
}: IteamPropsType) => {
  return (
    <>
      {isparentClass === true ? (
        <>
          <div
            className={
              className
                ? className
                : "col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6"
            }
            data-wow-delay=".3s"
          >
            <div
              className={
                teamWrapperClass ? teamWrapperClass : "team-wrapper team-style"
              }
            >
              <div className="team-content-wrap position-relative">
                <div className="team-thumb">
                  <Link href={`/team-details/${item?.id}`}>
                    <Image src={item?.img} alt="image" />
                  </Link>
                </div>
                <div className="team-content">
                  <h6 className="team-member-name b3 underline">
                   
                      Menna Essam
                   
                  </h6>
                  <span>Tour Guide</span>
                </div>
              </div>
             
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className={
              teamWrapperClass ? teamWrapperClass : "team-wrapper team-style"
            }
            data-wow-delay=".3s"
          >
            <div className="team-content-wrap position-relative">
              <div className="team-thumb">
                <Link href={`/team-details/${item?.id}`}>
                  <Image src={item?.img} alt="image" />
                </Link>
              </div>
              <div className="team-content">
                <h6 className="team-member-name b3 underline">
                 Ethan Mitchell
                </h6>
                <span>Tour Guide</span>
              </div>
            </div>
            
          </div>
        </>
      )}
    </>
  );
};

export default TeamElementOne;
