"use client";
import ErrorMessage from "@/elements/error-message/ErrorMessage";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import AddCupon from "../components/checkout/AddCuponMain";
import SelectPaymentType from "../components/checkout/SelectPaymentType";
import { idTypeNew } from "@/interFace/interFace";
import { Activity } from "@/interFace/interFace";
import { getActivitiesData } from "@/data/act-data";
import {bookActivityApi} from '@/api/activityApi'

interface FormData {
  email: string;
  specialRequirements: string;
  firstName: string;
  lastName: string;
  mobile: string;
}

const BookingComponentForm = ({ id }: idTypeNew) => {
  const [total, setTotal] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const [data, setData] = useState<Activity | null>(null);
  const [activity, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();  // Prevent the default form submission behavior
    const toastId = toast.loading("Processing your booking...");
    
    try {
      // Call the API with only the `id` as the parameter
      // await bookActivityApi(id);  // Only pass `id`
      
      // Show success message once the API call is successful
      toast.success("Booking Successful!", { id: toastId, duration: 1000 });
    } catch (error) {
      toast.error("You have already booked your activity successfully.", { id: toastId });
      console.error("Error during API call:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const activities = await getActivitiesData();
        const activity = activities.find((item) => item._id === id);
        setData(activity || null);

        setActivities(activities.filter((item) => item._id !== id));
      } catch (err) {
        setError("Error loading tour details.");
        console.error("Error fetching activities:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);
  

  return (
    <>
      <form onSubmit={onSubmit}>
        {data?._id && (
          <>
            {/* Part 1: Email Verification */}
            <div className="row setup-content" id="step-one">
              <div className="col-md-12">
                {/* <div className="booking-form-wrapper mb-35">
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
                </div> */}
              </div>
            </div>

            {/* Part 2: Payment Details */}
            <div className="row setup-content" id="step-two">
              <div className="col-md-12">
                <div className="booking-form-wrapper mb-35">
                  <h4 className="booking-form-title mb-15">Payment Details</h4>

                  {/* AddCupon component before subtotal */}
                  <AddCupon />

                  {/* Pricing Section */}
                  <div className="order-info-list">
                    <ul>
                      <li>
                        <span>Subtotal</span>
                        <span>${data.price}</span>
                      </li>
                      <li>
                        <span>Discount</span>
                        <span>0</span>
                      </li>
                      <li>
                        <span>Total</span>
                        <span>${data.price}</span>
                      </li>
                    </ul>
                  </div>

                  {/* Additional Details */}
                  <div className="booking-form-info mt-25">
                    <h6 className="booking-form-info-title mb-10">
                      Additional details:
                    </h6>
                    <div className="booking-form-input-box">
                      <div className="booking-form-input-title">
                        <label htmlFor="specialRequirements">
                          Do you have special requirements?
                        </label>
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

                  {/* Payment Methods Header */}
                  <h5 className="booking-form-title mt-25">Payment Methods</h5>

                  {/* Payment Selection Component */}
                  <div className="checkout-payment mb-25">
                    <SelectPaymentType />
                  </div>

                  {/* Cancellation Policy */}
                  <div className="booking-form-policy mb-25">
                    <h5 className="booking-form-title mb-15">Cancellation policy</h5>
                    <p className="mb-10">
                      {"By clicking 'Payment details' and finalizing your booking, you agree to the "}
                      <Link className="theme-text" href="/terms-conditions">
                        Terms and Conditions
                      </Link>{" "}
                      {"set forth by tourigo.com and the privacy policy of Viator. Please review our Privacy Statement to understand how we handle and protect your personal information."}
                    </p>
                    <span>
                      <Link className="theme-text" href="/privacy-policy">
                        Privacy Statement
                      </Link>
                    </span>
                  </div>

                  {/* Agree to Terms Checkbox */}
                  <div className="booking-form-input">
                    <div className="checkout-agree">
                      <div className="checkout-option mb-15">
                        <input id="read_all" type="checkbox" />
                        <label htmlFor="read_all">
                          I have read and agree to the website terms.
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    className="nextBtn-2 bd-primary-btn btn-style is-bg radius-60"
                    type="submit"
                  >
                    <span className="bd-primary-btn-text">Confirm</span>
                    <span className="bd-primary-btn-circle"></span>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </form>
    </>
  );
};

export default BookingComponentForm;
