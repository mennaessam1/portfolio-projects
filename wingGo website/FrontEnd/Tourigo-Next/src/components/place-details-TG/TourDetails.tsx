//TourDetails.tsx
"use client";
import { imageLoader } from "@/hooks/image-loader";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import TourDetailTabArea from "./TourDetailTabArea";
import { tourData } from "@/data/tour-data";
import { Place } from "@/interFace/interFace";
import { idTypeNew } from "@/interFace/interFace";
import TourSingleCard from "../common/tourElements/TourSingleCardPlaces";
import BookingFormModal from "@/elements/modals/BookingFormModal";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for styling
import { FaShareAlt, FaEnvelope } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import Modal from "react-modal"; // Import Modal from react-modal
import { TbEdit } from "react-icons/tb";
import { updatePlace } from "@/api/placesApi";
import {fetchImage} from "@/api/placesApi"


const TourDetails = ({ id }: idTypeNew) => {
  const [data, setData] = useState<Place | null>(null);
  const [isEmailFormOpen, setIsEmailFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState('');
  const DEFAULT_IMAGE = "/assets/images/places.jpg";
  const [imageUrl, setImageUrl] = useState<string>(DEFAULT_IMAGE);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [openingHours, setOpeningHours] = useState("");
  const [ticketPrices, setTicketPrices] = useState({
    foreigner: 0,
    native: 0,
    student: 0,
  });

  const handleEmailChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setEmail(e.target.value);
  };

  const handleSendEmail = async () => {
    try {
      if (data) {
        const response = await axios.post(`http://localhost:8000/tourist/sharePlaceViaEmail/${data._id}`, {
          email: email
        });
        if (response.status === 200) {
          toast.success('Email sent successfully!');
          setIsEmailFormOpen(false);
        }
      } else {
        toast.error('Place is not available.');
      }
    } catch (error) {
      toast.error('Error sending email');
    }
  };
 
  useEffect(() => {
    if (!id) {
        console.error('Place ID is undefined');
        return;
    }
    console.log('Place ID:', id); // Ensure this logs the correct ID
    const fetchPlace = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/govornor/getPlace/${id}`);
            setData(response.data);
            const place = response.data;
            setName(place.name || "");
            setDescription(place.description || "");
            setLocation(place.location || "");
            setOpeningHours(place.openingHours || "");
            setTicketPrices(place.ticketPrices || {});
        } catch (error) {
            console.error("Error fetching Place data:", error);
        }
    };

    fetchPlace();
}, [id]);
useEffect(() => {
  const loadImage = async () => {
    try {
      if (data?._id && data?.photo) { // Check if the item has an image
        const url = await fetchImage(data._id);
        if (url) {
          console.log("Fetched Image URL:", url); // Verify if a valid URL is returned
          setImageUrl(url);
          console.log(imageUrl);
        }
      }
    } catch (error) {
      console.error("Failed to load image:", error);
    }
  };
  loadImage();
}, [data?._id, data?.photo,imageUrl]);

const handleSave = async (event?: React.MouseEvent<HTMLButtonElement>) => {
 console.log("upd");
 const updatedData = {
  name,
  description,
  location,
  openingHours,
  ticketPrices,
};
try {
  const response = await updatePlace(id, updatedData);
  if (response) {

    toast.success("Place details updated successfully!");
    const updatedPlace = response.data;
    setName(updatedPlace.name);
    setDescription(updatedPlace.description);
    setLocation(updatedPlace.location);
    setOpeningHours(updatedPlace.openingHours);
    setTicketPrices(updatedPlace.ticketPrices);

    // Optionally update `data` if it's being used elsewhere
    setData(updatedPlace);
    
  }
} catch (error) {
  console.error("Error updating place details:", error);
  // toast.error("Failed to update place details.");
}
setIsEditing(false);
};



  if (!data) return <div>Loading...</div>;
  return (
    <>
      <section className="bd-tour-details-area section-space">
        {data?._id && (
          <div className="container">
            <div className="row gy-24 justify-content-center">
              <div className="col-xxl-12 col-xl-12 col-lg-12">
                <div className="tour-details-wrapper">
                  <div className="tour-details mb-25">
                    <div className="tour-details-thumb details-slide-full mb-30">
                    <Image
                      src={imageUrl|| DEFAULT_IMAGE} // Placeholder image
                      loader={imageLoader}
                      width={300}
                      height={300}
                      style={{ width: "auto", height: "auto" }}
                      alt="Place Image"
                      unoptimized
                    />
                    </div>
                    <div className="tour-details-content">
                      {/* <div className="tour-details-badge d-flex gap--5 mb-10">
                        <span className="bd-badge warning fw-5">Featured</span>
                        <span className="bd-badge danger fw-5">15% Off</span>
                      </div> */}
                      <div style={{ display: 'flex', gap: '10px', marginTop: '10px', marginBottom: '20px' }}>
                      <h3 className="tour-details-title mb-15">
                    
                      {isEditing ? (
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="form-control w-full"
                        />
                      ) : (
                        <span>{name}</span>
                      )}
                      </h3>
                      {/* <button
                        style={{
                          width: '40px',
                          height: '40px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '50%',
                          backgroundColor: '#007bff',
                          color: 'white',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                        onClick={() => {
                          navigator.clipboard.writeText(window.location.href);
                          toast.success("Link copied to clipboard!");
                        }}
                      >
                        <FaShareAlt />
                      </button> */}
                      {/* <button
                        style={{
                          width: '40px',
                          height: '40px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '50%',
                          backgroundColor: '#007bff',
                          color: 'white',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                        onClick={() => setIsEmailFormOpen(true)}
                      >
                        <FaEnvelope />
                      </button> */}
                      <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="btn btn-link p-0 ms-3"
                        style={{ cursor: "pointer" }}
                      >
                        <TbEdit size={20} />
                      </button>
                          </div>
                      <div className="tour-details-meta d-flex flex-wrap gap-10 align-items-center justify-content-between mb-20">
                        {/* <div className="tour-details-price">
                          <h4 className="price-title">
                            ${data?.tourPrice}
                            <span>/Per Person</span>
                          </h4>
                        </div> */}
                        <div className="tour-details-meta-right d-flex flex-wrap gap-10 align-items-center justify-content-between">
                          {/* <div className="rating-badge border-badge">
                            <span>
                              <i className="icon-star"></i>
                              {data?.tourRating}
                            </span>
                          </div> */}
                          {/* <div className="theme-social">
                            <Link href="https://www.facebook.com/">
                              <i className="icon-facebook"></i>
                            </Link>
                            <Link href="https://www.twitter.com/">
                              <i className="icon-twitter-x"></i>
                            </Link>
                            <Link href="https://www.linkedin.com/">
                              <i className="icon-linkedin"></i>
                            </Link>
                            <Link href="https://www.youtube.com/">
                              <i className="icon-youtube"></i>
                            </Link>
                          </div> */}
                        </div>
                      </div>
                      <div className="tour-details-destination-wrapper">
                        <div className="tour-details-destination-info">
                          <div className="search-icon-bg is-big">
                            <span>
                              <i className="fa-light fa-clock"></i>
                            </span>
                          </div>
                          <div className="tour-details-destination-info-title">
                            <p className="tour-details-destination-info-top mb-0">
                              Opening Hours
                            </p>
                            <span className="tour-details-destination-info-bottom small">
                      
                        {isEditing ? (
                        <input
                          type="text"
                          value={openingHours}
                          onChange={(e) => setOpeningHours(e.target.value)}
                          className="form-control w-full"
                        />
                      ) : (
                        <span>{openingHours}</span>
                      )}
                            </span>
                          </div>
                        </div>
                        <div className="tour-details-destination-info">
                          <div className="search-icon-bg is-big">
                            <span>
                              <i className="icon-hourglass"></i>
                            </span>
                          </div>
                          <div className="tour-details-destination-info-title">
                            <p className="tour-details-destination-info-top mb-0">
                              Description
                            </p>
                            <span className="tour-details-destination-info-bottom small">
                            
                      {isEditing ? (
                        <input
                          type="text"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="form-control w-full"
                        />
                      ) : (
                        <span>{description}</span>
                      )}
                            </span>
                          </div>
                        </div>
                        <div className="tour-details-destination-info">
                          <div className="search-icon-bg is-big">
                            <span>
                              <i className="fa-sharp fa-light fa-moped"></i>
                            </span>
                          </div>
                          <div className="tour-details-destination-info-title">
                            <p className="tour-details-destination-info-top mb-0">
                             Location
                            </p>
                            <span className="tour-details-destination-info-bottom">
                            {isEditing ? (
                        <input
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="form-control w-full"
                        />
                      ) : (
                        <span>{location}</span>
                      )}
                            </span>
                          </div>
                        </div>
                        <div className="tour-details-destination-info">
                          <div className="search-icon-bg is-big">
                            <span>
                              <i className="fa-light fa-location-dot"></i>
                            </span>
                          </div>
                          <div className="tour-details-destination-info-title">
                            <p className="tour-details-destination-info-top mb-0">
                              Prices
                            </p>
                            <span className="tour-details-destination-info-bottom">
                            
                            <label className="team-label w-full">Foreigner: </label>
                      {isEditing ? (
                        <input
                          type="number"
                          value={ticketPrices.foreigner}
                          onChange={(e) => setTicketPrices({...ticketPrices, foreigner: +e.target.value})}
                          className="form-control w-full"
                        />
                      ) : (
                        <span>{ticketPrices.foreigner}</span>
                      )}
                      
                      <label className="team-label w-full">, Student: </label>
                      {isEditing ? (
                        <input
                          type="number"
                          value={ticketPrices.student}
                          onChange={(e) => setTicketPrices({...ticketPrices, foreigner: +e.target.value})}
                          className="form-control w-full"
                        />
                      ) : (
                        <span>{ticketPrices.student}</span>
                      )}
                      <label className="team-label w-full">, Native: </label>
                      {isEditing ? (
                        <input
                          type="number"
                          value={ticketPrices.native}
                          onChange={(e) => setTicketPrices({...ticketPrices, foreigner: +e.target.value})}
                          className="form-control w-full"
                        />
                      ) : (
                        <span>{ticketPrices.native}</span>
                      )}
                      
                            </span>
                            {isEditing && (
    <button
        onClick={(event) => handleSave(event)} // Pass the event to prevent default behavior
        className="bd-primary-btn btn-style has-arrow radius-60 mx-3"
        style={{ marginTop: "10px" }} // Correct style object
    >
        Save Changes
    </button>
)}

                </div>
                          
                          
                          </div>
                      </div>
                   
                      
                      {/*tab area start*/}
                      <TourDetailTabArea id={id} />
                      {/*tab area end*/}
                      {/*tour area start*/}
                      <div className="tour-details-related-tour mb-35">
                        <h4 className="mb-20">Related Places</h4>
                        {/* <div className="row gy-24">
                          {tourDetailsData?.map((item) => (
                            <TourSingleCard
                              key={item?.id}
                              tour={item}
                              className="col-xxl-4 col-xl-4 col-md-6"
                              tourWrapperClass="tour-wrapper style-one"
                              isparentClass={true}
                            />
                          ))}
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
      <BookingFormModal />
      <ToastContainer />
      {/* <Modal
        isOpen={isEmailFormOpen}
        onRequestClose={() => setIsEmailFormOpen(false)}
        contentLabel="Share Via Email"
        style={{
          content: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            background: 'white',
            padding: '20px',
            borderRadius: '10px',
            width: '400px',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)'
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)'
          }
        }}
      >
        <h3>Share Via Email</h3> 
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ced4da',
              borderRadius: '0.25rem',
              fontSize: '1rem',
              color: '#495057'
            }}
          />
        </div>
        <button
          onClick={handleSendEmail}
          className="bd-primary-btn btn-style radius-60 mb-10"
        >
          Send Email
        </button>
      </Modal> */}
    </>
  );
};

export default TourDetails;
