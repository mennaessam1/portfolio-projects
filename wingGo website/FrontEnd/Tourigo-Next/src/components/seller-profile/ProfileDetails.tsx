"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { TbUpload, TbEdit } from "react-icons/tb";
import { toast } from "sonner";
import { requestAccountDeletion, updateSellerProfile, uploadSellerLogo } from "@/api/SellerProfileApi";

interface ProfileDetailsProps {
  id: string;
  profileData: any;
  logo: any;
  setRefreshLogo: any;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ id, profileData, logo, setRefreshLogo }) => {
  const seller = profileData;
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Editable fields
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (profileData) {
      setUsername(seller?.username || "");
      setEmail(seller?.email || "");
    }
  }, [profileData]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await uploadSellerLogo(id, formData);
      console.log("Upload response:", response);
      toast.success("Logo uploaded successfully!");
      setRefreshLogo(true);
      setSelectedFile(null);
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error uploading logo. Please try again later.");
    }
  };

  const handleSaveChanges = async () => {
    const updatedData = {
      username,
      email,
    };
    const toastId = toast.loading("Updating profile...");
    try {
      
      const response = await updateSellerProfile(id, updatedData);
      console.log("Update response:", response);

      if (response) {
        toast.success("Profile updated successfully!", { id: toastId });
      }
      setIsEditing(false); // Exit edit mode
      setRefreshLogo(true);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile. Please try again later.", { id: toastId });
    }
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
  
    if (!isConfirmed) {
      return; // Exit if the user cancels
    }
  
    try {
      const response = await requestAccountDeletion(id);
      console.log("Delete response:", response);
      toast.success("Account deleted successfully!");
      window.location.href = "/";
    } catch (error) {
      console.error("Error deleting profile:", error);
      toast.error("Error deleting account. Please try again later.");
    }
  };
  

  return seller ? (
    <section className="bd-team-details-area section-space position-relative">
      <div className="container">
        <div className="row justify-content-between gy-24">
          <div className="col-xxl-3 col-xl-5 col-lg-5 col-md-5">
            <div className="team-details-thumb sidebar-sticky">
              {logo && (
                <Image
                  src={logo?.imageUrl}
                  alt="Product Image"
                  width={500}
                  height={500}
                  unoptimized
                  style={{ width: "100%", height: "auto", objectFit: "cover" }}
                />
              )}
              <div className="file-upload mt-3">
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleUpload} className="btn btn-primary mt-2">
                  <TbUpload size={20} />
                </button>
              </div>
            </div>
          </div>
          <div className="col-xxl-9 col-xl-7 col-lg-7 col-md-7">
            <div className="team-single-wrapper">
              <div className="team-contents mb-30">
                <div className="team-heading mb-15">
                  <h2 className="team-single-title">
                    {isEditing ? (
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="form-control"
                      />
                    ) : (
                      username
                    )}
                  </h2>
                  <h6 className="designation theme-text">Seller</h6>
                  
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
                  <ul className="list-unstyled w-100">
                  <li className="mb-3 w-full">
  <label className="team-label">Email: </label>
  {isEditing ? (
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="form-control w-100"
    />
  ) : (
    <span>{email}</span>
  )}
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
                href={`/seller/change-password/${id}`}
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
