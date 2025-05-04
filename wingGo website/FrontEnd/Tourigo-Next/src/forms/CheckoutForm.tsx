"use client";
import { selectLocationData } from "@/data/nice-select-data";
import ErrorMessage from "@/elements/error-message/ErrorMessage";
import NiceSelect from "@/elements/NiceSelect";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import DifferentShippingAddress from "./DifferentShippingAddress";
import CreateAccountInCheckout from "./CreateAccountInCheckout";
interface FormData {
  fName: string;
  lName: string;
  companyName: string;
  country: string;
  streetAddress: string;
  addressTwo: string;
  city: string;
  zip: string;
  phone: string;
  email: string;
  note: string;
}

const CheckoutForm = () => {
  const selectHandler = () => {};
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const toastId = toast.loading("");
    toast.success("Message Send Successfully", { id: toastId, duration: 1000 });
    reset();
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="checkout-bill-inner">
          <div className="row">
            <div className="col-md-6">
              <div className="checkout-input">
                <label>
                  First Name <span>*</span>
                </label>
                <input
                  type="text"
                  placeholder="First Name"
                  {...register("fName", {
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "First Name must be at least 2 characters",
                    },
                    maxLength: {
                      value: 15,
                      message: "First Name cannot exceed 15 characters",
                    },
                  })}
                />
                {errors.fName && (
                  <ErrorMessage message={errors.fName.message as string} />
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="checkout-input">
                <label>
                  Last Name <span>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Last Name"
                  {...register("lName", {
                    required: "Last Name is required",
                    minLength: {
                      value: 2,
                      message: "Last Name must be at least 2 characters",
                    },
                    maxLength: {
                      value: 15,
                      message: "Last Name cannot exceed 15 characters",
                    },
                  })}
                />
                {errors.lName && (
                  <ErrorMessage message={errors.lName.message as string} />
                )}
              </div>
            </div>
            <div className="col-md-12">
              <div className="checkout-input">
                <label>Company name (optional)</label>
                <input
                  type="text"
                  placeholder="Example LTD."
                  {...register("companyName", {
                    minLength: {
                      value: 2,
                      message: "companyName must be at least 2 characters",
                    },
                    maxLength: {
                      value: 15,
                      message: "companyName cannot exceed 15 characters",
                    },
                  })}
                />
              </div>
            </div>
            <div className="col-md-12">
              <div className="checkout-input">
                <label>Country / Region </label>
                <input
                  type="text"
                  placeholder="United States (US)"
                  {...register("country", {
                    minLength: {
                      value: 2,
                      message: "Country must be at least 2 characters",
                    },
                    maxLength: {
                      value: 15,
                      message: "Country cannot exceed 15 characters",
                    },
                  })}
                />
              </div>
            </div>
            <div className="col-md-12">
              <div className="checkout-input">
                <label>Street address</label>
                <input
                  type="text"
                  placeholder="House number and street name"
                  {...register("streetAddress", {
                    minLength: {
                      value: 2,
                      message: "Street address must be at least 2 characters",
                    },
                    maxLength: {
                      value: 15,
                      message: "Street address cannot exceed 15 characters",
                    },
                  })}
                />
              </div>

              <div className="checkout-input">
                <input
                  type="text"
                  placeholder="Apartment, suite, unit, etc. (optional)"
                  {...register("addressTwo", {
                    minLength: {
                      value: 2,
                      message: "Address must be at least 2 characters",
                    },
                    maxLength: {
                      value: 15,
                      message: "Address cannot exceed 15 characters",
                    },
                  })}
                />
              </div>
            </div>
            <div className="col-md-12">
              <div className="checkout-input">
                <label>Town / City</label>
                <input
                  type="text"
                  placeholder="Town / City"
                  {...register("city", {
                    minLength: {
                      value: 2,
                      message: "City must be at least 2 characters",
                    },
                    maxLength: {
                      value: 15,
                      message: "City cannot exceed 15 characters",
                    },
                  })}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="checkout-input">
                <label>State / County</label>
                <NiceSelect
                  options={selectLocationData}
                  defaultCurrent={0}
                  onChange={selectHandler}
                  name="country"
                  className="checkout-country country-list"
                  placeholder="Select Country"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="checkout-input">
                <label>Postcode / ZIP</label>
                <input
                  type="text"
                  placeholder="Postcode / ZIP"
                  {...register("zip", {
                    minLength: {
                      value: 3,
                      message: "Postcode / ZIP must be at least 3 characters",
                    },
                    maxLength: {
                      value: 15,
                      message: "Postcode / ZIP cannot exceed 15 characters",
                    },
                  })}
                />
              </div>
            </div>
            <div className="col-md-12">
              <div className="checkout-input">
                <label>
                  Phone <span>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Phone"
                  {...register("phone", {
                    required: "Phone is required",
                    minLength: {
                      value: 8,
                      message: "Phone must be at least 8 characters",
                    },
                    maxLength: {
                      value: 15,
                      message: "Phone cannot exceed 15 characters",
                    },
                  })}
                />
                {errors.phone && (
                  <ErrorMessage message={errors.phone.message as string} />
                )}
              </div>
            </div>
            <div className="col-md-12">
              <div className="checkout-input">
                <label>
                  Email address <span>*</span>
                </label>
                <input
                  type="email"
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

            <CreateAccountInCheckout />
            <DifferentShippingAddress />
            <div className="col-md-12">
              <div className="checkout-input">
                <label>Order notes (optional)</label>
                <textarea
                  placeholder="Notes about your order, e.g. special notes for delivery."
                  {...register("note")}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default CheckoutForm;
