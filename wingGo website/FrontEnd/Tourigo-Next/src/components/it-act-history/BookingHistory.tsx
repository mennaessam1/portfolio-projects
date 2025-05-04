//BookingHistory.tsx
"use client";
import { imageLoader } from '@/hooks/image-loader';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { getBookedItinerariesData } from '@/data/it-data';
// import { getBookedActivitiesData } from '@/data/act-data';
import { BookedItinerary ,BookedActivity} from '@/interFace/interFace';
import {Activity} from '@/interFace/interFace';
import Link from 'next/link';
import RateCommentModal from './RateCommentModal';
import RateCommentModalActivity from './RateCommentModalActivity';
import { cancelItineraryApi, getPaidPriceApi  } from '@/api/itineraryApi';
import { cancelActivityApi, fetchFilteredActivities, getPaidPriceApiAct } from '@/api/activityApi';
import CancelConfirmationModal from "./CancelConfirmationModal"; // Import the new modal component
import { useCurrency } from "@/contextApi/CurrencyContext"; 
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { toast } from "sonner";


interface DecodedToken {
  username: string;
  id: string; // Use 'id' instead of 'userId'
  role: string;
  mustChangePassword: boolean;
//   iat: number; // Add this if included in the token payload
}

interface FilterOptions {
    date?: string;
    
  
  }

