//BookingComponentFormIt.tsx
"use client";
import { useRouter, useSearchParams } from "next/navigation"; // Import useRouter
import ErrorMessage from "@/elements/error-message/ErrorMessage";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import AddCupon from "./AddCuponMain";
import SelectPaymentType from "./SelectPaymentType";
import { idTypeNew } from "@/interFace/interFace";
import { Itinerary } from "@/interFace/interFace";
import { fetchAllItineraries, bookItineraryApi, getPriceApi } from "@/api/itineraryApi"; 
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { bookHotel, getPromoCodeDiscount } from "@/api/HotelApi";
import { bookflight } from "@/api/FlightApi";

interface DecodedToken {
    username: string;
    id: string;
    role: string;
    mustChangePassword: boolean;
}


interface FormData {
  email: string;
  specialRequirements: string;
  firstName: string;
  lastName: string;
  mobile: string;
}

const BookingComponentForm = () => {

    const searchParams = useSearchParams();
    const origin = searchParams.get("origin") || "";
    const destination = searchParams.get("destination") || "";
    const departureDate = searchParams.get("departureDate") || "";


  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  
  const cookie = Cookies.get('token');
  let id = "";

    if (cookie) {
        const decodedToken = jwtDecode<DecodedToken>(cookie);
        id = decodedToken.id;
    }

    const flight = JSON.parse(localStorage.getItem("selectedFlight") || "{}");
  
  const [paymentMethod, setPaymentMethod] = useState<"wallet" | "stripe" | "creditCard">("wallet");
  const [numberOfPeople, setNumberOfPeople] = useState(Number(1)); // Default to 1 person
  // const [promocode, setPromocode] = useState(""); // State for promo code
  const [validPromo, setValidPromo] = useState(true); 
  const router = useRouter(); // Initialize useRouter for navigation

  
  // const [price, setPrice] = useState(0);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardHolder: "",
    expiry: "",
    cvv: "",
  });

  const [promocode, setPromocode] = useState("");
  const [price, setPrice] = useState(0);

  const updatePrice = async () => {
    
    try {
        // const response = await getPriceApi(data._id, numberOfPeople, promocode);
        const response = await getPromoCodeDiscount(promocode);
        console.log("response: ", response);

        // Check if the promo code is invalid
        if(!response.isActive){
            if(validPromo || promocode === ""){
                // Only show error toast if the promo code is newly invalid
                toast.error("Invalid or expired promo code.");
            }
            setValidPromo(false); // Update state
        } else {
            if (!validPromo) {
                // Only show success toast if the promo code was previously invalid
                toast.success("Promo code applied successfully!");
            }
            setPrice(response.discount); // Update price
            setValidPromo(true); // Update state
        }

      
    } catch (error) {
        console.error("Error updating price:", error);
        toast.error("Error calculating price.");
        setValidPromo(false); // Update state
    }
};


  useEffect(() => {
    updatePrice(); // Recalculate price on `promocode` or `numberOfPeople` change
  }, [promocode, numberOfPeople]);
  
  // useEffect(() => {
  //   updatePrice();
  //   // console.log("price: "+price);
  // }, [numberOfPeople, promocode, data]);
  
  
  
  
  

