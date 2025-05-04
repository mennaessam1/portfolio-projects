import React, { useState, useEffect } from "react";
import Image from "next/image";
import { imageLoader } from "@/hooks/image-loader";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { fetchAllItineraries } from "@/api/itineraryApi"; // Adjust API call to fetch itinerary
import { Itinerary } from "@/interFace/interFace";
import Link from "next/link";
import { idTypeNew } from "@/interFace/interFace";
import { useSearchParams } from "next/navigation";

const BookingSidebar = () => {
    const searchParams = useSearchParams();
    const adults = searchParams.get("adults") || 1;
    const checkin = searchParams.get("checkin") || "";
    const checkout = searchParams.get("checkout") || "";
  const hotel = JSON.parse(localStorage.getItem("selectedHotel") || "{}");
  console.log("Hotel:", hotel);


  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [data, setData] = useState<Itinerary | null>(null);
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const bookingProducts = useSelector(
    (state: RootState) => state.booking.bookingProducts
  );

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const itineraries = await fetchAllItineraries(); // Fetch itineraries
//         const itinerary = itineraries.find((item) => item._id === id);
//         setData(itinerary || null);
//         setItineraries(itineraries.filter((item) => item._id !== id));
//       } catch (err) {
//         setError("Error loading itinerary details.");
//         console.error("Error fetching itineraries:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [id]);

  return (
    <>
      <div className="sidebar-sticky">
        {hotel?.hotelId && (
          <>
            <aside className="booking-sidebar-wrapper mb-24">
              <div className="booking-sidebar-widget-wrapper mb-30">
                <div className="booking-sidebar-widget-thumb mb-15">
                  <Image
                      src={hotel.heroImage || "/assets/images/tour/tour-img-5.png"} // Fallback image
                      loader={imageLoader}
                      alt="Itinerary Image"
                      width={500} // Adjust width as needed
                      height={300} // Adjust height as needed
                    />

                </div>
                <div className="booking-sidebar-widget-content">
                  <h6 className="booking-item-title small underline mb-5">
                    {hotel.name || "N/A"}
                  </h6>
                    <div className="booking-item-date">
                      
                        <span>
                          <i className="icon-calendar-check"></i>
                        </span>{" "}
                        Checkin Date: {checkin || "N/A"}

                        
                     
                    </div>
                    <div className="booking-item-date">
                      <span>
                        <i className="icon-calendar-check"></i>
                      </span>{" "}
                      Checkout Date: {checkout || "N/A"}
                    </div>


                  
                </div>
              </div>
              <div className="booking-sidebar-widget-wrapper">
                <div className="booking-sidebar-price-wrapper">
                  <div className="booking-sidebar-price-content">
                    <div className="booking-sidebar-price-total d-flex flex-wrap justify-content-between">
                      <div className="booking-sidebar-price-item-title b3 fw-7">
                        Price/Person
                      </div>
                      <div className="booking-sidebar-price-item-amount b3 fw-7">
                        ${hotel.rawPrice.toLocaleString("en-US") || "1800.00"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </>
        )}
      </div>
    </>
  );
};

export default BookingSidebar;
