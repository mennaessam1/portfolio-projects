import React from "react";
import ReviewComments from "./ReviewComments";
import ShopDetailsPostCommentForm from "@/forms/ShopDetailsPostCommentForm";
import Link from "next/link";

const ProductInfoDetails = () => {
  return (
    <>
      <div className="product-information section-space">
        <div className="row gy-24 justify-content-center">
          <div className="col-xxl-12 col-xl-12 col-lg-12">
            <div className="product-information-tab">
              <ul
                className="nav nav-pills mb-35 flex-wrap gap-10"
                id="pills-tab"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="pills-information-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-information"
                    type="button"
                    role="tab"
                    aria-controls="pills-information"
                    aria-selected="true"
                  >
                    Product Information
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-review-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-review"
                    type="button"
                    role="tab"
                    aria-controls="pills-review"
                    aria-selected="false"
                  >
                    Review
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-specifications-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-specifications"
                    type="button"
                    role="tab"
                    aria-controls="pills-specifications"
                    aria-selected="false"
                  >
                    Specifications
                  </button>
                </li>
              </ul>
              <div className="tab-content" id="pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="pills-information"
                  role="tabpanel"
                  aria-labelledby="pills-information-tab"
                >
                  <div className="information-wrapper">
                    <div className="information-material mb-20">
                      <h5 className="information-title mb-10">Material:</h5>
                      <p>
                        Made from premium cotton fabric, Tourigo Short Sleeve
                        T-shirts ensure breathability and softness against the
                        skin. The fabric blend is carefully selected to provide
                        comfort and ease of movement throughout the day.
                      </p>
                    </div>
                    <div className="information-design mb-20">
                      <h5 className="information-title mb-10">Design:</h5>
                      <p>
                        Featuring a classic crew neck design and short sleeves,
                        Tourigo T-shirts boast a timeless silhouette suitable
                        for various occasions. The shirts are available in a
                        range of colors and sizes to cater to diverse
                        preferences and body types.
                      </p>
                    </div>
                    <div className="information-durability mb-20">
                      <h5 className="information-title mb-10">Durability:</h5>
                      <p>
                        Built to last, Tourigo Short Sleeve T-shirts undergo
                        rigorous quality control measures to ensure longevity
                        and resilience. The reinforced stitching and superior
                        construction ensure that these T-shirts withstand
                        regular wear and washing, maintaining their shape and
                        color over time.
                      </p>
                    </div>
                    <div className="information-versatility mb-20">
                      <h5 className="information-title mb-10">Versatility:</h5>
                      <p>
                        Whether {`you're`} dressing up for a casual outing or
                        dressing down for a relaxed day at home, Tourigo
                        T-shirts effortlessly transition between different
                        settings. Pair them with jeans, shorts, or joggers for a
                        laid-back ensemble that exudes effortless style.
                      </p>
                    </div>
                    <div className="information-instructions mb-20">
                      <h5 className="information-title mb-10">
                        Care Instructions:
                      </h5>
                      <p>
                        To maintain the quality and appearance of your Tourigo
                        Short Sleeve T-shirts, machine wash them in cold water
                        with like colors. Avoid using bleach and tumble dry on
                        low heat. For best results, iron the T-shirts on a low
                        setting if necessary.
                      </p>
                    </div>
                    <div className="information-sustainability">
                      <h5 className="information-title mb-10">
                        Sustainability:
                      </h5>
                      <p>
                        At Tourigo, we prioritize sustainability and ethical
                        practices in our manufacturing processes. Our T-shirts
                        are crafted with eco-friendly materials and adhere to
                        responsible production standards, minimizing our
                        environmental footprint.
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-review"
                  role="tabpanel"
                  aria-labelledby="pills-review-tab"
                >
                  <div className="tour-details-rating-wrapper mb-35">
                    <div className="row gy-24 align-items-center justify-content-between">
                      <div className="col-lg-5 col-md-3 col-sm-4">
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
                      <div className="col-lg-7 col-md-8 col-sm-7">
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
                  {/* Reviews */}
                  <ReviewComments />
                  <ShopDetailsPostCommentForm />
                </div>

                <div
                  className="tab-pane fade"
                  id="pills-specifications"
                  role="tabpanel"
                  aria-labelledby="pills-specifications-tab"
                >
                  <h5 className="mb-20">
                    Tourigo Short Sleeve T-Shirt Specifications
                  </h5>
                  <div className="shop-specifications table-responsive">
                    <table className="table table-striped">
                      <tbody>
                        <tr>
                          <th>Specification</th>
                          <th>Description</th>
                        </tr>
                        <tr>
                          <td>Material</td>
                          <td>100% premium combed cotton, 180 GSM</td>
                        </tr>
                        <tr>
                          <td>Design</td>
                          <td>
                            Crew neck, regular short sleeve, reinforced
                            stitching
                          </td>
                        </tr>
                        <tr>
                          <td>Colors</td>
                          <td>Black, White, Navy Blue, Gray, Red</td>
                        </tr>
                        <tr>
                          <td>Sizes</td>
                          <td>
                            XS, S, M, L, XL, XXL (Refer to size chart for
                            measurements)
                          </td>
                        </tr>
                        <tr>
                          <td>Fit</td>
                          <td>
                            Modern fit with a slight taper for a flattering
                            silhouette
                          </td>
                        </tr>
                        <tr>
                          <td>Care Instructions</td>
                          <td>
                            Machine wash cold, tumble dry low, do not bleach,
                            iron on low heat if needed
                          </td>
                        </tr>
                        <tr>
                          <td>Quality Standards</td>
                          <td>
                            OEKO-TEX Standard 100 certified for textile safety
                            and quality
                          </td>
                        </tr>
                        <tr>
                          <td>Packaging</td>
                          <td>
                            Individually wrapped in recyclable cardboard
                            packaging
                          </td>
                        </tr>
                        <tr>
                          <td>Optional Features</td>
                          <td>Moisture-wicking technology, UV protection</td>
                        </tr>
                        <tr>
                          <td>Price</td>
                          <td>$499.00 per unit (Bulk discounts available)</td>
                        </tr>
                        <tr>
                          <td>Shipping Information</td>
                          <td>
                            Standard shipping (3-5 business days), Free shipping
                            on orders over $50
                          </td>
                        </tr>
                        <tr>
                          <td>Warranty/Guarantee</td>
                          <td>
                            30-day satisfaction guarantee. Contact us for
                            warranty details.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductInfoDetails;
