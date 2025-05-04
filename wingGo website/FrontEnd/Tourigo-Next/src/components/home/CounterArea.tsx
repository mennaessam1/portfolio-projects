import { counterData } from "@/data/counter-data";
import CountUpContent from "@/elements/counter/CountUpContent";
import React from "react";

const CounterArea = () => {
  return (
    <>
      <section className="bd-counter-area section-space-top">
        <div className="container">
          <div className="row gy-24 text-center justify-content-between">
            {counterData &&
              counterData.slice(0, 4).map((item) => (
                <div key={item.id} className="col-lg-3 col-sm-6">
                  <div className="counter-wrapper counter-style-one p-relative">
                    <div className="counter-content-wrapper">
                      <div className="counter-text">
                        <h3 className="counter-text-title">
                          <span>
                            <CountUpContent
                              number={item.counterNumber}
                              text={`${item.counterTitle === "+" ? "+" : "M+"}`}
                            />
                          </span>
                        </h3>
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

export default CounterArea;
