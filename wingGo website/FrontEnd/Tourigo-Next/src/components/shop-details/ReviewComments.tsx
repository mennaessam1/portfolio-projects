"use client";
import React from "react";
import client5 from "../../../public/assets/images/client/05.png";
import client1 from "../../../public/assets/images/client/01.png";
import client3 from "../../../public/assets/images/client/03.png";
import Image from "next/image";
import GetRatting from "@/hooks/GetRatting";
import { imageLoader } from "@/hooks/image-loader";
import Link from "next/link";
const ReviewComments = () => {
  const reviewsData = [
    {
      id: 1,
      imgData: client5,
      title: "Ava Johnson",
      date: "April 22, 2024",
      rating: 5,
      comment:
        "I was thoroughly impressed with the service provided. The team was professional, friendly, and went above and beyond to ensure my satisfaction. The product quality is top-notch and the delivery was prompt. I highly recommend them to anyone looking for quality and reliability. Definitely worth five stars!",
    },
    {
      id: 2,
      imgData: client1,
      title: "Liam Smith",
      date: "May 10, 2024",
      rating: 3,
      comment:
        "The overall experience was decent but there were a few hiccups along the way. The product arrived later than expected and there was a slight defect. However, customer service was responsive and helped resolve the issue promptly. There's room for improvement but I'd still consider them in the future.",
    },
    {
      id: 3,
      imgData: client3,
      title: "Olivia Brown",
      date: "June 5, 2024",
      rating: 4.5,
      comment:
        "I had a great experience overall. The ordering process was smooth and the product met my expectations. There was a minor issue with the packaging but it didn't affect the product itself. The support team was quick to respond and very helpful. I'll definitely be a returning customer!",
    },
  ];

  return (
    <>
      <div className="tour-details-rating-wrapper mb-35">
        <div className="rewiew-content">
          {reviewsData?.map((item, index) => (
            <div key={index} className="tour-review-wrapper">
              <div className="media">
                <div className="thumbnail">
                  <Link href="#">
                    <Image
                      src={item?.imgData}
                      alt="Author Images"
                      loader={imageLoader}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </Link>
                </div>
                <div className="media-body">
                  <div className="author-info">
                    <h5 className="title">
                      <Link className="hover-flip-item-wrapper" href="#">
                        {item?.title}
                      </Link>
                      <Link href="#">
                        <i className="fa-solid fa-thumbs-up"></i>
                      </Link>
                    </h5>
                    <ul className="bd-meta">
                      <li className="has-seperator">
                        On: <span>{item?.date}</span>
                      </li>
                      <li>
                        <div className="rating">
                          <GetRatting averageRating={item?.rating} />
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="content">
                    <p className="description">
                      I recently purchased a few Tourigo Short Sleeve T-shirts,
                      and I {`couldn't`} be happier with my decision. These
                      shirts have quickly become my go-to choice for everyday
                      wear. First and foremost, the comfort level of these
                      T-shirts is unmatched. The premium cotton fabric feels
                      incredibly soft against the skin, and the breathability
                      keeps me cool and comfortable all day long.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ReviewComments;
