"use client";
import ErrorMessage from "@/elements/error-message/ErrorMessage";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
interface FormData {
  name: string;
  email: string;
  comment: string;
}
const SidebarBookingForm = () => {
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
      <div className="sidebar-booking">
        <form
          className="sidebar-booking-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="input-box">
            <input
              type="text"
              placeholder="Name"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
                maxLength: {
                  value: 15,
                  message: "Name cannot exceed 15 characters",
                },
              })}
            />
            {errors.name && (
              <ErrorMessage message={errors.name.message as string} />
            )}
          </div>
          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
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
          <div className="input-box">
            <textarea
              cols={30}
              rows={10}
              placeholder="Type Comment here"
              {...register("comment", {
                required: "Comment is required",
                minLength: {
                  value: 2,
                  message: "Comment must be at least 2 characters",
                },
                maxLength: {
                  value: 200,
                  message: "Comment cannot exceed 200 characters",
                },
              })}
            ></textarea>
            {errors.comment && (
              <ErrorMessage message={errors.comment.message as string} />
            )}
          </div>
          <div className="booking-btn">
            <button className="bd-btn btn-style radius-4 w-100" type="submit">
              Send Now
              <span>
                <i className="fa-regular fa-arrow-right"></i>
              </span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SidebarBookingForm;
