"use client";
import { imageLoader } from "@/hooks/image-loader";
import { IActivityDataType } from "@/interFace/interFace";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface ItourPropsType {
  item: IActivityDataType;
  wrapperClass?: string;
  activityStyleClass?: string;
}

const ImgcardElementOne = ({
  item,
  wrapperClass,
  activityStyleClass,
}: ItourPropsType) => {
  const pathName = usePathname();
  return (
    <>
      <div
        className={
          wrapperClass ? wrapperClass : "col-lg-3 col-md-6 wow bdFadeInUp"
        }
        data-wow-delay={item.delay}
      >
        <div
          className={
            activityStyleClass
              ? activityStyleClass
              : "activity-wrapper activity-style"
          }
        >
          <div className="activity-thumb image-overly">
            <Link href={`/destinations-details/${item?.id}`}>
              <Image
                src={item.img}
                loader={imageLoader}
                style={{ width: "100%", height: "auto" }}
                alt="image"
              />
            </Link>
          </div>
          <div className="activity-meta">
            <span>
              <i className="icon-star"></i>
              {item.rating}
            </span>
          </div>
          <div className="activity-content-wrap">
            <div className="activity-content d-flex align-items-center justify-content-between">
              <div className="activity-title-wrap">
                <h5 className="underline">
                  <Link href={`/destinations-details/${item?.id}`}>
                    {item.title}
                  </Link>
                </h5>

                {pathName === "/home-five" ? (
                  <></>
                ) : (
                  <p>{item.count} + Tours</p>
                )}
              </div>
              <div className="activity-btn">
                <Link
                  className="bd-icon-btn"
                  href={`/destinations-details/${item?.id}`}
                >
                  <i className="fa-light fa-angle-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImgcardElementOne;
