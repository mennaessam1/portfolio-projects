import { imageLoader } from "@/hooks/image-loader";
import { IDestinationDataType } from "@/interFace/interFace";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface ItourPropsType {
  item: IDestinationDataType;
  wrapperClass?: string;
}
const DestinationElementTwo = ({ item, wrapperClass }: ItourPropsType) => {
  return (
    <>
      <div
        className={
          wrapperClass ? wrapperClass : "activity-wrapper activity-style-three"
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
        <div className="activity-content-wrap text-center">
          <div className="activity-btn">
            <Link
              className="bd-icon-btn small"
              href={`/destinations-details/${item?.id}`}
            >
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
          <div className="activity-content">
            <h6 className="underline">
              <Link href={`/destinations-details/${item?.id}`}>
                {item.destination}
              </Link>
            </h6>
            <p>{item.tourCount}+ Tours</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DestinationElementTwo;
