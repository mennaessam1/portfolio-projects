"use client";
import React from "react";
import clientOne from "../../../../../public/assets/images/client/01.png";
import clientTwo from "../../../../../public/assets/images/client/02.png";
import clientThree from "../../../../../public/assets/images/client/03.png";
import clientFour from "../../../../../public/assets/images/client/04.png";
import Image from "next/image";
import Link from "next/link";
import { imageLoader } from "@/hooks/image-loader";

const Tooltips = () => {
  return (
    <>
      <div id="tooltips" className="elements-area">
        <div className="wrapper">
          <h4 className="style-guide-title mb-20">Tooltips</h4>
        </div>
        <div className="row g-5 justify-content-between">
          <div className="col-lg-6">
            <div className="client-meta">
              <div className="client-thumb">
                <Link href="#">
                  <Image
                    src={clientOne}
                    alt="client-one"
                    loader={imageLoader}
                    style={{ width: "100%", height: "auto" }}
                  />
                </Link>
                <Link href="#">
                  <Image
                    src={clientTwo}
                    alt="client-one"
                    loader={imageLoader}
                    style={{ width: "100%", height: "auto" }}
                  />
                </Link>
                <Link href="#">
                  <Image
                    src={clientThree}
                    alt="client-one"
                    loader={imageLoader}
                    style={{ width: "100%", height: "auto" }}
                  />
                </Link>
                <Link href="#">
                  <Image
                    src={clientFour}
                    alt="client-one"
                    loader={imageLoader}
                    style={{ width: "100%", height: "auto" }}
                  />
                </Link>
                <Link className="arrow" href="#">
                  <i className="fa-sharp fa-regular fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="client-meta d-flex align-items-center gap-4">
              <div className="client-thumb">
                <Link href="#">
                  <Image
                    src={clientOne}
                    alt="client-one"
                    loader={imageLoader}
                    style={{ width: "100%", height: "auto" }}
                  />
                </Link>
                <Link href="#">
                  <Image
                    src={clientTwo}
                    alt="client-one"
                    loader={imageLoader}
                    style={{ width: "100%", height: "auto" }}
                  />
                </Link>
                <Link href="#">
                  <Image
                    src={clientThree}
                    alt="client-one"
                    loader={imageLoader}
                    style={{ width: "100%", height: "auto" }}
                  />
                </Link>
                <Link href="#">
                  <Image
                    src={clientFour}
                    alt="client-one"
                    loader={imageLoader}
                    style={{ width: "100%", height: "auto" }}
                  />
                </Link>
              </div>
              <div className="client-meta-text">
                <h4>8000+ Client</h4>
                <span>All over the world</span>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="client-meta d-flex align-items-center gap-3">
              <div className="client-thumb">
                <Link href="#">
                  <Image
                    src={clientOne}
                    alt="client-one"
                    loader={imageLoader}
                    style={{ width: "100%", height: "auto" }}
                  />
                </Link>
                <Link href="#">
                  <Image
                    src={clientTwo}
                    alt="client-one"
                    loader={imageLoader}
                    style={{ width: "100%", height: "auto" }}
                  />
                </Link>
                <Link href="#">
                  <Image
                    src={clientThree}
                    alt="client-one"
                    loader={imageLoader}
                    style={{ width: "100%", height: "auto" }}
                  />
                </Link>
                <Link href="#">
                  <Image
                    src={clientFour}
                    alt="client-one"
                    loader={imageLoader}
                    style={{ width: "100%", height: "auto" }}
                  />
                </Link>
              </div>
              <div className="client-meta-text">
                <p className="mb-0">
                  Over <span className="text-color-1">5Ok+</span>Users all over
                  the world...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tooltips;
