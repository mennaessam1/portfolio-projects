"use client";

import React, { useEffect, useState } from "react";
import { Transport } from "@/interFace/interFace";
import { getTransportsData, } from "@/data/transport-data";
import { useCurrency } from "@/contextApi/CurrencyContext";
import TourDetailTabArea from "./TourDetailTabArea";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

interface TourDetailsProps {
  id: string;
}

const TourDetails: React.FC<TourDetailsProps> = ({ id }) => {
  const [transport, setTransport] = useState<Transport | null>(null);
  const { currency, convertAmount } = useCurrency();
  const [convertedPrice, setConvertedPrice] = useState<number | null>(null);
  const [isBooked, setIsBooked] = useState<boolean>(false);
  const router = useRouter(); // Initialize router

  useEffect(() => {
    const fetchTransportDetails = async () => {
      try {
        const transports = await getTransportsData();
        const selectedTransport = transports.find((t) => t._id === id);
        setTransport(selectedTransport || null);

        if (selectedTransport) {
          const priceInSelectedCurrency = await convertAmount(selectedTransport.price);
          setConvertedPrice(priceInSelectedCurrency);
        }
      } catch (error) {
        console.error("Error fetching transport details:", error);
      }
    };

    fetchTransportDetails();
  }, [id, convertAmount]);

  const handleBookNowClick = () => {
    router.push(`/booking-transportation/${id}`);
  };

  if (!transport) {
    return <p>Loading...</p>;
  }

  return (
    <section className="bd-tour-details-area section-space">
      <div className="container">
        <div className="row gy-24 justify-content-center">
          <div className="col-xxl-12 col-xl-12 col-lg-12">
            <div className="tour-details-wrapper">
              <div className="tour-details mb-25">
                <div className="tour-details-thumb details-slide-full mb-30">
                  <Image
                    src="/images/default-image.jpg" // Placeholder for transport image
                    width={1920}
                    height={1080}
                    alt="Transport Image"
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
                <div className="tour-details-content">
                  <h3 className="tour-details-title mb-15">{transport.type}</h3>
                  <div className="tour-details-meta d-flex flex-wrap gap-10 align-items-center justify-content-between mb-20">
                    <div className="tour-details-price">
                      <h4 className="price-title">
                        {currency}{" "}
                        {convertedPrice !== null
                          ? convertedPrice.toFixed(2)
                          : transport.price.toFixed(2)}
                        <span>/Per Person</span>
                      </h4>
                    </div>
                  </div>
                  <button
                    onClick={isBooked ? undefined : handleBookNowClick}
                    disabled={isBooked}
                    className="bd-primary-btn btn-style radius-60 mb-20"
                    style={{
                      cursor: isBooked ? "not-allowed" : "pointer",
                    }}
                  >
                    {isBooked ? "Booked!" : "Book Now"}
                  </button>
                  {/* Added the new styled tab area */}
                  <TourDetailTabArea transport={transport} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default TourDetails;
