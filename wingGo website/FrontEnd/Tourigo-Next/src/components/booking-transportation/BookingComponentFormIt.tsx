//BookingComponentFormIt.tsx
"use client";
import { useRouter } from "next/navigation"; // Import useRouter
import ErrorMessage from "@/elements/error-message/ErrorMessage";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import AddCupon from "./AddCuponMain";
import SelectPaymentType from "./SelectPaymentType";
import { idTypeNew } from "@/interFace/interFace";
import { Transport } from "@/interFace/interFace";
import { fetchTransports, getPriceApi, bookTransport } from "@/api/transportApi";
import axios from 'axios';

interface FormData {
  email: string;
  specialRequirements: string;
  firstName: string;
  lastName: string;
  mobile: string;
}

const BookingComponentForm = ({ id }: idTypeNew) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [data, setData] = useState<Transport | null>(null);
  // const touristId = "67240ed8c40a7f3005a1d01d"; // Hardcoded tourist ID for testing
  const [paymentMethod, setPaymentMethod] = useState<"wallet" | "stripe" | "creditCard">("wallet");
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
    if (!data?._id) return;

    try {
        const response = await getPriceApi(data._id, promocode);

        // Handle invalid promo code
        if (!response.isValidPromoCode) {
            if (validPromo || promocode !== "") {
                toast.error("Invalid or expired promo code."); // Show error toast
            }
            setValidPromo(false); // Mark promo code as invalid
        } else {
            // Handle valid promo code
            if (!validPromo) {
                toast.success("Promo code applied successfully!"); // Show success toast
            }
            setPrice(response.totalPrice); // Update price
            setValidPromo(true); // Mark promo code as valid
        }
    } catch (error) {
        console.error("Error updating price:", error);
        toast.error("Error calculating price.");
    }
};



  
useEffect(() => {
  updatePrice(); // Recalculate price on `promocode` or `numberOfPeople` change
}, [promocode]);
  
  
  // useEffect(() => {
  //   updatePrice();
  //   // console.log("price: "+price);
  // }, [numberOfPeople, promocode, data]);
  
  useEffect(() => {
    
    console.log("price: "+price);
  }, [price]);
  
  
  

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const toastId = toast.loading("Processing your booking...");
  
    try {
      await bookTransport( id, paymentMethod, promocode); // Use the new API function
      toast.success("Transport Booking Successful!", { id: toastId, duration: 1000 });

      setTimeout(() => {
        router.push("/transports"); // Redirect to transports page
      }, 1000); // 1-second delay
    } catch (error) {
      toast.error("Error during transport booking process.", { id: toastId });
      console.error("Error during API call:", error);
    }
  };
  



useEffect(() => {
  const fetchData = async () => {
    try {
      const transports = await fetchTransports();
      const transport = transports.find((item) => item._id === id);
      setData(transport || null);
    } catch (err) {
      console.error("Error fetching transports:", err);
    }
  };
  fetchData();
}, [id]);


  return (
    <form onSubmit={onSubmit}>
      {data?._id && (
        <>
          {/* Part 1: Booking Date Selection */}
          <div className="row setup-content" id="step-date">
            <div className="col-md-12">
              
             
            </div>
          </div>
         
       
          {/* Part 2: Payment Details */}
          <div className="row setup-content" id="step-two">
            <div className="col-md-12">
              <div className="booking-form-wrapper mb-35">
                <h4 className="booking-form-title mb-15">Payment Details</h4>
                <AddCupon setPromocode={setPromocode} />
                <div className="order-info-list">
                  <ul>
                    <li><span>Subtotal</span><span>${data.price}</span></li>
                    <li><span>Discount</span><span>     ${promocode && validPromo ? ((data.price - price).toFixed(2)) : "0.00"}
                    </span></li>
                    <li><span>Total</span><span> ${promocode && validPromo ? price.toFixed(2) : (data.price).toFixed(2)}</span></li>
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
