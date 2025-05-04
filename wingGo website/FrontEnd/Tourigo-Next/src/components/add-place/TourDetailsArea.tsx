"use client";
import React, { useState, FormEvent, ChangeEvent, useEffect } from "react";
import UploadSingleImg from "./UploadSingleImg";
import TourGallery from "./TourGallary";
import TourContent from "./TourContent";
import NiceSelect from "@/elements/NiceSelect";
import ErrorMessage from "@/elements/error-message/ErrorMessage";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { createPlace, getAvailableTags } from "@/api/placesApi";
import { selectLocationData } from "@/data/nice-select-data";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from "next/navigation";



interface NewPlace {
  name: string;
  description: string;
  location: string;
  openingHours: string;
  ticketPrices: {
    foreigner?: number;
    native?: number;
    student?: number;
  };
  tagss?: string[];
  photo?: File|null; // Array of files for multiple image uploads
}

interface FormData {
  name: string;
  description: string;
  location: string;
  openingHours: string;
  ticketPrices: {
    foreigner?: number;
    native?: number;
    student?: number;
  };
  tagss?: string[];
  photo?: File|null;
 
 
}

const TourDetailsArea = () => {

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();


  //get back here


  // const [image, setImage] = useState<File | null>(null);
  // const [largeImg, setlargeImg] = useState<string>("");
  const [availablePrefrences, setAvailablePrefrences] = useState<Array<any>>([]);
  const [selectedPrefrences, setSelectedPrefrences] = useState<Array<any>>([]);
  const [isLoadingPreferences, setIsLoadingPreferences] = useState<boolean>(true);

  const [photo, setPhoto] = useState<File | null>(null);
  const [photoName, setPhotoName] = useState<string | null>(null);


  const [newPlace, setNewPlace] = useState<NewPlace>({
   
    name: "",
    description: "",

    location:"",
    openingHours: "",
    ticketPrices: {
      foreigner: 0,
      native: 0,
      student: 0,
    },
   
    tagss: selectedPrefrences,
    photo:photo
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFileName: React.Dispatch<React.SetStateAction<string | null>>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPhoto(e.target.files[0]);
      setFileName(e.target.files[0].name);
    } else {
      setFileName(null);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>, setFileName: React.Dispatch<React.SetStateAction<string | null>>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPhoto(e.target.files[0]);
      setFileName(e.target.files[0].name);
      console.log("Photo:", e.target.files[0]);
    } else {
      setFileName(null);
    }
  };
  

  
  const router = useRouter();
  useEffect(() => {
    const fetchAllPreferenceTags = async () => {
      try {
        const data = await getAvailableTags();
        console.log("Tags available:", data);
        setAvailablePrefrences(data);
      } catch (error) {
        console.error("Error fetching Tags:", error);
      } finally {
        setIsLoadingPreferences(false);
      }
    };

    fetchAllPreferenceTags();
  }, []);

  const handleSelectPrefClick = (id: string) => {
    console.log("Before update:", selectedPrefrences);
  
    // Update selectedPrefrences and sync with newPlace
    setSelectedPrefrences((prevSelected) => {
      const updatedState = prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id)
        : [...prevSelected, id];
  
      console.log("After update:", updatedState);
  
      // Update newPlace with the updated selectedPrefrences
      setNewPlace((prevState) => ({
        ...prevState,
        tagss: updatedState, // Use the latest updatedState
      }));
      

      
      
  
      return updatedState; // Return the updated state
    });
  
    console.log("New Place:", newPlace);
  };

  const selectHandler = () => {};
 

  useEffect(() => {
    // Update form data when selectedPrefrences changes
    setValue("tagss", selectedPrefrences);
  }, [selectedPrefrences, setValue]);


  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const toastId = toast.loading("");

    console.log("Form Data:", data);
    console.log("photo:", photo); 
    try {
      const response = await createPlace(data, photo);
      console.log("Response:", response);


      toast.success(response.message || "Place added successfully", {
        duration: 1000, id: toastId
      });
      reset();
      router.push("/");
    } catch (error) {
      console.error("Error adding place:", error);
      toast.error("Failed to add place.", { id: toastId });
  }
};
  
 
  
  const [pictureUrl, setPictureUrl] = useState<string>("");

  // const handleAddPicture = () => {
  //   if (pictureUrl.trim()) {
  //     setNewPlace((prevState) => ({
  //       ...prevState,
  //       pictures: [...prevState.pictures, pictureUrl],
  //     }));
  //     setPictureUrl("");
  //   }
  // };

  // const handleRemovePicture = (index: number) => {
  //   setNewPlace((prevState) => ({
  //     ...prevState,
  //     pictures: prevState.pictures.filter((_, i) => i !== index),
  //   }));
  // };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [outerKey, innerKey] = name.split(".");
      setNewPlace((prevState) => {
        const outerObject = prevState[outerKey as keyof NewPlace];
        if (typeof outerObject === "object" && outerObject !== null) {
          return {
            ...prevState,
            [outerKey]: {
              ...outerObject,
              [innerKey]: value,
            },
          };
        }
        return prevState;
      });
    } else {
      setNewPlace((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
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
                    {/* <UploadSingleImg setlargeImg={setlargeImg} /> */}

                    <div className="form-input">
                    <input
                      id="photo"
                      type="file"
                      {...register("photo", {
                        required: "Photo is required",
                      })}
                      className="custom-file-input"
                      onChange={(e) => handlePhotoChange(e, setPhotoName)}
                    />
                    <label htmlFor="photo" className="custom-file-label">
                      <FontAwesomeIcon icon={faUpload} /> Upload picture
                    </label>
                    {photoName && (
                      <p className="file-name">{photoName}</p>
                    )}
                    {errors.photo && (
                      <ErrorMessage message={errors.photo.message as string} />
                    )}
                  </div>
                    <div className="form-input-box mb-15">
                      <div className="form-input-title">
                        <label htmlFor="placeTitle">
                          Place Title <span>*</span>
                        </label>
                      </div>
                      <div className="form-input">
                        <input id="name" type="text"
                        {...register("name", {
                          required: "Name is required",
                          minLength: {
                            value: 2,
                            message: "must be at least 2 characters",
                          },
                          maxLength: {
                            value: 15,
                            message: "Name cannot exceed 15 characters",
                          },
                        })}
                         />
                      </div>
                    </div>
                    <div className="tour-details-content">
                      <div className="mb-20">
                        <div className="tour-details-meta mb-20">
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="tour-details-price">
                                <div className="form-input-box">
                                  <div className="form-input-title">
                                    <label htmlFor="ticketPrice">
                                      Ticket Price<span>*</span>
                                    </label>
                                  </div>
                                  <div className="form-input">
                                    <input id="ticketPrices.foreigner" type="number"  
                                    {...register("ticketPrices.foreigner", {
                                      required: "Ticket Price is required",
                                      min: {
                                        value: 0,
                                        message: "Price must be greater than 0",
                                      },
                                    })}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-input-box">
                                <div className="form-input-title">
                                  <label htmlFor="ticketPriceNative">
                                    Native Ticket Price
                                  </label>
                                </div>
                                <div className="form-input">
                                  <input id="ticketPrices.native" type="number"  
                                  {...register("ticketPrices.native", {
                                    required: "Ticket Price is required",
                                    min: {
                                      value: 0,
                                      message: "Price must be greater than 0",
                                    },
                                  })}/>
                                </div>
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
                                <label htmlFor="openingHours">
                                  Opening Hours<span>*</span>
                                </label>
                              </div>
                              <div className="form-input">
                                <input id="openingHours" type="text"
                                {...register("openingHours", {
                                  required: "Opening Hours is required",


                                })} />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="tour-details-destination-info">
                          <div className="tour-details-destination-info-title">
                            <div className="form-input-box">
                              <div className="form-input-title">
                                <label htmlFor="placeDescription">
                                  Place Description<span>*</span>
                                </label>
                              </div>
                              <div className="form-input">
                                <input id="description" type="text"  
                                {...register("description", {
                                  required: "Description is required",
                                  minLength: {
                                    value: 2,
                                    message: "Description must be at least 2 characters",
                                  }
                                  
                                })} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mb-35">
                      <h4 className="mb-20">Preference Tags</h4>
                      
                      <div className="buttons-container-pref">
                      
                        {isLoadingPreferences ? (
                          <p>Loading preferences...</p>
                        ) : (
                          availablePrefrences.map((item) => (
                            <button
                              onClick={() => handleSelectPrefClick(item._id)}
                              className={`button-pref ${
                                selectedPrefrences.includes(item._id) ? "active-pref" : ""
                              }`}
                              key={item._id}
                            >
                              {item.name}
                            </button>
                          ))
                        )}
                      </div>
                      </div>

                      <div className="tour-details-gallery mb-35">
                        <h4 className="mb-20">Gallery</h4>
                        <TourGallery
                         
                          
                        />
                      </div>
                      
                      <div className="tour-details-location mb-35">
                        <h4 className="mb-20">Location</h4>
                        <div className="row gy-24">
                          <div className="col-lg-6">
                            <div className="row gy-24">
                              <div className="col-md-12">
                                <div className="form-input-box">
                                  <div className="form-input-title">
                                    <label htmlFor="address">Address: </label>
                                  </div>
                                  <div className="form-input">
                                    <input id="location" type="text" 
                                    {...register("location", {
                                      required: "Location is required",
                                      
                                    })} />
                                  </div>
                                </div>
                              </div>
                              
                            </div>
                          </div>
                          {/* <div className="col-lg-6">
                            <div className="tour-details-location-map">
                              <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d89245.36062680863!2d25.596462799999998!3d45.652478099999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b35b862aa214f1%3A0x6cf5f2ef54391e0f!2sBra%C8%99ov%2C%20Romania!5e0!3m2!1sen!2sbd!4v1707640089632!5m2!1sen!2sbd"
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                              ></iframe>
                            </div>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tour-edit-btn text-start">
                <button type="submit" className="bd-btn btn-style radius-4">
                  Add Place
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