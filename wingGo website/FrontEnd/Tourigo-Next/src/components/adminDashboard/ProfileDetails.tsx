"use client";
import Image, { StaticImageData } from "next/image";
import React from "react";
import { imageLoader } from "@/hooks/image-loader";
import Link from "next/link";
import { teamData } from "@/data/team-data";
import { format } from 'date-fns';
import { useRouter } from "next/router";


interface ProfileDetailsProps {
    id: string,
    profileData: any
  }

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ id , profileData}) => {

    
    const filterData = teamData.find((item) => item?.id == 1);
    const admin = profileData;
  
  
    
   
  return (admin ?
    <>
      <section className="bd-team-details-area section-space position-relative">
        <div className="container">
          <div className="row justify-content-between gy-24">
            <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-5">
              <div className="team-details-thumb sidebar-sticky">
                <Image
                  src={filterData?.img as StaticImageData}
                  loader={imageLoader}
                  style={{ width: "100%", height: "auto" }}
                  alt="image"
                />
              </div>
            </div>
            <div className="col-xxl-7 col-xl-7 col-lg-7 col-md-7">
              <div className="team-single-wrapper">
                <div className="team-contents mb-30">
                  <div className="team-heading mb-15">
                    <h2 className="team-single-title">{admin?.username}</h2>
                    <h6 className="designation theme-text">
                      Admin
                    </h6>
                  </div>
                  
                  
                </div>
                

                
              <Link
                href={`/change-password-admin/${id}`} 
                className="bd-primary-btn btn-style has-arrow radius-60 ">
                <span className="bd-primary-btn-arrow arrow-right">
                  <i className="fa-regular fa-arrow-right"></i>
                </span>
                <span className="bd-primary-btn-text">Change Password</span>
                <span className="bd-primary-btn-circle"></span>
                <span className="bd-primary-btn-arrow arrow-left">
                  <i className="fa-regular fa-arrow-right"></i>
                </span>
              </Link>

             
            

                



                  
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
 :
    <div>
        <h1>Loading...</h1>
    </div>
    );
};

export default ProfileDetails;
