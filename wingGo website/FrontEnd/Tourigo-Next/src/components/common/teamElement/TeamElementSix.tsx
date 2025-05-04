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

const TeamElementSix = ({
  item,
  className,
  teamWrapperClass,
  isparentClass,
}: IteamPropsType) => {
  return (
    <>
      {isparentClass === true ? (
        <>
          <div className={className ? className : ""}>
            <div
              className={
                teamWrapperClass
                  ? teamWrapperClass
                  : "team-wrapper team-style-four"
              }
            >
              <div className="team-thumb image-overly radius-8">
                <Link href={`/team-details/${item?.id}`}>
                  <Image
                    src={item.img}
                    loader={imageLoader}
                    style={{ width: "100%", height: "auto" }}
                    alt="image"
                  />
                </Link>
              </div>
              <div className="theme-social team-social">
                <Link
                  className="icon-1"
                  target="_blank"
                  href="https://www.facebook.com/"
                >
                  <i className="icon-facebook"></i>
                </Link>
                <Link
                  className="icon-2"
                  target="_blank"
                  href="https://twitter.com/"
                >
                  <i className="icon-twitter-x"></i>
                </Link>
                <Link
                  className="icon-3"
                  target="_blank"
                  href="https://www.instagram.com/"
                >
                  <i className="icon-instagram"></i>
                </Link>
                <Link
                  className="icon-4"
                  target="_blank"
                  href="https://bd.linkedin.com/"
                >
                  <i className="icon-linkedin"></i>
                </Link>
              </div>
              <div className="team-content text-center">
                <h5 className="team-member-name white-text underline-two">
                  <Link href={`/team-details/${item?.id}`}>{item.name}</Link>
                </h5>
                <span className="team-member-designation">{item.title}</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className={
              teamWrapperClass
                ? teamWrapperClass
                : "team-wrapper team-style-four"
            }
          >
            <div className="team-thumb image-overly radius-8">
              <Link href={`/team-details/${item?.id}`}>
                <Image
                  src={item.img}
                  loader={imageLoader}
                  style={{ width: "100%", height: "auto" }}
                  alt="image"
                />
              </Link>
            </div>
            <div className="theme-social team-social">
              <Link
                className="icon-1"
                target="_blank"
                href="https://www.facebook.com/"
              >
                <i className="icon-facebook"></i>
              </Link>
              <Link
                className="icon-2"
                target="_blank"
                href="https://twitter.com/"
              >
                <i className="icon-twitter-x"></i>
              </Link>
              <Link
                className="icon-3"
                target="_blank"
                href="https://www.instagram.com/"
              >
                <i className="icon-instagram"></i>
              </Link>
              <Link
                className="icon-4"
                target="_blank"
                href="https://bd.linkedin.com/"
              >
                <i className="icon-linkedin"></i>
              </Link>
            </div>
            <div className="team-content text-center">
              <h5 className="team-member-name white-text underline-two">
                <Link href={`/team-details/${item?.id}`}>{item.name}</Link>
              </h5>
              <span className="team-member-designation">{item.title}</span>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TeamElementSix;
