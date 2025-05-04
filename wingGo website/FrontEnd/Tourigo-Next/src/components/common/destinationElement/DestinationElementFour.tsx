"use client";
import { imageLoader } from "@/hooks/image-loader";
import { IActivityDataType } from "@/interFace/interFace";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface IDestinationPropsType {
  item: IActivityDataType;
}

const DestinationElementFour = ({ item }: IDestinationPropsType) => {
  return (
    <>
      <div className="activity-wrapper activity-style style-five">
        <div className="activity-thumb image-overly">
          <Link href={`/destinations-details/${item?.id}`}>
            <Image src={item.img} loader={imageLoader} alt="image" />
          </Link>
        </div>
        <div className="activity-content-wrap">
          <div className="activity-content d-flex align-items-center justify-content-between">
            <div className="activity-title-wrap">
              <h5 className="underline">
                <Link href={`/destinations-details/${item?.id}`}>
                  {item.title}
                </Link>
              </h5>
              <p>{item?.count}+ Tours</p>
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
    </>
  );
};

export default DestinationElementFour;
