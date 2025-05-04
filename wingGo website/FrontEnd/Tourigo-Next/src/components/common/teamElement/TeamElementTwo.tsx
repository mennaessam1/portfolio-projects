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

const TeamElementTwo = ({
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
                : "col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6"
            }
          >
            <div
              className={
                teamWrapperClass
                  ? teamWrapperClass
                  : "team-wrapper team-style-two"
              }
            >
              <div className="team-content-wrap position-relative">
                <div className="team-thumb-wrap">
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
                  <div className="theme-social team-social has-white-bg">
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
                </div>
                <div className="team-content">
                  <h6 className="team-member-name b3 underline">
                    <Link href={`/team-details/${item?.id}`}>{item.name}</Link>
                  </h6>
                  <span>{item.title}</span>
                </div>
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
                : "team-wrapper team-style-two"
            }
          >
            <div className="team-content-wrap position-relative">
              <div className="team-thumb-wrap">
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
                <div className="theme-social team-social has-white-bg">
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
              </div>
              <div className="team-content">
                <h6 className="team-member-name b3 underline">
                  <Link href={`/team-details/${item?.id}`}>{item.name}</Link>
                </h6>
                <span>{item.title}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TeamElementTwo;
