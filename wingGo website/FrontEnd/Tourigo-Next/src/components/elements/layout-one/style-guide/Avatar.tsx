"use client";
import React from "react";
import clientOne from "../../../../../public/assets/images/client/01.png";
import clientTwo from "../../../../../public/assets/images/client/02.png";
import clientThree from "../../../../../public/assets/images/client/03.png";
import Image from "next/image";
import { imageLoader } from "@/hooks/image-loader";
const Avatar = () => {
  return (
    <>
      <div id="avatar" className="elements__area">
        <div className="wrapper">
          <h4 className="style__guide-title mb-20">Avatar</h4>
        </div>
        <div className="row g-5 align-items-center">
          <div className="col-lg-2">
            <div className="bd-avatars m-auto size-lg">
              <Image
                src={clientOne}
                alt="client-one"
                loader={imageLoader}
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </div>
          <div className="col-lg-2">
            <div className="bd-avatars m-auto">
              <Image
                src={clientTwo}
                alt="client-one"
                loader={imageLoader}
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </div>
          <div className="col-lg-2">
            <div className="bd-avatars m-auto size-sm">
              <Image
                src={clientThree}
                alt="client-one"
                loader={imageLoader}
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Avatar;
