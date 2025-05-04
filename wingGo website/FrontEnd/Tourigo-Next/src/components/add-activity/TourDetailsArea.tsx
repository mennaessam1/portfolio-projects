"use client";
import React, { useState,FormEvent,ChangeEvent, useEffect} from "react";
import UploadSingleImg from "./UploadSingleImg";
import TourGallery from "./TourGallary";
import TourContent from "./TourContent";
import NiceSelect from "@/elements/NiceSelect";
import { selectLocationData } from "@/data/nice-select-data";
import ErrorMessage from "@/elements/error-message/ErrorMessage";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { createActivity } from "@/api/activityApi";
import {  getAvailableTags } from "@/api/itineraryApi";
import { getAllActCategories } from "@/api/adminApi";
import L from "leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
// interface FormData {
//   tag: string;
//   discount: string;
//   tourTitle: string;
//   packagePrice: string;
//   tourPackageRating: string;
//   facebookLink: string;
//   twitterLink: string;
//   linkedInLink: string;
//   youtubeLink: string;
//   duration: string;
//   minAge: string;
//   tourType: string;
//   location: string;
//   address: string;
//   email: string;
//   phone: string;
//   website: string;
// }
interface DecodedToken {
  username: string;
  id: string; // Use 'id' instead of 'userId'
  role: string;
  mustChangePassword: boolean;
//   iat: number; // Add this if included in the token payload
}
interface NewActivity {
  name:string;
  date: string;
  time: string;
  location: string;
  
  price: number;
  category: string;
  specialDiscounts: string;
  isBookingOpen: boolean;
  advertiser: string;
  tags: string[];
  description: string; 
}

const customIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
interface Suggestion {
  label: string;
  x: number;
  y: number;
}
interface Category {
  _id: string;
  name: string;
}
const TourDetailsArea = () => {

  // Extract advertiser ID from the token
  const token = Cookies.get("token");
  let advertiserId = "";

  try {
    if (!token) {
      throw new Error("No token found. Please log in.");
    }

    const decodedToken = jwtDecode<DecodedToken>(token);
    advertiserId = decodedToken.id; // Extract advertiser ID
    console.log("Decoded Token:", decodedToken);
  } catch (error) {
    console.error("Error decoding token:", error);
  }
  const [newActivity, setNewActivity] = React.useState<NewActivity>({
    name:'',
    date: '',
    time: '',
    location: "",
    price: 0,
    category: '',
    specialDiscounts: '',
    isBookingOpen: true,
    tags: [],
    advertiser: advertiserId,
    description: "",  // Replace with actual advertiser ID
    
});
  
const [image, setImage] = useState<File | null>(null);
const [largeImg, setlargeImg] = useState<string>("");
  
  const [addressQuery, setAddressQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [mapCenter, setMapCenter] = useState({ lat: 45.652478, lng: 25.596463 });
  const [markerPosition, setMarkerPosition] = useState(mapCenter);
  const [availablePrefrences, setAvailablePrefrences] = useState<Array<any>>([]);
  const [selectedPrefrences, setSelectedPrefrences] = useState<Array<any>>([]);
  const [isLoadingPreferences, setIsLoadingPreferences] = useState<boolean>(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  const provider = new OpenStreetMapProvider();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllActCategories(); // API call to fetch categories
        setCategories(response); // Update categories state
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to fetch categories.");
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
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
      setNewActivity((prevState) => ({
        ...prevState,
        tags: updatedState,
      }));
  
      return updatedState;
    });
  };
  const selectHandler = () => {};
  useEffect(() => {
    // Update form data when selectedPrefrences changes
    setNewActivity((prevState) => ({
      ...prevState,
      tags: selectedPrefrences, // This keeps tags updated
    }));
  }, [selectedPrefrences]);
  const searchAddress = async (query: string) => {
    const results: Suggestion[] = await provider.search({ query });
    setSuggestions(results);
  };

  const handleSelectAddress = (suggestion: Suggestion) => {
    const newLatLng = { lat: suggestion.y, lng: suggestion.x };
  
    setAddressQuery(suggestion.label); // Update the address query
    setMapCenter(newLatLng); // Update map center
    setMarkerPosition(newLatLng); // Update marker position
    setNewActivity((prev) => ({
      ...prev,
      location: suggestion.label, // Update location as a string
    }));
    setSuggestions([]); // Clear suggestions list
  };
  

  
  const handleAddActivity = async (e: FormEvent) => {
    e.preventDefault();
  
    if (!newActivity.location) {
      toast.error("Please provide a valid location.");
      return;
    }
  
    const formData = new FormData();
    formData.append("name", newActivity.name);
    formData.append("date", newActivity.date);
    formData.append("time", newActivity.time);
    formData.append("location", newActivity.location); // Append location as a string
    formData.append("price", String(newActivity.price));
    formData.append("category", newActivity.category);
    formData.append("tags", JSON.stringify(newActivity.tags)); // Convert tags array to JSON string
    formData.append("specialDiscounts", newActivity.specialDiscounts);
    formData.append("isBookingOpen", String(newActivity.isBookingOpen));
    formData.append("advertiser", newActivity.advertiser);
    formData.append("description", newActivity.description);
  
    if (image) {
      formData.append("file", image);
    }
  
    try {
      const response = await createActivity(formData);
      toast.success(response.message || "Activity added successfully");
      setNewActivity({
        name: "",
        date: "",
        time: "",
        location: "",
        price: 0,
        category: "",
        specialDiscounts: "",
        isBookingOpen: true,
        tags: [],
        advertiser: advertiserId,
        description: "",
      });
      setAddressQuery("");
    } catch (error) {
      console.error("Error adding activity:", error);
      toast.error("Failed to add activity.");
    }
  };
  
  const handleSelectCategoryClick = (id: string) => {
    const selectedCategory = categories.find((category) => category._id === id);
    if (selectedCategory) {
      setNewActivity((prevState) => ({
        ...prevState,
        category: selectedCategory.name, // Set the category name as the selected value
      }));
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
  
    setNewActivity((prev) => ({
      ...prev,
      [name]: name === "tags"
        ? value.split(",").map((tag) => tag.trim())
        : name === "address"
        ? value // Update location as a string // Handle address updates
        : type === "checkbox"
        ? checked
        : name === "price"
        ? Number(value)
        : value,
    }));
  };


  

  return (
    <>
      <section className="bd-tour-details-area section-space">
        <form onSubmit={handleAddActivity}>
          <div className="container">
            <div className="row gy-24 justify-content-center">
              <div className="col-xxl-12 col-xl-12 col-lg-12">
                <div className="tour-details-wrapper">
                  <div className="tour-details mb-25">
                    {/* Upload Img */}
                    <UploadSingleImg setlargeImg={setlargeImg} setImage={setImage}/>

                    <div className="form-input-box mb-15">
                        <div className="form-input-title">
                          <label htmlFor="tourTitle">
                            Activity Title <span>*</span>
                          </label>
                        </div>
                        <div className="form-input">
                          
                           <input type="text" name="name" value={newActivity.name} onChange={handleInputChange} required />
                          
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
                                    <label htmlFor="packagePrice">
                                      Activity Price<span>*</span>
                                    </label>
                                  </div>
                                  <div className="form-input">
                                    
                                     <input type="number" name="price" value={newActivity.price} onChange={handleInputChange} required />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-input-box">
                                <div className="form-input-title">
                                  <label htmlFor="tourPackageRating">
                                    Discount
                                  </label>
                                </div>
                                <div className="form-input">
                                <input type="text" name="specialDiscounts" value={newActivity.specialDiscounts} onChange={handleInputChange} />
                                  
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
                                <label htmlFor="duration">
                                  Time<span>*</span>
                                </label>
                              </div>
                              <div className="form-input">
                              <input type="text" name="time" value={newActivity.time} onChange={handleInputChange} required />
                                
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="tour-details-destination-info">
                          <div className="tour-details-destination-info-title">
                          <div className="form-input-box mb-15">
  <h4 className="mb-20">Activity Category</h4>
  <div className="buttons-container-pref">
    {isLoadingCategories ? (
      <p>Loading categories...</p>
    ) : (
      categories.map((category) => (
        <button
          key={category._id}
          type="button"
          onClick={() => handleSelectCategoryClick(category._id)}
          className={`button-pref ${
            newActivity.category === category.name ? "active-pref" : ""
          }`}
        >
          {category.name}
        </button>
      ))
    )}
  </div>
</div>
                          </div>
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
                        <div className="tour-details-destination-info">
                          <div className="tour-details-destination-info-title">
                            <div className="form-input-box">
                              <div className="form-input-title">
                                <label htmlFor="location">
                                  Date<span>*</span>
                                </label>
                              </div>
                              <div className="form-input">
                              <input type="date" name="date" value={newActivity.date} onChange={handleInputChange} required />
                                
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                     
                      <div className="form-input-box mb-15">
  <div className="form-input-title">
    <label htmlFor="description">Activity Description</label>
  </div>
  <div className="form-input">
    <textarea
      name="description"
      value={newActivity.description}
      onChange={handleInputChange}
      placeholder="Enter a detailed description of the activity (optional)"
      rows={4}
      className="form-textarea"
    />
  </div>
</div>
                      <div className="tour-details-location mb-35">
        <h4 className="mb-20">Location</h4>
        <div className="form-input-box mb-20">
        <input
  type="text"
  name="address"
  value={newActivity.location}  // Bind directly to newActivity.location.address
  onChange={(e) => {
    const newAddress = e.target.value;
    setAddressQuery(newAddress); // Update the address query
    setNewActivity((prev) => ({
      ...prev,
      location: newAddress, // Correct: Update location as a string
    }));
    searchAddress(newAddress); // Fetch suggestions
  }}
  placeholder="Type an address"
  className="form-input"
/>
{suggestions.length > 0 && (
  <ul className="suggestions-list">
    {suggestions.map((s, index) => (
      <li key={index} onClick={() => handleSelectAddress(s)}>
        {s.label}
      </li>
    ))}
  </ul>
)}
        </div>
        <div style={{ height: "400px", width: "100%" }}>
        <MapContainer
  center={mapCenter}
  zoom={13}
  style={{ height: "100%", width: "100%" }}
  key={JSON.stringify(mapCenter)} // Force re-render when center changes
>
  <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
  />
<Marker
  position={markerPosition}
  icon={customIcon}
  draggable={true} // Enable dragging
  eventHandlers={{
    dragend: (e) => {
      const marker = e.target as L.Marker; // Get the marker instance
      const position = marker.getLatLng(); // Get new position after dragging
      setMarkerPosition(position); // Update marker position state
  
      // Perform reverse geocoding to get the new address
      fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.lat}&lon=${position.lng}`
      )
        .then((response) => response.json())
        .then((data) => {
          const newAddress = data.display_name || "Unknown location";
          setAddressQuery(newAddress); // Update the address box
          setNewActivity((prev) => ({
            ...prev,
  location: newAddress,
          }));
        });
    },
  }}
></Marker>
  </MapContainer>
</div>
      </div>
      </div>
      </div>
      
      </div>
      
      </div>
      

              <div className="tour-edit-btn text-start">
                <button type="submit" className="bd-btn btn-style radius-4">
                  Add Activity
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
