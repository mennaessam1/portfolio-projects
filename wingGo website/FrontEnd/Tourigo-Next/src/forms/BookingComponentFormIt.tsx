// "use client";
// import ErrorMessage from "@/elements/error-message/ErrorMessage";
// import Link from "next/link";
// import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";
// import AddCupon from "../components/checkout/AddCuponMain";
// import SelectPaymentType from "../components/checkout/SelectPaymentType";
// import { idTypeNew } from "@/interFace/interFace";
// import { Itinerary } from "@/interFace/interFace";
// import { fetchAllItineraries, bookItineraryApi } from "@/api/itineraryApi"; 

// interface FormData {
//   email: string;
//   specialRequirements: string;
//   firstName: string;
//   lastName: string;
//   mobile: string;
// }

// const BookingComponentForm = ({ id }: idTypeNew) => {
//   const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
//   const [data, setData] = useState<Itinerary | null>(null);
//   const [selectedBookingDate, setSelectedBookingDate] = useState<Date | null>(null);
//   const touristId = "67240ed8c40a7f3005a1d01d"; // Hardcoded tourist ID for testing

//   const onSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     const toastId = toast.loading("Processing your booking...");

//     if (!selectedBookingDate) {
//       toast.error("Please select a booking date.", { id: toastId });
//       return;
//     }

//     try {
//       await bookItineraryApi(touristId, id, selectedBookingDate);
//       toast.success("Booking Successful!", { id: toastId, duration: 1000 });
//     } catch (error) {
//       toast.error("You have already booked your itinerary successfully.", { id: toastId });
//       console.error("Error during API call:", error);
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const itineraries = await fetchAllItineraries();
//         const itinerary = itineraries.find((item) => item._id === id);
//         setData(itinerary || null);
//       } catch (err) {
//         console.error("Error fetching itineraries:", err);
//       }
//     };
//     fetchData();
//   }, [id]);

//   return (
//     <form onSubmit={onSubmit}>
//       {data?._id && (
//         <>
//           {/* Part 1: Booking Date Selection */}
//           <div className="row setup-content" id="step-date">
//             <div className="col-md-12">
//               <div className="booking-form-wrapper mb-35" >
//                 <h4 className="booking-form-title mb-15">Choose a Booking Date</h4>
//                 <div className="booking-form-input-box">
//                   <label htmlFor="bookingDate">Available Dates</label>
//                   <select
//                     id="bookingDate"
//                     value={selectedBookingDate?.toISOString() || ""}
//                     onChange={(e) => setSelectedBookingDate(new Date(e.target.value))}
//                     required
//                   >
//                     <option value="" disabled>Select a date</option>
//                     {data.availableDates.map((date) => (
//                       <option key={date.toString()} value={new Date(date).toISOString()}>
//                         {new Date(date).toLocaleDateString()}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//               <br/><br/><br/><br/>
//             </div>
//           </div>
//           {/* Part 1.1: Email Verification */}
//           {/* <div className="row setup-content" id="step-one">
//               <div className="col-md-12">
//                 <div className="booking-form-wrapper mb-35">
//                   <h4 className="booking-form-title mb-15">Verification</h4>
//                   <div className="booking-form-input-box">
//                     <div className="booking-form-input-title">
//                       <label htmlFor="email">
//                         Email address<span>*</span>
//                       </label>
//                     </div>
//                     <div className="booking-form-input">
//                       <input
//                         id="email"
//                         type="email"
//                         autoComplete="email"
//                         placeholder="Email address"
//                         {...register("email", {
//                           required: "Email is required",
//                           pattern: {
//                             value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                             message: "Invalid email address",
//                           },
//                         })}
//                       />
//                       {errors.email && (
//                         <ErrorMessage message={errors.email.message as string} />
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div> */}

//           {/* Part 2: Payment Details */}
//           <div className="row setup-content" id="step-two">
//             <div className="col-md-12">
//               <div className="booking-form-wrapper mb-35">
//                 <h4 className="booking-form-title mb-15">Payment Details</h4>
//                 <AddCupon />
//                 <div className="order-info-list">
//                   <ul>
//                     <li><span>Subtotal</span><span>${data.price}</span></li>
//                     <li><span>Discount</span><span>0</span></li>
//                     <li><span>Total</span><span>${data.price}</span></li>
//                   </ul>
//                 </div>

//                 {/* Additional Details */}
//                 <div className="booking-form-info mt-25">
//                   <h6 className="booking-form-info-title mb-10">Additional details:</h6>
//                   <div className="booking-form-input-box">
//                     <div className="booking-form-input-title">
//                       <label htmlFor="specialRequirements">Do you have special requirements?</label>
//                     </div>
//                     <div className="booking-form-input">
//                       <input
//                         id="specialRequirements"
//                         type="text"
//                         placeholder="Special requirements"
//                         {...register("specialRequirements")}
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Payment Methods */}
//                 <h5 className="booking-form-title mt-25">Payment Methods</h5>
//                 <div className="checkout-payment mb-25">
//                   <SelectPaymentType />
//                 </div>

//                 {/* Cancellation Policy */}
//                 <div className="booking-form-policy mb-25">
//                   <h5 className="booking-form-title mb-15">Cancellation policy</h5>
//                   <p className="mb-10">
//                     {"By clicking 'Payment details' and finalizing your booking, you agree to the "}
//                     <Link className="theme-text" href="/terms-conditions">Terms and Conditions</Link>
//                     {" set forth by tourigo.com and the privacy policy of Viator."}
//                   </p>
//                   <span>
//                     <Link className="theme-text" href="/privacy-policy">Privacy Statement</Link>
//                   </span>
//                 </div>

//                 {/* Terms Agreement */}
//                 <div className="booking-form-input">
//                   <div className="checkout-agree">
//                     <div className="checkout-option mb-15">
//                       <input id="read_all" type="checkbox" />
//                       <label htmlFor="read_all">I have read and agree to the website terms.</label>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Submit Button */}
//                 <button className="nextBtn-2 bd-primary-btn btn-style is-bg radius-60" type="submit">
//                   <span className="bd-primary-btn-text">Confirm</span>
//                   <span className="bd-primary-btn-circle"></span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </form>
//   );
// };

// export default BookingComponentForm;
