"use client";
import GetRatting from "@/hooks/GetRatting";
import { imageLoader } from "@/hooks/image-loader";
import useGlobalContext from "@/hooks/use-context";
import { Activity } from "@/interFace/interFace";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { toggleFlagActivity } from '@/api/activityApi';
import { useRouter } from "next/navigation";
import { useCurrency } from "@/contextApi/CurrencyContext"; // Import currency context
import Modal from "react-modal"; // Import Modal from react-modal
import { toast } from "sonner";
import { FaRegClock } from "react-icons/fa";
import {fetchImage} from "@/api/activityApi"


interface ItourPropsType {
  tour: Activity; // Use Itinerary type
  className: string;
  tourWrapperClass: string;
  isparentClass: boolean;
  isAdmin?: boolean;
}

const TourSingleCard = ({
  tour,
  className,
  tourWrapperClass,
  isparentClass,
  isAdmin = false,
}: ItourPropsType) => {
  const { setModalData } = useGlobalContext();
  const router = useRouter();
  const rating = tour.averageRating; // Use Itinerary's averageRating, default to 1
  // Local state to keep track of the flagged and deactivated status
  const [isFlagged, setIsFlagged] = useState(tour.flagged);
  const { currency, convertAmount } = useCurrency();
  const [convertedPrice, setConvertedPrice] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const DEFAULT_IMAGE = "/assets/images/Activity.jpeg";
const [imageUrl, setImageUrl] = useState<string>(DEFAULT_IMAGE);



  useEffect(() => {
    const convertTourPrice = async () => {
      if (tour.price) {
        const priceInSelectedCurrency = await convertAmount(tour.price);
        setConvertedPrice(priceInSelectedCurrency);
      }
    };
    convertTourPrice();
  }, [currency, tour.price, convertAmount]);

  const handleFlagActivity = async () => {
    setIsModalOpen(true);
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

  const confirmFlagActivity = async () => {
    const toastId = toast.loading("Processing your Request...");
    try {
      // Toggle the flagged state in the backend
      await toggleFlagActivity(tour._id, !isFlagged);
      setIsFlagged((prevFlagged) => !prevFlagged);
      setIsModalOpen(false);
      toast.success(isFlagged?"Activity Unflagged Successfully!": "Activity Flagged Successfully!", { id: toastId, duration: 1000 });
    } catch (error) {
      console.error("Error updating flagged status:", error);
      toast.error("Error updating flagged status.", { id: toastId });
    }
  };

  return (
    <>
      {isparentClass ? (
        <div className={className}>
          <div className={tourWrapperClass}>
            <div className="p-relative">
              <div className="tour-thumb image-overly">
                <Link href={`/activity-details/${tour._id}`}>
                  <Image
                    src={imageUrl}
                    loader={imageLoader}
                    width={270}
                    height={270}
                    style={{ width: "300px", height: "250px" }}
                    alt="Activity Image"
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
                    <Link href={`/activity-details/${tour._id}`}>
                      <i className="fa-regular fa-location-dot"></i>{" "}
                      { tour.location || "Location not available"}
                    </Link>
                  </span>
                </div>
              </div>
            </div>
            <div className="tour-content">
              <div className="tour-rating d-flex align-items-center gap-10 mb-10">
                <div className="tour-rating-icon fs-14 d-flex rating-color">
                  <GetRatting averageRating={rating} />
                </div>
                <div className="tour-rating-text">
                  <span>
                    {rating.toFixed(1)} ({tour.ratings.length} Ratings)
                  </span>
                </div>
              </div>
              <h5 className="tour-title fw-5 underline custom_mb-5">
                <Link href={`/activity-details/${tour._id}`}>
                  {tour.name}
                </Link>
              </h5>
              <span className="tour-price b3">
                {currency}{" "}
                {convertedPrice !== null
                  ? convertedPrice.toFixed(2)
                  : tour.price.toLocaleString("en-US")}
              </span>
              <div className="tour-divider"></div>

              <div className="tour-meta d-flex align-items-center justify-content-between">
                <div className="time d-flex align-items-center gap--5">
                <FaRegClock />
                  <span>{tour.time}</span>
                </div>
                <div className="tour-btn">
                  <button
                    onClick={handleFlagActivity}
                    className="bd-text-btn style-two"
                    type="button"
                    style={{
                      cursor: "pointer",
                      color: isFlagged ? "blue" : "red",
                    }}
                  >
                    {isFlagged ? "Unflag" : "Flag"}
                    <span className="icon__box">
                      <i className="fa-regular fa-arrow-right-long icon__first"></i>
                      <i className="fa-regular fa-arrow-right-long icon__second"></i>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Non-parent layout, adjust as needed
        <div className={tourWrapperClass}>
          {/* Non-parent layout logic can go here if needed */}
        </div>
      )}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Confirm Flag Activity"
        style={{
          content: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            background: 'white',
            padding: '20px',
            borderRadius: '10px',
            width: '500px',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)'
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)'
          }
        }}
      >
        <h3>{isFlagged?"Confirm Unflag Activity":"Confirm Flag Activity"}</h3>
        <p>Are you sure you want to toggle the flag status?</p>
        <div style={{ display: 'flex', marginTop: '20px' }}>
          <button
            onClick={confirmFlagActivity}
            className="bd-primary-btn btn-style radius-60"
            style={
                {
                    marginRight: '10px'
            }
        }
          >
            Yes
          </button>
          <button
            onClick={() => setIsModalOpen(false)}
            className="bd-primary-btn btn-style radius-60"
          >
            No
          </button>
        </div>
      </Modal>
    </>
  );
};

export default TourSingleCard;