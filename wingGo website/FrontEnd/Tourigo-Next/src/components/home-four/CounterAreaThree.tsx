import { counterData } from "@/data/counter-data";
import CountUpContent from "@/elements/counter/CountUpContent";
import Link from "next/link";
import React from "react";

const CounterAreaThree = () => {
  return (
    <>
      <section className="bd-counter-area section-space p-relative half-bg fix">
        <div className="container">
          <div className="row gy-24 align-items-center justify-content-between section-title-space">
            <div className="col-xl-5 col-lg-7 col-md-7">
              <div className="section-title-wrapper">
                <span className="section-subtitle color-warning mb-10">
                  Offer
                </span>
                <h3 className="section-title white-text">
                  Grrab up to <span className="text-quaternary">35% off</span>{" "}
                  on your favorite Destination
                </h3>
              </div>
            </div>
       
          </div>
          <div className="row">
            <div className="counter-wrapper counter-style-three">
              {counterData &&
                counterData.slice(4, 8).map((item) => (
                  <div key={item.id} className="counter-item">
                    <div className="counter-content">
                      <span className="counter-icon">
                        <i className={item.icon}></i>
                      </span>
                      <h2>
                        <span>
                          <CountUpContent
                            number={item.counterNumber}
                            text={`${
                              item.counterTitle === "+"
                                ? "+"
                                : item.counterTitle === "M+"
                                ? "M+"
                                : "K+"
                            }`}
                          />
                        </span>
                      </h2>
                      <p>{item.description}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CounterAreaThree;
