"use client";
import { imageLoader } from "@/hooks/image-loader";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import tourImgNine from "../../../public/assets/images/tour/tour-img-9.png";
import tourImgTwentyOne from "../../../public/assets/images/tour/tour-img-21.png";
import tourImgTwentyTwo from "../../../public/assets/images/tour/tour-img-22.png";
import { clientReviewData } from "@/data/client-review-data";
import TourDetailsPostForm from "./TourDetailsPostFrom/TourDetailsPostForm";
import { deletePlace } from '@/api/placesApi';

interface TourDetailTabAreaProps {
  id: string;
}

const TourDetailTabArea: React.FC<TourDetailTabAreaProps> = ({ id }) => {
 
  return (
    <>
      <div className="tour-details-nav-tabs mb-35">
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <button
              className="nav-link active"
              id="nav-overview-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-overview"
              type="button"
              role="tab"
              aria-controls="nav-overview"
              aria-selected="true"
            >
              Overview
            </button>
            <button
              className="nav-link"
              id="nav-gallery-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-gallery"
              type="button"
              role="tab"
              aria-controls="nav-gallery"
              aria-selected="false"
              tabIndex={-1}
            >
              Gallery
            </button>
            <button
              className="nav-link"
              id="nav-feedback-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-feedback"
              type="button"
              role="tab"
              aria-controls="nav-feedback"
              aria-selected="false"
              tabIndex={-1}
            >
              Feedback
            </button>
          </div>
        </nav>
        <div className="tab-content mt-25" id="nav-tabContent">
          <div
            className="tab-pane fade active show"
            id="nav-overview"
            role="tabpanel"
            aria-labelledby="nav-overview-tab"
            tabIndex={0}
          >
            <p className="mb-15">{`Embark on the journey of a lifetime with our "Ultimate Adventure: Exploring Nature's Wonders" tour. This extraordinary expedition is designed for those who crave the thrill of discovery and the serenity of untouched landscapes. Get ready to immerse yourself in the breathtaking beauty and diverse ecosystems of some of the most awe-inspiring natural wonders on Earth.`}</p>
            <p className="mb-20">{`Join us on the "Ultimate Adventure: Exploring Nature'sWonders" tour and create unforgettable memories as you connect withthe natural world in ways you've never imagined. This tour isperfect for nature enthusiasts, adventure seekers, and anyonelooking to escape the ordinary and embrace the extraordinary. Bookyour spot today and prepare for an adventure of a lifetime!`}</p>
            <div className="tour-details-list-wrap mb-35">
              <h4 className="mb-20">Include/ Exclude</h4>
              <div className="tour-details-list-box">
                <div className="tour-details-list-include">
                  <ul>
                    <li>
                      <span className="list-icon success">
                        <i className="fa-solid fa-check"></i>
                      </span>
                      Accommodations
                    </li>
                    <li>
                      <span className="list-icon success">
                        <i className="fa-solid fa-check"></i>
                      </span>
                      Meals
                    </li>
                    <li>
                      <span className="list-icon success">
                        <i className="fa-solid fa-check"></i>
                      </span>
                      Transportation
                    </li>
                    <li>
                      <span className="list-icon success">
                        <i className="fa-solid fa-check"></i>
                      </span>
                      Activities
                    </li>
                    <li>
                      <span className="list-icon success">
                        <i className="fa-solid fa-check"></i>
                      </span>
                      Guides
                    </li>
                  </ul>
                </div>
                <div className="tour-details-list-exclude">
                  <ul>
                    <li>
                      <span className="list-icon danger">
                        <i className="fa-regular fa-xmark"></i>
                      </span>
                      Airfare
                    </li>
                    <li>
                      <span className="list-icon danger">
                        <i className="fa-regular fa-xmark"></i>
                      </span>
                      Additional Meals
                    </li>
                    <li>
                      <span className="list-icon danger">
                        <i className="fa-regular fa-xmark"></i>
                      </span>
                      Optional Activities
                    </li>
                    <li>
                      <span className="list-icon danger">
                        <i className="fa-regular fa-xmark"></i>
                      </span>
                      Travel Insurance
                    </li>
                    <li>
                      <span className="list-icon danger">
                        <i className="fa-regular fa-xmark"></i>
                      </span>
                      Personal Expenses
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="tour-details-faq mb-35">
              <h4 className="mb-20">Tour Plan</h4>
              <div className="accordion-wrapper faq-style-3">
                <div className="accordion" id="accordionExampleThree">
                  <div className="accordion-item">
                    <h6 className="accordion-header" id="headingNine">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseNine"
                        aria-expanded="true"
                        aria-controls="collapseNine"
                      >
                        <span>Day 01:</span> Arrival and Exploration
                      </button>
                    </h6>
                    <div
                      id="collapseNine"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingNine"
                      data-bs-parent="#accordionExampleThree"
                    >
                      <div className="accordion-body">
                        Arrive at your destination and check into your
                        accommodation. Lorem ipsum dolor sit amet consectetur
                        adipiscing elit Ut et massa mi. Aliquam hendrerit urna.
                        Pellentesque sit amet sapien fringilla, mattis ligula
                        consectetur, ultrices Maecenas. We are a team of the
                        dedicated patent professionals.
                        <div className="accordion-body-list">
                          <ul>
                            <li>Morning: Arrival and Check-in</li>
                            <li>Afternoon: City Tour or Landmarks Visit</li>
                            <li>Evening: Local Cuisine Experience</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h6 className="accordion-header" id="headingTen">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTen"
                        aria-expanded="false"
                        aria-controls="collapseTen"
                      >
                        <span>Day 02:</span> Adventure and Activities
                      </button>
                    </h6>
                    <div
                      id="collapseTen"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingTen"
                      data-bs-parent="#accordionExampleThree"
                    >
                      <div className="accordion-body">
                        Arrive at your destination and check into your
                        accommodation. Lorem ipsum dolor sit amet consectetur
                        adipiscing elit Ut et massa mi. Aliquam hendrerit urna.
                        Pellentesque sit amet sapien fringilla, mattis ligula
                        consectetur, ultrices Maecenas. We are a team of the
                        dedicated patent professionals.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h6 className="accordion-header" id="headingEleven">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseEleven"
                        aria-expanded="false"
                        aria-controls="collapseEleven"
                      >
                        <span>Day 03:</span> Day Trip or Excursion
                      </button>
                    </h6>
                    <div
                      id="collapseEleven"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingEleven"
                      data-bs-parent="#accordionExampleThree"
                    >
                      <div className="accordion-body">
                        Arrive at your destination and check into your
                        accommodation. Lorem ipsum dolor sit amet consectetur
                        adipiscing elit Ut et massa mi. Aliquam hendrerit urna.
                        Pellentesque sit amet sapien fringilla, mattis ligula
                        consectetur, ultrices Maecenas. We are a team of the
                        dedicated patent professionals.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h6 className="accordion-header" id="headingTwelve">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwelve"
                        aria-expanded="false"
                        aria-controls="collapseTwelve"
                      >
                        <span>Day 04:</span> Culmination and Departure
                      </button>
                    </h6>
                    <div
                      id="collapseTwelve"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingTwelve"
                      data-bs-parent="#accordionExampleThree"
                    >
                      <div className="accordion-body">
                        Arrive at your destination and check into your
                        accommodation. Lorem ipsum dolor sit amet consectetur
                        adipiscing elit Ut et massa mi. Aliquam hendrerit urna.
                        Pellentesque sit amet sapien fringilla, mattis ligula
                        consectetur, ultrices Maecenas. We are a team of the
                        dedicated patent professionals.
                      </div>
                    </div>
                  </div>
                </div>
               
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="nav-gallery"
            role="tabpanel"
            aria-labelledby="nav-gallery-tab"
            tabIndex={0}
          >
            <div className="tour-details-gallery mb-35">
              <h4 className="mb-20">Tour Galley</h4>
              <div className="row gy-24">
                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
                  <div className="tour-details-gallery-thumb image-hover-effect-two position-relative">
                    <Image
                      src={tourImgTwentyOne}
                      loader={imageLoader}
                      style={{ width: "100%", height: "auto" }}
                      alt="image"
                    />
                  </div>
                </div>
                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
                  <div className="row gy-24">
                    <div className="col-xxl-12">
                      <div className="tour-details-gallery-thumb image-hover-effect-two position-relative">
                        <Image
                          src={tourImgTwentyTwo}
                          loader={imageLoader}
                          style={{ width: "100%", height: "auto" }}
                          alt="image"
                        />
                      </div>
                    </div>
                    <div className="col-xxl-12">
                      <div className="tour-details-gallery-thumb image-hover-effect-two position-relative">
                        <Image
                          src={tourImgNine}
                          loader={imageLoader}
                          style={{ width: "100%", height: "auto" }}
                          alt="image"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tour-details-location mb-35">
              <h4 className="mb-20">Tour Location</h4>
              <div className="tour-details-location-map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d89245.36062680863!2d25.596462799999998!3d45.652478099999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b35b862aa214f1%3A0x6cf5f2ef54391e0f!2sBra%C8%99ov%2C%20Romania!5e0!3m2!1sen!2sbd!4v1707640089632!5m2!1sen!2sbd"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="nav-feedback"
            role="tabpanel"
            aria-labelledby="nav-feedback-tab"
            tabIndex={0}
          >
            <div className="tour-details-rating-wrapper mb-35">
              <div className="row gy-24 align-items-center">
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4">
                  <div className="rating-box">
                    <div className="inner">
                      <div className="rating-number">5.0</div>
                      <div className="rating">
                        <Link href="#">
                          <i className="fa fa-star"></i>
                        </Link>
                        <Link href="#">
                          <i className="fa fa-star"></i>
                        </Link>
                        <Link href="#">
                          <i className="fa fa-star"></i>
                        </Link>
                        <Link href="#">
                          <i className="fa fa-star"></i>
                        </Link>
                        <Link href="#">
                          <i className="fa fa-star"></i>
                        </Link>
                      </div>
                      <span className="sub-title">(234 Review)</span>
                    </div>
                  </div>
                </div>
                <div className="col-lg-10 col-md-8 col-sm-7">
                  <div className="review-wrapper">
                    <div className="single-progress-bar">
                      <div className="rating-text">5</div>

                      <div className="progress">
                        <div
                          className="progress-bar bg-1"
                          role="progressbar"
                          style={{ width: "82%" }}
                          aria-valuenow={63}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        ></div>
                      </div>
                      <span className="value-text">82%</span>
                      <span className="number">212</span>
                    </div>
                    <div className="single-progress-bar">
                      <div className="rating-text">4</div>
                      <div className="progress">
                        <div
                          className="progress-bar bg-2"
                          role="progressbar"
                          style={{ width: "8%" }}
                          aria-valuenow={29}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        ></div>
                      </div>
                      <span className="value-text">8%</span>
                      <span className="number">09</span>
                    </div>
                    <div className="single-progress-bar">
                      <div className="rating-text">3</div>
                      <div className="progress">
                        <div
                          className="progress-bar bg-3"
                          role="progressbar"
                          style={{ width: "3%" }}
                          aria-valuenow={6}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        ></div>
                      </div>
                      <span className="value-text">3%</span>
                      <span className="number">02</span>
                    </div>
                    <div className="single-progress-bar">
                      <div className="rating-text">2</div>
                      <div className="progress">
                        <div
                          className="progress-bar bg-4"
                          role="progressbar"
                          style={{ width: "2%" }}
                          aria-valuenow={1}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        ></div>
                      </div>
                      <span className="value-text">2%</span>
                      <span className="number">01</span>
                    </div>
                    <div className="single-progress-bar">
                      <div className="rating-text">1</div>
                      <div className="progress">
                        <div
                          className="progress-bar bg-5"
                          role="progressbar"
                          style={{ width: "7%" }}
                          aria-valuenow={1}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        ></div>
                      </div>
                      <span className="value-text">7%</span>
                      <span className="number">10</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tour-details-rating-wrapper">
              <div className="rewiew-content">
                {clientReviewData &&
                  clientReviewData.map((item) => (
                    <div key={item.id} className="tour-review-wrapper">
                      <div className="media">
                        <div className="thumbnail">
                          <Link href="#">
                            <Image
                              src={item.img}
                              loader={imageLoader}
                              style={{ width: "100%", height: "auto" }}
                              alt="Author Images"
                            />
                          </Link>
                        </div>
                        <div className="media-body">
                          <div className="author-info">
                            <h5 className="title">
                              <Link
                                className="hover-flip-item-wrapper"
                                href="#"
                              >
                                {item.name}
                              </Link>
                              <Link href="#">
                                <i className="fa-solid fa-thumbs-up"></i>
                              </Link>
                            </h5>
                            <ul className="bd-meta">
                              <li className="has-seperator">
                                On: <span>{item.date}</span>
                              </li>
                              <li>
                                <div className="rating">
                                  <Link href="#">
                                    <i className="fa fa-star"></i>
                                  </Link>
                                  <Link href="#">
                                    <i className="fa fa-star"></i>
                                  </Link>
                                  <Link href="#">
                                    <i className="fa fa-star"></i>
                                  </Link>
                                  <Link href="#">
                                    <i className="fa fa-star"></i>
                                  </Link>
                                  <Link href="#">
                                    <i className="fa fa-star"></i>
                                  </Link>
                                </div>
                              </li>
                            </ul>
                          </div>
                          <div className="content">
                            <p className="description">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            {/*tour details post form */}
            <TourDetailsPostForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default TourDetailTabArea;
