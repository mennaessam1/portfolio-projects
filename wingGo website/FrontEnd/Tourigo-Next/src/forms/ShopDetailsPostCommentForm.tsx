"use client";
import ErrorMessage from "@/elements/error-message/ErrorMessage";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
interface FormData {
  email: string;
  name: string;
  comment: string;
}

const ShopDetailsPostCommentForm = () => {
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
      <div className="post-comment-form">
        <div className="post-comments-title">
          <h4 className="mb-15">Leave a Review</h4>
          <span className="d-block mb-25">
            Your email address will not be published. Required fields are marked
            *
          </span>
        </div>
        <form
          className="post-comment-form-box"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="row gy-24">
            <div className="col-xl-6">
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
            </div>
            <div className="col-xl-6">
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
            </div>
            <div className="col-xl-12">
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
                      value: 15,
                      message: "Comment cannot exceed 15 characters",
                    },
                  })}
                ></textarea>
                {errors.comment && (
                  <ErrorMessage message={errors.comment.message as string} />
                )}
              </div>
            </div>
            <div className="col-xl-12">
              <div className="submit-btn">
                <button
                  type="submit"
                  className="bd-primary-btn btn-style has-arrow is-bg radius-60"
                >
                  <span className="bd-primary-btn-arrow arrow-right">
                    <i className="fa-regular fa-arrow-right"></i>
                  </span>
                  <span className="bd-primary-btn-text">Post Comment</span>
                  <span className="bd-primary-btn-circle"></span>
                  <span className="bd-primary-btn-arrow arrow-left">
                    <i className="fa-regular fa-arrow-right"></i>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ShopDetailsPostCommentForm;
