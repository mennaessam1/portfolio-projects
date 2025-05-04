"use client";
import Image, { StaticImageData } from "next/image";
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import Link from "next/link";
import { TbEdit } from "react-icons/tb";
import { deleteTouristProfile, updateTouristProfile } from "@/api/ProfileApi";
import { imageLoader } from "@/hooks/image-loader";
import { teamData } from "@/data/team-data";
import { toast } from "sonner";

interface ProfileDetailsProps {
  id: string;
  profileData: any;
  setRefreshData: any;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ id, profileData , setRefreshData}) => {
  const filterData = teamData.find((item) => item?.id == 1);
  const [tourist, setTourist] = useState(profileData || {});
  const [isEditing, setIsEditing] = useState(false);

  // Editable fields
  const [username, setUsername] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [nationality, setNationality] = useState("");
  const [email, setEmail] = useState("");
  const [DOB, setDOB] = useState("");
  const [jobOrStudent, setJobOrStudent] = useState("");

  useEffect(() => {
    if (profileData) {
      setUsername(profileData.username || "");
      setMobileNumber(profileData.mobileNumber || "");
      setNationality(profileData.nationality || "");
      setEmail(profileData.email || "");
      setDOB(profileData.DOB || "");
      setJobOrStudent(profileData.jobOrStudent || "");
    }
  }, [profileData]);

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "yyyy-MM-dd");
  };

  const handleSaveChanges = async () => {
    const updatedData = {
      mobileNumber,
      nationality,
      email,
      jobOrStudent,
    };

    const toastId = toast.loading("Updating profile...");
    try {
      const response = await updateTouristProfile(id, updatedData);
      
      if (response) {
        toast.success("Profile updated successfully!", { id: toastId });
      }
      setRefreshData(true);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile. Please try again later.", {id: toastId});
  }
};

const handleDelete = async () => {
  const isConfirmed = window.confirm(
    "Are you sure you want to delete your account? This action cannot be undone."
  );

  if (!isConfirmed) {
    return; // Exit if user cancels
  }

  try {
    await deleteTouristProfile(id);
    toast.success("Account deleted successfully!");
    window.location.href = "/";
  } catch (error) {
    console.error("Error deleting profile:", error);
    toast.error("Error deleting account. Please try again later.");
  }
};


  return tourist ? (
    <section className="bd-team-details-area section-space position-relative">
      <div className="container">
        <div className="row justify-content-between gy-24">
          
          <div className="col-xxl-9 col-xl-7 col-lg-7 col-md-7">
            <div className="team-single-wrapper">
              <div className="team-contents mb-30">
                <div className="team-heading mb-15">
                  <h2 className="team-single-title">{username}</h2>
                  <h6 className="designation theme-text">Tourist</h6>
                  
                </div>

                <div className="team-info mb-20">
                <div className="d-flex align-items-center mb-15">
                      <h4 className="mb-0">Information:</h4>
                      <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="btn btn-link p-0 ms-3"
                        style={{ cursor: "pointer" }}
                      >
                        <TbEdit size={20} />
                      </button>
                    </div>
                  <ul className="list-unstyled">
                    <li className="w-100 mb-3">
                      <label className="team-label w-full">Phone:</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value)}
                          className="form-control w-full"
                        />
                      ) : (
                        <span>{mobileNumber}</span>
                      )}
                    </li>
                    <li className="w-100 mb-3">
                      <label className="team-label w-full">Nationality:</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={nationality}
                          onChange={(e) => setNationality(e.target.value)}
                          className="form-control w-full"
                        />
                      ) : (
                        <span>{nationality}</span>
                      )}
                    </li>
                    <li className="w-100 mb-3">
                      <label className="team-label w-full">Email:</label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="form-control w-full"
                        />
                      ) : (
                        <span>{email}</span>
                      )}
                    </li>
                    
                    <li className="w-100 mb-3">
                      <label className="team-label w-full">Occupation:</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={jobOrStudent}
                          onChange={(e) => setJobOrStudent(e.target.value)}
                          className="form-control w-full"
                        />
                      ) : (
                        <span>{jobOrStudent}</span>
                      )}
                    </li>
                    <li className="w-50 mr-4 mb-3">
                      <label className="team-label w-full">Date of Birth:</label>
                       
                      <span>{DOB && formatDate(DOB)}</span>
                      
                    </li>
                  </ul>
                </div>
              </div>
              {isEditing && (
                <button
                  onClick={handleSaveChanges}
                  className="bd-primary-btn btn-style has-arrow radius-60 mx-3"
                >
                  Save Changes
                </button>
              )}
              <Link
                href={`/change-password/${id}`}
                className="bd-primary-btn btn-style has-arrow radius-60"
              >
                Change Password
              </Link>
              <button
                onClick={handleDelete}
                className="bd-primary-btn btn-style bd-danger has-arrow radius-60 mx-3"
              >
                Delete My Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <div>
      <h1>Loading...</h1>
    </div>
  );
};

export default ProfileDetails;
