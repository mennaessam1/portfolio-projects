import React from "react";
import bgImg from "../../../../../public/assets/images/bg/breadcrumb-bg.png";
import Link from "next/link";
const BreadcrumbStyleOne = () => {
  return (
    <>
      <section className="bd-breadcrumb-area p-relative fix">
        <div
          className="bd-breadcrumb-bg"
          style={{ backgroundImage: `url(${bgImg.src})` }}
        ></div>
        <div className="bd-breadcrumb-wrapper p-relative">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-10">
                <div className="bd-breadcrumb d-flex align-items-center justify-content-center">
                  <div className="bd-breadcrumb-content text-center">
                    <h1 className="bd-breadcrumb-title">Breadcrumb Style</h1>
                    <div className="bd-breadcrumb-list">
                      <span>
                        <Link href="/home">
                          <i className="icon-home"></i>Tourigo
                        </Link>
                      </span>
                      <span>Breadcrumb</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BreadcrumbStyleOne;
