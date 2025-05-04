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
import { toggleFlagItinerary, toggleItineraryActivation, isItineraryBooked,toggleSaveItinerary, checkIfSaved } from '@/api/itineraryApi';
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { useCurrency } from "@/contextApi/CurrencyContext"; // Import currency context
import { toast } from 'sonner';import { fetchItImage } from "@/api/itineraryApi";
import { FaRegClock } from "react-icons/fa";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';


interface DecodedToken {
  username: string;
  id: string; // Use 'id' instead of 'userId'
  role: string;
  mustChangePassword: boolean;
//   iat: number; // Add this if included in the token payload
}



interface ItourPropsType {
  tour: Itinerary; // Use Itinerary type
  className: string;
  tourWrapperClass: string;
  isparentClass: boolean;
  isAdmin?: boolean; // Optional prop to check if the view is admin
  isTourGuide?: boolean; // Optional prop to check if the view is tour guide
  onUnsaved?: (id: string) => void;
}

const TourSingleCard = ({
  tour,
  className,
  tourWrapperClass,
  isparentClass,
  isAdmin = false,
  isTourGuide = false,
  onUnsaved,
  
  
}: ItourPropsType) => {
  const { setModalData } = useGlobalContext();
  const rating = tour.averageRating ; // Use Itinerary's averageRating, default to 1
  const { currency, convertAmount } = useCurrency(); // Access currency and conversion function
  const [convertedPrice, setConvertedPrice] = useState<number | null>(null);
  const router = useRouter(); // Initialize router

  // Local state to keep track of the flagged and deactivated status
  const [isFlagged, setIsFlagged] = useState(tour.flagged);
  const [isDeactivated, setIsDeactivated] = useState(tour.deactivated);
  const DEFAULT_IMAGE = "/assets/images/Itinerary.png";
  const [imageUrl, setImageUrl] = useState<string>(DEFAULT_IMAGE);
  const [isBooked, setIsBooked] = useState(false);
  const [isSaved, setIsSaved] = useState(false); // Initialize as null
  const [touristId, setTouristId] = useState<string>("");

  const token = Cookies.get("token");

  useEffect(() => {
    // Extract `touristId` from the token
    const token = Cookies.get("token");
    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        setTouristId(decodedToken.id);
        console.log("Tourist ID:", decodedToken.id);
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    } else {
      console.error("No token found.");
    }
  }, []);


  useEffect(() => {
    const fetchSavedStatus = async () => {
      try {
        const isSavedStatus = await checkIfSaved(touristId, tour._id); // Call the new API
        setIsSaved(isSavedStatus); // Update the state
      } catch (error) {
        console.error("Error fetching saved status:", error);
        setIsSaved(false); // Default to not saved on error
      }
    };
  
    fetchSavedStatus(); // Call the function to fetch the status
  }, [tour._id, touristId]); // Ensure it runs when either changes
  

  console.log("status: ",isSaved); 

  
  useEffect(() => {
    console.log("CHECKINGG22");
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
    try {
      // Toggle the flagged state in the backend
      await toggleFlagItinerary(tour._id, !isFlagged);
      setIsFlagged((prevFlagged) => !prevFlagged);
    } catch (error) {
      console.error("Error updating flagged status:", error);
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
    if (!token) {
      toast.error("Please sign in to book itineraries.");
      router.push("/sign-in");
      return;
    }
    router.push(`/booking-it/${tour._id}`);
  };
  
  // useEffect(() => {
  //   const fetchSavedStatus = async () => {
  //     try {
      
  //       const savedItineraries = await axios.get(`http://localhost:8000/tourist/savedItineraries/${touristId}`);
  //       // Check if the current itinerary ID is in the tourist's saved itineraries
  //       const isSavedStatus = savedItineraries.data.includes(tour._id);
        
  //       setIsSaved(isSavedStatus);
  //     } catch (error) {
  //       console.error("Error fetching saved status:", error);
  //     }
  //   };
  
  //   fetchSavedStatus();
  // }, [tour._id]);
  


  const handleSave = async () => {
    if (!token) {
      toast.error("Please sign in to save itineraries.");
      router.push("/sign-in");
      return;
    }
  
    try {
      const result = await toggleSaveItinerary(touristId, tour._id);
  
      if (result.savedItineraries.includes(tour._id)) {
        setIsSaved(true); // Set as saved
      } else {
        setIsSaved(false); // Set as unsaved
        if (onUnsaved) {
          onUnsaved(tour._id); // Call the parent callback
        }
      }
      toast.success(`Itinerary ${isSaved ? 'unsaved' : 'saved'} successfully!`);
    } catch (error) {
      console.error("Error toggling save/unsave itinerary:", error);
      toast.error("Failed to toggle save/unsave. Please try again later");
    }
  };
  
// const handleSave = async () => {
//   try {
//     const result = await toggleSaveItinerary(touristId, tour._id);

//     if (result.savedItineraries.includes(tour._id)) {
//       setIsSaved(true); // Set as saved
//     } else {
//       setIsSaved(false); // Set as unsaved
//       if (onUnsaved) {
//         onUnsaved(tour._id); // Call the parent callback
//       }
//     }
//     toast.success(`Itinerary ${isSaved ? 'unsaved' : 'saved'} successfully!`);
    
//   } catch (error) {
//     console.error("Error toggling save/unsave itinerary:", error);
//     toast.error("Failed to toggle save/unsave. Please try again later");
//   }
// };

  
  
  
  
  

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
                {isAdmin && (
                  <button
                    onClick={handleFlagItinerary}
                    className="flag-itinerary-button"
                    style={{
                      backgroundColor: isFlagged ? "green" : "red",
                      color: "white",
                      padding: "8px 16px",
                      fontSize: "14px",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    {isFlagged ? "Unflag" : "Flag"}
                  </button>
                )}
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
              <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 className="tour-title fw-5 underline custom_mb-5"> </h5>
              {token && (<div className="bookmark-container">
              {/* <span
              className={`bookmark-icon ${isSaved ? "bookmarked" : ""}`}
              onClick={handleSave}
              title={isSaved ? "Unsave Itinerary" : "Save Itinerary"}
              style={{
              cursor: "pointer",
              fontSize: "24px",
              color: isSaved ? "gold" : "gray",
              transition: "color 0.3s ease",
              position: "relative",
              top: "-5px", // Adjust height, lift the icon slightly
              }}
                >
            <i className={`fa${isSaved ? "s" : "r"} fa-bookmark`}></i> 
            </span> */}
                        <span
              className={`bookmark-icon ${isSaved ? "bookmarked" : ""}`}
              onClick={handleSave}
              title={isSaved ? "Unsave Itinerary" : "Save Itinerary"}
              style={{
                cursor: "pointer",
                fontSize: "24px",
                color: isSaved ? "gold" : "gray",
                transition: "color 0.3s ease",
                position: "relative",
                top: "-5px",
              }}
            >
              <i className={`fa${isSaved ? "s" : "r"} fa-bookmark`}></i>
            </span>

            </div>)}
            </div>

              <div className="tour-divider"></div>

              <div className="tour-meta d-flex align-items-center justify-content-between">
                <div className="time d-flex align-items-center gap--5">
                {(!isTourGuide) && <FaRegClock />}
                {(!isTourGuide) && <span>{tour.duration}</span>}
                </div>
                <div className="tour-btn">
                <button
                    onClick={handleBookNowClick}
                    className={`bd-text-btn style-two ${isBooked ? "disabled" : ""}`}
                    type="button"
                    style={{
                      cursor: isBooked ? "not-allowed" : "pointer",
                      color: isBooked ? "gray" : "inherit",
                    }}
                    disabled={isBooked}
                  >
                    {isBooked ? "Booked!" : "Book Now"}
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
    </>
  );
};

export default TourSingleCard;
