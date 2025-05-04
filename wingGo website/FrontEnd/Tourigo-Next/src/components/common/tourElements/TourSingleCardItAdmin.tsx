// TourSingleCardIt.tsx

"use client";
import GetRatting from "@/hooks/GetRattingIt";
import { imageLoader } from "@/hooks/image-loader";
import useGlobalContext from "@/hooks/use-context";
import { Itinerary } from "@/interFace/interFace";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toggleFlagItinerary, toggleItineraryActivation, isItineraryBooked } from '@/api/itineraryApi';
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { useCurrency } from "@/contextApi/CurrencyContext"; // Import currency context
import Modal from "react-modal"; // Import Modal from react-modal
import { toast } from "sonner";
import { fetchItImage } from "@/api/itineraryApi";
import { FaRegClock } from "react-icons/fa";

interface ItourPropsType {
  tour: Itinerary; // Use Itinerary type
  className: string;
  tourWrapperClass: string;
  isparentClass: boolean;
  isAdmin?: boolean; // Optional prop to check if the view is admin
  isTourGuide?: boolean; // Optional prop to check if the view is tour guide
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
  const rating = tour.averageRating ; // Use Itinerary's averageRating, default to 1
  const { currency, convertAmount } = useCurrency(); // Access currency and conversion function
  const [convertedPrice, setConvertedPrice] = useState<number | null>(null);
  const router = useRouter(); // Initialize router

  // Local state to keep track of the flagged and deactivated status
  const [isFlagged, setIsFlagged] = useState(tour.flagged);
  const [isDeactivated, setIsDeactivated] = useState(tour.deactivated);

  const [isBooked, setIsBooked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const DEFAULT_IMAGE = "/assets/images/Itinerary.png";
  const [imageUrl, setImageUrl] = useState<string>(DEFAULT_IMAGE);


  useEffect(() => {
    const checkBookingStatus = async () => {
      try {
        const bookedStatus = await isItineraryBooked(tour._id); // Fetch booking status
        setIsBooked(bookedStatus);
      } catch (error) {
        console.error("Error checking booking status:", error);
      }
    };

    checkBookingStatus();
  }, [tour._id]);
  useEffect(() => {
    const convertTourPrice = async () => {
      if (tour.price) {
        const priceInSelectedCurrency = await convertAmount(tour.price);
        setConvertedPrice(priceInSelectedCurrency);
      }
    };
    convertTourPrice();
  }, [currency, tour.price, convertAmount]); // Re-run if currency or tour.price changes

  useEffect(() => {
    const loadImage = async () => {
      try {
        if (tour._id && tour.photo) { // Check if the item has an image
          const url = await fetchItImage(tour._id);
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
  }, [tour._id, tour.photo,imageUrl]);


  const handleFlagItinerary = async () => {
    setIsModalOpen(true);
  };

  const confirmFlagActivity = async () => {
    const toastId = toast.loading("Processing your Request...");
    try {
      // Toggle the flagged state in the backend
      await toggleFlagItinerary(tour._id, !isFlagged);
      setIsFlagged((prevFlagged) => !prevFlagged);
      setIsModalOpen(false);
      toast.success(isFlagged?"Itinerary Unflagged Successfully!": "Itinerary Flagged Successfully!", { id: toastId, duration: 1000 });
    } catch (error) {
      console.error("Error updating flagged status:", error);
      toast.error("Error updating flagged status.", { id: toastId });
    }
  };

  const handleToggleActivation = async () => {
    try {
      await toggleItineraryActivation(tour._id, !isDeactivated);
      setIsDeactivated((prevDeactivated) => !prevDeactivated);
    } catch (error) {
      console.error("Error toggling activation status:", error);
    }
  };

  const handleBookNowClick = () => {
    router.push(`/booking-it/${tour._id}`);
  };

  return (
    <>
      {isparentClass ? (
        <div className={className}>
          <div className={tourWrapperClass}>
            <div className="p-relative">
              <div className="tour-thumb image-overly">
                <Link href={`/it-details/${tour._id}`}>
                <Image
                    src={imageUrl}
                    loader={imageLoader}
                    width={270}
                    height={270}
                    style={{ width: "300px", height: "250px" }}
                    alt="Itinerary Image"
                    unoptimized 
                    
                  />
                </Link>
              </div>
              <div className="tour-meta d-flex align-items-center justify-content-between">
                
                <div className="tour-location">
                  <span>
                    <Link href={`/it-details/${tour._id}`}>
                      <i className="fa-regular fa-location-dot"></i>{" "}
                      {tour.locations[0] || "Location not available"}
                    </Link>
                  </span>
                </div>
              </div>
            </div>
            <div className="tour-content">
              <div className="tour-rating d-flex align-items-center gap-10 mb-10">
                <div className="tour-rating-icon fs-14 d-flex rating-color">
                  <GetRatting averageRating={rating} ratingExists={tour.ratings.length>0} />
                </div>
                <div className="tour-rating-text">
                  <span>
                    {rating.toFixed(1)} ({tour.ratings.length} Ratings)
                  </span>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="tour-title fw-5 underline custom_mb-5">
                  <Link href={`/it-details/${tour._id}`}>
                    {tour.title}
                  </Link>
                </h5>
                {isTourGuide && (
                  <button
                    onClick={handleToggleActivation}
                    className="activate-itinerary-button"
                    style={{
                      backgroundColor: isDeactivated ? "orange" : "blue",
                      color: "white",
                      padding: "8px 16px",
                      fontSize: "14px",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    {isDeactivated ? "Activate" : "Deactivate"}
                  </button>
                )}
              </div>
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
                  <span>{tour.duration}</span>
                </div>
                <div className="tour-btn">
                <button
                    onClick={handleFlagItinerary}
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
        <div className={tourWrapperClass}></div>
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
        <h3> {isFlagged?"Confirm Unflag Itinerary":"Confirm Flag Itinerary"}</h3>
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
