import React, { useState } from "react";
import Image from "next/image";
import tourImgOne from "../../../public/assets/images/tour/tour-img-1.png";
import { imageLoader } from "@/hooks/image-loader";
import NiceSelect from "@/elements/NiceSelect";
import { selectAgeData } from "@/data/nice-select-data";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { idTypeNew } from "@/interFace/interFace";
import {
  decrease_adult_quantity,
  decrease_infant_quantity,
  incress_adult_product,
  incress_infant_product,
  remove_booking_product,
} from "@/redux/slices/bookingSlice";
import ReactDatePicker from "react-datepicker";
import Link from "next/link";


const BookingSidebar = ({ id }: idTypeNew) => {
  
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [adultQuantity, setAdultQuantity] = useState(3);
  const [infantQuantity, setInfantQuantity] = useState(1);
  const dispatch = useDispatch();
  const bookingProducts = useSelector(
    (state: RootState) => state.booking.bookingProducts
  );

  //adult quantity start
  const handleAdultIncreament = () => {
    setAdultQuantity((prevState) => prevState + 1);
  };
  const handleAdultDecreament = () => {
    setAdultQuantity((prevState) => (prevState - 1 > 1 ? prevState - 1 : 1));
  };
  //adult quantity end
  //adult quantity start
  const handleInfantIncreament = () => {
    setInfantQuantity((prevState) => prevState + 1);
  };
  const handleInfantDecreament = () => {
    setInfantQuantity((prevState) => (prevState - 1 > 1 ? prevState - 1 : 1));
  };
  //adult quantity end
  const selectHandler = () => {};
  return (
    <>
      <div className="sidebar-sticky">
        {bookingProducts.length ? (
          <>
            {bookingProducts?.map((item, index) => (
              <aside
                key={index}
                className="booking-sidebar-wrapper booking-content-wrapper mb-24"
              >
                <button
                  onClick={() => dispatch(remove_booking_product(item))}
                  type="button"
                  className="btn-close btn-booking-cls"
                ></button>
                <div className="booking-model">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h6 className="modal-title" id="staticBackdropLabel">
                        {item?.tourTitle}
                      </h6>
                    </div>
                    <div className="modal-body">
                      <div className="modal-body-top mb-20 mt-20">
                        <div className="d-flex gap-24 justify-content-between align-items-center mb-30">
                          <h6 className="guest-title small">Adult</h6>
                          <div className="guest-number">
                            <span
                              onClick={() =>
                                dispatch(decrease_adult_quantity(item))
                              }
                              className="guest-number-minus"
                            >
                              <i className="fa-sharp fa-regular fa-minus"></i>
                            </span>
                            <input
                              className="guest-number-input"
                              type="text"
                              value={item?.adult}
                              readOnly
                            />
                            <span
                              onClick={() =>
                                dispatch(incress_adult_product(item))
                              }
                              className="guest-number-plus"
                            >
                              <i className="fa-sharp fa-regular fa-plus"></i>
                            </span>
                          </div>
                        </div>
                        <div className="d-flex gap-24 justify-content-between align-items-center mb-30">
                          <h6 className="guest-title small">Infant</h6>
                          <div className="guest-number">
                            <span
                              onClick={() =>
                                dispatch(decrease_infant_quantity(item))
                              }
                              className="guest-number-minus"
                            >
                              <i className="fa-sharp fa-regular fa-minus"></i>
                            </span>
                            <input
                              className="guest-number-input"
                              type="text"
                              value={item?.infant}
                              readOnly
                            />
                            <span
                              onClick={() =>
                                dispatch(incress_infant_product(item))
                              }
                              className="guest-number-plus"
                            >
                              <i className="fa-sharp fa-regular fa-plus"></i>
                            </span>
                          </div>
                        </div>
                        <div className="d-flex gap-24 justify-content-between align-items-center">
                          <h6 className="guest-title small">Date</h6>
                          <div className="booking-modal-form-input">
                            <ReactDatePicker
                              selectsRange={true}
                              startDate={startDate}
                              endDate={endDate}
                              onChange={(date: any) => {
                                setDateRange(date);
                              }}
                              isClearable={true}
                              placeholderText={`${item?.startDate} to ${item?.endDate}`}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="modal-body-bottom">
                        <h6 className="mb-10">{`Add Infant's Ages`}</h6>
                        <div className="shop-selector">
                          <NiceSelect
                            options={selectAgeData}
                            defaultCurrent={0}
                            onChange={selectHandler}
                            name="years"
                            className="select-age"
                            placeholder={item?.infantAge}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            ))}
          </>
        ) : (
          <>
            <aside className="booking-sidebar-wrapper booking-content-wrapper mb-24">
              <button
                type="button"
                className="btn-close btn-booking-cls"
              ></button>
              <div className="booking-model">
                <div className="modal-content">
                  <div className="modal-header">
                    <h6 className="modal-title" id="staticBackdropLabel">
                      Booking Form (Default)
                    </h6>
                  </div>
                  <div className="modal-body">
                    <div className="modal-body-top mb-20 mt-20">
                      <div className="d-flex gap-24 justify-content-between align-items-center mb-30">
                        <h6 className="guest-title small">Adult</h6>
                        <div className="guest-number">
                          <span
                            onClick={handleAdultDecreament}
                            className="guest-number-minus"
                          >
                            <i className="fa-sharp fa-regular fa-minus"></i>
                          </span>
                          <input
                            className="guest-number-input"
                            type="text"
                            value={adultQuantity}
                            readOnly
                          />
                          <span
                            onClick={handleAdultIncreament}
                            className="guest-number-plus"
                          >
                            <i className="fa-sharp fa-regular fa-plus"></i>
                          </span>
                        </div>
                      </div>
                      <div className="d-flex gap-24 justify-content-between align-items-center mb-30">
                        <h6 className="guest-title small">Infant</h6>
                        <div className="guest-number">
                          <span
                            onClick={handleInfantDecreament}
                            className="guest-number-minus"
                          >
                            <i className="fa-sharp fa-regular fa-minus"></i>
                          </span>
                          <input
                            className="guest-number-input"
                            type="text"
                            value={infantQuantity}
                            readOnly
                          />
                          <span
                            onClick={handleInfantIncreament}
                            className="guest-number-plus"
                          >
                            <i className="fa-sharp fa-regular fa-plus"></i>
                          </span>
                        </div>
                      </div>
                      <div className="d-flex gap-24 justify-content-between align-items-center">
                        <h6 className="guest-title small">Date</h6>
                        <div className="booking-modal-form-input">
                          <input
                            className="form-control"
                            id="selectingMultipleDate"
                            type="text"
                            placeholder="Select Your date Range"
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                    <div className="modal-body-bottom">
                      <h6 className="mb-10">{`Add Infant's Ages`}</h6>
                      <div className="shop-selector">
                        <NiceSelect
                          options={selectAgeData}
                          defaultCurrent={0}
                          onChange={selectHandler}
                          name="years"
                          className="select-age"
                          placeholder="12 Years"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </>
        )}

        {bookingProducts?.length ? (
          <>
            {bookingProducts?.map((item, index) => (
              <aside key={index} className="booking-sidebar-wrapper mb-24">
                <div className="booking-sidebar-widget-wrapper mb-30">
                  <div className="booking-sidebar-widget-thumb mb-15">
                    <Image
                      src={item?.img}
                      loader={imageLoader}
                      style={{ width: "100%", height: "100%" }}
                      alt="images"
                    />
                  </div>
                  <div className="booking-sidebar-widget-content">
                    <h6 className="booking-item-title small underline mb-5">
                      {item?.tourTitle}
                    </h6>
                    <span className="booking-item-date">
                      <Link href={`/blog-details/${item?.id}`}>
                        <span>
                          <i className="icon-cleander-check"></i>
                        </span>{" "}
                        {item?.startDate} To {item?.endDate}
                      </Link>{" "}
                    </span>
                  </div>
                </div>
                <div className="booking-sidebar-widget-wrapper">
                  <div className="booking-sidebar-price-wrapper">
                    <h6 className="booking-sidebar-price-title small mb-15">
                      {item?.quantity} &times; Island Hopping in the Caribbean:
                      Sun & Sea
                    </h6>
                    <div className="booking-sidebar-price-content">
                      <div className="booking-sidebar-price-item d-flex flex-wrap justify-content-between">
                        <div className="booking-sidebar-price-item-title">
                          {item?.adult} &times; Adult (age 7-99)
                        </div>
                        <div className="booking-sidebar-price-item-amount">
                          $1800.00
                        </div>
                      </div>
                      <div className="booking-sidebar-price-item d-flex flex-wrap justify-content-between">
                        <div className="booking-sidebar-price-item-title">
                          {item?.infant} &times; Infant (age 0-6)
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
                          ${item?.tourPrice?.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            ))}
          </>
        ) : (
          <>
            <aside className="booking-sidebar-wrapper mb-24">
              <div className="booking-sidebar-widget-wrapper mb-30">
                <div className="booking-sidebar-widget-thumb mb-15">
                  <Image
                    src={tourImgOne}
                    loader={imageLoader}
                    style={{ width: "100%", height: "100%" }}
                    alt="images"
                  />
                </div>
                <div className="booking-sidebar-widget-content">
                  <h6 className="booking-item-title small underline mb-5">
                    Island Hopping in the Caribbean: Sun & Sea
                  </h6>
                  <span className="booking-item-date">
                    <Link href={`/blog-details`}>
                      <span>
                        <i className="icon-cleander-check"></i>
                      </span>{" "}
                      16 April to 20 April
                    </Link>{" "}
                  </span>
                </div>
              </div>
              <div className="booking-sidebar-widget-wrapper">
                <div className="booking-sidebar-price-wrapper">
                  <h6 className="booking-sidebar-price-title small mb-15">
                    4 &times; Island Hopping in the Caribbean: Sun & Sea
                  </h6>
                  <div className="booking-sidebar-price-content">
                    <div className="booking-sidebar-price-item d-flex flex-wrap justify-content-between">
                      <div className="booking-sidebar-price-item-title">
                        3 &times; Adult (age 7-99)
                      </div>
                      <div className="booking-sidebar-price-item-amount">
                        $1800.00
                      </div>
                    </div>
                    <div className="booking-sidebar-price-item d-flex flex-wrap justify-content-between">
                      <div className="booking-sidebar-price-item-title">
                        1 &times; Infant (age 0-6)
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
            </aside>
          </>
        )}
      </div>
    </>
  );
};

export default BookingSidebar;
