"use client";
import GetRatting from "@/hooks/GetRatting";
import { imageLoader } from "@/hooks/image-loader";
import useGlobalContext from "@/hooks/use-context";
import { Place } from "@/interFace/interFace";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useCurrency } from "@/contextApi/CurrencyContext";
import {fetchImage} from "@/api/placesApi"

interface ItourPropsType {
  tour: Place;
  className: string;
  tourWrapperClass: string;
  isparentClass: boolean;
  isAdmin?: boolean;
  isTourGuide?: boolean;
}

const TourSingleCard = ({

  tour,
  className,
  tourWrapperClass,
  isparentClass,
  isAdmin = false,
  isTourGuide = false,
}: ItourPropsType) => {
  const { setModalData } = useGlobalContext();
  const { currency, convertAmount } = useCurrency(); // Access currency and conversion function
  const [convertedPrice, setConvertedPrice] = useState<number | null>(null);
  const DEFAULT_IMAGE = "/assets/images/places.jpg";
  const [imageUrl, setImageUrl] = useState<string>(DEFAULT_IMAGE);
  useEffect(() => {
    const convertPrice = async () => {
      if (tour.ticketPrices?.foreigner) {
        const priceInSelectedCurrency = await convertAmount(tour.ticketPrices?.foreigner);
        setConvertedPrice(priceInSelectedCurrency);
      }
    };
    convertPrice();
  }, [tour.ticketPrices?.foreigner, currency, convertAmount]);
  useEffect(() => {
    const loadImage = async () => {
      try {
        if (tour?._id && tour?.photo) { // Check if the item has an image
          const url = await fetchImage(tour._id);
          if (url) {
            console.log("Fetched Image URL:", url); // Verify if a valid URL is returned
            setImageUrl(url);
            console.log(imageUrl);
          }
        }
      } catch (error) {
        console.error("Failed to load image:", error);
      }
    };
    loadImage();
  }, [tour?._id, tour?.photo,imageUrl]);

  return (
    <>
      {isparentClass ? (
        <div className={className}>
          <div className={tourWrapperClass}>
            <div className="p-relative">
              <div className="tour-thumb image-overly">
                <Link href={`/place-details/${tour._id}`}>
                <Image
                    src={imageUrl}
                    loader={imageLoader}
                    width={270}
                    height={270}
                    style={{ width: "300px", height: "250px" }}
                    alt="Places Image"
                    unoptimized 
                  />
                </Link>
              </div>
              <div className="tour-meta d-flex align-items-center justify-content-between">
                <div className="tour-location">
                  <span>
                    <Link href={`/place-details/${tour._id}`}>
                      <i className="fa-regular fa-location-dot"></i>{" "}
                      {tour.location || "Location not available"}
                    </Link>
                  </span>
                </div>
              </div>
            </div>
            <div className="tour-content">
              <h5 className="tour-title fw-5 underline custom_mb-5">
                <Link href={`/place-details/${tour._id}`}>
                  {tour.name}
                </Link>
              </h5>
              <p>{tour.description}</p>
              {/* <span className="tour-price b3">
                {currency} {convertedPrice?.toLocaleString("en-US") || tour.ticketPrices.foreigner.toLocaleString("en-US")} for foreigners
              </span> */}
              <div className="tour-divider"></div>

              <div className="tour-meta d-flex align-items-center justify-content-between">
                <div className="time d-flex align-items-center gap--5">
                  <i className="fa-regular fa-clock"></i>
                  <span>{tour.openingHours}</span>
                </div>
                <div className="tour-btn">
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={tourWrapperClass}></div>
      )}
    </>
  );
};

export default TourSingleCard;
