"use client";
import React, { useState } from "react";
import UploadSingleImg from "./UploadSingleImg";
import TourGallery from "./TourGallary";
import TourContent from "./TourContent";
import NiceSelect from "@/elements/NiceSelect";
import { selectLocationData } from "@/data/nice-select-data";
import ErrorMessage from "@/elements/error-message/ErrorMessage";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { File } from "@/interFace/interFace";
interface FormData {
  tag: string;
  discount: string;
  tourTitle: string;
  packagePrice: string;
  tourPackageRating: string;
  facebookLink: string;
  twitterLink: string;
  linkedInLink: string;
  youtubeLink: string;
  duration: string;
  minAge: string;
  tourType: string;
  location: string;
  address: string;
  email: string;
  phone: string;
  website: string;
}

const TourDetailsArea = () => {
  const [largeImg, setlargeImg] = useState<string>("");
  const selectHandler = () => {};
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const toastId = toast.loading("");
    const formData = { ...data, largeImg };
    toast.success("Message Send Successfully", { id: toastId, duration: 1000 });
    reset();
  };

  return (
    <>
      <section className="bd-tour-details-area section-space">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="container">
            <div className="row gy-24 justify-content-center">
              <div className="col-xxl-12 col-xl-12 col-lg-12">
                <div className="tour-details-wrapper">
                  <div className="tour-details mb-25">
                    {/* Upload Img */}
                    <UploadSingleImg setlargeImg={setlargeImg} />
                    <div className="tour-details-content">
                      <div className="tour-details-badge d-flex gap-24 mb-10">
                        <div className="form-input-box">
                          <div className="form-input-title">
                            <label htmlFor="tag">Tour Tag: </label>
                          </div>
                          <div className="form-input">
                            <input
                              id="tag"
                              type="text"
                              {...register("tag", {
                                required: "Tag is required",
                                minLength: {
                                  value: 2,
                                  message: "Tag must be at least 2 characters",
                                },
                                maxLength: {
                                  value: 15,
                                  message: "Tag cannot exceed 15 characters",
                                },
                              })}
                            />
                            {errors.tag && (
                              <ErrorMessage
                                message={errors.tag.message as string}
                              />
                            )}
                          </div>
                        </div>
                        <div className="form-input-box">
                          <div className="form-input-title">
                            <label htmlFor="discount">Discount: </label>
                          </div>
                          <div className="form-input">
                            <input
                              id="discount"
                              type="text"
                              {...register("discount", {
                                required: "Discount is required",
                                minLength: {
                                  value: 2,
                                  message:
                                    "Discount must be at least 2 characters",
                                },
                                maxLength: {
                                  value: 3,
                                  message:
                                    "Discount cannot exceed 3 characters",
                                },
                              })}
                            />
                            {errors.discount && (
                              <ErrorMessage
                                message={errors.discount.message as string}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="form-input-box mb-15">
                        <div className="form-input-title">
                          <label htmlFor="tourTitle">
                            Tour Title <span>*</span>
                          </label>
                        </div>
                        <div className="form-input">
                          <input
                            id="tourTitle"
                            type="text"
                            {...register("tourTitle", {
                              required: "Tour Title is required",
                              minLength: {
                                value: 5,
                                message:
                                  "Tour Title must be at least 5 characters",
                              },
                              maxLength: {
                                value: 30,
                                message:
                                  "Tour Title cannot exceed 30 characters",
                              },
                            })}
                          />
                          {errors.tourTitle && (
                            <ErrorMessage
                              message={errors.tourTitle.message as string}
                            />
                          )}
                        </div>
                      </div>
                      <div className="mb-20">
                        <div className="tour-details-meta mb-20">
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="tour-details-price">
                                <div className="form-input-box">
                                  <div className="form-input-title">
                                    <label htmlFor="packagePrice">
                                      Tour Package Price<span>*</span>
                                    </label>
                                  </div>
                                  <div className="form-input">
                                    <input
                                      id="packagePrice"
                                      type="text"
                                      {...register("packagePrice", {
                                        required: "Package Price is required",
                                        minLength: {
                                          value: 1,
                                          message:
                                            "Package Price must be at least 1 characters",
                                        },
                                        maxLength: {
                                          value: 3,
                                          message:
                                            "Package Price cannot exceed 3 characters",
                                        },
                                      })}
                                    />
                                    {errors.packagePrice && (
                                      <ErrorMessage
                                        message={
                                          errors.packagePrice.message as string
                                        }
                                      />
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-input-box">
                                <div className="form-input-title">
                                  <label htmlFor="tourPackageRating">
                                    Tour Package Rating
                                  </label>
                                </div>
                                <div className="form-input">
                                  <input
                                    id="tourPackageRating"
                                    type="text"
                                    {...register("tourPackageRating", {
                                      required: "Package Price is required",
                                      minLength: {
                                        value: 1,
                                        message:
                                          "Package Rating must be at least 1 characters",
                                      },
                                      maxLength: {
                                        value: 1,
                                        message:
                                          "Package Rating cannot exceed 1 characters",
                                      },
                                    })}
                                  />
                                  {errors.tourPackageRating && (
                                    <ErrorMessage
                                      message={
                                        errors.tourPackageRating
                                          .message as string
                                      }
                                    />
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mb-20">
                        <h4 className="mb-20">Tour Social</h4>
                        <div className="row gy-24 justify-content-between">
                          <div className="col-lg-3 col-md-6">
                            <div className="form-input-box">
                              <div className="form-input-title">
                                <label htmlFor="facebookLink">Facebook</label>
                              </div>
                              <div className="input-group">
                                <span className="input-group-text">@</span>
                                <input
                                  className="form-control"
                                  id="facebookLink"
                                  type="text"
                                  {...register("facebookLink")}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-3 col-md-6">
                            <div className="form-input-box">
                              <div className="form-input-title">
                                <label htmlFor="twitterLink">Twitter</label>
                              </div>
                              <div className="input-group">
                                <span className="input-group-text">@</span>
                                <input
                                  className="form-control"
                                  id="twitterLink"
                                  type="text"
                                  {...register("twitterLink")}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-3 col-md-6">
                            <div className="form-input-box">
                              <div className="form-input-title">
                                <label htmlFor="linkedInLink">Linkedin</label>
                              </div>
                              <div className="input-group">
                                <span className="input-group-text">@</span>
                                <input
                                  className="form-control"
                                  id="linkedInLink"
                                  type="text"
                                  {...register("linkedInLink")}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-3 col-md-6">
                            <div className="form-input-box">
                              <div className="form-input-title">
                                <label htmlFor="youtubeLink">Youtube</label>
                              </div>
                              <div className="input-group">
                                <span className="input-group-text">@</span>
                                <input
                                  className="form-control"
                                  id="youtubeLink"
                                  type="text"
                                  {...register("youtubeLink")}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="tour-details-destination-wrapper tour-input-wrapp">
                        <div className="tour-details-destination-info">
                          <div className="tour-details-destination-info-title">
                            <div className="form-input-box">
                              <div className="form-input-title">
                                <label htmlFor="duration">
                                  Duration<span>*</span>
                                </label>
                              </div>
                              <div className="form-input">
                                <input
                                  id="duration"
                                  type="text"
                                  {...register("duration", {
                                    required: "Duration is required",
                                    minLength: {
                                      value: 1,
                                      message:
                                        "Duration must be at least 1 characters",
                                    },
                                    maxLength: {
                                      value: 3,
                                      message:
                                        "Duration cannot exceed 3 characters",
                                    },
                                  })}
                                />
                                {errors.duration && (
                                  <ErrorMessage
                                    message={errors.duration.message as string}
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="tour-details-destination-info">
                          <div className="tour-details-destination-info-title">
                            <div className="form-input-box">
                              <div className="form-input-title">
                                <label htmlFor="minAge">
                                  Min Age<span>*</span>
                                </label>
                              </div>
                              <div className="form-input">
                                <input
                                  id="minAge"
                                  type="text"
                                  {...register("minAge", {
                                    required: "Min Age is required",
                                    minLength: {
                                      value: 1,
                                      message:
                                        "Min Age must be at least 1 characters",
                                    },
                                    maxLength: {
                                      value: 2,
                                      message:
                                        "Min Age cannot exceed 3 characters",
                                    },
                                  })}
                                />
                                {errors.minAge && (
                                  <ErrorMessage
                                    message={errors.minAge.message as string}
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="tour-details-destination-info">
                          <div className="tour-details-destination-info-title">
                            <div className="form-input-box">
                              <div className="form-input-title">
                                <label htmlFor="tourType">
                                  Tour Type<span>*</span>
                                </label>
                              </div>
                              <div className="form-input">
                                <input
                                  id="tourType"
                                  type="text"
                                  {...register("tourType", {
                                    required: "Tour Type is required",
                                    minLength: {
                                      value: 2,
                                      message:
                                        "Tour Type must be at least 2 characters",
                                    },
                                    maxLength: {
                                      value: 15,
                                      message:
                                        "Tour Type cannot exceed 15 characters",
                                    },
                                  })}
                                />
                                {errors.tourType && (
                                  <ErrorMessage
                                    message={errors.tourType.message as string}
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="tour-details-destination-info">
                          <div className="tour-details-destination-info-title">
                            <div className="form-input-box">
                              <div className="form-input-title">
                                <label htmlFor="location">
                                  Location<span>*</span>
                                </label>
                              </div>
                              <div className="form-input">
                                <input
                                  id="location"
                                  type="text"
                                  {...register("location", {
                                    required: "Location is required",
                                    minLength: {
                                      value: 2,
                                      message:
                                        "Location must be at least 2 characters",
                                    },
                                    maxLength: {
                                      value: 15,
                                      message:
                                        "Location cannot exceed 15 characters",
                                    },
                                  })}
                                />
                                {errors.location && (
                                  <ErrorMessage
                                    message={errors.location.message as string}
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mb-35">
                        <h4 className="mb-20">Tour Content</h4>
                        <TourContent />
                      </div>
                      <div className="tour-details-gallery mb-35">
                        <h4 className="mb-20">Tour Galley</h4>

                        <TourGallery />
                      </div>
                      <div className="tour-details-location mb-35">
                        <h4 className="mb-20">Contact</h4>
                        <div className="row gy-24">
                          <div className="col-lg-6">
                            <div className="row gy-24">
                              <div className="col-md-12">
                                <div className="form-input-box">
                                  <div className="form-input-title">
                                    <label htmlFor="address">Address: </label>
                                  </div>
                                  <div className="form-input">
                                    <input
                                      id="address"
                                      type="text"
                                      {...register("address", {
                                        required: "Address is required",
                                        minLength: {
                                          value: 2,
                                          message:
                                            "Address must be at least 2 characters",
                                        },
                                        maxLength: {
                                          value: 15,
                                          message:
                                            "Address cannot exceed 15 characters",
                                        },
                                      })}
                                    />
                                    {errors.address && (
                                      <ErrorMessage
                                        message={
                                          errors.address.message as string
                                        }
                                      />
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-12">
                                <div className="form-input-title">
                                  <label htmlFor="country">Country: </label>
                                </div>
                                <div className="input-box-select w-100">
                                  <NiceSelect
                                    options={selectLocationData}
                                    defaultCurrent={0}
                                    onChange={selectHandler}
                                    name="country"
                                    className="country-select"
                                  />
                                </div>
                              </div>
                              <div className="col-md-12">
                                <div className="form-input-box">
                                  <div className="form-input-title">
                                    <label htmlFor="email">Email: </label>
                                  </div>
                                  <div className="form-input">
                                    <input
                                      id="email"
                                      type="email"
                                      {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                          value:
                                            /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                          message: "Invalid email address",
                                        },
                                      })}
                                    />
                                    {errors.email && (
                                      <ErrorMessage
                                        message={errors.email.message as string}
                                      />
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-12">
                                <div className="form-input-box">
                                  <div className="form-input-title">
                                    <label htmlFor="phone">
                                      Phone Number:{" "}
                                    </label>
                                  </div>
                                  <div className="form-input">
                                    <input
                                      id="phone"
                                      type="text"
                                      {...register("phone", {
                                        required: "Phone is required",
                                        minLength: {
                                          value: 8,
                                          message:
                                            "Phone must be at least 8 characters",
                                        },
                                        maxLength: {
                                          value: 15,
                                          message:
                                            "Phone cannot exceed 15 characters",
                                        },
                                      })}
                                    />
                                    {errors.phone && (
                                      <ErrorMessage
                                        message={errors.phone.message as string}
                                      />
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-12">
                                <div className="form-input-box">
                                  <div className="form-input-title">
                                    <label htmlFor="websites">Websites: </label>
                                  </div>
                                  <div className="form-input">
                                    <input
                                      id="website"
                                      type="text"
                                      {...register("website", {
                                        required: "Website  is required",
                                        minLength: {
                                          value: 2,
                                          message:
                                            "Website must be at least 2 characters",
                                        },
                                        maxLength: {
                                          value: 15,
                                          message:
                                            "Website cannot exceed 15 characters",
                                        },
                                      })}
                                    />
                                    {errors.website && (
                                      <ErrorMessage
                                        message={
                                          errors.website.message as string
                                        }
                                      />
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="tour-details-location-map">
                              <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d89245.36062680863!2d25.596462799999998!3d45.652478099999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b35b862aa214f1%3A0x6cf5f2ef54391e0f!2sBra%C8%99ov%2C%20Romania!5e0!3m2!1sen!2sbd!4v1707640089632!5m2!1sen!2sbd"
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                              ></iframe>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tour-edit-btn text-start">
                <button type="submit" className="bd-btn btn-style radius-4">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default TourDetailsArea;
