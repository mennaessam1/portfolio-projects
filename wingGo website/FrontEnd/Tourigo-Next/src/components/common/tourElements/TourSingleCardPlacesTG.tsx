"use client";
import GetRatting from "@/hooks/GetRatting";
import { imageLoader } from "@/hooks/image-loader";
import useGlobalContext from "@/hooks/use-context";
import { Place } from "@/interFace/interFace";
import Image from "next/image";
import Link from "next/link";
import React,{useState,useEffect} from "react";
import { deletePlace } from "@/api/placesApi";
import {fetchImage} from "@/api/placesApi"
interface ItourPropsType {
  tour: Place;
  className: string;
  tourWrapperClass: string;
  isparentClass: boolean;
  isAdmin?: boolean;
  isTourGuide?: boolean;
  onRemove?: (placeId: string) => void; // New prop
}

const TourSingleCard = ({
  tour,
  className,
  tourWrapperClass,
  isparentClass,
  isAdmin = false,
  isTourGuide = false,
  onRemove, // Destructure the prop
}: ItourPropsType) => {
  const { setModalData } = useGlobalContext();
  const DEFAULT_IMAGE = "/assets/images/places.jpg";
  const [imageUrl, setImageUrl] = useState<string>(DEFAULT_IMAGE);
  const handleDeletePlace = async (placeId: string) => {
    if (confirm("Are you sure you want to delete this place?")) {
      try {
        await deletePlace(placeId);
        alert("Place deleted successfully.");
        if (onRemove) {
          onRemove(placeId); // Call the onRemove handler
        }
      } catch (error) {
        console.error("Error deleting place:", error);
        alert("Failed to delete the place. Please try again.");
      }
    }
  };
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
                <Link href={`/place-details-TG/${tour._id}`}>
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
                <button className="tour-favorite tour-like">
                  <i className="icon-heart"></i>
                </button>
                <div className="tour-location">
                  <span>
                    <Link href={`/place-details-TG/${tour._id}`}>
                      <i className="fa-regular fa-location-dot"></i>{" "}
                      {tour.location || "Location not available"}
                    </Link>
                  </span>
                </div>
              </div>
            </div>
            <div className="tour-content">
              <h5 className="tour-title fw-5 underline custom_mb-5">
                <Link href={`/place-details-TG/${tour._id}`}>
                  {tour.name}
                </Link>
              </h5>
              <p>{tour.description}</p>
              {/* <span className="tour-price b3">
                ${tour.ticketPrices.foreigner.toLocaleString("en-US")} for foreigners
              </span> */}
              <div className="tour-divider"></div>

              <div className="tour-meta d-flex align-items-center justify-content-between">
                <div className="time d-flex align-items-center gap--5">
                  <i className="fa-regular fa-clock"></i>
                  <span>{tour.openingHours}</span>
                </div>
                <div className="tour-btn">
                  <button
                    onClick={() => setModalData(tour)}
                    className="bd-text-btn style-two"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#popUpBookingForm"
                  >
                    Book Now
                    <span className="icon__box">
                      <i className="fa-regular fa-arrow-right-long icon__first"></i>
                      <i className="fa-regular fa-arrow-right-long icon__second"></i>
                    </span>
                  </button>
                  <button
  className="delete-btn"
  onClick={() => handleDeletePlace(tour._id)} // Pass both placeId and governorId
  type="button"
>
  <i className="fa-solid fa-trash" style={{ color: "red" }}></i>
</button>
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
