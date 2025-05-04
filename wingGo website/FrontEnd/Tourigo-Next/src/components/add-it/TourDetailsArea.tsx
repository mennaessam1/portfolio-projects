"use client";
import React, { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import UploadSingleImg from "./UploadSingleImg"; 
import { toast } from "sonner";
import { createItinerary, getAvailableTags } from "@/api/itineraryApi";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface NewItinerary {
  tourGuideId: string;
  title: string;
  tags: string[];
  activities: string;
  locations: string[];
  timeline: string;
  duration: string;
  language: string;
  price: number;
  availableDates: string[];
  accessibility: boolean;
  pickupLocation: string;
  dropoffLocation: string;
}

const TourDetailsArea = () => {
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  
  const [itinerary, setItinerary] = useState<NewItinerary>({
    //tourGuideId: "67325c530b3e54ad8bfe1678", 
    tourGuideId: "",
    title: "",
    tags: [],
    activities: "",
    locations: [],
    timeline: "",
    duration: "",
    language: "",
    price: 0,
    availableDates: [""],
    accessibility: false,
    pickupLocation: "",
    dropoffLocation: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [largeImg, setlargeImg] = useState<string>("");
  const [availablePrefrences, setAvailablePrefrences] = useState<Array<any>>([]);
  const [selectedPrefrences, setSelectedPrefrences] = useState<Array<any>>([]);
  const [isLoadingPreferences, setIsLoadingPreferences] = useState<boolean>(true);
  
  
    // Decode token and set tourGuideId
    useEffect(() => {
      const token = Cookies.get("token");
      if (token) {
        try {
          const decodedToken = jwtDecode<{ id: string }>(token);
          setItinerary((prev) => ({
            ...prev,
            tourGuideId: decodedToken.id, 
          }));
        } catch (error) {
          console.error("Error decoding token:", error);
          toast.error("Invalid token. Please log in again.");
        }
      } else {
        toast.error("User not authenticated. Please log in.");
      }
    }, []);
  
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
    setSelectedPrefrences((prevSelected) => {
      const updatedState = prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id) // Remove tag
        : [...prevSelected, id]; // Add tag
  
      // Update itinerary tags
      setItinerary((prevState) => ({
        ...prevState,
        tags: updatedState,
      }));
  
      return updatedState;
    });
  };

  const selectHandler = () => {};
 

  useEffect(() => {
    // Update form data when selectedPrefrences changes
    setItinerary((prevState) => ({
      ...prevState,
      tags: selectedPrefrences, // This keeps tags updated
    }));
  }, [selectedPrefrences]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
  
    setItinerary((prev) => ({
      ...prev,
      [name]: name === "availableDates" 
        ? [...prev.availableDates, value]  // Add new date to array
        : name === "locations"
        ? value.split(",").map((loc) => loc.trim()) // Split for locations
        : type === "checkbox" 
        ? checked 
        : value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const addDatePicker = () => {
    setItinerary((prev) => ({
      ...prev,
      availableDates: [...prev.availableDates, ""],
    }));
  };
  const removeDatePicker = (index: number) => {
    setItinerary((prev) => ({
      ...prev,
      availableDates: prev.availableDates.filter((_, i) => i !== index),
    }));
  };
  const handleDateChange = (index: number, value: string) => {
    setItinerary((prev) => {
      const updatedDates = [...prev.availableDates];
      updatedDates[index] = value;
      return { ...prev, availableDates: updatedDates };
    });
  };
  const handleAddItinerary = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    // Append form data fields
    formData.append("tourGuideId", itinerary.tourGuideId);
    formData.append("title", itinerary.title);
    formData.append("tags", String(itinerary.tags));
    formData.append("activities", itinerary.activities);
    formData.append("locations", String(itinerary.locations));
    formData.append("timeline", itinerary.timeline);
    formData.append("duration", itinerary.duration);
    formData.append("language", itinerary.language);
    formData.append("price", String(itinerary.price));
   
    formData.append("pickupLocation", itinerary.pickupLocation);
    formData.append("dropoffLocation", itinerary.dropoffLocation);
    itinerary.availableDates.forEach((date) => {
      formData.append("availableDates[]", date); // Use array notation for backend compatibility
  });
    if (image) {
      formData.append("file", image);
    }

    try {
      const response = await createItinerary(formData);
      toast.success(response.message || "Itinerary added successfully");
      reset(); // Clear form after successful submission
    } catch (error) {
      console.error("Error adding itinerary:", error);
      toast.error("Failed to add itinerary.");
    }
  };

  return (
    <section className="bd-tour-details-area section-space">
      <form onSubmit={handleAddItinerary}>
        <div className="container">
          <div className="row gy-24 justify-content-center">
            <div className="col-xxl-12 col-xl-12 col-lg-12">
              <div className="tour-details-wrapper">
                <UploadSingleImg setlargeImg={setlargeImg} setImage={setImage}/>

                <div className="form-input-box mb-15">
                  <label htmlFor="title">Itinerary Title<span>*</span></label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={itinerary.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-input-box mb-15">
  <h4 className="mb-20">Preference Tags</h4>
  <div className="buttons-container-pref">
    {isLoadingPreferences ? (
      <p>Loading preferences...</p>
    ) : (
      availablePrefrences.map((item) => (
        <button
          key={item._id}
          onClick={() => handleSelectPrefClick(item._id)}
          className={`button-pref ${selectedPrefrences.includes(item._id) ? "active-pref" : ""}`}
        >
          {item.name}
        </button>
      ))
    )}
  </div>
</div>
                <div className="form-input-box">
                  <label htmlFor="price">Price<span>*</span></label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={itinerary.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-input-box">
  <label htmlFor="availableDates">Available Dates<span>*</span></label>
  {itinerary.availableDates.map((date, index) => (
    <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
      <input
        type="date"
        id={`availableDate-${index}`}
        name="availableDates"
        value={date}
        onChange={(e) => handleDateChange(index, e.target.value)}
        required
      />
      {index > 0 && ( // Show "-" button only for additional date pickers
        <button
          type="button"
          onClick={() => removeDatePicker(index)}
          style={{
            marginLeft: "10px",
            padding: "5px 10px",
            background: "#dc3545",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            borderRadius: "3px",
          }}
        >
          -
        </button>
      )}
      {index === itinerary.availableDates.length - 1 && (
        <button
          type="button"
          onClick={addDatePicker}
          style={{
            marginLeft: "10px",
            padding: "5px 10px",
            background: "#007bff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            borderRadius: "3px",
          }}
        >
          +
        </button>
      )}
    </div>
  ))}
</div>

                <div className="form-input-box">
                  <label htmlFor="activities">Activities<span>*</span></label>
                  <input
                    type="text"
                    id="activities"
                    name="activities"
                    value={itinerary.activities}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-input-box">
                  <label htmlFor="timeline">Timeline<span>*</span></label>
                  <input
                    type="text"
                    id="timeline"
                    name="timeline"
                    value={itinerary.timeline}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-input-box">
                  <label htmlFor="duration">Duration<span>*</span></label>
                  <input
                    type="text"
                    id="duration"
                    name="duration"
                    value={itinerary.duration}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-input-box">
                  <label htmlFor="language">Language<span>*</span></label>
                  <input
                    type="text"
                    id="language"
                    name="language"
                    value={itinerary.language}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-input-box">
                  <label htmlFor="locations">Locations (comma-separated)<span>*</span></label>
                  <input
                    type="text"
                    id="locations"
                    name="locations"
                    onChange={(e) =>
                      setItinerary((prev) => ({
                        ...prev,
                        locations: e.target.value
                          .split(",")
                          .map((loc) => loc.trim()),
                      }))
                    }
                    required
                  />
                </div>

                <div className="form-input-box">
                  <label htmlFor="pickupLocation">Pickup Location<span>*</span></label>
                  <input
                    type="text"
                    id="pickupLocation"
                    name="pickupLocation"
                    value={itinerary.pickupLocation}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-input-box">
                  <label htmlFor="dropoffLocation">Dropoff Location<span>*</span></label>
                  <input
                    type="text"
                    id="dropoffLocation"
                    name="dropoffLocation"
                    value={itinerary.dropoffLocation}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <button type="submit" className="bd-btn btn-style radius-4">
                  Add Itinerary
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};
export default TourDetailsArea;
function setValue(arg0: string, selectedPrefrences: any[]) {
  throw new Error("Function not implemented.");
}