const onSubmit = async (event: React.FormEvent) => {
  event.preventDefault();
  const toastId = toast.loading("Processing your booking...");

  

  if (numberOfPeople < 1) {
    toast.error("Please select at least one person.", { id: toastId });
    return;
  }
  


  try {
      const response = await bookflight(flight, paymentMethod, promocode, numberOfPeople);
      toast.success("Booking Successful!", { id: toastId, duration: 1000 });
      localStorage.removeItem("selectedFlight");
      setTimeout(() => {
      router.push("/search-flights"); // Redirect to transports page
      }, 1000); // 1-second delay
  } catch (error) {
      toast.error("Error during booking process.", { id: toastId });
      console.error("Error during API call:", error);
  }
};



 
  const incrementPeople = () => setNumberOfPeople((prev) => prev + 1);
  const decrementPeople = () => setNumberOfPeople((prev) => Math.max(prev - 1, 1)); // Minimum 1 person


  return (
    <form onSubmit={onSubmit}>
      {flight.id && (
        <>
          {/* Part 1: Booking Date Selection */}
          <div className="row setup-content" id="step-date">
            <div className="col-md-12">
              <div className="booking-form-wrapper mb-35" >
                <h4 className="booking-form-title mb-15">Booking Details</h4>
                <div
                  className="booking-details-row"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "30px", // Adds space between "Number of People" and "Booking Date"
                  }}
                >
                  {/* Number of People */}
                  <div
                    className="number-of-people-container"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px", // Space between label and input
                    }}
                  >
                    <label htmlFor="numpeople">Number Of People:</label>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {/* Input Field */}
                      <input
                        type="text"
                        id="numpeople"
                        value={numberOfPeople}
                        readOnly
                        style={{
                          width: "85px",
                          height: "30px",
                          textAlign: "center",
                          border: "1px solid #ccc",
                          borderRadius: "5px",
                        }}
                      />

                      {/* Arrows for Increment/Decrement */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          marginLeft: "5px",
                        }}
                      >
                        <button
                          onClick={(e) => {
                            e.preventDefault(); // Prevent form submission
                            setNumberOfPeople((prev) => prev + 1);
                          }}
                          style={{
                            width: "16px",
                            height: "16px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "1px solid #ccc",
                            cursor: "pointer",
                            background: "#f5f5f5",
                            fontSize: "8px",
                            borderBottom: "none",
                          }}
                        >
                          ▲
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault(); // Prevent form submission
                            setNumberOfPeople((prev) => Math.max(1, prev - 1));
                          }}
                          style={{
                            width: "16px",
                            height: "16px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "1px solid #ccc",
                            cursor: "pointer",
                            background: "#f5f5f5",
                            fontSize: "8px",
                          }}
                        >
                          ▼
                        </button>
                      </div>
                    </div>
                  </div>

                  
                </div>

                
              </div>
             
            </div>
          </div>
          {/* Part 1.1: Email Verification */}
          {/* <div className="row setup-content" id="step-one">
              <div className="col-md-12">
                <div className="booking-form-wrapper mb-35">
                  <h4 className="booking-form-title mb-15">Verification</h4>
                  <div className="booking-form-input-box">
                    <div className="booking-form-input-title">
                      <label htmlFor="email">
                        Email address<span>*</span>
                      </label>
                    </div>
                    <div className="booking-form-input">
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="Email address"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                      />
                      {errors.email && (
                        <ErrorMessage message={errors.email.message as string} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div> */}

       
          {/* Part 2: Payment Details */}
          <div className="row setup-content" id="step-two">
            <div className="col-md-12">
              <div className="booking-form-wrapper mb-35">
                <h4 className="booking-form-title mb-15">Payment Details</h4>
                <AddCupon setPromocode={setPromocode} />
                <div className="order-info-list">
                  <ul>
                    <li><span>Subtotal</span><span>${flight.price.total * numberOfPeople}</span></li>
                    <li><span>Discount</span><span>     ${promocode && validPromo ? (((price/100)*(flight.price.total * numberOfPeople)).toFixed(2)) : "0.00"}
                    </span></li>
                    <li><span>Total</span><span> ${promocode && validPromo ? (((1-price/100)*(flight.price.total * numberOfPeople)).toFixed(2)) : "0.00"}</span></li>
                  </ul>
                </div>

                {/* Additional Details */}
                <div className="booking-form-info mt-25">
                  <h6 className="booking-form-info-title mb-10">Additional details:</h6>
                  <div className="booking-form-input-box">
                    <div className="booking-form-input-title">
                      <label htmlFor="specialRequirements">Do you have special requirements?</label>
                    </div>
                    <div className="booking-form-input">
                      <input
                        id="specialRequirements"
                        type="text"
                        placeholder="Special requirements"
                        {...register("specialRequirements")}
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <h5 className="booking-form-title mt-25">Payment Methods</h5>
                <div className="checkout-payment mb-25">
                <SelectPaymentType setPaymentMethod={(method) => setPaymentMethod(method)} />

                {paymentMethod === "creditCard" && (
                <div
                  className="credit-card-form"
                  style={{
                    marginTop: "25px", // Space above the form
                    marginBottom: "15px", // Space below the form
                    display: "flex",
                    flexDirection: "column", // Arrange inputs vertically
                    gap: "10px", // Space between fields
                  }}
                >
                  <h6 style={{ marginBottom: "10px" }}>Enter Card Details:</h6>
                  <input
                    type="text"
                    placeholder="Card Number"
                    value={cardDetails.cardNumber}
                    onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                    required
                    style={{
                      width: "250px", // Reduced width
                      height: "30px", // Reduced height
                      padding: "5px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Expiry Date (MM/YY)"
                    value={cardDetails.expiry}
                    onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                    required
                    style={{
                      width: "250px", // Reduced width
                      height: "30px", // Reduced height
                      padding: "5px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                    }}
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    value={cardDetails.cvv}
                    onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                    required
                    style={{
                      width: "250px", // Reduced width
                      height: "30px", // Reduced height
                      padding: "5px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                    }}
                  />
                </div>
              
                   )}


                </div>

              

                {/* Cancellation Policy */}
                

                {/* Terms Agreement */}
                {/* <div className="booking-form-input">
                  <div className="checkout-agree">
                    <div className="checkout-option mb-15">
                      <input id="read_all" type="checkbox" />
                      <label htmlFor="read_all">I have read and agree to the website terms.</label>
                    </div>
                  </div>
                </div> */}

                {/* Submit Button */}
                <button className="nextBtn-2 bd-primary-btn btn-style is-bg radius-60" type="submit">
                  <span className="bd-primary-btn-text">Confirm</span>
                  <span className="bd-primary-btn-circle"></span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </form>
  );
};

export default BookingComponentForm;
