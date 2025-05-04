"use client";
import { imageLoader } from "@/hooks/image-loader";
import { Transport } from "@/interFace/interFace";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCurrency } from "@/contextApi/CurrencyContext"; // Import currency context

interface TransportSingleCardProps {
  transport: Transport;
  className: string;
  transportWrapperClass: string;
  isparentClass: boolean;
  isAdmin?: boolean;
}

const TransportSingleCard = ({
  transport,
  className,
  transportWrapperClass,
  isparentClass,
  isAdmin = false,
}: TransportSingleCardProps) => {
  const { currency, convertAmount } = useCurrency(); // Access currency and conversion function
  const [convertedPrice, setConvertedPrice] = useState<number | null>(null);
  const router = useRouter(); // Initialize router

  useEffect(() => {
    const convertTransportPrice = async () => {
      if (transport.price) {
        const priceInSelectedCurrency = await convertAmount(transport.price);
        setConvertedPrice(priceInSelectedCurrency);
      }
    };
    convertTransportPrice();
  }, [currency, transport.price, convertAmount]); // Re-run if currency or transport.price changes

  const handleBookNowClick = () => {
    router.push(`/booking-transportation/${transport._id}`);
  };

  return (
    <>
      {isparentClass ? (
        <div className={className}>
          <div className={transportWrapperClass}>
            <div className="p-relative">
              <div className="tour-thumb image-overly">
                <Link href={`/transport-details/${transport._id}`}>
                  <Image
                    src={"/assets/images/transport.png"}
                    loader={imageLoader}
                    width={270}
                    height={270}
                    style={{ width: "300px", height: "250px" }}
                    alt="Transport Image"
                    unoptimized
                  />
                </Link>
              </div>
              <div className="tour-meta d-flex align-items-center justify-content-between">
                <div className="tour-location">
                  <span>
                    <Link href={`/transport-details/${transport._id}`}>
                      <i className="fa-regular fa-location-dot"></i>{" "}
                      {transport.city || "Location not available"}
                    </Link>
                  </span>
                </div>
              </div>
            </div>
            <div className="tour-content">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="tour-title fw-5 underline custom_mb-5">
                  <Link href={`/transport-details/${transport._id}`}>
                    {transport.type}
                  </Link>
                </h5>
              </div>
              <span className="tour-price b3">
                {currency}{" "}
                {convertedPrice !== null
                  ? convertedPrice.toFixed(2)
                  : transport.price.toLocaleString("en-US")}
              </span>
              <div className="tour-divider"></div>
              <div className="tour-meta d-flex align-items-center justify-content-between">
                <div className="time d-flex align-items-center gap--5">
                  <i className="fa-regular fa-clock"></i>
                  <span>{transport.duration}</span>
                </div>
                <div className="tour-btn">
                  <button
                    onClick={handleBookNowClick}
                    className="bd-text-btn style-two"
                    type="button"
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    Book Now
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
        <div className={transportWrapperClass}></div>
      )}
    </>
  );
};

export default TransportSingleCard;