const BookingHistory = () => {
    const [bookedItineraries, setBookedItineraries] = useState<BookedItinerary[]>([]);
    const [selectedBooking, setSelectedBooking] = useState<BookedItinerary | null>(null);
    // const [bookedActivities, setBookedActivities] = useState<BookedActivity[]>([]);
    const [selectedBooking_act, setSelectedBooking_act] = useState<Activity | null>(null);
    const [activeTab, setActiveTab] = useState('itinerary'); // New state for tab selection
    // const touristId = "67240ed8c40a7f3005a1d01d";
    const currentDate = new Date();
    const { currency, convertAmount } = useCurrency(); // Access currency and conversion function
    const [convertedItineraryPrices, setConvertedItineraryPrices] = useState<{ [key: string]: number }>({});
    const [convertedActivityPrices, setConvertedActivityPrices] = useState<{ [key: string]: number }>({});
    // const [filterType_it, setFilterType_it] = useState<'all' | 'past' | 'upcoming'>('all');
    const [filterType, setFilterType] = useState<'all' | 'past' | 'upcoming'>('all');
    // const [filteredActivities, setFilteredActivities] = useState<BookedActivity[]>([]);
    const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);
    const [filters, setFilters] = useState<FilterOptions>({});
    const [loading, setLoading] = useState(false);
    const [touristId, setTouristId] = useState<string>("");
    const [paidPrices, setPaidPrices] = useState<{ [key: string]: number }>({});
    const [paidPricesAct, setPaidPricesAct] = useState<{ [key: string]: number }>({});
    

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

    


    const [showCancelModal, setShowCancelModal] = useState(false);
    const [bookingToCancel, setBookingToCancel] = useState<BookedItinerary | null>(null);

    const handleCancelBookingClick = (booking: BookedItinerary) => {
        setBookingToCancel(booking);
        setShowCancelModal(true);
    };

    const [showCancelModalAct, setShowCancelModalAct] = useState(false);
    const [bookingToCancelAct, setBookingToCancelAct] = useState<Activity | null>(null);

    const handleCancelBookingClick_act = async (booking: Activity) => {
        console.log("Booking to cancel:", booking);
        console.log("Booking to cancel:", booking);
setBookingToCancelAct(booking);
setShowCancelModalAct(true);

    };
    useEffect(() => {
        console.log("Modal state changed:", showCancelModalAct);
    }, [showCancelModalAct]);
    

    const confirmCancellationAct = async () => {
        if (!bookingToCancelAct) return;
    
        try {
            await cancelActivityApi(bookingToCancelAct._id);
            toast.success("Activity booking canceled successfully");
            setFilteredActivities((prev) =>
                prev.filter((item) => item._id !== bookingToCancelAct._id)
            );
        } catch (error: any) {
            if (error.response?.data?.message === "Cannot cancel the activity within 48 hours of the booking date.") {
                toast.error("Cannot cancel the activity within 48 hours of the booking date.");
            } else {
                toast.error("Failed to cancel the activity booking. Please try again later.");
            }
        } finally {
            setShowCancelModalAct(false);
            setBookingToCancelAct(null);
        }
    };
    
    const closeCancelModalAct = () => {
        setShowCancelModalAct(false);
        setBookingToCancelAct(null);
    };
    


    const loadFilteredActivities = async () => {
        try {
            setLoading(true); // Set loading to true
            setFilteredActivities([]); // Clear previous activities
    
            const apiFilters = { filterType }; // Use the current filterType
            const data = await fetchFilteredActivities(apiFilters); // Fetch filtered activities
            console.log("Filtered Activities from API:", data);
    
            setFilteredActivities(data); // Update state with new data
        } catch (error) {
            console.error("Failed to fetch filtered activities:", error);
        } finally {
            setLoading(false); // Set loading to false
        }
    };
    
    
    
    
    

      // Fetch filtered activities when filterType or activeTab changes
      useEffect(() => {
        if (activeTab === 'activity') {
            loadFilteredActivities();
        }
    }, [filterType, activeTab]);
    


    const applyFilters = (newFilters: FilterOptions) => {
        setFilters((prevFilters) => ({
          ...prevFilters,
          ...newFilters, // Update filters with new values
        }));
      };
    

    useEffect(() => {
        console.log('Filtered Activities Updated:', filteredActivities);
    }, [filteredActivities]);
    

    const confirmCancellation = async () => {
        if (!bookingToCancel) return;

        try {
            await cancelItineraryApi(bookingToCancel.itinerary._id);
            setBookedItineraries((prev) =>
                prev.filter((item) => item.itinerary._id !== bookingToCancel.itinerary._id)
            );
            toast.success("Booking canceled successfully");
            // alert('Booking canceled successfully');
        } catch (error: any) {
            if (error.response?.data?.message === 'Cannot cancel the itinerary within 48 hours of the booking date.') {
                // alert("Cannot cancel the itinerary within 48 hours of the booking date.");
                toast.error("Cannot cancel the itinerary within 48 hours of the booking date"); 
            } else {
                toast.error("Failed to cancel the booking. Please try again later"); 
                // alert('Failed to cancel the booking');
            }
        } finally {
            setShowCancelModal(false);
            setBookingToCancel(null);
        }
    };

    const closeCancelModal = () => {
        setShowCancelModal(false);
        setBookingToCancel(null);
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getBookedItinerariesData();
                setBookedItineraries(data);
            } catch (error) {
                console.error("Failed to load booked activities:", error);
            }
        };
        fetchData();
    }, []);



    const handleRateCommentClick = (booking: BookedItinerary) => {
        setSelectedBooking(booking);
    };

    const closeModal = () => {
        setSelectedBooking(null);
    };

    const isCancellable= (bookingDate: Date): boolean => {
        const now = new Date();
        const diffInMilliseconds = new Date(bookingDate).getTime() - now.getTime();
        return diffInMilliseconds >= 48 * 60 * 60 * 1000;
    };

    // const handleCancelBookingClick= async (booking: BookedItinerary) => {
    //     const userConfirmed = window.confirm("Are you sure you want to cancel this booking?");
    //     if (!userConfirmed) return;
    
    //     try {
    //         await cancelItineraryApi(touristId, booking.itinerary._id);
    //         alert('Booking canceled successfully');
    //         setBookedItineraries((prev) =>
    //             prev.filter((item) => item.itinerary._id !== booking.itinerary._id)
    //         );
    //     } catch (error: any) {
    //         if (error.response?.data?.message === 'Cannot cancel the itinerary within 48 hours of the booking date.') {
    //             alert("Cannot cancel the itinerary within 48 hours of the booking date.");
    //         } else {
    //             alert('Failed to cancel the booking');
    //         }
    //     }
    // };
    ////////////////////  Activity Part  /////////////////////////////////
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const Activities = await getBookedActivitiesData(touristId);
    //             // console.log("yay");
    //             // console.log(Activities);
    //             setFilteredActivities(Activities);
    //             const convertedPrices = await convertPrices(Activities, 'activity');
    //             setConvertedActivityPrices(convertedPrices);
    //         } catch (error) {
    //             console.error("Failed to load booked itineraries:", error);
    //         }
    //     };
    //     fetchData();
    // }, [currency]);
    // const convertPrices = async (
    //     bookings: BookedItinerary[] | BookedActivity[],
    //     type: 'itinerary' | 'activity'
    //   ) => {
    //     const convertedPrices: Record<string, number> = {};
    //     for (const booking of bookings) {
    //       const price = type === 'itinerary' ? (booking as BookedItinerary).itinerary.price : (booking as BookedActivity).activity.price;
    //       if (price) {
    //         const convertedPrice = await convertAmount(price);
    //         const id = type === 'itinerary' ? (booking as BookedItinerary).itinerary._id : (booking as BookedActivity).activity._id;
    //         convertedPrices[id] = convertedPrice;
    //       }
    //     }
    //     return convertedPrices;
    //   };


    const handleRateCommentClick_act = (booking: Activity) => {
        setSelectedBooking_act(booking);
    };

    const closeModal_act = () => {
        setSelectedBooking_act(null);
    };

    const isCancellable_act = (bookingDateString: string): boolean => {
        // Parse the booking date string to a Date object
        const bookingDate = new Date(bookingDateString);
    
        // Check if the parsed date is valid
        if (isNaN(bookingDate.getTime())) {
            console.error("Invalid date format. Please provide a valid date string.");
            return false;
        }
    
        const now = new Date();
        // Calculate the time difference in milliseconds
        const diffInMilliseconds = bookingDate.getTime() - now.getTime();
    
        // Check if the difference is 48 hours or more
        return diffInMilliseconds >= 48 * 60 * 60 * 1000;
    };
    
    

    const handleTabSwitch = (tab: 'itinerary' | 'activity') => {
        setActiveTab(tab);
        setFilterType('all'); // Reset filter to 'all' whenever the tab changes
        // setFilterType_it('all'); // Reset filter to 'all' whenever the tab changes
    };
    
   
      
    const fetchPaidPrice = async (itineraryId: string) => {
        try {
            const paidPrice = await getPaidPriceApi(itineraryId);
            console.log("price inn, ",paidPrice);
            return paidPrice;
        } catch (error) {
            console.error('Error fetching paid price:', error);
            return null;
        }
    };

    useEffect(() => {
        const fetchAllPaidPrices = async () => {
            const prices: { [key: string]: number } = {};
            for (const booking of bookedItineraries) {
                try {
                    const paidPrice = await fetchPaidPrice(booking.itinerary._id);
                    prices[booking.itinerary._id] = paidPrice || 0;
                } catch (error) {
                    console.error(`Error fetching price for itinerary ${booking.itinerary._id}:`, error);
                    prices[booking.itinerary._id] = 0;
                }
            }
            setPaidPrices(prices);
        };
    
        if (bookedItineraries.length > 0) {
            fetchAllPaidPrices();
        }
    }, [bookedItineraries]);

    useEffect(() => {
        const fetchAllPaidPricesAct = async () => {
            const prices: { [key: string]: number } = {};
            for (const activity of filteredActivities) {
                try {
                    const paidPrice = await getPaidPriceApiAct(activity._id);
                    prices[activity._id] = paidPrice || 0;
                } catch (error) {
                    console.error(`Error fetching price for activity ${activity._id}:`, error);
                    prices[activity._id] = 0; // Set default to 0 on error
                }
            }
            setPaidPricesAct(prices);
        };
    
        if (filteredActivities.length > 0) {
            fetchAllPaidPricesAct();
        }
    }, [filteredActivities]);
    
    


    return (
        <>
            <section className="bd-recent-activity section-space-small-bottom">
                <div className="container" style={{ paddingTop: "40px" }}>
                    <div className="row">
                        <div className="col-xxl-12">
                            <div className="recent-activity-wrapper">
                                <div className="section-title-wrapper section-title-space">
                                    <h2 className="section-title">Booking History</h2>

                                    {/* Tab Navigation */}
                                    <nav>
                                        <div className="nav nav-tabs" role="tablist" style={{ paddingTop: '7px' }}>
                                            <button
                                                className={`nav-link ${activeTab === 'itinerary' ? 'active' : ''}`}
                                                onClick={() => handleTabSwitch('itinerary')}
                                                type="button"
                                                role="tab"
                                                aria-selected={activeTab === 'itinerary'}
                                                style={{ marginRight: '10px' }}
                                            >
                                                Itinerary History
                                            </button>
                                            
                                            <button
                                                className={`nav-link ${activeTab === 'activity' ? 'active' : ''}`}
                                                onClick={() => handleTabSwitch('activity')}
                                                type="button"
                                                role="tab"
                                                aria-selected={activeTab === 'activity'}
                                            >
                                                Activity History
                                            </button>
                                        </div>
                                    </nav>
                                </div>

                                <div className="col-auto" style={{ paddingBottom: '30px'}}>
                    <select
                      className="sidebar-select"
                      value={filterType}
                      onChange={(e) => {
                        console.log("Filter Type Selected:", e.target.value); // Debug dropdown selection
                        setFilterType(e.target.value as 'all' | 'past' | 'upcoming');
                    }}
                      style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "5px",
                        border: "1px solid #ced4da",
                        fontSize: "16px",
                        color: "#495057",
                        backgroundColor: "#fff",
                        marginBottom: "15px",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        appearance: "none",
                        WebkitAppearance: "none",
                        MozAppearance: "none",
                        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'><path fill='%23999999' d='M2 0L0 2h4zM2 5L0 3h4z'/></svg>")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 10px center",
                        backgroundSize: "10px",
                      }}
                    >
                      <option value="all">All</option>
                      <option value="past">Past</option>
                      <option value="upcoming">Upcoming</option>
                      {/* Add more languages as needed */}
                    </select>

                                </div>

                                <div className="recent-activity-content">
                               
                                    <div className="table-responsive">
                                        {activeTab === 'itinerary' ? (
                                            <table className="table mb-0">
                                               
                                                <tbody>
                                                    {bookedItineraries
                                                    .filter((booking) => {
                                                        const isPast = new Date(booking.bookingDate) < currentDate;
                                                        if (filterType === 'past') return isPast;
                                                        if (filterType === 'upcoming') return !isPast;
                                                        return true; // 'all'
                                                    })
                                                    .map((booking) => (
                                                        <tr key={booking.itinerary._id} className="table-custom">
                                                            <td>
                                                                <div className="dashboard-thumb-wrapper p-relative">
                                                                    <div className="dashboard-thu   mb image-hover-effect-two position-relative">
                                                                        {/* <Image
                                                                            src=""
                                                                            loader={imageLoader}
                                                                            style={{ width: '100%', height: "auto" }}
                                                                            alt="itinerary image" 
                                                                        /> */}
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="recent-activity-title-box d-flex align-items-center gap-10">
                                                                    <div>
                                                                        <h5 className="tour-title fw-5 underline">
                                                                            <Link href={`/it-details/${booking.itinerary._id}`}>
                                                                                {booking.itinerary.title}
                                                                            </Link>
                                                                        </h5>
                                                                        <div className="recent-activity-location">
                                                                            Locations: {booking.itinerary.locations.join(", ")}
                                                                        </div>
                                                                        <p className="">Activities: {booking.itinerary.activities}</p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                            {showCancelModal && (
                                                            <CancelConfirmationModal
                                                                onConfirm={confirmCancellation}
                                                                onCancel={closeCancelModal}
                                                            />
                                                        )}



                                                            </td>
                                                            <td>
                                                                <div className="recent-activity-price-box">
                                                                    <h5 className="mb-10">
                                                                        {currency} {paidPrices[booking.itinerary._id]?.toFixed(2) || 'Loading...'}
                                                                    </h5>
                                                                    <p>Total Paid</p>
                                                                </div>
                                                            </td>

                                                            <td>
                                                                <div>
                                                                    {new Date(booking.bookingDate) < currentDate ? (
                                                                        <button
                                                                            onClick={() => handleRateCommentClick(booking)}
                                                                            className="bd-primary-btn btn-style radius-60 "
                                                                        >
                                                                            Rate & Comment
                                                                        </button>
                                                                    ) : (
                                                                        <button
                                                                            onClick={() => handleCancelBookingClick(booking)}
                                                                            className="bd-primary-btn btn-style radius-60"
                                                                            style={{
                                                                                cursor: isCancellable(booking.bookingDate) ? "pointer" : "not-allowed",
                                                                            }}
                                                                            disabled={!isCancellable(booking.bookingDate)}
                                                                            title={!isCancellable(booking.bookingDate) ? "Cannot cancel within 48 hours of booking date." : ""}
                                                                        >
                                                                            Cancel Booking
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        ) : (
                                            // Render Activity History when 'activity' tab is selected
                                            <div>
                                                
                                                <table className="table mb-0">
                                                <tbody>
                                                { filteredActivities.length>0 && filteredActivities.filter((booking) => {
                                                        const isPast = new Date(booking.date) < currentDate;
                                                        if (filterType === 'past') return isPast;
                                                        else if (filterType === 'upcoming') return !isPast;
                                                        return true; // 'all'
                                                    }).map((booking) => (
                        <tr key={booking._id} className="table-custom">
                            <td>
                                <div className="dashboard-thumb-wrapper p-relative">
                                    <div className="dashboard-thumb image-hover-effect-two position-relative">
                                        
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="recent-activity-title-box d-flex align-items-center gap-10">
                                    <div>
                                        <h5 className="tour-title fw-5 underline">
                                            <Link href={`/activity-details/${booking._id}`}>
                                                {booking.name}
                                            </Link>
                                        </h5>
                                        <div className="recent-activity-location">
                                            Address: {booking.location}
                                        </div>
                                    </div>
                                </div>
                                {showCancelModalAct && (
    <>
        {console.log("Rendering CancelConfirmationModal for Activity")}
        <CancelConfirmationModal
            onConfirm={confirmCancellationAct}
            onCancel={closeCancelModalAct}
        />
    </>
)}
                            </td>
                            <td>
                                        <div className="recent-activity-price-box">
                                            <h5 className="mb-10">
                                                {currency} {paidPricesAct[booking._id]?.toFixed(2) || 'Loading...'}
                                            </h5>
                                            <p>Total Paid</p>
                                        </div>
                                    </td>

                                                            <td>
                                                                <div>
                                                                    {new Date(booking.date) < currentDate ? (
                                                                        <button
                                                                            onClick={() => handleRateCommentClick_act(booking)}
                                                                            className="bd-primary-btn btn-style radius-60"
                                                                        
                                                                        >
                                                                            Rate & Comment
                                                                        </button>
                                                                    ) : (
                                                                        <button
    onClick={() => handleCancelBookingClick_act(booking)}
    className="bd-primary-btn btn-style radius-60"
    style={{
        cursor: isCancellable_act(booking.date) ? "pointer" : "not-allowed",
    }}
    disabled={!isCancellable_act(booking.date)}
    title={!isCancellable_act(booking.date) ? "Cannot cancel within 48 hours of booking date." : ""}
>
    Cancel Booking
</button>

                                                                    )}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {selectedBooking && (
                <RateCommentModal
                    bookingData={selectedBooking}
                    touristId={touristId}
                    itineraryId={selectedBooking.itinerary._id}
                    tourGuideId={selectedBooking.itinerary.tourGuideId}
                    onClose={closeModal}
                />
            )}
            {selectedBooking_act && (
                <RateCommentModalActivity
                    bookingData={selectedBooking_act}
                    touristId={touristId}
                    activityId={selectedBooking_act._id}
                    
                    onClose={closeModal_act}
                />
            )}
        </>
    );
};

export default BookingHistory;
