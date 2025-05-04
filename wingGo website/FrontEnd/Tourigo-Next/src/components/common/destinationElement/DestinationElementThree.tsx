"use client";
import { imageLoader } from "@/hooks/image-loader";
import { IDestinationDataType } from "@/interFace/interFace";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface IDestinationPropsType {
  item: IDestinationDataType;
}

const DestinationElementThree = ({ item }: IDestinationPropsType) => {
  return (
    <>
      <div className="activity-wrapper activity-style-four">
        <div className="activity-thumb image-overly">
          <Link href={`/destinations-details/${item?.id}`}>
            <Image
              src={item.img}
              loader={imageLoader}
              style={{ width: "auto", height: "auto" }}
              alt="image"
            />
          </Link>
        </div>
        <div className="activity-content-wrap">
          <div className="activity-content text-center">
            <div className="activity-title-wrap">
              <h6 className="activity-title underline">
                <Link href={`/destinations-details/${item?.id}`}>
                  {item.destination}
                </Link>
              </h6>
              <p className="activity-subtitle">{item.tourCount}+ Tours</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DestinationElementThree;
