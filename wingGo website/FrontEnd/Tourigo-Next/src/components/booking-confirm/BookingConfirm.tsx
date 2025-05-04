import OrderConfirmIcon from "@/svg/OrderConfirmIcon";
import React from "react";

const BookingConfirm = () => {
  return (
    <>
      <section className="booking-confirm-area section-space">
        <div className="container">
          <div className="row gx-0 justify-content-center">
            <div className="col-xxl-10 col-xl-10 col-lg-10 col-md-12">
              <div className="order-inner">
                <div className="order-details mb-35">
                  <div className="order-details-top text-center mb-70">
                    <div className="order-details-icon">
                      <span>
                        <OrderConfirmIcon />
                      </span>
                    </div>
                    <div className="order-details-content">
                      <h3 className="order-details-title mb-15">
                        Booking Confirmation
                      </h3>
                      <p>
                        {`we'll`} thrilled to confirm your booking! Once your
                        reservation is processed, {`we'll`} send you a
                        confirmation email containing all the essential
                        information regarding your booking.
                      </p>
                      <p>
                        Thank you for selecting our services. Your trust and
                        support mean the world to us
                      </p>
                    </div>
                  </div>
                  <div className="booking-details-item-wrapper">
                    <div className="row justify-content-start gy-24">
                      <div className="col-xl-3 col-lg-6 col-sm-6">
                        <div className="order-details-item">
                          <h4>Start Date:</h4>
                          <p>April 15 2024</p>
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-6 col-sm-6">
                        <div className="order-details-item">
                          <h4>End Date: </h4>
                          <p>April 20 2024</p>
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-6 col-sm-6">
                        <div className="order-details-item">
                          <h4>Booking ID:</h4>
                          <p>#TG-0988</p>
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-6 col-sm-6">
                        <div className="order-details-item">
                          <h4>Payment Method:</h4>
                          <p>Credit Card</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="order-info-wrapper">
                  <h4 className="order-info-title">Booking Details</h4>
                  <div className="booking-sidebar-widget-wrapper">
                    <div className="booking-sidebar-price-wrapper">
                      <h6 className="booking-sidebar-price-title small mb-15">
                        4 𝗑 Island Hopping in the Caribbean: Sun & Sea
                      </h6>
                      <div className="booking-sidebar-price-content">
                        <div className="booking-sidebar-price-item d-flex flex-wrap justify-content-between">
                          <div className="booking-sidebar-price-item-title">
                            3 𝗑 Adult (age 7-99)
                          </div>
                          <div className="booking-sidebar-price-item-amount">
                            $1800.00
                          </div>
                        </div>
                        <div className="booking-sidebar-price-item d-flex flex-wrap justify-content-between">
                          <div className="booking-sidebar-price-item-title">
                            1 𝗑 Infant (age 0-6)
                          </div>
                          <div className="booking-sidebar-price-item-amount">
                            $599.00
                          </div>
                        </div>
                        <div className="booking-sidebar-price-total d-flex flex-wrap justify-content-between">
                          <div className="booking-sidebar-price-item-title b3 fw-7">
                            Total price
                          </div>
                          <div className="booking-sidebar-price-item-amount b3 fw-7">
                            $2399.00
                          </div>
                        </div>
                      </div>
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

export default BookingConfirm;
