

"use client";
import GetRatting from "@/hooks/GetRatting";
import { imageLoader } from "@/hooks/image-loader";
import useGlobalContext from "@/hooks/use-context";
import { Activity } from "@/interFace/interFace";
import Image from "next/image";
import Link from "next/link";
import React ,{useState, useEffect} from "react";
import { toggleFlagActivity, isActivityBooked, toggleBookingState,saveOrUnsaveActivityApi, checkIfActivitySaved  } from '@/api/activityApi';
import { useRouter } from "next/navigation";
import { useCurrency } from "@/contextApi/CurrencyContext"; // Import currency context
import Modal from "react-modal";
import { toast } from 'sonner';
import { FaRegClock } from "react-icons/fa";
import { deleteActivityApi } from '@/api/activityApi'; 

interface DecodedToken {
  username: string;
  id: string; // Use 'id' instead of 'userId'
  role: string;
  mustChangePassword: boolean;
//   iat: number; // Add this if included in the token payload
}
const token = Cookies.get("token");
import {fetchImage} from "@/api/activityApi"
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
interface DecodedToken {
  username: string;
  id: string; // Use 'id' instead of 'userId'
  role: string;
  mustChangePassword: boolean;
}
//   iat: number; // Add this if included in the token payload
//   iat: number; // Add this if included in the token payload

interface ItourPropsType {
  tour: Activity; // Use Itinerary type
  className: string;
  tourWrapperClass: string;
  isparentClass: boolean;
  isAdmin?: boolean;
  isAdvertiser?: boolean;
  onUnsaved?: (id: string) => void; // Add this new prop
}

