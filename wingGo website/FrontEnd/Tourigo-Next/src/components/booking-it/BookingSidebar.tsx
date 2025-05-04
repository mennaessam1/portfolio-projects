import React, { useState, useEffect } from "react";
import Image from "next/image";
import { imageLoader } from "@/hooks/image-loader";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { fetchAllItineraries } from "@/api/itineraryApi"; // Adjust API call to fetch itinerary
import { Itinerary } from "@/interFace/interFace";
import Link from "next/link";
import { idTypeNew } from "@/interFace/interFace";
import { fetchItImage } from "@/api/itineraryApi";

const BookingSidebar = ({ id }: idTypeNew) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [data, setData] = useState<Itinerary | null>(null);
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const DEFAULT_IMAGE = "/assets/images/Itinerary.png";
  const [imageUrl, setImageUrl] = useState<string>(DEFAULT_IMAGE);
  

  const bookingProducts = useSelector(
    (state: RootState) => state.booking.bookingProducts
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itineraries = await fetchAllItineraries(); // Fetch itineraries
        const itinerary = itineraries.find((item) => item._id === id);
        setData(itinerary || null);
        setItineraries(itineraries.filter((item) => item._id !== id));
      } catch (err) {
        setError("Error loading itinerary details.");
        console.error("Error fetching itineraries:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);
  
  useEffect(() => {
    const loadImage = async () => {
      try {
        if (data?._id && data?.photo) { // Check if the item has an image
          const url = await fetchItImage(data._id);
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
  }, [data?._id, data?.photo,imageUrl]);

  return (
    <>
      <div className="sidebar-sticky">
        {data?._id && (
          <>
            <aside className="booking-sidebar-wrapper mb-24">
              <div className="booking-sidebar-widget-wrapper mb-30">
                <div className="booking-sidebar-widget-thumb mb-15">
                  <Image
                      src={imageUrl}
                      loader={imageLoader}
                      alt="Itinerary Image"
                      width={500} // Adjust width as needed
                      height={300} // Adjust height as needed
                      unoptimized
                    />

                </div>
                <div className="booking-sidebar-widget-content">
                  <h6 className="booking-item-title small underline mb-5">
                    {data.title}
                  </h6>
                    <div className="booking-item-date">
                      <Link href={`/it-details/${data._id}`}>
                        <span>
                          <i className="icon-calendar-check"></i>
                        </span>{" "}
                        Available Dates:{" "}
                        {data.availableDates
                          ? data.availableDates
                              .map((date) => new Date(date).toLocaleDateString())
                              .join(", ")
                          : "N/A"}
                      </Link>
                    </div>

                  <div className="booking-item-duration">
                    <span>
                      <i className="fas fa-clock"></i>
                    </span>{" "}
                    Duration: {data.duration || "N/A"}
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
                        ${data.price?.toLocaleString("en-US") || "1800.00"}
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
