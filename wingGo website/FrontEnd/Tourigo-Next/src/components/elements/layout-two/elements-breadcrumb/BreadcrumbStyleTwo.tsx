import Link from "next/link";
import React from "react";

const BreadcrumbStyleTwo = () => {
  return (
    <>
      <section className="bd-breadcrumb-area style-two theme-bg-secondary">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-6 col-md-6">
              <div className="bd-breadcrumb-wrapper">
                <div className="bd-breadcrumb-content">
                  <h1 className="bd-breadcrumb-title">Breadcrumb Style 02</h1>
                  <div className="bd-breadcrumb-list justify-content-start">
                    <span>
                      <Link href="/home">
                        <i className="icon-home"></i>Tourigo
                      </Link>
                    </span>
                    <span>Elements</span>
                    <span>Breadcrumb</span>
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

export default BreadcrumbStyleTwo;
