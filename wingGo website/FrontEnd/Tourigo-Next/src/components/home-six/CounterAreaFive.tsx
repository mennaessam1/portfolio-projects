import { counterData } from "@/data/counter-data";
import CountUpContent from "@/elements/counter/CountUpContent";
import React from "react";

const CounterAreaFive = () => {
  return (
    <>
      <section className="bd-counter-area counter-bottom">
        <div className="container">
          <div className="row gy-24 text-center justify-content-center section-title-space">
            <div className="col-lg-8col-md-8">
              <div className="section-title-wrapper">
                <span className="section-subtitle mb-10">Company Facts</span>
                <h2 className="section-title">Celebrating Our Journey</h2>
              </div>
            </div>
          </div>
          <div className="row gy-24">
            {counterData &&
              counterData.slice(8, 12).map((item) => (
                <div
                  key={item.id}
                  className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-6 wow bdFadeInUp"
                  data-wow-delay=".3s"
                >
                  <div className="counter-wrapper counter-style-four">
                    <div className="counter-item">
                      <div className="counter-content counter-less-padding">
                        <span className="counter-icon bg-two">
                          <i className={item?.icon}></i>
                        </span>
                        <h2>
                          <span>
                            <CountUpContent
                              number={item.counterNumber}
                              text={`${item.counterTitle === "+" ? "+" : "M"}`}
                            />
                          </span>
                        </h2>
                        <p>{item.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default CounterAreaFive;