const TourSingleCard = ({
  tour,
  className,
  tourWrapperClass,
  isparentClass,
  isAdmin = false,
  isAdvertiser = false,
  onUnsaved,
}: ItourPropsType) => {
  const { setModalData } = useGlobalContext();
  const router = useRouter();
  const rating = tour.averageRating ; // Use Itinerary's averageRating, default to 1
  // Local state to keep track of the flagged and deactivated status
  const [isFlagged, setIsFlagged] = useState(tour.flagged);
  const { currency, convertAmount } = useCurrency(); 
  const [isBooked, setIsBooked] = useState(false);
  const [convertedPrice, setConvertedPrice] = useState<number | null>(null);
  const [bookingState, setBookingState] = useState(tour.bookingOpen);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility
  const [modalAction, setModalAction] = useState(""); // To track the action (Open/Close Booking)
  const [isSaved, setIsSaved] = useState(false);
  const DEFAULT_IMAGE = "/assets/images/Activity.jpeg";
 const [imageUrl, setImageUrl] = useState<string>(DEFAULT_IMAGE);
 const [touristId, setTouristId] = useState<string>("");


  // const touristId = "67240ed8c40a7f3005a1d01d";
  // Extract the tourist ID from the token when the component mounts
  useEffect(() => {
    try {
      const token = Cookies.get("token");
      if (token) {
        const decodedToken = jwtDecode<DecodedToken>(token);
        setTouristId(decodedToken.id); // Set tourist ID
        console.log("Decoded Token:", decodedToken);
      } else {
        console.error("No token found. Please log in.");
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }, []);

   // Fetch booking status when component mounts
   useEffect(() => {
    const checkIfBooked = async () => {
      try {
        const bookedStatus = await isActivityBooked(tour._id);
        setIsBooked(bookedStatus);
      } catch (error) {
        console.error("Error checking booked status:", error);
      }
    };
    checkIfBooked();
  }, [tour._id]);
  useEffect(() => {
    const convertTourPrice = async () => {
      if (tour.price) {
        const priceInSelectedCurrency = await convertAmount(tour.price);
        setConvertedPrice(priceInSelectedCurrency);
      }
    };
    convertTourPrice();
  }, [currency, tour.price, convertAmount]); 

  const handleDeleteActivity = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this activity?");
    if (!confirmDelete) return;

    const toastId = toast.loading("Deleting activity...");
    try {
        await deleteActivityApi(tour._id, tour.advertiser); // Use the correct property
        toast.success("Activity deleted successfully!", { id: toastId });

        if (onUnsaved) {
            onUnsaved(tour._id); // Call the parent-provided function to update the list
        }
    } catch (error: any) {
        console.error("Error deleting activity:", error);
        toast.error("Failed to delete activity. Please try again.", { id: toastId });
    }
};
//   useEffect(() => {
//     const fetchSavedStatus = async () => {
//       try {
//         if (!tour._id ) {
//           console.error("Missing IDs: Cannot fetch activity id.");
//           return;
//         }
//         if(!tour.touristIDs){

//           console.error("Missing IDs: Cannot fetch tourist id.");
// return;
//         }
  
//         // Fetch saved status (true/false) from the backend
//         const isSavedStatus = await saveOrUnsaveActivityApi(
//           //tour.touristIDs[0], // Pass the tourist ID
//           tour._id, 
//           false // Fetch current status; no save/unsave action
//         );
  
//         // Update the local state to reflect the saved status
//         setIsSaved(isSavedStatus);
//       } catch (error) {
//         console.error("Error fetching saved status:", error);
//       }
//     };
  
//     fetchSavedStatus();
//   }, [tour._id, touristId]);

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

  useEffect(() => {
    const fetchSavedActivityStatus = async () => {
      try {
        const isSavedStatus = await checkIfActivitySaved(touristId, tour._id); // Call the new API
        setIsSaved(isSavedStatus); // Update the state
      } catch (error) {
        console.error("Error fetching saved activity status:", error);
        setIsSaved(false); // Default to not saved on error
      }
    };
  
    fetchSavedActivityStatus(); // Call the function to fetch the status
  }, [tour._id, touristId]); // Ensure it runs when either changes
  

  const handleFlagActivity = async () => {
    
    try {
      // Toggle the flagged state in the backend
      await toggleFlagActivity(tour._id, !isFlagged);
      setIsFlagged((prevFlagged) => !prevFlagged);
    } catch (error) {
      console.error("Error updating flagged status:", error);
    }
  };

  const handleBookNowClick = () => {
    // Redirect to the specific page (replace "/booking-page" with the desired path)
    if (!token) {
      toast.error("Please sign in to book itineraries.");
      router.push("/sign-in");
      return;
    }
    router.push(`/booking-activity/${tour._id}`);
  };

  const handleToggleBooking = (action: string) => {
    setModalAction(action); // Set the action (Open or Close)
    setIsModalOpen(true); // Open the modal
  };
  
  const confirmToggleBooking = async () => {
    const toastId = toast.loading("Processing your Request...");
    try {
      const newBookingState = modalAction === "Open"; // Determine the new state
      await toggleBookingState(tour._id, newBookingState); // Call the backend API
      setBookingState(newBookingState); // Update state after successful API call
      setIsModalOpen(false); // Close the modal
      console.log(`Booking state toggled to: ${newBookingState ? "Open" : "Closed"}`);
      toast.success(`Booking state toggled to ${newBookingState ? 'Open' : 'Closed'} successfully!`, { id: toastId, duration: 1000 });
    } catch (error) {
      console.error("Error toggling booking state:", error);
      toast.error('Failed to toggle booking state. Please try again.', { id: toastId });
    }
  };

  const handleSave = async () => {
    if (!token) {
      toast.error("Please sign in to save itineraries.");
      router.push("/sign-in");
      return;
    }
   
    try {
      if (!tour._id?.length) {
        console.error("Missing IDs: Cannot perform save/unsave action.");
        return;
      }
      if (!touristId) {
        console.error("Tourist ID is missing.");
        return;
      }
      const action = !isSaved; // Determine action based on current state (save if not saved, unsave if saved)
      const saveResult = await saveOrUnsaveActivityApi(
      //  touristId, // Pass first tourist ID
        tour._id, 
        action // Save (true) or Unsave (false)
      );
  
      
      if (saveResult) {
        setIsSaved(action); // Update state to reflect the action
        toast.success(`Activity ${isSaved ? 'unsaved' : 'saved'} successfully!`);
        if (onUnsaved) {
          onUnsaved(tour._id); // Call the parent callback
        }        
      } else {
        console.error("Failed to toggle save/unsave:", saveResult);
        toast.error("Failed to toggle save/unsave. Please try again later");
      }
    } catch (error) {
      console.error("Error saving/unsaving activity:", error);
      
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
                <div className="tour-location">
                  <span>
                    <Link href={`/activity-details/${tour._id}`}>
                      <i className="fa-regular fa-location-dot"></i>{" "}
                      {tour.location || "Location not available"}
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
              {isAdmin && (
                  <button
                    onClick={handleFlagActivity}
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
                
              <span className="tour-price b3">
                {currency}{" "}
                {convertedPrice !== null
                  ? convertedPrice.toFixed(2)
                  : tour.price.toLocaleString("en-US")}
              </span>

              <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 className="tour-title fw-5 underline custom_mb-5"> </h5>
             {token && ( <div className="bookmark-container">
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
              top: "-5px", // Adjust height, lift the icon slightly
              }}
                >
            <i className={`fa${isSaved ? "s" : "r"} fa-bookmark`}></i> {/* Solid for saved, Regular for unsaved */}
            </span>
            </div>)}
            </div>
              <div className="tour-divider"></div>

              <div className="tour-meta d-flex align-items-center justify-content-between">
                <div className="time d-flex align-items-center gap--5" >
                {(!isAdvertiser) && <FaRegClock />}
                  {(!isAdvertiser) && <span>{tour.time}</span>}
                </div>
                <div className="tour-btn">
                {/* {isAdvertiser && (
                  <button
                    onClick={handleToggleBooking}                  
                    style={{
                      backgroundColor: bookingState ? "red" : "green",
                      color: "white",
                      padding: "8px 16px",
                      fontSize: "14px",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    {bookingState ? "Close Booking" : "Open Booking"}
                  </button>
                )} */}
                
                {isAdvertiser && <button
                    onClick={() => handleToggleBooking(bookingState ? "Close" : "Open")} 
                    className="bd-text-btn style-two"
                    type="button"
                    style={{
                      color:  bookingState ? "red" : "blue"
                     }}
                  >
                   {bookingState ? "Close Booking" : "Open Booking"}
                    <span className="icon__box">
                    <i className="fa-regular fa-arrow-right-long icon__first"></i>
                    <i className="fa-regular fa-arrow-right-long icon__second"></i>
                    </span>
                  </button>}
                  <div className="tour-btn">
    {isAdvertiser && (
        <button
            onClick={handleDeleteActivity}
            className="bd-text-btn style-two"
            type="button"
            style={{ color: "red", marginLeft: "10px" }}
        >
            <i className="fa fa-trash"></i> 
        </button>
    )}
</div>
                  <Modal
                    isOpen={isModalOpen}
                    onRequestClose={() => setIsModalOpen(false)}
                    contentLabel="Confirm Booking Action"
                    style={{
                      content: {
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        right: "auto",
                        bottom: "auto",
                        marginRight: "-50%",
                        transform: "translate(-50%, -50%)",
                        background: "white",
                        padding: "20px",
                        borderRadius: "10px",
                        width: "500px",
                        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
                      },
                      overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.75)",
                      },
                    }}
                  >
                    <h3>Confirm {modalAction} Booking</h3>
                    <p>Are you sure you want to {modalAction.toLowerCase()} booking for this activity?</p>
                    <div style={{ display: "flex", marginTop: "20px" }}>
                      <button
                        onClick={confirmToggleBooking}
                        className="bd-primary-btn btn-style radius-60"
                        style={{
                          marginRight: "10px",
                        }}
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

                
                {(!isAdvertiser) && <button
                    onClick={isBooked ? undefined : handleBookNowClick} // Disable click if already booked
                    className="bd-text-btn style-two"
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
                  </button>}
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
    </>
  );
};

export default TourSingleCard;
