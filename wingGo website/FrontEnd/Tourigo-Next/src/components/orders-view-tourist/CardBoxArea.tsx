import { cardData } from "@/data/dashboard-card-data";
import Link from "next/link";
import React from "react";

const CardBoxArea = () => {
  return (
    <>
      <section className="bd-card-area section-space-small">
        <div className="container">
          <div className="row gy-24">
            {cardData &&
              cardData.map((item, index) => (
                <div key={index} className="col-lg-3">
                  <div className="card-wrapper">
                    <div className="card-icon-box d-flex justify-content-between mb-15">
                      <div className="card-icon">
                        <span>
                          <i className="icon-tour-package"></i>
                        </span>
                      </div>
                      <div className="card-dropdown">
                        <div className="dropdown">
                          <Link
                            className="dropdown-btn"
                            href="#"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <i className="fa-light fa-ellipsis-stroke-vertical"></i>
                          </Link>
                          <ul className="dropdown-menu">
                            <li>
                              <Link className="dropdown-item" href="#">
                                Action
                              </Link>
                            </li>
                            <li>
                              <Link className="dropdown-item" href="#">
                                Another action
                              </Link>
                            </li>
                            <li>
                              <Link className="dropdown-item" href="#">
                                Something else here
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <h6 className="card-sub-title small">{item.subTitle}</h6>
                    <h4 className="card-title medium">
                      {item.price.toLocaleString("en-US")}
                    </h4>
                    <span className="card-desc">
                      <span className="price-increase">
                        <i className="fa-light fa-arrow-up"></i>+
                        {item.priceState}%
                      </span>{" "}
                      Than Last Month
                    </span>
                  </div>
                  <div className="card-btn">
                    <Link className="bd-btn btn-style btn-xxs w-100" href="#">
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default CardBoxArea;
