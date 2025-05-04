// TourDetails.tsx
"use client";
import { imageLoader } from "@/hooks/image-loader";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import TourDetailTabArea from "./TourDetailTabArea";
import { idTypeNew } from "@/interFace/interFace";
import { Itinerary, TourGuide } from "@/interFace/interFace";
import axios from "axios";
import TourSingleCard from "../common/tourElements/TourSingleCardIt";
import BookingFormModal from "@/elements/modals/BookingFormModal";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { isItineraryBooked, fetchTourGuideRatings } from "@/api/itineraryApi"; // Import the booking status function
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for styling
import { ToastContainer, toast } from "react-toastify";
import { useCurrency } from "@/contextApi/CurrencyContext"; // Import useCurrency
import { FaShareAlt, FaEnvelope } from "react-icons/fa"; // Import icons from react-icons
import Modal from "react-modal"; // Import Modal from react-modal
import {fetchItImage} from "@/api/itineraryApi"

const TourDetails = ({ id }: idTypeNew) => {
  const [data, setData] = useState<Itinerary | null>(null);
  const [isBooked, setIsBooked] = useState(false); // State for booking status
  const [isEmailFormOpen, setIsEmailFormOpen] = useState(false);
  const [email, setEmail] = useState('');
  const { currency, convertAmount } = useCurrency(); // Access currency and conversion function
  const [convertedPrice, setConvertedPrice] = useState<number | null>(null);
  const [tourGuide, setTourGuide] = useState<TourGuide | null>(null);
  const DEFAULT_IMAGE = "/assets/images/Itinerary.png";
  const [imageUrl, setImageUrl] = useState<string>(DEFAULT_IMAGE);


  const handleEmailChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setEmail(e.target.value);
  };

  const handleSendEmail = async () => {
    try {
      if (data) {
        const response = await axios.post(`http://localhost:8000/tourist/shareItineraryViaEmail/${data._id}`, {
          email: email
        });
        if (response.status === 200) {
          toast.success('Email sent successfully!');
          setIsEmailFormOpen(false);
        }
      } else {
        toast.error('Product item is not available.');
      }
    } catch (error) {
      toast.error('Error sending email');
    }
  };

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/tourguide/getitinerary/${id}`);
        setData(response.data);

        // Fetch the tour guide ratings and comments if tourGuideId is available
        if (response.data.tourGuideId) {
          const tourGuideData = await fetchTourGuideRatings(response.data.tourGuideId);
          setTourGuide(tourGuideData);
          console.log(tourGuideData);
        }

        // Check if the itinerary is booked
        const bookedStatus = await isItineraryBooked(id);
        setIsBooked(bookedStatus);

        // Convert the itinerary price
        if (response.data.price) {
          const priceInSelectedCurrency = await convertAmount(response.data.price);
          setConvertedPrice(priceInSelectedCurrency);
        }
      } catch (error) {
        console.error("Error fetching itinerary data:", error);
      }
    };

    fetchItinerary();
  }, [id, currency, convertAmount]);

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

  const router = useRouter(); // Initialize router

  const handleBookNowClick = () => {
    router.push(`/booking-it/${id}`);
  };

  if (!data) return <div>Loading...</div>;

  return (
    <>
      <section className="bd-tour-details-area section-space">
        {data?._id && tourGuide?._id && (
          <div className="container">
            <div className="row gy-24 justify-content-center">
              <div className="col-xxl-12 col-xl-12 col-lg-12">
                <div className="tour-details-wrapper">
                  <div className="tour-details mb-25">
                    <div className="tour-details-thumb details-slide-full mb-30">
                      <Image
                        src={imageUrl|| DEFAULT_IMAGE} // Placeholder image
                        loader={imageLoader}
                        width={300}
                        height={300}
                        style={{ width: "auto", height: "auto" }}
                        alt="Itinerary Image"
                        unoptimized
                      />
                    </div>
                    <div className="tour-details-content">
                      <h3 className="tour-details-title mb-15">
                        {data.title}
                      </h3>
                      <div className="tour-details-meta d-flex flex-wrap gap-10 align-items-center justify-content-between mb-20">
                        <div className="tour-details-price">
                          <h4 className="price-title">
                            {currency}{" "}
                            {convertedPrice !== null
                              ? convertedPrice.toFixed(2)
                              : data.price.toFixed(2)}
                            <span>/Per Person</span>
                          </h4>
                          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                            <button
                              style={{
                                padding: '5px 10px',
                                fontSize: '14px',
                                borderRadius: '60px',
                                backgroundColor: '#007bff',
                                color: 'white',
                                border: 'none',
                                cursor: 'pointer'
                              }}
                              onClick={() => {
                                navigator.clipboard.writeText(window.location.href);
                                toast.success("Link copied to clipboard!");
                              }}
                            >
                              <FaShareAlt />
                            </button>
                            <button
                              style={{
                                padding: '5px 10px',
                                fontSize: '14px',
                                borderRadius: '60px',
                                backgroundColor: '#007bff',
                                color: 'white',
                                border: 'none',
                                cursor: 'pointer'
                              }}
                              onClick={() => setIsEmailFormOpen(true)}
                            >
                              <FaEnvelope />
                            </button>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={isBooked ? undefined : handleBookNowClick} // Disable click if booked
                        className="bd-primary-btn btn-style radius-60 mb-10"
                        style={{
                          cursor: isBooked ? "not-allowed" : "pointer"
                        }}
                      >
                        {isBooked ? "Booked!" : "Book Now"}
                      </button>
                      <TourDetailTabArea itineraryData={data} tourGuideData={tourGuide} />

                      <div className="tour-details-related-tour mb-35">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
      <BookingFormModal />
      <ToastContainer />
      <Modal
        isOpen={isEmailFormOpen}
        onRequestClose={() => setIsEmailFormOpen(false)}
        contentLabel="Share Via Email"
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
            width: '400px',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)'
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)'
          }
        }}
      >
        <h3>Share Via Email</h3>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ced4da',
              borderRadius: '0.25rem',
              fontSize: '1rem',
              color: '#495057'
            }}
          />
        </div>
        <button
          onClick={handleSendEmail}
          className="bd-primary-btn btn-style radius-60 mb-10"
        >
          Send Email
        </button>
      </Modal>
    </>
  );
};

export default TourDetails;