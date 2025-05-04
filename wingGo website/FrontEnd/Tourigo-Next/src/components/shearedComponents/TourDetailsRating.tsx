'use client'
import Image from 'next/image';
import React from 'react';
import clientImgOne from '../../../public/assets/images/client/01.png';
import clientImgThree from '../../../public/assets/images/client/03.png';
import clientImgFive from '../../../public/assets/images/client/05.png';
import { imageLoader } from '@/hooks/image-loader';
import Link from 'next/link';

const TourDetailsRating = () => {
    return (
        <>
            <div className="tour-details-rating-wrapper">
                <div className="rewiew-content">
                    <div className="tour-review-wrapper">
                        <div className="media">
                            <div className="thumbnail">
                                <Link href="#">
                                    <Image src={clientImgFive} loader={imageLoader} style={{ width: '100%', height: "100%" }} alt="Author Images" />
                                </Link>
                            </div>
                            <div className="media-body">
                                <div className="author-info">
                                    <h5 className="title">
                                        <Link className="hover-flip-item-wrapper" href="#">
                                            Mason Rodriguez
                                        </Link>
                                        <Link href="#">
                                            <i className="fa-solid fa-thumbs-up"></i>
                                        </Link>
                                    </h5>
                                    <ul className="bd-meta">
                                        <li className="has-seperator">On: <span>Aug 11, 2023</span></li>
                                        <li>
                                            <div className="rating">
                                                <Link href="#"><i className="fa fa-star"></i></Link>
                                                <Link href="#"><i className="fa fa-star"></i></Link>
                                                <Link href="#"><i className="fa fa-star"></i></Link>
                                                <Link href="#"><i className="fa fa-star"></i></Link>
                                                <Link href="#"><i className="fa fa-star"></i></Link>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="content">
                                    <p className="description">Lorem ipsum dolor sit amet consectetur adipiscing elit Ut
                                        massa mi. Aliquam in hendrerit urna. Pellentesque.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tour-review-wrapper">
                        <div className="media">
                            <div className="thumbnail">
                                <Link href="#">
                                    <Image src={clientImgOne} loader={imageLoader} style={{ width: '100%', height: "100%" }} alt="Author Images" />
                                </Link>
                            </div>
                            <div className="media-body">
                                <div className="author-info">
                                    <h5 className="title">
                                        <Link className="hover-flip-item-wrapper" href="#">
                                            Madison Turner
                                        </Link>
                                        <Link href="#">
                                            <i className="fa-solid fa-thumbs-up"></i>
                                        </Link>
                                    </h5>
                                    <ul className="bd-meta">
                                        <li className="has-seperator">On: <span>Aug 11, 2023</span></li>
                                        <li>
                                            <div className="rating">
                                                <Link href="#"><i className="fa fa-star"></i></Link>
                                                <Link href="#"><i className="fa fa-star"></i></Link>
                                                <Link href="#"><i className="fa fa-star"></i></Link>
                                                <Link href="#"><i className="fa fa-star"></i></Link>
                                                <Link href="#"><i className="fa fa-star"></i></Link>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="content">
                                    <p className="description">Lorem ipsum dolor sit amet consectetur adipiscing elit Ut
                                        massa mi. Aliquam in hendrerit urna. Pellentesque.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tour-review-wrapper">
                        <div className="media">
                            <div className="thumbnail">
                                <Link href="#">
                                    <Image src={clientImgThree} loader={imageLoader} style={{ width: '100%', height: "100%" }} alt="Author Images" />
                                </Link>
                            </div>
                            <div className="media-body">
                                <div className="author-info">
                                    <h5 className="title">
                                        <Link className="hover-flip-item-wrapper" href="#">
                                            Ethan Mitchell
                                        </Link>
                                        <Link href="#">
                                            <i className="fa-solid fa-thumbs-up"></i>
                                        </Link>
                                    </h5>
                                    <ul className="bd-meta">
                                        <li className="has-seperator">On: <span>Aug 11, 2023</span></li>
                                        <li>
                                            <div className="rating">
                                                <Link href="#"><i className="fa fa-star"></i></Link>
                                                <Link href="#"><i className="fa fa-star"></i></Link>
                                                <Link href="#"><i className="fa fa-star"></i></Link>
                                                <Link href="#"><i className="fa fa-star"></i></Link>
                                                <Link href="#"><i className="fa fa-star"></i></Link>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="content">
                                    <p className="description">Lorem ipsum dolor sit amet consectetur adipiscing elit Ut
                                        massa mi. Aliquam in hendrerit urna. Pellentesque.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TourDetailsRating;