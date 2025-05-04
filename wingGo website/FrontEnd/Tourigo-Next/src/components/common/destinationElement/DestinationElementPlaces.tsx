import { imageLoader } from "@/hooks/image-loader";
import { Place  } from "@/interFace/interFace"; 
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface IPlacePropsType {
  item: Place;
  wrapperClass?: string;
}

const PlaceElement = ({ item, wrapperClass }: IPlacePropsType) => {
    return (
      <>
        <div
          className={
            wrapperClass ? wrapperClass : "activity-wrapper activity-style-three"
          }
        >
          <div className="activity-thumb image-overly">
            <Link href={`/places-details/${item._id}`}>
              <Image
                src={item.pictures[0]}  // Access the first image from the pictures array
                loader={imageLoader}
                style={{ width: "100%", height: "auto" }}
                alt="Place Image"
              />
            </Link>
          </div>
          <div className="activity-content-wrap text-center">
            <div className="activity-btn">
              <Link
                className="bd-icon-btn small"
                href={`/places-details/${item._id}`}
              >
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
            <div className="activity-content">
              <h6 className="underline">
                <Link href={`/places-details/${item._id}`}>
                  {item.name}  {/* Use 'name' as per the interface */}
                </Link>
              </h6>
                <p>{item.location}</p>  {/* Use 'location' as per the interface */}
            </div>
          </div>
        </div>
      </>
    );
  };

export default PlaceElement;
